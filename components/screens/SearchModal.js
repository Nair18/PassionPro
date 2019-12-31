import React, {Fragment,Component} from 'react';
import { EventRegister } from 'react-native-event-listeners';
import Logging from './Logging';
import {TextInput,Image, StyleSheet, ScrollView, TouchableOpacity, Alert, Modal, StatusBar} from 'react-native';
import { Button, Container, Content, View, Text,Item,ListItem, Input, List, Card, CardItem,  Textarea} from 'native-base';
import Icon from 'react-native-vector-icons/Ionicons';


export default class SearchModal extends Component {
  constructor(props){
    super(props)
    this.state={
      data: ["Item1", "Item2", "Item3", "Item4", "Item5", "Item6","Item1", "Item2", "Item3", "Item4", "Item5", "Item6","Item1", "Item2", "Item3", "Item4", "Item5", "Item6"],
      isVisible: false,
      temp: ["Item1", "Item2", "Item3", "Item4", "Item5", "Item6","Item1", "Item2", "Item3", "Item4", "Item5", "Item6","Item1", "Item2", "Item3", "Item4", "Item5", "Item6"],

    }
  }
  static navigationOptions = {
      title: 'Workouts',
      headerTitleStyle: { color: 'black', fontWeight: 'bold'},
      headerStyle: {backgroundColor: 'white', elevation: 0},
      headerTintColor: 'black'
  }
  showModal = () => {
    this.setState({isVisible: true})
  }
  componentDidMount(){
     StatusBar.setHidden(false);
  }



  render(){
    return(
       <Container/>
    );
  }
}

