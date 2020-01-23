import React, {Fragment,Component,PureComponent} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TouchableNativeFeedback,
  StatusBar,
  Modal,
  TextInput,
  TouchableHighlight,
  View,
  Linking,
  Alert,
  Dimensions,
  AsyncStorage,
  AppState,
} from 'react-native';
import * as RNLocalize from "react-native-localize";
import constants from '../constants';
import PassKey from './PassKey';
import Overview from './Overview';
import Courses from './Courses';
import Clients from './Clients';
import Plans from './Plans';
import Trainer from './Trainer';
import Request from './Request';
import OfflineNotice from './OfflineNotice';
import ProfileSkeleton from './ProfileSkeleton'
import SkeletonPlaceholder from "react-native-skeleton-placeholder";
import Icon from 'react-native-vector-icons/Ionicons';
import AdminProfile from './AdminProfile';
import AddExercise from './AddExercise';
import FinancialHistory from './FinancialHistory';
import {Container, Badge, Accordion,Thumbnail, Card,ListItem, Form, Label, Spinner,Textarea,Radio, CardItem,Tab,Tabs, Header, Title, Content, Button, Left, Body, Text,Right,CheckBox} from 'native-base';


const { width } = Dimensions.get('window');

export default class Admin extends PureComponent {
  constructor(props){
    super(props)
    this.state = {
      date: new Date(),
      visible: false,
      data: '',
      error: '',
      appState: AppState.currentState,
      items: {},
      gymDetails: null,
      overview: null,
      auth_key: null,
      onProcess: false,
      loading: true,
      loading2: true,
      update_visible: false,
      message: null,
      gymId: null,
      curr: constants.indian_currency,
      checked1: false,
      checked2: false,
      start_month: "JANUARY",
      start_year: (new Date().getFullYear()),
      end_month: "DECEMBER",
      end_year: parseInt(new Date().getFullYear()),
      sub_type: "GYM",
      stats: null,
      role: null,
      sendProcess: false,
    }
  }
  static navigationOptions = {
    header: null
  }

  showModal = () => {
     this.setState({visible: true})
  }
  cancelModal = () => {
    this.setState({visible: false})
  }

  checkBox = (key) => {
    console.log("key is printing", key)
  }

  componentDidMount() {
      console.log("version", constants.version_number)
      const { navigation } = this.props;
      console.log("pagal bana rhe hai")
      this.focusListener = navigation.addListener('didFocus', () => {
        console.log("focusing admin screen")
        this.getUpdateInfo()
        var key  = this.retrieveItem(['key', 'id', 'role']).then(res =>
                      this.setState({auth_key: res}, () => console.log("brother pls", res))
                    ).then(() => {
                        this.fetchDetails()
                    })
      });

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
  async retrieveItem(keys) {
       let auth_key = null
       const retrievedItem =  await AsyncStorage.multiGet(keys);
       retrievedItem.map(m => {
          try {
            if(m[0] === 'key'){
               auth_key = m[1]
            }
            else if(m[0] === 'id' && m[1] !== null && m[1] !== "{}" && m[1] !== "null"){
               this.setState({gymId: parseInt(m[1])}, () => console.log("key set hai boss", m[1]))
            }
            else if(m[0] === 'role' && m[1] !== null){
               this.setState({role: m[1]}, () => console.log("fetched role", m[1]))
            }
            console.log("key retrieved")
          } catch (error) {
            console.log(error.message);
          }
       })
       return auth_key;
  }

  fetchStats = (id) => {
    console.log("came in the stats fetch")
    fetch(constants.API + 'current/admin/gyms/'+ id + '/statistics', {
        method: 'POST',
        headers: {
             'Accept': 'application/json',
             'Content-Type': 'application/json',
             'Authorization': this.state.auth_key,
        },
        body: JSON.stringify({
            "end_month": this.state.end_month,
            "end_year": this.state.end_year,
            "start_month": this.state.start_month,
            "start_year": this.state.start_year
        })
    }).then(res => {
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
        this.setState({stats: res}, () => console.log("stats data dear", res))
    })
  }

  _storeData = async (key,data) => {
          if(data !== null){
              console.log("hitting it hard")
              data = JSON.stringify(data)
              try {
               await AsyncStorage.setItem(key, data);
              } catch (error) {
               console.log("got error while setting", error)
             }
          }
  }

  fetchDetails = () => {
    console.log("Api fetch going to be called")
    this.setState({loading: true})
    console.log("auth key fetched", this.state.auth_key)
    fetch(constants.API + 'current/admin/gyms',{
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
                             this.setState({gymDetails: res, loading: false}, () => {
                                this._storeData("feature", res["data"]["is_full_featured"])
                                this._storeData("trainer", res["data"]["is_personal_trainer"])
                             })
                             return res["data"]["gyms"]
                           }).then( id => {
                                if(id !== null){
                                    id = id[0]["id"]
                                    if(this.state.gymId !== null){
                                        this._storeData("id",this.state.gymId)
                                        this.fetchStats(this.state.gymId)
                                    }
                                    else{
                                        this.setState({gymId: id}, () => {
                                            if(id !== null || id !== undefined){
                                                this._storeData("id",id)
                                                this.fetchStats(id)
                                            }
                                        })
                                    }
                                    fetch(constants.API + 'current/admin/gyms/'+this.state.gymId+'/overview', {
                                        method: 'GET',
                                        headers: {
                                            'Accept': 'application/json',
                                            'Content-Type': 'application/json',
                                            'Authorization': this.state.auth_key,
                                        }
                                    }).then(res => {
                                        if(res.status === 200){
                                            return res.json();
                                        }
                                        else if(res.status === 401){
                                          this.props.navigation.navigate('LandingPage')
                                        }
                                        else{
                                            this.setState({loading2: false})
                                            Alert.alert(
                                              constants.failed,
                                              'Something went wrong.',
                                              [
                                                 {text: 'OK', onPress: () => console.log('OK Pressed')},
                                              ],
                                              {cancelable: false},
                                            );
                                        }
                                    }).then( res => this.setState({overview: res, loading2: false}))
                                }
                           }
                          ).catch((error) => {

                          });

  }
  componentWillUnmount() {
      // Remove the event listener
      this.focusListener.remove();

  }

  checkCheck1 = () => {
    console.log("passed1")
    this.setState({checked1: !this.state.checked1})
  }
  checkCheck2 = () => {
    console.log("passed2")
    this.setState({checked2: !this.state.checked2})
  }

  sendMessage = () => {
    let data = []
    console.log("checked", this.state.checked1, this.state.checked2)
    if(this.state.checked1 || this.state.checked2){
        this.setState({sendProcess: true})
        if(this.state.checked1){
            data.push("TRAINER")
        }
        if(this.state.checked2){
            data.push("TRAINEE")
        }
        fetch(constants.API + 'current/admin/gyms/'+ this.state.gymId + '/notifications/',{
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
                                        if(res.status === 200){
                                            this.setState({sendProcess: false, visible: false})
                                            Alert.alert(constants.success, "Message was successfully delivered.")
                                            this.setState({message: null})
                                        }
                                        else{
                                            Alert.alert(constants.failed, "Something went wrong. Message was not delivered.")
                                            this.setState({sendProcess: false})
                                        }
                                    })
    }
    else{
        Alert.alert('OOps!', 'Please select one option ...')
    }
  }

  takeToAppStore = () => {
    this.setState({update_visible: false, onProcess: false})
    Linking.openURL("https://play.google.com/store/apps/details?id=com.passionpro")
  }

  timeToString = (time) => {
      const date = new Date(time);
      return date.toISOString().split('T')[0];
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

    let gymDetail = []
    if(this.state.gymDetails !== null && this.state.gymId){
        gymDetail = this.state.gymDetails["data"]["gyms"].filter((val) => {
            return val["id"] === this.state.gymId
        })
    }

    stats = null
    if(this.state.stats!== null && this.state.gymDetails !== null && this.state.gymDetails["data"]["is_personal_trainer"] !== true){
        stats = this.state.stats["net"] - (this.state.stats["trainer_salaries"] === null ? 0 : this.state.stats["trainers_salaries"])
    }
    else if(this.state.stats!== null){
        stats = this.state.stats["pt_subs"] === null ? 0 : this.state.stats["pt_subs"]
    }

    return(

      <Fragment>
         <StatusBar backgroundColor="black" barStyle="light-content"/>
         <OfflineNotice/>
         {(this.state.overview === null && this.state.stats === null && this.state.stats === undefined && this.state.gymDetails === null) ? <ProfileSkeleton/> :
         (<Container style={{backgroundColor: '#F4EAE6'}}>
                  <View style={{flexDirection: 'row', justifyContent: 'space-between', elevation: 1, backgroundColor: 'black'}}>
                    <View style={{padding: 15, flex: 2}}>
                        <Text style={{fontWeight: 'bold', color: 'white', fontSize: 20}}>{this.state.gymDetails !== null ? gymDetail[0]["name"] : "Loading ..."}</Text>
                        <Text note>{this.state.gymDetails !== null ? gymDetail[0]["location"] : null}</Text>
                    </View>
                    <View style={{padding:15, justifyContent: 'center', alignItems: 'center'}}>
                        <Badge style={{backgroundColor: constants.card_header}}>
                             <Text style={{color: constants.header}}>Admin</Text>
                        </Badge>
                    </View>
                  </View>
                  <ScrollView showsVerticalScrollIndicator={false}>
                  <Content padder style={{marginLeft: 5}}>
                     {this.state.gymId !== null && this.state.gymDetails !== null ?
                     <View style={{ width: width, height: 85, backgroundColor: "#D5ABB2", borderRadius:10 }}>
                        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>

                            <View style={styles.thumbnailAlign}>
                                <TouchableOpacity activeOpacity={1} key={3} onPress={() => this.props.navigation.navigate('Clients', {ID: this.state.gymId})}>
                            <View style={styles.thumbnailBlock}><Thumbnail source={require('./client.png')} medium style={styles.thumbnail}/><Text style={{fontSize: 15}}>Clients</Text></View></TouchableOpacity>
                                <TouchableOpacity activeOpacity={1} key={4} onPress={() => this.props.navigation.navigate('Trainer', {ID: this.state.gymId})}>
                            <View style={styles.thumbnailBlock}><Thumbnail medium source={require('./trainer.jpeg')}style={styles.thumbnail}/><Text style={{fontSize: 15}}>Trainers</Text></View></TouchableOpacity>
                                <TouchableOpacity activeOpacity={1} key={1} onPress={() => this.props.navigation.navigate('Courses', {ID: this.state.gymId})}>
                            <View style={styles.thumbnailBlock}><Thumbnail medium source={require('./exercise.jpg')}style={styles.thumbnail}/><Text style={{fontSize: 15}}>Packages</Text></View></TouchableOpacity>
                               {this.state.gymDetails["data"]["is_full_featured"] === true ? (<View style={{flexDirection: 'row'}}><TouchableOpacity activeOpacity={1} key={2} onPress={() => this.props.navigation.navigate('Plans', {ID: this.state.gymId})}>
                            <View style={styles.thumbnailBlock}><Thumbnail medium source={require('./crisis-plan.jpg')} style={styles.thumbnail}/><Text style={{fontSize: 15}}>Plans</Text></View></TouchableOpacity>

                                <TouchableOpacity activeOpacity={1} key={5} onPress={() => this.props.navigation.navigate('Request', {ID: this.state.gymId})}>
                            <View style={styles.thumbnailBlock}><Thumbnail source={require('./requests.jpg')} medium style={styles.thumbnail}/><Text style={{fontSize: 15}}>Requests</Text></View></TouchableOpacity>
                               </View>) : null }
                               <TouchableOpacity activeOpacity={1} key={8} onPress={() => this.props.navigation.navigate('AdminProfile',{ID: this.state.gymId, navigation: this.props.navigation})}>
                            <View style={styles.thumbnailBlock}><Thumbnail source={require('./profile.jpg')} medium style={styles.thumbnail}/><Text style={{fontSize: 15}}>Profile</Text></View></TouchableOpacity>
                            </View>
                         </ScrollView>
                      </View> : null }
                  </Content>
                  {this.state.gymId !== null && this.state.stats !== null && this.state.overview !== null?
                   <Content style={{margin: 15}}>
                   <View>
                         <View>
                                             <View style={{flex: 1}}>
                                                <TouchableOpacity activeOpacity={1} onPress={() => this.props.navigation.navigate('StatsPage', {id: this.state.gymId, gym_stats: this.state.stats, curr: this.state.curr})}>
                                                    <Card style={{borderRadius: 10, backgroundColor: constants.card_body, borderColor: constants.admin_tab_active}}>
                                                        <CardItem  style={{justifyContent: 'space-between', backgroundColor: "#f4f4f4", height: 50, borderRadius: 10}}>
                                                            <View>
                                                                <Text style={{ fontSize: 15}}><Text style={{fontWeight: 'bold', color: '#4d80e4', fontSize: 15}}>Total income in </Text><Text style={{fontWeight: 'bold', fontSize: 20, color: '#4d80e4'}}>{new Date().getFullYear()}</Text></Text>
                                                            </View>
                                                        </CardItem>
                                                        <CardItem style={{justifyContent: 'center', alignItems: 'center', backgroundColor: '#ebe6e6'}}>
                                                             {this.state.stats === null  ? <Spinner color="black"/> :
                                                             <Text style={{fontWeight: 'bold', fontSize: 20}}>{this.state.curr}<Text style={{fontSize: 30,color: '#2c7873'}}>{stats}</Text></Text>}
                                                        </CardItem>
                                                        <CardItem footer style={{justifyContent: 'space-between', backgroundColor: "#ebe6e6", elevation: 2, borderRadius: 10}}>
                                                            <View>
                                                                <Text style={{fontWeight: 'bold'}}>Detailed Report </Text>
                                                            </View>
                                                            <View>
                                                               <Icon name="md-arrow-round-forward" size={20}/>
                                                            </View>
                                                        </CardItem>
                                                    </Card>
                                                </TouchableOpacity>
                                             </View>
                                             <View style={{marginTop: 20}}>
                                                <Text style={{fontWeight: 'bold'}}>Client Overview</Text>
                                             </View>
                                             <View style={{flexDirection: 'row', marginTop: 10}}>

                                                <View style={{flex: 1}}>
                                                     <TouchableOpacity activeOpacity={1} onPress={() => this.props.navigation.navigate('QuickClient', {details: this.state.overview["all_pt_members"]["details"], id: this.state.gymId, message: "ACTIVE_PT"})}>
                                                     <Card style={{borderRadius: 10, backgroundColor: constants.card_body, borderColor: constants.admin_tab_active}}>
                                                        <CardItem style={{backgroundColor: "#f4f4f4", height: 70, borderRadius: 10}}>
                                                             <Text style={{fontSize: 15}}><Text style={{fontWeight: 'bold', color: '#4d80e4', fontSize: 15}}>Active </Text><Text style={{fontWeight: 'bold', color: '#4d80e4', fontSize: 15}}>PT Clients</Text></Text>
                                                        </CardItem>
                                                        <CardItem style={{backgroundColor: '#ebe6e6'}}>
                                                             <Text style={{fontWeight: 'bold'}}><Text style={{fontWeight: 'bold', fontSize: 25, color: '#2c7873'}}>{this.state.overview !== null ? this.state.overview["all_pt_members"]["count"] : null} </Text>client(s)</Text>
                                                        </CardItem>
                                                        <CardItem footer style={{justifyContent: 'space-between', backgroundColor: '#ebe6e6', elevation: 2, borderRadius: 10}}>
                                                            <View />
                                                            <View>
                                                               <Icon name="md-arrow-round-forward" size={20}/>
                                                            </View>
                                                        </CardItem>
                                                     </Card>
                                                     </TouchableOpacity>
                                                </View>
                                                <View style={{flex: 1}}>
                                                                                                     <TouchableOpacity activeOpacity={1} onPress={() => this.props.navigation.navigate('QuickClient', {details: this.state.overview["pt_expiring"]["details"], id: this.state.gymId, message: "EXPIRE_PT"})}>
                                                                                                     <Card style={{borderRadius: 10, backgroundColor: constants.card_body, borderColor: constants.admin_tab_active}}>
                                                                                                        <CardItem style={{backgroundColor: "#f4f4f4", height: 70, borderRadius: 10}}>
                                                                                                             <Text><Text style={{fontWeight: 'bold', color: '#4d80e4', fontSize: 15}}>PT</Text> <Text style={{fontWeight: 'bold', color: '#da2d2d', fontSize: 15}}>Expiring</Text></Text>
                                                                                                        </CardItem>
                                                                                                        <CardItem style={{backgroundColor: '#ebe6e6'}}>
                                                                                                             <Text style={{fontWeight: 'bold'}}><Text style={{fontWeight: 'bold', fontSize: 25, color: '#9d0b0b'}}>{this.state.overview !== null ? this.state.overview["pt_expiring"]["count"] : null} </Text>client(s)</Text>
                                                                                                        </CardItem>
                                                                                                        <CardItem footer style={{justifyContent: 'space-between', backgroundColor: '#ebe6e6', elevation: 2, borderRadius: 10}}>
                                                                                                        <View />
                                                                                                        <View>
                                                                                                            <Icon name="md-arrow-round-forward" size={20}/>
                                                                                                        </View>
                                                                                                        </CardItem>
                                                                                                     </Card>
                                                                                                     </TouchableOpacity>
                                                                                                 </View>
                                             </View>
                                             <View style={{flexDirection: 'row'}}>
                                                 {this.state.gymDetails["data"]["is_personal_trainer"] !== true ?
                                                                                                 <View style={{flex: 1}}>
                                                                                                      <TouchableOpacity activeOpacity={1} onPress={() => this.props.navigation.navigate('QuickClient', {details: this.state.overview["members_in_month"]["details"], id: this.state.gymId, message: "NEW_CLIENT"})}>
                                                                                                      <Card style={{borderRadius: 10, backgroundColor: constants.card_body, borderColor: constants.admin_tab_active}}>
                                                                                                          <CardItem header style={{backgroundColor: "#f4f4f4", height: 70, borderRadius: 10}}>
                                                                                                              <Text><Text style={{fontWeight: 'bold', color: '#4d80e4', fontSize: 15}}>New Gym Clients</Text></Text>
                                                                                                          </CardItem>
                                                                                                          <CardItem style={{backgroundColor: "#ebe6e6"}}>
                                                                                                              <Text style={{fontWeight: 'bold'}}><Text style={{fontWeight: 'bold', fontSize: 25, color: '#2c7873'}}>{this.state.overview !== null ? this.state.overview["members_in_month"]["count"] : null} </Text>client(s)</Text>
                                                                                                          </CardItem>
                                                                                                          <CardItem footer style={{justifyContent: 'space-between', backgroundColor: '#ebe6e6', elevation: 2, borderRadius: 10}}>
                                                                                                             <View />
                                                                                                             <View>
                                                                                                                 <Icon name="md-arrow-round-forward" size={20}/>
                                                                                                             </View>
                                                                                                          </CardItem>
                                                                                                      </Card>
                                                                                                      </TouchableOpacity>
                                                                                                 </View>: null}

                                                 <View style={{flex: 1}}>
                                                     {this.state.gymDetails["data"]["is_personal_trainer"] !== true ?
                                                     <TouchableOpacity activeOpacity={1} onPress={() => this.props.navigation.navigate('QuickClient', {details: this.state.overview["membership_expiring"]["details"], id: this.state.gymId, message: "EXPIRE_MEMBER"})}>
                                                     <Card style={{borderRadius: 10, backgroundColor: constants.card_body, borderColor: constants.admin_tab_active}}>
                                                        <CardItem  style={{backgroundColor: "#f4f4f4", height: 70, borderRadius: 10}}>
                                                             <Text><Text style={{fontWeight: 'bold', color: '#4d80e4', fontSize: 15}}>Membership</Text> <Text style={{fontWeight: 'bold', color: '#da2d2d', fontSize: 15}}>Expiring</Text></Text>
                                                        </CardItem>
                                                        <CardItem style={{backgroundColor: '#ebe6e6'}}>
                                                             <Text style={{fontWeight: 'bold'}}><Text style={{fontWeight: 'bold', fontSize: 25, color: '#9d0b0b'}}>{this.state.overview !== null ? this.state.overview["membership_expiring"]["count"] : null } </Text>client(s)</Text>
                                                        </CardItem>
                                                        <CardItem footer style={{justifyContent: 'space-between', backgroundColor: '#ebe6e6', elevation: 2, borderRadius: 10}}>
                                                             <View />
                                                             <View>
                                                                 <Icon name="md-arrow-round-forward" size={20}/>
                                                             </View>
                                                        </CardItem>
                                                     </Card>
                                                     </TouchableOpacity> : null }
                                                 </View>
                                             </View>

                                       </View>
                   </View>
                   {(this.state.gymDetails !== null && this.state.gymDetails["data"]["is_full_featured"] === true) ?
                   <View>
                   <View style={{marginTop: 20}}>
                    <Text style={{fontWeight: 'bold'}}>Write up</Text>
                   </View>

                   <View style={{marginTop: 10}}>
                      <Card style={{borderRadius: 10}}>
                        <CardItem header style={{borderRadius: 10}}>
                            <TextInput multiline = {true} numberOfLines = {2} selectable value={this.state.message} onChangeText={text => this.setState({message: text})} placeholder="Send message to trainers and clients..."/>
                        </CardItem>
                        <CardItem footer style={{justifyContent: 'space-between',alignItems: 'center', elevation: 2, borderColor: constants.card_header, borderRadius: 10}}>
                            <Text/>
                            
                              <Button opacity={this.state.message === null || this.state.message === '' ? 0.3 : 1} disabled={this.state.message === null || this.state.message === ''} style={{backgroundColor: 'black'}} onPress={this.showModal}><Text>Send</Text></Button>
                           
                        </CardItem>
                      </Card>
                    </View></View> : null}
                    <View style={{backgroundColor: 'grey'}}>
                            <Modal
                              animationType="slide"
                              transparent={false}
                              visible={this.state.update_visible}
                            >
                              <View style = {styles.modal}>
                              <Content style={styles.content}>
                                <Card style={{elevation: 0}}>
                                   <CardItem header><Text style={{fontWeight: 'bold'}}>Update Available</Text></CardItem>
                                    <CardItem><Text>Please update to latest version of the app for better experience.</Text></CardItem>
                                   <CardItem footer style={{justifyContent: 'center', alignItems: 'center'}}>
                                   {this.state.onProcess === false ?
                                        <Button onPress={this.takeToAppStore} style={{backgroundColor: constants.green_money}}>
                                            <Text>Update</Text>
                                        </Button> : <Spinner color="black"/>}
                                   </CardItem>
                                </Card>
                              </Content>
                              </View>
                            </Modal>
                          </View>
                    <Modal
                                        animationType = {"fade"}
                                        transparent = {false}

                                        visible = {this.state.visible}
                                        onRequestClose = {() =>{ this.setState({visible: false}) } }>
                                        {/*All views of Modal*/}
                                         <View>
                                            <View style={{margin: 25}}>
                                                <TouchableOpacity activeOpacity={1} onPress={() => {this.setState({visible: false})}}>
                                                    <Icon size={30} name="md-arrow-back"/>
                                                </TouchableOpacity>
                                            </View>
                                            <View style={{margin: 25}}>
                                                <Text style={{fontWeight: 'bold', fontSize: 20}}>Send to ...</Text>
                                            </View>
                                            <View style={{marginTop: '10%', marginLeft: '25%'}}>
                                                    <ScrollView>
                                                              <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                                                                <View style={{flex: 2}}>
                                                                    <Text>All the trainers</Text>
                                                                </View>
                                                                <View style={{flex: 1}}>
                                                                    <CheckBox
                                                                        checked={this.state.checked1}
                                                                        onPress={this.checkCheck1}
                                                                    />
                                                                </View>
                                                              </View>
                                                              <View style={{flexDirection: 'row', justifyContent: 'space-between', marginTop: 10}}>
                                                                <View style={{flex: 2}}>
                                                                    <Text>All the clients</Text>
                                                                </View>
                                                                <View style={{flex: 1}}>
                                                                    <CheckBox
                                                                        checked={this.state.checked2}
                                                                        onPress={this.checkCheck2}
                                                                    />
                                                                </View>
                                                              </View>

                                                    </ScrollView>
                                            </View>
                                            <View style={{marginTop: '10%', marginLeft:'25%', marginRight: '25%', justifyContent: 'center', alignItems: 'center'}}>
                                                  {this.state.sendProcess === false ?
                                                  <Button block style={{backgroundColor: 'black'}} onPress={this.sendMessage}><Text style={{color: "white"}}>Send Message</Text></Button> :
                                                  <Spinner color="black" />}
                                            </View>
                                        </View>
                                      </Modal>
                   </Content> : <View style={{alignItems: 'center'}}><Spinner color="black" /></View> }
                  </ScrollView>

         </Container>)}

      </Fragment>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: 'white',
    paddingTop: 15,
    elevation: 0
  },
  thumbnailAlign:{
    flexDirection: 'row',
    backgroundColor: "#D5ABB2",
    padding: 5,
    borderRadius: 10
  },
  todayPlan: {
    marginTop: 10
  },
  text: {
    fontWeight: 'bold',
    fontSize: 20
  },
  calendar: {
    marginTop: 15
  },
  card: {
    marginTop: 10
  },
  thumbnailBlock: {
    marginRight: 10,
    width: 70,
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
  item: {
      backgroundColor: 'white',
      flex: 1,
      borderRadius: 5,
      padding: 10,
      marginRight: 10,
      marginTop: 17
    },
    emptyDate: {
      height: 15,
      flex:1,
      paddingTop: 30
    },
  modal: {
        backgroundColor : 'white',
        height: '50%' ,
        width: '80%',
        borderRadius:10,
        borderWidth: 1,
        borderColor: '#fff',
        marginTop: 80,
        marginLeft: 40,
        padding: 15
    },
  headerTitle: {
    color: 'black',
    flex: 3,
    fontWeight: 'bold',
    justifyContent: 'center',
    fontSize: 20
  }
});


