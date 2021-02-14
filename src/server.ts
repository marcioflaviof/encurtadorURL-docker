import dotenv from "dotenv";
import express from "express";
import { createConnection } from "typeorm";
import routes from "./routes";

dotenv.config();

(async () => {
  const app = express();
  app.use(express.json());
  app.use(routes);

  try {
    await createConnection();
  } catch (err) {
    console.log(err);
  }

  app.listen(process.env.PORT || 8081, () => {
    console.log(`server started`);
  });
})();
