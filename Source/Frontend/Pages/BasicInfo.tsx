import { useNavigation, useRoute } from '@react-navigation/native'
import React, { useEffect, useState } from 'react'
import { View, TextInput, StyleSheet, Text, Button, ScrollView, ImageBackground, TouchableOpacity } from 'react-native'
import { postNewPlayer, postPlayer, updatePlayer } from '../Controls/common.control'
import { NavigationProps } from './Routes'
import Icon from 'react-native-vector-icons/Ionicons'
import { ImageUpload } from '../Components/ImageUpload'

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

export function BasicInfo() {
    const [editPlayer, setEditPlayer] = useState<'add' | 'update' | 'addNew'>('add')
    const navigation = useNavigation<NavigationProps['navigation']>()
    const [statusMessage, setStatusMessage] = useState<string>('')
    const [playerState, setPlayerState] = useState<PlayerProps>({
        place: '',
        player: [],
    })

    const route = useRoute()

    useEffect(() => {
        if (route.params && (route.params as any).playerData) {
            const playerData = (route.params as any).playerData
            setPlayerState({ ...playerData, _id: playerData._id })
            setEditPlayer('update')
        } else if (route.params) {
            const routeParams = route.params as { _id: string; place: string } | undefined
            const _id = routeParams?._id || ''
            const place = routeParams?.place || ''
            setPlayerState((prevState) => ({ ...prevState, _id, place }))
            setEditPlayer('addNew')
        }
    }, [route.params])

    const handleResetPlayerData = () => {
        setPlayerState({
            place: '',
            player: [
                {
                    name: '',
                    age: '',
                    nation: '',
                    premierLeague: '',
                    image: '',
                },
            ],
        })
        setEditPlayer('add')
    }

    const handleAddPlayer = () => {
        setPlayerState({
            ...playerState,
            player: [
                ...playerState.player,
                {
                    name: '',
                    age: '',
                    nation: '',
                    premierLeague: '',
                    image: '',
                },
            ],
        })
    }

    const handleViewPlayer = () => {
        navigation.navigate('playerslist')
    }

    const handleChangePlayerData = (index: number, field: keyof PlayerProps['player'][0], value: string) => {
        const updatedPlayers = [...playerState.player]
        updatedPlayers[index][field] = value
        setPlayerState({ ...playerState, player: updatedPlayers })
    }

    const handleImageSelect = (imageUri: string) => {
        const updatedPlayerState = { ...playerState }
        updatedPlayerState.player[0].image = imageUri
        setPlayerState(updatedPlayerState)
    }

    const renderStatus = () => {
        if (statusMessage) {
            return (
                <View style={styles.statusMessageContainer}>
                    <View style={styles.statusInnerContainer}>
                        <Icon style={styles.doneoutline} name={'checkmark-done-outline'} size={32} color="green" />
                        <Text style={styles.statusMessageText}>{statusMessage}</Text>
                    </View>
                </View>
            )
        }
        return null
    }

    const handleDeletePlayerObject = (index: number) => {
        const updatedPlayers = [...playerState.player]
        updatedPlayers.splice(index, 1)
        setPlayerState({ ...playerState, player: updatedPlayers })
    }

    const handleSubmit = () => {
        if (editPlayer === 'add') {
            postPlayer(playerState)
                .then((data: any) => {
                    setStatusMessage(`${playerState.place} Added Successfully!`)
                    setTimeout(() => {
                        setStatusMessage('')
                        handleResetPlayerData()
                    }, 2000)
                })
                .catch((error: any) => {
                    console.error('Error posting player data:', error)
                })
        } else if (editPlayer === 'update') {
            if (playerState._id) {
                updatePlayer(playerState._id, playerState)
                    .then((data: any) => {
                        console.log('Data updated successfully:', data)
                        setStatusMessage(`${playerState.place} Updated Successfully!`)
                        setTimeout(() => {
                            setStatusMessage('')
                            handleResetPlayerData()
                        }, 2000)
                    })
                    .catch((error: any) => {
                        console.error('Error updating player data:', error)
                    })
            } else {
                console.error('Error updating player data: Player data does not contain id')
            }
        }
    }

    const handleGoBack = () => {
        navigation.goBack()
    }

    const renderHeader = () => {
        let headerText = ''
        switch (editPlayer) {
            case 'add':
                headerText = 'Add Player'
                break
            case 'update':
                headerText = 'Edit Player'
                break
            case 'addNew':
                headerText = 'Add New Player'
                break
            default:
                headerText = ''
                break
        }

        return (
            <View
                style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginHorizontal: 22,
                }}
            >
                <TouchableOpacity onPress={handleGoBack}>
                    <Icon name={'arrow-back'} size={32} color="#487790" />
                </TouchableOpacity>
                <Text style={styles.heading}>{headerText}</Text>
            </View>
        )
    }

    const renderContent = () => (
        <View style={styles.content}>
            <View style={styles.inputsContainer}>
                <Text style={{ color: '#487790' }}>Team</Text>
                <TextInput
                    style={styles.inputHeading}
                    onChangeText={(text) => setPlayerState({ ...playerState, place: text })}
                    placeholder="Enter Team"
                    value={playerState.place}
                    placeholderTextColor={'black'}
                />
                {playerState.player.map((player, index) => (
                    <View style={styles.playerStyle} key={index}>
                        <View style={styles.countContainer}>
                            <Text style={styles.count}>{`Player: ${index + 1}`}</Text>
                            <TouchableOpacity onPress={() => handleDeletePlayerObject(index)}>
                                <Icon style={styles.doneoutline} name={'close'} size={26} color="black" />
                            </TouchableOpacity>
                        </View>
                        <Text style={styles.inputHeadings}>Name</Text>
                        <TextInput
                            style={styles.input}
                            onChangeText={(text) => handleChangePlayerData(index, 'name', text)}
                            placeholder="Enter Name"
                            value={player.name}
                            placeholderTextColor={'black'}
                        />

                        <Text style={styles.inputHeadings}>Age</Text>
                        <TextInput
                            style={styles.input}
                            onChangeText={(text) => handleChangePlayerData(index, 'age', text)}
                            placeholder="Enter Age"
                            value={player.age}
                            placeholderTextColor={'black'}
                        />

                        <Text style={styles.inputHeadings}>Place</Text>
                        <TextInput
                            style={styles.input}
                            onChangeText={(text) => handleChangePlayerData(index, 'nation', text)}
                            placeholder="Enter Place"
                            value={player.nation}
                            placeholderTextColor={'black'}
                        />

                        <Text style={styles.inputHeadings}>Player Type</Text>
                        <TextInput
                            style={styles.input}
                            onChangeText={(text) => handleChangePlayerData(index, 'premierLeague', text)}
                            placeholder="Enter Player Type"
                            value={player.premierLeague}
                            placeholderTextColor={'black'}
                        />
                        
                        <Text style={styles.inputHeadings}>Image</Text>
                        <ImageUpload onImageSelect={handleImageSelect} />
                    </View>
                ))}
            </View>
        </View>
    )

    const render = () => {
        const image = {
            uri: 'https://images.unsplash.com/photo-1593341646782-e0b495cff86d?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8MXwxMTM3MjU5NXx8ZW58MHx8fHx8https://images.unsplash.com/photo-1593341646647-75b32930e4a1?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mjd8fGNyaWNrZXR8ZW58MHx8MHx8fDA%3D',
        }
        return (
            <View style={styles.main}>
                {/* <ImageBackground source={image} style={styles.backgroundImage}> */}
                <View style={styles.backgroundImage}>
                    {renderHeader()}
                    <ScrollView contentContainerStyle={styles.scrollable}>{renderContent()}</ScrollView>
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity style={styles.close} onPress={handleViewPlayer}>
                            <Text style={styles.closeButton}>View</Text>
                        </TouchableOpacity>

                        {/* {editPlayer === "add" || editPlayer === "addNew" ? ( */}
                        <TouchableOpacity style={styles.closeNew} onPress={handleAddPlayer}>
                            <Text style={styles.closeButtonNew}>Add</Text>
                            <Icon style={styles.doneoutline} name={'add-outline'} size={22} color="black" />
                        </TouchableOpacity>
                        {/* ) : ''} */}
                        <TouchableOpacity style={styles.close} onPress={handleSubmit}>
                            <Text style={styles.closeButton}>
                                {editPlayer === 'add' ? 'Submit' : editPlayer === 'addNew' ? 'Submit' : 'Update'}
                            </Text>
                        </TouchableOpacity>
                        {renderStatus()}
                    </View>
                </View>
                {/* </ImageBackground> */}
            </View>
        )
    }
    return render()
}

const styles = StyleSheet.create({
    content: {
        paddingLeft: 20,
        paddingRight: 20,
        paddingBottom: 20,
        justifyContent: 'center',
    },
    countContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(228, 168, 214, 0.1)',
        borderColor: 'black',
        borderWidth: 1.5,
        borderTopLeftRadius: 7.9,
        borderTopRightRadius: 7.9,
        padding: 6,
        borderStyle: 'solid',
        textAlign: 'center',
        justifyContent: 'space-between',
    },
    count: {
        fontSize: 16,
        color: 'black',
    },
    playerStyle: {
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: 'black',
        borderRadius: 10,
        marginTop: 10,
        backgroundColor: 'rgba(124, 189, 181, 0.1)',
    },
    doneoutline: {},
    inputHeadings: {
        marginTop: 10,
        marginLeft: 4,
        color: '#487790',
        fontWeight: '400',
    },
    input: {
        height: 45,
        borderColor: '#878b95',
        borderWidth: 1.5,
        paddingHorizontal: 6,
        borderRadius: 8,
        // backgroundColor: 'rgba(124, 189, 181, 1)',
        fontWeight: '400',
        color: '',
    },
    inputHeading: {
        height: 40,
        borderColor: '#878b95',
        borderWidth: 1.5,
        paddingHorizontal: 10,
        borderRadius: 8,
        textAlign: 'center',
        fontWeight: '900',
        backgroundColor: 'rgba(213, 144, 45, 0.2)',
        letterSpacing: 2,
    },
    main: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },

    buttonContainer: {
        padding: 10,
        marginBottom: 4,
        justifyContent: 'space-around',
        alignItems: 'center',
        flexDirection: 'row',
    },
    inputsContainer: {},

    heading: {
        fontSize: 28,
        marginTop: 15,
        textAlign: 'center',
        marginBottom: 15,
        fontWeight: '600',
        color: '#487790',
        marginLeft: '20%',
    },

    scrollable: {
        flexGrow: 1,
        width: '100%',
    },
    backImageContainer: {
        flex: 1,
        width: '100%',
        height: '100%',
    },
    backgroundImage: {
        flex: 1,
        resizeMode: 'cover',
        width: '100%',
        height: '100%',
        backgroundColor: '#d4e2ea',
    },
    closeButton: {
        padding: 10,
        fontSize: 16,
        color: 'black',
        textAlign: 'center',
    },
    closeButtonNew: {
        padding: 10,
        paddingRight: -10,
        fontSize: 16,
        color: 'black',
        textAlign: 'center',
    },

    close: {
        backgroundColor: '#487790',
        borderRadius: 8,
    },
    closeNew: {
        backgroundColor: '#487790',
        borderRadius: 8,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
    },
    addButton: {
        fontSize: 16,
        color: 'black',
        textAlign: 'center',
    },
    statusMessageContainer: {
        position: 'absolute',
        top: -200,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 999,
        elevation: 0,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.3,
        shadowRadius: 4,
    },
    statusInnerContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        padding: 8,
        borderWidth: 1,
        borderColor: 'black',
        borderStyle: 'solid',
        borderRadius: 8,
        backgroundColor: '#ffff',
    },
    statusMessageText: {
        fontSize: 14,
        fontWeight: 'bold',
        textAlign: 'center',
        color: 'black',
        marginLeft: 6,
    },
})
