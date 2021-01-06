import React, {useState, useEffect} from 'react';
import {
  View,
  ScrollView,
  KeyboardAvoidingView,
  Image,
  TextInput,
  Keyboard,
  TouchableWithoutFeedback,
  Alert,
} from 'react-native';
import {Button} from 'react-native-elements';
import lod from 'lodash';
import styles from '../style/login.style';
import {useDispatch, useSelector} from 'react-redux';
import {authLogin} from '../redux/action/auth_action';
const busolLogo = require('../assets/images/logo/xl-busol-inverted.png');
const Login = ({navigation}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const {data, loading, error} = useSelector((state) => state.auth_reducer);
  useEffect(() => {
    if (!loading && !lod.isEmpty(data)) {
      navigation.push('Home');
    }
    if (error) {
      Alert.alert('Something went wrong', JSON.stringify(error, null, 2));
    }
  }, [data, error, loading, navigation]);
  const onSubmit = () => {
    if (username.length > 0 && password.length > 0) {
      dispatch(authLogin(username, password));
    } else {
      if (username.length <= 0) {
        Alert.alert('Username required', 'Please fill your username');
      } else {
        Alert.alert('Password required', 'Please fill your password');
      }
    }
  };
  return (
    <ScrollView>
      <KeyboardAvoidingView behavior={'padding'}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View>
            <View style={styles.imageContainer}>
              <Image style={styles.imageSize} source={busolLogo} />
            </View>
            <TextInput
              editable={!loading}
              placeholder="Username"
              placeholderColor="#c4c3cb"
              style={styles.textInputContainer}
              onChangeText={(e) => setUsername(e)}
            />
            <TextInput
              editable={!loading}
              placeholder="Password"
              placeholderColor="#c4c3cb"
              secureTextEntry
              style={styles.textInputContainer}
              onChangeText={(e) => setPassword(e)}
            />
            <Button
              buttonStyle={styles.loginButton}
              onPress={() => onSubmit()}
              disabled={loading}
              loading={loading}
              title="Login"
            />
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </ScrollView>
  );
};
export default Login;
