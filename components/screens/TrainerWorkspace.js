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
  Linking,
  View,
} from 'react-native';
import Workspace from './workspace';
import Courses from './Courses';
import Clients from './Clients';
import Plans from './Plans';

import Trainer from './Trainer';
import TrainerWorkout from './TrainerWorkout';
import {Agenda} from 'react-native-calendars';
import Icon from 'react-native-vector-icons/Ionicons';
import constants from '../constants';
import {Calendar} from 'react-native-calendars';

import {Container, Accordion,Thumbnail, Card,List, ListItem, Item, Spinner,CheckBox, CardItem,Tab,Tabs, Header, Title, Content, Button, Left, Body, Text,Right} from 'native-base';


const randomStyle = () => {
 return { flex: 1,
      height: 100,
      width: '100%',

      justifyContent: 'center',
      alignItems: 'center'
     }
}


const data = [ {key: "#MotivationalMonday", value: "#e37070"},
                             {key: "#TransformationTuesday", value: '#c7004c'},
                             {key: "#WorkoutWednesday", value: "#8f1537"},
                             {key: "#ThursdayThrust", value: "#cc6a87"},
                             {key: "#FitnessFriday", value: "#b5525c"},
                             {key: "#SaturdaySweat", value: "#d35656"},
                             {key: "#SundaySweat", value: "#8d448b"}
                           ]


export default class TrainerWorkspace extends Component {
    constructor(props){
        super(props);
        this.state = {
           id: this.props.navigation.state.params.id,
           isVisible: false,
           auth_key: null,
           traineeDetails: null
        }
    }

    static navigationOptions = {
            title: 'Client Space',
            headerTitleStyle: { color: constants.header_text, fontWeight: 'bold'},
            headerStyle: {backgroundColor: constants.header},
            headerTintColor: constants.header_text
          }

    showModal = () => {
        this.setState({isVisible: true})
      }

    buttonPress = (type) => {
        console.log('Hello friends button daba diya')
        this.props.navigation.navigate(type)
        this.setState({isVisible: false})
    }

    componentDidMount(){
            console.log("id has been retrieved", this.state.id)

            const { navigation } = this.props;
            console.log("pagal bana rhe hai")
            this.focusListener = navigation.addListener('didFocus', () => {
                    console.log("The screen is focused")
                    var key  = this.retrieveItem('key').then(res =>
                               this.setState({auth_key: res}, () => console.log("brother pls", res))
                               ).then(() => {
                                    if(this.state.auth_key !== null){
                                        this.fetchDetails()
                                    }
                               })
            });
        }

    componentWillUnmount() {
              // Remove the event listener
              this.focusListener.remove();

          }
    fetchDetails = () => {
            this.setState({loading: true})
            let course_list = fetch(constants.API + 'current/trainer/trainees/'+this.state.id, {
                method: 'GET',
                headers: {
                                'Accept': 'application/json',
                                'Content-Type': 'application/json',
                                'Authorization': this.state.auth_key,
                            }
            })
            .then(
                res => {
                    if(res.status === 200){
                        return res.json()
                    }
                    else{
                        this.setState({loading: false})
                                                       Alert.alert(
                                                          constants.failed,
                                                          constants.fail_error,
                                                          [
                                                              {text: 'OK', onPress: () => console.log('OK Pressed')},
                                                          ],
                                                          {cancelable: false},
                                                       );
                    }
                }
            ).then(res => this.setState({traineeDetails: res}))
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


    render(){
        const {traineeDetails} = this.state
        if(traineeDetails !== null && traineeDetails["course_subscriptions"].length>0){
            active = traineeDetails["course_subscriptions"].filter((v) => {
                return v["is_active"] === true
            })
        }

        return(
            <Container style={{backgroundColor: constants.screen_color}}>
                    <ScrollView showsVerticalScrollIndicator={false}>
                    {this.state.traineeDetails !== null && active.length > 0 ?
                      <Content style={styles.content}>
                        <View style={{margin: 15}}>
                                                <Card style={{backgroundColor: constants.card_body, borderRadius: 10}}>
                                                    <CardItem header style={{backgroundColor: constants.card_header, borderRadius: 10}}>
                                                        <Text style={{fontWeight: 'bold', fontSize: 15}}>Client Summary</Text>
                                                    </CardItem>
                                                    <CardItem style={{backgroundColor: constants.card_body}}>
                                                        <Text><Text style={{fontWeight: 'bold'}}>Name:</Text> {traineeDetails["name"]}</Text>
                                                    </CardItem>
                                                    <CardItem style={{backgroundColor: constants.card_body}}>
                                                        <Text><Text style={{fontWeight: 'bold'}}>Phone:</Text> {traineeDetails["mobile"]}</Text>
                                                    </CardItem>
                                                    <CardItem style={{backgroundColor: constants.card_body}}>
                                                        <Text><Text style={{fontWeight: 'bold'}}>Gender:</Text> {traineeDetails["gender"]}</Text>
                                                    </CardItem>
                                                    <CardItem style={{backgroundColor: constants.card_body}}>
                                                        <Text><Text style={{fontWeight: 'bold'}}>PT start date:</Text> {active[0]["start_date"] !== null ? active[0]["start_date"].split("T")[0] : "NA"}</Text>
                                                    </CardItem>
                                                    <CardItem style={{backgroundColor: constants.card_body, borderRadius: 10}}>
                                                        <Text><Text style={{fontWeight: 'bold'}}>PT end date:</Text> {active[0]["end_date"] !== null ? active[0]["end_date"].split("T")[0] : "NA"}</Text>
                                                    </CardItem>
                                                </Card>
                                            </View>

                        <View style={{margin:15}}>
                            <View style={{flexDirection: 'row'}}>
                                <View style={{flex: 2}}>
                                    <Text style={{fontWeight: 'bold', fontSize: 20}}>Workspace</Text>
                                </View>
                            </View>
                        </View>

                        <View style={{marginLeft: 15, marginRight: 15}}>
                           <TouchableOpacity activeOpacity={1} onPress={() => this.props.navigation.navigate('MealSpace', {"id": this.state.id})}>
                           <Card style={{backgroundColor: constants.item_card, borderRadius: 10}}>
                            <CardItem style={{justifyContent: 'space-between', backgroundColor: constants.item_card, borderRadius: 10}}>
                                <Text style={{fontWeight: 'bold'}}>Meal Plan</Text>
                                <Icon size={20} name="md-arrow-dropright"/>
                            </CardItem>
                           </Card>
                           </TouchableOpacity>
                        </View>
                        <View style={{marginTop: 10, marginLeft: 15, marginRight: 15}}>
                           <TouchableOpacity activeOpacity={1} onPress={() => this.props.navigation.navigate('WorkoutSpace', {"id": this.state.id})}>
                              <Card style={{backgroundColor: constants.item_card, borderRadius: 10}}>
                                <CardItem style={{justifyContent: 'space-between', backgroundColor: constants.item_card, borderRadius: 10}}>
                                  <Text style={{fontWeight: 'bold'}}>Workout Plan</Text>
                                  <Icon size={20} name="md-arrow-dropright"/>
                                </CardItem>
                              </Card>
                           </TouchableOpacity>
                        </View>

                     </Content> : <View style={{justifyContent: 'center', alignItems: 'center'}}><Spinner color="black" /></View>}
                     </ScrollView>

            </Container>
        );
    }
}

const styles = StyleSheet.create({
  cardListView: {
    marginTop: 15
  },
  cardView: {
    flex: 1,
    height: 100,
    width: '100%',

    justifyContent: 'center',
    alignItems: 'center'
  },
  content: {
    margin: 15
  },
  cardText: {
    fontWeight: 'bold',
    fontSize: 20,
     color: 'white'
  },
  modal: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor : "#00BCD4",
    height: 300 ,
    width: '80%',
    borderRadius:10,
    borderWidth: 1,
    borderColor: '#fff',
    marginTop: 80,
    marginLeft: 40,

     },
      text: {
           color: '#3f2949',
           marginTop: 10
        }
})