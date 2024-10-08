import AsyncStorage from '@react-native-async-storage/async-storage'
export interface Player {
    name: string
    age: string
    nation: string
    premierLeague: string
    image: string
}

export interface PlayerProps {
    _id?: string
    place: string
    player: Player[]
}

export interface PlayerOptionalProps {
    _id: string
    place: string
    player: Player[]
}

export interface UserProps {
    name: string
    email: string
    image: string
    password: string
}

export const createUser = (userData: UserProps) => {
    return new Promise((resolve, reject) => {
        fetch('http://192.168.68.79:5000/user/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
        })
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

export const loginUser = async (user: { email: string; password: string }): Promise<any> => {
    try {
        const response = await fetch('http://192.168.68.79:5000/user/signin', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user),
        })

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`)
        }

        const data = await response.json()

        await AsyncStorage.setItem('userData', JSON.stringify(data.data))

        if (data.status === 'SUCCESS') {
            return { success: true, message: data.message }
        } else {
            return { success: false, message: data.message }
        }
    } catch (error: any) {
        return { success: false, message: error.message || 'An error occurred' }
    }
}

export const deleteUser = (id: string) => {
    return new Promise((resolve, reject) => {
        fetch(`http://192.168.68.79:5000/user/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        })
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

export function updatePassword(id: string, user: UserProps) {
    return new Promise((resolve, reject) => {
        fetch(`http://192.168.68.79:5000/user/${id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user.password),
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Failed to update password')
                }
                resolve(response.json())
            })
            .catch((error) => {
                reject(error)
            })
    })
}

export const getUserById = (id: string): Promise<UserProps> => {
    return new Promise((resolve, reject) => {
        fetch(`http://192.168.68.79:5000/user/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`)
                }
                return response.json()
            })
            .then((data) => {
                resolve(data as UserProps)
            })
            .catch((error) => {
                reject(error)
            })
    })
}

export const updateUser = (id: string, userData: UserProps) => {
    return new Promise((resolve, reject) => {
        fetch(`http://192.168.68.79:5000/user/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
        })
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

export const fetchPlayers = () => {
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

export const deleteteam = (id: string) => {
    return new Promise((resolve, reject) => {
        fetch(`http://192.168.68.79:5000/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        })
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

export const deletePlayer = (id: string, name: string) => {
    return new Promise((resolve, reject) => {
        fetch(`http://192.168.68.79:5000/${id}/${name}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        })
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

export const getPlayerById = (id: string): Promise<PlayerOptionalProps> => {
    return new Promise((resolve, reject) => {
        fetch(`http://192.168.68.79:5000/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`)
                }
                return response.json()
            })
            .then((data) => {
                resolve(data as PlayerOptionalProps)
            })
            .catch((error) => {
                reject(error)
            })
    })
}

export const getPlayerByIdName = (id: string, name: string): Promise<PlayerOptionalProps> => {
    return new Promise((resolve, reject) => {
        fetch(`http://192.168.68.79:5000/getplayerbyname/${id}/${name}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`)
                }
                return response.json()
            })
            .then((data) => {
                resolve(data as PlayerOptionalProps)
            })
            .catch((error) => {
                reject(error)
            })
    })
}

export const postPlayer = (playerData: PlayerProps) => {
    return new Promise((resolve, reject) => {
        fetch('http://192.168.68.79:5000/createdata', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(playerData),
        })
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

// export const postNewPlayer = (playerData: Player, id: string, place: string) => {
// 	return new Promise((resolve, reject) => {
// 		fetch(`http://192.168.68.79:5000/addNewPlayer/${id}/${place}`, {
// 			method: 'POST',
// 			headers: {
// 				'Content-Type': 'application/json',
// 			},
// 			body: JSON.stringify(playerData),

// 		})
// 			.then((response) => {
// 				if (!response.ok) {
// 					throw new Error(`HTTP error! Status: ${response.status}`)
// 				}
// 				return response.json()
// 			})
// 			.then((data) => {
// 				resolve(data)
// 			})
// 			.catch((error) => {
// 				reject(error)
// 			})
// 	})
// }

export const updatePlayer = (id: string, playerData: PlayerProps) => {
    return new Promise((resolve, reject) => {
        fetch(`http://192.168.68.79:5000/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(playerData),
        })
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

export const postNewPlayer = (id: string, playerData: PlayerProps) => {
    return new Promise((resolve, reject) => {
        fetch(`http://192.168.68.79:5000/addNewPlayer/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(playerData),
        })
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
