import { Hono } from "hono";
import { getAllUsers, getCurrentUser, login, logout, signup } from "../controllers/user-controller";
import { middleware_auth } from "../middleware/middleware";

const users = new Hono();

users.get("/", getAllUsers);
users.post("/register", signup);
users.post("/login", login);
users.get("/current", middleware_auth, getCurrentUser);
users.post("/logout", middleware_auth, logout);

export default users;
