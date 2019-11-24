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
  View,

} from 'react-native';
import SharedCalendar from './SharedCalendar'
import Workspace from './workspace';
import Courses from './Courses';
import Clients from './Clients';
import TrainerClient from './TrainerClient';
import Plans from './Plans';
import Trainer from './Trainer';
import {Agenda} from 'react-native-calendars';
import Icon from 'react-native-vector-icons/Ionicons';
import Notification from './Notification';
import TrainerProfile from './TrainerProfile';
import {Container, Accordion,Thumbnail, Item, Textarea, Card, Badge, ListItem,CheckBox, CardItem,Tab,Tabs, Header, Title, Content, Button, Left, Body, Text,Right} from 'native-base';

export default class Admin extends Component {
  constructor(props){
    super(props)
    this.state = {
      date: new Date(),
      visible: false,
      items: {}
    }
  }
  static navigationOptions = {
    header: null
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
        <Container style={{backgroundColor: '#efe9cc'}}>
            <View style={{flexDirection: 'row', justifyContent: 'space-between', backgroundColor: '#eadea6'}}>
                                            <View style={{flex: 2, padding: 15}}>
                                                <Text style={{fontWeight: 'bold', fontSize: 25}}>Fitness Center</Text>
                                                <Text>koramangala</Text>
                                            </View>
                                          </View>
            <ScrollView showsVerticalScrollIndicator={false}>

            <Content style={{margin: 15}}>
                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                    <View style={{flexDirection: 'row'}}>
                        <TouchableOpacity activeOpacity={1} onPress={() => this.props.navigation.navigate('Notification')}>
                            <View style={styles.thumbnailBlock}><Thumbnail medium source={require('./chat.png')}style={styles.thumbnail}/></View>
                            <View style={{justifyContent: 'center', alignItems: 'center'}}>
                                <Text style={{fontSize: 15}}>Notification</Text>
                            </View>
                            </TouchableOpacity>
                        <TouchableOpacity activeOpacity={1} onPress={() => this.props.navigation.navigate('TrainerClient')}>
                            <View style={styles.thumbnailBlock}><Thumbnail medium source={require('./clients2.png')}style={styles.thumbnail}/></View>
                            <View style={{justifyContent: 'center', alignItems: 'center'}}>
                              <Text style={{fontSize: 15}}>Clients</Text>
                            </View>
                            </TouchableOpacity>
                        <TouchableOpacity activeOpacity={1} onPress={() => this.props.navigation.navigate('TrainerProfile')}>
                                                    <View style={styles.thumbnailBlock}><Thumbnail medium source={require('./profile.jpg')}style={styles.thumbnail}/></View>
                        <View style={{justifyContent: 'center', alignItems: 'center'}}>
                          <Text style={{fontSize: 15}}>Profile</Text>
                        </View>
                        </TouchableOpacity>
                    </View>
                </ScrollView>


                <View style={{marginTop: 25}}>
                    <Text style={{fontWeight: 'bold'}}>Daily Writeup</Text>
                </View>
                <View style={{marginTop: 15}}>
                    <Card>
                        <CardItem>
                            <Item>
                                <Textarea rowSpan={5} placeholder="Share your today's thought with your clients"/>
                            </Item>
                        </CardItem>
                        <TouchableOpacity activeOpacity={1}>
                            <CardItem footer style={{justifyContent: 'center', alignItems: 'center'}}>

                                    <Button block style={{backgroundColor: 'black'}}><Text> <Icon size={30} style={{color: 'white'}} name="md-send"/> </Text></Button>

                            </CardItem>
                        </TouchableOpacity>
                    </Card>
                </View>


                <View style={{marginTop: 15}}>
                    <Text style={{fontWeight: 'bold'}}>Activity Calendar</Text>
                </View>
                <View style={{marginTop: 15}}>
                    <TouchableOpacity activeOpacity={1} onPress={() => this.props.navigation.navigate('SharedCalendar')}>
                    <Card>
                        <CardItem style={{justifyContent: 'center', alignItems: 'center'}}>
                            <View>
                                <Icon name="md-calendar" size={50}/>
                            </View>

                        </CardItem>
                        <CardItem style={{justifyContent: 'center', alignItems: 'center'}}>
                            <View>
                               <Text style={{fontWeight: 'bold', fontSize: 25}}>{today.getDayName() + " "+ today.getDate() + " " + today.getShortMonthName()}</Text>
                            </View>
                        </CardItem>
                    </Card>
                    </TouchableOpacity>
                </View>
            </Content>
            </ScrollView>
        </Container>
    );
  }
}

const styles = StyleSheet.create({
thumbnailBlock: {
   marginRight: 10,
           width: 80,
           justifyContent: 'center',
           alignItems: 'center'
  },
})