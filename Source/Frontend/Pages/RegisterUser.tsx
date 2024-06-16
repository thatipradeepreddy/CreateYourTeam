import React, { useState } from 'react'
import {
	Button,
	StyleSheet,
	TextInput,
	View,
	Text,
	SafeAreaView,
	TouchableHighlight,
	ScrollView,
	ImageBackground,
} from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { UserProps, createUser } from '../Controls/common.control'
import { NavigationProps } from './Routes'
import { TouchableOpacity } from 'react-native-gesture-handler'
import Icon from 'react-native-vector-icons/Ionicons'
import Icons from 'react-native-vector-icons/MaterialIcons'

export function RegisterUser() {
	const navigation = useNavigation<NavigationProps['navigation']>()
	const [errorMessage, setErrorMessage] = useState('')
	const [isPasswordVisible, setIsPasswordVisible] = useState(false)
	const [isRegistered, setIsRegistered] = useState(false)
	const [user, setUser] = useState<UserProps>({
		name: '',
		email: '',
		password: '',
	})

	const handleRegister = () => {
		if (!user.name || !user.email || !user.password) {
			setErrorMessage('Please fill in all fields.')
			setTimeout(() => setErrorMessage(''), 2000)
			return
		}

		if (!user.email.endsWith('@gmail.com')) {
			setErrorMessage('Please enter a valid Gmail address.')
			setTimeout(() => setErrorMessage(''), 2000)
			return
		}

		createUser(user)
			.then(() => {
				setErrorMessage('User registered successfully!')
				setTimeout(() => {
					setErrorMessage('')
					navigation.navigate('login')
				}, 2000)
			})
			.catch((error: any) => {
				setErrorMessage(`Failed to register user: ${error.message}`)
			})
	}

	const renderAlertMessage = () => {
		if (!errorMessage) return null

		return (
			<View style={styles.alertContainer}>
				<Icons name='error-outline' size={23} color='red' />
				<Text style={styles.errorMessage}>{errorMessage}</Text>
				<TouchableOpacity onPress={() => setErrorMessage('')}>
					<Icon name='close-circle-outline' size={23} color='black' />
				</TouchableOpacity>
			</View>
		)
	}

	return (
		<View style={styles.main}>
			<View style={styles.backImageContainer}>
				<ScrollView
					showsVerticalScrollIndicator={false}
					showsHorizontalScrollIndicator={false}
					contentContainerStyle={styles.scrollable}
				>
					<View style={styles.innerView}>
						<View>
							<Text style={styles.heading}>Register User</Text>
						</View>

						<View>
							<Text>User Name</Text>
							<TextInput
								style={styles.input}
								onChangeText={(text) =>
									setUser({ ...user, name: text })
								}
								value={user.name}
								placeholder='Enter User Name'
							/>

							<Text>Enter Email</Text>
							<TextInput
								style={styles.input}
								onChangeText={(text) =>
									setUser({ ...user, email: text })
								}
								value={user.email}
								placeholder='Enter Email'
							/>

							<Text>Password</Text>
							<View style={styles.passwordContainer}>
								<TextInput
									style={styles.inputPassword}
									secureTextEntry={!isPasswordVisible}
									onChangeText={(text) =>
										setUser({ ...user, password: text })
									}
									value={user.password}
									placeholder='Enter Password'
								/>
								<TouchableOpacity
									style={styles.eyeIcon}
									onPress={() =>
										setIsPasswordVisible(!isPasswordVisible)
									}
								>
									<Icon
										name={
											isPasswordVisible
												? 'eye-off'
												: 'eye'
										}
										size={23}
										color='gray'
									/>
								</TouchableOpacity>
							</View>
							<TouchableOpacity
								style={styles.close}
								onPress={handleRegister}
							>
								<Text>Register</Text>
							</TouchableOpacity>
						</View>

						{renderAlertMessage()}
					</View>
				</ScrollView>
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	input: {
		height: 45,
		borderColor: 'gray',
		borderWidth: 1,
		paddingHorizontal: 10,
		marginBottom: 10,
		borderRadius: 10,
		color: 'black',
	},
	inputPassword: {
		flex: 1,
		height: 45,
		borderColor: 'gray',
		borderWidth: 1,
		paddingHorizontal: 10,
		borderRadius: 10,
		color: 'black',
	},
	passwordContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		position: 'relative',
	},
	eyeIcon: {
		position: 'absolute',
		right: 10,
		bottom: -11,
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
	innerView: {
		flex: 1,
		justifyContent: 'center',
		padding: 20,
	},
	heading: {
		textAlign: 'center',
		fontSize: 28,
		fontWeight: 'bold',
		color: 'black',
		marginBottom: 40,
	},
	close: {
		justifyContent: 'center',
		backgroundColor: '#487790',
		borderRadius: 8,
		textAlign: 'center',
		height: 40,
		marginTop: 20,
		alignItems: 'center',
	},
	alertContainer: {
		position: 'absolute',
		top: '10%',
		left: 20,
		right: 20,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		borderRadius: 8,
		height: 40,
		backgroundColor: 'rgba(255, 0, 0, 0.1)',
		paddingHorizontal: 8,
		zIndex: 1000,
	},
	errorMessage: {
		flex: 1,
		marginLeft: 8,
		color: 'red',
	},
	backImageContainer: {
		flex: 1,
		width: '100%',
		height: '100%',
		backgroundColor: 'white',
	},
})
