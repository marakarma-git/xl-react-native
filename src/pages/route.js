import React from 'react'
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import Auth from './auth.page'
import Login from './login.page';
import Home from './home.route';

const Stack = createStackNavigator()
const RootStack = () => {
  return(
    <Stack.Navigator initialRouteName={"Auth"}
                     screenOptions={{
                       headerShown: false
                     }}>
      <Stack.Screen name={"Auth"} component={Auth}/>
      <Stack.Screen name={"Login"} component={Login}/>
      <Stack.Screen name={"Home"} component={Home}/>
    </Stack.Navigator>
  )
}
const Route = () =>{
  return(
    <NavigationContainer>
      <RootStack/>
    </NavigationContainer>
  )
}
export default Route
