import React from 'react';
import { Text } from 'react-native';
import { Card, Title, Headline } from 'react-native-paper';

import style from '../../style/home.style';

const ComingSoonComponent = ({item}) => {
    return(
        <Card style={style.cardSection}>
            <Card.Content style={style.cardContentWrapper}>
                <Title>{item.jsonData.title.text}</Title>
                <Text style={{ textAlign: 'center', fontSize: 16, paddingVertical: 5 }}>{"Coming Soon..."}</Text>
            </Card.Content>
        </Card>
    )
}

export default ComingSoonComponent;