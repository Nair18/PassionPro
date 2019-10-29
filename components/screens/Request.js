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

import {Container,List, Card,ListItem, Textarea, CheckBox, CardItem, Header, Title, Content, Button, Left, Body, Text,Right} from 'native-base';

export default class Request extends Component{
    static navigationOptions = {
              title: 'Requests',
              headerTitleStyle: { color: 'black', fontWeight: 'bold'},
              headerStyle: {backgroundColor: 'white', elevation: 0},
              headerTintColor: 'black'
    }
    render(){
        return(
            <Container>
                <Content style={{marginTop: 20, marginLeft: 15, marginRight: 15}}>
                    <List>
                        <ListItem onPress={() => this.props.navigation.navigate('TrainerRequest', {ID: this.props.navigation.state.params.ID})}>
                            <Text>Trainer</Text>
                        </ListItem>
                        <ListItem onPress={() => this.props.navigation.navigate('ClientRequest', {ID: this.props.navigation.state.params.ID})}>
                            <Text>Client</Text>
                        </ListItem>
                    </List>
                </Content>
            </Container>
        );
    }
}