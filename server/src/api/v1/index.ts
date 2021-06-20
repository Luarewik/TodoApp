import express from "express";
import test from "./routers/test.route";

const router = express.Router();

router.use("/test", test);

export default router;
