import express from 'express';
import { handleGroqAPI } from '../controllers/client.controllers.js';


const app = express()
const router = express.Router();

router.route('/user').post(handleGroqAPI);


export default router;  // Export router for use in app.js