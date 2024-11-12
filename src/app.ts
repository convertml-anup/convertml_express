import express from 'express';
import swaggerUi from 'swagger-ui-express';
 
import swaggerDocument from './swagger.json';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes';
import connectDB from './config/db';

dotenv.config();

const app = express();

app.use(express.json());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/api/auth', authRoutes);

connectDB();

export default app;
