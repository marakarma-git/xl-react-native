import React from 'react'
import {
  View,
  Text
} from 'react-native'
import {useSelector} from 'react-redux'
const Auth = ({navigation}) =>{
  const dummy_action = useSelector(state=> state.dummy_reducer)
  return(
    <View>
      <Text onPress={()=>navigation.replace("Login")}>
        hello from auth dummy_action:{JSON.stringify(dummy_action)}
      </Text>
    </View>
  )
}
export default Auth
