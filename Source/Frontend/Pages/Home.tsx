import React, { useEffect, useRef, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import {
    View,
    Text,
    StyleSheet,
    Dimensions,
    Animated,
    TouchableWithoutFeedback,
    ScrollView,
    TouchableOpacity,
    SafeAreaView,
    Image,
} from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import { NavigationProps } from './Routes'
import AsyncStorage from '@react-native-async-storage/async-storage'

export interface UserData {
    __v: number
    _id: string
    email: string
    image: string
    name: string
    password: string
    verified: boolean
}

const { width } = Dimensions.get('window')
const boxSize = width - 80

const HomePage: React.FC = () => {
    const navigation = useNavigation<NavigationProps['navigation']>()
    const [imageUri, setImageUri] = useState<string | null | any>(null)

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const savedData = await AsyncStorage.getItem('userData')
                if (savedData) {
                    const parsedData: UserData = JSON.parse(savedData)
                    setImageUri(parsedData.image || null)
                }
            } catch (error) {}
        }

        fetchUserData()
    }, [])

    const handleNavigate = () => {
        navigation.navigate('profile')
    }

    const scaleAnims = useRef(
        Array(6)
            .fill(null)
            .map(() => new Animated.Value(1))
    ).current

    const handlePressIn = (index: number) => {
        Animated.spring(scaleAnims[index], {
            toValue: 0.9,
            friction: 3,
            tension: 40,
            useNativeDriver: true,
        }).start()
    }

    const handlePressOut = (index: number) => {
        Animated.spring(scaleAnims[index], {
            toValue: 1,
            friction: 3,
            tension: 40,
            useNativeDriver: true,
        }).start()
    }

    const handleBoxPress = (item: string) => {
        if (item === 'Teams') {
            navigation.navigate('teamsList')
        }
    }

    return (
        <SafeAreaView style={styles.container}>
            <TouchableOpacity style={styles.profileContainer} onPress={handleNavigate}>
                <View>
                    <Image source={{ uri: imageUri }} style={styles.image} />
                </View>
            </TouchableOpacity>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                {['Teams', 'Fixtures', 'Players', 'Schedule', 'Upcoming', 'Tournaments'].map((item, index) => (
                    <TouchableWithoutFeedback
                        key={item}
                        onPressIn={() => handlePressIn(index)}
                        onPressOut={() => handlePressOut(index)}
                        onPress={() => handleBoxPress(item)}
                    >
                        <Animated.View
                            style={[styles.box, { backgroundColor: colors[index], transform: [{ scale: scaleAnims[index] }] }]}
                        >
                            <Text style={styles.boxText}>{item}</Text>
                        </Animated.View>
                    </TouchableWithoutFeedback>
                ))}
            </ScrollView>

            <View style={styles.footer}>
                <TouchableOpacity style={styles.footerIcon}>
                    <Icon name="add-circle-outline" size={30} color="#fff" />
                    <Text style={styles.footerText}>Add</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.footerIcon}>
                    <Icon name="pencil-outline" size={30} color="#fff" />
                    <Text style={styles.footerText}>Edit</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.footerIcon}>
                    <Icon name="analytics-outline" size={30} color="#fff" />
                    <Text style={styles.footerText}>Manipulate</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

const colors = [
    'rgba(0, 123, 255, 0.8)',
    'rgba(40, 167, 69, 0.8)',
    'rgba(255, 193, 7, 0.8)',
    'rgba(220, 53, 69, 0.8)',
    'rgba(23, 162, 184, 0.8)',
    'rgba(108, 117, 125, 0.8)',
]

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    image: {
        resizeMode: 'contain',
        height: 40,
        width: 40,
        borderRadius: 50,
    },
    profileContainer: {
        position: 'absolute',
        top: -45,
        right: 10,
        backgroundColor: 'rgba(0,0,0,0.5)',
        borderRadius: 25,
        zIndex: 1,
        height: 40,
        width: 40,
    },
    scrollContainer: {
        paddingBottom: 20,
        paddingHorizontal: 20,
        paddingTop: 30,
    },
    box: {
        height: boxSize / 3,
        borderRadius: 10,
        marginVertical: 10,
        justifyContent: 'center',
        alignItems: 'center',
        opacity: 0.9,
    },
    boxText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: '#333',
        paddingVertical: 10,
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
    },
    footerIcon: {
        alignItems: 'center',
    },
    footerText: {
        color: '#fff',
        fontSize: 12,
        marginTop: 5,
    },
})

export default HomePage
