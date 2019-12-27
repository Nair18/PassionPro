import React from 'react';
import { StyleSheet, Text, View, TextInput,StatusBar,Picker } from 'react-native';
import {Item} from 'native-base'
import {Container, Label} from 'native-base';
import Wizard from './Wizard';
import Input from './Input';
import DatePicker from 'react-native-datepicker';

export default class StepFormCustomer extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      name: null,
      phone: null,
      email: null,
      password: null,
      dob: null,
      address: null,
      gender: 'MALE',
      emergency_person: null,
      emergency_phone: null,
      relation_with_person: null,
      start_date: null,
      end_date: null,
      passkey: null,
    }
  }
  static navigationOptions = {
                //Setting the header of the screen
               title: 'Sign up',
               headerTitleStyle: {
                 color: 'white',
                 fontWeight: 'bold'
               },
               headerTintColor: 'white',
               headerStyle: {backgroundColor: 'black', paddingTop: 5}
              };



  render() {
    var forms = [];

    forms = [
               {
                 placeholder: 'Name',
                 name: 'name',
                 placeholder2: 'Phone number',
                 keyboard2: 'numeric',
                 name2: 'phone'
               },
               {
                 placeholder: 'Email',
                 name: 'email',
                 placeholder2: 'Create your login password',
                 name2: 'password',
                 secure: true
               },
               {
                 placeholder: "DOB",
                 type: 'picker',
                 name: 'dob',
                 placeholder2: "Address",
                 name2: "address"
               },
               {
                 placeholder: "Membership start date",
                 type: 'picker',
                 name: 'start_date',
                 placeholder2: "Gender",
                 type2: "picker",
                 name2: "gender",
               },
               {
                 placeholder: "Emergency contact person's name",
                 name: 'emergency_person',
                 placeholder2: "Your relation with the person",
                 name2: "relation_with_person",
               },
               {
                 placeholder: "Phone number",
                 keyboard: 'numeric',
                 name: "emergency_phone",
                 placeholder2: "Your passkey",
                 name2: "passkey"
               },
             ];



    return (
     <Container style={{backgroundColor: '#ffd369', padding: 15}}>
     <StatusBar backgroundColor='black' barStyle='light-content' />

      <View style={styles.root}>
        <Wizard
          initialValues={this.state}
          navigation = {this.props.navigation}
          role = 'Customer'
        >
          {forms.map(el => (
            <Wizard.Step key={el.name}>
              {({ onChangeValue, values }) => (
                <View style={styles.container}>
                  <Item>
                  {el.type === null ? null : (el.type !== 'picker' ? (<Input
                    style={{backgroundColor: 'white', width: '100%'}}
                    onChangeValue={onChangeValue}
                    placeholder={el.placeholder}
                    value={values[el.name]}
                    keyboardType={el.keyboard}
                    name={el.name}
                  /> ): (<DatePicker
                                                                          style={{width: '100%', backgroundColor: 'white'}}
                                                                          date={this.state.dob}
                                                                          mode="date"
                                                                          placeholder="select your DOB"
                                                                          format="YYYY-MM-DD"
                                                                          minDate="1900-05-01"
                                                                          maxDate= {new Date()}
                                                                          confirmBtnText="Confirm"
                                                                          cancelBtnText="Cancel"
                                                                          customStyles={{
                                                                            dateIcon: {
                                                                              position: 'absolute',
                                                                              left: 0,
                                                                              top: 4,
                                                                              marginLeft: 0
                                                                            },
                                                                            dateInput: {
                                                                              marginLeft: 36
                                                                            }
                                                                            // ... You can check the source to find the other keys.
                                                                          }}
                                                                          onDateChange={(date) =>  {
                                                                                                      console.log("date", date)
                                                                                                      onChangeValue('dob',date)
                                                                                                      this.setState({dob: date})
                                                                                                   }
                                                                                       }
                                                                        />
                                         ))}
                  </Item>
                  <Item style={{marginTop: 10}}>
                  {el.type2 !== 'picker' ? <Input
                    style={{backgroundColor: 'white', width: '100%'}}
                    onChangeValue={onChangeValue}
                    placeholder={el.placeholder2}
                    value={values[el.name2]}
                    name={el.name2}
                    keyboardType={el.keyboard2}

                    secureTextEntry={el.secure}
                  />: <Picker
                         name = {el.name2}
                         selectedValue = {this.state.gender}
                         placeholder = {el.placeholder2}
                         style={{height: 50, width: '100%', alignItems: 'center', backgroundColor: "white"}}
                         onValueChange={(itemValue, itemIndex) =>{
                            onChangeValue('gender', itemValue)
                            this.setState({gender: itemValue})
                            }
                         }
                         >
                         <Picker.Item label="Male" value="MALE" />
                         <Picker.Item label="Female" value="FEMALE" />
                      </Picker>}
                  </Item>
                </View>
              )}
            </Wizard.Step>
          ))}
        </Wizard>
      </View>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  textContainer: {
    alignItems: 'center',
    marginTop: 30
  },
  root: {
    flex: 1,
    alignItems: 'center',
    marginTop: 30
  },
  container: {
    alignItems: 'center',
    justifyContent: 'center'
  }

});