import { DataSource, DataSourceOptions } from "typeorm";

require('dotenv').config();

export class ConfigService {

  constructor(private env: { [k: string]: string | undefined }) { }

  public getValue(key: string, throwOnMissing = true): string {
    const value = this.env[key];
    if (!value && throwOnMissing) {
      throw new Error(`config error - missing env.${key}`);
    }

    return value;
  }

  public ensureValues(keys: string[]) {
    keys.forEach(k => this.getValue(k, true));
    return this;
  }

  public getPort() {
    return this.getValue('PORT', true);
  }

  public isProduction() {
    const mode = this.getValue('MODE', false);
    return mode != 'DEV';
  }
}

const configService = new ConfigService(process.env)
  .ensureValues([
    'POSTGRES_HOST',
    'POSTGRES_PORT',
    'POSTGRES_USER',
    'POSTGRES_PASSWORD',
    'POSTGRES_DATABASE'
  ]);

export const dataSourceOptions: DataSourceOptions = {
    type: 'postgres',
    database: configService.getValue('POSTGRES_DATABASE'),
    username: configService.getValue('POSTGRES_USER'),
    password: configService.getValue('POSTGRES_PASSWORD'),
    port: parseInt(configService.getValue('POSTGRES_PORT')),
    host: configService.getValue('POSTGRES_HOST'),
    entities: ['dist/**/*.entity.js'],
    migrations: ['dist/db/migrations/*.js'],
    ssl: configService.isProduction(),
}; 

const dataSource = new DataSource(dataSourceOptions);
export default dataSource;

export { configService };