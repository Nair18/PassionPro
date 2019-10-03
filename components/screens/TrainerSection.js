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
import SLCProfile from './second_level_customer_profile';
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
        <Container>
            <ScrollView showsVerticalScrollIndicator={false}>
            <View style={{padding: 15}}>
                <Text style={{fontWeight: 'bold', color: 'black', fontSize: 20}}>Fitness center, koramangala</Text>
            </View>
            <Content style={{margin: 15}}>
                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                    <View style={{flexDirection: 'row'}}>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('Notification')}>
                            <View style={styles.thumbnailBlock}><Icon size={50} name="md-notifications-outline"/></View></TouchableOpacity>
                        <TouchableOpacity  onPress={() => this.props.navigation.navigate('TrainerClient')}>
                            <View style={styles.thumbnailBlock}><Icon size={50} name="md-people"></Icon></View></TouchableOpacity>
                        <TouchableOpacity  onPress={() => this.props.navigation.navigate('SLCProfile')}>
                                                    <View style={styles.thumbnailBlock}><Icon size={50} name="md-person"></Icon></View></TouchableOpacity>
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
                        <TouchableOpacity>
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
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('SharedCalendar')}>
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
    width: 90,
    height: 90,
    borderRadius: 50,
    backgroundColor: 'grey',
    justifyContent: 'center',
    alignItems: 'center'
  },
})