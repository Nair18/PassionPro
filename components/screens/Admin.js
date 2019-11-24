import React, {Fragment,Component,PureComponent} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TouchableNativeFeedback,
  StatusBar,
  Modal,
  TouchableHighlight,
  View,
  Alert,
  AsyncStorage,

  AppState,
} from 'react-native';
import constants from '../constants';
import PassKey from './PassKey';
import Overview from './Overview';
import Courses from './Courses';
import Clients from './Clients';
import Plans from './Plans';
import Trainer from './Trainer';
import Request from './Request';
import ProfileSkeleton from './ProfileSkeleton'
import SkeletonPlaceholder from "react-native-skeleton-placeholder";
import Icon from 'react-native-vector-icons/Ionicons';
import AdminProfile from './AdminProfile';
import {Container, Accordion,Thumbnail, Card,ListItem, Spinner,Textarea,Radio, CardItem,Tab,Tabs, Header, Title, Content, Button, Left, Body, Text,Right,CheckBox} from 'native-base';


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
      loading: true,
      loading2: true,
      message: null,
      gymId: null,
      checked1: false,
      checked2: false,
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

      const { navigation } = this.props;
      console.log("pagal bana rhe hai")
      this.focusListener = navigation.addListener('didFocus', () => {
        console.log("focusing admin screen")
        var key  = this.retrieveItem('key').then(res =>
                      this.setState({auth_key: res}, () => console.log("brother pls", res))
                    ).then(() => this.fetchDetails())
      });

  }
  async retrieveItem(key) {
          try {
            const retrievedItem =  await AsyncStorage.getItem(key);
            console.log("key retrieved")
            return retrievedItem;
          } catch (error) {
            console.log(error.message);
          }
          return;
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
                                 'OOps!',
                                 'Something went wrong ...',
                                  [
                                      {text: 'OK', onPress: () => console.log('OK Pressed')},
                                  ],
                                  {cancelable: false},
                               );
                             }
                           }).then(res => {
                             this.setState({gymDetails: res, loading: false})
                             return res["data"]["gyms"]
                           }).then( id => {
                                if(id !== null){
                                    id = id[0]["id"]
                                    this.setState({gymId: id})
                                    fetch(constants.API + 'current/admin/gyms/'+id+'/overview', {
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
                                        else{
                                            this.setState({loading2: false})
                                            Alert.alert(
                                            'OOps!',
                                            'Something went wrong ...',
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
                                            Alert.alert("Success", "Message was successfully delivered ...")
                                        }
                                        else{
                                            Alert.alert("OOps!!", "Something went wrong. Message was not delivered ...")
                                            this.setState({sendProcess: false})
                                        }
                                    })
    }
    else{
        Alert.alert('OOps!', 'Please select one option ...')
    }
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
    return(
      <Fragment>
         {(this.state.overview === null) ? <ProfileSkeleton/> :
         (<Container style={{backgroundColor: '#efe9cc'}}>
                  <View style={{flexDirection: 'row', justifyContent: 'space-between', elevation: 1, backgroundColor: '#eadea6'}}>
                    <View style={{flex: 2, padding: 15}}>
                        <Text style={{fontWeight: 'bold', fontSize: 25}}>{this.state.gymDetails !== null ? this.state.gymDetails["data"]["gyms"][0]["name"] : "Loading ..."}</Text>
                        <Text>koramangala</Text>
                    </View>
                  </View>
                  <ScrollView showsVerticalScrollIndicator={false}>
                  <Content padder style={styles.contentBlock}>
                     <View>
                        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                            <View style={styles.thumbnailAlign}>
                                <TouchableOpacity activeOpacity={1} key={1} onPress={() => this.props.navigation.navigate('Courses', {ID: this.state.gymId})}>
                            <View style={styles.thumbnailBlock}><Thumbnail medium source={require('./bank-icon.jpg')}style={styles.thumbnail}/><Text style={{fontSize: 15}}>Courses</Text></View></TouchableOpacity>
                                <TouchableOpacity activeOpacity={1} key={2} onPress={() => this.props.navigation.navigate('Plans', {ID: this.state.gymId})}>
                            <View style={styles.thumbnailBlock}><Thumbnail medium source={require('./crisis-plan.jpg')} style={styles.thumbnail}/><Text style={{fontSize: 15}}>Plans</Text></View></TouchableOpacity>
                                <TouchableOpacity activeOpacity={1} key={3} onPress={() => this.props.navigation.navigate('Clients', {ID: this.state.gymId})}>
                            <View style={styles.thumbnailBlock}><Thumbnail source={require('./client.png')} medium style={styles.thumbnail}/><Text style={{fontSize: 15}}>Clients</Text></View></TouchableOpacity>
                                <TouchableOpacity activeOpacity={1} key={4} onPress={() => this.props.navigation.navigate('Trainer', {ID: this.state.gymId})}>
                            <View style={styles.thumbnailBlock}><Thumbnail medium source={require('./trainer.jpeg')}style={styles.thumbnail}/><Text style={{fontSize: 15}}>Trainers</Text></View></TouchableOpacity>
                                <TouchableOpacity activeOpacity={1} key={5} onPress={() => this.props.navigation.navigate('Request', {ID: this.state.gymId})}>
                            <View style={styles.thumbnailBlock}><Thumbnail source={require('./requests.jpg')} medium style={styles.thumbnail}/><Text style={{fontSize: 15}}>Requests</Text></View></TouchableOpacity>
                                <TouchableOpacity activeOpacity={1} key={6} onPress={() => this.props.navigation.navigate('AdminProfile')}>
                            <View style={styles.thumbnailBlock}><Thumbnail source={require('./profile.jpg')} medium style={styles.thumbnail}/><Text style={{fontSize: 15}}>Profile</Text></View></TouchableOpacity>
                            </View>
                         </ScrollView>
                      </View>
                  </Content>
                   <Content style={{margin: 15}}>
                   <View>
                        <View>
                            <Text style={{fontWeight: 'bold'}}>Overview</Text>
                        </View>
                         <View style={{marginTop: 10}}>
                                             <View style={{flexDirection: 'row'}}>
                                                 <View style={{flex: 1}}>
                                                     <TouchableOpacity activeOpacity={1} onPress={() => this.props.navigation.navigate('QuickClient', {DETAILS: this.state.overview["members_in_month"]["details"]})}>
                                                     <Card style={{height: 200}}>
                                                         <CardItem header>
                                                             <Text>New members in last 1 month</Text>
                                                         </CardItem>
                                                         <CardItem>
                                                             <Text style={{fontWeight: 'bold'}}><Text style={{fontWeight: 'bold', fontSize: 50}}>{this.state.overview !== null ? this.state.overview["members_in_month"]["count"] : null}</Text>client(s)</Text>
                                                         </CardItem>
                                                     </Card>
                                                     </TouchableOpacity>
                                                 </View>
                                                 <View style={{flex: 1}}>
                                                     <TouchableOpacity activeOpacity={1} onPress={() => this.props.navigation.navigate('QuickClient', {DETAILS: this.state.overview["members_in_month"]["details"]})}>
                                                     <Card style={{height: 200}}>
                                                        <CardItem>
                                                             <Text>Currently taking personal training</Text>
                                                        </CardItem>
                                                        <CardItem>
                                                             <Text style={{fontWeight: 'bold'}}><Text style={{fontWeight: 'bold', fontSize: 50}}>{this.state.overview !== null ? this.state.overview["all_pt_members"]["count"] : null}</Text>client(s)</Text>
                                                        </CardItem>
                                                     </Card>
                                                     </TouchableOpacity>
                                                 </View>
                                             </View>
                                             <View style={{flexDirection: 'row'}}>
                                                 <View style={{flex: 1}}>
                                                     <TouchableOpacity activeOpacity={1} onPress={() => this.props.navigation.navigate('QuickClient', {DETAILS: this.state.overview["members_in_month"]["details"]})}>
                                                     <Card style={{height: 200}}>
                                                        <CardItem header>
                                                             <Text>Personal training expires in 1 month for</Text>
                                                        </CardItem>
                                                        <CardItem>
                                                             <Text style={{fontWeight: 'bold'}}><Text style={{fontWeight: 'bold', fontSize: 50}}>{this.state.overview !== null ? this.state.overview["pt_expiring"]["count"] : null}</Text>client(s)</Text>
                                                        </CardItem>
                                                     </Card>
                                                     </TouchableOpacity>
                                                 </View>
                                                 <View style={{flex: 1}}>
                                                     <TouchableOpacity activeOpacity={1} onPress={() => this.props.navigation.navigate('QuickClient', {DETAILS: this.state.overview["members_in_month"]["details"]})}>
                                                     <Card style={{height: 200}}>
                                                        <CardItem>
                                                             <Text>Gym Membership expires in 1 month for</Text>
                                                        </CardItem>
                                                        <CardItem>
                                                             <Text style={{fontWeight: 'bold'}}><Text style={{fontWeight: 'bold', fontSize: 50}}>{this.state.overview !== null ? this.state.overview["membership_expiring"]["count"] : null }</Text>client(s)</Text>
                                                        </CardItem>
                                                     </Card>
                                                     </TouchableOpacity>
                                                 </View>
                                             </View>

                                       </View>
                   </View>
                   <View style={{marginTop: 25}}>
                    <Text style={{fontWeight: 'bold'}}>Write up</Text>
                   </View>
                   <View style={{marginTop: 10}}>
                      <Card>
                        <CardItem header>
                            <Textarea selectable rowSpan={5} onChangeText={text => this.setState({message: text})} placeholder="Send notifications to trainers and clients..."/>
                        </CardItem>
                        <CardItem footer style={{justifyContent: 'center', alignItems: 'center'}}>
                            <Button opacity={this.state.message === null || this.state.message === '' ? 0.3 : 1} disabled={this.state.message === null || this.state.message === ''} style={{backgroundColor: 'black'}} onPress={this.showModal}><Text>Post</Text></Button>
                        </CardItem>
                      </Card>
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
                   </Content>
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
    backgroundColor: "#deb881",
    padding: 5,
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
  headerTitle: {
    color: 'black',
    flex: 3,
    fontWeight: 'bold',
    justifyContent: 'center',
    fontSize: 20
  }
});


