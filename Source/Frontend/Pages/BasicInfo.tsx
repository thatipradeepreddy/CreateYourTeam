import { useNavigation, useRoute } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { View, TextInput, StyleSheet, Text, Button, ScrollView, ImageBackground, TouchableOpacity } from "react-native";
import { postPlayer, updatePlayer } from "../Controls/common.control";
import { NavigationProps } from "./Routes";
import ImagePicker from 'react-native-image-picker';

export interface Player {
    name: string;
    age: string;
    nation: string;
    ranking: string;
    premierLeague: string;
    image: string;
    wikipediaUrl: string;
}

export interface PlayerProps {
    _id?: string;
    place: string;
    player: Player[]
}


export function BasicInfo() {
    const [editPlayer, setEditPlayer] = useState<'add' | 'update'>('add')
    const navigation = useNavigation<NavigationProps['navigation']>();
    const [playerState, setPlayerState] = useState<PlayerProps>({
        place: '',
        player: []
    });

    const route = useRoute();

    useEffect(() => {
        if (route.params && (route.params as any).playerData) {
            const playerData = (route.params as any).playerData;
            setPlayerState({ ...playerData, _id: playerData._id });
            setEditPlayer('update');
        }
    }, [route.params]);

    const handleResetPlayerData = () => {
        setPlayerState({
            place: '',
            player: [{
                name: '',
                age: '',
                nation: '',
                premierLeague: '',
                ranking: '',
                image: '',
                wikipediaUrl: ''
            }]
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
                    ranking: '',
                    image: '',
                    wikipediaUrl: ''
                }
            ]
        });
    };



    const handleViewPlayer = () => {
        navigation.navigate('playerslist');
    }

    const handleChangePlayerData = (
        index: number,
        field: keyof PlayerProps["player"][0],
        value: string
    ) => {
        const updatedPlayers = [...playerState.player];
        updatedPlayers[index][field] = value;
        setPlayerState({ ...playerState, player: updatedPlayers });
    };

    const handleSubmit = () => {
        if (editPlayer === 'add') {
            postPlayer(playerState)
                .then((data: any) => {
                    console.log('Player data posted successfully:', data)
                    handleResetPlayerData()
                })
                .catch((error: any) => {
                    console.error('Error posting player data:', error)
                })
        } else if (editPlayer === 'update') {
            if (playerState._id) {
                updatePlayer(playerState._id, playerState)
                    .then((data: any) => {
                        console.log('Player data updated successfully:', data)
                        handleResetPlayerData()
                    })
                    .catch((error: any) => {
                        console.error('Error updating player data:', error)
                    })
            } else {
                console.error(
                    'Error updating player data: Player data does not contain id'
                )
            }
        }
    }

    const renderHeader = () => {
        return (
            <View>
                <Text
                    style={styles.heading}
                >
                    {editPlayer === 'add' ? "Add Player" : "Edit Player"}
                </Text>
            </View>
        )
    }

    const renderContent = () => (
        <View style={styles.content}>

            <View style={styles.inputsContainer}>
                <Text>Place</Text>
                <TextInput
                    style={styles.inputHeading}
                    onChangeText={(text) => setPlayerState({ ...playerState, place: text })}
                    placeholder="Enter Place"
                    value={playerState.place}
                    placeholderTextColor={'black'}

                />
                {playerState.player.map((player, index) => (
                    <View style={styles.playerStyle} key={index}>
                        <Text style={styles.count}>{`Player: ${index + 1}`}</Text>
                        <Text style={styles.inputHeadings}>Name</Text>
                        <TextInput
                            style={styles.input}
                            onChangeText={(text) =>
                                handleChangePlayerData(index, "name", text)
                            } placeholder="Enter Name"
                            value={player.name}
                            placeholderTextColor={'black'}

                        />

                        <Text style={styles.inputHeadings}>Age</Text>
                        <TextInput
                            style={styles.input}
                            onChangeText={(text) =>
                                handleChangePlayerData(index, "age", text)
                            } placeholder="Enter Age"
                            value={player.age}
                            placeholderTextColor={'black'}
                        />

                        <Text style={styles.inputHeadings}>Nation</Text>
                        <TextInput
                            style={styles.input}
                            onChangeText={(text) =>
                                handleChangePlayerData(index, "nation", text)
                            }
                            placeholder="Enter Nation"
                            value={player.nation}
                            placeholderTextColor={'black'}
                        />

                        <Text style={styles.inputHeadings}>Ranking</Text>
                        <TextInput
                            style={styles.input}
                            onChangeText={(text) =>
                                handleChangePlayerData(index, "ranking", text)
                            } placeholder="Enter Ranking"
                            value={player.ranking}
                            placeholderTextColor={'black'}
                        />

                        <Text style={styles.inputHeadings}>Premier League</Text>
                        <TextInput
                            style={styles.input}
                            onChangeText={(text) =>
                                handleChangePlayerData(index, "premierLeague", text)
                            } placeholder="Enter Premier League"
                            value={player.premierLeague}
                            placeholderTextColor={'black'}
                        />

                        <Text style={styles.inputHeadings}>Image</Text>
                        <TextInput
                            style={styles.input}
                            onChangeText={(text) =>
                                handleChangePlayerData(index, "image", text)
                            } placeholder="Enter Image Url"
                            value={player.image}
                            placeholderTextColor={'black'}
                        />

                        <Text style={styles.inputHeadings}>Wikipedia Url</Text>
                        <TextInput
                            style={styles.input}
                            onChangeText={(text) =>
                                handleChangePlayerData(index, "wikipediaUrl", text)
                            } placeholder="Enter Wikipedia Url"
                            value={player.wikipediaUrl}
                            placeholderTextColor={'black'}
                        />
                    </View>
                ))}
            </View>
        </View>
    );

    const render = () => {
        const image = { uri: 'https://images.unsplash.com/photo-1593341646782-e0b495cff86d?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8MXwxMTM3MjU5NXx8ZW58MHx8fHx8https://images.unsplash.com/photo-1593341646647-75b32930e4a1?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mjd8fGNyaWNrZXR8ZW58MHx8MHx8fDA%3D' }
        return (
            <View style={styles.main}>
                <ImageBackground
                    source={image}
                    style={styles.backgroundImage}
                >
                    {renderHeader()}
                    <ScrollView contentContainerStyle={styles.scrollable}>
                        {renderContent()}
                    </ScrollView>
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity style={styles.close} onPress={handleViewPlayer}>
                            <Text style={styles.closeButton}>View</Text>
                        </TouchableOpacity>

                        {editPlayer === "add" ? (
                            <TouchableOpacity style={styles.close} onPress={handleAddPlayer}>
                                <Text style={styles.closeButton}>Add</Text>
                            </TouchableOpacity>) : ''}

                        <TouchableOpacity style={styles.close} onPress={handleSubmit}>
                            <Text style={styles.closeButton}>{editPlayer === 'add' ? "Submit" : "Update"}</Text>
                        </TouchableOpacity>

                    </View>
                </ImageBackground>
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
        justifyContent: 'center'
    },
    count: {
        padding: 6,
        borderStyle: 'solid',
        textAlign: 'center',
        fontSize: 16,
        backgroundColor: 'rgba(228, 168, 214, 0.3)',
        borderColor: 'black',
        borderWidth: 1.5,
        borderTopLeftRadius: 7.9,
        borderTopRightRadius: 7.9
    },
    playerStyle: {
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: 'black',
        borderRadius: 10,
        marginTop: 10,
        backgroundColor: 'rgba(124, 189, 181, 0.3)'
    },
    inputHeadings: {
        marginTop: 10,
        marginLeft: 4
    },
    input: {
        height: 40,
        borderColor: '#878b95',
        borderWidth: 1.5,
        paddingHorizontal: 10,
        borderRadius: 8,
        backgroundColor: 'rgba(124, 189, 181, 0.4)',
        fontWeight: '800'

    },
    inputHeading: {
        height: 40,
        borderColor: '#878b95',
        borderWidth: 1.5,
        paddingHorizontal: 10,
        borderRadius: 8,
        textAlign: 'center',
        fontWeight: '900',
        backgroundColor: 'rgba(213, 144, 45, 0.6)',
        letterSpacing: 5

    },
    main: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },

    buttonContainer: {
        padding:10,
        marginBottom:4,
        justifyContent: 'space-around',
        alignItems: 'center',
        flexDirection: 'row'
    },
    inputsContainer: {

    },

    heading: {
        fontSize: 28,
        marginTop: 30,
        textAlign: 'center',
        marginBottom: 15,
        fontWeight: '600'
    },

    scrollable: {
        flexGrow: 1,
        width: '100%'
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
    },
    closeButton: {
        padding: 10,
        fontSize: 16,
        color: 'black',
        textAlign: 'center',
    },
    close: {
        justifyContent: 'center',
        backgroundColor: '#487790',
        borderRadius: 8,
    }

});