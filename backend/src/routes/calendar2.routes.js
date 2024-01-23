import {Router} from "express"
import {cal2TestCases, calendar2Entry} from "../controllers/calendar2.controller.js";

const router = Router()

router.route("/cal2Entry").post(calendar2Entry)
router.route("/cal2Cases").post(cal2TestCases)


export default router