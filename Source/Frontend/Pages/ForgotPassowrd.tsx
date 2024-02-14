import React, { useState } from "react";
import { Button, StyleSheet, TextInput, View, Text, ScrollView, ImageBackground } from "react-native";
import { Dialog } from "../Components/Dialog";

export function ForgotPassword() {
    const [dialogVisible, setDialogVisible] = useState(false);
    const [userEmail, setUserEmail] = useState('');
    const [otp, setOTP] = useState('');
    const [verificationMessage, setVerificationMessage] = useState('');

    const handleSendOTP = async () => {
        try {
            const response = await fetch('http://192.168.43.141:5000/reset-password', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email: userEmail })
            });

            if (!response.ok) {
                throw new Error('Failed to send reset link');
            }

            setVerificationMessage('Reset link sent to email');
        } catch (error) {
            console.error(error);
            setVerificationMessage('Error sending reset link');
        }
    };


    const handleSubmit = () => {
        setDialogVisible(true);
    };

    const handleConfirmSubmit = () => {
        // Handle confirmation
    };

    const renderHeading = () => {
        return (
            <View>
                <Text style={styles.heading}>Reset Password</Text>
            </View>
        );
    };

    // const renderDialog = () => {
    //     return (
    //         <Dialog
    //             isVisible={dialogVisible}
    //             onClose={() => {
    //                 setDialogVisible(false);
    //             }}
    //             onConfirm={handleConfirmSubmit}
    //         >
    //             {renderDialogContent()}
    //         </Dialog>
    //     );
    // };

    const renderDetails = () => {
        return (
            <View>
                <Text>User Name / Email</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={(text) => setUserEmail(text)}
                    value={userEmail}
                    placeholder="Enter User Name / Email"
                />

                <Text>Access token / OTP</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={(text) => setOTP(text)}
                    value={otp}
                    placeholder="Enter OTP"
                />
            </View>
        );
    };

    const renderButton = () => {
        return (
            <View style={styles.buttons}>
                <View style={styles.buttons}>
                    <Button color="green" title="Send token" onPress={handleSendOTP}></Button>
                </View>

                <View style={styles.buttons}>
                    <Button color="green" title="Reset" onPress={handleSubmit}></Button>
                </View>
            </View>
        );
    };
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
                            {/* {renderDialog()} */}
                            <Text>{verificationMessage}</Text>
                        </View>
                    </ScrollView>
                </ImageBackground>
            </View>
        </View>
    );
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
        backgroundColor: '#fff',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    scrollable: {
        flexGrow: 1,
        width: '100%',
    },
    innerView: {
        padding: 20,
        flex: 1,
        justifyContent: 'center'
    },
    buttons: {
        marginTop: 20
    },
    heading: {
        textAlign: 'center',
        fontSize: 28,
        fontWeight: 'bold',
        color: "black",
        marginBottom: 80
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
