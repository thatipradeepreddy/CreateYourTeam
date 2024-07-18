import React, { useState } from 'react'
import { Button, Image, View, Text, StyleSheet } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import Icon from 'react-native-vector-icons/Ionicons'
import { launchCamera, launchImageLibrary, ImagePickerResponse, ImageLibraryOptions, MediaType } from 'react-native-image-picker'

interface ImageUploadProps {
    onImageSelect: (imageUri: string) => void
}

export function ImageUpload(props: ImageUploadProps) {
    const [imageUri, setImageUri] = useState<string | null>(null)

    const handleLaunchCamera = () => {
        const options: ImageLibraryOptions = {
            mediaType: 'photo' as MediaType,
            quality: 0.5,
        }

        launchCamera(options, (response: ImagePickerResponse) => {
            if (!response.didCancel && response.assets && response.assets[0].uri) {
                setImageUri(response.assets[0].uri)
                props.onImageSelect(response.assets[0].uri)
            }
        })
    }

    const handleLaunchImageLibrary = () => {
        const options: ImageLibraryOptions = {
            mediaType: 'photo' as MediaType,
            quality: 0.5,
        }

        launchImageLibrary(options, (response: ImagePickerResponse) => {
            if (!response.didCancel && response.assets && response.assets[0].uri) {
                setImageUri(response.assets[0].uri)
                props.onImageSelect(response.assets[0].uri)
            }
        })
    }

    return (
        <View>
            {imageUri && (
                <View style={{ width: 200, height: 150 }}>
                    <Image source={{ uri: imageUri }} style={styles.image} />
                </View>
            )}
            <View style={styles.buttons && styles.border}>
                <TouchableOpacity style={styles.buttons} onPress={handleLaunchCamera}>
                    <Text>Capture</Text>
                    <Icon name={'camera-sharp'} size={32} color="#487790" style={{ marginLeft: 5 }} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.buttons} onPress={handleLaunchImageLibrary}>
                    <Text>Upload</Text>
                    <Icon name={'cloud-upload-sharp'} size={32} color="#487790" style={{ marginLeft: 5 }} />
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    image: {
        width: '100%',
        height: '100%',
        resizeMode: 'contain',
        marginLeft: '30%',
    },
    buttons: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
    },
    border: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        borderColor: '#487790',
        borderWidth: 1,
        height: 45,
        borderRadius: 10,
    },
})
