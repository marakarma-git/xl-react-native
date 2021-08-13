import React from 'react';
import {View, ActivityIndicator} from 'react-native';
import {Card} from 'react-native-paper';
import {Text} from '../../components';

// Undestruct
import PropTypes from 'prop-types';
import styles from '../../style/usageAnalytics.style';

const ContentCard = (props) => {
  return (
    <Card style={[styles.cardSection, {marginTop: '3%'}]}>
      <Card.Content style={styles.cardContentWrapper}>
        <View style={[styles.cardTitleContainer]}>
          <Text
            fontType="bold"
            style={[{fontSize: 12, color: 'black'}, props.titleStyle]}>
            {props.cardTitle}
          </Text>
          <View style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
            {props.cardToolbar}
          </View>
        </View>
        {props.loadingContent ? (
          <View style={{justifyContent: 'center', height: 100}}>
            <ActivityIndicator size="large" color="#002DBB" />
            <Text
              fontType="bold"
              style={{
                textAlign: 'center',
                fontSize: 14,
                paddingVertical: 10,
              }}>
              Loading...
            </Text>
          </View>
        ) : (
          props.cardContent
        )}
      </Card.Content>
    </Card>
  );
};

ContentCard.propTypes = {
  cardTitle: PropTypes.string,
  cardHeaderStyle: PropTypes.object,
  titleStyle: PropTypes.object,
  cardToolbar: PropTypes.node,
  cardContent: PropTypes.node,
  loadingContent: PropTypes.bool,
};
ContentCard.defaultProps = {
  cardTitle: '',
  cardHeaderStyle: {},
  titleStyle: {},
  loadingContent: false,
};

export default ContentCard;
