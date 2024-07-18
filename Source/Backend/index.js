import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import { createData } from './src/DataHandlers/create.js'
import { getDataById } from './src/DataHandlers/get.js'
import { getAllData } from './src/DataHandlers/getall.js'
import updateData from './src/DataHandlers/update.js'
import { deleteData } from './src/DataHandlers/delete.js'
import { deletePlayerByName } from './src/DataHandlers/deleteplayerbyname.js'
import { addNewPlayer } from './src/DataHandlers/addnewplayer.js'
import { updatePlayerByIdAndName } from './src/DataHandlers/editPlayerByName.js'
import { getPlayerByIdAndName } from './src/DataHandlers/getPlayerByName.js'
// import userRouter from './UserHandlers/user.js'
import signuprouter from './src/UserHandlers/newuser.js'
import loginrouter from './src/UserHandlers/login.js'
import protectedrouter from './src/UserHandlers/protectedroute.js'
import otprouter from './src/UserHandlers/otp/otp.js'

const app = express()

app.use(
	cors({
		origin: '*',
	})
)

app.use(bodyParser.json())

app.use('/user', signuprouter)

// app.use('/user', loginrouter)

// app.use('/user', protectedrouter)

// app.use('/otp', otprouter)

app.post('/createdata', createData)

app.get('/:id', getDataById)

app.get('/', getAllData)

app.put('/:id', updateData)

app.put('/addnewPlayer/:id', updateData)

app.delete('/:id', deleteData)

app.delete('/:id/:name', deletePlayerByName)

app.put('/editplayerbyname/:id/:name', updatePlayerByIdAndName)

app.get('/getplayerbyname/:id/:name', getPlayerByIdAndName)

app.post('/addNewPlayer/:id/:place', addNewPlayer)

app.listen(5000, () => {
	console.log('server started and listnening to the port 5000')
})
