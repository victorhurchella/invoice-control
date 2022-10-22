import { startPrisma } from "./db/prisma";
import cors from "cors";
import express from "express";
import router from "./routes";
import passport from "./utils/passport";
import "dotenv/config";

const initializeApp = async () => {
  const app = express();

  await startPrisma();

  app.use(cors());
  app.use(express.json());
  app.use(passport.initialize());
  app.use(router);

  const port = process.env.PORT ?? 3000;
  app.listen(port, () => console.log(`Server is running in port ${port}`));
};

const main = initializeApp();

export default main;
