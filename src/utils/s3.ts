import AWS from 'aws-sdk';

// Define the types for environment variables (optional but recommended)
interface EnvVariables {
  USER_ACCESS_KEY: string;
  USER_SECRET_KEY: string;
  BUCKET_REGION: string;
  MONGO_DB_NAME: string;
}

const getEnv = (key: keyof EnvVariables): string => {
  const value = process.env[key];
  if (!value) {
    throw new Error(`Missing environment variable: ${key}`);
  }
  return value;
};

// Set up AWS SDK configuration with environment variables
AWS.config.update({
  credentials: {
    accessKeyId: getEnv('USER_ACCESS_KEY'),
    secretAccessKey: getEnv('USER_SECRET_KEY'),
  },
  region: getEnv('BUCKET_REGION'),
});

// Function to create an S3 bucket
const createS3Bucket = async (bucketName: string): Promise<string> => {
  const s3 = new AWS.S3({
    apiVersion: '2006-03-01',
    signatureVersion: 'v4',
  });

  // Creating the bucket name dynamically
  const bucketNameTmp = `convertml-${getEnv('MONGO_DB_NAME')}-data`;

  const params: AWS.S3.PutObjectRequest = {
    Bucket: bucketNameTmp,
    Key: `${bucketName}/`,
    ContentType: 'application/octet-stream', // Set content type here when uploading an object
  };

  // Upload a placeholder object to initialize the bucket
  await s3.putObject(params).promise();

  return bucketName;
};

export { createS3Bucket };

