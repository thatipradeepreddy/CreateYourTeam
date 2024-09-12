import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { BasicInfo } from './Source/Frontend/Pages/BasicInfo'
import { ForgotPassword } from './Source/Frontend/Pages/ForgotPassowrd'
import { Login } from './Source/Frontend/Pages/Login'
import { PlayersList } from './Source/Frontend/Pages/PlayersList'
import { RegisterUser } from './Source/Frontend/Pages/RegisterUser'
import { LandingPage } from './Source/Frontend/Pages/LandingPage'
import { Maps } from './Source/Frontend/Pages/Maps'

const Stack = createStackNavigator()

const App = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Home">
                <Stack.Screen
                    name="landing"
                    component={LandingPage}
                    options={({ route }) => ({
                        headerShown: false,
                    })}
                />

                <Stack.Screen
                    name="login"
                    component={Login}
                    options={({ route }) => ({
                        headerShown: true,
                        headerTitle: 'Login to Continue',
                        headerTitleAlign: 'center',
                    })}
                />

                <Stack.Screen
                    name="addplayer"
                    component={BasicInfo}
                    options={({ route }) => ({
                        headerShown: false,
                    })}
                />

                <Stack.Screen
                    name="editplayer"
                    component={BasicInfo}
                    options={({ route }) => ({
                        headerShown: false,
                    })}
                />

                <Stack.Screen
                    name="playerslist"
                    component={PlayersList}
                    options={({ route }) => ({
                        headerShown: false,
                    })}
                />

                <Stack.Screen
                    name="location"
                    component={Maps}
                    options={({ route }) => ({
                        headerShown: false,
                    })}
                />

                <Stack.Screen
                    name="register"
                    component={RegisterUser}
                    options={({ route }) => ({
                        headerShown: true,
                        headerTitle: 'Register User',
                        headerTitleAlign: 'center',
                    })}
                />

                <Stack.Screen
                    name="forgot"
                    component={ForgotPassword}
                    options={({ route }) => ({
                        headerShown: false,
                    })}
                />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default App
