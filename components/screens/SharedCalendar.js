import React, { Component } from 'react';
import { View } from 'react-native';
import { Calendar} from 'react-native-calendars';
import moment from 'moment';
import {Container,Content, Card, CardItem, List, Item, Text, ListItem} from 'native-base';
import CalendarDayComponent from '../CalendarDayComponent';
import CalendarHeaderComponent from '../CalendarHeaderComponent';
import constants from '../constants';
let calendarDate = moment();

class SharedCalendar extends Component {

  constructor(props) {
    super(props);

    this.state = {
      calendarDate: calendarDate.format('YYYY-MM-DD'),
      horizontal: true,
      auth_key: null,
      gymId: null,
      logs: null
    };

    this.onPressArrowLeft = this.onPressArrowLeft.bind(this);
    this.onPressArrowRight = this.onPressArrowRight.bind(this);


    this.onDayPress = this.onDayPress.bind(this);
  }

  componentDidMount() {
        const { navigation } = this.props;
        console.log("pagal bana rhe hai")
        this.focusListener = navigation.addListener('didFocus', () => {
          console.log("focusing admin screen")
          var key  = this.retrieveItem(['key', 'id']).then(res =>
                        this.setState({auth_key: res}, () => console.log("brother pls", res))
                      ).then(() => {
                          this.fetchDetails()
                      })
        });
  }

  fetchDetails = () => {
    fetch(constants.API + 'current/trainee/sets', {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': this.state.auth_key,
        }
    }).then(res => {
        if(res.status === 200){
            return res.json()
        }
        else if(res.status === 401){
            this.props.navigation.navigate('LandingPage')
        }
        else{
            Alert.alert(constants.failed, constants.fail_error)
        }
    }).then(res => this.setState({logs: res}))
  }

  async retrieveItem(keys) {
         let auth_key = null
         const retrievedItem =  await AsyncStorage.multiGet(keys);
         retrievedItem.map(m => {
            try {
              if(m[0] === 'key'){
                 auth_key = m[1]
              }
              else if(m[0] === 'id' && m[1] !== null && m[1] !== "{}" && m[1] !== "null"){
                 this.setState({gymId: parseInt(m[1])}, () => console.log("key set hai boss", m[1]))
              }
              console.log("key retrieved")
            } catch (error) {
              console.log(error.message);
            }
         })
         return auth_key;
  }
  static navigationOptions = {
            title: 'Activity Calendar',
            headerTitleStyle: { color: constants.header_text, fontWeight: 'bold'},
            headerStyle: {backgroundColor: constants.header},
            headerTintColor: constants.header_text
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
    this.updateCalendarDate();
  }

  updateCalendarDate() {
    this.setState({
      calendarDate: calendarDate.format('YYYY-MM-DD')
    });
  }

  render() {
    let dates = new Map()
    if(this.state.logs !== null){
        for(let i=0; i<this.state.logs.length; i++){
            dates.set(str(this.state.logs[i]["date"].split("T")[0]), {selected: false, marked: true, selectedColor: 'green'})
        }
        dates.set(str([this.state.calendarDate]), {selected: true, disableTouchEvent: true, selectedDotColor: 'orange'})
    }

    return (
      <Container style={{backgroundColor: constants.screen_color}}>
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
          markedDates={dates}
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
        <Card>
            <CardItem header style={{backgroundColor: '#d6cbd3'}}>
                <Text>{this.state.calendarDate}</Text>
            </CardItem>
            <CardItem>
                <List>
                    <ListItem style={{marginTop: 5}}>
                        <Text>Created workout plan for Anjum</Text>
                    </ListItem>
                    <ListItem style={{marginTop: 5}}>
                        <Text>Created workout plan for Prakash</Text>
                    </ListItem>
                </List>
            </CardItem>

        </Card>
      <View>
      </View>
      </Content>
      </Container>
    );
  }
}

export default SharedCalendar;
