/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

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
import { getStatusBarHeight } from 'react-native-status-bar-height';
import BodyFat from './BodyFat';
import BodyWeight from './BodyWeight';
import SLCProfile from './second_level_customer_profile';
import Notification from './Notification';
import faker from 'faker';
import moment from 'moment';
import Calendar from '../calendar/Calendar';
import Events from '../events/Events';
import type Moment from 'moment';
import Workspace from './workspace';
import Icon from 'react-native-vector-icons/Ionicons';
import {Container, Accordion,Thumbnail, List, Card,ListItem,CheckBox, CardItem, Header, Title, Content, Button, Left, Body, Text,Right} from 'native-base';

export type EventType = {
  date: Moment,
  title: string,
  description: string,
  image: string,
};

// Generate fake event data
const FAKE_EVENTS: Array<EventType> = (() => {
  const startDay = moment().subtract(5, 'days').startOf('day');
  return [...new Array(64)].map(_ => ({
    date: startDay.add(4, 'hours').clone(),
    title: faker.company.companyName(),
    description: faker.lorem.sentence(),
    // use random dimensions to get random urls
    image: faker.image.nightlife(Math.floor(Math.random() * 200) + 100, Math.floor(Math.random() * 200) + 100),
  }));
})();

// Filter events by date
const filterEvents = (date: Moment): ?Array<EventType> =>
  FAKE_EVENTS.filter(event => event.date.isSame(date, 'day'));


class SecondLevelCustomer extends Component {
    constructor(props) {
        //constructor to set default state
        super(props);
    }
    static navigationOptions = {
          //Setting the header of the screen
         header: null
        };

  state = {
      events: filterEvents(moment()),
      type: 'Workspace'
  };

  onSelectDate = (date: Moment) => {
      this.setState({ events: filterEvents(date) });
      if( new Date() > date){
        this.setState({type: 'Logs'})
      }
  };

  render() {
    let height = getStatusBarHeight();
    const { events } = this.state;
    const dataArray = [
      { title: "Drink water", content: "drink 1 glass of water in every 30mins" },
      { title: "pre workout meal", content: "6 egg whites and 200g milk oats" },
      { title: "post workout meal", content: "4 chappatees and 200g boiled brown rice" }
    ];
    Date.prototype.monthNames = [
      "January", "February", "March",
      "April", "May", "June",
      "July", "August", "September",
      "October", "November", "December"
    ];
    Date.prototype.dayName = ["Sun","Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    Date.prototype.getDayName = function() {
          return this.dayName[this.getDay()];
        };
    Date.prototype.getMonthName = function() {
      return this.monthNames[this.getMonth()];
    };
    Date.prototype.getShortMonthName = function () {
      return this.getMonthName().substr(0, 3);
    };
    var today = new Date();

  return (
    <Fragment>

    <Container style={{marginTop: height}}>
         <ScrollView showsVerticalScrollIndicator={false}>
            <View style={{padding: 15, flex: 1}}>
              <Text style={{color: 'black', fontSize: 20, fontWeight: 'bold'}}>Fitness Center, koramangala</Text>
            </View>


            <Content padder style={styles.contentBlock}>
              <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
              <View style={{flexDirection: 'row'}}>
              <TouchableOpacity onPress={() => this.props.navigation.navigate('Notification')}>
                <View style={styles.thumbnailBlock}><Icon size={50} name="md-notifications-outline"/></View></TouchableOpacity>
              <TouchableOpacity  onPress={() => this.props.navigation.navigate('SLCProfile')}>
                <View style={styles.thumbnailBlock}><Icon size={50} name="md-person"></Icon></View></TouchableOpacity>

              </View>
              </ScrollView>
              <Content style={{marginTop: 20}}>
                <View>
                  <Text style={{fontWeight: 'bold'}}>Fitness Programs</Text>
                </View>
                  <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                  <View style={{flexDirection: 'row'}}>
                    <View style={{marginRight: 10, marginTop: 10}}>
                       <Card style={{width: 250, height: 150}}>
                        <ImageBackground source={require('./sport.jpg')} style={{width: '100%', height: '100%'}}>

                            <Text style={{fontWeight: 'bold'}}>Class 1</Text>

                        </ImageBackground>
                        <View style={{position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center'}}>
                             <Text style={{color: 'white', fontSize: 25, fontWeight: 'bold'}}>HIIT Classes</Text>
                           </View>
                       </Card>
                    </View>


                    <View style={{marginRight: 10, marginTop: 10}}>
                       <Card style={{width: 250, height: 150}}>
                                               <ImageBackground source={require('./sport.jpg')} style={{width: '100%', height: '100%'}}>

                                                   <Text style={{fontWeight: 'bold', color: 'white'}}>Class 1</Text>

                                               </ImageBackground>
                                               <View style={{position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center'}}>
                                                    <Text style={{color: 'white', fontSize: 25, fontWeight: 'bold'}}>Zumba</Text>
                                                  </View>
                                              </Card>
                    </View>
                  </View>
                  </ScrollView>
              </Content>

              <Content style={{marginTop: 20}}>
                            <View>
                                <Text style={{fontWeight: 'bold'}}>Daily Calendar</Text>
                            </View>
                            <View style={styles.container}>
                                    <StatusBar hidden={true} />
                                    <Calendar onSelectDate={this.onSelectDate} />
                                    <Events events={events} navigation={this.props.navigation} type={this.state.type}/>
                            </View>

              </Content>
              <Content>
                <View style={{marginTop: 20}}>
                    <Text style={{fontWeight: 'bold'}}>My Progress</Text>
                </View>
                <View style={{flexDirection: 'row'}}>

                    <View style={{flex: 1, marginTop: 10}}>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('BodyWeight')}>
                        <Card style={{height: 200, width: '100%'}}>

                                <ImageBackground source={require('./i1.jpg')} style={{width: '100%', height: '100%', opacity: 0.5}}/>
                                    <View style={{position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center'}}>
                                                                                                                              <Text style={{color: 'black', fontSize: 25, fontWeight: 'bold'}}>Body Weight</Text>
                                                                                                                            </View>

                        </Card>
                        </TouchableOpacity>
                    </View>


                    <View style={{flex: 1, marginTop: 10 }}>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('BodyFat')}>
                        <Card style={{height: 200, width: '100%'}}>

                                <ImageBackground source={require('./i2.jpg')} style={{width: '100%', height: '100%', opacity: 0.5}}/>
                                <View style={{position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center'}}>
                                                                                                                          <Text style={{color: 'black', fontSize: 25, fontWeight: 'bold'}}>Body Fat</Text>
                                                                                                                        </View>
                        </Card>
                        </TouchableOpacity>
                    </View>

                </View>

                   <View style={{marginTop: 10}}>
                                           <TouchableOpacity>
                                           <Card style={{height: 200, width: '100%'}}>
                                               <ImageBackground source={require('./ii3.jpg')} style={{width: '100%', height: '100%', opacity: 0.5}}/>
                                               <View style={{position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center'}}>
                                                  <Text style={{color: 'black', fontSize: 25, fontWeight: 'bold', fontStyle: 'comic'}}>Workout</Text>
                                               </View>
                                           </Card>
                                           </TouchableOpacity>
                                       </View>

              </Content>
              </Content>
            </ScrollView>
          </Container>

          </Fragment>
  );
}};

const styles = StyleSheet.create({
  header: {
    backgroundColor: 'black',
    paddingTop: '5%'
  },
  contentBlock: {
     marginTop: 15
  },
  thumbnailAlign:{
    flexDirection: 'row'
  },
  todayPlan: {
    marginTop: 10
  },
  text: {
    fontWeight: 'bold',
    fontSize: 20
  },
  thumbnailBlock: {
    marginRight: 10,
    width: 90,
    height: 90,
    borderRadius: 50,
    backgroundColor: 'grey',
    justifyContent: 'center',
    alignItems: 'center'
  },
  notificationButton: {
    backgroundColor: 'white',
    padding: 10
  },
  notificationText: {
    fontWeight: 'bold'
  },
  card: {
    minHeight: 100
  },
  thumbnail: {
    backgroundColor: 'black'
  },
  notificationBlock: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },

  container: {
      flex: 1,
      backgroundColor: '#3F53B1',
      paddingTop: 20,
      marginTop: 20,
    },
});


export default SecondLevelCustomer;