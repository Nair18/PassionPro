import React, {Fragment,Component} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TouchableNativeFeedback,
  StatusBar,
  Modal,
  Picker,
  Alert,
  AsyncStorage,
  TouchableHighlight,
  TextInput,
  View,
} from 'react-native';
import ModalSelector from 'react-native-modal-selector';
import Icon from 'react-native-vector-icons/Ionicons';
import DatePicker from 'react-native-datepicker';
import constants from '../constants';
import moment from 'moment';
import {Container, Accordion,Thumbnail, Card,ListItem, Textarea, Spinner, CheckBox, CardItem, Header, Title, Content, Button, Left, Body, Text,Right, Form, Item, Label, Input} from 'native-base';
const calendarDate = moment()
export default class TraineeSignUp extends Component {
    constructor(props){
        super(props);
        date = new Date();
        this.state = {
            name: null,
            phone: null,
            email: null,
            dob: "1995-01-01",
            onProcess: false,
            start_date: calendarDate.format("YYYY-MM-DD"),
            amount: 0,
            end_date: null,
            address: null,
            gender: "MALE",
            passkey: null,
            emergency_person: null,
            emergency_phone: null,
            relation_with_person: null,
            token: null
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
    componentDidMount(){
        StatusBar.setHidden(false);
        this.getToken()
        console.log("bros in didmount")
    }

    static navigationOptions = {
              title: 'Sign up',
              headerTitleStyle: { color: 'black', fontWeight: 'bold'},
              headerStyle: {backgroundColor: 'white'},
              headerTintColor: 'black'
          }
    onSubmit = () => {
        console.log(this.state)

        if(this.state.name === null || this.state.email === null || this.state.phone == null || this.state.start_date == null || this.state.dob === null || this.state.gender === null || this.state.password === null){
            Alert.alert(constants.incomplete_info, 'All * fields are mandatory')
            return
        }
        this.setState({onProcess: true})
        fetch(constants.API + 'open/gyms/trainees/', {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                  "address": this.state.address,
                  "amount": 0,
                  "device_token": this.state.token,
                  "dob": this.state.dob,
                  "email": this.state.email,
                  "emergency_person": this.state.emergency_person,
                  "emergency_phone": this.state.emergency_phone,
                  "end_date": this.state.start_date,
                  "gender": "MALE",
                  "is_active": true,
                  "name": this.state.name,
                  "passkey": parseInt(this.state.passkey),
                  "password": this.state.password,
                  "phone": this.state.phone,
                  "relation_with_person": this.state.relation_with_person,
                  "start_date": this.state.start_date
            })
        }).then(res => {
           this.setState({onProcess: false})
           if(res.status == 200){
             Alert.alert(constants.success, 'Successfully sent the request to admin for approval')
             this.props.navigation.navigate('RequestProcessingPage')
             return
           }
           else{
            this.setState({onProcess: false})
            Alert.alert(constants.failed, constants.fail_error)
            return
           }
        })
    }

    render(){
        let courseList=[]

        return(
            <Container style={{backgroundColor: 'white'}}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <Content style={{marginLeft: 15, marginRight: 15}}>

                <Form>
                                    <View style={{marginTop: 15}}>
                                       <Label>Passkey<Text style={{color: 'red'}}>*</Text></Label>
                                       <Item regular>
                                          <Input style={{fontWeight: 'bold', fontSize: 15}} onChangeText={text => this.setState({passkey: text})}/>
                                       </Item>
                                    </View>
                                    <View style={{marginTop: 15}}>
                                        <Label>Name<Text style={{color: 'red'}}>*</Text></Label>
                                        <Item regular>
                                            <Input style={{fontWeight: 'bold', fontSize: 15}} onChangeText={text => this.setState({name: text})}/>
                                        </Item>
                                    </View>
                                    <View style={{marginTop: 15}}>
                                        <Label>Phone number<Text style={{color: 'red'}}>*</Text> -</Label>
                                        <Item regular>
                                          <Input keyboardType= 'numeric' style={{fontWeight: 'bold', fontSize: 15}} onChangeText={text => this.setState({phone: text})}/>
                                        </Item>
                                    </View>
                                    <View style={{marginTop: 15}}>
                                        <Label>Password<Text style={{color: 'red'}}>*</Text></Label>
                                        <Item regular >
                                            <Input style={{fontWeight: 'bold', fontSize: 15}} onChangeText={text => this.setState({password: text})}/>
                                        </Item>
                                    </View>
                                    <View style={{marginTop: 15}}>
                                        <Label>Email<Text style={{color: 'red'}}>*</Text></Label>
                                        <Item regular >
                                           <Input style={{fontWeight: 'bold', fontSize: 15}} onChangeText={text => this.setState({email: text})}/>
                                        </Item>
                                    </View>
                                    <View style={{marginTop: 15}}>
                                           <Text>DoB<Text style={{color: 'red'}}>*</Text></Text>
                                                   <DatePicker
                                                        date={this.state.dob}
                                                        onDateChange={date => this.setState({ dob: date })}
                                                        mode = 'date'
                                                        textColor = '#3e4444'
                                                        />
                                    </View>
                                    <View style={{marginTop: 15}}>
                                    <Label>Address</Label>
                                        <Item regular >
                                            <Input style={{fontWeight: 'bold', fontSize: 15}} onChangeText={text => this.setState({address: text})}/>
                                        </Item>
                                    </View>
                                    <View style={{marginTop: 15}}>
                                          <Text>Membership Start Date<Text style={{color: 'red'}}>*</Text></Text>
                                              <DatePicker
                                                 date={this.state.start_date}
                                                 onDateChange={date => this.setState({ start_date: date })}
                                                 mode = 'date'
                                                 textColor = '#3e4444'
                                              />
                                    </View>

                                    <View style={{marginTop: 15}}>
                                        <Label>Gender<Text style={{color: 'red'}}>*</Text></Label>
                                        <Item regular>
                                        <Picker
                                          selectedValue={this.state.gender}
                                          style={{height: 50, width: '100%'}}
                                          onValueChange={(itemValue, itemIndex) =>
                                            this.setState({gender: itemValue})
                                          }>
                                          <Picker.Item label="MALE" value="MALE" />
                                          <Picker.Item label="FEMALE" value="FEMALE" />
                                        </Picker>
                                        </Item>
                                    </View>
                                    <View style={{marginTop: 15}}>
                                        <Label>Emergency contact person</Label>
                                        <Item regular>
                                            <Input style={{fontWeight: 'bold', fontSize: 15}} onChangeText={text => this.setState({emergency_person: text})}/>
                                        </Item>
                                    </View>
                                    <View style={{marginTop: 15}}>
                                        <Label>Emergency contact number</Label>
                                        <Item regular>
                                        <Input style={{fontWeight: 'bold', fontSize: 15}} onChangeText={text => this.setState({emergency_phone: text})}/>
                                    </Item>
                                    </View>
                                    <View style={{marginTop: 15}}>
                                        <Label>Relation with person</Label>
                                        <Item regular>
                                            <Input style={{fontWeight: 'bold', fontSize: 15}} onChangeText={text => this.setState({relation_with_person: text})}/>
                                        </Item>
                                    </View>
                </Form>

                <View style={{ justifyContent: 'center', alignItems: 'center'}}>
                   { this.state.onProcess == false ?
                   <View style={{flex: 1, margin: 25, justifyContent: 'center', alignItems: 'center'}}>
                      <Button style={{backgroundColor: 'black'}} onPress={this.onSubmit}><Text style={{color: 'white'}}>Sign up</Text></Button>
                   </View> : <Spinner color="black"/>}
                </View>

                </Content>
                </ScrollView>
            </Container>
        );
    }
}