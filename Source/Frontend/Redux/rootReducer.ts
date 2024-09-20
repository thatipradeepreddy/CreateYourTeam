import { combineReducers } from '@reduxjs/toolkit'
import playerReducer from './players/playerSlice'

const rootReducer = combineReducers({
    players: playerReducer,
})

export default rootReducer
