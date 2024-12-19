import { DataSource } from "typeorm";
import { Event } from "./src/domain/entities/Event"; 
import { User } from "./src/domain/entities/User"; 
import { Match } from "./src/domain/entities/Match";
import { Participant } from "./src/domain/entities/Participant";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST || "localhost",              
  port: Number(process.env.DB_PORT) || 5432,                     
  username: process.env.DB_USERNAME || "postgres",       
  password: process.env.DB_PASSWORD || "senha",       
  database: process.env.DB_NAME || "natal",       
  synchronize: process.env.NODE_ENV === "development", 
  logging: true,
  entities: [Event, User, Match, Participant],
  migrations: [__dirname + "/src/persistence/typeorm/migrations/**/*.ts"],
  subscribers: [],
});