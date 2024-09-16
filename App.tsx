import React, { useEffect, useState } from 'react'
import { View, ActivityIndicator } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { BasicInfo } from './Source/Frontend/Pages/BasicInfo'
import { Login } from './Source/Frontend/Pages/Login'
import { PlayersList } from './Source/Frontend/Pages/PlayersList'
import { RegisterUser } from './Source/Frontend/Pages/RegisterUser'
import { LandingPage } from './Source/Frontend/Pages/LandingPage'
import { Maps } from './Source/Frontend/Pages/Maps'
import { ForgotPassword } from './Source/Frontend/Pages/ForgotPassowrd'
import HomePage from './Source/Frontend/Pages/Home'
import { Profile } from './Source/Frontend/Pages/Profile'
import { StackScreenProps } from '@react-navigation/stack'

const Stack = createStackNavigator()

interface ProtectedRouteProps extends StackScreenProps<any> {
    component: React.ComponentType<any>
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ component: Component, ...rest }) => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null)

    useEffect(() => {
        const checkLoginStatus = async () => {
            try {
                const userData = await AsyncStorage.getItem('userData')
                setIsAuthenticated(!!userData)
            } catch (error) {
                console.error('Error checking login status:', error)
                setIsAuthenticated(false)
            }
        }

        checkLoginStatus()
    }, [])

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
    const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null)

    useEffect(() => {
        const checkLoginStatus = async () => {
            try {
                const userData = await AsyncStorage.getItem('userData')
                setIsAuthenticated(!!userData)
            } catch (error) {
                console.error('Error checking login status:', error)
                setIsAuthenticated(false)
            }
        }

        checkLoginStatus()
    }, [])

    if (isAuthenticated === null) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        )
    }

    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName={isAuthenticated ? 'homepage' : 'landing'}>
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
                <Stack.Screen
                    name="homepage"
                    options={{
                        headerShown: true,
                        headerTitle: 'Create Your Team',
                        headerTitleAlign: 'center',
                        animationEnabled: true,
                    }}
                >
                    {(props) => <ProtectedRoute {...props} component={HomePage} />}
                </Stack.Screen>
                <Stack.Screen
                    name="profile"
                    options={{
                        headerShown: true,
                        headerTitle: 'Profile',
                        headerTitleAlign: 'center',
                        animationEnabled: true,
                    }}
                >
                    {(props) => <ProtectedRoute {...props} component={Profile} />}
                </Stack.Screen>
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
