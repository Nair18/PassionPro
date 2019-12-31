import React, {Fragment,Component} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  FlatList,
  AsyncStorage,
  Alert,
  Modal,
  View,ImageBackground
} from 'react-native';

import faker from 'faker';
import moment from 'moment';
import Calendar from '../calendar/Calendar';
import Events from '../events/Events';
import type Moment from 'moment';
import Workspace from './workspace';
import Logging from './Logging';
import constants from '../constants';
import Icon from 'react-native-vector-icons/Ionicons';
import {Container, Accordion,Thumbnail, List, Card, Input, Textarea,Label, Form, Item,Spinner, ListItem,CheckBox, CardItem, Header, Title, Content, Button, Left, Body, Text,Right} from 'native-base';

export default class CreateMeal extends Component {
    constructor(props){
        super(props);
        this.state={
            details: this.props.navigation.state.params.details,
            plan_id: this.props.navigation.state.params.plan_id,
            trainee_id: this.props.navigation.state.params.trainee_id,
            day: this.props.navigation.state.params.day,
            isVisible: false,
            auth_key: null,
            onProcess: false
        }
    }
    static navigationOptions = {
          title: 'Meals for the day',
          headerTitleStyle: { color: constants.header_text, fontWeight: 'bold'},
          headerStyle: {backgroundColor: constants.header},
          headerTintColor: constants.header_text
      }

    showModal = (bool) => {
      this.setState({isVisible: bool})
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
//                                            this.fetchDetails()
                                        }
                                   })
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
    onSubmit = () => {
            if(this.state.day === null || this.state.description === null || this.state.name === null){
                Alert.alert(constants.incomplete_info, "All '*' fields are mandatory")
                return
            }
            this.setState({onProcess: true})
            fetch(constants.API + 'current/trainer/trainees/'+this.state.trainee_id + '/mealplans/'+this.state.plan_id+'/days/'+this.state.day, {
                method: 'POST',
                headers: {
                   'Accept': 'application/json',
                   'Content-Type': 'application/json',
                   'Authorization': this.state.auth_key,
                },
                body: JSON.stringify({
                    "description": this.state.description,
                    "name": this.state.name
                })
            }).then(res => {
                this.setState({onProcess: false})
                if(res.status === 200){
                    Alert.alert(constants.success, 'Successfully added the day')
                    this.showModal(false)
                    this.fetchDetails()
                }
                else if(res.status === 401){
                    this.props.navigation.navigate('LandingPage')
                    return
                }
                else{
                    Alert.alert(constants.failed, constants.fail_error)
                    return
                }
            }
            )
    }

    fetchDetails = () => {
                this.setState({loading: true})
                let course_list = fetch(constants.API + 'current/trainer/trainees/'+this.state.trainee_id +"/mealplans/"+this.state.plan_id +'/days/'+ this.state.day, {
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
                ).then(res => this.setState({details: res}))
    }
    _delete = (id) => {
        console.log("id is coming", id)
        this.setState({onProcess: true})
        fetch(constants.API + 'current/trainer/trainees/archive/meal-plan-day-exercise/'+ id, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': this.state.auth_key,
            }
        }).then(res => {
            this.setState({onProcess: false})
            if(res.status === 200){
                Alert.alert(constants.success, 'Successfully deleted the meal')
                this.fetchDetails()
            }
            else if(res.status === 401){
                this.props.navigation.navigate('LandingPage')
            }
            else{
                Alert.alert(constants.failed, constants.fail_error)
            }
        })
    }
    _deletealert = (id) => {
        console.log("id is coming in alert", id)
        Alert.alert(constants.warning, 'Are you sure you want to delete?',
                    [
                        {
                            text: 'Cancel',
                            style: 'cancel',
                        },
                        {text: 'OK', onPress: () => this._delete(id)},
                    ],
                )
    }
    render(){
        console.log(this.state.details)
        return(
            <Container style={{backgroundColor: constants.screen_color}}>
                <ScrollView showsVerticalScrollIndicator={false}>
                <Content style={{margin: 15}}>
                    {this.state.details !== null ? this.state.details.map(meal =>
                    <View style={{marginTop: 5}}>
                       <Card>
                        <CardItem style={{backgroundColor: '#393e46', justifyContent: 'space-between'}}>
                            <Text style={{fontWeight: 'bold', color: 'white'}}>{meal["name"]}</Text>
                            {this.state.onProcess === false ?
                            <Icon name="md-close" style={{color: 'white'}} size={25} onPress={() => this._deletealert(meal["id"])}/> : <Spinner color="black"/>}
                        </CardItem>
                        <CardItem style={{backgroundColor: '#ebe6e6'}}>
                            <Text>{meal["description"]}</Text>
                        </CardItem>
                       </Card>
                    </View>) : <View style={{justifyContent: 'center', alignItems: 'center'}}><Spinner color="black"/></View>}
                </Content>
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

                                                    {this.state.details !== null ?
                                                    (<Form>
                                                       <View style={{margin: 15}}>
                                                       <Label><Text style={{fontWeight: 'bold'}}>Meal Name</Text><Text style={{color: 'red'}}>*</Text></Label>
                                                       <Item regular>
                                                            <Input placeholder="eg. Breakfast" onChangeText={(text) => this.setState({name: text})}/>
                                                       </Item>
                                                       </View>
                                                       <Item style={{marginLeft: 15, marginRight: 15, marginTop: 10}}>
                                                          <Textarea rowSpan={5} style={{width: '100%'}} bordered placeholder="Meal content here ...*" onChangeText={text => this.setState({description: text})}/>
                                                       </Item>
                                                       <View last style={{alignItems: 'center',justifyContent: 'center', marginTop: 15}}>
                                                       {this.state.onProcess === false ?
                                                       <Button onPress={this.onSubmit} style={{backgroundColor: 'black'}}>
                                                         <Text>Add meal</Text>
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