import dotenv from 'dotenv';
dotenv.config();

// Signup confirmation mail template
const signup_mail_template = (username : any, company_name: any) => {
    return {
        subject: "Welcome to ConvertML - Unleash the Power of Your Data!",
        body: `Welcome to ConvertML!`,
        html: `<div><strong>Hi ${username},</strong><br/><br/> 
        <p>Welcome to ConvertML, the predictive customer insights platform that's about to transform the way you harness your data!</p> 
        <p>I'm Gustav, one of the co-founders of ConvertML, and I'm thrilled to personally welcome you to our predictive customer insights platform. Your decision to join us is the first step towards unlocking the full potential of your data, and I'm here to support your journey every step of the way.</p> 
         <p>At ConvertML, we understand that as a high-growth company, you're sitting on untapped data potential. Your unique data, buried in transactional systems, surveys, comments, and user-generated content, holds the key to elevating customer satisfaction, boosting churn predictability, and gaining a competitive edge.</p>
         <p>Here's what ConvertML can do for you:</p>
        <ul>
        <li>Leverage your zero-party data and data from transactional sources to predict customer behavior.</li>
        <li>There is no need for data scientists or coding; our platform is designed for nimble marketing teams like yours.</li>
        <li>Combine qualitative and quantitative data to access customer satisfaction insights</li>
        <li>Gain deeper customer understanding with our code-free analytical models, including Customer Satisfaction Analysis, Churn Prediction, Cross-Selling, and more</li>
        </ul>
         <p>I encourage you to get started today by exploring your ConvertML dashboard and unleashing the potential of your data. If you have any questions or need assistance, remember that our team is here to help. Simply reply to this email, and we'll be in touch promptly.</p>
        <p>Welcome aboard, ${username}! Let's revolutionize your customer insights together and drive your business to new heights.</p>
        Best regards, <br/>
        <br/> 
        <a href='https://convertml.ai' target='_blank'><img src='https://convertml.ai/images/convertmlLogo.png' width='100' /></a><br><br>
        <br/><div>Gustav<br/>Co-founder, ConvertML</div></div>`,
    }
}

// Signup mail to admin template
const signup_mail_to_admin_template = (user: any) => {
    const founderEmail = process.env.FOUNDER_EMAIL || 'founder@convertml.ai';
    const logoUrl = process.env.LOGO_URL || 'https://convertml.ai/images/convertmlLogo.png';
    const websiteUrl = process.env.WEBSITE_URL || 'https://convertml.ai';
  
    return {
      founder_email: founderEmail,
      subject: `${user.username} from ${user.company_name} has signed up!!`,
      body: `${user.username} from ${user.company_name} has signed up!!`,
      html: `
        <div>
          <strong>Hey Deepak Sondhi,</strong>
        </div>      
        <p>New user has signed up with the following details:</p>
        <table width='450' cellpadding='10' cellspacing='0' bgcolor='#ffffff' style='border:#cccccc solid 3px; font-size: 15px; font-family: Arial, Helvetica, sans-serif;'>
          <tr align='left' valign='top' bgcolor='#efefef'>
            <td><strong>Name:</strong></td>
            <td>${user.username}</td>
          </tr>
          <tr align='left' valign='top'>
            <td><strong>Company Name:</strong></td>
            <td>${user.company_name}</td>
          </tr>  
          <tr align='left' valign='top' bgcolor='#efefef'>
            <td><strong>Email:</strong></td>
            <td>${user.company_email}</td>
          </tr>
          <tr align='left' valign='top'>
            <td><strong>Phone Number:</strong></td>
            <td>${user.phone_number}</td>
          </tr>  
        </table>  
        <br/>
        <div>Thanks,</div>
        <div>Account Manager, ConvertML</div>
        <br/>
        <a href='${websiteUrl}' target='_blank'>
          <img src='${logoUrl}' width='100' />
        </a><br><br>
      </div>`,
    };
};

// DataSource to admin template
const datasource_mail_to_admin_template = (user:any) => {
    return {
        founder_email: `founder@convertml.ai`,
        subject: `${user.first_name} ${user.last_name} has requested ${user.datasource}`,
        body: `${user.first_name} ${user.last_name} has requested ${user.datasource}`,
        html: `<div style="font-family: Arial, Helvetica, sans-serif;">
            <strong>Hey Deepak Sondhi,</strong>
            <p>New user has requested to connect ${user.datasource}</p>
            <table align='left' border="1" cellspacing='0' cellpadding='15'>
                <tbody>
                    <tr>
                        <th width='150' align='left'>First Name</th><td>${user.first_name}</td>
                    </tr>
                    <tr bgcolor='#f2f2f2'>
                        <th align='left'>Last Name</th><td>${user.last_name}</td>
                    </tr>
                    <tr>
                        <th align='left'>Email</th><td>${user.email}</td>
                    </tr>
                    <tr bgcolor='#f2f2f2'>
                        <th align='left'>Data Source</th><td>${user.datasource}</td>
                    </tr>
                    <tr>
                        <th align='left'>Message</th><td>${user.message}</td>
                    </tr>
                </tbody>
            </table>
            <br/>
            <div style="clear:both"></div>  
            <div>Thanks,</div>
            <div>Account Manager, ConvertML</div>
            <br/>
            <a href='https://convertml.ai' target='_blank'><img src='https://convertml.ai/images/convertmlLogo.png' width='100' /></a><br><br>
            </div>`
    }
}

// Templates to admin template
const templates_mail_to_admin_template = (user:any) => {
    return {
        founder_email: `founder@convertml.ai`,
        subject: `${user.first_name} ${user.last_name} has requested ${user.temmplateName}`,
        body: `${user.first_name} ${user.last_name} has requested ${user.temmplateName}`,
        html: `<div style="font-family: Arial, Helvetica, sans-serif;">
            <strong>Hey Deepak Sondhi,</strong>
            <p>New user has requested to connect ${user.temmplateName}</p>
            <table align='left' border="1" cellspacing='0' cellpadding='15'>
                <tbody>
                    <tr>
                        <th width='150' align='left'>First Name</th><td>${user.first_name}</td>
                    </tr>
                    <tr bgcolor='#f2f2f2'>
                        <th align='left'>Last Name</th><td>${user.last_name}</td>
                    </tr>
                    <tr>
                        <th align='left'>Email</th><td>${user.email}</td>
                    </tr>
                    <tr bgcolor='#f2f2f2'>
                        <th align='left'>Template Name</th><td>${user.temmplateName}</td>
                    </tr>
                    <tr>
                        <th align='left'>Message</th><td>${user.message}</td>
                    </tr>
                </tbody>
            </table>
            <br/>
            <div style="clear:both"></div>  
            <p>Thanks,</p>
            <div>Account Manager, ConvertML</div>
            <br/>
            <a href='https://convertml.ai' target='_blank'><img src='https://convertml.ai/images/convertmlLogo.png' width='100' /></a><br><br>
            </div>`
    }
}
  
  // Power User Request to Admin Template
const power_user_mail_to_admin_template = (user:any) => {
    return {
        founder_email: `founder@convertml.ai`,
        subject: `${user.first_name} ${user.last_name} has requested the Power User Program`,
        body: `${user.first_name} ${user.last_name} has requested the Power User Program`,
        html: `<div style="font-family: Arial, Helvetica, sans-serif;">
            <strong>Hey Deepak Sondhi,</strong>
            <p>New user has requested to join the Power User Program</p>
            <table align='left' border="1" cellspacing='0' cellpadding='15'>
                <tbody>
                    <tr>
                        <th width='150' align='left'>First Name</th><td>${user.first_name}</td>
                    </tr>
                    <tr bgcolor='#f2f2f2'>
                        <th align='left'>Last Name</th><td>${user.last_name}</td>
                    </tr>
                    <tr>
                        <th align='left'>Email</th><td>${user.email}</td>
                    </tr>
                    <tr bgcolor='#f2f2f2'>
                        <th align='left'>Phone No</th><td>${user.phone_number}</td>
                    </tr>
                    <tr>
                        <th align='left'>Message</th><td>${user.message}</td>
                    </tr>
                </tbody>
            </table>
            <br/>  
            <div style="clear:both"></div>  
            <p>Thanks,</p>
            <div>Account Manager, ConvertML</div>
            <br/>
            <a href='https://convertml.ai' target='_blank'><img src='https://convertml.ai/images/convertmlLogo.png' width='100' /></a><br><br>
            </div>`
    }
}

// Power User Welcome to User Template
const power_user_mail_user_template = (username:any) => {
    return {
        subject: "Welcome to the ConvertML Power User Program!",
        body: `Welcome to the ConvertML Power User Program!`,
        html: `<div style="font-family: Arial, Helvetica, sans-serif; line-height:22px">
            <strong>Hi ${username},</strong>  
            <p>Congratulations on joining the ConvertML Power User Program! You've made an excellent decision, and we're thrilled to welcome you with open arms.</p>
            <p>As a valued member of our community, you're now poised to shape the future of customer insights with ConvertML. Our team will be reaching out to kickstart your journey.</p>
            <p>Here's a glimpse of what lies ahead:</p>
            <ol>
                <li style="padding:10px 0px"><b>Unlock Exclusive Benefits:</b> Gain access to advanced customer insights and analytics models. Enjoy priority support, tailored guidance, and recognition as a key contributor to ConvertML's success.</li>
                <li style="padding:10px 0px"><b>Influence the Final Product:</b> Your feedback is instrumental in shaping ConvertML to meet your unique needs and expectations. Your voice matters, and we're here to listen.</li>
                <li style="padding:10px 0px"><b>Early Adopter Advantage:</b> Be among the first to explore ConvertML's full potential. Enjoy exclusive access well before the official launch and help us pioneer innovation.</li>
                <li style="padding:10px 0px"><b>Collaborative Engagement:</b> Engage in weekly virtual meetings to share your experiences, challenges, and suggestions. Together, we'll drive customer insights forward!</li>
                <li style="padding:10px 0px"><b>Roadmap Contribution:</b> Share your wishlist of functionalities and improvements to shape ConvertML's roadmap. Your input will shape the future of our platform.</li>
            </ol>
            <p>We're excited to have you on board and look forward to embarking on this journey together. Stay tuned for more updates from the ConvertML team!</p>
            <p>
                Best regards, <br/>
                <a href='https://convertml.ai' target='_blank'><img src='https://convertml.ai/images/convertmlLogo.png' width='100' /></a> <br/>
                <div> Team ConvertML</div>
            </p>
        </div>`,
    }
}
  
  // Password Reset Mail Template
const password_reset_mail_template = (user:any, link: string) => {
      return {
          subject: "Password Reset Link",
          body: `ConvertML Password Reset`,
          html: `
          <div style='font-size: 15px; font-family: Arial, Helvetica, sans-serif;'>
              <strong>Hi ${user.username},</strong><br><br>
              <p>We hope this message finds you well. It appears you've forgotten your ConvertML password, but no worries – we're here to assist you in regaining access to your account.</p>
  
              <p>Click on the reset button below to reset your password:</p>
              <br/>
              <a href='${link}' target='_blank' style="background-color:#6644F1; border-radius:15px; padding:10px 20px; color:#ffffff; text-decoration:none;">Reset Password</a><br><br>
  
              <p>You will be redirected to a secure page where you can create a new password for your account.</p>
              <p>If you have any trouble resetting your password or have questions, please don't hesitate to reach out to our dedicated support team. You can simply reply to this email, and we'll be ready to assist you promptly.</p>
              
              <p>Thank you for choosing ConvertML. We're committed to ensuring your experience with us is as seamless as possible.</p>
              Best regards,<br><br>
              <a href='https://convertml.ai' target='_blank'><img src='https://convertml.ai/images/convertmlLogo.png' width='150' /></a><br><br>
              <div>Team ConvertML</div>
          </div>`
    }
}

// Email Confirmation Template
const mail_confermatiom_template = (user:any, link: string) => {
    return {
        subject: "Verify Your Email Address for ConvertML",
        body: `ConvertML Email verification`,
        html: `
        <div style='font-size: 15px; font-family: Arial, Helvetica, sans-serif;'>
            <strong>Hi ${user.username},</strong><br><br>
            <p>Welcome to ConvertML! We're thrilled to have you on board, and we're just one step away from getting you started on your customer insights journey with ConvertML.</p>
            <p>To ensure the security of your account and to help us keep you updated on the latest features and insights, we need to verify your email address. Please click the button below to confirm your email and start the onboarding process:</p>
            <br/>
            <a href='${link}' target='_blank' style="background-color:#6644F1; border-radius:15px; padding:10px 20px; color:#ffffff; text-decoration:none;">Verify Email Address</a>
            <br/><br/>
            <p>If you encounter any issues during the onboarding process or have any questions about ConvertML, our support team is here to assist. Just reply to this email, and we'll be happy to help.</p>
            
            <p>Thank you for choosing ConvertML. We look forward to helping you unlock customer insights and achieve your business goals.</p>
            
            Best regards, <br>
            <br/>
            <a href='https://convertml.ai' target='_blank'><img src='https://convertml.ai/images/convertmlLogo.png' width='112.5' /></a><br>
            <div>ConvertML Team</div>
            <b>Phone</b>: +17084154811  <b>Email</b>: support@convertml.ai<br/>
        </div>`
    }
}

// Payment Confirmation to User Template
const payment_confirmation_mail_to_user_template = (user: any, payment: any ) => {
  return {
      subject: `Payment Successful`,
      body: `Your payment of ${payment.amount / 100} ${payment.currency} for ${payment.description} has been successful.`,
      html: `<div style='font-family: Arial, Helvetica, sans-serif;'>
          <strong>Hey ${user.username} from ${user.company_name},</strong><br><br>
          <div>Your payment of ${payment.amount / 100} ${payment.currency} for ${payment.description} has been successful.</div>
          <div>Payment Id: ${payment.id} <br> Razorpay Order Id: ${payment.order_id}</div>
          <div>I would love to hear what you think of our product and if there is anything we can improve. If you have any questions, please reply to this email. I am always happy to help!</div>
          <br/>
          <div>Best regards,</div>
          <br/>
          <a href='https://convertml.ai' target='_blank'><img src='https://convertml.ai/images/convertmlLogo.png' width='100' /></a><br><br>
          <div>Deepak Sondhi</div>
          <div>CEO & Founder, ConvertML</div>
          </div>`
  }
}

// Payment Confirmation to Admin Template
const payment_confirmation_mail_to_admin_template = (user:any, payment: any) => {
  return {
      founder_email: `founder@convertml.ai`,
      subject: `Payment Received from ${user.username}`,
      body: `A payment of ${payment.amount / 100} ${payment.currency} for ${payment.description} has been received.`,
      html: `<div style='font-family: Arial, Helvetica, sans-serif;'>
          <strong>Hey Deepak Sondhi,</strong><br><br>
          <div>A payment of ${payment.amount / 100} ${payment.currency} for ${payment.description} has been received from ${user.username} of ${user.company_name}.</div>
          <div>Payment Id: ${payment.id} <br> Razorpay Order Id: ${payment.order_id}</div>
          <br/>
          <div>Thanks,</div>
          <br/>
          <a href='https://convertml.ai' target='_blank'><img src='https://convertml.ai/images/convertmlLogo.png' width='100' /></a><br><br>
          <div>Account Manager</div>
          </div>`
  }
}

// Payment Failure to User Template
const payment_failure_mail_to_user_template = (user:any, payment: any) => {
    return {
        subject: "Payment Unsuccessful",
        body: `Your payment of ${payment.amount / 100} ${payment.currency} for ${payment.description} has failed.`,
        html: `<div style='font-family: Arial, Helvetica, sans-serif;'>
            <strong>Hey ${user.username} from ${user.company_name},</strong><br><br>
            <div>Your payment of ${payment.amount / 100} ${payment.currency} for ${payment.description} has failed.</div>
            <div>Payment Id: ${payment.id} <br> Razorpay Order Id: ${payment.order_id}</div>
            <div>Please retry the payment.</div>
            <br/>
            <div>Deepak Sondhi</div>
            <div>CEO & Founder, ConvertML</div>
            <br/>
            <a href='https://convertml.ai' target='_blank'><img src='https://convertml.ai/images/convertmlLogo.png' width='100' /></a>
            </div>`
    }
}
  
  // Payment Failure to Admin Template
const payment_failure_mail_to_admin_template = (user: any, payment: any) => {
    return {
        founder_email: "founder@convertml.ai",
        subject: `Failed Payment from ${user.username}`,
        body: `A payment of ${payment.amount / 100} ${payment.currency} for ${payment.description} has failed.`,
        html: `<div style='font-family: Arial, Helvetica, sans-serif;'>
            <strong>Hey Deepak Sondhi,</strong><br><br>
            <div>A payment of ${payment.amount / 100} ${payment.currency} for ${payment.description} from ${user.username} of ${user.company_name} has failed.</div>
            <div>Payment Id: ${payment.id} <br> Razorpay Order Id: ${payment.order_id}</div>
            <br/>
            <div>Thanks,</div>
            <div>Account Manager</div>
            <br/>
            <a href='https://convertml.ai' target='_blank'><img src='https://convertml.ai/images/convertmlLogo.png' width='100' /></a>
            </div>`
    }
}
  
  
  // Schedule Demo Template
const schedule_demo = ({ userName, phone, userEmail }: { userName: string; phone: number; userEmail: string; }) => {
      if (!userName || !phone || !userEmail) {
        throw new Error("Required fields missing for schedule_demo template.");
      }
    
      return {
        subject: "Demo with ConvertML is Confirmed! 🌟",
        body: "Schedule Demo",
        html: `
        <div style='font-size: 15px; font-family: Arial, Helvetica, sans-serif;'>
            <strong>Hi ${userName},</strong><br><br>
            <p>Thank you for booking a demo with ConvertML. We’re excited to show you how our GenAI-enabled platform can simplify and enhance your customer analytics.</p>
            <p>What You’ll Discover:</p>
            <ul>
                <li><strong>Effortless Integration:</strong> Seamlessly connect with over 100 data sources.</li>
                <li><strong>Advanced Insights in Minutes:</strong> Move beyond basic analytics with predictive insights and smarter GenAI recommendations.</li>
                <li><strong>Personalized Strategies:</strong> Leverage custom ML models to predict churn and optimize customer engagement.</li>
                <li><strong>Interactive Data Exploration:</strong> Use ConvertML Copilot to interact with your data like never before.</li>
            </ul>
            <p>We’re confident that ConvertML will provide the insights you need to make data-driven decisions that impact your bottom line.</p>
            <p><a href="https://calendly.com/nadia-cardenas-convertml/30min" target='_blank'>Click here</a> to schedule the date and time of your demo, and feel free to reach out if you have any questions.</p>
            <p>Looking forward to meeting you!</p>
            <br/>
            <strong> Team ConvertML</strong><br>  
            <br/>
            <a href="https://convertml.ai" target='_blank'><img src='https://convertml.ai/images/convertmlLogo.png' width='100' /></a><br><br>
        </div>`
      };
};
    
    // Define the schedule_demo_confirmation template
const schedule_demo_confirmation = ({ userName, userEmail, phone }: { userName: string; phone: number; userEmail: string; }) => {
      return {
          subject: `New Demo Booked: ${userName}`,
          body: "New Demo Booking",
          html: `
          <div style='font-size: 15px; font-family: Arial, Helvetica, sans-serif;'>
              <strong>Hi Deepak Sondhi,</strong><br><br>
              <p>A new demo has been booked. Below are the details:</p>
              <p><strong>Name:</strong> ${userName}</p>
              <p><strong>Email:</strong> ${userEmail}</p>
              <p><strong>Phone:</strong> ${phone}</p>
              <p><strong>Mail Type:</strong> Scheduled Demonstrations</p>
              <p>Please ensure everything is set up for the demo.</p>
              <br/>
              <strong>Best,</strong><br>
              <strong> Team ConvertML</strong><br>  
              <br/>
              <a href="https://convertml.ai" target='_blank'><img src='https://convertml.ai/images/convertmlLogo.png' width='100' /></a><br><br>
          </div>`
      };
};

 // Welcome Subscriber Template
const welcome_subscriber = (userEmail: string) => {
    if (!userEmail) {
        throw new Error("User email is required for the welcome_subscriber template.");
    }

    return {
        subject: "Welcome to ConvertML – Your Data's New Best Friend!",
        body: `Welcome aboard!`,
        html: `
        <div style='font-size: 15px; font-family: Arial, Helvetica, sans-serif;'>
            <strong>Hi there,</strong><br><br>
            <p>Thanks for joining the ConvertML family! We’re here to make sure your data isn’t just sitting around collecting dust.</p>
            <p>Our GenAI-powered platform turns raw data into sharp insights faster than you can say \"analytics.\" Get ready to dive into customer satisfaction, engagement, and more—without breaking a sweat.</p>
            <p>Stay tuned for tips and updates from ConvertML. Got questions? We’re just an email away at <a href=\"mailto:support@convertml.ai\">support@convertml.ai</a>.</p>
            <br>
            Welcome aboard!<br><br>
            Cheers,<br>
            <strong> Team ConvertML</strong><br>
            <br/>
            <a href=\"https://convertml.ai\" target='_blank'><img src='https://convertml.ai/images/convertmlLogo.png' width='100' /></a><br><br>
        </div>`
    };
};
  
  
  
  // Define the welcome_subscriber_confirmation template
const welcome_subscriber_confirmation = ({ userEmail }: { userEmail: string }) => {
    return {
        subject: `New Subscriber: ${userEmail}`,
        body: "New Subscriber Signup",
        html: `
        <div style='font-size: 15px; font-family: Arial, Helvetica, sans-serif;'>
            <strong>Hi Deepak Sondhi,</strong><br><br>
            <p>A new subscriber has signed up. Below are the details:</p>
            <p><strong>Email:</strong> ${userEmail}</p>
            <p><strong>Mail Type:</strong> New Subscription Notification Received</p>
            <p>Please take note of this new subscriber.</p>
            <br/>
            <strong>Best,</strong><br>
            <strong> Team ConvertML</strong><br>  
            <br/>
            <a href="https://convertml.ai" target='_blank'><img src='https://convertml.ai/images/convertmlLogo.png' width='100' /></a><br><br>
        </div>`
    };
};
  
  // Define the support_fax template
const support_fax = (username : string) => {
    return {
        subject: "Your Request Received - Expect a Call Within 24 Hours!",
        body: `Support Form Submission`,
        html: `
        <div style='font-size: 15px; font-family: Arial, Helvetica, sans-serif;'>
            <strong>Hi ${username},</strong><br><br> 
            <p>Thank you for reaching out to ConvertML for assistance! Your support request has been successfully received, and we appreciate the opportunity to help you.</p> 
            <p>Our dedicated support team is committed to providing personalized assistance tailored to your needs. Expect a call from one of our representatives within the next 24 hours to address your inquiries and guide you through any challenges you may be facing.</p>
            <p>In the meantime, if you have any additional details or specific points you'd like our team to address during the call, feel free to reply to this email, and we'll ensure that our representative is well-prepared to assist you.</p>
            <p>At ConvertML, we prioritize your success and aim to make your experience with our platform as smooth as possible. Thank you for choosing ConvertML, and we look forward to connecting with you soon.</p>
            <br/>
            <strong>Best regards,</strong><br>
            <br/>
            <a href="https://convertml.ai" target='_blank'><img src='https://convertml.ai/images/convertmlLogo.png' width='100' /></a><br><br>
            <div>Team ConvertML</div>
            <br>
        </div>`
    };
};
  
const inbound_meeting_confirmation = ({ userName }: { userName: string }) => {
    if (!userName) {
        throw new Error("User name is required for the inbound meeting confirmation template.");
    }

    return {
        subject: "Meet Us at INBOUND – Your Meeting is Confirmed! 🎉",
        body: `INBOUND Meeting Confirmation`,
        html: `
        <div style='font-size: 15px; font-family: Arial, Helvetica, sans-serif;'>
            <strong>Hi ${userName},</strong><br><br>
            <p>Thank you for scheduling a meeting with ConvertML at INBOUND! We’re excited to show you how our GenAI-powered platform can transform your customer analytics.</p>
            
            <p>📍 <strong>Booth No. 31</strong> at The Boston Convention and Exhibition Center, Boston, MA</p>
            
            <p>During our chat, we'll cover:</p>
            <ul>
                <li>Seamless data integration with 100+ sources</li>
                <li>Predictive analytics & GenAI-driven insights</li>
                <li>Tailored ML solutions to boost engagement & reduce churn</li>
                <li>Interactive demo with ConvertML Copilot</li>
            </ul>
            <p>If you have any questions before the event, feel free to reach out. We look forward to meeting you at Booth No. 31!</p>
            <br/>
            <strong>Best regards,</strong><br>
            <strong>Team ConvertML</strong><br>
            <br/>
            <a href=\"https://convertml.ai\" target='_blank'><img src='https://convertml.ai/images/convertmlLogo.png' width='100' /></a><br><br>
        </div>`
    };
};
    
const inbound_meeting_confirmation_founder = ({ userName, userEmail, phone, companyName, mailType }: { userName: string; userEmail: string; phone: number; companyName: string; mailType: string }) => {
    if (!userName || !userEmail || !phone || !companyName || !mailType) {
        throw new Error("Required fields missing for inbound_meeting_confirmation_founder template.");
    }

    return {
        subject: `Meeting Scheduled at INBOUND with ${userName}`,
        body: "INBOUND Meeting Confirmation",
        html: `
        <div style='font-size: 15px; font-family: Arial, Helvetica, sans-serif;'>
            <strong>Hi Deepak Sondhi,</strong><br><br>
            <p>A meeting has been scheduled with a prospective client at INBOUND. Here are the details:</p>
            <p><strong>Name:</strong> ${userName}</p>
            <p><strong>Company:</strong> ${companyName}</p>
            <p><strong>Email:</strong> ${userEmail}</p>
            <p><strong>Phone:</strong> ${phone}</p>
            <p><strong>Mail Type:</strong> ${mailType}</p>
            <p>The meeting will take place at Booth No. 31 at The Boston Convention and Exhibition Center, Boston, MA.</p>
            <p>We will be discussing our GenAI-powered platform and how it can transform their customer analytics, including:</p>
            <ul>
                <li>Seamless data integration with 100+ sources</li>
                <li>Predictive analytics & GenAI-driven insights</li>
                <li>Tailored ML solutions to boost engagement & reduce churn</li>
                <li>Interactive demo with ConvertML Copilot</li>
            </ul>
            <p>Please ensure everything is prepared for the meeting.</p>
            <br/>
            <strong>Best regards,</strong><br>
            <strong> Team ConvertML</strong><br>
            <br/>
            <a href=\"https://convertml.ai\" target='_blank'><img src='https://convertml.ai/images/convertmlLogo.png' width='100' /></a><br><br>
        </div>`
    };
};

   // Unlock Report Template
const unlock_report_confirmation = ({ userName, userEmail, phone, companyName, leadMagnetName, downloadLink } : { userName: String, userEmail:String, phone:number, companyName:String, leadMagnetName:String, downloadLink:String }) => {
    if (!userName || !userEmail || !phone || !companyName || !leadMagnetName || !downloadLink) {
        throw new Error("Required fields missing for unlock_report_confirmation template.");
    }

    // Get the base URL from the environment file
   // const baseURL = process.env.UNLOCK_REPORT || 'https://test.convertml.ai/';
    const fullDownloadLink = `${process.env.CLIENT_URL}${downloadLink}`;

    return {
        subject: `Your ${leadMagnetName} is Ready for Download!`,
        body: `Hi ${userName},\n\nThank you for your interest in ${leadMagnetName}! 🎉 We're thrilled to have you as part of the ConvertML community.\n\nHere’s the link to download your resource: ${fullDownloadLink}\n\nWhat’s Next?\nAt ConvertML, we combine AI-powered technology with a co-pilot approach to predict customer behavior and preferences, giving your business the insights needed to make smarter, data-driven decisions.\n\nIf you have any questions or want to learn how ConvertML can support your growth, simply reply to this email or visit https://convertml.ai. We're here to help you unlock the full potential of AI for exceptional results.\n\nStay tuned for more tips, insights, and updates from us!\n\nBest regards,\n Team ConvertML`,
        html: `
        <div style='font-size: 15px; font-family: Arial, Helvetica, sans-serif;'>
            <strong>Hi ${userName},</strong><br><br>
            <p>Thank you for your interest in ${leadMagnetName}! 🎉 We're thrilled to have you as part of the ConvertML community.</p>
            <p>Here’s the link to download your resource: <a href="${fullDownloadLink}" target="_blank">${leadMagnetName}</a></p>
            <p><strong>What’s Next?</strong></p>
            <p>At ConvertML, we combine AI-powered technology with a co-pilot approach to predict customer behavior and preferences, giving your business the insights needed to make smarter, data-driven decisions.</p>
            <p>If you have any questions or want to learn how ConvertML can support your growth, simply reply to this email or visit <a href="https://convertml.ai" target="_blank">our website</a>. We're here to help you unlock the full potential of AI for exceptional results.</p>
            <p>Stay tuned for more tips, insights, and updates from us!</p>
            <br/>
            <strong>Best regards,<br> Team ConvertML</strong><br>
            <br/>
            <a href="https://convertml.ai" target="_blank"><img src="https://convertml.ai/images/convertmlLogo.png" width="100" /></a><br><br>
        </div>`
    };
};


  
 // Unlock Report Confirmation for Founder Template
const unlock_report_confirmation_founder = ({ userName, userEmail, phone, companyName, leadMagnetName }: { userName: string, userEmail: string, phone: number, companyName: string, leadMagnetName: string 
 }) => {
     if (!userName || !userEmail || !phone || !companyName || !leadMagnetName) {
         throw new Error("Required fields missing for unlock_report_confirmation_founder template.");
     }
 
     return {
         subject: `New Lead Magnet Download Submission from ${userName}`,
         body: `Hi Team,\n\nWe’ve just received a new submission for our ${leadMagnetName}. Below are the details:\n\nName: ${userName}\nEmail: ${userEmail}\nCompany: ${companyName}\nContact number: ${phone}\nDownload Link Accessed: ${leadMagnetName}\n\nBest regards,\nTeam ConvertML`,
         html: `
         <div style='font-size: 15px; font-family: Arial, Helvetica, sans-serif;'>
             <p>Hi Team,</p>
             <p>We’ve just received a new submission for our ${leadMagnetName}. Below are the details:</p>
             <ul>
                 <li><strong>Name:</strong> ${userName}</li>
                 <li><strong>Email:</strong> ${userEmail}</li>
                 <li><strong>Company:</strong> ${companyName}</li>
                 <li><strong>Contact number:</strong> ${phone}</li>
                 <li><strong>Download Link Accessed:</strong> ${leadMagnetName}</li>
             </ul>
             <p><br/>
                 <strong>Best,<br>
                  Team ConvertML</strong><br>
                 <br/>
                 <a href="https://convertml.ai" target="_blank">
                     <img src="https://convertml.ai/images/convertmlLogo.png" width="100" />
                 </a><br><br>
         </div>`
    };
};


//subscription plans
exports.subscription_plans = {
  Enterprise: {       // Do not change
      amount: 75000,  // i.e. 750 USD , amount can be changed
      currency: "USD",
      notes: {
          plan: "Enterprise",
      },
  },
  Premium: {         // Do not change
      amount: 94000, // i.e. 1000 USD , amount can be changed
      currency: "USD",
      notes: {
          plan: "Premium",
      },
  },
};

  
  
export {signup_mail_template, signup_mail_to_admin_template, datasource_mail_to_admin_template, templates_mail_to_admin_template, power_user_mail_to_admin_template, power_user_mail_user_template, password_reset_mail_template,
    mail_confermatiom_template, payment_confirmation_mail_to_user_template, payment_confirmation_mail_to_admin_template, payment_failure_mail_to_user_template, payment_failure_mail_to_admin_template,
    schedule_demo, schedule_demo_confirmation, welcome_subscriber, welcome_subscriber_confirmation, support_fax, inbound_meeting_confirmation, inbound_meeting_confirmation_founder, unlock_report_confirmation,
    unlock_report_confirmation_founder
    };