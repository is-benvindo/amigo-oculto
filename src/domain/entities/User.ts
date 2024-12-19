import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from "typeorm";
import { Event } from "./Event";
import { Match } from "./Match";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Event, event => event.users)
  event: Event;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column("jsonb", { nullable: true })  
  preferences: any;

  @OneToMany(() => Match, match => match.user)
  matches: Match[] = []; 

  constructor(name: string, email: string, preferences: any, event: Event) {
    this.name = name;
    this.email = email;
    this.preferences = preferences;
    this.event = event;
  }
}
