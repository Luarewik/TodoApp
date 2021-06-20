import express, { Request, Response } from "express";
import { SuccessResponse } from "../../../core/ApiResponse";

const router = express.Router();

router.get("/", (req: Request, res: Response) => {
  return new SuccessResponse("success", "test test test").send(res);
});

export default router;
