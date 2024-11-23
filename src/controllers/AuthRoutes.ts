import { Router } from "express";
import { Request, Response } from 'express';
import dotenv from "dotenv";
import User from "../models/user";
import jwt from "jsonwebtoken";
import { createJWT} from "../utils/jwt";
import {
  getToken,
  salesforceLogin,
} from "./salesforcecontroller";
import {
  signup_mail_to_admin_template,
  mail_confermatiom_template,
} from "../config/config";
import { sendMail, sendMultipleEmails } from "../utils/brevoapi";
import bcrypt from "bcrypt";
import crypto from "crypto";
import {
  schedule_demo, 
  welcome_subscriber, 
  schedule_demo_confirmation, 
  welcome_subscriber_confirmation,
  inbound_meeting_confirmation,
  inbound_meeting_confirmation_founder,
  unlock_report_confirmation_founder,
  unlock_report_confirmation,
} from "../config/config";

// Initialize dotenv
dotenv.config();

const router = Router();

// Types for keys and encrypted data
type Key = Buffer;
type IV = Buffer;
type EncryptedData = Buffer;

// Function to import the key
function importKey(exportedKey: string): Key {
  return Buffer.from(exportedKey, 'base64');
}

// Decrypt function
function decrypt(encrypted: EncryptedData, key: Key, iv: IV): Buffer {
  const decipher = crypto.createDecipheriv('aes-256-cbc', key, iv);
  let decrypted = decipher.update(encrypted);
  decrypted = Buffer.concat([decrypted, decipher.final()]);
  return decrypted;
}
interface RegisterUserRequestBody {
  _id: string;
  username: string;
  company_name: string;
  company_email: string;
  phone_number: string;
  password: string;
  isAgree: boolean;
}

// Register user function
const signup = async (req: Request, res: Response): Promise<void> => {
  try {
    const { username, company_name, company_email, phone_number, password, isAgree } = req.body;

    // Check if email already exists
    const emailExist = await User.findOne({ company_email });
    if (emailExist) {
      res.status(400).json({
        status: "fail",
        error: "emailError",
        message: "Email is already registered",
        isLoggedIn: false,
      });
      return;
    }

    // Hash the user's password
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create a new user
    const newUser = new User({
      username,
      company_name,
      company_email,
      phone_number,
      password: hashedPassword,
      isAgree,
      isVerified: false,
      isFirstTimeLogged: true,
    });
    await newUser.save();

    // Generate a JWT token
    const token = await createJWT({ _id: newUser._id.toString() });

    try {
      // Send confirmation email
      const link = `${process.env.CLIENT_URL}/user-onboarding?activateLoginToken=${token}`;
      const signupConfirmationMail = mail_confermatiom_template(newUser, link);
      await sendMail(company_email, signupConfirmationMail.subject, signupConfirmationMail.body, signupConfirmationMail.html);

      // Send email to admin
      const emailToAdmin = signup_mail_to_admin_template(newUser);
      await sendMail(emailToAdmin.founder_email, emailToAdmin.subject, emailToAdmin.body, emailToAdmin.html);
    } catch (emailError) {
      console.error("Error sending email:", emailError);
      res.status(500).json({
        status: "fail",
        message: "User created, but there was an error sending confirmation email.",
        isLoggedIn: false,
      });
      return;
    }

    // Respond with success
    res.status(201).json({
      status: "success",
      message: "User registered successfully. A confirmation email has been sent.",
      isLoggedIn: true,
      token: token,
    });
  } catch (err: any) {
    console.error("Signup error:", err);
    res.status(500).json({
      status: "fail",
      error: "serverError",
      message: `User registration failed: ${err.message}`,
      isLoggedIn: false,
    });
  }
};

//////Loginuser////

const loginUser = async (req: any, res: any): Promise<void> => {
  const { email, password, exportedKeyArray, ivArray } = req.body;

  try {
    // Find the user by email
    const emailExist = await User.findOne({ company_email: email });

    // If email doesn't exist, return error
    if (!emailExist) {
      return res.status(400).json({
        status: "fail",
        error: "emailError",
        message: "Email is not registered, Sign up first",
        isLoggedIn: false,
      });
    }

    // Decrypt the password
    const exportedKeyBuffer: any = Buffer.from(exportedKeyArray);
    const ivBuffer = Buffer.from(ivArray);
    const encryptedBuffer = Buffer.from(password);
    const key = importKey(exportedKeyBuffer);
    const decryptedPassword = decrypt(encryptedBuffer, key, ivBuffer);

    // Validate the decrypted password
    const user = await User.login(email, decryptedPassword);

    // Generate JWT token upon successful login
    const token = createJWT({ user });

    res.status(200).json({
      status: "success",
      message: "User has successfully Logged In",
      isLoggedIn: true,
      token: token,
    });

  } catch (err :any) {
    if (err.message === "incorrectPassword") {
      res.status(400).json({
        status: "fail",
        error: "passwordError",
        message: "Your Password is incorrect",
        isLoggedIn: false,
      });
    } else {
      res.status(400).json({
        status: "fail",
        error: "error",
        message: `${err.message}`,
        isLoggedIn: false,
      });
    }
  }
};

const logoutUser = (req: Request, res: Response) => {
  res.cookie("token", "", { maxAge: 1 });
  res.status(201).json({
    status: "success",
    message: "User has Logged Out",
    isLoggedIn: false,
  });
};

//////verifyuser//////
const verifyUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { token } = req.body;

    if (!token) {
      res.status(400).json({
        message: 'User is not logged in',
        isLoggedIn: false,
      });
      return;
    }

    jwt.verify(token, process.env.JWT_SECRET_KEY!, async (err : any, decodedToken: any) => {
      if (err) {
        res.status(401).json({
          message: 'User JWT not verified',
          isLoggedIn: false,
        });
        return;
      }

      const user = await User.findById(decodedToken.user._id);

      if (!user) {
        res.status(401).json({
          message: 'User JWT not verified',
          isLoggedIn: false,
        });
        return;
      }

      await User.updateOne(
        { _id: decodedToken.user._id },
        { $set: { isVerified: true } }
      );

      res.status(200).json({
        message: 'User has successfully logged in',
        isLoggedIn: true,
      });
    });
  } catch (err: any) {
    res.status(500).json({
      message: `User cannot log in. ${err.message}`,
      isLoggedIn: false,
    });
  }
};

//////verifyuserfirsttime//////
const verifyUserFirstTime = async (req: Request, res: Response) => {
  try {
    const { token } = req.body;

    if (!token) {
      res.status(400).json({
        message: 'Incorrect login',
        isLoggedIn: false,
      });
      return;
    }

    jwt.verify(token, process.env.JWT_SECRET_KEY!, async (err : any, decodedToken: any) => {
      if (err) {
        res.status(401).json({
          message: 'Invalid URL',
          isLoggedIn: false,
        });
        return;
      }

      const user = await User.findById(decodedToken._id);

      if (!user) {
        res.status(401).json({
          message: 'Invalid URL',
          isLoggedIn: false,
        });
        return;
      }

      await User.updateOne(
        { _id: decodedToken._id },
        { $set: { isVerified: true } }
      );

      res.status(200).json({
        message: 'User has successfully verified',
        isLoggedIn: true,
        user: user,
      });
    });
  } catch (err) {
    res.status(500).json({
      message: 'Incorrect login',
      isLoggedIn: false,
    });
  }
};

////////////////sendMailSheduleDemo////////////////////
const sendMailScheduleDemo = async (req: any, res: any): Promise<void> => {
  try {
    const { userName, userEmail, phone, mailType } = req.body;

    // Validate required fields based on mailType
    if (mailType === "schedule_demo" && (!userName || !userEmail || !phone)) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields for scheduling a demo.",
      });
    }

    if (mailType === "welcome_subscriber" && !userEmail) {
      return res.status(400).json({
        success: false,
        message: "Email is required for welcoming a subscriber.",
      });
    }

    // Prepare email content based on mailType
    let emailContent;
    let founderEmailContent;

    switch (mailType) {
      case "schedule_demo":
        emailContent = schedule_demo({ userName, phone, userEmail });
        founderEmailContent = schedule_demo_confirmation({ userName, userEmail, phone });
        break;

      case "welcome_subscriber":
        emailContent = welcome_subscriber(userEmail);
        founderEmailContent = welcome_subscriber_confirmation({ userEmail });
        break;

      default:
        return res.status(400).json({
          success: false,
          message: "Invalid mail type.",
        });
    }

    // Log email content and recipient for debugging
    console.log("Sending email to user:", userEmail);
    console.log("Email Content:", emailContent);

    // Send email to the user
    await sendMail(
      userEmail,
      emailContent.subject,
      emailContent.body,
      emailContent.html
    );

    // Ensure FOUNDER_EMAIL is defined
    const founderEmail = process.env.FOUNDER_EMAIL;
    if (!founderEmail) {
      throw new Error("FOUNDER_EMAIL is not defined in environment variables.");
    }

    // Log founder email and content for debugging
    console.log("Sending confirmation email to founder:", founderEmail);
    console.log("Founder Email Content:", founderEmailContent);

    // Send confirmation email to the founder
    await sendMail(
      founderEmail,
      founderEmailContent.subject,
      founderEmailContent.body,
      founderEmailContent.html
    );

    return res.status(200).json({
      success: true,
      message: "Mail sent successfully, and confirmation email sent to the founder.",
    });
  } catch (e: any) {
    console.error("Error sending email:", e.message);  // More detailed logging
    return res.status(500).json({
      success: false,
      message: "Sorry, an unexpected error occurred. Please retry shortly or contact support for assistance."
    });
  }
};

////////sendMailInboundMeeting/////////
const sendMailInboundMeeting = async (req: any, res: any): Promise<void>=> {
  try {
    // Destructure the required fields from the request body
    const { userName, userEmail, phone, companyName, mailType } = req.body;

    // Validate required fields
    if (!userName || !userEmail || !phone || !companyName || !mailType) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields: userName, userEmail, phone, companyName, and mailType are required.",
      });
    }

    // Prepare email content based on mailType
    let emailContent;
    let founderEmailContent;

    switch (mailType) {
      case "inbound_meeting":
        emailContent = inbound_meeting_confirmation({ userName, userEmail, phone, companyName });
        founderEmailContent = inbound_meeting_confirmation_founder({ userName, userEmail, phone, companyName, mailType });
        break;

      default:
        return res.status(400).json({
          success: false,
          message: "Invalid mail type.",
        });
    }

    // Log email content and recipient for debugging
    console.log("Sending email to user:", userEmail);
    console.log("Email Content:", emailContent);

    // Send email to the user
    await sendMail(
      userEmail,
      emailContent.subject,
      emailContent.body,
      emailContent.html
    );

    // Ensure FOUNDER_EMAIL is defined
    const founderEmail = process.env.FOUNDER_EMAIL;
    if (!founderEmail) {
      throw new Error("FOUNDER_EMAIL is not defined in environment variables.");
    }

    // Log founder email and content for debugging
    console.log("Sending confirmation email to founder:", founderEmail);
    console.log("Founder Email Content:", founderEmailContent);

    // Send confirmation email to the founder
    await sendMail(
      founderEmail,
      founderEmailContent.subject,
      founderEmailContent.body,
      founderEmailContent.html
    );

    return res.status(200).json({
      success: true,
      message: "Mail sent successfully, and confirmation email sent to the founder.",
    });
  } catch (e : any ) {
    console.error("Error sending email:", e.message);  // More detailed logging
    return res.status(500).json({
      success: false,
      message: "Sorry, an unexpected error occurred. Please retry shortly or contact support for assistance."
    });
  }
};

///////sendMailUnlockReport////////
const sendMailUnlockReport = async (req: any, res: any): Promise<void> => {
  try {
    // Destructure the required fields from the request body
    const { userName, userEmail, phone, companyName, mailType, leadMagnetName, downloadLink } = req.body;

    // Validate required fields
    if (!userName || !userEmail || !phone || !companyName || !mailType || !leadMagnetName || !downloadLink) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields: userName, userEmail, phone, companyName, mailType, leadMagnetName, and downloadLink are required.",
      });
    }

    // Prepare email content based on mailType
    let emailContent;
    let founderEmailContent;

    switch (mailType) {
      case "unlock_report":
        emailContent = unlock_report_confirmation({ userName, userEmail, phone, companyName, leadMagnetName, downloadLink });
        founderEmailContent = unlock_report_confirmation_founder({ userName, userEmail, phone, companyName, leadMagnetName });
        break;

      default:
        return res.status(400).json({
          success: false,
          message: "Invalid mail type.",
        });
    }

    // Log email content and recipient for debugging
    console.log("Sending email to user:", userEmail);
    console.log("Email Content:", emailContent);

    // Send email to the user
    await sendMail(
      userEmail,
      emailContent.subject,
      emailContent.body,
      emailContent.html
    );

    // Ensure FOUNDER_EMAIL is defined
    const founderEmail = process.env.FOUNDER_EMAIL;
    if (!founderEmail) {
      throw new Error("FOUNDER_EMAIL is not defined in environment variables.");
    }

    // Log founder email and content for debugging
    console.log("Sending confirmation email to founder:", founderEmail);
    console.log("Founder Email Content:", founderEmailContent);

    // Send confirmation email to the founder
    await sendMail(
      founderEmail,
      founderEmailContent.subject,
      founderEmailContent.body,
      founderEmailContent.html
    );

    return res.status(200).json({
      success: true,
      message: "Mail sent successfully, and confirmation email sent to the founder.",
    });
  } catch (err: any ) {
    console.error("Error sending email:", err.message); // More detailed logging
    return res.status(500).json({
      success: false,
      message: `An unexpected error occurred: ${err.message}`,
    });
  }
};


////sendMailInboundMeeting///////
const onboardingUser = async (req: any, res: any): Promise<void> => {
  try {
    const { userId, industry, primaryBusiness, additionalList, adminaccess, tokenList } = req.body;

    // Find the user by userId
    const user = await User.findById(userId);

    // If the user is found, update their data
    if (user) {
      const tmpObj = {
        industry,
        primaryBusiness,
        additionalList,
        adminaccess,
        tokenList: JSON.stringify(tokenList),
      };

      // Update user data with the new fields
      await User.updateOne({ _id: userId }, { $set: { datakeys: tmpObj } });

      return res.status(200).json({
        message: "User has been successfully updated",
        isLoggedIn: true,
      });
    } else {
      // If user is not found, return an error
      return res.status(401).json({
        message: "Incorrect User",
        isLoggedIn: false,
      });
    }
  } catch (err: any) {
    // Catch and handle any errors
    console.error("Error during onboarding:", err.message); // Log the error for debugging
    return res.status(400).json({
      message: `An error occurred: ${err.message}`,
      isLoggedIn: false,
    });
  }
};

///////checkUserEmail////////
const checkUserEmail = async (req: any, res: any): Promise<void> => {
  try {
    const { emailId } = req.body;

    // Find the user by emailId
    const user = await User.findOne({ company_email: emailId });

    if (user) {
      // Check if the datakeys field is null or undefined
      if (user.datakeys == null) {
        // Generate JWT token for user onboarding
        const token = await createJWT({ _id: user._id.toString() });

        // Create the link with the token
        const link = `${process.env.CLIENT_URL}/user-onboarding?activateLoginToken=${token}`;

        // Prepare the signup confirmation email content
        const signupConfirmationMail = mail_confermatiom_template(user, link);

        // Send the confirmation email to the user
        await sendMail(emailId, signupConfirmationMail.subject, signupConfirmationMail.body, signupConfirmationMail.html);
      }

      // Respond with the user details
      return res.status(200).json({
        status: "success",
        user,
      });
    } else {
      // If user is not found, respond with an error
      return res.status(404).json({
        status: "fail",
        message: "User not found",
        isLoggedIn: false,
      });
    }
  } catch (err : any ) {
    // Catch and log any errors
    console.error("Error during checkUserEmail:", err.message);

    // Return a generic error message
    return res.status(500).json({
      status: "fail",
      message: "An unexpected error occurred.",
    });
  }
};

router.get("/salesforce/login", salesforceLogin);

router.get("/salesforce/token", getToken);



export { signup, loginUser, logoutUser, verifyUser, verifyUserFirstTime, sendMailScheduleDemo, sendMailInboundMeeting, sendMailUnlockReport, onboardingUser, checkUserEmail };
