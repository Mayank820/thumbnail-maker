import express from 'express';
import { check } from 'express-validator';
import { signupUser, loginUser } from '../controllers/auth.controllers.js';

const router = express.Router();

router.post(
  '/signup',
  [
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password must be 6 or more characters').isLength({ min: 6 }),
  ],
  signupUser
);

router.post(
  '/login',
  [
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password is required').exists(),
  ],
  loginUser
);

export default router;
