import express from 'express';
const app = exppress();


const userIdValidator = (req, res, next) => {
  const {userId} = req.params;
    if(!userId || userId.length === 0){
      return res.status(400).json({
        success: false,
        message: 'user id required'
      })
    }
  next();
}


export {userIdValidator};
