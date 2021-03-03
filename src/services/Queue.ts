import {Queue as QueueBull} from 'bullmq';

class Queue {
  private queue: QueueBull<unknown, unknown, string>;

  constructor() {
    this.queue = new QueueBull(
      process.env.DISPATCH_QUEUE_NAME,
      {
        connection: {
          host: process.env.REDIS_HOST,
          port: Number(process.env.REDIS_PORT),
          password: process.env.REDIS_PASSWORD,
          db: Number(process.env.REDIS_DB),
        }
      }
    );
  }

  async add(emails: string[], message: {title: string, message: string}): Promise<void> {
    await this.queue.add(process.env.DISPATCH_JOB_NAME, {emails, message});
  }
}

export {Queue};
