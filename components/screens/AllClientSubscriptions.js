import React, {Component, Fragment} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  FlatList,
  View,Modal, Alert,
  Picker,
  Linking,
  TextInput,
  AsyncStorage,
} from 'react-native';
import StandardWorkout from './StandardWorkout';
import ModalSelector from 'react-native-modal-selector';
import constants from '../constants';
import DatePicker from 'react-native-datepicker';
import PersonalizedWorkout from './PersonalizedWorkout';
import moment from 'moment';
import {Card, CardItem, Icon, Accordion, Container,Input, Text,Label,Item, Content, Spinner, List,ListItem, Button} from 'native-base'
let calendarDate = moment()
export default class AllClientSubscriptions extends Component {
  constructor(props){
    super(props)
    this.state = {
          isVisible: false, //state of modal default false
          workoutName: null,
          id: this.props.navigation.state.params.id,
          workoutType: null,
          stats: null,
          auth_key: null,
          workoutSection: null,
          start_date: this.props.navigation.state.params.start_date,
          start_month: "JANUARY",
          end_month: "DECEMBER",
          monthLong: ["JANUARY", "FEBRUARY", "MARCH", "APRIL", "MAY", "JUNE", "JULY", "AUGUST", "SEPTEMBER", "OCTOBER", "NOVEMBER", "DECEMBER"],
          monthShort: ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"],
          end_date: this.props.navigation.state.params.end_date,
          start_year: new Date().getFullYear(),
          show: true,
          end_year: new Date().getFullYear(),
          onLoad: true,
          trainee_id: null,
          trainer_id: null,
          onProcess: true,
          subscriptions: null,
          clients: null,
          data: [{"id": 1,"name": "Standard Workout"}, {"id": 2, "name": "Customize your Workout"}, {"id": 3, "name": "Workout plan by Ajay"}]
      }
  }

  static navigationOptions = {
      //Setting the header of the screen
      title: 'Client search',
      headerStyle: {backgroundColor: constants.header},
      headerTitleStyle: {
          color: constants.header_text,
          fontWeight: 'bold',
          fontSize: 20
        },
      headerTintColor: constants.header_text,
    };

  componentDidMount() {

        const { navigation } = this.props;
        console.log("pagal bana rhe hai")
        this.focusListener = navigation.addListener('didFocus', () => {
          console.log("focusing admin screen")
          var key  = this.retrieveItem('key').then(res =>
                        this.setState({auth_key: res}, () => console.log("brother pls", res))
                      ).then(() => {
                        if(this.state.id !== null){
                          this.fetchSubs()
                          this.fetchClients()
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
  fetchClients = () => {
    fetch(constants.API + 'current/admin/gyms/'+ this.state.id + '/trainees/', {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': this.state.auth_key,
        }
    }).then(res => {
        if(res.status === 200){
            return res.json()
        }
        else if(res.status === 401){
            this.props.navigation.navigate('LandingPage')
        }
        else{
            Alert.alert(constants.failed, constants.fail_error)
        }
    }).then(res => this.setState({clients: res, temp: res}))
  }
  fetchSubs = () => {
       this.setState({onProcess: false})
      fetch(constants.API + 'current/admin/gym/'+ this.state.id + '/subscriptions', {
              method: 'POST',
              headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json',
                  'Authorization': this.state.auth_key,
              },
              body: JSON.stringify({
                  "end_date": this.state.end_date,
                  "start_date": this.state.start_date,
                  "trainee_id": this.state.trainee_id,
                  "trainer_id": this.state.trainer_id,
                  "type": "GYM"
              })
           }).then(res => {
              this.setState({onProcess: true})
              if(res.status === 200){
                  return res.json()
              }
              else if(res.status === 401){
                  this.props.navigation.navigate('LandingPage')
              }
              else{
                  Alert.alert(constants.failed, constants.fail_error)
              }
           }).then(res => this.setState({subscriptions: res}))
  }

  showModal = (bool) => {
    this.setState({isVisible: bool})
  }

  buttonPress = (type) => {
    console.log('Hello friends button daba diya')
    this.props.navigation.navigate(type)
    this.setState({isVisible: false})
  }
  optionChange = () => {
    this.setState({onLoad: false})

  }

  _change = (itemIndex) => {
    console.log("for a change")
    this.setState({start_month: this.state.monthLong[itemIndex].toString(), start_monthName: this.state.monthShort[itemIndex].toString()}, () => console.log(this.state.monthLong[itemIndex], this.state.monthShort[itemIndex]))
  }

  _hideFilter = (bool) => {
    this.setState({show: bool})
  }

  filterSearch = (text) => {
    if(this.state.clients !== null){
        let newData=null
        newData = this.state.clients["trainees"].filter((item)=>{
          text = text.trim()
          const itemData = item["name"].toUpperCase()
          const textData = text.toUpperCase()
          return itemData.indexOf(textData)>-1
        });
        this.setState({
            text: text,
            clients: newData !== null && text !== '' ? {"trainees": newData} : this.state.temp
        })
    }
  }


  selectTrainee = (id) => {
     this.setState({isVisible: false})

     this.setState({trainee_id: id})
  }
  render(){
    const { navigate } = this.props.navigation;
    if(this.state.stats !== null){
        console.log("he is pretending")
    }
    let trainee_subs = []
    searchText = "Search Clients"

    if(this.state.subscriptions !== null && ("subscriptions" in this.state.subscriptions)){

        for(let i=0;i<this.state.subscriptions["subscriptions"].length; i++){

            trainee_subs = this.state.subscriptions["subscriptions"].filter(val => {
                return val.trainer_phone === null
            })

        }
        if(this.state.trainee_id !== null){
            let trainee = this.state.clients["trainees"].filter(temp => {
                return temp["id"] === this.state.trainee_id
            })
            if(trainee.length > 0 ){
                searchText = trainee[0]["name"]
            }
        }

    }
    console.log("clients loading ",this.state.clients)
    year = ["2019", "2020", "2021", "2022", "2023", "2024", "2025"]
    workouts = {1: "StandardWorkout", 2: "PersonalizedWorkout", 3: "StandardWorkout"}
    console.log("hello moto",this.state.start_date, this.state.end_date)
    let start_date = new Date(new Date().getFullYear(), 0, 1).toLocaleDateString().split("/").reverse().join("-")
    let end_date = new Date(new Date().getFullYear(), 11, 31).toLocaleDateString().split("/").reverse().join("-")
    return(
       <Container style={{backgroundColor: constants.screen_color}}>
          <ScrollView showsVerticalScrollIndicator={false}>
          {this.state.start_date !== null && this.state.end_date !== null && this.state.subscriptions !== null && ("subscriptions" in this.state.subscriptions) ? (
          <Content style={styles.content}>
            <Content>
            <View>
                {this.state.show ?
                <View>
                    <Card>
                        <CardItem header style={{justifyContent: 'space-between', backgroundColor: 'black'}}>
                            <Text style={{fontWeight: 'bold', color: 'white'}}>Filter on joining date</Text>
                            <TouchableOpacity onPress={() => this._hideFilter(false)}>
                                <Icon name="md-close" size={10} style={{color: 'white'}}/>
                            </TouchableOpacity>
                        </CardItem>
                        <CardItem style={{backgroundColor: constants.card_body, justifyContent: 'center'}}>
                           <View style={{backgroundColor: constants.card_header, padding: 10}}><Icon name="md-search" size={30} onPress={() => this.showModal(true)}/></View>
                           <View style={{flex: 1, justifyContent: 'center', alignItems: 'flex-start'}}>
                            <Button transparent block style={{backgroundColor: 'white', padding: 10}} onPress={() => this.showModal(true)}><Text note>{searchText}</Text></Button>
                           </View>
                        </CardItem>
                        <CardItem style={{justifyContent: 'space-around', backgroundColor: constants.card_body}}>
                           <Label><Text style={{fontWeight: 'bold'}}>From date</Text></Label>
                           <DatePicker
                                date={this.state.start_date}
                                onDateChange={date => this.setState({ start_date: date })}
                                mode = 'date'
                                textColor = '#3e4444'
                           />
                        </CardItem>
                        <CardItem style={{justifyContent: 'space-around', backgroundColor: constants.card_body}}>
                           <Label><Text style={{fontWeight: 'bold'}}>To date</Text></Label>
                           <DatePicker
                             date={this.state.end_date}
                             onDateChange={date => this.setState({ end_date: date })}
                             mode = 'date'
                             textColor = '#3e4444'
                           />
                        </CardItem>
                        <CardItem footer style={{justifyContent: 'flex-end', backgroundColor: constants.card_body}}>
                            {this.state.onProcess ?
                            <Button style={{backgroundColor: 'black'}} onPress={() => this.fetchSubs("submit")}><Text>Apply</Text></Button> : <Spinner color="black" />}
                        </CardItem>
                    </Card>
                </View> : <View style={{ justifyContent: 'flex-end', alignItems: 'flex-end'}}><Button style={{backgroundColor: 'black'}} onPress={() => this._hideFilter(true)}><Text>Filters</Text></Button></View>}
                {trainee_subs.length > 0 ? trainee_subs.map(subs =>
                <View style={styles.cardListView}>
                     <Card>
                        <CardItem header style={{backgroundColor: constants.card_header, height: 80, justifyContent: 'space-between'}}>
                            <Text style={{fontWeight: 'bold'}}>Bill</Text>
                            <Text style={{fontWeight: 'bold', color: subs["is_active"] ? constants.active_color : constants.archive_color}}>{subs["is_active"] ? "ACTIVE" : "EXPIRED"}</Text>
                        </CardItem>
                        <CardItem style={{backgroundColor: constants.card_body}}>
                            <Text><Text style={{fontWeight: 'bold'}}>Name: </Text>{subs["trainee_name"]}</Text>
                        </CardItem>
                        <CardItem style={{backgroundColor: constants.card_body}}>
                            <Text><Text style={{fontWeight: 'bold'}}>Phone: </Text>{subs["trainee_phone"]}</Text>
                        </CardItem>
                        <CardItem style={{backgroundColor: constants.card_body}}>
                            <Text><Text  style={{fontWeight: 'bold'}}>Amount Paid: </Text>{'₹'}{subs["amount"]}</Text>
                        </CardItem>
                        <CardItem style={{backgroundColor: constants.card_body}}>
                            <Text><Text style={{fontWeight: 'bold'}}>Membership start date: </Text>{subs["start_date"]}</Text>
                        </CardItem>
                        <CardItem style={{backgroundColor: constants.card_body}}>
                            <Text><Text style={{fontWeight: 'bold'}}>Membership end date: </Text>{subs["end_date"]}</Text>
                        </CardItem>
                     </Card>
                </View>) : <Card style={{backgroundColor: constants.header, justifyContent: 'center', alignItems: 'center', padding: 10}}><Text note>Nothing to show</Text></Card>}
            </View>
            </Content>
          </Content>) : <View style={{justifyContent: 'center', alignItems: 'center'}}><Spinner color="black"/></View> }
          </ScrollView>
          <Modal
                     animationType="slide"
                     transparent={false}
                     visible={this.state.isVisible}
                     onRequestClose={() => {
                     this.showModal(false)
                  }}>
                      {this.state.clients !== null ?
                         <View style={{margin: 15}} >
                            <View style={{marginTop: 15}}>
                               <TouchableOpacity onPress={() => {this.setState({isVisible: false})}}>
                                   <Icon size={25} name="md-arrow-back"/>
                               </TouchableOpacity>
                            </View>
                            <View style={{marginTop: 50}}>
                               <View>
                                 <Item regular><Input placeholder="Type clients name here ..." onChangeText={(text) => this.filterSearch(text)}
                                                                                            value={this.state.text}/></Item>
                               </View>
                               <View style={{marginTop: 15}}>
                                 <List>
                                    <ScrollView>
                                      {this.state.clients["trainees"].length > 0 ? this.state.clients["trainees"].map(tr =>
                                      <ListItem onPress={() => this.selectTrainee(tr["id"])} style={{justifyContent: 'space-between'}}>
                                        <View style={{alignItems: 'flex-start'}}>
                                          <View>
                                            <Text style={{color: tr["is_active"] ? constants.active_color : constants.archive_color}}>{tr["name"]}</Text>
                                          </View>
                                          <View>
                                            <Text note>Mobile {tr["phone"]}</Text>
                                          </View>
                                        </View>
                                        <View>
                                            <Icon size={20} name="md-arrow-dropright" />
                                        </View>
                                      </ListItem>) : <View style={{justifyContent: 'center', alignItems: 'center'}}><Text>No clients</Text></View>}
                                    </ScrollView>
                                 </List>
                               </View>
                            </View>
                         </View> : <View style={{justifyContent: 'center', alignItems: 'center'}}><Text>loading ...</Text></View>}
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