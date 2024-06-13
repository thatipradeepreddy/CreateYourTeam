import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import { createData } from './DataHandlers/create.js'
import { getDataById } from './DataHandlers/get.js'
import { getAllData } from './DataHandlers/getall.js'
import updateData from './DataHandlers/update.js'
import { deleteData } from './DataHandlers/delete.js'
import { deletePlayerByName } from './DataHandlers/deleteplayerbyname.js'
import { addNewPlayer } from './DataHandlers/addnewplayer.js'
import { updatePlayerByIdAndName } from './DataHandlers/editPlayerByName.js'
import { getPlayerByIdAndName } from './DataHandlers/getPlayerByName.js'
import userRouter from './UserHandlers/user.js'

const app = express()

app.use(
	cors({
		origin: '*',
	})
)

app.use(bodyParser.json())

app.use('/user', userRouter)

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
