import React from 'react';
import { View, Image, TouchableOpacity } from 'react-native';
import { homeStyle } from '../../style/index';
import { xlBusol, bell } from '../../assets/images/index';

const HeaderComponent = (props) => {

  return (
    <View style={[homeStyle.headerContainer, props.customStyle]}>
      <Image
        source={xlBusol}
        style={homeStyle.headerImage} />
      <TouchableOpacity
        onPress={() => alert("Notification")}>
        <Image source={bell}
          style={homeStyle.headerButton} />
      </TouchableOpacity>
    </View>
  );

}

export default HeaderComponent;