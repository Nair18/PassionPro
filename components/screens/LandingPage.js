import React, {Component, Fragment, PureComponent} from 'react';
import {Picker,View,TouchableOpacity,Dimensions,StyleSheet,Image, StatusBar, AsyncStorage, Alert} from 'react-native';
import {Header,Content,Container, Text,Button} from 'native-base';
import StepFormTrainer from './step_form_trainer';
import StepFormCustomer from './step_form_customer';
import Login from './Login';
import constants from '../constants';
import firebase from 'react-native-firebase';

const deviceWidth = Dimensions.get('window').width;


export default class LandingPage extends PureComponent {
   constructor(props){
     super(props)
     this.state = {
       role: '',
       register: false
     }
   }
   static navigationOptions = {
                   //Setting the header of the screen
      header: null
   };

   _validate = () => {
     if(this.state.role !== ''){
       if(this.state.role == 'Trainer'){
            this.props.navigation.navigate('TrainerSignUp')
       }
       else{
            this.props.navigation.navigate('TraineeSignUp')
       }
     }
     else{
       alert("Please select your role")
     }
   }

   _register = () => {
        this.setState({register: !this.state.register})
   }

   async _checkout(){
    const retrievedItem = await AsyncStorage.multiRemove(['key', 'role', 'id']);
   }
   componentDidMount(){
       console.log("calling checkout")
       this._checkout();
       this.checkPermission();
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

   render(){
     console.log("hello logout")
     return(
        <Container style={styles.container}>
            <StatusBar backgroundColor='black' barStyle='light-content' />
            <View style={{width: '100%', justifyContent: 'center', alignItems: 'center'}}>
                <View style={{ height: '70%', width: '70%', borderRadius: 100,padding: '10%', justifyContent: 'center', alignItems: 'center'}}>
                               <Image style={styles.image}  source={require('./ic_launcher_round.png')} resizeMode='contain'/>
                            </View>


               <Text style={{fontWeight: 'bold', fontSize: 25}}>Mygymnasio</Text>
               <Text>v{constants.version_number}</Text>
            </View>
            <Content style={styles.content}>
             <Fragment>

             <View style={{marginLeft: '15%', width: '70%', justifyContent: 'center', alignItems: 'center'}}>
                  {this.state.register ?
                  <Fragment>
                  <Picker
                    selectedValue={this.state.role}
                    style={{height: 50, width: '100%', backgroundColor: "white"}}
                    onValueChange={(itemValue, itemIndex) =>
                        this.setState({role: itemValue})
                    }>
                  <Picker.Item label="Select your role" value={null} />
                  <Picker.Item style={{fontWeight: 'bold'}} label="Customer" value="Trainee" />
                  <Picker.Item style={{fontWeight: 'bold'}} label="Trainer" value="Trainer" />
                </Picker>
                <View style={styles.button}>
                   <View style={{flex: 1}}>
                        <Button block style={{backgroundColor: 'black', borderRadius: 10}} onPress={this._register}><Text>Back</Text></Button>
                   </View>
                   <View style={{flex: 1}}>
                        <Button block style={{backgroundColor: 'black', marginLeft: 10, borderRadius: 10}} onPress={this._validate}><Text>Continue</Text></Button>
                   </View>
                </View></Fragment>:

                <View style={{flexDirection: 'row'}}>
                    <View style={{width: '100%', margin: 10, flex: 1}}>
                        <Button style={{backgroundColor: 'black', width: '100%', justifyContent: 'center', alignItems: 'center', borderRadius: 10}} onPress={() =>
                        this.props.navigation.navigate('Login')}>
                           <Text style={{color: 'white'}}>
                              Login
                           </Text>
                        </Button>
                    </View>
                    <View style={{width: '100%', margin: 10, flex: 1}}>
                        <Button style={{backgroundColor: 'black', width: '100%', justifyContent: 'center', alignItems: 'center', borderRadius: 10}} onPress={this._register}>
                           <Text style={{color: 'white'}}>
                             Sign up
                           </Text>
                        </Button>
                    </View>
                </View>

                }
             </View>
            </Fragment>
            </Content>
        </Container>

     );
   }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 20,
    backgroundColor: constants.admin_tab_background
  },
  image: {
      width: '70%',
      height: '40%'
    },
    content: {
     position: 'absolute',
     top: '50%',
     width: '100%',
     height: 'auto'
    },
    button: {
      flexDirection: 'row',
      marginTop: 10,
      width: '100%',
      alignItems: 'center'
    }
});