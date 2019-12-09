import React, { Component, Fragment } from 'react';
import {StyleSheet,View, TouchableOpacity, Modal, Alert} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import UpdateClient from './UpdateClient';
import ClientInfo from './ClientInfo';
import { Container, Header, Content, List, ListItem, Form, Left,Spinner, Item, Input, Body,Button, Picker, Right, Thumbnail, Text } from 'native-base';

export default class QuickClient extends Component {
  constructor(props){
    super(props);
    this.state={
        details: this.props.navigation.state.params.details,
        id: this.props.navigation.state.params.id
    }
  }
  static navigationOptions = {
    title: 'Clients',
    headerTitleStyle: { color: 'black', fontWeight: 'bold'},
    headerStyle: {backgroundColor: '#eadea6'},
    headerTintColor: 'black'
  }

  render(){
    const {details} = this.state
    return(
        <Container style={{backgroundColor: '#efe9cc'}}>
            <Content style={{padding:15}}>
                <List>
                    {this.state.details !== null ? this.state.details.map(client =>
                        <ListItem avatar onPress={() => this.props.navigation.navigate('ClientInfo', {id: this.state.id, client_id: client["id"]})}>
                            <Left>
                               <Thumbnail source={require('./profile.jpg')} style={{backgroundColor: 'black'}} />
                            </Left>
                            <Body>
                                <Text>{client["name"]}</Text>
                                <Text note>Membership ends on  + {client["end_time"] !== null ? client["end_time"].split("T")[0] : "no time"}</Text>
                            </Body>
                        </ListItem>
                    ) : <View style={{justifyContent: 'center', alignItems: 'center'}}><Spinner color="black"/></View>}
                </List>
            </Content>
        </Container>
    );
  }
}
