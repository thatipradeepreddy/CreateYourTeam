import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { PlayerState, PlayerProps } from './players.type'

const initialState: PlayerState = {
    players: [],
    loading: false,
    error: null,
}

const playerSlice = createSlice({
    name: 'players',
    initialState,
    reducers: {
        fetchPlayersRequest: (state) => {
            state.loading = true
            state.error = null
        },
        fetchPlayersSuccess: (state, action: PayloadAction<PlayerProps[]>) => {
            state.players = action.payload
            state.loading = false
        },
        fetchPlayersFailure: (state, action: PayloadAction<string>) => {
            state.loading = false
            state.error = action.payload
        },
    },
})

export const { fetchPlayersRequest, fetchPlayersSuccess, fetchPlayersFailure } = playerSlice.actions

export default playerSlice.reducer
