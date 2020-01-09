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
            username: null,
            password: null,
            token: null,
            auth_key: null,
            loading: false
        }
    }
     static navigationOptions = {
          title: 'Login',
          headerTitleStyle: { color: 'white', fontWeight: 'bold'},
          headerStyle: {backgroundColor: '#393e46'},
          headerTintColor: 'white'
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
        console.log("hitting it hard", data)
        if(key == "role"){
            data = JSON.stringify(data)
        }
        try {
          await AsyncStorage.setItem(key, data);
        } catch (error) {
          console.log("got error while setting", error)
        }
     }

     _storeId = async (key,data) => {
             console.log("hitting it hard")
             if(data.length > 0){
                 data = JSON.stringify(data[0]["id"])
             }
             try {
               await AsyncStorage.setItem(key, data);

             } catch (error) {
               console.log("got error while setting", error)
             }
         return true
     }

     fetchDetails = () => {
        console.log("came in fetching fish")
        fetch(constants.API + 'current/admin/gyms', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': this.state.auth_key,
            }
        }).then(res => {
            this.setState({loading: false})
            if(res.status === 200){
                return res.json()
            }
            else if(res.status === 401){
                this.props.navigation.navigate('LandingPage')
            }
            else{
                Alert.alert(constants.failed, constants.fail_error)
            }
        }).then(res => {
            this._storeId('id', res["data"]["gyms"]).then(() => {
                this.props.navigation.navigate('Home')
            })
        })
        return false
      }
      onSubmit = () => {
        if(this.state.username === null || this.state.password === null || this.state.password.length === 0 || this.state.username.length === 0){
            Alert.alert(constants.warning, 'Username/Password cannot be blank')
            return
        }
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
            console.log("unauthenticated access", res.json().then(res => {
                      Alert.alert(
                              constants.failed,
                              res.message,
                              [
                                {text: 'OK', onPress: () => console.log('OK Pressed')},
                              ],
                              {cancelable: false},
                            );
            }))
            return null
          }
          else{
            return res.json()
          }
          }).then(res => {
                        if(res === null){
                            return
                        }
                        console.log("yeah yaha aa gya bloop bloop", res["access_token"])
                        this._storeData('key',"Bearer " + res["access_token"])
                        this.setState({auth_key: "Bearer " + res["access_token"]}, () => {
                            if(res["roles"] !== null && res["roles"].length === 3 &&
                            (res["roles"].includes("ADMIN") && res["roles"].includes("TRAINER") && res["roles"].includes("OWNER"))){
                                 this._storeData('role', 'OWNERADMINTRAINER')
                                 console.log("came here in OWNERADMINTRAINER")
                                 this.fetchDetails()
                            }
                            else if(res["roles"] !== null && res["roles"].length === 2 && res["roles"].includes("OWNER") && res["roles"].includes("ADMIN")){
                                 this._storeData('role', 'OWNERADMIN')
                                 console.log("came here in OWNERADMIN")
                                 this.fetchDetails()
                            }
                            else if(res["roles"] !== null && res["roles"].length === 2 && res["roles"].includes("ADMIN") && res["roles"].includes("TRAINER")){
                                this._storeData('role', 'ADMINTRAINER')
                                console.log("came here in ADMINTRAINER", this.state.auth_key)
                                this.fetchDetails()
                            }
                            else if(res["roles"] !== null && res["roles"][0] === "OWNER"){
                                this._storeData('role', 'OWNER')
                                console.log("came here in OWNER")
                                this.fetchDetails()
                            }
                            else if(res["roles"] !== null && res["roles"][0] === "ADMIN"){
                                this._storeData('role', 'ADMIN')
                                console.log("came here in ADMIN")
                                this.fetchDetails()
                            }
                            else if(res["roles"] !== null && res["roles"][0] === "TRAINER"){
                                this._storeData('role', 'TRAINER')
                                console.log("came here in TRAINER")
                                this.props.navigation.navigate('TrainerSection')
                                return null
                            }
                            else if(res["roles"] !== null && res["roles"][0] === "TRAINEE"){
                                this._storeData('role', 'CUSTOMER')
                                console.log("came here in CUSTOMER")
                                this.props.navigation.navigate('SecondLevelCustomer')
                                return null
                            }

                        })
                    }).then(role => {
                        if((role === 'OWNERADMINTRAINER') || (role === 'OWNERADMIN') || (role === 'ADMINTRAINER') || (role === 'OWNER') || (role === 'ADMIN')){
                            console.log("going to call fetchdetails")
                            this.fetchDetails()
                        }
                        console.log("call finished")
                    })

      }
    render(){
        return(
        <Container style={{backgroundColor: constants.admin_tab_background}}>
        <Fragment>
            {this.state.loading ?
                                <View style={{justifyContent: 'center', alignItems: 'center', marginTop: '50%'}}>
                                    <Spinner color='black'/>
                                    <View style={{justifyContent:'center', alignItems: 'center'}}>
                                        <Text style={{fontWeight: 'bold'}}>Logging you in ...</Text>
                                    </View>
                                </View> :
                <Content style={{marginTop: 50, margin: 25}}>
                    <View>
                        <View style={{marginTop: 15}}>
                            <Input style={{backgroundColor: 'white', borderRadius: 10}} placeholder="Phone number" keyboardType='numeric' onChangeText={(text) => this.setState({username: text})}
                                                                        value={this.state.username}/>
                        </View>
                        <View style={{marginTop: 15}}>
                            <Input style={{backgroundColor: 'white', borderRadius: 10}} secureTextEntry={true} placeholder="Password" onChangeText={(value) => this.setState({password: value})}/>
                        </View>
                    </View>
                    <View style={{marginTop: 15}}>
                       <Button disabled={this.state.loading} block style={{backgroundColor: 'black', justifyContent: 'center', alignItems: 'center', borderRadius: 10}} onPress={this.onSubmit}>
                           <Text style={{color: 'white'}}>Login</Text>
                       </Button>
                    </View>
                </Content>
            }
         </Fragment>
         </Container>
        );
    }
}

const styles = StyleSheet.create({

  image: {
      width: '20%',
      height: '20%'
    }
});
