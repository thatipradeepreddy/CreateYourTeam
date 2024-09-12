import React, { useState } from 'react'
import { Button, StyleSheet, TextInput, View, Text, TouchableOpacity, SafeAreaView } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { UserProps, loginUser } from '../Controls/common.control'
import { NavigationProps } from './Routes'
import Icon from 'react-native-vector-icons/Ionicons'
import Icons from 'react-native-vector-icons/MaterialIcons'

export function Login() {
    const navigation = useNavigation<NavigationProps['navigation']>()
    const [enteredUsernameOrEmail, setEnteredUsernameOrEmail] = useState('')
    const [enteredPassword, setEnteredPassword] = useState('')
    const [errorMessage, setErrorMessage] = useState('')
    const [isPasswordVisible, setIsPasswordVisible] = useState(false)

    const handleLoginPress = () => {
        const user = {
            email: enteredUsernameOrEmail,
            password: enteredPassword,
        }

        loginUser(user)
            .then((response: any) => {
                if (response.success) {
                    navigation.navigate('addplayer')
                } else if (response.success === false) {
                    setErrorMessage('Login failed, Invalid credentials entered!')
                }
            })
            .catch((error) => {})
    }

    const handleRegister = () => {
        navigation.navigate('register')
    }

    const handleForgot = () => {
        navigation.navigate('forgot')
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
            </View>
        )
    }

    const render = () => {
        return (
            <SafeAreaView style={styles.main}>
                <View style={styles.innerView}>
                    <View style={styles.topSection}>
                        {renderUserName()}
                        {renderFooter()}
                    </View>
                    <View style={styles.bottomSection}>
                        {!errorMessage && (
                            <TouchableOpacity style={styles.close} onPress={handleLoginPress}>
                                <Text style={styles.submit}>Login</Text>
                            </TouchableOpacity>
                        )}
                    </View>
                    {renderAlertMessage()}
                </View>
            </SafeAreaView>
        )
    }

    return render()
}

const styles = StyleSheet.create({
    input: {
        height: 50,
        borderColor: 'gray',
        borderWidth: 1,
        paddingHorizontal: 10,
        marginBottom: 10,
        borderRadius: 6,
        color: 'black',
    },
    main: {
        backgroundColor: '#fff',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    innerView: {
        flex: 1,
        justifyContent: 'space-between',
        width: '100%',
        padding: 20,
    },
    topSection: {
        flex: 1,
        justifyContent: 'flex-start',
    },
    bottomSection: {
        justifyContent: 'flex-end',
    },
    close: {
        justifyContent: 'center',
        backgroundColor: '#487790',
        borderRadius: 6,
        marginBottom: 20,
        height: 50,
    },
    submit: {
        padding: 10,
        fontSize: 16,
        color: 'white',
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
    alertContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderRadius: 8,
        height: 40,
        backgroundColor: 'rgba(255, 0, 0, 0.1)',
        paddingHorizontal: 15,
        zIndex: 1000,
        marginBottom: 20
    },
    errorMessage: {
        flex: 1,
        marginLeft: 8,
        color: 'red',
    },
    icon: {},
    inputPassword: {
        flex: 1,
        height: 50,
        borderColor: 'gray',
        borderWidth: 1,
        paddingHorizontal: 10,
        borderRadius: 6,
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
