import { Module, Global, OnModuleInit, Inject } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { databaseProviders } from './database.providers';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { DatabaseConnectionCheckService } from './service/database.connection-check.service';
import { User } from '../modules/users/models/user.model';

@Global() // 标记为全局模块，其他模块无需重复导入
@Module({
  imports: [
    SequelizeModule.forRootAsync({
      name: 'mysql',
      imports: [ConfigModule],
      inject: [ConfigService], // 👈 必须加上这一行，才能在 useFactory 中使用 ConfigService
      useFactory: async (configService: ConfigService) => ({
        name: 'mysql',
        dialect: 'mysql',
        logging: false,
        database: configService.get('db.mysql.database'),
        host: configService.get('db.mysql.host'),
        username: configService.get('db.mysql.username'),
        password: configService.get('db.mysql.password'),
        port: configService.get('db.mysql.port'),
        synchronize: true,
        logQueryParameters: true,
        dialectOptions: {
          timezone: '+08:00',
          typeCast: function (field, next) {
            if (field.type == 'DATETIME' || field.type == 'TIMESTAMP') {
              return field.string();
            }
            return next();
          },
        },
        timezone: '+08:00',
        models: [User],
      }),
    }),
    // 多个数据库
    // SequelizeModule.forRootAsync({
    //   name: 'mysql2',
    //   imports: [ConfigModule],
    //   inject: [ConfigService], // 👈 必须加上这一行，才能在 useFactory 中使用 ConfigService
    //   useFactory: async (configService: ConfigService) => ({
    //     name: 'mysql',
    //     dialect: 'mysql',
    //     logging: false,
    //     database: configService.get('db.mysql.database'),
    //     host: configService.get('db.mysql.host'),
    //     username: configService.get('db.mysql.username'),
    //     password: configService.get('db.mysql.password'),
    //     port: configService.get('db.mysql.port'),
    //     synchronize: true,
    //     logQueryParameters: true,
    //     dialectOptions: {
    //       timezone: '+08:00',
    //       typeCast: function (field, next) {
    //         if (field.type == 'DATETIME' || field.type == 'TIMESTAMP') {
    //           return field.string();
    //         }
    //         return next();
    //       },
    //     },
    //     timezone: '+08:00',
    //     models: [],
    //   }),
    // }),
  ],
  providers: [...databaseProviders],
  exports: [SequelizeModule], // 导出 SequelizeModule 供其他模块使用
})
export class DatabaseModule implements OnModuleInit {
  constructor(
    @Inject('DATABASE_CONNECTION_CHECK')
    private readonly dbCheckService: DatabaseConnectionCheckService,
  ) {}

  async onModuleInit() {
    await this.dbCheckService.checkConnection();
  }
}
