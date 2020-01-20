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
            headerTitleStyle: { color: constants.header_text, fontWeight: 'bold'},
            headerStyle: {backgroundColor: constants.header},
            headerTintColor: constants.header_text
          }

    componentDidMount(){
            console.log("id has been retrieved", this.state.id)

            const { navigation } = this.props;
            console.log("pagal bana rhe hai")
//            this.focusListener = navigation.addListener('didFocus', () => {
                    console.log("The screen is focused")
                    var key  = this.retrieveItem('key').then(res =>
                               this.setState({auth_key: res}, () => console.log("brother pls", res))
                               ).then(() => {
                                    if(this.state.auth_key !== null){
                                        this.fetchDetails()
                                    }
                               })
//            });
        }

    componentWillUnmount() {
              // Remove the event listener
//              this.focusListener.remove();

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
            <Container style={{backgroundColor: constants.screen_color}}>
                <Content>
                    <List style={{margin: 10}}>
                    {this.state.traineeList !== null ? this.state.traineeList.map(trainee =>
                       <TouchableOpacity onPress={() => this.props.navigation.navigate('TrainerWorkspace', {id: trainee["id"]})}>
                       <Card style={styles.items}>
                          <View style={{flex: 1, padding: 5}}>
                            <Thumbnail source={require('./profile.jpg' )} />
                          </View>
                          <View style={{flex: 4, padding: 5}}>
                                    <Text style={{fontWeight: 'bold'}}>{trainee["name"]}</Text>
                                    <Text note>Mobile - {trainee["phone"]}</Text>
                          </View>

                       </Card></TouchableOpacity>) : <View style={{justifyContent: 'center', alignItems: 'center'}}><Spinner color="black" /></View> }
                    </List>
                </Content>
            </Container>
        );

    }
}

const styles = StyleSheet.create({
  addButton: {
    position: 'absolute',
    right: 30,
    bottom: 30,
  },
  items: {
    elevation: 2,
    padding: 10,
    backgroundColor: constants.card_header,
    marginTop: 2,
    marginLeft: 15,
    marginRight: 15,
    justifyContent: 'space-around',
    flexDirection: 'row',
    borderRadius: 10
    },
  item: {
    margin: 15
  }
});