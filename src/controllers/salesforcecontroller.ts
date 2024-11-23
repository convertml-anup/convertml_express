import jsforce from 'jsforce';
import sfbulk from 'node-sf-bulk2';
import { read, getS3Url } from './s3Controller';
import request from 'request';
import User from '../models/user';
import { Request, Response } from 'express';

interface BulkConnect {
    accessToken: any;
    apiVersion: any;
    instanceUrl: any;
}

const uploadJobData = async (req: any, res: any): Promise<void> => {
    try {
        const user = await User.findById(req.user.id);
        if (!user || !user.salesforce) {
            throw new Error("User or Salesforce credentials not found");
        }

        const bulkconnect: BulkConnect = {
            accessToken: user.salesforce.accessToken,
            apiVersion: '51.0',
            instanceUrl: user.salesforce.instanceUrl
        };

         // create a new BulkAPI2 class
         const bulkrequest = new sfbulk.BulkAPI2(bulkconnect);
         // create a bulk insert job
         const jobRequest = {
             object: 'Users',
             operation: 'insert',
             contentType: 'CSV',
             lineEnding: 'CRLF'
         };
         
         const response = await bulkrequest.createDataUploadJob(jobRequest);
         if (response.id) {
             // read csv data from the local file system
             const url = await getS3Url(String(req.user.id), 'customers.csv');
             console.log(url);
 
             request.get({
                 uri: url,
                 headers: { 'Content-type': 'text/csv; charset=utf-8' }
             }, async (err: any, _ : any, body : any) => {
                 if (err) {
                     console.error("Error fetching CSV data: ", err);
                     return;
                 }
 
                 const status = await bulkrequest.uploadJobData(response.contentUrl, body);
                 if (status === 201) {
                     // close the job for processing
                     const result = await bulkrequest.closeOrAbortJob(response.id, 'UploadComplete');
                     console.log(result);
                 }
             });
         }
     } catch (ex) {
         console.error(ex);
     }
};


const salesforceLogin = (req: Request, res: Response): void => {
        const protocol = req.protocol;
        const host = req.hostname;
        const port = process.env.PORT || 3000;
    
        const oauth2 = new jsforce.OAuth2({
            loginUrl: 'https://login.salesforce.com',
            clientId: process.env.SALESFORCE_CLIENT_ID!,
            clientSecret: process.env.SALESFORCE_CLIENT_SECRET!,
            redirectUri: `${protocol}://${host}:${port}/auth/salesforce/token`
        });
    
        res.redirect(oauth2.getAuthorizationUrl({ scope: 'api id web refresh_token' }));
};

const getToken = async (req: Request, res: Response): Promise<void> => {
        try {
            const protocol = req.protocol;
            const host = req.hostname;
            const port = process.env.PORT || 3000;
    
            const conn = new jsforce.Connection({
                oauth2: new jsforce.OAuth2({
                    loginUrl: 'https://login.salesforce.com',
                    clientId: process.env.SALESFORCE_CLIENT_ID!,
                    clientSecret: process.env.SALESFORCE_CLIENT_SECRET!,
                    redirectUri: `${protocol}://${host}:${port}/auth/salesforce/token`
                })
            });
    
            // const code = req.query.code as string;
            // conn.authorize(code, (err : any) => {
            //     if (err) {
            //         console.error("This error is in the auth callback: ", err);
            //         return;
            //     }
    
            //     res.redirect(`${process.env.CLIENT_URL}/dashboard/ml-analytics/export-to-crm?code=${conn.accessToken}&platform=salesforce&instanceUrl=${conn.instanceUrl}`);
            // });
        } catch (err) {
            console.error("Error during token retrieval: ", err);
        }
};

export { uploadJobData, salesforceLogin, getToken };