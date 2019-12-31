import React, { PureComponent, Fragment } from 'react';
import { View, Text, Button, Alert, AsyncStorage } from 'react-native';
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

  async retrieveItem(key) {
                  try {
                    const retrievedItem =  await AsyncStorage.getItem(key);
                    console.log("key retrieved", retrievedItem)
                    return retrievedItem;
                  } catch (error) {
                    console.log(error.message);
                  }
                  return;
          }


  _onSubmit = () => {
    this.retrieveItem('fcmToken').then(res => {
           console.log("got key", res)
           this.setState({fcmToken: res}, () => console.log("brother pls", res))
           return res
         }
    ).then( res => {

    console.log("data captured", this.state, res)
    if(this.state.passkey === null){
       alert("passkey cannot be empty")
    }
    else if(this.props.role === 'Customer'){
      console.log("came in submit", this.state)
      this.setState({loading: true})
      fetch(constants.API + "open/gyms/trainees/",{
         method: 'POST',
         headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
         },
         body: JSON.stringify({
         "name": this.state.name,
         "email": this.state.email,
         "password": this.state.password,
         "phone": this.state.phone,
         "dob": this.state.dob,
         "is_active": true,
         "address": this.state.address,
         "emergency_phone": this.state.emergency_phone,
         "emergency_person": this.state.emergency_person,
         "relation_with_person": this.state.relation_with_person,
         "gender": this.state.gender,
         "passkey": parseInt(this.state.passkey),
         "device_token": res,
         "start_date": this.state.start_date,
         "end_date": this.state.start_date,
         "amount": 0
         }),
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
      console.log("data cap", this.state)
      fetch(constants.API + "open/gyms/trainers/",{
               method: 'POST',
               body: JSON.stringify(this.state),
               headers: new Headers({
                  'Content-Type': 'application/json'
                 }),
                 body: JSON.stringify({
                    "name": this.state.name,
                    "email": this.state.email,
                    "password": this.state.password,
                    "phone": this.state.phone,
                    "dob": this.state.dob,
                    "is_active": true,
                    "address": this.state.address,
                    "emergency_phone": this.state.emergency_contact,
                    "emergency_person": this.state.emergency_contact_name,
                    "relation_with_person": this.state.relation,
                    "gender": this.state.gender,
                    "passkey": this.state.passkey,
                    "certifications": this.state.certification,
                    "device_token": res,
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

    }})

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