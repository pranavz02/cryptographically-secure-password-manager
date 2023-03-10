import jwt from 'jsonwebtoken';
import users from '../models/user.js';
import { validationResult } from "express-validator"
import bcrypt from "bcrypt";
import nodeRSA from 'node-rsa';

export const signup = async (req, res) => {
    console.log(req.body);
    const { username, email, password } = req.body;
    
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({
        error: errors.array()[0].msg,
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const key = new nodeRSA({b: 512});
    const publicKey = key.exportKey('public');
    const privateKey = key.exportKey('private');
    try {
      // const user = new users(req.body);
      const savedUser = await users.create({ username, email, password: hashedPassword, publicKey });

      return res.json({
        username: savedUser.username,
        email: savedUser.email,
        privateKey: privateKey
      });
    } catch (error) {
      console.log(error)
      return res.status(400).json({
        error
          // 'NOT able to save the user in database. Potential reason could be - Email already exists',
      });
    }
};

export const signin = async (req, res) => {
    const { password } = req.body;
    const email = req.body.email;
    try {
      const errors = validationResult(req);
  
      if (!errors.isEmpty()) {
        throw {
          statusCode: 422,
          message: errors.array()[0].msg,
        };
      }
      const user = await users.findOne({ email: req.body.email });
      if (!user) {
        throw {
          statusCode: 400,
          message: 'User not found!',
        };
      }
      const match = bcrypt.compare(password, user.password)
      if (!match) {
        throw {
          statusCode: 401,
          message: 'Credentials do not match!',
        };
      }
      
    // TOKEN CREATED
    const token = jwt.sign(
        {
          _id: user._id,
        },
        "gutdrtsfgxhfdtrdjhvkjjhvkuy"
      );
  
      // PUTTING TOKEN INSIDE BROWSER OF USER
      res.cookie('token', token, { expires: new Date() });
  
      const { username, email, hashedPassword } = users;
      return res.json({
        token,
        username,
        email,
      });
    } catch (error) {
      if (error.statusCode) {
        return res.status(error.statusCode).json({ error: error.message });
      }
      return res.status(400).json({ error: 'Database error occured' });
    }
};

export const signout = async (req, res) => {
  res.clearCookie('token');
  return res.json({
    message: 'User signed out successfully',
  });
};