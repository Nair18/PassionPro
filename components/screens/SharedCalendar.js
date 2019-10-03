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
import Workspace from './workspace';
import Courses from './Courses';
import Clients from './Clients';
import Plans from './Plans';
import Trainer from './Trainer';
import {Agenda} from 'react-native-calendars';
import Icon from 'react-native-vector-icons/Ionicons';
import {Calendar} from 'react-native-calendars';
import {Container, Accordion,Thumbnail, Card,ListItem, Item, CheckBox, CardItem,Tab,Tabs, Header, Title, Content, Button, Left, Body, Text,Right} from 'native-base';


export default class SharedCalendar extends Component {
    constructor(props){
        super(props)
        this.state={
            dateSelected: ''
        }
    }
    static navigationOptions = {
        title: 'Activity Calendar',
        headerTitleStyle: { color: 'black', fontWeight: 'bold'},
        headerStyle: {backgroundColor: 'white', elevation: 0},
        headerTintColor: 'black'
      }
    render(){
        return(
            <Container>
                <Content style={{margin: 15}}>
                    <Calendar
                      // Initially visible month. Default = Date()
                      current={new Date()}
                      // Minimum date that can be selected, dates before minDate will be grayed out. Default = undefined
                      minDate={'2019-05-10'}
                      // Maximum date that can be selected, dates after maxDate will be grayed out. Default = undefined
                      maxDate={new Date()}
                      // Handler which gets executed on day press. Default = undefined
                      onDayPress={(day) => {
                        this.setState({
                        dateSelected:{[day.dateString]:{selected: true, selectedColor: '#466A8F'}}
                        },() => {
                        console.log(this.state.dateSelected)
                        })
                      }}
                      // Handler which gets executed on day long press. Default = undefined
                      onDayLongPress={(day) => {console.log('selected day', day)}}
                      // Month format in calendar title. Formatting values: http://arshaw.com/xdate/#Formatting
                      monthFormat={'yyyy MM'}
                      // Handler which gets executed when visible month changes in calendar. Default = undefined
                      onMonthChange={(month) => {console.log('month changed', month)}}
                      // Hide month navigation arrows. Default = false

                      onPressArrowLeft={substractMonth => substractMonth()}
                      // Handler which gets executed when press arrow icon left. It receive a callback can go next month
                      onPressArrowRight={addMonth => addMonth()}
                      markedDates={this.state.dateSelected}
                      style={{
                          borderWidth: 1,
                          borderColor: 'gray',
                          height: 350
                        }}
                        // Specify theme properties to override specific styles for calendar parts. Default = {}
                        theme={{
                          backgroundColor: '#ffffff',
                          calendarBackground: '#ffffff',
                          textSectionTitleColor: '#b6c1cd',
                          selectedDayBackgroundColor: 'black',
                          selectedDayTextColor: 'white',
                          todayTextColor: 'blue',
                          dayTextColor: '#2d4150',
                          textDisabledColor: '#d9e1e8',
                          dotColor: '#00adf5',
                          selectedDotColor: '#ffffff',
                          arrowColor: 'orange',
                          monthTextColor: 'black',
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

                    <View>
                        <Card>
                            <CardItem header style={{justifyContent: 'center', alignItems: 'center'}}>
                                <Text style={{fontWeight: 'bold'}}>Activities</Text>
                            </CardItem>
                            <CardItem>
                                <Item>
                                    <Text>Created meal plan for Mena N</Text>
                                </Item>
                            </CardItem>
                            <CardItem>
                                <Item>
                                    <Text>Created meal plan for Rajesh R</Text>
                                </Item>
                            </CardItem>
                            <CardItem>
                                <Item>
                                    <Text>Created Workout plan for Sangam Singh</Text>
                                </Item>
                            </CardItem>
                        </Card>
                    </View>
                </Content>
            </Container>
        );
    }
}