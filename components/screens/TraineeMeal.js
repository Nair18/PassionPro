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

export default class TraineeMeal extends Component {
    constructor(props){
        super(props);
        this.state={
            meals: this.props.navigation.state.params.meals,
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

    render(){
        console.log(this.state.details)
        return(
            <Container style={{backgroundColor: constants.screen_color}}>
                <ScrollView showsVerticalScrollIndicator={false}>
                <Content style={{margin: 15}}>
                    {this.state.meals !== null ? this.state.meals.map(meal =>
                    <View style={{marginTop: 5}}>
                       <Card>
                        <CardItem style={{backgroundColor: '#393e46', justifyContent: 'space-between'}}>
                            <Text style={{fontWeight: 'bold', color: 'white'}}>{meal["name"]}</Text>
                        </CardItem>
                        <CardItem>
                            <Text>{meal["description"]}</Text>
                        </CardItem>
                       </Card>
                    </View>) : <View style={{justifyContent: 'center', alignItems: 'center'}}><Spinner color="black"/></View>}
                </Content>
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