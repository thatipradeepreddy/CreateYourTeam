import React, { useEffect, useState } from 'react'
import { StyleSheet, ScrollView, View, Text, Image, TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import Icon from 'react-native-vector-icons/Ionicons'
import { fetchPlayers, getPlayerById } from '../../Controls/common.control'
import { NavigationProps } from '../Routes'

interface Player {
    name: string
    age: string
    nation: string
    premierLeague: string
    image: string
}

interface PlayerProps {
    _id: string
    place: string
    player: Player[]
}

export function Players() {
    const [playerState, setPlayerState] = useState<PlayerProps[]>([])
    const [expandedTeams, setExpandedTeams] = useState<{
        [key: string]: boolean
    }>({})
    const navigation = useNavigation<NavigationProps['navigation']>()

    useEffect(() => {
        fetchPlayers()
            .then((res: any) => {
                setPlayerState(res)
            })
            .catch((error: Error) => {
                console.error('Error fetching players:', error.message)
            })
    }, [])

    const allPlayers = playerState.flatMap((team) => team.player)

    const renderPlayers = () => {
        return (
            <ScrollView style={styles.playerContainer}>
                {allPlayers.map((player: Player, index: number) => (
                    <View style={styles.player} key={index}>
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
                                <Text>{player.premierLeague}</Text>
                            </View>
                        </View>
                    </View>
                ))}
            </ScrollView>
        )
    }

    return <View style={styles.backImageContainer}>{renderPlayers()}</View>
}

const styles = StyleSheet.create({
    playerContainer: {
        height: '100%',
        padding: 10,
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
    container: {},
    row: {
        flexDirection: 'row',
        marginBottom: 5,
    },
    label: {
        fontWeight: '600',
        marginRight: 5,
    },
    backImageContainer: {
        flex: 1,
        width: '100%',
        height: '100%',
    },
})
