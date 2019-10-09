import React from 'react';
import { StyleSheet, Text, View, TextInput,StatusBar,Picker } from 'react-native';
import {Item} from 'native-base'
import {Container} from 'native-base';
import Wizard from './Wizard';
import Input from './Input';


export default class StepForm extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      gender: ''
    }
  }
  static navigationOptions = {
                //Setting the header of the screen
               title: 'Sign up',
               headerTitleStyle: {
                 color: 'black',
                 fontWeight: 'bold'
               },
               headerTintColor: 'black',
               headerStyle: {backgroundColor: 'white', paddingTop: 5, elevation: 0}
              };
  render() {
    var role = this.props.navigation.state.params.ROLE
                                       ? this.props.navigation.state.params.ROLE
                                      : 'null';
    var forms = [];
    var state_data = {}
    if(role=="Trainer"){
      console.log("Finally sorted")
      state_data = {
        name: '',
        phone: '',
        email: '',
        password: '',
        age: '',
        address: '',
        city: '',
        state: '',
        gender: '',
        shift: '',
        emergency_contact: '',
        certification: '',
        medication: ''
      }
      forms = [
               {
                 placeholder: 'Name',
                 name: 'Name',
                 placeholder2: 'Phone number',
                 keyboard: 'numeric',
                 name2: 'phone'
               },
               {
                 placeholder: 'Email',
                 name: 'email',
                 placeholder2: 'Create your login password',
                 name2: 'Password',
                 secure: true
               },
               {
                 placeholder: "Age",
                 name: 'age',
                 placeholder2: "Address",
                 keyboard2: 'numeric',
                 name2: 'address'
               },
               {
                 type: 'picker',
                 array: [],
                 placeholder: 'City',
                 name: 'city',
                 type2: 'picker',
                 array2: [],
                 placeholder2: 'State',
                 name2: 'state',
               },
               {
                 type2: 'picker',
                 array: [],
                 placeholder2: 'Gender',
                 name2: 'gender',
                 type: 'picker',
                 array2: [],
                 placeholder: 'Choose your shift',
                 name: 'shift'
               },
               {
                 placeholder: "Emergency contact person's name",
                 name: 'emergency_contact',
                 placeholder2: 'Phone number',
                 keyboard2: 'numeric',
                 name2: 'emergency_contact'
               },
               {
                placeholder: "Certification",
                name: "certification",
                placeholder2: "Are you taking any medication for physical or mental illness?",
                name2: "medication"
               }

             ];
    }
    else if(role === 'Trainee'){
           state_data = {
                name: '',
                phone: '',
                email: '',
                password: '',
                age: '',
                address: '',
                city: '',
                state: '',
                gender: '',
                shift: '',
                emergency_contact: ''
           }
      forms = [
               {
                 placeholder: 'Name',
                 name: 'Name',
                 placeholder2: 'Phone number',
                 keyboard2: 'numeric',
                 name2: 'Phone'
               },
               {
                 placeholder: 'Email',
                 name: 'email',
                 placeholder2: 'Create your login password',
                 name2: 'Password',
                 secure: true
               },
               {
                 placeholder: "Age",
                 keyboard: 'numeric',
                 name: 'age',
                 placeholder2: "Address",
                 name2: "address"
               },
               {
                 type: 'picker',
                 array: [],
                 placeholder: "City",
                 name: "city",
                 type2: 'picker',
                 array2: [],
                 placeholder2: "State",
                 name2: "state"
               },
               {
                placeholder: "Emergency contact person's name",
                name: "emergency_contact",
                placeholder2: "Phone number",
                keyboard2: 'numeric',
                name2: "phone"
               }
             ];
    }
    else if(role==="Admin"){
      state_data={
        name: '',
        phone: '',
        email: '',
        chain: '',
        brand: ''
      }
      forms = [
               {
                 placeholder: 'Name',
                 name: 'Name',
                 placeholder2: 'Phone number',
                 keyboard2: 'numeric',
                 name2: 'Phone'
               },
               {
                 placeholder: 'Email',
                 name: 'email',
                 placeholder2: 'Create your login password',
                 name: 'Password',
                 secure: true
               },
               {
                 type: 'picker',
                 array: [],
                 placeholder: 'Do you have gyms at multiple locations?',
                 name: 'chain',
                 placeholder2: 'Name of your brand',
                 name2: 'brand'
               }
         ]
    }

    return (
     <Container>
     <StatusBar backgroundColor='black' barStyle='light-content' />
      <View style={styles.textContainer}>
         <Text style={{fontSize: 20}}>It will take less than a minute...</Text>
      </View>
      <View style={styles.root}>
        <Wizard
          initialValues={state_data}
          navigation = {this.props.navigation}
          role={role}
        >
          {forms.map(el => (
            <Wizard.Step key={el.name}>
              {({ onChangeValue, values }) => (
                <View style={styles.container}>
                  <Item>
                  {el.type !== 'picker' ? <Input
                    onChangeValue={onChangeValue}
                    placeholder={el.placeholder}
                    value={values[el.name]}
                    keyboardType={el.keyboard}
                    name={el.name}
                  /> : <Picker
                          placeholder = {el.placeholder}
                          selectedValue={this.state.gender}
                          style={{height: 50, width: '90%', alignItems: 'center', backgroundColor: "white"}}
                          onValueChange={(itemValue, itemIndex) =>
                            this.setState({gender: itemValue})
                          }>
                          <Picker.Item label="Select1" value={null} />
                          <Picker.Item label="Demo2" value="day1" />
                          <Picker.Item label="Demo3" value="day2" />
                        </Picker>}
                  </Item>
                  <Item style={{marginTop: 10}}>
                  {el.type2 !== 'picker' ? <Input
                    onChangeValue={onChangeValue}
                    placeholder={el.placeholder2}
                    value={values[el.name2]}
                    name={el.name2}
                    keyboardType={el.keyboard2}

                    secureTextEntry={el.secure}
                  />: <Picker
                         placeholder = {el.placeholder2}
                         selectedValue={this.state.gender}
                         style={{height: 50, width: '90%', alignItems: 'center', backgroundColor: "white"}}
                         onValueChange={(itemValue, itemIndex) =>
                            this.setState({gender: itemValue})
                         }>
                         <Picker.Item label="Select2" value={null} />
                         <Picker.Item label="Demo2" value="gender" />
                         <Picker.Item label="Demo3" value="female" />
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