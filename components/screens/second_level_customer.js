/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Fragment,Component, PureComponent} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  FlatList,
  AsyncStorage,
  AppState,
  View,ImageBackground
} from 'react-native';
import ProfileSkeleton from './ProfileSkeleton';
import IconBadge from 'react-native-icon-badge';

import constants from '../constants';
import WorkoutProgress from './WorkoutProgress';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import BodyFat from './BodyFat';
import ClientCourseInfo from './ClientCourseInfo';
import BodyWeight from './BodyWeight';
import SLCProfile from './second_level_customer_profile';
import CustomerNotification from './CustomerNotification';
import moment from 'moment';
import Calendar from '../calendar/Calendar';
import type Moment from 'moment';
import Workspace from './workspace';
import Icon from 'react-native-vector-icons/Ionicons';
import {Container, Accordion,Thumbnail, List, Card,ListItem,CheckBox, CardItem, Header,Badge, Title, Content, Button, Left, Body, Text,Right} from 'native-base';
import type {Notification} from 'react-native-firebase';
import firebase from 'react-native-firebase';

export type EventType = {
  date: Moment,
  title: string,
  description: string,
  image: string,
};



class SecondLevelCustomer extends PureComponent {
    constructor(props) {
        //constructor to set default state
        super(props);
        this.state = {
            auth_key: null,
            courseInfo: null,
            BadgeCount: 1
        }
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
      this.checkPermission();
      this.createNotificationListeners();

      console.log("bros in didmount")

        const { navigation } = this.props;
        console.log("pagal bana rhe hai")
        this.focusListener = navigation.addListener('didFocus', () => {
                var key  = this.retrieveItem('key').then(res =>
                this.setState({auth_key: res}, () => console.log("brother pls", res))
                ).then(() => this.fetchDetails())
        });
    }
    componentWillUnmount(){
        this.focusListener.remove();

    }

    async checkPermission() {
                 const enabled = await firebase.messaging().hasPermission();
                 if (enabled) {
                   this.getToken();
                 } else {
                   this.requestPermission();
                 }
               }

               //3
    async getToken() {
                 let fcmToken = await AsyncStorage.getItem('fcmToken');
                 if (!fcmToken) {
                   fcmToken = await firebase.messaging().getToken()
                   .then(fcmToken => {
                     // user has a device token
                     console.log('fcmToken:', fcmToken);
                     AsyncStorage.setItem('fcmToken', fcmToken);
                   })
                 }
                 console.log('fcmToken:', fcmToken);
               }

               //2
    async requestPermission() {
                 try {
                   await firebase.messaging().requestPermission();
                   // User has authorised
                   this.getToken();
                 } catch (error) {
                   // User has rejected permissions
                   console.log("error", error)
                   console.log('permission rejected');
                 }
               }

    async createNotificationListeners() {
                 /*
                 * Triggered when a particular notification has been received in foreground
                 * */
                 const channelId = new firebase.notifications.Android.Channel('Default', 'Default', firebase.notifications.Android.Importance.High);
                 firebase.notifications().android.createChannel(channelId);

                 this.notificationListener = firebase.notifications().onNotification((notification) => {
                   const { title, body } = notification;
                   console.log('onNotification:', notification);

                     const localNotification = new firebase.notifications.Notification({
                       sound: 'default',
                       show_in_foreground: true

                     })
                     .setSound('default')
                     .setNotificationId(notification.notificationId)
                     .setTitle(notification.title)
                     .setBody(notification.body)
                     .android.setSmallIcon('ic_launcher')
                     .android.setChannelId('Default') // e.g. the id you chose above
                     .android.setPriority(firebase.notifications.Android.Priority.High);

                     firebase.notifications()
                       .displayNotification(localNotification)
                       .catch(err => console.error(err));
                 });

                this.messageListener = firebase.messaging().onMessage((message) => {
                      //process data message
                      console.log("JSON.stringify:", JSON.stringify(message));
                    });

                 /*
                 * If your app is in background, you can listen for when a notification is clicked / tapped / opened as follows:
                 * */


                 /*
                 * If your app is closed, you can check if it was opened by a notification being clicked / tapped / opened as follows:
                 * */

                 /*
                 * Triggered for data only payload in foreground
                 * */

        }

    fetchDetails = () => {
        fetch(constants.API + 'current/trainee/courses',{
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
                this.setState({loading: false})
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
             this.setState({courseInfo: res})
             }).then(console.log("fetched the api data", this.state.courseInfo))
    }
    static navigationOptions = {
          //Setting the header of the screen
         header: null
    };

  render() {
    let height = getStatusBarHeight();
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
    {this.state.courseInfo !== null ?
    <Container style={{backgroundColor: '#efe9cc'}}>


            <View style={{flexDirection: 'row', justifyContent: 'space-between', backgroundColor: '#eadea6', elevation: 1}}>
                                <View style={{flex: 2, padding: 15}}>
                                    <Text style={{fontWeight: 'bold', fontSize: 20}}>Fitness Center</Text>
                                    <Text note>koramangala</Text>
                                </View>
                              </View>
         <ScrollView showsVerticalScrollIndicator={false}>

            <Content padder style={styles.contentBlock}>
              <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
              <View style={{flexDirection: 'row',justifyContent: 'center', alignItems: 'center'}}>
              <TouchableOpacity  activeOpacity={1} onPress={() => this.props.navigation.navigate('SLCProfile')}>
                <View style={styles.thumbnailBlock}><Thumbnail medium source={require('./profile.jpg')}style={styles.thumbnail}/></View>
                <View style={{paddingLeft: 5}}><Text>Profile</Text></View>
                </TouchableOpacity>

              </View>
              </ScrollView>
              <Content style={{marginTop: 20}}>
                <View>
                  <Text style={{fontWeight: 'bold', color: 'black'}}>Fitness Programs</Text>
                </View>
                  <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>

                  <View style={{flexDirection: 'row'}}>
                    {this.state.courseInfo !== null ? (this.state.courseInfo["courses"].map(item =>
                    <View style={{marginTop: 10, marginRight: 10}}>
                       <TouchableOpacity activeOpacity={1} onPress={() => this.props.navigation.navigate('ClientCourseInfo')}>
                       <Card style={{width: 250, height: 150}}>
                        <ImageBackground style={{width: '100%', height: '100%', backgroundColor: "black"}}>
                        </ImageBackground>
                        <View style={{position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center'}}>
                             <Text style={{color: 'white', fontSize: 25, fontWeight: 'bold', marginLeft: 30}}>{item["name"]}</Text>
                           </View>
                       </Card>
                       </TouchableOpacity>
                    </View>)) : null}
                  </View>
                  </ScrollView>
              </Content>

              <Content style={{marginTop: 20}}>
                            <View>
                                <Text style={{fontWeight: 'bold'}}>Workspace</Text>
                            </View>
                            <View style={styles.container}>
                                   <TouchableOpacity activeOpacity={1} onPress={() => this.props.navigation.navigate('Workspace')}>
                                   <Card style={{backgroundColor: '#deb881', justifyContent: 'center', alignItems: 'center'}}>
                                      <CardItem header style={{backgroundColor: '#deb881'}}>
                                            <Icon style={{color: 'white'}} size={50} name="md-bicycle"/>
                                      </CardItem>
                                      <CardItem footer style={{backgroundColor: '#deb881'}}>
                                            <Text style={{fontWeight: 'bold', fontSize: 20 , color: 'white'}}>Get Set Go </Text>
                                            <Icon style={{color: 'white'}}size={30} name="md-arrow-round-forward"/>
                                      </CardItem>
                                   </Card>
                                   </TouchableOpacity>
                            </View>

              </Content>
              <Content>
                <View style={{marginTop: 20}}>
                    <Text style={{fontWeight: 'bold'}}>My Progress</Text>
                </View>
                <View style={{flexDirection: 'row'}}>

                    <View style={{flex: 1, marginTop: 10}}>
                        <TouchableOpacity activeOpacity={1} onPress={() => this.props.navigation.navigate('BodyWeight')}>
                        <Card style={{height: 200, width: '100%'}}>

                                <ImageBackground source={require('./i1.jpg')} style={{width: '100%', height: '100%', opacity: 0.5}}/>
                                    <View style={{position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center'}}>
                                                                                                                              <Text style={{color: 'black', fontSize: 25, fontWeight: 'bold'}}>Body Weight</Text>
                                                                                                                            </View>

                        </Card>
                        </TouchableOpacity>
                    </View>


                    <View style={{flex: 1, marginTop: 10 }}>
                        <TouchableOpacity activeOpacity={1} onPress={() => this.props.navigation.navigate('BodyFat')}>
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
                                           <TouchableOpacity activeOpacity={1} onPress= {() => this.props.navigation.navigate('WorkoutProgress')}>
                                           <Card style={{height: 200, width: '100%'}}>
                                               <ImageBackground  style={{width: '100%', height: '100%', opacity: 0.5, backgroundColor: 'white'}}/>
                                               <View style={{position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center'}}>
                                                  <Text style={{color: 'black', fontSize: 25, fontWeight: 'bold', fontStyle: 'comic'}}>Workout Logs</Text>
                                               </View>
                                           </Card>
                                           </TouchableOpacity>
                                       </View>

              </Content>
              </Content>
            </ScrollView>

          </Container> : <ProfileSkeleton/>}

          </Fragment>
  );
}};

const styles = StyleSheet.create({
  header: {
    backgroundColor: 'black',
    paddingTop: '5%'
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
     marginTop: 20,
     marginRight: 20,
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
    marginTop: 10
  }
});


export default SecondLevelCustomer;