const amqplib = require("amqplib");
const rabbitConnUrl = process.env.RABBITMQ_CONN_URL;
const queue = "hello";

async function main() {
  const conn = await amqplib.connect(rabbitConnUrl);
  const channel = await conn.createChannel();
  await channel.assertQueue(queue, {
    durable: false,
  });

  for (let i = 0; i < 10; i++) {
    const msg = `Hello world ${i}`;
    channel.sendToQueue(queue, Buffer.from(msg));
    console.log(`[x] Sent ${msg}`);
    await new Promise((resolve) => setTimeout(resolve, 3000));
  }
}

main()
  .then(() => {
    console.log("Successfully produced all messages");
    process.exit(0);
  })
  .catch((err) => {
    console.log("Error: %s", err);
    process.exit(1);
  });
