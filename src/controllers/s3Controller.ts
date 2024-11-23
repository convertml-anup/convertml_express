import * as AWS from 'aws-sdk';

AWS.config.update({
    credentials: {
        accessKeyId: process.env.USER_ACCESS_KEY as string,
        secretAccessKey: process.env.USER_SECRET_KEY as string,
    },
    region: process.env.AWS_REGION as string,
});

const s3 = new AWS.S3({
    apiVersion: "2006-03-01",
    signatureVersion: "v4",
    region: 'us-east-2',
});

interface S3Response {
    Body: Buffer | string | undefined;
    [key: string]: any; // other properties may vary
}

const getS3Url = async (bucketName: string, fileName: string): Promise<string> => {
    const params: AWS.S3.GetObjectRequest = {
        Bucket: bucketName,
        Key: fileName
    };
    const preSignedUrl: string = await s3.getSignedUrlPromise("getObject", params);
    return preSignedUrl;
};

const read = async (bucket: string, url: string): Promise<S3Response> => {
    const params: AWS.S3.GetObjectRequest = {
        Bucket: bucket,
        Key: url,
        // You can specify ContentType if necessary here
        // ContentType: 'application/octet-stream'
    };
    return new Promise((resolve, reject) => {
        s3.getObject(params, (err, data) => {
            if (err) reject(err);
            else resolve(data as S3Response);
        });
    });
};

const del = async (bucket: string, url: string): Promise<AWS.S3.DeleteObjectOutput> => {
    const params: AWS.S3.DeleteObjectRequest = {
        Bucket: bucket,
        Key: url
    };
    return new Promise((resolve, reject) => {
        s3.deleteObject(params, (err, data) => {
            if (err) reject(err);
            else resolve(data as AWS.S3.DeleteObjectOutput);
        });
    });
};

const list = async (s3Folder: string): Promise<AWS.S3.ListObjectsV2Output> => {
    const params: AWS.S3.ListObjectsV2Request = {
        Bucket: process.env.bucket as string,
        Delimiter: '/',
        Prefix: `${s3Folder}/`
    };
    return new Promise((resolve, reject) => {
        s3.listObjectsV2(params, (err, data) => {
            if (err) reject(err);
            else resolve(data as AWS.S3.ListObjectsV2Output);
        });
    });
};

export{ getS3Url, read, del, list };


