import React, { useState } from "react";
import { Button, StyleSheet, TextInput, View, Text, SafeAreaView, TouchableHighlight, ScrollView, ImageBackground } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Dialog } from "../Components/Dialog";
import { UserProps, createUser } from "../Controls/common.control";
import { NavigationProps } from "./Routes";



export function RegisterUser() {
    const navigation = useNavigation<NavigationProps['navigation']>();
    const [dialogVisible, setDialogVisible] = useState(false)
    const [user, setUser] = useState<UserProps>({
        username: '',
        email: '',
        password: ''
    });

    const handleConfirmSubmit = () => {
        createUser(user)
            .then((data: any) => {
                console.log('User data posted successfully:', data)
            })
            .catch((error: any) => {
                console.error('Error posting user data:', error)
            })

        navigation.navigate('login');

    }

    const renderHeading = () => {
        return (
            <View>
                <Text style={styles.heading}>Register User</Text>
            </View>
        );
    };

    const handleSubmit = () => {
        setDialogVisible(true);
    };

    const renderDialogContent = () => {
        return (
            <Text key={user.username}>
                Are you sure you want to register:
                <Text style={styles.alertMessage}>"{user.username}"</Text>?
            </Text>
        );
    };

    const renderDialog = () => {
        return (
            <Dialog
                isVisible={dialogVisible}
                onClose={() => {
                    setDialogVisible(false);
                }}
                onConfirm={handleConfirmSubmit}
            >
                {renderDialogContent()}
            </Dialog>
        );
    };

    const renderDetails = () => {
        return (
            <View>
                <Text>User Name</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={(text) => setUser({ ...user, username: text })}
                    value={user.username}
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
                <TextInput
                    style={styles.input}
                    secureTextEntry={true}
                    onChangeText={(text) => setUser({ ...user, password: text })}
                    value={user.password}
                    placeholder="Enter Password"
                />
            </View>
        );
    };


    const renderButton = () => {
        return (
            <View style={styles.buttons}>
                <Button color="green" title="Register" onPress={handleSubmit}></Button>
            </View>
        );
    };

    const render = () => {
        const image = { uri: 'https://images.unsplash.com/photo-1593341646782-e0b495cff86d?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8MXwxMTM3MjU5NXx8ZW58MHx8fHx8' }
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
                                {renderHeading()}
                                {renderDetails()}
                                {renderButton()}
                                {renderDialog()}
                            </View>
                        </ScrollView>
                    </ImageBackground>
                </View>
            </View>
        );
    };
    return render();
}

const styles = StyleSheet.create({
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        paddingHorizontal: 10,
        marginBottom: 10,
        borderRadius: 10,
        paddingLeft: 15
    },
    main: {
        width: '100%',
        height: '100%',
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
        color: "green"
    },
    innerView: {
        padding: 20,
        flex: 1,
        justifyContent: 'center'
    },
    heading: {
        textAlign: 'center',
        fontSize: 28,
        fontWeight: 'bold',
        color: "black",
        marginBottom: 60
    },
    buttons: {
        marginTop: 20
    },
    alertMessage: {
        fontWeight: 'bold',
        color: '#ea5501'
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
    }
});
