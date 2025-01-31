import express from 'express';
import dotenv from 'dotenv';
import crypto from 'crypto';
dotenv.config()
const app = express();
app.use(express.json());
const PORT = process.env.PORT;

const oauth_nonce = crypto.randomBytes(32).toString("base64").replace(/\W/g, "");
console.log(oauth_nonce);

app.listen(PORT, (req, res)=> {
  console.log('server is up')
})

app.get('/', (req, res)=>{
  res.send('Welcome to the interest community web app')
})



