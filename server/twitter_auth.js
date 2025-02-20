import express from 'express';
import dotenv from 'dotenv';
import { randomBytes } from 'node:crypto';

// const twitter_router = express.Router();
/*
 ---> trying to sign a request
 The log in with twitter doc assumes that the reader knows how to sign requests using the OAuth 1.0a protocol
*/

const test_nonce = Buffer.from(randomBytes(32)).toString('base64').replace(/[^a-zA-Z0-9]/g, '');


const client = {
  oauth_consumer_key: "lQlq9VOHGBHXlqu5UbkBhWB2Y",
  oauth_nonce: test_nonce,
  oauth_signature: "",
  oauth_signature_method: "HMAC-SHA1",
  oauth_timestamp: "",
  oauth_token: "1793518082398306304-BKSbUs14RQNPhaOU1wxYgvxVtHbzuy",
  oauth_version: "1.0",
}


console.log(test_nonce);
