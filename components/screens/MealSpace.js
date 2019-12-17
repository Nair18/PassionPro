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

export default class MealSpace extends Component {
    constructor(props){
        super(props);
        this.state = {
           id: this.props.navigation.state.params.id,
           isVisible: false,
           auth_key: null,
           planDetails: null
        }
    }

    static navigationOptions = {
            title: 'Meal Plans',
            headerTitleStyle: { color: 'black', fontWeight: 'bold'},
            headerStyle: {backgroundColor: '#eadea6'},
            headerTintColor: 'black'
          }

    showModal = (bool) => {
        this.setState({isVisible: bool})
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
            let course_list = fetch(constants.API + 'current/trainer/trainees/'+this.state.id + '/mealplans', {
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
            ).then(res => this.setState({planDetails: res}))
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
        const {planDetails} = this.state
        return(
            <Container style={{backgroundColor: '#efe9cc'}}>
                    <ScrollView showsVerticalScrollIndicator={false}>
                    {this.state.planDetails !== null ? this.state.planDetails.map(planDetails =>
                      <Content style={styles.content}>
                        <View style={{marginLeft: 15, marginRight: 15, marginTop: 10}}>
                           <TouchableOpacity activeOpacity={1} onPress={() => this.props.navigation.navigate('DaywiseMeals',{'plan_id': planDetails["id"], 'trainee_id': this.state.id})}>
                           <Card style={{backgroundColor: "#d7c79e"}}>
                                <CardItem style={{justifyContent: 'space-between', backgroundColor: "#d7c79e"}}>
                                    <Text style={{fontWeight: 'bold'}}>{planDetails["name"]}</Text>
                                    <Icon name="md-arrow-round-forward" size={20}/>
                                </CardItem>
                           </Card>
                           </TouchableOpacity>
                        </View>
                    </Content>)  : <View style={{justifyContent: 'center', alignItems: 'center'}}><Spinner color="black" /></View>}
                    </ScrollView>
                    <View style={styles.addButton}>
                        <Button rounded style={{height: 50, width: 50, alignItems: 'center', backgroundColor: 'black', justifyContent: 'center'}} onPress={() => this.showModal(true)}>
                                <Icon size={30} style={{color: 'white'}}name="md-add" />
                        </Button>
                    </View>
                    <View>
                       <Modal
                            animationType="slide"
                            transparent={false}
                            visible={this.state.isVisible}
                            onRequestClose={() => {
                                 this.showModal(false)
                            }}>
                            <View style={{margin: 15}}>
                               <TouchableOpacity onPress={() => this.showModal(false)}>
                                    <Icon name="md-close" size={30}/>
                               </TouchableOpacity>
                            </View>
                            <Content style={styles.content}>

                               {this.state.planDetails !== null ?
                               (<Form>
                                   <View style={{margin: 15}}>
                                      <Label><Text style={{fontWeight: 'bold'}}>Meal Name</Text><Text style={{color: 'red'}}>*</Text></Label>
                                      <Item regular>
                                          <Input placeholder="eg. Abs workout" onChangeText={(text) => this.setState({name: text})}/>
                                      </Item>
                                   </View>
                                   <Item style={{marginLeft: 15, marginRight: 15, marginTop: 10}}>
                                      <Textarea rowSpan={5} style={{width: '100%'}} bordered placeholder="Workout summary ...(Optional)" onChangeText={text => this.setState({description: text})}/>
                                   </Item>
                                   <View last style={{alignItems: 'center',justifyContent: 'center', marginTop: 15}}>
                                      {this.state.onProcess === false ?
                                        <Button onPress={this.onSubmit} style={{backgroundColor: 'black'}}>
                                            <Text>Add workout plan</Text>
                                        </Button> : <Spinner color="black"/>}
                                   </View>
                               </Form>) : <View style={{justifyContent: 'center', alignItems: 'center'}}><Text>loading ...</Text></View>}

                            </Content>
                       </Modal>
                    </View>
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
  addButton: {
        position: 'absolute',
        right: 30,
        bottom: 30,
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