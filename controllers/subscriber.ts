const redis = require("redis");
import { NextFunction, Request, Response } from "express";

exports.sub = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { topic } = req.body;

    const client = redis.createClient();
    client.on("error", (err: any) => console.log("Redis Client Error", err));
    await client.connect();

    const subscriber = client.duplicate();
    await subscriber.connect();
    await subscriber.subscribe(topic, (message: any) => {
      console.log("Got message from topic:", topic);
      console.log(message); // 'message'
    });

    process.on("SIGINT", () => {
      client.quit();
      subscriber.quit();
      process.exit(0);
    });
    return res.json({ status: "Success" });
  } catch (error: any) {
    res.status(400).json({
      error: {
        message: "เกิดข้อผิดพลาด " + error.message,
      },
    });
  }
};
