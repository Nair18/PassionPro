import React, {Fragment,Component} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TouchableNativeFeedback,
  StatusBar,
  Modal,
  TouchableHighlight,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import TrainerRequest from './TrainerRequest';
import ClientRequest from './ClientRequest';

import {Container,List, Card,Header, Tab, Tabs, ListItem,TabHeading, Textarea, CheckBox, CardItem, Title, Content, Button, Left, Body, Text,Right} from 'native-base';

export default class Request extends Component{
    constructor(props){
        super(props);
    }
    static navigationOptions = {
              title: 'Requests',
              headerTitleStyle: { color: 'black', fontWeight: 'bold'},
              headerStyle: {backgroundColor: '#eadea6', elevation: 0},
              headerTintColor: 'black'
    }
    render(){

        return(
            <Container style={{backgroundColor: '#efe9cc'}}>
                        <Tabs>
                          <Tab heading={<TabHeading style={{backgroundColor: '#eadea6'}}><Text style={{color: 'black'}}>Trainer</Text></TabHeading>}>
                            <TrainerRequest ID = {this.props.navigation.state.params.ID} navigation = {this.props.navigation}/>
                          </Tab>
                          <Tab heading={<TabHeading style={{backgroundColor: '#eadea6'}}><Text style={{color: 'black'}}>Clients</Text></TabHeading>}>
                            <ClientRequest ID = {this.props.navigation.state.params.ID} navigation = {this.props.navigation}/>
                          </Tab>
                        </Tabs>
            </Container>
        );
    }
}