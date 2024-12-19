import express, { Request, Response } from "express";
import { CreateUserUseCase } from "../../application/use-cases/CreateUserUseCase";
import { GetUserByIdUseCase } from "../../application/use-cases/GetUserByIdUseCase"; 
import { UserRepository } from "../../domain/repositories/UserRepository";

const userRouter = express.Router();

const userRepository = new UserRepository();
const createUserUseCase = new CreateUserUseCase(userRepository);
const getUserByIdUseCase = new GetUserByIdUseCase(userRepository);

userRouter.post("/users", async (req: Request, res: Response) => {
  const { name, email, preferences, eventId } = req.body;

  try {
    const user = await createUserUseCase.execute(name, email, preferences, eventId);
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ message: (error as Error).message });
  }
});

userRouter.get("/users/:id", async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const user = await getUserByIdUseCase.execute(Number(id));
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ message: (error as Error).message });
  }
});

export default userRouter;