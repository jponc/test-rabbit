const amqp = require("amqplib/callback_api");
const rabbitConnUrl = process.env.RABBITMQ_CONN_URL;

console.log(rabbitConnUrl);

amqp.connect(rabbitConnUrl, function (error0, connection) {
  if (error0) {
    throw rabbitConnUrl;
  }

  connection.createChannel(function (error1, channel) {
    if (error1) {
      throw error1;
    }

    var queue = "hello";

    channel.assertQueue(queue, {
      durable: false,
    });

    console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", queue);

    channel.consume(
      queue,
      function (msg) {
        console.log(" [x] Received %s", msg.content.toString());
      },
      {
        noAck: true,
      }
    );
  });
});
