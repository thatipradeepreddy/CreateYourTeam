import React, { useEffect, useState } from 'react'
import {
	StyleSheet,
	ScrollView,
	View,
	Text,
	SafeAreaView,
	Image,
	TouchableOpacity,
	Linking,
	Alert,
	ImageBackground,
} from 'react-native'
import { useNavigation } from '@react-navigation/native'
import Icon from 'react-native-vector-icons/Ionicons'
import { Dialog } from '../Components/Dialog'
import {
	deletePlayer,
	deleteteam,
	fetchPlayers,
	getPlayerById,
	getPlayerByIdName,
} from '../Controls/common.control'
import { NavigationProps } from './Routes'
// import { Player } from "./BasicInfo";

interface Player {
	name: string
	age: string
	nation: string
	ranking: string
	premierLeague: string
	image: string
	wikipediaUrl: string
}

interface PlayerProps {
	_id: string
	place: string
	player: Player[]
}

export function PlayersList() {
	const [isDialogVisible, setDialogVisible] = useState<boolean>(false)
	const [isCheckedAll, setCheckedAll] = useState<boolean>(false)
	const navigation = useNavigation<NavigationProps['navigation']>()
	const [playerToDelete, setPlayerToDelete] = useState<PlayerProps | null>(
		null
	)
	const [playerState, setPlayerState] = useState<PlayerProps[]>([])
	const [expandedTeams, setExpandedTeams] = useState<{
		[key: string]: boolean
	}>({})
	const [isDeleteDialogVisible, setDeleteDialogVisible] =
		useState<boolean>(false)

	useEffect(() => {
		fetchPlayers()
			.then((res: any) => {
				setPlayerState(res)
			})
			.catch((error: Error) => {
				console.error('Error fetching players:', error.message)
			})
	}, [])

	const handleDeletePlayer = (id: string, name: string) => {
		const playerToDelete = playerState.find(
			(team) =>
				team._id === id &&
				team.player.some((player) => player.name === name)
		)
		if (playerToDelete) {
			setPlayerToDelete(playerToDelete)
			setDeleteDialogVisible(true)
		}
	}

	const handleConfirmDeletePlayer = () => {
		if (
			playerToDelete &&
			playerToDelete.player &&
			playerToDelete.player.length > 0
		) {
			const {
				_id,
				player: [{ name }],
			} = playerToDelete
			deletePlayer(_id, name)
				.then(() => {
					setPlayerState((prevPlayers) =>
						prevPlayers.map((player) => {
							if (player._id === _id) {
								return {
									...player,
									player: player.player.filter(
										(p) => p.name !== name
									),
								}
							}
							return player
						})
					)
					console.log('Player deleted successfully')
					setPlayerToDelete(null)
					setDeleteDialogVisible(false)
				})
				.catch((error) => {
					console.error('Error deleting player:', error)
				})
		}
	}

	const renderPlayerDialogContent = (player: Player) => {
		return (
			<Text key={player.name}>
				Are you sure you want to delete
				<Text style={styles.alertMessage}>{player.name}</Text>?
			</Text>
		)
	}

	const renderPlayerDialog = (player: Player) => {
		if (!player.name) {
			return null
		}
		return (
			<Dialog
				isVisible={isDeleteDialogVisible}
				onClose={() => {
					setPlayerToDelete(null)
					setDeleteDialogVisible(false)
				}}
				onConfirm={handleConfirmDeletePlayer}
			>
				{renderPlayerDialogContent(player)}
			</Dialog>
		)
	}

	const toggleTeamExpansion = (teamId: string) => {
		setExpandedTeams((prevState) => ({
			...prevState,
			[teamId]: !prevState[teamId],
		}))
	}

	const handleEditByName = async (id: string, name: string) => {
		try {
			const playerData: PlayerProps = await getPlayerByIdName(id, name)
			navigation.navigate('editplayer', { id, name, playerData })
		} catch (error) {
			console.error('Error navigating to editPlayer:', error)
		}
	}

	const handleAddNewPlayer = (teamIndex: number) => {
		const selectedTeam = playerState[teamIndex]
		if (selectedTeam && selectedTeam._id && selectedTeam.place) {
			navigation.navigate('addplayer', {
				id: selectedTeam._id,
				place: selectedTeam.place,
			})
		} else {
			console.error('Cannot add new player: Team information is missing.')
		}
	}

	const handleDelete = (index: number) => {
		const playerToDelete = playerState[index]
		setPlayerToDelete(playerToDelete)
		setDialogVisible(true)
	}

	const handleConfirmDelete = () => {
		if (playerToDelete) {
			deleteteam(playerToDelete._id)
				.then(() => {
					setPlayerState((prevPlayers) =>
						prevPlayers.filter(
							(player) => player._id !== playerToDelete._id
						)
					)
					console.log('Team deleted successfully')
					setPlayerToDelete(null)
					setDialogVisible(false)
				})
				.catch((error) => {
					console.error('Error deleting team:', error)
				})
		}
	}

	const renderDialogContent = (player: PlayerProps) => {
		return (
			<Text key={player._id}>
				Are you sure you want to delete{' '}
				<Text style={styles.alertMessage}>{player.place}</Text>?
			</Text>
		)
	}

	const renderDialog = () => {
		if (!playerToDelete) {
			return null
		}

		return (
			<Dialog
				isVisible={isDialogVisible}
				onClose={() => {
					setPlayerToDelete(null)
					setDialogVisible(false)
				}}
				onConfirm={handleConfirmDelete}
			>
				{renderDialogContent(playerToDelete)}
			</Dialog>
		)
	}

	const handleEdit = async (id: string) => {
		try {
			const playerData: PlayerProps = await getPlayerById(id)
			navigation.navigate('editplayer', { id, playerData })
		} catch (error) {
			console.error('Error navigating to editPlayer:', error)
		}
	}

	const handleNavigate = (url: string) => {
		Linking.openURL(url)
	}

	const handleNavigateToMaps = async (id: string) => {
		try {
			const playerData: PlayerProps = await getPlayerById(id)
			navigation.navigate('location', { id, playerData })
		} catch (error) {
			console.error('Error navigating to location:', error)
		}
	}

	const renderHeading = () => {
		return (
			<View style={styles.headerContainer}>
				<View style={styles.headingContainer}>
					<TouchableOpacity onPress={navigation.goBack}>
						<Icon
							style={styles.iconarrow}
							name='arrow-back'
							size={23}
							color='blue'
						/>
					</TouchableOpacity>
					<Text style={styles.select}>Add Player</Text>
				</View>
				<View style={styles.headingContainer}>
					<TouchableOpacity>
						<Icon
							style={styles.iconarrow}
							name={
								isCheckedAll ? 'checkbox' : 'checkbox-outline'
							}
							size={23}
						/>
					</TouchableOpacity>
					<Text style={styles.select}>Select All</Text>
				</View>
			</View>
		)
	}

	const renderPlayers = () => {
		return (
			<ScrollView style={styles.playerContainer}>
				{playerState.map((team: PlayerProps, teamIndex: number) => (
					<View key={team._id}>
						<View style={styles.teamHeader}>
							<TouchableOpacity
								onPress={() => toggleTeamExpansion(team._id)}
							>
								<Text style={styles.placeText}>
									{team.place}
								</Text>
							</TouchableOpacity>
							<View style={styles.teamHeaderInner}>
								<TouchableOpacity
									onPress={() =>
										handleNavigateToMaps(team._id)
									}
								>
									<View>
										<Icon
											key={team._id}
											style={styles.maps}
											name='location-outline'
											size={25}
											color='red'
										/>
									</View>
								</TouchableOpacity>
								<TouchableOpacity
									onPress={() =>
										handleAddNewPlayer(teamIndex)
									}
								>
									<View>
										<Icon
											key={team._id}
											style={styles.icontrash}
											name='add-outline'
											size={25}
											color='black'
										/>
									</View>
								</TouchableOpacity>
								<TouchableOpacity
									onPress={() => handleDelete(teamIndex)}
								>
									<View>
										<Icon
											key={team._id}
											style={styles.icontrash}
											name='trash'
											size={20}
											color='black'
										/>
									</View>
								</TouchableOpacity>
								<TouchableOpacity
									onPress={() =>
										toggleTeamExpansion(team._id)
									}
								>
									<Icon
										style={styles.iconarrow}
										name={
											expandedTeams[team._id]
												? 'chevron-down-outline'
												: 'chevron-up-outline'
										}
										size={32}
										color='blue'
									/>
								</TouchableOpacity>
							</View>
						</View>
						{expandedTeams[team._id] && team.player.length === 0 ? (
							<Text style={styles.player}>
								There are no players from this team!
							</Text>
						) : (
							expandedTeams[team._id] &&
							team.player.map((player: Player) => (
								<View style={styles.player} key={player.name}>
									<TouchableOpacity
										onPress={() =>
											handleNavigate(player.wikipediaUrl)
										}
									>
										<View>
											<Image
												source={{ uri: player.image }}
												style={styles.image}
											/>
										</View>
									</TouchableOpacity>
									<View>
										<Text>Name: {player.name}</Text>
										<Text>Age: {player.age}</Text>
										<Text>Nation: {player.nation}</Text>
										<Text>Ranking: {player.ranking}</Text>
										<Text>
											Premier League:{' '}
											{player.premierLeague}
										</Text>
									</View>
									<View style={styles.iconsContainer}>
										<TouchableOpacity
											onPress={() => handleEdit(team._id)}
										>
											<Icon
												style={styles.iconarrow}
												key={team._id}
												name='pencil'
												size={20}
											/>
										</TouchableOpacity>
										<TouchableOpacity
											key={player.name}
											onPress={() =>
												handleDeletePlayer(
													team._id,
													player.name
												)
											}
										>
											<Icon
												key={player.name}
												style={styles.iconarrow}
												name='trash'
												size={20}
											/>
										</TouchableOpacity>
										<TouchableOpacity>
											<Icon
												style={styles.iconarrow}
												name={'checkbox'}
												size={23}
												color='blue'
											/>
										</TouchableOpacity>
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
		const image = {
			uri: 'https://images.unsplash.com/photo-1542185546-4e89f5fd0e04?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGNyaWNrZXR8ZW58MHx8MHx8fDA%3D',
		}
		return (
			<View style={styles.backImageContainer}>
				<ImageBackground source={image} style={styles.backgroundImage}>
					{renderHeading()}
					{renderDialog()}
					{playerToDelete &&
						renderPlayerDialog(playerToDelete.player[0])}
					{renderPlayers()}
				</ImageBackground>
			</View>
		)
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
	select: {
		fontSize: 20,
		marginLeft: 8,
	},
	headingContainer: {
		flexDirection: 'row',
		alignItems: 'center',
	},
	headerContainer: {
		justifyContent: 'space-around',
		alignItems: 'center',
		flexDirection: 'row',
		width: '100%',
		marginTop: 24,
		marginBottom: 4,
	},
	iconarrow: {
		color: 'black',
	},
	iconsContainer: {
		height: 120,
		flexDirection: 'column',
		justifyContent: 'space-around',
		paddingLeft: 30,
	},
	alertMessage: {
		fontWeight: 'bold',
		color: '#ea5501',
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
