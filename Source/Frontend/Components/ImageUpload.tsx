import React, { useState, useEffect } from 'react'
import { View, Button, Image, Alert } from 'react-native'
import ImagePicker, { ImagePickerResponse } from 'react-native-image-picker'

export function ImageUpload() {
	const [imageUri, setImageUri] = useState<string | null>(null)

	useEffect(() => {
		return () => {
			cleanup()
		}
	}, [])

	const cleanup = () => {}

	const openCamera = () => {
		const options: ImagePicker.CameraOptions = {
			mediaType: 'photo',
			maxWidth: 800,
			maxHeight: 600,
			quality: 1,
		}

		ImagePicker.launchCamera(options, (response) => {
			handleImagePickerResponse(response)
		})
	}

	const selectImage = () => {
		const options: ImagePicker.CameraOptions = {
			mediaType: 'photo',
			maxWidth: 800,
			maxHeight: 600,
			quality: 1,
		}

		ImagePicker.launchImageLibrary(options, (response) => {
			handleImagePickerResponse(response)
		})
	}

	const handleImagePickerResponse = (
		response: ImagePickerResponse | undefined
	) => {
		if (!response) {
			console.log('No response from image picker')
			return
		}

		if (response.didCancel) {
			console.log('User cancelled image picker')
		} else if (response.errorMessage) {
			console.log('ImagePicker Error: ', response.errorMessage)
			Alert.alert('Error', 'Could not pick image. Please try again.')
		} else if (response.assets && response.assets.length > 0) {
			const uri = response.assets[0].uri as string
			setImageUri(uri)
		} else {
			console.log('No image URI found in response')
			Alert.alert('Error', 'Could not pick image. Please try again.')
		}
	}

	return (
		<View
			style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
		>
			{imageUri && (
				<Image
					source={{ uri: imageUri }}
					style={{ width: 200, height: 200 }}
				/>
			)}
			<Button title='Open Camera' onPress={openCamera} />
			<Button title='Select Image' onPress={selectImage} />
		</View>
	)
}
