import React, { useState } from 'react'
import {
	Button,
	StyleSheet,
	TextInput,
	View,
	Text,
	ScrollView,
	TouchableOpacity,
	ImageBackground,
} from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import { UserProps, loginUser } from '../Controls/common.control'
import { NavigationProps } from './Routes'

interface LoginRoutes {
	addplayer: undefined
	register: undefined
	[key: string]: undefined
}

interface HomeScreenProps {
	navigation: StackNavigationProp<LoginRoutes, 'addplayer', 'register'>
}

export function Login() {
	const navigation = useNavigation<NavigationProps['navigation']>()
	const [enteredUsernameOrEmail, setEnteredUsernameOrEmail] = useState('')
	const [enteredPassword, setEnteredPassword] = useState('')

	const handleLoginPress = () => {
		// const user: UserProps = {
		// 	email: enteredUsernameOrEmail,
		// 	password: enteredPassword,
		// 	username: ''
		// }

		// loginUser(JSON.stringify(user))
		// 	.then((response) => {
		// 		console.log(response, 'sdjfhksdjf')
		// 		if (response) {
					navigation.navigate('addplayer')
			// 	} else {
			// 		console.error('Login failed:', response)
			// 	}
			// })
			// .catch((error) => {
			// 	console.error('Error during login:', error)
			// })
	}

	const handleRegister = () => {
		navigation.navigate('register')
	}

	const handleForgot = () => {
		navigation.navigate('forgot')
	}

	const renderHeading = () => {
		return (
			<View>
				<Text style={styles.heading}>Login to C Y T</Text>
			</View>
		)
	}

	const renderUserName = () => {
		return (
			<View>
				<Text>Email or Username</Text>
				<TextInput
					value={enteredUsernameOrEmail}
					style={styles.input}
					onChangeText={(text) => setEnteredUsernameOrEmail(text)}
					placeholder='Enter Email or Username'
				/>
			</View>
		)
	}

	const renderPassword = () => {
		return (
			<View>
				<Text>Password</Text>
				<TextInput
					style={styles.input}
					secureTextEntry={true}
					value={enteredPassword}
					onChangeText={(text) => setEnteredPassword(text)}
					placeholder='Enter Password'
				/>
			</View>
		)
	}

	const renderButton = () => {
		return (
			<View style={styles.buttons}>
				<TouchableOpacity
					style={styles.close}
					onPress={handleLoginPress}
				>
					<Text style={styles.submit}>Submit</Text>
				</TouchableOpacity>
			</View>
		)
	}

	const renderFooter = () => {
		return (
			<View style={styles.footer}>
				<TouchableOpacity onPress={handleForgot}>
					<Text style={styles.linkText}>Forgot Password?</Text>
				</TouchableOpacity>

				<TouchableOpacity onPress={handleRegister}>
					<Text style={styles.linkText}>Register User</Text>
				</TouchableOpacity>
			</View>
		)
	}

	const render = () => {
		const image = {
			uri: 'https://images.unsplash.com/photo-1593341646782-e0b495cff86d?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8MXwxMTM3MjU5NXx8ZW58MHx8fHx8',
		}
		return (
			<View style={styles.main}>
				<View style={styles.backImageContainer}>
					<ImageBackground
						source={image}
						style={styles.backgroundImage}
					>
						<ScrollView
							showsVerticalScrollIndicator={false}
							showsHorizontalScrollIndicator={false}
							contentContainerStyle={styles.scrollable}
						>
							<View style={styles.innerView}>
								<View style={styles.nested}>
									{renderHeading()}
									{renderUserName()}
									{renderPassword()}
									{renderButton()}
									{renderFooter()}
								</View>
							</View>
						</ScrollView>
					</ImageBackground>
				</View>
			</View>
		)
	}
	return render()
}

const styles = StyleSheet.create({
	input: {
		height: 45,
		borderColor: 'gray',
		borderWidth: 1,
		paddingHorizontal: 10,
		marginBottom: 10,
		borderRadius: 10,
		paddingLeft: 15,
	},
	main: {
		backgroundColor: '#fff',
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	scrollable: {
		flexGrow: 1,
		width: '100%',
	},
	button: {
		color: 'green',
	},
	innerView: {
		flex: 1,
		justifyContent: 'center',
		padding: 20,
	},
	nested: {
		borderColor: 'white',
		borderWidth: 1,
		borderRadius: 10,
		padding: 20,
		backgroundColor: 'white',
	},
	close: {
		justifyContent: 'center',
		backgroundColor: '#487790',
		borderRadius: 8,
	},
	heading: {
		textAlign: 'center',
		fontSize: 35,
		fontWeight: 'bold',
		color: 'black',
		marginBottom: 40,
	},
	buttons: {
		marginTop: 20,
	},

	submit: {
		padding: 10,
		fontSize: 16,
		color: 'black',
		textAlign: 'center',
	},

	footer: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		paddingHorizontal: 20,
		marginTop: 20,
	},
	linkText: {
		textDecorationLine: 'underline',
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
