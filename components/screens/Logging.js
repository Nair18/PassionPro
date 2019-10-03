import React, {Fragment,Component} from 'react';
import { EventRegister } from 'react-native-event-listeners';
import {TextInput,Image, StyleSheet, ScrollView, TouchableOpacity, Alert} from 'react-native';
import { Button, Container, Content, View, Text,Item, Input} from 'native-base';

export default class Logging extends Component {
  constructor(props){
    super(props)
    this.state={
      datas: 'no data'
    }
  }
  static navigationOptions = {
      title: 'Tracker',
      headerTitleStyle: { color: 'white'},
      headerStyle: {backgroundColor: 'black'},
      headerTintColor: 'white'
  }

  render(){
    return(
        <Container style={{margin: 15}}>
            <Content>
              <View>
                <View style={{marginTop: 10}}>
                  <Item>
                    <Input placeholder="Weights(Kg)" />
                  </Item>
                </View>
                <View style={{marginTop: 10}}>
                  <Item>
                    <Input placeholder="Reps" />
                  </Item>
                </View>
                <View style={{marginTop: 10}}>
                  <Item>
                    <Input placeholder="Calories burnt" />
                  </Item>
                </View>
                <View style={{marginTop: 10}}>
                  <Item>
                    <Input placeholder="duration"/>
                  </Item>
                </View>

                <View style={{justifyContent: 'center', alignItems: 'center', marginTop: 15}}>
                    <Button style={{backgroundColor: 'black'}}><Text>Add Set</Text></Button>
                </View>
              </View>
              <View style={{marginTop: 25}}>
                <View>
                    <Text style={{fontWeight: 'bold', fontSize: 20}}>Tracked Sets</Text>
                </View>
                <View style={{marginTop: 15}}>
                    <Text note>No sets tracked</Text>
                </View>
              </View>
            </Content>
        </Container>
    );
  }
 }