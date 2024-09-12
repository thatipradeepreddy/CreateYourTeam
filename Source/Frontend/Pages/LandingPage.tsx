import { useFocusEffect, useNavigation } from '@react-navigation/native'
import React, { useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native'
import { NavigationProps } from './Routes'

export function LandingPage() {
    const navigation = useNavigation<NavigationProps['navigation']>()

    useFocusEffect(React.useCallback(() => {}, []))

    const handleLogin = () => {
        navigation.navigate('login')
    }

    const handleRegister = () => {
        navigation.navigate('register')
    }

    const renderFolderIcon = () => {
        return (
            <View style={styles.folderContainer}>
                <Image source={require('./cricket.png')} style={styles.imageIcon} />
            </View>
        )
    }

    const readerHeader = () => {
        return (
            <View style={styles.headerContainer}>
                <Text style={styles.textsmall}>CREATE YOUR TEAM</Text>
            </View>
        )
    }

    const renderDescription = () => {
        return (
            <View style={styles.descriptionContainer}>
                <Text style={styles.description}>
                    CYT is an app that simplifies village cricket by managing teams and player info from various areas.
                </Text>
            </View>
        )
    }

    const renderFooter = () => {
        return (
            <View style={styles.footerContainer}>
                <TouchableOpacity style={styles.createAccount} onPress={handleRegister}>
                    <Text style={styles.buttonText}>Create an Account</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
                    <Text style={styles.loginText}>Log in</Text>
                </TouchableOpacity>
            </View>
        )
    }

    return (
        <View style={styles.backgroundImage}>
            <View style={styles.main}>
                {readerHeader()}
                {renderDescription()}
                {renderFolderIcon()}
                {renderFooter()}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    backgroundImage: {
        flex: 1,
        width: '100%',
        height: '100%',
    },
    main: {
        flex: 1,
        justifyContent: 'space-between',
        paddingHorizontal: 10,
        paddingTop: 60,
        paddingBottom: 30,
        alignItems: 'center',
    },
    headerContainer: {
        alignItems: 'center',
    },
    textsmall: {
        fontSize: 30,
        fontWeight: 'bold',
    },
    descriptionContainer: {
        marginVertical: 20,
        paddingHorizontal: 15,
    },
    description: {
        fontSize: 14,
        textAlign: 'center',
    },
    folderContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
    },
    imageIcon: {
        width: 150,
        height: 150,
    },
    footerContainer: {
        width: '100%',
        paddingHorizontal: 10,
        alignItems: 'center',
    },
    createAccount: {
        height: 50,
        justifyContent: 'center',
        backgroundColor: '#487790',
        borderRadius: 6,
        marginBottom: 10,
        width: '100%',
        alignItems: 'center',
    },
    loginButton: {
        height: 50,
        justifyContent: 'center',
        borderRadius: 6,
        width: '100%',
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    loginText: {
        color: 'black',
        fontSize: 16,
        fontWeight: 'bold',
    },
})
