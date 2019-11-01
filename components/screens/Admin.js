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
import {Container, Accordion,Thumbnail, Card,ListItem, Textarea, CheckBox, CardItem,Tab,Tabs, Header, Title, Content, Button, Left, Body, Text,Right} from 'native-base';


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
      gymId: null
    }
  }
  static navigationOptions = {
    header: null
  }

  showModal = (bool) => {
     this.setState({visible: bool})
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
         (<Container style={{backgroundColor: "white"}}>
                  <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
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
                            <View style={styles.thumbnailBlock}><Thumbnail large source={require('./bank-icon.jpg')}style={styles.thumbnail}/><Text>Courses</Text></View></TouchableOpacity>
                                <TouchableOpacity activeOpacity={1} key={2} onPress={() => this.props.navigation.navigate('Plans', {ID: this.state.gymId})}>
                            <View style={styles.thumbnailBlock}><Thumbnail large source={require('./crisis-plan.jpg')} style={styles.thumbnail}/><Text>Plans</Text></View></TouchableOpacity>
                                <TouchableOpacity activeOpacity={1} key={3} onPress={() => this.props.navigation.navigate('Clients', {ID: this.state.gymId})}>
                            <View style={styles.thumbnailBlock}><Thumbnail source={require('./client.png')}large style={styles.thumbnail}/><Text>Clients</Text></View></TouchableOpacity>
                                <TouchableOpacity activeOpacity={1} key={4} onPress={() => this.props.navigation.navigate('Trainer', {ID: this.state.gymId})}>
                            <View style={styles.thumbnailBlock}><Thumbnail large source={require('./trainer.jpeg')}style={styles.thumbnail}/><Text>Trainers</Text></View></TouchableOpacity>
                                <TouchableOpacity activeOpacity={1} key={5} onPress={() => this.props.navigation.navigate('Request', {ID: this.state.gymId})}>
                            <View style={styles.thumbnailBlock}><Thumbnail source={require('./requests.jpg')} large style={styles.thumbnail}/><Text>Requests</Text></View></TouchableOpacity>
                                <TouchableOpacity activeOpacity={1} key={6} >
                            <View style={styles.thumbnailBlock}><Thumbnail source={require('./profile.jpg')} large style={styles.thumbnail}/><Text>Profile</Text></View></TouchableOpacity>
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
                                                             <Text style={{fontWeight: 'bold'}}><Text style={{fontWeight: 'bold', fontSize: 50}}>{this.state.overview !== null ? this.state.overview["members_in_month"]["count"] : null}</Text>clients</Text>
                                                         </CardItem>
                                                     </Card>
                                                     </TouchableOpacity>
                                                 </View>
                                                 <View style={{flex: 1}}>
                                                     <TouchableOpacity activeOpacity={1}>
                                                     <Card style={{height: 200}}>
                                                        <CardItem>
                                                             <Text>Currently taking personal training</Text>
                                                        </CardItem>
                                                        <CardItem>
                                                             <Text style={{fontWeight: 'bold'}}><Text style={{fontWeight: 'bold', fontSize: 50}}>{this.state.overview !== null ? this.state.overview["all_pt_members"]["count"] : null}</Text>clients</Text>
                                                        </CardItem>
                                                     </Card>
                                                     </TouchableOpacity>
                                                 </View>
                                             </View>
                                             <View style={{flexDirection: 'row'}}>
                                                 <View style={{flex: 1}}>
                                                     <TouchableOpacity activeOpacity={1}>
                                                     <Card style={{height: 200}}>
                                                        <CardItem header>
                                                             <Text>Personal training expires in 1 month for</Text>
                                                        </CardItem>
                                                        <CardItem>
                                                             <Text style={{fontWeight: 'bold'}}><Text style={{fontWeight: 'bold', fontSize: 50}}>{this.state.overview !== null ? this.state.overview["pt_expiring"]["count"] : null}</Text>clients</Text>
                                                        </CardItem>
                                                     </Card>
                                                     </TouchableOpacity>
                                                 </View>
                                                 <View style={{flex: 1}}>
                                                     <TouchableOpacity activeOpacity={1}>
                                                     <Card style={{height: 200}}>
                                                        <CardItem>
                                                             <Text>Gym Membership expires in 1 month for</Text>
                                                        </CardItem>
                                                        <CardItem>
                                                             <Text style={{fontWeight: 'bold'}}><Text style={{fontWeight: 'bold', fontSize: 50}}>{this.state.overview !== null ? this.state.overview["membership_expiring"]["count"] : null }</Text>clients</Text>
                                                        </CardItem>
                                                     </Card>
                                                     </TouchableOpacity>
                                                 </View>
                                             </View>

                                       </View>
                   </View>
                   <View style={{marginTop: 15}}>
                    <Text style={{fontWeight: 'bold'}}>Write up</Text>
                   </View>
                   <View style={{marginTop: 10}}>
                      <Card>
                        <CardItem header>
                            <Textarea rowSpan={5} placeholder="Send notifications to trainers and clients..."/>
                        </CardItem>
                        <CardItem footer style={{justifyContent: 'center', alignItems: 'center'}}>
                            <Button style={{backgroundColor: 'black'}}><Text>Post</Text></Button>
                        </CardItem>
                      </Card>
                    </View>

                   </Content>
                  </ScrollView>
                  <Modal
                            animationType="slide"
                            transparent={false}
                            visible={this.state.visible}
                            onRequestClose={() => {
                              this.showModal(false)
                            }}>
                            <View style={{marginTop: 22}}>
                              <View>
                                <Text>Hello World!</Text>

                                <TouchableHighlight
                                  onPress={() => {
                                    this.showModal(!this.state.visible);
                                  }}>
                                  <Text>Hide Modal</Text>
                                </TouchableHighlight>
                              </View>
                            </View>
                          </Modal>

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
    backgroundColor: "white",
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
    width: 80,
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


