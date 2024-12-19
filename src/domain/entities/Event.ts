import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { User } from "./User";
import { Match } from "./Match";

@Entity()
export class Event {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  secret: string;

  @OneToMany(() => User, user => user.event)
  users: User[] = []; 

  @OneToMany(() => Match, match => match.event)
  matches: Match[] = []; 

  constructor(name: string, email: string, secret: string) {
    this.name = name;
    this.email = email;
    this.secret = secret;
  }
}
