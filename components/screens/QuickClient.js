import React, { Component, Fragment } from 'react';
import {StyleSheet,View, TouchableOpacity, Modal, Alert} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import UpdateClient from './UpdateClient';
import ClientInfo from './ClientInfo';
import { Container, Header, Content, List, ListItem, Form, Left, Item, Input, Body,Button, Picker, Right, Thumbnail, Text } from 'native-base';

export default class QuickClient extends Component {
  constructor(props){
    super(props)
  }
  static navigationOptions = {
    title: 'Clients',
    headerTitleStyle: { color: 'black', fontWeight: 'bold'},
    headerStyle: {backgroundColor: '#eadea6'},
    headerTintColor: 'black'
  }

  render(){
    let clients = this.props.navigation.state.params.DETAILS
    return(
        <Container style={{backgroundColor: '#efe9cc'}}>
            <Content style={{padding:15}}>
                <List>
                    {clients !== null ? clients.map(client =>
                        <ListItem avatar onPress={() => this.props.navigation.navigate('ClientInfo', {DATA: null})}>
                            <Left>
                               <Thumbnail source={require('./profile.jpg')} style={{backgroundColor: 'black'}} />
                            </Left>
                            <Body>
                                <Text>{client["name"]}</Text>
                                <Text note>Membership ends on  + {client["end_time"] !== null ? client["end_time"].split("T")[0] : "no time"}</Text>
                            </Body>
                        </ListItem>
                    ) : <View style={{justifyContent: 'center', alignItems: 'center'}}><Text>loading ...</Text></View>}
                </List>
            </Content>
        </Container>
    );
  }
}
