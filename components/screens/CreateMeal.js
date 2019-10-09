import React, {Fragment,Component} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  FlatList,
  View,ImageBackground
} from 'react-native';

import faker from 'faker';
import moment from 'moment';
import Calendar from '../calendar/Calendar';
import Events from '../events/Events';
import type Moment from 'moment';
import Workspace from './workspace';
import Logging from './Logging';
import Icon from 'react-native-vector-icons/Ionicons';
import {Container, Accordion,Thumbnail, List, Card, Input, Textarea, Item, ListItem,CheckBox, CardItem, Header, Title, Content, Button, Left, Body, Text,Right} from 'native-base';

export default class CreateMeal extends Component {
    static navigationOptions = {
          title: 'Create Meal',
          headerTitleStyle: { color: 'black', fontWeight: 'bold'},
          headerStyle: {backgroundColor: 'white', elevation: 0},
          headerTintColor: 'black'
      }

    render(){
        return(
            <Container>
                <Content style={{margin: 15}}>
                    <View style={{marginTop: 15}}>
                        <View >
                            <Item style={{marginTop: 10}}>
                               <Input keyboardType='numeric' placeholder="Name of the meal"/>
                            </Item>

                            <Item regular style={{marginTop: 10}}>
                                <Textarea rowSpan={5} placeholder="Description"/>
                            </Item>
                        </View>
                        <View style={{marginTop: 15, justifyContent: 'center', alignItems: 'center'}}>
                              <Button style={{backgroundColor: 'black'}}><Text style={{color: 'white'}}>Save</Text></Button>
                        </View>
                    </View>
                </Content>
            </Container>
        );
    }
}