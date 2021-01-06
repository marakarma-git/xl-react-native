import React, {useState} from 'react'
import {
  View,
  ScrollView,
  KeyboardAvoidingView,
  Image,
  TextInput,
  Keyboard,
  TouchableWithoutFeedback,
  Alert
} from 'react-native'
import {Button} from 'react-native-elements';
import styles from '../style/login.style';
const busolLogo = require('../assets/images/logo/xl-busol-inverted.png')
const Login = ({navigation}) =>{
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const onSubmit = () =>{
    if (username.length > 0 && password.length > 0) {
      navigation.replace("Home")
    } else {
      if (username.length <= 0) {
        Alert.alert('Username required','Please fill your username');
      } else {
        Alert.alert('Password required','Please fill your password');
      }
    }
  }

  return(
    <ScrollView>
      <KeyboardAvoidingView behavior={'padding'}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View>
            <View style={styles.imageContainer}>
              <Image
                style={styles.imageSize}
                source={busolLogo}/>
            </View>
            <TextInput
              placeholder="Username"
              placeholderColor="#c4c3cb"
              style={styles.textInputContainer}
              onChangeText={(e)=>setUsername(e)}
            />
            <TextInput
              placeholder="Password"
              placeholderColor="#c4c3cb"
              secureTextEntry
              style={styles.textInputContainer}
              onChangeText={(e)=>setPassword(e)}
            />
            <Button
              buttonStyle={styles.loginButton}
              onPress={()=>onSubmit()}
              title="Login"
            />
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </ScrollView>
  )
}
export default Login
