import "reflect-metadata"; 
import { AppDataSource } from "../../data-source"; 
import express, { Request, Response } from "express"; 


AppDataSource.initialize()
  .then(() => {
    console.log("DataSource has been initialized!");

    const app = express();

    app.use(express.json());

    // Definir as rotas aqui

    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  })
  .catch((error: any) => {
    console.error("Error during DataSource initialization:", error);
    process.exit(1); 
  });
