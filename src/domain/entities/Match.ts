import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from "typeorm";
import { User } from "./User";
import { Event } from "./Event";

@Entity()
export class Match {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, user => user.matches)
  @JoinColumn({ name: "user_id" })
  user: User;

  @ManyToOne(() => User)
  @JoinColumn({ name: "matched_user_id" })
  matchedUser: User;

  @ManyToOne(() => Event, event => event.matches)
  @JoinColumn({ name: "event_id" })
  event: Event;

  constructor(user: User, matchedUser: User, event: Event) {
    this.user = user;
    this.matchedUser = matchedUser;
    this.event = event;
  }
}
