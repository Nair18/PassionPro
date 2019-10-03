import React, { PureComponent } from 'react';
import { View, Text, Button, Alert } from 'react-native';
import Admin from './Admin';
import SecondLevelCustomer from './second_level_customer';
import TrainerSection from './TrainerSection';
import Step from './Step';

class Wizard extends PureComponent {
  constructor(props){
    super(props);
  }
  static Step = Step;

  state = {
    index: 0,

    values: {
      ...this.props.initialValues,
    },
  };

  _nextStep = () => {
    if (this.state.index !== this.props.children.length - 1) {
      this.setState(prevState => ({
        index: prevState.index + 1,
      }));
    }
  };

  _prevStep = () => {
    if (this.state.index !== 0) {
      this.setState(prevState => ({
        index: prevState.index - 1,
      }));
    }
  };

  _onChangeValue = (name, value) => {
    this.setState(prevState => ({
      values: {
        ...prevState.values,
        [name]: value,
      },
    }));
  };

  _onSubmit = () => {
    if(this.props.role == 'Trainer'){
      this.props.navigation.navigate('TrainerSection');
    }
    else if(this.props.role == 'Trainee'){
      this.props.navigation.navigate('SecondLevelCustomer');
    }
    else{
      this.props.navigation.navigate('Admin');
    }
  };

  render() {
    console.log('values', this.state);
    return (
      <View style={{ flex: 1 }}>
        {React.Children.map(this.props.children, (el, index) => {
          if (index === this.state.index) {
            return React.cloneElement(el, {
              currentIndex: this.state.index,
              nextStep: this._nextStep,
              prevStep: this._prevStep,
              isLast: this.state.index === this.props.children.length - 1,
              onChangeValue: this._onChangeValue,
              values: this.state.values,
              onSubmit: this._onSubmit,
            });
          }

          return null;
        })}
      </View>
    );
  }
}

export default Wizard;