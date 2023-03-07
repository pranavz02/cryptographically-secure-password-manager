import express from 'express';
import { check } from 'express-validator';
import { signup, signin, signout } from '../controllers/auth.js';

const router = express.Router();

const checkReq = [
    check("email", "Provide a valid Email").isEmail(),
    check("password", "Password must be greater than 6 characters").isLength({
      min: 6,
    }),
  ];

router.post( '/signup', checkReq, signup );
router.post( '/signin', checkReq, signin );
router.get( '/signout', signout );

export default router;