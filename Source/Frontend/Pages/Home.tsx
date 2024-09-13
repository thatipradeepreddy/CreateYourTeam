import React, { useRef } from 'react'
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
} from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import { NavigationProps } from './Routes'

const { width } = Dimensions.get('window')
const boxSize = width - 80 // Full width boxes

const HomePage: React.FC = () => {
    const navigation = useNavigation<NavigationProps['navigation']>()

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

    return (
        <SafeAreaView style={styles.container}>
            <TouchableOpacity style={styles.profileContainer}>
                <Icon name="person-circle-outline" size={35} color="#fff" />
            </TouchableOpacity>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                {['Teams', 'Fixtures', 'Players', 'Schedule', 'Upcoming', 'Tournaments'].map((item, index) => (
                    <TouchableWithoutFeedback
                        key={item}
                        onPressIn={() => handlePressIn(index)}
                        onPressOut={() => handlePressOut(index)}
                    >
                        <Animated.View
                            style={[styles.box, { backgroundColor: colors[index], transform: [{ scale: scaleAnims[index] }] }]}
                        >
                            <Text style={styles.boxText}>{item}</Text>
                        </Animated.View>
                    </TouchableWithoutFeedback>
                ))}
            </ScrollView>
        </SafeAreaView>
    )
}

// Colors with light opacity
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
    profileContainer: {
        position: 'absolute',
        top: 10,
        right: 10,
        backgroundColor: 'rgba(0,0,0,0.5)',
        borderRadius: 25,
        padding: 5,
        zIndex: 1, // Make sure it's on top of other elements
    },
    scrollContainer: {
        paddingBottom: 20,
        paddingHorizontal: 20,
        paddingTop: 70, // Add padding to avoid overlap with the profile icon
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
})

export default HomePage
