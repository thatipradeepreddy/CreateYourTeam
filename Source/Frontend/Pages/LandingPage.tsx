import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import React, { useState } from "react";
import { View, Text, StyleSheet, ImageBackground, TouchableOpacity, ScrollView, Modal } from "react-native";
import Icon from 'react-native-vector-icons/Ionicons';
import { NavigationProps } from "./Routes";

export function LandingPage() {
    const navigation = useNavigation<NavigationProps['navigation']>();
    const [isModalVisible, setModalVisible] = useState(false);

    useFocusEffect(
        React.useCallback(() => {
            setModalVisible(false);
        }, [])
    );

    const handleLogin = () => {
        navigation.navigate('login');
    }

    const handleRegister = () => {
        navigation.navigate('register');
    }

    const renderFolderIcon = () => {
        return (
            <TouchableOpacity onPress={() => setModalVisible(true)}>
                <View style={styles.folderContainer}>
                    <Icon style={styles.navicon} name="person-add" size={40} />
                    <Text>Add teams</Text>
                </View>
            </TouchableOpacity>
        )
    }

    const renderModal = () => {
        return (
            <Modal
                animationType="slide"
                transparent={true}
                visible={isModalVisible}
                onRequestClose={() => {
                    setModalVisible(false);
                }}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <View style={styles.sliderText}>
                            <Text style={styles.linkText}>Already a user?</Text>
                            <TouchableOpacity onPress={handleLogin}>
                                <Text style={styles.link}>Login here.</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.sliderText}>
                            <Text style={styles.linkText}>New user?</Text>
                            <TouchableOpacity onPress={handleRegister}>
                                <Text style={styles.link}>Register here.</Text>
                            </TouchableOpacity>

                        </View>
                        <TouchableOpacity style={styles.close} onPress={() => setModalVisible(false)}>
                            <Text style={styles.closeButton}>Close</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        );
    };

    const renderInitial = () => {
        return (
            <View>
                <Text style={styles.initial}>
                    Welcome to
                </Text>
            </View>
        )
    }

    const renderText = () => {
        return (
            <View>
                <Text style={styles.text}>
                    C Y T
                </Text>
            </View>
        )
    }

    const renderBigText = () => {
        return (
            <View >
                <Text style={styles.textsmall}>
                    CREATE YOUR TEAM
                </Text>
            </View>
        )
    }

    const renderDescription = () => {
        return (
            <View >
                <Text style={styles.description}>
                    CYT is an application that invites you to participate in village
                    cricket by allowing you to form multiple teams comprising players
                    from various villages. It simplifies cricket management by providing a
                    platform to store detailed information about all players.
                </Text>
            </View>
        )
    }

    const render = () => {
        const image = { uri: 'https://images.unsplash.com/photo-1593341646782-e0b495cff86d?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8MXwxMTM3MjU5NXx8ZW58MHx8fHx8' }
        return (
            <View style={styles.backgroundImage}>
                <ImageBackground
                    source={image}
                    style={styles.backgroundImage}
                >
                    <View style={styles.main}>
                        {renderModal()}
                        {renderInitial()}
                        {renderText()}
                        {renderBigText()}
                        {renderDescription()}
                        {renderFolderIcon()}
                    </View>
                </ImageBackground>
            </View>
        )
    }
    return render()
}

const styles = StyleSheet.create({
    text: {
        fontSize: 90,
        color: '#eae6ff',
    },
    navicon: {
        color: '#fd9317',
        opacity: 0.7
    },
    folderContainer: {
        flexDirection: 'column',
        alignItems: 'center'
    },

    textsmall: {
        fontSize: 30,
    },
    description: {
        fontSize: 13,
        padding: 6
    },
    main: {
        marginTop: '10%',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },

    initial: {
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 30,
        color: "black"
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
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 10,
        width: '80%',
        alignItems: 'center',
    },
    linkText: {
        marginBottom: 10,
        fontSize: 16,
        textAlign: 'center',
        marginRight: 15
    },
    sliderText: {
        flexDirection: 'row',
        alignItems: 'baseline'
    },
    link: {
        color: 'blue',
        textDecorationLine: 'underline',
    },
    closeButton: {
        padding: 10,
        fontSize: 16,
        color: 'black',
        textAlign: 'center',
    },
    close: {
        justifyContent: 'center',
        backgroundColor: '#487790',
        borderRadius: 8,
    }

});