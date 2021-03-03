import {Sequelize} from 'sequelize-typescript';

class DB {
  private static sequelize: Sequelize;

  public static init(): void {
    this.sequelize = new Sequelize({
      dialect: 'postgres',
      database: process.env.PG_DATABASE,
      username: process.env.PG_USER,
      password: process.env.PG_PASSWORD,
      host: process.env.PG_HOST,
      port: Number(process.env.PG_PORT),
      models: [__dirname + '/models'],
      // eslint-disable-next-line no-console
      logging: (process.env.NODE_ENV === 'product') ? false : console.log
    });
  }

  public static getSequelize(): Sequelize {
    return this.sequelize;
  }
}

export {DB};
