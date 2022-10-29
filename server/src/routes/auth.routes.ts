import { Router } from "express";
import {register, login} from "../controllers/auth.controllers";
import {LOGIN, REGISTER} from "../paths";

const router = Router();

router.post(REGISTER, register);
router.post(LOGIN, login);

export default router;