import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { IsEmail, IsNotEmpty } from 'class-validator';
import * as bcrypt from 'bcryptjs';

@Entity()
export class User {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column()
  @IsNotEmpty()
  firstName!: string;

  @Column()
  @IsNotEmpty()
  lastName!: string;

  @Column({ unique: true })
  @IsNotEmpty()
  @IsEmail()
  email!: string;

  @Column()
  @IsNotEmpty()
  password!: string;

  @BeforeInsert()
  hashPassword() {
    this.password = bcrypt.hashSync(this.password, 8);
  }

  checkIfUnencryptedPasswordIsValid(unencryptedPassword: string) {
    return bcrypt.compareSync(unencryptedPassword, this.password);
  }
}
