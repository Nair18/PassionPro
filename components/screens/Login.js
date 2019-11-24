import React, {Component, Fragment,PureComponent} from 'react';
import {Picker,View,TouchableOpacity,Dimensions,Alert,ActivityIndicator,StyleSheet,Image, StatusBar, AsyncStorage} from 'react-native';
import {Header,Content,Container, Text,Button, List, ListItem, Input, Spinner}from 'native-base';
import Admin from './Admin';
import constants from '../constants';
import firebase from 'react-native-firebase';

export default class Login extends PureComponent {
    constructor(props){
        super(props);
        this.state = {
            username: '',
            password: '',
            token: null,
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
        StatusBar.setHidden(false);
        this.getToken()
     }

     async getToken() {
         let fcmToken = false
         if (!fcmToken) {
              fcmToken = await firebase.messaging().getToken()
                .then(fcmToken => {
                      // user has a device token
                     this.setState({token: fcmToken})
                    console.log('fcmToken:', fcmToken);
                    AsyncStorage.setItem('fcmToken', fcmToken);
                })
         }
            console.log('fcmToken:', this.state.token);
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
                                      body: JSON.stringify({"username": this.state.username, "password": this.state.password, "device_token": this.state.token}),
                                      headers: new Headers({
                                           'Content-Type': 'application/json'
                                      })
                                   })
        .then((res) =>{
          if(res.status !== 200){
            this.setState({loading: false}, () => console.log("error",res))
            if(res.status === 403){
                Alert.alert(
                  'OOps!',
                  'Your account is not approved ...',
                  [
                     {text: 'OK', onPress: () => console.log('OK Pressed')},
                  ],
                  {cancelable: false},
                );
            }
            else if(res.status === 401){
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
                Alert.alert(
                              'OOps!',
                              'Something went wrong ...',
                              [
                                {text: 'OK', onPress: () => console.log('OK Pressed')},
                              ],
                              {cancelable: false},
                            );
            }
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

