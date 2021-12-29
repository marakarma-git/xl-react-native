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
    <Card style={[styles.cardSection, {marginTop: '3%'}, {...props.cardStyle}]}>
      <Card.Content style={[styles.cardContentWrapper, {...props.customStyle}]}>
        {!props.isOnlyContent && (
          <View
            style={[
              styles.cardTitleContainer,
              {height: props.cardTitleHeight},
              {...props.cardTitleStyle},
            ]}>
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
        )}
        {props.cardBody && (
          <View style={styles.cardBody}>{props.cardBody}</View>
        )}
        {props.loadingContent ? (
          <View style={{justifyContent: 'center', height: 100}}>
            <ActivityIndicator size="large" color={colors.main_color} />
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
  cardTitleHeight: PropTypes.number,
  titleStyle: PropTypes.object,
  cardToolbar: PropTypes.element,
  cardContent: PropTypes.element,
  loadingContent: PropTypes.bool,
  cardTitleComponent: PropTypes.element,
  cardFooter: PropTypes.element,
  cardBody: PropTypes.element,
  isOnlyContent: PropTypes.bool,
  customStyle: PropTypes.object,
  cardStyle: PropTypes.object,
  cardTitleStyle: PropTypes.object,
};
ContentCard.defaultProps = {
  cardTitle: '',
  cardHeaderStyle: {},
  titleStyle: {},
  loadingContent: false,
  cardTitleHeight: 40,
  isOnlyContent: false,
  customStyle: {},
  cardStyle: {},
  cardTitleStyle: {},
};

export default ContentCard;
