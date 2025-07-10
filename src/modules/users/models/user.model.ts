import { Column, Model, Table, DataType } from 'sequelize-typescript';

@Table({
  tableName: 'user',
  timestamps: false,
  freezeTableName: false,
})
export class User extends Model<User> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  uuid: number;

  @Column({
    type: DataType.STRING(128),
    allowNull: false,
  })
  firstName: string;

  @Column({
    type: DataType.STRING(128),
    allowNull: false,
  })
  lastName: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  isActive: number;

  @Column({
    type: DataType.DATE,
    defaultValue: DataType.NOW,
    comment: '创建时间',
  })
  createdAt: Date;

  @Column({
    type: DataType.DATE,
    defaultValue: DataType.NOW,
    comment: '更新时间',
  })
  updatedAt: Date;

  @Column({
    type: DataType.DATE,
    defaultValue: DataType.NOW,
    comment: '删除时间',
  })
  deletedAt: Date;
}
