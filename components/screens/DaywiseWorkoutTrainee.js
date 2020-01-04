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
  Alert,
  AsyncStorage,
  TouchableHighlight,
  View,
} from 'react-native';
import Workspace from './workspace';
import Courses from './Courses';
import Clients from './Clients';
import Plans from './Plans';
import Trainer from './Trainer';
import {Agenda} from 'react-native-calendars';
import Icon from 'react-native-vector-icons/Ionicons';
import {Calendar} from 'react-native-calendars';
import CreateWorkout from './CreateWorkout';
import {Container, Accordion,Thumbnail, Card,List, ListItem, Spinner, Textarea, Item, CheckBox, CardItem,Tab,Tabs, Header, Title, Content, Button, Left, Body, Text,Right} from 'native-base';
import constants from '../constants';

export default class DaywiseWorkoutTrainee extends Component {
    constructor(props){
        super(props)
        this.state={
          isVisible: false,
          details: this.props.navigation.state.params.details
        }
    }
    static navigationOptions = {
                title: 'Workouts',
                headerTitleStyle: { color: constants.header_text, fontWeight: 'bold'},
                headerStyle: {backgroundColor: constants.header},
                headerTintColor: constants.header_text
              }
    showModal = () => {
        this.props.navigation.navigate('CreateMeal');
    }

    selectExercise = (index) => {
        console.log("index", index)

        this.setState({isVisible: false})
    }
    render(){
        workout_days = new Map()
        days = []
        if(this.state.details !== null && this.state.details["plans"]){
            for(let i=0;i<this.state.details["plans"].length; i++){
                let arr = []
                let day = this.state.details["plans"][i]["day"]
                if(workout_days.has(day)){
                    arr = workout_days.get(day)
                }
                else{
                    days.push(day)
                }
                arr.push(this.state.details["plans"][i])
                workout_days.set(day, arr)
            }
        }
        const daysOfWeek = ["MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY", "SATURDAY", "SUNDAY"];

        function daysOfWeekSorter(x,y) {
           return daysOfWeek.indexOf(x)-daysOfWeek.indexOf(y);
        }

        days.sort(daysOfWeekSorter)
        return(
            <Container style={{backgroundColor: constants.screen_color}}>
                <ScrollView showsVerticalScrollBar={false}>
                <Content style={{margin: 15}}>

                    {this.state.details !== null ? days.map(d =>
                    <TouchableOpacity activeOpacity={1} onPress={() => this.props.navigation.navigate('TraineeWorkout', {workouts: workout_days.get(d)})}>
                    <View>
                        <Card style={{backgroundColor: constants.item_card, borderRadius: 10}}>
                           <CardItem style={{justifyContent: "space-between", backgroundColor: constants.item_card, borderRadius: 10}}>
                               <Text style={{color: 'black', fontWeight: 'bold'}}>{d}</Text>
                               <Icon style={{color: 'black'}} size={20} name="md-arrow-dropright"/>
                           </CardItem>
                        </Card>
                    </View>
                    </TouchableOpacity>) : <View style={{justifyContent: 'center', alignItems: 'center'}}><Spinner color="black" /></View> }
                </Content>
                </ScrollView>
            </Container>
        );
    }
}