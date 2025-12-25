import { Hono } from "hono";
import {
  addAccount,
  deleteAccountByID,
  getAllActiveAcounts,
  updateAccountByID,
} from "../controllers/account-controller";
import { middleware_auth } from "../middleware/middleware";

const accounts = new Hono();

accounts.post("/add", middleware_auth, addAccount);
accounts.get("/", middleware_auth, getAllActiveAcounts);
accounts.delete("/delete/:id", middleware_auth, deleteAccountByID);
accounts.put("/update/:id", middleware_auth, updateAccountByID);

export default accounts;
