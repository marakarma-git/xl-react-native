import React from 'react';
import {View, ActivityIndicator} from 'react-native';
import {Card} from 'react-native-paper';
import {Text} from '../../components';

// Undestruct
import PropTypes from 'prop-types';
import styles from '../../style/usageAnalytics.style';
import {colors} from '../../constant/color';

const ContentCard = (props) => {
  return (
    <Card style={[styles.cardSection, {marginTop: '3%'}]}>
      <Card.Content style={styles.cardContentWrapper}>
        <View style={[styles.cardTitleContainer]}>
          {props.cardTitle ? (
            <Text
              fontType="bold"
              style={[{fontSize: 12, color: 'black'}, props.titleStyle]}>
              {props.cardTitle}
            </Text>
          ) : (
            <>{props.cardTitleComponent}</>
          )}
          <View style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
            {props.cardToolbar}
          </View>
        </View>
        {props.loadingContent ? (
          <View style={{justifyContent: 'center', height: 100}}>
            <ActivityIndicator size="large" color={colors.button_color_one} />
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
        {!props.loadingContent && props.cardFooter && (
          <View style={styles.cardFooter}>{props.cardFooter}</View>
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
  cardTitleComponent: PropTypes.node,
  cardFooter: PropTypes.node,
};
ContentCard.defaultProps = {
  cardTitle: '',
  cardHeaderStyle: {},
  titleStyle: {},
  loadingContent: false,
};

export default ContentCard;
