import React, {Fragment,Component} from 'react';
import Uploader from './Uploader';
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
import TrainerWorkspace from './TrainerWorkspace';
import Courses from './Courses';
import Clients from './Clients';
import Plans from './Plans';
import Trainer from './Trainer';
import {Agenda} from 'react-native-calendars';
import Icon from 'react-native-vector-icons/Ionicons';
import {Calendar} from 'react-native-calendars';
import {Container, Accordion,Thumbnail, Card,List, ListItem, Item, CheckBox, CardItem,Tab,Tabs, Header, Title, Content, Button, Left, Body, Text,Right} from 'native-base';

export default class TrainerClient extends Component {
    static navigationOptions = {
            title: 'Clients',
            headerTitleStyle: { color: 'black', fontWeight: 'bold'},
            headerStyle: {backgroundColor: 'white', elevation: 0},
            headerTintColor: 'black'
          }
    render(){
        return(
            <Container>
                <Content>
                    <List>
                       <ListItem avatar onPress={() => this.props.navigation.navigate('TrainerWorkspace')}>
                          <Left>
                            <Thumbnail source={require('./profile.jpg' )} />
                          </Left>
                          <Body>
                                    <Text>Kumar Pratik</Text>
                                    <Text note>last updated 29-08-2019</Text>
                          </Body>

                       </ListItem>
                    </List>
                </Content>
            </Container>
        );

    }
}