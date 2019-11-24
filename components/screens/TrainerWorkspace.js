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
import {Calendar} from 'react-native-calendars';

import {Container, Accordion,Thumbnail, Card,List, ListItem, Item, CheckBox, CardItem,Tab,Tabs, Header, Title, Content, Button, Left, Body, Text,Right} from 'native-base';


const randomColor = () => {
  var RandomNumber = Math.floor(Math.random() * data.length) ;
  return data[RandomNumber].value;
}

const randomStyle = () => {
 return { flex: 1,
      height: 100,
      width: '100%',
      backgroundColor: randomColor(),
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
    static navigationOptions = {
            title: 'Workspace',
            headerTitleStyle: { color: 'black', fontWeight: 'bold'},
            headerStyle: {backgroundColor: '#eadea6'},
            headerTintColor: 'black'
          }
    state = {
          isVisible: false, //state of modal default false
    }
    showModal = () => {
        this.setState({isVisible: true})
      }

    buttonPress = (type) => {
        console.log('Hello friends button daba diya')
        this.props.navigation.navigate(type)
        this.setState({isVisible: false})
    }

    render(){

        return(
            <Container style={{backgroundColor: '#efe9cc'}}>
                    <ScrollView showsVerticalScrollIndicator={false}>
                      <Content style={styles.content}>
                        <View style={{margin: 15}}>
                                                <Card>
                                                    <CardItem header style={{backgroundColor: '#d7c79e'}}>
                                                        <Text style={{fontWeight: 'bold', fontSize: 20}}>Client Summary</Text>
                                                    </CardItem>
                                                    <CardItem style={{backgroundColor: "#e5d8bf"}}>
                                                        <Text><Text style={{fontWeight: 'bold'}}>Name:</Text> Trainee Sharma</Text>
                                                    </CardItem>
                                                    <CardItem style={{backgroundColor: "#e5d8bf"}}>
                                                        <Text><Text style={{fontWeight: 'bold'}}>Gender:</Text> Male</Text>
                                                    </CardItem>
                                                    <CardItem style={{backgroundColor: "#e5d8bf"}}>
                                                        <Text><Text style={{fontWeight: 'bold'}}>Medical Issues:</Text> Leg injury</Text>
                                                    </CardItem>
                                                    <CardItem style={{backgroundColor: "#e5d8bf"}}>
                                                        <Text><Text style={{fontWeight: 'bold'}}>Goal:</Text> fit body in 6 months</Text>
                                                    </CardItem>
                                                    <CardItem style={{backgroundColor: "#e5d8bf"}}>
                                                        <Text><Text style={{fontWeight: 'bold'}}>PT start date:</Text> 2019-09-01</Text>
                                                    </CardItem>
                                                    <CardItem style={{backgroundColor: "#e5d8bf"}}>
                                                        <Text><Text style={{fontWeight: 'bold'}}>PT end date:</Text> 2019-12-01</Text>
                                                    </CardItem>
                                                </Card>
                                            </View>

                        <View style={{marginTop:10}}>
                            <View style={{flexDirection: 'row'}}>
                                <View style={{flex: 2}}>
                                    <Text style={{fontWeight: 'bold', fontSize: 20}}>Full week chart 🔥</Text>
                                    <Text note>Last updated 2019-09-01</Text>
                                </View>
                                <View style={{flex: 1}}>
                                    <Button style={{backgroundColor: 'black', justifyContent: 'center', alignItems: 'center'}}><Text>Activity</Text></Button>
                                </View>
                            </View>

                        </View>
                        <View>
                           {data.map(item =>
                               <View style={styles.cardListView}>
                                 <TouchableOpacity activeOpacity={0.8} onPress={this.showModal}>
                                   <Card style={randomStyle()}>
                                      <Text style={styles.cardText}>{item.key}</Text>
                                   </Card>
                                 </TouchableOpacity>
                               </View>
                           )}
                        </View>
                     </Content>
                     </ScrollView>
                     <Modal
                                         animationType = {"fade"}
                                         transparent = {false}

                                         visible = {this.state.isVisible}
                                         onRequestClose = {() =>{ this.setState({isVisible: false}) } }>
                                         {/*All views of Modal*/}
                                          <View>
                                             <View style={{margin: 25}}>
                                                 <TouchableOpacity onPress={() => {this.setState({isVisible: false})}}>
                                                     <Icon size={25} name="md-arrow-back"/>
                                                 </TouchableOpacity>
                                             </View>
                                             <View style={{marginTop: 50}}>
                                                 <View style={{ marginLeft: 15}}>
                                                    <Text style={{fontWeight: 'bold', fontSize: 20}}>Choose one...</Text>
                                                 </View>
                                                 <View>
                                                    <ScrollView>
                                                      <List>
                                                         <ListItem button onPress={() => this.buttonPress('TrainerWorkout')}>
                                                             <Text style = {styles.text}>Workout Plan by PT1</Text>
                                                         </ListItem>
                                                         <ListItem button onPress={() => this.buttonPress('TrainerMeal')}>
                                                             <Text style = {styles.text}>Meal Plan by PT1</Text>
                                                         </ListItem>
                                                      </List>
                                                    </ScrollView>
                                                 </View>
                                             </View>
                                         </View>
                                       </Modal>
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
    backgroundColor: randomColor(),
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