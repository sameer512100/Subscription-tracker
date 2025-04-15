import {config} from 'dotenv';

// Load environment variables from .env file
config({path: `.env.${process.env.NODE_ENV || 'development'}.local`});


export const {PORT,NODE_ENV,DB_URI,JWT_SECRET,JWT_EXPIRES_IN,ARCJET_ENV,ARCJET_KEY} = process.env;