import React from  'react';
import PropTypes from 'prop-types';
import {View, TouchableOpacity} from 'react-native';
import {Text, CircularProgress} from '../index';
import {Card} from 'react-native-paper';
import Entypo from 'react-native-vector-icons/Entypo';

import styles from "../../style/home.style";

const FormStepComponent = (props) => {
    return(
        <React.Fragment>
            <FormStepHeaderComponent formPosition={props.formPosition} formLength={props.formLength} formTitle={props.formTitle} />
            <FormStepBodyComponent
                formBody={props.formBody}
            />
            <FormStepFooterComponent
                formPosition={props.formPosition}
                formLength={props.formLength}
                onBack={props.onBack}
                onNext={props.onNext}
                onSubmit={props.onSubmit}
            />
        </React.Fragment>
    );
}

const FormStepHeaderComponent = (props) => {
    return (
        <Card style={[styles.cardSection, {marginTop: '5%'}]}>
        <Card.Content style={styles.formStepHeader}>
          <CircularProgress 
            stepPercent={((props.formPosition + 1) / props.formLength) * 100}
            color="#00D3A0"
            shadowColor="#eee"
            progressText={`${props.formPosition + 1} of ${props.formLength}`}
          />
          <View style={styles.formStepHeaderText}>
            <Text fontType="bold" style={styles.formStepHeaderTextTitle}>
                {props.formTitle}
            </Text>
            <Text style={styles.formStepHeaderTextBody}>
                Lorem ipsum dolor sit amet orem ipsum dolor
            </Text>
          </View>
        </Card.Content>
      </Card>
    );
}

const FormStepBodyComponent = (props) => {
    return(
        <React.Fragment>
            { props.formBody.map((form, index) => (
                <Card key={index} style={[styles.cardSection, {marginTop: '1%'}]}>
                    <Text fontType= 'bold' style={{ paddingLeft: 20, paddingVertical: 5,fontSize: 16 }}>{form.componentTitle || "-"}</Text>
                    {form.component}
                </Card>  
            )) }
        </React.Fragment>
    )
}

const FormStepFooterComponent = (props) => {
    return(
        <Card style={[styles.cardSection, {marginTop: '1%'}]}>
            <Card.Content style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <TouchableOpacity style={styles.cancelButtonFormStep}>
                    <Text fontType="bold">Cancel</Text>
                </TouchableOpacity>
                <View style={{ flexDirection: 'row' }}>
                    { props.formPosition > 0 &&
                        <TouchableOpacity onPress={props.onBack} style={styles.navigationButtonFormStep}>
                            <Entypo color="white" name="chevron-left" />
                        </TouchableOpacity> 
                    }
                    { props.formPosition < (props.formLength - 1) &&
                        <TouchableOpacity onPress={props.onNext} style={styles.navigationButtonFormStep}>
                            <Entypo color="white" name="chevron-right" />
                        </TouchableOpacity> 
                    }
                    { props.formPosition >= (props.formLength - 1) &&
                        <TouchableOpacity onPress={props.onSubmit} style={styles.navigationButtonFormStep}>
                            <Text style={{ color: 'white' }} fontType="bold">Submit</Text>
                        </TouchableOpacity> 
                    }
                </View>
            </Card.Content>
        </Card>      
    );
}

FormStepComponent.propTypes = {
    formPosition: PropTypes.number,
    formLength: PropTypes.number,
    formTitle: PropTypes.string,
    formBody: PropTypes.array,
    onNext: PropTypes.func,
    onBack: PropTypes.func,
    onSubmit: PropTypes.func
}

FormStepComponent.defaultProps = {
    formPosition: 0,
    formLength: 0,
    formTitle: 'Default Form Title',
    formBody: [],
    onNext: () => {},
    onBack: () => {},
    onSubmit: () => {}
}

export default FormStepComponent;