import React, { PureComponent, Fragment } from 'react';
import { View, Text, Button, Alert } from 'react-native';
import constants from '../constants';
import Admin from './Admin';
import SecondLevelCustomer from './second_level_customer';
import TrainerSection from './TrainerSection';
import Step from './Step';
import {Spinner} from 'native-base';
class Wizard extends PureComponent {
  constructor(props){
    super(props);
  }
  static Step = Step;

  state = {
    index: 0,
    loading: false,
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
    console.log(name, value)
    this.setState(prevState => ({
      values: {
        ...prevState.values,
        [name]: value,
      },
    }));
  };

  _onSubmit = () => {
    console.log("data captured", this.state)
    if(this.state.passkey === null){
       alert("passkey cannot be empty")
    }
    else if(this.props.role === 'Customer'){
      console.log("came in submit")
      this.setState({loading: true})
      fetch(constants.API + "open/gyms/trainees/",{
         method: 'POST',
         body: JSON.stringify(this.state),
         headers: new Headers({
            'Content-Type': 'application/json'
           })
         }).then((res) =>{
             console.log(res)
             if(res.status !== 200){
                this.setState({loading: false})
                 Alert.alert(
                   'OOps!',
                   "Something went wrong",
                   [
                      {text: 'OK', onPress: () => console.log('OK Pressed')},
                   ],
                    {cancelable: false},
                 );
               }
             else{
                  res.json()
                  .catch(error => console.log("Error",error))
                          .then(res => {
                              console.log("yeah yaha aa gya bloop bloop")
                              this._storeData(res)
                              this.setState({loading: false}, () => this.props.navigation.navigate('RequestProcessingPage' , {ROLE: 'SecondLevelCustomer'}))
                          })
             }
         })

    }
    else if(this.props.role === 'Trainer'){
      fetch(constants.API + "open/gyms/trainers/",{
               method: 'POST',
               body: JSON.stringify(this.state),
               headers: new Headers({
                  'Content-Type': 'application/json'
                 })
               }).then((res) =>{
                   console.log(res)
                   if(res.status !== 200){
                      this.setState({loading: false})
                       Alert.alert(
                         'OOps!',
                         "Something went wrong",
                         [
                            {text: 'OK', onPress: () => console.log('OK Pressed')},
                         ],
                          {cancelable: false},
                       );
                     }
                   else{
                        res.json()
                        .catch(error => console.log("Error",error))
                                .then(res => {
                                    console.log("yeah yaha aa gya bloop bloop")
                                    this._storeData(res)
                                    this.setState({loading: false}, () => this.props.navigation.navigate('RequestProcessingPage' , {ROLE: 'TrainerSection'}))
                                })
                   }
               })

    }

  };

  render() {
    console.log('values', this.state);
    return (
      <Fragment>
       {this.state.loading ?
                <View style={{justifyContent: 'center', alignItems: 'center', marginTop: '50%'}}>
                    <Spinner color='black'/>
                        <View style={{justifyContent:'center', alignItems: 'center'}}>
                             <Text style={{fontWeight: 'bold'}}>Checking your credibility ...</Text>
                        </View>
                </View> :

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
      </View>}
      </Fragment>
    );
  }
}

export default Wizard;