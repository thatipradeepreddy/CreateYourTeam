import React, { useState } from 'react'
import { StyleSheet, TextInput, View, Text, SafeAreaView, TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { UserProps, createUser } from '../Controls/common.control'
import { NavigationProps } from './Routes'
import Icon from 'react-native-vector-icons/Ionicons'
import Icons from 'react-native-vector-icons/MaterialIcons'

export function RegisterUser() {
    const navigation = useNavigation<NavigationProps['navigation']>()
    const [errorMessage, setErrorMessage] = useState('')
    const [successMessage, setSuccessMessage] = useState('')
    const [loading, setLoading] = useState(false)
    const [isPasswordVisible, setIsPasswordVisible] = useState(false)
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

        setLoading(true)

        createUser(user)
            .then((response: any) => {
                if (response.status === 'PENDING') {
                    setSuccessMessage('Verification email sent')
                } else if (response.status === 'FAILED') {
                    setErrorMessage('User with the provided email already exists!')
                }
            })
            .catch((error: any) => {
                setErrorMessage(`Failed to register user: ${error.message}`)
            })
            .finally(() => {
                setLoading(false)
            })
    }

    const renderAlertMessage = () => {
        if (!errorMessage && !successMessage) return null

        return (
            <View style={styles.alertContainer}>
                <Icons
                    name={errorMessage ? 'error-outline' : 'check-circle-outline'}
                    size={23}
                    color={errorMessage ? 'red' : 'green'}
                />
                <Text style={[styles.alertMessage, errorMessage ? styles.errorText : styles.successText]}>
                    {errorMessage || successMessage}
                </Text>
                <TouchableOpacity
                    onPress={() => {
                        setErrorMessage('')
                        setSuccessMessage('')
                    }}
                >
                    <Icon name="close-circle-outline" size={23} color="black" />
                </TouchableOpacity>
            </View>
        )
    }

    return (
        <SafeAreaView style={styles.main}>
            <View style={styles.innerView}>
                <View style={styles.formContainer}>
                    <Text>User Name</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={(text) => setUser({ ...user, name: text })}
                        value={user.name}
                        placeholder="Enter User Name"
                    />

                    <Text>Enter Email</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={(text) => setUser({ ...user, email: text })}
                        value={user.email}
                        placeholder="Enter Email"
                    />

                    <Text>Password</Text>
                    <View style={styles.passwordContainer}>
                        <TextInput
                            style={styles.inputPassword}
                            secureTextEntry={!isPasswordVisible}
                            onChangeText={(text) => setUser({ ...user, password: text })}
                            value={user.password}
                            placeholder="Enter Password"
                        />
                        <TouchableOpacity style={styles.eyeIcon} onPress={() => setIsPasswordVisible(!isPasswordVisible)}>
                            <Icon name={isPasswordVisible ? 'eye-off' : 'eye'} size={23} color="gray" />
                        </TouchableOpacity>
                    </View>
                </View>
                {!errorMessage && !successMessage && (
                    <TouchableOpacity style={styles.registerButton} onPress={handleRegister} disabled={loading}>
                        <Text style={styles.registerButtonText}>{loading ? 'Register...' : 'Register'}</Text>
                    </TouchableOpacity>
                )}
            </View>
            {renderAlertMessage()}
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    main: {
        flex: 1,
        backgroundColor: '#fff',
    },
    alertContainer: {
        position: 'absolute',
        bottom: 80,
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
    alertMessage: {
        flex: 1,
        marginLeft: 8,
    },
    errorText: {
        color: 'red',
    },
    successText: {
        color: 'green',
    },
    innerView: {
        flex: 1,
        justifyContent: 'space-between',
        padding: 20,
    },
    formContainer: {
        justifyContent: 'center',
    },
    input: {
        height: 50,
        borderColor: 'gray',
        borderWidth: 1,
        paddingHorizontal: 10,
        marginBottom: 10,
        borderRadius: 6,
        color: 'black',
    },
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
        bottom: 11,
    },
    registerButton: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#487790',
        borderRadius: 6,
        height: 50,
        marginBottom: 20,
    },
    registerButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
})
