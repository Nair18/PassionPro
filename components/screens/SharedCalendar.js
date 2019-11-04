import React, { Component } from 'react';
import { View } from 'react-native';
import { Calendar} from 'react-native-calendars';
import moment from 'moment';
import {Container,Content, Card, CardItem, List, Item, Text, ListItem} from 'native-base';
import CalendarDayComponent from '../CalendarDayComponent';
import CalendarHeaderComponent from '../CalendarHeaderComponent';

let calendarDate = moment();

class SharedCalendar extends Component {

  constructor(props) {
    super(props);

    this.state = {
      calendarDate: calendarDate.format('YYYY-MM-DD'),
      horizontal: true
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

    return (
      <Container style={{backgroundColor: '#f0efef'}}>
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
