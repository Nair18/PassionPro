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
  AsyncStorage,
  Alert,
  TouchableHighlight,
  View,

} from 'react-native';
import SharedCalendar from './SharedCalendar'
import Workspace from './workspace';
import Courses from './Courses';
import Clients from './Clients';
import TrainerClient from './TrainerClient';
import Plans from './Plans';
import Trainer from './Trainer';
import {Agenda} from 'react-native-calendars';
import Icon from 'react-native-vector-icons/Ionicons';
import Notification from './Notification';
import PageLoader from './PageLoader';
import constants from '../constants';
import TrainerProfile from './TrainerProfile';
import {Container, Accordion,Thumbnail, Item, Textarea, Card, Badge, ListItem,CheckBox, CardItem,Tab,Tabs, Header, Title, Content, Button, Left, Body, Text,Right} from 'native-base';

export default class Admin extends Component {
  constructor(props){
    super(props)
    this.state = {
      date: new Date(),
      visible: false,
      items: {},
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
                               } else {
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
                               this.setState({trainerDetails: res, loading: false}, () => {
                                   if(gym_id_arg === null && res !== null){
                                     this._storeData(res["gyms"][0])
                                   }
                               })

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
        <Container style={{backgroundColor: constants.screen_color}}>
            {this.state.trainerDetails !== null ?
            <Content>
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
            <ScrollView showsVerticalScrollIndicator={false}>

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
                    <Text style={{fontWeight: 'bold'}}>Daily Writeup</Text>
                </View>
                <View style={{marginTop: 15}}>
                   <Card>
                      <CardItem header>
                         <Textarea selectable onChangeText={text => this.setState({message: text})} placeholder="Write message to your clients..."/>
                      </CardItem>
                      <CardItem footer style={{justifyContent: 'center', alignItems: 'center', backgroundColor:'#e5dfdf'}}>
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
                    <Card style={{justifyContent: 'center', alignItems: 'center', backgroundColor: "#393e46"}}>
                        <CardItem style={{height: 60, width: 60, justifyContent: 'center', alignItems: 'center', borderRadius: 30, backgroundColor: "#ffd369", marginTop: 5}}>
                            <Icon name="md-person" size={30}/>
                        </CardItem>
                        <CardItem style={{justifyContent: 'center', alignItems: 'center', backgroundColor: '#393e46'}}>
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
            </Content> : <PageLoader/>}
        </Container>
    );
  }
}

const styles = StyleSheet.create({
thumbnailBlock: {
   width: 80,

  },
})