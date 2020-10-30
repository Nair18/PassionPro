import React, {Fragment,Component} from 'react';
import Uploader from './Uploader';
import {
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
  TouchableNativeFeedback,
  StatusBar,
  Modal,
  AsyncStorage,
  Alert,
  Linking,
  TouchableHighlight,
  View,

} from 'react-native';
import SharedCalendar from './SharedCalendar'
import Workspace from './workspace';
import Courses from './Courses';
import Clients from './Clients';
import TrainerClient from './TrainerClient';
import OfflineNotice from './OfflineNotice';
import Plans from './Plans';
import Trainer from './Trainer';
import {Agenda} from 'react-native-calendars';
import Icon from 'react-native-vector-icons/Ionicons';
import Notification from './Notification';
import PageLoader from './PageLoader';
import constants from '../constants';
import TrainerProfile from './TrainerProfile';
import {Container, Accordion,Thumbnail, Item, Textarea,Form,Label, Card, Spinner, Badge, ListItem,CheckBox, CardItem,Tab,Tabs, Header, Title, Content, Button, Left, Body, Text,Right} from 'native-base';

export default class Admin extends Component {
  constructor(props){
    super(props)
    this.state = {
      date: new Date(),
      visible: false,
      items: {},
      update_visible: false,
      message: null,
      trainerDetails: null,
      onProcess: false
    }
  }

  static navigationOptions = {
    header: null
  }

  componentDidMount() {

        const { navigation } = this.props;
        console.log("pagal bana rhe hai")
        this.focusListener = navigation.addListener('didFocus', () => {
          console.log("focusing admin screen")
          this.getUpdateInfo()
          var key  = this.retrieveItem(['key', 'id']).then(res =>{
              this.setState({auth_key: res[0]}, () => console.log("brother pls", res))
              return res[1]
          }).then((res) => {
              this.fetchDetails(res)
          })
        });

  }
  async retrieveItem(keys) {
        let auth_key = null
        let id = null
        const retrievedItem =  await AsyncStorage.multiGet(keys);
        retrievedItem.map(m => {
            try {
              if(m[0] === 'key'){
                auth_key = m[1]
              }
              else if(m[0] === 'id'){
                if(m[1] !== null){
                    id = m[1]
                    this._storeData({"id": parseInt(m[1])})
                }
              }
              console.log("key retrieved")
            } catch (error) {
              console.log(error.message);
            }
        })
        return [auth_key, id];
  }

  async getUpdateInfo(){
      console.log("checking for updates")
      fetch(constants.API + 'open/version', {
              method: 'GET'
          }).then((res) => {
             return res.text()
          }).then(data => {
              if(data !== constants.version_number){
                  this.setState({update_visible: true})
              }
          }
          )
  }

  takeToAppStore = () => {
      this.setState({update_visible: false, onProcess: false})
      Linking.openURL("https://play.google.com/store/apps/details?id=com.passionpro.nw")
  }

  _storeData = async (data) => {
          console.log("hitting it hard")
          data = JSON.stringify(data["id"])
          try {
            await AsyncStorage.setItem('gym', data);
          } catch (error) {
            console.log("got error while setting", error)
          }
  }

  fetchDetails = (gym_id) => {
      let gym_id_arg = gym_id
      console.log("Api fetch going to be called", gym_id)
      this.setState({loading: true})
      console.log("auth key fetched", this.state.auth_key)
      fetch(constants.API + 'current/trainer/me',{
                                    method: 'GET',
                                    headers: {
                                      'Accept': 'application/json',
                                      'Content-Type': 'application/json',
                                      'Authorization': this.state.auth_key,
                                    },
                              })
                             .then(response => {
                               if (response.status === 200) {
                                 return response.json();
                               }
                               else if(response.status === 403){
                                 fetch(constants.API + 'current/admin/gyms/'+  gym_id + '/make-me-trainer', {
                                    method: 'PUT',
                                    headers: {
                                       'Accept': 'application/json',
                                       'Content-Type': 'application/json',
                                       'Authorization': this.state.auth_key,
                                    }
                                 }).then(res => {
                                    if(res.status === 200){
                                        console.log("processing")
                                        this.fetchDetails()
                                        return null
                                    }
                                    else {

                                        console.log("hello", res.json().then(res => {Alert.alert(constants.warning,res.message)}))
                                        return null
                                    }
                                 })
                               }
                               else {
                                 this.setState({loading: false})
                                 Alert.alert(
                                   constants.failed,
                                   'Something went wrong',
                                    [
                                        {text: 'OK', onPress: () => console.log('OK Pressed')},
                                    ],
                                    {cancelable: false},
                                 );
                               }
                             }).then(res => {
                               if(res === null){
                                 console.log("yha aaya null ko leke")
                                 this.fetchDetails()
                               }
                               else{
                                    this.setState({trainerDetails: res, loading: false}, () => {
                                        if(gym_id_arg === null && res !== null){
                                            this._storeData(res["gyms"][0])
                                        }
                                    })
                               }

                             })

  }
  sendMessage = () => {
      let data = []
      this.setState({onProcess: true})
          data.push("TRAINEE")
          fetch(constants.API + 'current/trainer/notification',{
                                            method: 'POST',
                                            headers: {
                                              'Accept': 'application/json',
                                              'Content-Type': 'application/json',
                                              'Authorization': this.state.auth_key,
                                            },
                                            body: JSON.stringify({
                                              "message": this.state.message,
                                              "roles": data
                                            })
                                      }).then(res => {
                                          this.setState({onProcess: false})
                                          if(res.status === 200){
                                              Alert.alert(constants.success, "Message was successfully delivered.")
                                              this.setState({message: null})
                                          }
                                          else{
                                              Alert.alert(constants.failed, "Something went wrong. Message was not delivered.")
                                          }
                                      })

    }
  render(){
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
        const {trainerDetails} = this.state
    return(
        <Fragment>
        <StatusBar backgroundColor="black" barStyle="light-content"/>
        <OfflineNotice/>
        {this.state.trainerDetails !== null && this.state.trainerDetails != undefined?
        <Container style={{backgroundColor: constants.screen_color}}>
            <View style={{flexDirection: 'row', justifyContent: 'space-between', backgroundColor: constants.header, elevation: 1}}>
                                                        <View style={{padding: 15}}>
                                                            <Text style={{fontWeight: 'bold', fontSize: 20, color: constants.header_text}}>{trainerDetails["gyms"][0]["name"]}</Text>
                                                            <Text note>{trainerDetails["gyms"][0]["location"]}</Text>
                                                        </View>
                                                        <View style={{justifyContent: 'center', alignItems: 'center', padding: 15}}>
                                                            <Badge style={{backgroundColor: constants.card_header}}>
                                                                <Text style={{color: constants.header}}>Trainer</Text>
                                                            </Badge>
                                                        </View>
                                                      </View>

            <Content>
            <ScrollView showsVerticalScrollBar={false}>

            <Content style={{margin: 15}}>
                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                    <View style={{flexDirection: 'row'}}>
                        <TouchableOpacity activeOpacity={1} onPress={() => this.props.navigation.navigate('TrainerProfile')}>
                          <View style={styles.thumbnailBlock}><Thumbnail medium source={require('./profile.jpg')}style={styles.thumbnail}/></View>
                        <View style={{paddingLeft: 5}}>
                          <Text>Profile</Text>
                        </View>
                        </TouchableOpacity>
                    </View>
                </ScrollView>


                <View style={{marginTop: 25}}>
                    <Text style={{fontWeight: 'bold'}}>Writeup</Text>
                </View>
                <View style={{marginTop: 15}}>
                   <Card style={{borderRadius: 10}}>
                      <CardItem header style={{borderRadius: 10}}>
                         <TextInput multiline = {true} numberOfLines = {2} value = {this.state.message} selectable onChangeText={text => this.setState({message: text})} placeholder="Write message to your clients..."/>
                      </CardItem>
                      <CardItem footer style={{justifyContent: 'space-between', elevation: 3, borderRadius: 10}}>
                         <Text/>
                         {this.state.onProcess === false ?
                            <Button opacity={this.state.message === null || this.state.message === '' ? 0.3 : 1} disabled={this.state.message === null || this.state.message === ''} style={{backgroundColor: 'black'}} onPress={this.sendMessage}><Text>Post</Text></Button>
                            : <Spinner color="black" />}

                      </CardItem>
                   </Card>
                </View>


                <View style={{marginTop: 15}}>
                    <Text style={{fontWeight: 'bold'}}>Client Section</Text>
                </View>
                <View style={{marginTop: 15}}>
                    <TouchableOpacity activeOpacity={1} onPress={() => this.props.navigation.navigate('TrainerClient')}>
                    <Card style={{justifyContent: 'center', alignItems: 'center', backgroundColor: "#393e46", borderRadius: 10}}>
                        <CardItem style={{height: 60, width: 60, justifyContent: 'center', alignItems: 'center', borderRadius: 30, backgroundColor: "#ffd369", marginTop: 5}}>
                            <Icon name="md-person" size={30}/>
                        </CardItem>
                        <CardItem style={{justifyContent: 'center', alignItems: 'center', backgroundColor: '#393e46', borderRadius: 10}}>
                            <View style={{justifyContent: 'center', alignItems: 'center', flexDirection: 'row'}}>
                                <Text style={{fontWeight: "bold", fontSize: 20, color: 'white'}}>Active Clients </Text>
                                <Icon name="md-arrow-round-forward" size={20} style={{color: 'white'}}/>
                            </View>
                        </CardItem>
                    </Card>
                    </TouchableOpacity>
                </View>
            </Content>
            </ScrollView>
            </Content>
        </Container>: <PageLoader/>}
        <View>
                                                                <Modal
                                                                  animationType="slide"
                                                                  transparent={true}
                                                                  visible={this.state.update_visible}
                                                                >
                                                                  <View style = {styles.modal}>
                                                                  <Content style={styles.content}>
                                                                    <Form>
                                                                       <View style={{marginTop: 20}}>
                                                                       <Label><Text style={{fontWeight: 'bold'}}>Update Available</Text></Label>
                                                                        <View style={{paddingTop: 20}}><Text>Please update to latest version of the app for better experience.</Text></View>
                                                                       </View>
                                                                       <View last style={{alignItems: 'center',justifyContent: 'center', marginTop: 25}}>
                                                                       {this.state.onProcess === false ?
                                                                       <Button block onPress={this.takeToAppStore} style={{backgroundColor: constants.green_money}}>
                                                                         <Text>Update</Text>
                                                                       </Button> : <Spinner color="black"/>}
                                                                       </View>
                                                                    </Form>
                                                                  </Content>
                                                                  </View>
                                                                </Modal>
                                                              </View>

        </Fragment>
    );
  }
}

const styles = StyleSheet.create({
thumbnailBlock: {
   width: 80,

  },
  modal: {
          backgroundColor : constants.card_header,
          height: 250 ,
          width: '80%',
          borderRadius:10,
          borderWidth: 1,
          borderColor: '#fff',
          marginTop: 80,
          marginLeft: 40,
          padding: 15
      }
})