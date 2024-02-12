import { useNavigation, useRoute } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import React, { useEffect, useState } from "react";
import { View, TextInput, StyleSheet, Text, Button, ScrollView, ImageBackground } from "react-native";
import { postPlayer, updatePlayer } from "../Controls/common.control";
import { NavigationProps } from "./Routes";

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
        setPlayerState({ ...playerState, player: updatedPlayers});
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
                    style={styles.input}
                    onChangeText={(text) => setPlayerState({ ...playerState, place: text })}
                    placeholder="Enter Place"
                    value={playerState.place}
                    placeholderTextColor={'black'}

                />
                {playerState.player.map((player, index) => (
                    <View key={index}>
                        <Text>Name</Text>
                        <TextInput
                            style={styles.input}
                            onChangeText={(text) =>
                                handleChangePlayerData(index, "name", text)
                            } placeholder="Enter Name"
                            value={player.name}
                            placeholderTextColor={'black'}

                        />

                        <Text>Age</Text>
                        <TextInput
                            style={styles.input}
                            onChangeText={(text) =>
                                handleChangePlayerData(index, "age", text)
                            } placeholder="Enter Age"
                            value={player.age}
                            placeholderTextColor={'black'}
                        />

                        <Text>Nation</Text>
                        <TextInput
                            style={styles.input}
                            onChangeText={(text) =>
                                handleChangePlayerData(index, "nation", text)
                            }
                            placeholder="Enter Nation"
                            value={player.nation}
                            placeholderTextColor={'black'}
                        />

                        <Text>Ranking</Text>
                        <TextInput
                            style={styles.input}
                            onChangeText={(text) =>
                                handleChangePlayerData(index, "ranking", text)
                            } placeholder="Enter Ranking"
                            value={player.ranking}
                            placeholderTextColor={'black'}
                        />

                        <Text>Premier League</Text>
                        <TextInput
                            style={styles.input}
                            onChangeText={(text) =>
                                handleChangePlayerData(index, "premierLeague", text)
                            } placeholder="Enter Premier League"
                            value={player.premierLeague}
                            placeholderTextColor={'black'}
                        />

                        <Text>Image</Text>
                        <TextInput
                            style={styles.input}
                            onChangeText={(text) =>
                                handleChangePlayerData(index, "image", text)
                            } placeholder="Enter Image Url"
                            value={player.image}
                            placeholderTextColor={'black'}
                        />

                        <Text>Wikipedia Url</Text>
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
                <View style={styles.buttonContainer}>
                    <Button
                        color={'#487790'}
                        title="View"
                        onPress={handleViewPlayer}

                    />
                    <Button
                        color={'#487790'}
                        title="Add"
                        onPress={handleAddPlayer}
                    />
                    <Button
                        color={'#487790'}
                        title={editPlayer === 'add' ? "Submit" : "Update"}
                        onPress={handleSubmit}
                    />
                </View>
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
    input: {
        height: 40,
        borderColor: '#878b95',
        borderWidth: 1.5,
        paddingHorizontal: 10,
        marginBottom: 10,
        borderRadius: 10,
    },
    main: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonContainer: {
        marginTop: 20,
        flex: 1,
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
        marginBottom: 15
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

});