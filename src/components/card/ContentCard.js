import React from 'react';
import {View} from 'react-native';
import {Card} from 'react-native-paper';
import {Text} from '../../components';

// Undestruct
import PropTypes from 'prop-types';
import styles from '../../style/usageAnalytics.style';

const ContentCard = (props) => {
  return (
    <Card style={[styles.cardSection, {marginTop: '3%'}]}>
      <Card.Content style={styles.cardContentWrapper}>
        <View style={[styles.cardTitleContainer, props.cardHeaderStyle]}>
          <Text
            fontType="bold"
            style={[{fontSize: 10, color: 'black'}, props.titleStyle]}>
            {props.cardTitle}
          </Text>
          {props.cardToolbar}
        </View>
        {props.loadingContent ? '' : props.cardContent}
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
