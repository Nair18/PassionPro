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
  };

  onSelectDate = (date: Moment) => {
      this.setState({ events: filterEvents(date) });
  };

  render() {
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

    <Container style={{backgroundColor: "white"}}>
            <Header noLeft style={styles.header} androidStatusBarColor='#000' iosBarStyle={"light-content"}>
              <Body>
                <Title style={styles.headerTitle}>Fitness Center, koramangala</Title>
              </Body>
            </Header>

            <ScrollView showsVerticalScrollIndicator={false}>
            <Content padder style={styles.contentBlock}>
              <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>

              <TouchableOpacity>
              <View style={styles.thumbnailBlock}><Thumbnail large style={styles.thumbnail}/></View></TouchableOpacity>

              </ScrollView>
              <Content style={{marginTop: 20}}>
                <View>
                  <Text style={{fontWeight: 'bold', fontSize: 20}}>Classes</Text>
                </View>
                  <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                  <View style={{flexDirection: 'row'}}>
                    <View style={{marginRight: 10, marginTop: 10, backgroundColor: 'black'}}>
                       <Card style={{width: 250, height: 150}}>
                        <ImageBackground source={require('./sport.jpg')} style={{width: '100%', height: '100%'}}>

                            <Text style={{fontWeight: 'bold'}}>Class 1</Text>

                        </ImageBackground>
                        <View style={{position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center'}}>
                             <Text style={{color: 'white', fontSize: 25, fontWeight: 'bold'}}>HIIT Classes</Text>
                           </View>
                       </Card>
                    </View>


                    <View style={{marginRight: 10, marginTop: 10, backgroundColor: 'black'}}>
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
                                <Text style={{fontWeight: 'bold', fontSize: 20}}>Plans</Text>
                              </View>
                                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                                <View style={{flexDirection: 'row'}}>
                                  <View style={{marginRight: 10, marginTop: 10, backgroundColor: 'black'}}>
                                     <Card style={{width: 250, height: 150}}>
                                      <ImageBackground source={require('./meal-plan.jpg')} style={{width: '100%', height: '100%'}}>

                                                                                         <Text style={{fontWeight: 'bold', color: 'white'}}>Class 1</Text>

                                                                                     </ImageBackground>
                                                                                     <View style={{position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center'}}>
                                                                                          <Text style={{color: 'white', fontSize: 25, fontWeight: 'bold'}}>30 Days Meal Plan</Text>
                                                                                        </View>
                                     </Card>
                                  </View>


                                  <View style={{marginRight: 10, marginTop: 10, backgroundColor: 'black'}}>
                                     <Card style={{width: 250, height: 150}}>
                                      <ImageBackground source={require('./meal-plan.jpg')} style={{width: '100%', height: '100%'}}>

                                                                                         <Text style={{fontWeight: 'bold', color: 'white'}}>Class 1</Text>

                                                                                     </ImageBackground>
                                                                                     <View style={{position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center'}}>
                                                                                          <Text style={{color: 'white', fontSize: 25, fontWeight: 'bold'}}>6 weeks Meal Plan</Text>
                                                                                        </View>
                                     </Card>
                                  </View>
                                </View>
                                </ScrollView>
                            </Content>
              <Content style={{marginTop: 20}}>

                            <View style={styles.container}>
                                    <StatusBar hidden={true} />
                                    <Calendar onSelectDate={this.onSelectDate} />
                                    <Events events={events} />
                            </View>

              </Content>

              <View style={styles.notificationBlock}>
                <Content>
                  <Text style={styles.notificationText}>Notifications Tile</Text>
                </Content>
              </View>
              <View>
                <TouchableOpacity>
                <Card style={styles.card}>
                  <CardItem style={styles.card}>
                    <Text style={{color: 'grey'}}>Your latest notifications will appear here</Text>
                  </CardItem>
                </Card>
                </TouchableOpacity>
               </View>
              <View style={styles.todayPlan}>
                <Card>

                  <CardItem>
                    <Text style={styles.text}>Today's Agenda: </Text>
                    <Text>{today.getDayName() +" "+today.getDate() + " " + today.getShortMonthName() + ", " + today.getFullYear()}</Text>
                  </CardItem>
                  <CardItem>
                    <Text style={{fontWeight: 'bold'}}>FitList</Text>
                  </CardItem>
                  <TouchableOpacity onPress={() => this.props.navigation.navigate('Workspace', {JSON_ListView_Clicked_Item: "Bench Press"})}>
                  <CardItem>
                    <Left>
                      <Text>Chest Workout</Text>
                    </Left>
                    <Right>
                       <Icon size={20} name="md-add"/>
                    </Right>
                  </CardItem>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => this.props.navigation.navigate('Workspace', {JSON_ListView_Clicked_Item: "Bench Press"})}>
                    <CardItem>
                      <Left>
                        <Text>Dance Class</Text>
                      </Left>
                      <Right>
                        <Icon size={20} name="md-add"/>
                      </Right>
                    </CardItem>
                  </TouchableOpacity>
                  <CardItem>
                    <Text style={{fontWeight: 'bold'}}>Todos</Text>
                  </CardItem>
                  <CardItem >
                    <Accordion

                      dataArray={dataArray}
                      headerStyle={{ backgroundColor: "#f0efef", marginTop: 5 }}
                      contentStyle={{ backgroundColor: "#e0e2e4", paddingLeft: 15}}
                    />
                  </CardItem>
                  <CardItem>
                      <Text style={{color: 'grey'}} onPress={() => alert("This is add")}>ADD YOUR AGENDA</Text>
                  </CardItem>

                </Card>
              </View>
            </Content>
            </ScrollView>
          </Container>
          </Fragment>
  );
}};

const styles = StyleSheet.create({
  header: {
    backgroundColor: 'black',
    paddingTop: 15
  },
  contentBlock: {

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

    width: 80,
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
  headerTitle: {
    color: 'white',
    flex: 3,
    justifyContent: 'center',
    fontSize: 20
  },
  container: {
      flex: 1,
      backgroundColor: '#3F53B1',
      paddingTop: 20,
    },
});


export default SecondLevelCustomer;