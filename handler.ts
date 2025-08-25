import express from "express";
import serverless from "serverless-http";
import * as dynamoose from "dynamoose";

const app = express();

const database = new dynamoose.aws.ddb.DynamoDB({
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID || "",
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || "",
  },
  region: process.env.AWS_REGION || "us-east-1",
});

dynamoose.aws.ddb.set(database);

app.use(express.json());

app.use((req, res, next) => {
  return res.status(404).json({
    error: "Not Found",
  });
});

exports.handler = serverless(app);
