import React from 'react';
import { StyleSheet, Text, View, TextInput,StatusBar,Picker } from 'react-native';
import {Item} from 'native-base'
import {Container} from 'native-base';
import Wizard from './Wizard';
import Input from './Input';


export default class StepFormTrainer extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      name: '',
      phone: '',
      email: '',
      password: '',
      age: '',
      address: '',
      gender: 'male',
      emergency_contact_name: '',
      emergency_contact: '',
      relation: '',
      certification: '',
      passkey: null,
      loading: false
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

    var forms = [];
    var state_data = {}

      console.log("Finally sorted")

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
                 placeholder: "Age",
                 keyboard: 'numeric',
                 name: 'age',
                 placeholder2: "Address",
                 name2: 'address'
               },
               {
                 type2: 'picker',
                 placeholder2: 'Gender',
                 name2: 'gender',
                 placeholder: "Emergency contact person's name",
                 name: "emergency_contact_name"
               },
               {
                 placeholder: "Your relation with the person",
                 name: 'relation',
                 placeholder2: 'Phone number',
                 keyboard2: 'numeric',
                 name2: 'emergency_contact'
               },
               {
                placeholder: "Certifications",
                name: "certification",
                placeholder2: "Enter passkey",
                name2: "passkey"
               }
    ];


    return (
     <Container>
     <StatusBar backgroundColor='black' barStyle='light-content' />

      <View style={styles.root}>
        <Wizard
          initialValues={this.state}
          navigation = {this.props.navigation}
          role = 'Trainer'
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
                         onValueChange={(itemValue, itemIndex) =>{
                            onChangeValue('gender', itemValue)
                            this.setState({gender: itemValue})
                            }
                         }>
                         <Picker.Item label="Male" value="male" />
                         <Picker.Item label="Female" value="female" />
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