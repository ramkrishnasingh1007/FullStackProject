import {Router} from "express"
import {calendar1Entry, testCases} from "../controllers/calendar1.controller.js"

const router = Router()

router.route("/dayEntry").post(calendar1Entry)
router.route("/verifyCase").post(testCases)


export default router