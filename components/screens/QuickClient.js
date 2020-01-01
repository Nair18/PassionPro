import React, { Component, Fragment } from 'react';
import {StyleSheet,View,ScrollView, TouchableOpacity, Modal, Alert} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import UpdateClient from './UpdateClient';
import ClientInfo from './ClientInfo';
import { Container, Header, Content, List, ListItem, Card, Form, Left,Spinner, Item, Input, Body,Button, Picker, Right, Thumbnail, Text } from 'native-base';
import constants from '../constants';
import moment from 'moment';
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
    headerTitleStyle: { color: constants.header_text, fontWeight: 'bold'},
    headerStyle: {backgroundColor: constants.header},
    headerTintColor: constants.header_text
  }

  render(){
    const {details} = this.state
    return(
        <Container style={{backgroundColor: constants.screen_color}}>
            <ScrollView showsVerticalScrollBar={false}>
            <Content style={{margin: 15}}>
                <List>
                    {this.state.details !== null ? this.state.details.length > 0 ? this.state.details.map(client =>
                        <ListItem avatar onPress={() => this.props.navigation.navigate('ClientInfo', {id: this.state.id, client_id: client["id"]})}>
                            <Left>
                               <Thumbnail source={require('./profile.jpg')} style={{backgroundColor: 'black'}} />
                            </Left>
                            <Body>
                                <Text style={{fontWeight: 'bold'}}>{client["name"]}</Text>
                                <Text note>Membership ends on {client["end_time"] !== null ? client["end_time"].split("T")[0] : "-"}</Text>
                            </Body>
                        </ListItem>
                    ): <Card style={{backgroundColor: constants.header, padding: 10, justifyContent: 'center', alignItems: 'center'}}><Text note>Nothing to show</Text></Card> : <View style={{justifyContent: 'center', alignItems: 'center'}}><Spinner color="black"/></View>}
                </List>
            </Content>
            </ScrollView>
        </Container>
    );
  }
}
