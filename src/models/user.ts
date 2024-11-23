import mongoose, { Schema } from 'mongoose';
import bcrypt from 'bcrypt';

const userSchema = new Schema({
  username: {
    type: String,
    required: [true, "Please Enter an Email"],
  },
  company_name: {
    type: String,
    required: [true, "Please Enter your Company Name"],
  },
  company_email: {
    type: String,
    required: [true, "Please Enter your Company Email"],
    lowercase: true,
  },
  phone_number: {
    type: String,
  },
  last_name: {
    type: String,
    required: false
  },
  password: {
    type: String,
    required: [true, "Please Enter your Password"],
    minlength: [8, "Minimum Password Length is 6 characters"],
  },
  subscription_plan: {
    subscription_type: {
      type: String,
      default: "Basic",
    },
    subscription_start_date: {
      type: Date,
    },
    subscription_expiry_date: {
      type: Date,
    },
  },
  salesforce: {
    accessToken: {
      type: String,
    },
    instanceUrl: {
      type: String,
    },
  },
  access_token: {
    type: String,
  },
  refresh_token: {
    type: String,
  },
  hubspot_access_token: {
    type: String,
  },
  hubspot_refresh_token: {
    type: String,
  },
  klaviyo_access_token: {
    type: String,
  },
  klaviyo_refresh_token: {
    type: String,
  },
  intercom_access_token: {
    type: String,
  },
  intercom_refresh_token: {
    type: String,
  },
  intercom_token_type: {
    type: String,
  },
  shopify_access_token: {
    type: String,
  },
  shopify_scope: {
    type: String,
  },
  annual_rev: {
    type: String,
  },
  web_address: {
    type: String,
  },
  connectionType: {
    type: String,
    required: false
  },
  isAgree: {
    type: Boolean,
    default: false,
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  isFirstTimeLogged: {
    type: Boolean,
    default: false,
  },
  isOnboarded: {
    type: Boolean,
    default: false,
  },
  createdTime: {
    type: Date,
    default: Date.now,
  },
  datakeys: { type: Map, of: String, default: null }
}, { timestamps: true });

userSchema.statics.login = async function (company_email, password) {
  const user = await this.findOne({ company_email: company_email });
  await this.updateOne({ company_email: company_email },
    { $set: { createdTime: new Date() } });

  if (user) {
    if (user._doc.isVerified == false) {
      throw Error("Unverified email ID. Please verify your email ID from your inbox");
    }
    else if (user._doc.isOnboarded == false) {
      throw Error("Your onboarding process is still in progress.");
    } else {
      const auth = await bcrypt.compare(password, user.password);
      if (auth) {
        return user;
      }
      throw Error("incorrectPassword");
    }
  }
  throw Error("incorrectEmail");
};

const User = mongoose.model('User', userSchema);

export default User;
