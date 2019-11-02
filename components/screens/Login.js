import React, {Component, Fragment,PureComponent} from 'react';
import {Picker,View,TouchableOpacity,Dimensions,Alert,ActivityIndicator,StyleSheet,Image, StatusBar, AsyncStorage} from 'react-native';
import {Header,Content,Container, Text,Button, List, ListItem, Input, Spinner}from 'native-base';
import Admin from './Admin';
import constants from '../constants';
import firebase, {Notification} from 'react-native-firebase';

export default class Login extends PureComponent {
    constructor(props){
        super(props);
        this.state = {
            username: '',
            password: '',
            loading: false
        }
    }
     static navigationOptions = {
          title: 'Login',
          headerTitleStyle: { color: 'black', fontWeight: 'bold'},
          headerStyle: {backgroundColor: 'white', elevation: 0},
          headerTintColor: 'black'
      }

     async componentDidMount() {
         this.checkPermission();

         this.removeNotificationListener = firebase.notifications().onNotification((notification: Notification) => {
                 // Process your notification as required
                 console.log('hello baby', Notification)
             });
       }

       componentWillUnmount() {

         this.removeNotificationListener();

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
           fcmToken = await firebase.messaging().getToken();
           if (fcmToken) {
             // user has a device token
             console.log('fcmToken:', fcmToken);
             await AsyncStorage.setItem('fcmToken', fcmToken);
           }
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
         this.notificationListener = firebase.notifications().onNotification((notification) => {
           const { title, body } = notification;
           console.log('onNotification:');

             const localNotification = new firebase.notifications.Notification({
               sound: 'sampleaudio',
               show_in_foreground: true,
             })
             .setSound('sampleaudio.wav')
             .setNotificationId(notification.notificationId)
             .setTitle(notification.title)
             .setBody(notification.body)
             .android.setChannelId('fcm_FirebaseNotifiction_default_channel') // e.g. the id you chose above
             .android.setSmallIcon('@drawable/ic_launcher') // create this icon in Android Studio
             .android.setColor('#000000') // you can set a color here
             .android.setPriority(firebase.notifications.Android.Priority.High);

             firebase.notifications()
               .displayNotification(localNotification)
               .catch(err => console.error(err));
         });

         const channel = new firebase.notifications.Android.Channel('fcm_FirebaseNotifiction_default_channel', 'Demo app name', firebase.notifications.Android.Importance.High)
           .setDescription('Demo app description')
           .setSound('sampleaudio.wav');
         firebase.notifications().android.createChannel(channel);

         /*
         * If your app is in background, you can listen for when a notification is clicked / tapped / opened as follows:
         * */
         this.notificationOpenedListener = firebase.notifications().onNotificationOpened((notificationOpen) => {
           const { title, body } = notificationOpen.notification;
           console.log('onNotificationOpened:');
           Alert.alert(title, body)
         });

         /*
         * If your app is closed, you can check if it was opened by a notification being clicked / tapped / opened as follows:
         * */
         const notificationOpen = await firebase.notifications().getInitialNotification();
         if (notificationOpen) {
           const { title, body } = notificationOpen.notification;
           console.log('getInitialNotification:');
           Alert.alert(title, body)
         }
         /*
         * Triggered for data only payload in foreground
         * */
         this.messageListener = firebase.messaging().onMessage((message) => {
           //process data message
           console.log("JSON.stringify:", JSON.stringify(message));
         });
       }

      _storeData = async (key,data) => {
        console.log("hitting it hard")
        try {
          await AsyncStorage.setItem(key, data);
        } catch (error) {
          console.log("got error while setting", error)
        }

      }

      onSubmit = () => {
        console.log("came in submit")
        this.setState({loading: true})
        fetch(constants.API + "open/auth/signin",{
                                      method: 'POST',
                                      body: JSON.stringify({"username": this.state.username, "password": this.state.password}),
                                      headers: new Headers({
                                           'Content-Type': 'application/json'
                                      })
                                   })
        .then((res) =>{
          if(res.status !== 200){
            this.setState({loading: false})
            Alert.alert(
              'OOps!',
              'Wrong Username/Password',
              [
                {text: 'OK', onPress: () => console.log('OK Pressed')},
              ],
              {cancelable: false},
            );
          }
          else{
            res.json()
            .catch(error => console.log("Error",error))
                    .then(res => {
                        console.log("yeah yaha aa gya bloop bloop", res["accessToken"])
                        this._storeData('key',"Bearer " + res["accessToken"])

                        this.setState({loading: false}, () => {
                            if(res["roles"] !== null && res["roles"].length === 2){
                                this._storeData('role', 'Admin2')
                                console.log("came here in admin2")
                                this.props.navigation.navigate('Admin')
                            }
                            else if(res["roles"] !== null && res["roles"][0] === "ADMIN"){
                                this._storeData('role', 'Admin')
                                console.log("came here in admin")
                                this.props.navigation.navigate('Admin')
                            }
                            else if(res["roles"] !== null && res["roles"][0] === "TRAINER"){
                                this._storeData('role', 'Trainer')
                                console.log("came here in trainer")
                                this.props.navigation.navigate('TrainerSection')
                            }
                            else if(res["roles"] !== null && res["roles"][0] === "TRAINEE"){
                                this._storeData('role', 'Customer')
                                console.log("came here in trainee")
                                this.props.navigation.navigate('SecondLevelCustomer')
                            }

                        })
                    })
          }
          })

      }
    render(){
        return(
        <Fragment>
            {this.state.loading ?
                                <View style={{justifyContent: 'center', alignItems: 'center', marginTop: '50%'}}>
                                    <Spinner color='black'/>
                                    <View style={{justifyContent:'center', alignItems: 'center'}}>
                                        <Text style={{fontWeight: 'bold'}}>Checking your credibility ...</Text>
                                    </View>
                                </View> :
            <Container>
                <Content style={{marginTop: '10%', marginLeft: '10%', marginRight: '10%'}}>

                    <List>
                        <ListItem>
                            <Input placeholder="Phone number" keyboardType='numeric' onChangeText={(text) => this.setState({username: text})}
                                                                        value={this.state.username}/>
                        </ListItem>
                        <ListItem>
                            <Input secureTextEntry={true} placeholder="Password" onChangeText={(value) => this.setState({password: value})}/>
                        </ListItem>
                    </List>
                    <View style={{justifyContent: 'center', alignItems: 'center', width: '70%', margin: '15%'}}>
                        <Button disabled={this.state.loading} block style={{backgroundColor: 'black', justifyContent: 'center', alignItems: 'center'}} onPress={this.onSubmit}>
                            <Text style={{color: 'white'}}>Login</Text>
                        </Button>
                    </View>

                </Content>
            </Container>}
         </Fragment>
        );
    }
}

