import jwt from "jsonwebtoken";
import os from "os";

// Define the shape of the 'user' object
interface User {
  _id: string;
  username: string;
  company_email: string;
  // Add other properties from your user object as needed
}

// Function to create JWT (same as before)
const createJWT = async (user: User): Promise<string> => {
  return jwt.sign(user, process.env.JWT_SECRET_KEY!, {
    expiresIn: "2 days",
    audience: os.hostname(),
  });
};

// Wrapper function to generate a token
const generateToken = async (user: User): Promise<string> => {
  try {
    const token = await createJWT(user);
    return token;
  } catch (err:any) {
    throw new Error('Error generating token: ' + err.message);
  }
};

export { createJWT, generateToken };

