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
import Workspace from './workspace';
import Courses from './Courses';
import Clients from './Clients';
import Plans from './Plans';
import Trainer from './Trainer';
import {Agenda} from 'react-native-calendars';
import Icon from 'react-native-vector-icons/Ionicons';
import {Container, Accordion,Thumbnail, Card,ListItem,CheckBox, CardItem,Tab,Tabs, Header, Title, Content, Button, Left, Body, Text,Right} from 'native-base';

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

  showModal = (bool) => {
     this.setState({visible: bool})
  }
    loadItems = (day) => {
      setTimeout(() => {
        for (let i = -15; i < 85; i++) {
          const time = day.timestamp + i * 24 * 60 * 60 * 1000;
          const strTime = this.timeToString(time);
          if (!this.state.items[strTime]) {
            this.state.items[strTime] = [];
            const numItems = Math.floor(Math.random() * 5);
            for (let j = 0; j < numItems; j++) {
              this.state.items[strTime].push({
                name: 'Item for ' + strTime,
                height: Math.max(50, Math.floor(Math.random() * 150))
              });
            }
          }
        }
        //console.log(this.state.items);
        const newItems = {};
        Object.keys(this.state.items).forEach(key => {newItems[key] = this.state.items[key];});
        this.setState({
          items: newItems
        });
      }, 1000);
      // console.log(`Load Items for ${day.year}-${day.month}`);
    }

    renderItem = (item) => {
      return (
        <View style={[styles.item, {height: item.height}]}><Text>{item.name}</Text></View>
      );
    }

    renderEmptyDate = () => {
      return (
        <View style={styles.emptyDate}><Text>This is empty date!</Text><Button><Text>Create</Text></Button></View>
      );
    }

    rowHasChanged = (r1, r2) => {
      return r1.name !== r2.name;
    }

    timeToString = (time) => {
      const date = new Date(time);
      return date.toISOString().split('T')[0];
    }
  render(){
    return(
      <Fragment>
         <Container style={{backgroundColor: "white"}}>

                  <Header noLeft style={styles.header} androidStatusBarColor='#000' iosBarStyle={"light-content"}>
                    <Body>
                      <Title style={styles.headerTitle}>Fitness Center, koramangala</Title>
                    </Body>
                  </Header>
                  <ScrollView showsVerticalScrollIndicator={false}>
                  <Content padder style={styles.contentBlock}>
                    <View>
                    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                    <View style={styles.thumbnailAlign}>
                    <TouchableOpacity key={1} onPress={() => this.props.navigation.navigate('Courses')}>
                    <View style={styles.thumbnailBlock}><Thumbnail large source={require('./bank-icon.jpg')}style={styles.thumbnail}/><Text>Courses</Text></View></TouchableOpacity>
                    <TouchableOpacity key={2} onPress={() => this.props.navigation.navigate('Plans')}>
                    <View style={styles.thumbnailBlock}><Thumbnail large source={require('./crisis-plan.jpg')} style={styles.thumbnail}/><Text>Plans</Text></View></TouchableOpacity>
                    <TouchableOpacity key={3} onPress={() => this.props.navigation.navigate('Clients')}>
                    <View style={styles.thumbnailBlock}><Thumbnail source={require('./client.png')}large style={styles.thumbnail}/><Text>Clients</Text></View></TouchableOpacity>
                    <TouchableOpacity key={4} onPress={() => this.props.navigation.navigate('Trainer')}>
                    <View style={styles.thumbnailBlock}><Thumbnail large source={require('./trainer.jpeg')}style={styles.thumbnail}/><Text>Trainers</Text></View></TouchableOpacity>
                    <TouchableOpacity key={5} onPress={() => this.props.navigation.navigate('Uploader')}>
                    <View style={styles.thumbnailBlock}><Thumbnail source={require('./requests.jpg')} large style={styles.thumbnail}/><Text>Requests</Text></View></TouchableOpacity>
                    <TouchableOpacity key={6}>
                    <View style={styles.thumbnailBlock}><Thumbnail source={require('./profile.jpg')} large style={styles.thumbnail}/><Text>Profile</Text></View></TouchableOpacity>
                    <TouchableOpacity key={7}>
                    <View style={styles.thumbnailBlock}><Thumbnail source={require('./qr.jpg')} large style={styles.thumbnail}/><Text>Scan</Text></View></TouchableOpacity>
                    </View>
                    </ScrollView>
                    </View>
                  </Content>
                  <Content >
                  <View style={{margin: 15}}>
                    <Tabs>
                      <Tab heading="Updates" activeTabStyle={{backgroundColor: '#3e4444'}} tabStyle={{backgroundColor: '#3e4444'}}>
                         <Content style={styles.card}>
                         <Card>
                           <CardItem header>
                             <Text>Updates</Text>
                           </CardItem>
                           <CardItem footer>
                             <Text>Footer</Text>
                           </CardItem>
                         </Card>
                         </Content>
                      </Tab>
                      <Tab heading="Overview" activeTabStyle={{backgroundColor: '#3e4444'}} tabStyle={{backgroundColor: '#3e4444'}}>
                         <Content style={styles.card}>
                         <Card style={styles.card}>
                           <CardItem header>
                             <Text>Overview</Text>
                           </CardItem>
                           <CardItem footer>
                             <Text>Footer</Text>
                           </CardItem>
                         </Card>
                         </Content>
                      </Tab>
                    </Tabs>
                   </View>
                   </Content>
                   <Content>
                   <View style={{justifyContent: 'center', alignItems: 'center'}}>
                    <Text style={{fontWeight: 'bold'}}>Calender</Text>
                   </View>
                   <View style={styles.calendar}>
                    <Agenda
                            items={this.state.items}
                            loadItemsForMonth={this.loadItems}
                            selected={'2017-05-16'}
                            renderItem={this.renderItem}
                            renderEmptyDate={this.renderEmptyDate}
                            rowHasChanged={this.rowHasChanged}
                            pastScrollRange={50}
                            futureScrollRange={50}
//                             markingType={'period'}
//                             markedDates={{
//                                '2017-05-08': {textColor: '#666'},
//                                '2017-05-09': {textColor: '#666'},
//                                '2017-05-14': {startingDay: true, endingDay: true, color: 'blue'},
//                                '2017-05-21': {startingDay: true, color: 'blue'},
//                                '2017-05-22': {endingDay: true, color: 'gray'},
//                                '2017-05-24': {startingDay: true, color: 'gray'},
//                                '2017-05-25': {color: 'gray'},
//                                '2017-05-26': {endingDay: true, color: 'gray'}}}
//                              monthFormat={'yyyy'}
//                              theme={{calendarBackground: '#eca1a6', agendaKnobColor: 'green'}}
//                            renderDay={(day, item) => (<Text>{day ? day.day: 'item'}</Text>)}

                          />
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

         </Container>
      </Fragment>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: 'black',
    paddingTop: 15
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
    color: 'white',
    flex: 3,
    justifyContent: 'center',
    fontSize: 20
  }
});


