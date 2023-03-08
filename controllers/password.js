import users from '../models/user.js';
import passModel from '../models/password';
import { validationResult } from "express-validator"
import bcrypt from "bcrypt";

export const addPassword = async (req, res) => {
    console.log(req.body);
    const { userID, pass, website } = req.body;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({
        error: errors.array()[0].msg,
      });
    }

    const hashedPass = await bcrypt.hash(pass, 10);
    try {
        const savedPass = await passModel.create({ userID, pass: hashedPass, website });
        return res.json({
          userID : savedPass.userID,
          pass: savedPass.hashedPass,
          website: savedPass.website,
        });
      } catch (error) {
        console.log(error)
        return res.status(400).json({
          error
            // 'NOT able to save the user in database. Potential reason could be - Email already exists',
        });
    }
}


export const editPass = async (req, res) => {
    const { privateKey } = req.body;
    
}

export const deletePass = async (req, res) => {
    const { privateKey } = req.body;
    
}