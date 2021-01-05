import React from 'react'
import {
  View,
  Text
} from 'react-native'
const Login = ({navigation}) =>{
  return(
    <View>
      <Text onPress={()=>navigation.replace("Home")}>
        Hello from login
      </Text>
    </View>
  )
}
export default Login
