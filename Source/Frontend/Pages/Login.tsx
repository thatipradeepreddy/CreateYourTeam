import React, { useEffect, useState } from 'react'
import { Button, StyleSheet, TextInput, View, Text, ScrollView, TouchableOpacity, ImageBackground } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import { UserProps, loginUser } from '../Controls/common.control'
import { NavigationProps } from './Routes'
import Icon from 'react-native-vector-icons/Ionicons'
import Icons from 'react-native-vector-icons/MaterialIcons'

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
    const [errorMessage, setErrorMessage] = useState('')
    const [isPasswordVisible, setIsPasswordVisible] = useState(false)

    useEffect(() => {
        if (errorMessage) {
            const timer = setTimeout(() => {
                setErrorMessage('')
            }, 2000)
            return () => clearTimeout(timer)
        }
    }, [errorMessage])

    const handleLoginPress = () => {
        const user = {
            email: enteredUsernameOrEmail,
            password: enteredPassword,
        }

        loginUser(user)
            .then((response) => {
                if (response.success) {
                    navigation.navigate('addplayer')
                } else {
                    setErrorMessage(response.message || 'Login failed')
                }
            })
            .catch((error) => {
                setErrorMessage('Error during login: ' + error.message)
            })
    }

    const handleRegister = () => {
        navigation.navigate('register')
    }

    const handleForgot = () => {
        navigation.navigate('forgot')
    }

    const renderHeading = () => {
        return <Text style={styles.heading}>Login to C Y T</Text>
    }

    const renderUserName = () => {
        return (
            <View>
                <Text>Email</Text>
                <TextInput
                    value={enteredUsernameOrEmail}
                    style={styles.input}
                    onChangeText={(text) => setEnteredUsernameOrEmail(text)}
                    placeholder="Enter Email or Username"
                />

                <Text>Password</Text>
                <View style={styles.passwordContainer}>
                    <TextInput
                        style={styles.inputPassword}
                        secureTextEntry={!isPasswordVisible}
                        value={enteredPassword}
                        onChangeText={(text) => setEnteredPassword(text)}
                        placeholder="Enter Password"
                    />
                    <TouchableOpacity style={styles.eyeIcon} onPress={() => setIsPasswordVisible(!isPasswordVisible)}>
                        <Icon name={isPasswordVisible ? 'eye-off' : 'eye'} size={23} color="gray" />
                    </TouchableOpacity>
                </View>

                <TouchableOpacity style={styles.close} onPress={handleLoginPress}>
                    <Text style={styles.submit}>Submit</Text>
                </TouchableOpacity>
            </View>
        )
    }

    const renderAlertMessage = () => {
        if (!errorMessage) return null

        return (
            <View style={styles.alertContainer}>
                <Icons style={styles.icon} name="error-outline" size={23} color="red" />
                <Text style={styles.errorMessage}>{errorMessage}</Text>
                <TouchableOpacity onPress={() => setErrorMessage('')}>
                    <Icon style={styles.icon} name="close-circle-outline" size={23} color="black" />
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
            // uri: 'https://images.unsplash.com/photo-1593341646782-e0b495cff86d?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8MXwxMTM3MjU5NXx8ZW58MHx8fHx8',
        }
        return (
            <View style={styles.main}>
                <View style={styles.backImageContainer}>
                    {/* <ImageBackground
                        source={image}
                        style={styles.backgroundImage}
                    > */}
                    <ScrollView
                        showsVerticalScrollIndicator={false}
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={styles.scrollable}
                    >
                        <View style={styles.innerView}>
                            {renderHeading()}
                            {renderUserName()}
                            {renderFooter()}
                            {renderAlertMessage()}
                        </View>
                    </ScrollView>
                    {/* </ImageBackground> */}
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
        color: 'black',
    },
    main: {
        backgroundColor: '#fff',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
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
    close: {
        justifyContent: 'center',
        backgroundColor: '#487790',
        borderRadius: 8,
        marginTop: 20,
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
        backgroundColor: 'white',
    },
    icon: {},
    backgroundImage: {
        flex: 1,
        resizeMode: 'cover',
        width: '100%',
        height: '100%',
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
    },
})
