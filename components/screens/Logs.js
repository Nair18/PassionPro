
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
import Icon from 'react-native-vector-icons/Ionicons';
import {Container, Accordion,Thumbnail, List, Card,ListItem,CheckBox, CardItem, Header, Title, Content, Button, Left, Body, Text,Right} from 'native-base';

export default class Logs extends Component {
    constructor(props){
        super(props)
    }
    static navigationOptions = {
          //Setting the header of the screen
          title: 'Logs',
          headerStyle: {backgroundColor: 'black'},
          headerTitleStyle: {
              color: 'white'
            },
          headerTintColor: 'white',
        };

    render(){
        return(
            <Container style={{margin: 15}}>
                <Content>
                    <View style={{justifyContent: 'center', alignItems: 'center', marginTop: 10}}>
                        <Text style={{fontWeight: 'bold', fontSize: 20}}>Workouts</Text>
                    </View>
                    <View>
                        <View>
                            <Card style={{marginTop: 15}}>
                                <CardItem header>
                                    <Text style={{fontWeight: 'bold'}}>Exercise 1</Text>
                                </CardItem>
                                <CardItem>
                                    <View style={{flexDirection: 'row', justifyContent: 'space-between', marginTop: 10}}>
                                        <Text style={{fontWeight: 'bold', flex: 1, fontSize: 15}}>Sets</Text>
                                        <Text style={{fontWeight: 'bold', flex: 1, fontSize: 15}}>Weights</Text>
                                        <Text style={{fontWeight: 'bold', flex: 1, fontSize: 15}}>Reps</Text>
                                        <Text style={{fontWeight: 'bold', flex: 1, fontSize: 15}}>Duration</Text>
                                    </View>
                                </CardItem>

                                <CardItem>
                                    <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                                        <View style={{flex: 1}}>
                                          <Text>Set 1</Text>
                                        </View>
                                        <View style={{flex: 1}}>
                                            <Text>5</Text>
                                        </View>
                                        <View style={{flex: 1}}>
                                            <Text>10</Text>
                                        </View>
                                        <View style={{flex: 1}}>
                                            <Text>3min</Text>
                                        </View>
                                    </View>
                                </CardItem>
                                <CardItem footer style={{backgroundColor: '#e5e5e5'}}>
                                    <Text>Average Rest Time b/w sets: 30s</Text>
                                </CardItem>
                            </Card>
                        </View>
                    </View>

                </Content>
            </Container>
        );
    }
}