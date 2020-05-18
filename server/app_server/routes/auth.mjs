import express from 'express';
import User from '../../app_api/models/User/User';
import { register, login } from '../controllers/auth';
import bodyParser from 'body-parser';

// import bodyParser from 'body-parser';
const router = express.Router();
// router.use(bodyParser.json());
// router.use(bodyParser.urlencoded({ extended: true }));
var jsonParser = bodyParser.json({ limit: '50mb' });
var urlParser = bodyParser.urlencoded({ limit: '50mb', extended: true });

//Auth Routes
router
    .route('/register')
    .post(jsonParser, urlParser, (req, res) => {
        register(req, res);
        // ctrlAuth.register(req, res);
    });

router
    .route('/login')
    .post(jsonParser, urlParser, (req, res) => {
        login(req, res);
        // ctrlAuth.login(req, res);
    });
//create a forgot password

//end of Auth Routes

export default router;