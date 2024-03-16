
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { createData } from "./DataHandlers/create.js";
import { getDataById } from "./DataHandlers/get.js";
import { getAllData } from "./DataHandlers/getall.js";
import updateData from "./DataHandlers/update.js";
import { deleteData } from "./DataHandlers/delete.js";
import { createUserData } from "./SingUpHandlers/createuser.js";
import { getUserById } from "./SingUpHandlers/getsingup.js";
import { getAllUsersData } from "./SingUpHandlers/getallsignup.js";
import updateUserData from "./SingUpHandlers/updatesingup.js";
import { deleteUser } from "./SingUpHandlers/deleteuser.js";
import router from "./SingUpHandlers/forgot.js";
import { loginUser } from "./SingUpHandlers/login.js";
import { deletePlayerByName } from "./DataHandlers/deleteplayerbyname.js";
import { addNewPlayer } from "./DataHandlers/addnewplayer.js";
import { updatePlayerByIdAndName } from "./DataHandlers/editPlayerByName.js";
import { getPlayerByIdAndName } from "./DataHandlers/getPlayerByName.js";

const app = express();
app.use(
  cors({
    origin: "*",
  })
);

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

app.post("/createdata", createData);

app.get("/:id", getDataById);

app.get("/", getAllData);

app.put("/:id", updateData)

app.put("/addnewPlayer/:id", updateData)

app.delete("/:id", deleteData);

app.delete("/:id/:name", deletePlayerByName);

app.put("/editplayerbyname/:id/:name", updatePlayerByIdAndName);

app.get("/getplayerbyname/:id/:name", getPlayerByIdAndName);

app.post("/addNewPlayer/:id/:place", addNewPlayer);

//For User Registration

app.post("/createuser", createUserData);

app.get("/user/:id", getUserById);

app.get("/user/", getAllUsersData);

app.put("/user/:id", updateUserData)

app.delete("/user/:id", deleteUser);

app.use('/reset-password', router);

app.post('/user/login', async (request, response) => {
  const { email, password } = request.body;
  console.log(request.body, 'vinay');
  loginUser(email, password, response);
});

app.listen(5000, () => {
  console.log("server started and listnening to the port 5000");
});
