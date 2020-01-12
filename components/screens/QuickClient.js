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
        id: this.props.navigation.state.params.id,
        message: this.props.navigation.state.params.message
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
    let clients = []
    let text = null
    let text_message = null
    if(this.state.message !== null && this.state.details !== null){
        if(this.state.message === "NEW_CLIENT"){
            text = "Joined on "
            text_message = "New clients in last 30 days"
            for(let i=0;i<this.state.details.length; i++){
                data = {
                    "id": this.state.details[i]["id"],
                    "name": this.state.details[i]["name"],
                    "date": this.state.details[i]["start_time"]
                }
                clients.push(data)
            }
        }
        else if(this.state.message === "ACTIVE_PT"){
            text = "Personal training started on "
            text_message = "Actively taking personal training"
            for(let i=0;i<this.state.details.length; i++){
               data = {
                   "id": this.state.details[i]["id"],
                   "name": this.state.details[i]["name"],
                   "date": this.state.details[i]["start_time"]
               }
               clients.push(data)
            }
        }
        else if(this.state.message === "EXPIRE_PT"){
                    text = "Personal training ends on "
                    text_message = "Personal training expiring within 1 month"
                    for(let i=0;i<this.state.details.length; i++){
                       data = {
                           "id": this.state.details[i]["id"],
                           "name": this.state.details[i]["name"],
                           "date": this.state.details[i]["start_time"]
                       }
                       clients.push(data)
                    }
        }
        else if(this.state.message === "EXPIRE_MEMBER"){
                    text = "Membership ends on "
                    text_message = "Gym membership expiring within 1 month"
                    for(let i=0;i<this.state.details.length; i++){
                       data = {
                           "id": this.state.details[i]["id"],
                           "name": this.state.details[i]["name"],
                           "date": this.state.details[i]["start_time"]
                       }
                       clients.push(data)
                    }
        }
    }
    return(
        <Container style={{backgroundColor: constants.screen_color}}>
            <ScrollView showsVerticalScrollBar={false}>
            <Content style={{margin: 15}}>
                {this.state.details !== null && this.state.details.length > 0 && text_message !== null ?
                <View style={{backgroundColor: "#ffd369", padding: 10, borderRadius: 10, margin: 15}}>
                    <Text>{text_message}</Text>
                </View> : null}
                <List>
                    {this.state.details !== null ? this.state.details.length > 0 ? clients.map(client =>
                        <TouchableOpacity activeOpacity={1} onPress={() => this.props.navigation.navigate('ClientInfo', {id: this.state.id, client_id: client["id"]})}>
                        <Card style={styles.items}>
                            <View style={{flex: 1, padding: 5}}>
                               <Thumbnail source={require('./profile.jpg')} style={{backgroundColor: 'black'}} />
                            </View>
                            <View style={{flex: 4, padding: 5}}>
                                <Text style={{fontWeight: 'bold'}}>{client["name"]}</Text>
                                <Text note>{text}{client["date"] !== null ? client["date"].split("T")[0] : "-"}</Text>
                            </View>
                        </Card></TouchableOpacity>
                    ): <Card style={{backgroundColor: constants.header, padding: 10, justifyContent: 'center', alignItems: 'center'}}><Text note>Nothing to show</Text></Card> : <View style={{justifyContent: 'center', alignItems: 'center'}}><Spinner color="black"/></View>}
                </List>
            </Content>
            </ScrollView>
        </Container>
    );
  }
}


const styles = StyleSheet.create({
  addButton: {
    position: 'absolute',
    right: 30,
    bottom: 30,
  },
  items: {
    elevation: 2,
    padding: 10,
    backgroundColor: constants.card_header,
    marginTop: 2,
    marginLeft: 15,
    marginRight: 15,
    justifyContent: 'space-around',
    flexDirection: 'row',
    borderRadius: 10
    },
  item: {
    margin: 15
  }
});