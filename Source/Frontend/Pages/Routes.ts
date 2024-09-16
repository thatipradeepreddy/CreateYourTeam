import { StackNavigationProp } from '@react-navigation/stack'

export interface NavigationParamList {
	login: undefined
	register: undefined
	playerslist: undefined
	homepage: undefined | any
	profile: undefined | any
	addplayer: any
	editplayer: any
	location: any
	[key: string]: undefined
}

export interface NavigationProps {
	navigation: StackNavigationProp<NavigationParamList>
}
