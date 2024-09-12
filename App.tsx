import React, { useEffect, useState } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { BasicInfo } from './Source/Frontend/Pages/BasicInfo'
import { Login } from './Source/Frontend/Pages/Login'
import { PlayersList } from './Source/Frontend/Pages/PlayersList'
import { RegisterUser } from './Source/Frontend/Pages/RegisterUser'
import { LandingPage } from './Source/Frontend/Pages/LandingPage'
import { Maps } from './Source/Frontend/Pages/Maps'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { StackScreenProps } from '@react-navigation/stack'
import { ForgotPassword } from './Source/Frontend/Pages/ForgotPassowrd'
import { View, ActivityIndicator } from 'react-native' // Import these for the loading state

const Stack = createStackNavigator()

interface ProtectedRouteProps extends StackScreenProps<any> {
    component: React.ComponentType<any>
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ component: Component, ...rest }) => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null) // Start as null to represent loading

    useEffect(() => {
        const checkLoginStatus = async () => {
            try {
                const userId = await AsyncStorage.getItem('userId')
                setIsAuthenticated(!!userId)
            } catch (error) {
                console.error('Error checking login status:', error)
                setIsAuthenticated(false)
            }
        }

        checkLoginStatus()
    }, [])

    // While loading the authentication status, show a loading spinner
    if (isAuthenticated === null) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        )
    }

    return isAuthenticated ? <Component {...rest} /> : <Login />
}

const App = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="landing">
                <Stack.Screen name="landing" component={LandingPage} options={{ headerShown: false }} />

                <Stack.Screen
                    name="login"
                    component={Login}
                    options={{
                        headerShown: true,
                        headerTitle: 'Login to Continue',
                        headerTitleAlign: 'center',
                    }}
                />

                <Stack.Screen name="addplayer" options={{ headerShown: false }}>
                    {(props) => <ProtectedRoute {...props} component={BasicInfo} />}
                </Stack.Screen>

                <Stack.Screen name="editplayer" options={{ headerShown: false }}>
                    {(props) => <ProtectedRoute {...props} component={BasicInfo} />}
                </Stack.Screen>

                <Stack.Screen name="playerslist" options={{ headerShown: false }}>
                    {(props) => <ProtectedRoute {...props} component={PlayersList} />}
                </Stack.Screen>

                <Stack.Screen name="location" options={{ headerShown: false }}>
                    {(props) => <ProtectedRoute {...props} component={Maps} />}
                </Stack.Screen>

                <Stack.Screen
                    name="register"
                    component={RegisterUser}
                    options={{
                        headerShown: true,
                        headerTitle: 'Register User',
                        headerTitleAlign: 'center',
                    }}
                />

                <Stack.Screen name="forgot" component={ForgotPassword} options={{ headerShown: false }} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default App
