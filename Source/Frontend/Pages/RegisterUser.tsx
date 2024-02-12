import React, { useState } from "react";
import { Button, StyleSheet, TextInput, View, Text, SafeAreaView, TouchableHighlight, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Dialog } from "../Components/Dialog";
import { UserProps, createUser } from "../Controls/common.control";
import { NavigationProps } from "./Routes";

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
        padding: 20,
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
        flex: 1,
        justifyContent: 'center'
    },
    heading: {
        textAlign: 'center',
        fontSize: 28,
        fontWeight: 'bold',
        color: "red",
        marginBottom: 60
    },
    buttons: {
        marginTop: 20
    },
    alertMessage: {
        fontWeight: 'bold',
        color: '#ea5501'
    }
});

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
                <Text style={styles.heading}>Register</Text>
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
        return (
            <View style={styles.main}>
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
            </View>
        );
    };
    return render();
}
