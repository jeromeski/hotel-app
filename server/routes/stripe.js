import express from "express";

const router = express.Router();

// middleware
import { requireSignin } from "../middlewares";
// controllers
import {
	createConnectAccount,
	getAccountStatus,
	getAccountBalance,
	payoutSettings
} from "../controllers/stripe";

router.post("/connect-account", requireSignin, createConnectAccount);
router.post("/account-status", requireSignin, getAccountStatus);
router.post("/account-balance", requireSignin, getAccountBalance);
router.post("/payout-settings", requireSignin, payoutSettings);

module.exports = router;
