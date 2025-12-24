import { Hono } from "hono";
import { createUser, getAllUsers } from "../controllers/user-controller";

const users = new Hono();

users.get("/", getAllUsers);

users.post("/register", createUser);

export default users;
