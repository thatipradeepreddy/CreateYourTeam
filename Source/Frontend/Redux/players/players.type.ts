export interface Player {
    name: string
    age: string
    nation: string
    premierLeague: string
    image: string
}

export interface PlayerProps {
    _id: string
    place: string
    player: Player[]
}

export interface PlayerState {
    players: PlayerProps[]
    loading: boolean
    error: string | null
}
