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
import {Container, Accordion,Thumbnail, List, Card,ListItem,CheckBox, CardItem, Header, Title, Content, Button, Left, Body, Text,Right} from 'native-base';


export default class StandardWorkout extends Component {
    constructor(props){
        super(props)
    }
    static navigationOptions = {
          title: 'Workout',
          headerTitleStyle: { color: 'black', fontWeight: 'bold'},
          headerStyle: {backgroundColor: 'white', elevation: 0},
          headerTintColor: 'black'
      }
    componentDidMount(){
                    StatusBar.setHidden(false);
                }
    render(){
        return(
            <Container style={{margin: 15}}>
                <Content>
                    <View style={{justifyContent: 'center', alignItems: 'center'}}>
                        <Text style={{fontWeight: 'bold'}}>Believe in Yourself, its possible 💪</Text>
                    </View>
                    <View style={{marginTop: 15}}>
                        <Card>
                            <CardItem header>
                                <Text style={{fontWeight: 'bold'}}>Bench Press</Text>
                            </CardItem>
                            <CardItem style={{flexDirection: 'row'}}>
                                <Text style={{fontWeight: 'bold', flex: 1, fontSize: 15}}>Sets</Text>
                                <Text style={{fontWeight: 'bold', flex: 1, fontSize: 15}}>Weights</Text>
                                <Text style={{fontWeight: 'bold', flex: 1, fontSize: 15}}>Reps</Text>
                                <Text style={{fontWeight: 'bold', flex: 1, fontSize: 15}}>Duration</Text>
                            </CardItem>
                            <CardItem>
                                <Text style={{fontWeight: 'bold', fontSize: 15}}>Instructions</Text>
                            </CardItem>
                            <TouchableOpacity onPress={() => this.props.navigation.navigate('Logging')}>
                            <CardItem footer style={{backgroundColor: '#e5e5e5'}}>
                                <Text>Track your progress</Text>
                            </CardItem>
                            </TouchableOpacity>
                        </Card>
                    </View>
                </Content>

            </Container>
        )
    }
}