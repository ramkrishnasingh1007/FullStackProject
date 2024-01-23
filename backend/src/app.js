import express from "express";
import cors from "cors";

const app = express();

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))
app.use(express.json())

//routes import
import calendar1Route from "./routes/calendar1.routes.js"
import calendar2Route from "./routes/calendar2.routes.js"

app.use("/api/v1/calendar", calendar1Route)

app.use("/api/v2/calendar", calendar2Route)



export {app}