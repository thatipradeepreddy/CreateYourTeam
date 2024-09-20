import express from "express"
import cors from "cors"
import connectDB from "./src/config/db.js"
import userRouter from "./src/controllers/userhandler.js"
import { createData } from "./src/controllers/create.js"
import { getDataById } from "./src/controllers/get.js"
import { getAllData } from "./src/controllers/getall.js"
import updateData from "./src/controllers/update.js"
import { deleteData } from "./src/controllers/delete.js"
import { deletePlayerByName } from "./src/controllers/deleteplayerbyname.js"
import { addNewPlayer } from "./src/controllers/addnewplayer.js"
import { updatePlayerByIdAndName } from "./src/controllers/editPlayerByName.js"
import { getPlayerByIdAndName } from "./src/controllers/getPlayerByName.js"
import { createScheduleData } from "./src/controllers/schedules/schedule.js"
import { config } from "dotenv"
import path from "path"
import { fileURLToPath } from "url"

config()
const app = express()
app.use(cors())
app.use(express.json())
connectDB()

app.use("/user", userRouter)

//adding players

app.post("/createdata", createData)

app.get("/:id?email=user@gmail.com", getDataById)

app.get("/?email=user@gmail.com", getAllData)

app.put("/:id", updateData)

app.put("/addnewPlayer/:id", updateData)

app.delete("/:id", deleteData)

app.delete("/:id/:name", deletePlayerByName)

app.put("/editplayerbyname/:id/:name", updatePlayerByIdAndName)

app.get("/getplayerbyname/:id/:name", getPlayerByIdAndName)

app.post("/addNewPlayer/:id/:place", addNewPlayer)

//schedule the match

app.post("/schedulematch", createScheduleData)

const PORT = process.env.PORT || 5000

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
