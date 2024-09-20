import { all } from 'redux-saga/effects'
import playerSaga from './players/playerSaga'

export default function* rootSaga() {
    yield all([playerSaga()])
}
