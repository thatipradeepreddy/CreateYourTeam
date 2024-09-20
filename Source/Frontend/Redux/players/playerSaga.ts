import { call, put, takeLatest } from 'redux-saga/effects'
import { fetchPlayersRequest, fetchPlayersSuccess, fetchPlayersFailure } from './playerSlice'

export const fetchPlayersApi = (): Promise<any> => {
    return new Promise((resolve, reject) => {
        fetch('http://192.168.68.79:5000/')
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`)
                }

                return response.json()
            })
            .then((data) => {
                resolve(data)
            })
            .catch((error) => {
                reject(error)
            })
    })
}

function* fetchPlayers(): Generator<any, void, any> {
    try {
        yield put(fetchPlayersRequest())
        const players = yield call(fetchPlayersApi)
        yield put(fetchPlayersSuccess(players))
    } catch (error: any) {
        yield put(fetchPlayersFailure(error.message))
    }
}

export default function* playerSaga(): Generator<any, void, any> {
    yield takeLatest('players/fetchPlayersRequest', fetchPlayers)
}
