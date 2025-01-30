import express from 'express';
import { handleGroqAPI, getResponse } from '../controllers/client.controllers.js';


const app = express()
const router = express.Router();

router.route('/user').post(handleGroqAPI);
router.route('/').get(getResponse);


export default router;  // Export router for use in app.js