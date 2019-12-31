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
  AsyncStorage,
  View,
  Linking
} from 'react-native';
import Hyperlink from 'react-native-hyperlink'
import {Agenda} from 'react-native-calendars';
import Icon from 'react-native-vector-icons/Ionicons';
import {Container, Accordion,Thumbnail, Card,ListItem,CheckBox, CardItem,Tab,Tabs, Header, Title, Content, Button, Left, Body, Text,Right} from 'native-base';
import type {Notification} from 'react-native-firebase';
import firebase from 'react-native-firebase';
import constants from '../constants';
export default class CustomerNotification extends Component {
    static navigationOptions = {
          title: 'Notifications',
          headerTitleStyle: { color: constants.header_text, fontWeight: 'bold'},
          headerStyle: {backgroundColor: constants.header},
          headerTintColor: constants.header_text
      }


    async componentDidMount() {
             StatusBar.setHidden(false);
             this.checkPermission();
             this.createNotificationListeners();
    }

    componentWillUnmount() {

             //this.removeNotificationListener();

    }

           //1
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
             const channelId = new firebase.notifications.Android.Channel("Default", "Default", firebase.notifications.Android.Importance.High);
                 firebase.notifications().android.createChannel(channelId);

             this.notificationListener = firebase.notifications().onNotification((notification) => {
                                const { title, body } = notification;
                                console.log('onNotification:', notification);

                                const localNotification = new firebase.notifications.Notification({
                                    sound: 'default',
                                    show_in_foreground: true,
                                  })
                                  .setSound('default')
                                  .setNotificationId(notification.notificationId)
                                  .setTitle(notification.title)
                                  .setBody(notification.body)
                                  .android.setSmallIcon('ic_launcher')
                                  .android.setChannelId(channelId) // e.g. the id you chose above
                                  .android.setPriority(firebase.notifications.Android.Priority.High)
                                  .android.setVibrate(1000);
                                  firebase.notifications()
                                    .displayNotification(localNotification)
                                    .catch(err => console.error(err));
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

    render(){
        return(
            <Container style={{padding: 15, backgroundColor: constants.screen_color}}>
                <ScrollView>
                <Content>
                    <View>
                        <Card>
                            <CardItem header>
                                <Text style={{fontWeight: 'bold'}}>Promotional Post</Text>
                            </CardItem>
                            <CardItem>
                                <Hyperlink linkStyle={ { color: '#2980b9'} } linkDefault={true}>
                                    <Text selectable style={ { fontSize: 15 } }>
                                      This Valentine’s Day, get them something they’ll love from our weekly ad: https://docs.aws.amazon.com/rekognition/latest/dg/rekognition-dg.pdf
                                    </Text>
                                  </Hyperlink>
                            </CardItem>
                            <CardItem >

                            </CardItem>
                        </Card>
                    </View>
                </Content>
                </ScrollView>
            </Container>
        );
    }
}