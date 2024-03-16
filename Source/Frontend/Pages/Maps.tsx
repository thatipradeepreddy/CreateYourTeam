import { Linking } from 'react-native'
import { useRoute } from '@react-navigation/native'
import React, { useEffect, useState } from 'react'
import { View, Button } from 'react-native'
import MapView, { Marker } from 'react-native-maps'
import { PlayerProps } from './BasicInfo'

export function Maps() {
	const [editPlayer, setEditPlayer] = useState<'add' | 'update' | 'addNew'>(
		'add'
	)
	const [playerState, setPlayerState] = useState<PlayerProps>({
		place: '',
		player: [],
	})
	const route = useRoute()

	useEffect(() => {
		if (route.params && (route.params as any).playerData) {
			const playerData = (route.params as any).playerData
			setPlayerState({ ...playerData, _id: playerData._id })
			setEditPlayer('update')
		} else if (route.params) {
			const routeParams = route.params as
				| { _id: string; place: string }
				| undefined
			const _id = routeParams?._id || ''
			const place = routeParams?.place || ''
			setPlayerState((prevState) => ({ ...prevState, _id, place }))
			setEditPlayer('addNew')
		}
	}, [route.params])

	const handleOpenGoogleMaps = () => {
		if (playerState.place) {
			const url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(playerState.place)}`
			Linking.openURL(url)
		}
	}

	const renderMaps = () => {
		return (
			<View style={{ flex: 1 }}>
				<MapView
					style={{ flex: 1 }}
					initialRegion={{
						latitude: 17.656961,
						longitude: 80.051101,
						latitudeDelta: 1,
						longitudeDelta: 1,
					}}
					// mapType='satellite'
					showsBuildings
					showsUserLocation
					zoomControlEnabled
					zoomTapEnabled
					toolbarEnabled
					showsScale
					showsPointsOfInterest
					showsMyLocationButton
					rotateEnabled
					showsCompass
					showsIndoors
				>
					<Marker
						coordinate={{
							latitude: 17.656961,
							longitude: 80.051101,
						}}
						title='Marker Title'
						description='Marker Description'
					/>
				</MapView>
				<Button
					title='Open in Google Maps'
					onPress={handleOpenGoogleMaps}
				/>
			</View>
		)
	}

	return <View style={{ flex: 1 }}>{renderMaps()}</View>
}
