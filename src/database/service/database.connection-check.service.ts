import { Injectable, Logger } from '@nestjs/common';
import { InjectConnection } from '@nestjs/sequelize';
import { Sequelize } from 'sequelize-typescript';

@Injectable()
export class DatabaseConnectionCheckService {
  private readonly logger = new Logger('DatabaseConnectionCheckService');
  constructor(
    @InjectConnection('mysql')
    private readonly sequelize: Sequelize,
  ) {}

  async checkConnection(): Promise<void> {
    try {
      await this.sequelize.authenticate();
      this.logger.log(
        '✅ Database connection has been established successfully.',
      );
    } catch (error) {
      this.logger.error('❌ Unable to connect to the database:', error);
    }
  }
}
