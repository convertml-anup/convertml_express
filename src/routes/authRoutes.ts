import express from 'express';

import { signup, loginUser, logoutUser, verifyUser, verifyUserFirstTime, sendMailScheduleDemo, sendMailInboundMeeting, sendMailUnlockReport, onboardingUser, checkUserEmail } from '../controllers/AuthRoutes';


const router = express.Router();
const app = express();

//authroutes.ts//
router.post('/signup', signup);
router.post('/login', loginUser);
router.post('/logoutUser', logoutUser );
router.post('/verifyUser', verifyUser );
router.post('/verifyUserFirstTime', verifyUserFirstTime);
router.post('/sendMailScheduleDemo', sendMailScheduleDemo);
router.post('/sendMailInboundMeeting', sendMailInboundMeeting);
router.post('/sendMailUnlockReport', sendMailUnlockReport);
router.post('/onboardingUser',  onboardingUser);
router.post('/checkUserEmail', checkUserEmail);



export default router;
