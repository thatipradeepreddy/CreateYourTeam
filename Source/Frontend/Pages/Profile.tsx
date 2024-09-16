import React, { useEffect, useState } from 'react'
import { View, Text, Image, StyleSheet, SafeAreaView, Button, Alert } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useNavigation } from '@react-navigation/native'
import { NavigationProps } from './Routes'

interface UserData {
    _id: string
    email: string
    image: string
    name: string
    password: string
    verified: boolean
}

export function Profile() {
    const navigation = useNavigation<NavigationProps['navigation']>()
    const [userData, setUserData] = useState<UserData | null>(null)

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const savedData = await AsyncStorage.getItem('userData')
                if (savedData) {
                    const parsedData: UserData = JSON.parse(savedData)
                    setUserData(parsedData)
                }
            } catch (error) {
                console.error('Failed to fetch user data:', error)
            }
        }

        fetchUserData()
    }, [])

    const handleLogout = async () => {
        try {
            await AsyncStorage.removeItem('userData')
            navigation.navigate('landing')
        } catch (error) {
            console.error('Failed to logout:', error)
        }
    }

    if (!userData) {
        return (
            <SafeAreaView style={styles.container}>
                <Text style={styles.loadingText}>Loading...</Text>
            </SafeAreaView>
        )
    }

    return (
        <SafeAreaView style={styles.container}>
            <Image source={{ uri: userData.image }} style={styles.avatar} />
            <Text style={styles.name}>{userData.name}</Text>
            <Text style={styles.email}>{userData.email}</Text>
            <Text style={[styles.verified, { color: userData.verified ? 'green' : 'red' }]}>
                {userData.verified ? 'Verified' : 'Not Verified'}
            </Text>
            <Button title="Logout" onPress={handleLogout} color="#ff4d4d" />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
        backgroundColor: '#f8f9fa',
    },
    avatar: {
        width: 120,
        height: 120,
        borderRadius: 60,
        borderWidth: 3,
        borderColor: '#007bff',
        marginBottom: 20,
    },
    name: {
        fontSize: 28,
        fontWeight: '700',
        color: '#333',
        marginBottom: 10,
    },
    email: {
        fontSize: 20,
        color: '#555',
        marginBottom: 10,
    },
    verified: {
        fontSize: 18,
        marginBottom: 20,
        fontWeight: '500',
    },
    loadingText: {
        fontSize: 18,
        color: '#666',
    },
})
