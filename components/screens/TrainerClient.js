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
import TrainerWorkspace from './TrainerWorkspace';
import Courses from './Courses';
import Clients from './Clients';
import Plans from './Plans';
import Trainer from './Trainer';
import {Agenda} from 'react-native-calendars';
import Icon from 'react-native-vector-icons/Ionicons';
import {Calendar} from 'react-native-calendars';
import constants from '../constants';
import {Container, Accordion,Thumbnail, Card,List, ListItem,Spinner, Item, CheckBox, CardItem,Tab,Tabs, Header, Title, Content, Button, Left, Body, Text,Right} from 'native-base';

export default class TrainerClient extends Component {
    constructor(props){
        super(props);
        this.state = {
            auth_key: null,
            traineeList: null
        }
    }
    static navigationOptions = {
            title: 'Active Clients',
            headerTitleStyle: { color: 'black', fontWeight: 'bold'},
            headerStyle: {backgroundColor: '#eadea6'},
            headerTintColor: 'black'
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
            let course_list = fetch(constants.API + 'current/trainer/trainees', {
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
            ).then(res => this.setState({traineeList: res["trainees"]}))


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
        return(
            <Container style={{backgroundColor: '#efe9cc'}}>
                <Content>
                    {this.state.traineeList !== null ? this.state.traineeList.map(trainee =>
                    <List>
                       <ListItem avatar onPress={() => this.props.navigation.navigate('TrainerWorkspace', {id: trainee["id"]})}>
                          <Left>
                            <Thumbnail source={require('./profile.jpg' )} />
                          </Left>
                          <Body>
                                    <Text style={{fontWeight: 'bold'}}>{trainee["name"]}</Text>
                                    <Text note>Mobile - {trainee["phone"]}</Text>
                          </Body>

                       </ListItem>
                    </List>) : <View style={{justifyContent: 'center', alignItems: 'center'}}><Spinner color="black" /></View> }
                </Content>
            </Container>
        );

    }
}