import React from 'react';
import PropTypes from 'prop-types';
import {View, TouchableOpacity} from 'react-native';
import {Text, CircularProgress} from '../index';
import {Card} from 'react-native-paper';
import Entypo from 'react-native-vector-icons/Entypo';

import styles from '../../style/home.style';

const FormStepComponent = (props) => {
  return (
    <React.Fragment>
      <FormStepHeaderComponent
        formPosition={props.formPosition}
        formLength={props.formLength}
        formTitle={props.formTitle}
        formDescription={props.formDescription}
      />
      <FormStepBodyComponent
        listViewRef={props.listViewRef}
        formBody={props.formBody}
      />
      <FormStepFooterComponent
        formPosition={props.formPosition}
        formLength={props.formLength}
        onCancel={props.onCancel}
        onBack={props.onBack}
        onNext={props.onNext}
        onSubmit={props.onSubmit}
        submitLoading={props.submitLoading}
      />
    </React.Fragment>
  );
};

const FormStepHeaderComponent = (props) => {
  const {formPosition, formLength, formTitle, formDescription} = props || {};
  return (
    <Card style={[styles.cardSection, {marginTop: '5%'}]}>
      <Card.Content style={styles.formStepHeader}>
        <CircularProgress
          stepPercent={((formPosition + 1) / formLength) * 100}
          color="#00D3A0"
          shadowColor="#eee"
          progressText={`${formPosition + 1} of ${formLength}`}
        />
        <View style={styles.formStepHeaderText}>
          <Text fontType="bold" style={styles.formStepHeaderTextTitle}>
            {formTitle}
          </Text>
          <Text style={styles.formStepHeaderTextBody}>{formDescription}</Text>
        </View>
      </Card.Content>
    </Card>
  );
};
export {FormStepHeaderComponent};
FormStepHeaderComponent.propTypes = {
  formPosition: PropTypes.number.isRequired,
  formLength: PropTypes.number.isRequired,
  formTitle: PropTypes.string,
  formDescription: PropTypes.string,
};

const FormStepBodyComponent = (props) => {
  return (
    <React.Fragment>
      {props.formBody.map((form, index) => {
        if (form.isVisible != false) {
          return (
            <Card key={index} style={[styles.cardSection, {marginTop: '1%'}]}>
              <Text
                fontType="bold"
                style={{paddingLeft: 20, paddingVertical: 5, fontSize: 16}}>
                {form.componentTitle || '-'}
              </Text>
              {form.component}
            </Card>
          );
        }
      })}
    </React.Fragment>
  );
};

const FormStepFooterComponent = (props) => {
  return (
    <Card style={[styles.cardSection, {marginTop: '1%'}]}>
      <Card.Content
        style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <TouchableOpacity
          onPress={props.onCancel}
          style={styles.cancelButtonFormStep}>
          <Text fontType="bold">Cancel</Text>
        </TouchableOpacity>
        <View style={{flexDirection: 'row'}}>
          {props.formPosition > 0 && (
            <TouchableOpacity
              onPress={props.onBack}
              style={styles.navigationButtonFormStep}>
              <Text style={{color: 'white'}} fontType="bold">
                <Entypo color="white" name="chevron-left" />
                &nbsp; Prev
              </Text>
            </TouchableOpacity>
          )}
          {props.formPosition < props.formLength - 1 && (
            <TouchableOpacity
              onPress={props.onNext}
              style={styles.navigationButtonFormStep}>
              <Text style={{color: 'white'}} fontType="bold">
                Next&nbsp;
                <Entypo color="white" name="chevron-right" />
              </Text>
            </TouchableOpacity>
          )}
          {props.formPosition >= props.formLength - 1 && (
            <TouchableOpacity
              disabled={props.submitLoading}
              onPress={props.onSubmit}
              style={styles.navigationButtonFormStep}>
              <Text style={{color: 'white'}} fontType="bold">
                {props.submitLoading ? 'Loading...' : 'Submit'}
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </Card.Content>
    </Card>
  );
};

FormStepComponent.propTypes = {
  formPosition: PropTypes.number,
  formLength: PropTypes.number,
  formTitle: PropTypes.string,
  formBody: PropTypes.array,
  formDescription: PropTypes.string,
  onCancel: PropTypes.func,
  onNext: PropTypes.func,
  onBack: PropTypes.func,
  onSubmit: PropTypes.func,
  submitLoading: PropTypes.bool,
  isVisible: PropTypes.bool,
};

FormStepComponent.defaultProps = {
  formPosition: 0,
  formLength: 0,
  formTitle: 'Default Form Title',
  formDescription: "lorem ipsum sit dolor amet orem ipsum dolor",
  formBody: [],
  onCancel: () => {},
  onNext: () => {},
  onBack: () => {},
  onSubmit: () => {},
  submitLoading: false,
};

export default FormStepComponent;
