import React, { useState } from "react";
import { Button, StyleSheet, TextInput, View, Text, ScrollView } from "react-native";
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
                    {/* {renderDialog()} */}
                    <Text>{verificationMessage}</Text>
                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    input: {
        height: 40,
        width: 300,
        borderColor: 'gray',
        borderWidth: 1,
        paddingHorizontal: 10,
        marginBottom: 10,
        borderRadius: 10,
        paddingLeft: 15
    },
    main: {
        backgroundColor: '#fff',
        padding: 20,
        flex: 1, // Takes up the whole screen height
        justifyContent: 'center', // Aligns children components vertically
        alignItems: 'center',
    },
    scrollable: {
        flexGrow: 1, // Allows ScrollView to take up remaining space
        width: '100%',
    },
    innerView: {
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
        color: "red",
        marginBottom: 80
    },
});
