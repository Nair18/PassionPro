import React, {Fragment,Component} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  FlatList,
  View,ImageBackground,
  AppState,
  AsyncStorage,
} from 'react-native';

import moment from 'moment';
import type Moment from 'moment';
import { Calendar} from 'react-native-calendars';
import constants from '../constants';
import Icon from 'react-native-vector-icons/Ionicons';
import {Container, Accordion,Thumbnail, List, Card,ListItem,CheckBox, CardItem, Header, Title, Content, Button, Left, Body, Text,Right} from 'native-base';

let calendarDate = moment();
export default class WorkoutProgress extends Component{
    constructor(props) {
        super(props);

        this.state = {
          calendarDate: calendarDate.format('YYYY-MM-DD'),
          horizontal: true,
          logList: null
        };

        this.onPressArrowLeft = this.onPressArrowLeft.bind(this);
        this.onPressArrowRight = this.onPressArrowRight.bind(this);


        this.onDayPress = this.onDayPress.bind(this);
      }
      static navigationOptions = {
                title: 'Activity Calendar',
                headerTitleStyle: { color: 'black', fontWeight: 'bold'},
                headerStyle: {backgroundColor: 'white', elevation: 0},
                headerTintColor: 'black'
            }
         async retrieveItem(key) {
                       try {
                         const retrievedItem =  await AsyncStorage.getItem(key);
                         console.log("key retrieved")
                         return retrievedItem;
                       } catch (error) {
                         console.log(error.message);
                       }
                       return
                   }

               componentDidMount(){
                   StatusBar.setHidden(false);
                   console.log("bros in didmount")

                           const { navigation } = this.props;
                           console.log("pagal bana rhe hai")
                           this.focusListener = navigation.addListener('didFocus', () => {
                                   var key  = this.retrieveItem('key').then(res =>
                                   this.setState({auth_key: res}, () => console.log("brother pls", res))
                                   ).then(() => this.fetchDetails())
                           });
               }

               fetchDetails = () => {
                       fetch(constants.API + 'current/trainee/sets',{
                        method: 'GET',
                           headers: {
                              'Accept': 'application/json',
                              'Content-Type': 'application/json',
                              'Authorization': this.state.auth_key,
                            },
                       }).then(response => {
                           if (response.status === 200) {
                           return response.json();
                            } else {
                               Alert.alert(
                                   'OOps!',
                                   'Something went wrong ...',
                               [
                                   {text: 'OK', onPress: () => console.log('OK Pressed')},
                               ],
                               {cancelable: false},
                               );
                            }
                            }).then(res => {
                            this.setState({logList: res["logs"].reverse()}, () => console.log("fetched yayyy!!"))
                            })
                   }

      componentWillUnmount(){
        this.focusListener.remove();
        AppState.removeEventListener('change', this._handleAppStateChange);
      }
      onPressArrowLeft() {
        calendarDate = calendarDate.add(-1, 'month');
        this.updateCalendarDate();
      }

      onPressArrowRight() {
        calendarDate = calendarDate.add(1, 'month');
        this.updateCalendarDate();
      }

      onDayPress(date) {
        calendarDate = moment(date.dateString);
        console.log("date pressed", date.dateString)
        this.updateCalendarDate();
      }

      updateCalendarDate() {
        this.setState({
          calendarDate: calendarDate.format('YYYY-MM-DD')
        });
      }

    render(){
        return(
            <Container>

               <Content>
                    <View>
                            <Calendar
                              current={this.state.calendarDate}
                              headerData={{
                                calendarDate: calendarDate.format('DD MMM, YYYY')
                              }}
                              style={{
                                paddingLeft: 0, paddingRight: 0
                              }}
                              onPressArrowLeft={this.onPressArrowLeft}
                              onPressArrowRight={this.onPressArrowRight}
                              markedDates={{
                                '2019-10-23': {selected: false, marked: true, selectedColor: 'green'},
                                '2019-10-24': {selected: false, marked: true, selectedColor: 'green'},
                                '2019-10-25': {selected: false, marked: true, selectedColor: 'green'},
                                '2019-10-26': {selected: false, marked: true, selectedColor: 'green'},
                                [this.state.calendarDate]: {selected: true, disableTouchEvent: true, selectedDotColor: 'orange'}
                              }}
                              onDayPress={this.onDayPress}
                              onMonthChange={console.log("month changed")}
                              theme={{
                                  backgroundColor: '#ffffff',
                                  calendarBackground: '#ffffff',
                                  textSectionTitleColor: '#b6c1cd',
                                  selectedDayBackgroundColor: 'green',
                                  selectedDayTextColor: 'white',
                                  todayTextColor: '#00adf5',
                                  dayTextColor: '#2d4150',
                                  textDisabledColor: '#d9e1e8',
                                  dotColor: '#00adf5',
                                  selectedDotColor: '#ffffff',
                                  arrowColor: 'orange',
                                  monthTextColor: 'blue',
                                  indicatorColor: 'blue',
                                  textDayFontFamily: 'monospace',
                                  textMonthFontFamily: 'monospace',
                                  textDayHeaderFontFamily: 'monospace',
                                  textDayFontWeight: '300',
                                  textMonthFontWeight: 'bold',
                                  textDayHeaderFontWeight: '300',
                                  textDayFontSize: 16,
                                  textMonthFontSize: 16,
                                  textDayHeaderFontSize: 16
                                }}
                            />
                          </View>
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
                                                    <CardItem>
                                                         <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                                                             <View style={{flex: 1}}>
                                                                 <Text>Set 2</Text>
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

                                                </Card>
                                            </View>
                                        </View>

               </Content>
            </Container>
        );
    }
}