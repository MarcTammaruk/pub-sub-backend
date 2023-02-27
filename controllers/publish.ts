const redis = require("redis");
import { NextFunction, Request, Response } from "express";

exports.pub = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { topic, content } = req.body;

    const client = redis.createClient();
    client.on("error", (err: any) => console.log("Redis Client Error", err));

    await client.connect();
    const publisher = client.duplicate();

    await publisher.connect();
    await publisher.publish(topic, content);
    return res.json({ status: "Success" });
  } catch (error: any) {
    res.status(400).json({
      error: {
        message: "เกิดข้อผิดพลาด " + error.message,
      },
    });
  }
};
//   (async () => {
//     // const publisher = createClient();
//      // const article = {
//      //   id: '123456',
//      //   name: 'Using Redis Pub/Sub with Node.js',
//      //   blog: 'Logrocket Blog',
//      // };

//      // await publisher.connect();

//      // await publisher.publish('user-notify', JSON.stringify(article));
//      // const topic = process.argv[2];
//      const client = redis.createClient();
//      client.on('error', (err) => console.log('Redis Client Error', err));
//      await client.connect();

//      const publisher = client.duplicate();
//      await publisher.connect();
//      await publisher.publish('topic1', 'test 1234');

//    })();
