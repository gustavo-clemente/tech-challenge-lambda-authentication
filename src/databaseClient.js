import pg from 'pg';

export default class DatabaseClient {
  constructor() {
    this.client = new pg.Client({
      user: process.env.DB_USER,
      host: process.env.DB_HOST,
      database: process.env.DB_DATABASE,
      password: process.env.DB_PASSWORD,
      port: process.env.DB_PORT,
    });
  }

  async connect() {
    await this.client.connect();
  }

  async queryCustomerByDocument(document) {
    const { rows } = await this.client.query('SELECT * FROM customer WHERE document = $1', [document]);
    return rows;
  }

  async close() {
    await this.client.end();
  }
}