import { Hono } from "hono";
import {
  createUser,
  getAllUsers,
  login,
  logout,
} from "../controllers/user-controller";
import { middleware_auth } from "../middleware/middleware";

const users = new Hono();

users.get("/", getAllUsers);
users.post("/register", createUser);
users.post("/login", login);
users.post("logout", logout);

export default users;
