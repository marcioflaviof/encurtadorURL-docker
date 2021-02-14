import express from "express";
import { GetURL, URLShortener } from "./controller/URLShortener";

const routes = express.Router();

routes.get("/:url", GetURL);

routes.post("/encurtador", URLShortener);

export default routes;
