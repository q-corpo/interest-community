import mongoose from "mongoose";
import User from "../models/user.js";

const initUser = async () => {
  const count = await User.countDocuments();
  if(count === 0){
    await User.create({
      username: 'test-user',
      bio: 'i love to write code',
      
    })
  }
}

export {initUser};
