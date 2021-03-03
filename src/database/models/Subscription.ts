/**
 * Subscriptions model
 */
import {
  Model,
  Column,
  Table,
  DataType,
  AllowNull,
  Unique,
  Length,
  IsEmail,
  Default,
  Scopes,
} from 'sequelize-typescript';

@Scopes(() => ({
  page: (page: number, pageSize: number) => ({
    offset: page * pageSize,
    limit: pageSize
  })
}))
@Table({timestamps: false, underscored: true})
export class Subscription extends Model {
  @AllowNull(false)
  @Length({max: 150})
  @IsEmail
  @Unique
  @Column(DataType.STRING)
  set email(value: string) {
    this.setDataValue('email', value.trim().toLowerCase());
  }

  @AllowNull(false)
  @Column(DataType.DATE)
  birth: Date; // Birth date

  @Default(true)
  @Column(DataType.BOOLEAN)
  flag: boolean; // Flag for consent and newsletter Id corresponding to the campaign

  @AllowNull(true)
  @Length({max: 200})
  @Column(DataType.STRING)
  set firstName(value: string) {
    if (!value) return;
    this.setDataValue('firstName', value.trim());
  }

  @AllowNull(true)
  @Column(DataType.ENUM('male', 'female'))
  gender?: string;
}
