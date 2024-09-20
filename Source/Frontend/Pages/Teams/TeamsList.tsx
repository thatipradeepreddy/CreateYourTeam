import React, { useEffect, useState } from 'react'
import { StyleSheet, ScrollView, View, Text, SafeAreaView, Image, TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import Icon from 'react-native-vector-icons/Ionicons'
import { fetchPlayers, getPlayerById } from '../../Controls/common.control'
import { NavigationProps } from '../Routes'
// import { Player } from "./BasicInfo";

interface Player {
    name: string
    age: string
    nation: string
    playerType: string
    image: string
}

interface PlayerProps {
    _id: string
    place: string
    player: Player[]
}

export function TeamsList() {
    const [isCheckedAll, setCheckedAll] = useState<boolean>(false)
    const navigation = useNavigation<NavigationProps['navigation']>()
    const [playerState, setPlayerState] = useState<PlayerProps[]>([])
    const [expandedTeams, setExpandedTeams] = useState<{
        [key: string]: boolean
    }>({})

    useEffect(() => {
        fetchPlayers()
            .then((res: any) => {
                setPlayerState(res)
            })
            .catch((error: Error) => {
                console.error('Error fetching players:', error.message)
            })
    }, [])

    const toggleTeamExpansion = (teamId: string) => {
        setExpandedTeams((prevState) => ({
            ...prevState,
            [teamId]: !prevState[teamId],
        }))
    }

    const handleNavigateToMaps = async (id: string) => {
        try {
            const playerData: PlayerProps = await getPlayerById(id)
            navigation.navigate('location', { id, playerData })
        } catch (error) {
            console.error('Error navigating to location:', error)
        }
    }

    const renderPlayers = () => {
        return (
            <ScrollView style={styles.playerContainer}>
                {playerState.map((team: PlayerProps, teamIndex: number) => (
                    <View key={team._id}>
                        <View style={styles.teamHeader}>
                            <TouchableOpacity onPress={() => toggleTeamExpansion(team._id)}>
                                <Text style={styles.placeText}>{team.place}</Text>
                            </TouchableOpacity>
                            <View style={styles.teamHeaderInner}>
                                <TouchableOpacity onPress={() => handleNavigateToMaps(team._id)}>
                                    <View>
                                        <Icon key={team._id} style={styles.maps} name="location-outline" size={25} color="red" />
                                    </View>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => toggleTeamExpansion(team._id)}>
                                    <Icon
                                        style={styles.iconarrow}
                                        name={expandedTeams[team._id] ? 'chevron-down-outline' : 'chevron-up-outline'}
                                        size={32}
                                        color="blue"
                                    />
                                </TouchableOpacity>
                            </View>
                        </View>
                        {expandedTeams[team._id] && team.player.length === 0 ? (
                            <Text style={styles.player}>There are no players from this team!</Text>
                        ) : (
                            expandedTeams[team._id] &&
                            team.player.map((player: Player) => (
                                <View style={styles.player} key={player.name}>
                                    <TouchableOpacity>
                                        <View>
                                            <Image source={{ uri: player.image }} style={styles.image} />
                                        </View>
                                    </TouchableOpacity>
                                    <View style={styles.container}>
                                        <View style={styles.row}>
                                            <Text style={styles.label}>Name:</Text>
                                            <Text>{player.name}</Text>
                                        </View>
                                        <View style={styles.row}>
                                            <Text style={styles.label}>Age:</Text>
                                            <Text>{player.age}</Text>
                                        </View>
                                        <View style={styles.row}>
                                            <Text style={styles.label}>Place:</Text>
                                            <Text>{player.nation}</Text>
                                        </View>
                                        <View style={styles.row}>
                                            <Text style={styles.label}>Player Type:</Text>
                                            <Text>{player.playerType}</Text>
                                        </View>
                                    </View>
                                </View>
                            ))
                        )}
                    </View>
                ))}
            </ScrollView>
        )
    }

    const render = () => {
        return <View style={styles.backImageContainer}>{renderPlayers()}</View>
    }

    return render()
}

const styles = StyleSheet.create({
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        paddingHorizontal: 10,
        marginBottom: 10,
        textAlign: 'center',
        borderRadius: 10,
    },
    main: {
        alignItems: 'center',
        display: 'flex',
        justifyContent: 'center',
        flex: 1,
        backgroundColor: '#f1f6fa',
        marginTop: 30,
    },
    teamHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 6,
        borderWidth: 1,
        borderColor: 'black',
        borderStyle: 'solid',
        borderRadius: 8,
        marginTop: 10,
        marginBottom: 4,
        backgroundColor: 'rgba(213, 144, 45, 0.5)',
    },
    placeText: {
        padding: 6,
        borderWidth: 1,
        borderColor: 'black',
        borderStyle: 'solid',
        borderRadius: 8,
        fontWeight: '600',
        maxWidth: 140,
    },
    teamHeaderInner: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    icontrash: {
        color: 'black',
        marginRight: 20,
    },
    maps: {
        color: '#ea5501',
        marginRight: 20,
    },
    button: {
        color: 'green',
    },
    text: {
        fontSize: 32,
    },
    player: {
        height: 120,
        backgroundColor: '#d4e2ea',
        borderRadius: 8,
        padding: 10,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        marginBottom: 6,
    },
    image: {
        width: 100,
        height: 100,
        marginRight: 10,
        borderRadius: 5,
        resizeMode: 'contain',
    },
    playerContainer: {
        height: '100%',
        padding: 10,
    },
    container: {
        // padding: 10,
    },
    row: {
        flexDirection: 'row',
        marginBottom: 5,
    },
    label: {
        fontWeight: '600',
        marginRight: 5, // Space between label and value
    },
    select: {
        fontSize: 20,
        marginLeft: 8,
    },
    iconarrow: {
        color: 'black',
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
})
