import React from 'react'
import {
	Modal,
	View,
	Text,
	TouchableHighlight,
	StyleSheet,
	StyleProp,
	ViewStyle,
} from 'react-native'

interface DialogProps {
	isVisible: boolean
	onClose: () => void
	onConfirm: () => void
	children: any
	containerStyle?: StyleProp<ViewStyle>
}

export function Dialog(props: DialogProps) {
	return (
		<Modal
			animationType='slide'
			transparent={true}
			visible={props.isVisible}
			onRequestClose={props.onClose}
		>
			<View style={[styles.centeredView, props.containerStyle]}>
				<View style={styles.modalView}>
					{props.children}
					<View style={styles.footerDialog}>
						<TouchableHighlight
							style={{
								...styles.actionButton,
								backgroundColor: '#F194FF',
							}}
							onPress={props.onClose}
						>
							<Text style={styles.textStyle}>Close</Text>
						</TouchableHighlight>
						<TouchableHighlight
							style={{
								...styles.actionButton,
								backgroundColor: '#2196F3',
							}}
							onPress={props.onConfirm}
						>
							<Text style={styles.textStyle}>Confirm</Text>
						</TouchableHighlight>
					</View>
				</View>
			</View>
		</Modal>
	)
}

const styles = StyleSheet.create({
	centeredView: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		marginTop: 22,
	},
	modalView: {
		margin: 20,
		backgroundColor: 'white',
		borderRadius: 20,
		padding: 35,
		alignItems: 'center',
		elevation: 5,
	},
	actionButton: {
		borderRadius: 10,
		padding: 10,
		marginTop: 10,
		elevation: 2,
	},
	textStyle: {
		color: 'white',
		fontWeight: 'bold',
		textAlign: 'center',
	},
	footerDialog: {
		display: 'flex',
		flexDirection: 'row',
		width: '100%',
		justifyContent: 'space-between',
	},
})
