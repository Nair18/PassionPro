import React from 'react';
import { StyleSheet, Text, View, TextInput } from 'react-native';
import {Item} from 'native-base'
import {Container} from 'native-base';
import Wizard from './Wizard';
import Input from './Input';

const forms = [
  {
    placeholder: 'Name here...',
    name: 'Name',
    placeholder2: 'Phone number',
    name2: 'Phone'
  },
  {
    placeholder: 'Email here...',
    name: 'email',
    placeholder2: 'Password',
    name: 'Password'
  },
  {
    placeholder: 'Avatar here...',
    name: 'avatar',
  },
];

export default class StepForm extends React.Component {
  static navigationOptions = {
                //Setting the header of the screen
               title: 'Setting up',
               headerTitleStyle: {color: 'white'},
               headerStyle: {backgroundColor: 'black'}
              };
  render() {

    return (
     <Container>
      <View style={styles.textContainer}>
         <Text style={{fontSize: 20}}>It will take less than a minute...</Text>
      </View>
      <View style={styles.root}>
        <Wizard
          initialValues={{
            username: '',
            email: '',
            avatar: '',
          }}
        >
          {forms.map(el => (
            <Wizard.Step key={el.name}>
              {({ onChangeValue, values }) => (
                <View style={styles.container}>
                  <Item rounded>
                  <Input
                    onChangeValue={onChangeValue}
                    placeholder={el.placeholder}
                    value={values[el.name]}
                    name={el.name}
                  />
                  </Item>
                  <Item rounded style={{marginTop: 10}}>
                  <Input
                    onChangeValue={onChangeValue}
                    placeholder={el.placeholder2}
                    value={values[el.name2]}
                    name={el.name2}
                  />
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
    margin: 20
  },
  root: {
    flex: 1,
  },

});