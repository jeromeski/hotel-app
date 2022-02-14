import express from "express";

const router = express.Router();

// middleware
import { requireSignin } from "../middlewares";
// controllers
import { createConnectAccount, getAccountStatus } from "../controllers/stripe";

router.post("/connect-account", requireSignin, createConnectAccount);
router.post("/account-status", requireSignin, getAccountStatus);

module.exports = router;
