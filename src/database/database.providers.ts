import { Provider } from '@nestjs/common';
import { DatabaseConnectionCheckService } from './service/database.connection-check.service';

export const databaseProviders: Provider[] = [
  // 示例1：数据库连接检查服务
  {
    provide: 'DATABASE_CONNECTION_CHECK',
    useClass: DatabaseConnectionCheckService,
  },
];
