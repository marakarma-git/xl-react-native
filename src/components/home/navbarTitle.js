import React from 'react';
import { View, Text } from 'react-native';

import styles from '../../style/home.style';

const NavbarTitleComponent = ({ title }) => {

    return(
        <View style={[styles.navbarContainer, { backgroundColor: '#00D3A0' }]}>
            <Text style={styles.largeText}>{ title }</Text>
        </View>
    );

}

export default NavbarTitleComponent;