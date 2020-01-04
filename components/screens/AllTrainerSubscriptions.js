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
export default class AllTrainerSubscriptions extends Component {
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
          trainer_id: null,
          trainee_id: null,
          onProcess: true,
          subscriptions: null,
          trainers: null,
          data: [{"id": 1,"name": "Standard Workout"}, {"id": 2, "name": "Customize your Workout"}, {"id": 3, "name": "Workout plan by Ajay"}]
      }
  }

  static navigationOptions = {
      //Setting the header of the screen
      title: 'Personal training details',
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
                          this.fetchTrainer()
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
  fetchTrainer = () => {
    fetch(constants.API + 'current/admin/gyms/'+ this.state.id + '/trainers/', {
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
    }).then(res => this.setState({trainers: res, temp: res}))
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
                  "trainer_id": this.state.trainer_id,
                  "trainee_id": this.state.trainee_id,
                  "type": "PERSONAL_TRAINING"
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
           }).then(res => this.setState({subscriptions: res}, () => console.log("subscriptions fetched", res)))
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
    if(this.state.trainers !== null){
        let newData=null
        newData = this.state.trainers["trainers"].filter((item)=>{
          text = text.trim()
          const itemData = item["name"].toUpperCase()
          const textData = text.toUpperCase()
          return itemData.indexOf(textData)>-1
        });
        this.setState({
            text: text,
            trainers: newData !== null && text !== '' ? {"trainers": newData} : this.state.temp
        })
    }
  }


  selectTrainer = (id) => {
     this.setState({isVisible: false})

     this.setState({trainer_id: id})
  }
  render(){
    const { navigate } = this.props.navigation;
    if(this.state.stats !== null){
        console.log("he is pretending")
    }
    let trainer_subs = []
    searchText = "Select Trainer"

    if(this.state.subscriptions !== null && this.state.subscriptions !== undefined && ("subscriptions" in this.state.subscriptions)){

        for(let i=0;i<this.state.subscriptions["subscriptions"].length; i++){

            trainer_subs = this.state.subscriptions["subscriptions"].filter(val => {
                return val["trainer_phone"] !== null && val["trainee_phone"]!== null
            })

        }
        if(this.state.trainer_id !== null){
            let trainer = this.state.trainers["trainers"].filter(temp => {
                return temp["id"] === this.state.trainer_id
            })
            if(trainer.length > 0 ){
                searchText = trainer[0]["name"]
            }
        }

    }
    console.log("trainers loading ",this.state.trainers)
    year = ["2019", "2020", "2021", "2022", "2023", "2024", "2025"]
    workouts = {1: "StandardWorkout", 2: "PersonalizedWorkout", 3: "StandardWorkout"}
    console.log("hello moto",this.state.start_date, this.state.end_date)

    return(
       <Container style={{backgroundColor: constants.screen_color}}>

          <ScrollView showsVerticalScrollIndicator={false}>
          {this.state.start_date !== null && this.state.end_date !== null && this.state.subscriptions !== null && ("subscriptions" in this.state.subscriptions) ? (
          <Content style={styles.content}>
            <Content>
            <View>
                {this.state.show ?
                <View>
                    <Card style={{borderRadius: 10, backgroundColor: constants.card_body}}>
                        <CardItem header style={{justifyContent: 'space-between', backgroundColor: 'black', borderRadius: 10}}>
                            <Text style={{fontWeight: 'bold', color: 'white'}}>Filter by trainer</Text>
                            <TouchableOpacity onPress={() => this._hideFilter(false)}>
                                <Icon name="md-close" size={10} style={{color: 'white'}}/>
                            </TouchableOpacity>
                        </CardItem>
                        <CardItem style={{backgroundColor: constants.card_body, justifyContent: 'center'}}>

                           <View style={{flex: 1, justifyContent: 'center', alignItems: 'flex-start'}}>
                            <Button transparent block style={{backgroundColor: 'white', padding: 10, justifyContent: 'space-between'}} onPress={() => this.showModal(true)}>
                                <Text>{searchText}</Text>
                                <Icon name="md-arrow-dropdown" />
                            </Button>
                           </View>
                        </CardItem>
                        <CardItem footer style={{justifyContent: 'flex-end', backgroundColor: constants.card_body, borderRadius: 10}}>
                            {this.state.onProcess ?
                            <Button style={{backgroundColor: 'black'}} onPress={() => this.fetchSubs("submit")}><Text>Apply</Text></Button> : <Spinner color="black" />}
                        </CardItem>
                    </Card>
                </View> : <View style={{ justifyContent: 'flex-end', alignItems: 'flex-end'}}><Button style={{backgroundColor: 'black'}} onPress={() => this._hideFilter(true)}><Text>Filters</Text></Button></View>}
                <View style={{padding: 10, backgroundColor: "#ffd369"}}>
                   <Text>Showing info of clients who opted for personal training during <Text style={{color: constants.text_highlight}}>{new Date(this.state.start_date).toDateString()}</Text> To <Text style={{color: constants.text_highlight}}>{new Date(this.state.end_date).toDateString()}</Text></Text>
                </View>
                {trainer_subs.length > 0 ? trainer_subs.map(subs =>
                <View style={styles.cardListView}>
                     <Card style={{borderRadius: 10, backgroundColor: constants.card_body}}>
                        <CardItem header style={{backgroundColor: constants.card_header, height: 80, justifyContent: 'space-between', borderRadius: 10}}>
                            <Text style={{fontWeight: 'bold'}}>Training subscription</Text>
                            <Text style={{fontWeight: 'bold', color: subs["is_active"] ? constants.active_color : constants.archive_color}}>{subs["is_active"] ? "ACTIVE" : "EXPIRED"}</Text>
                        </CardItem>
                        <CardItem style={{backgroundColor: constants.card_body}}>
                            <Text><Text style={{fontWeight: 'bold'}}>Client Name: </Text>{subs["trainee_name"]}</Text>
                        </CardItem>
                        <CardItem style={{backgroundColor: constants.card_body}}>
                            <Text><Text style={{fontWeight: 'bold'}}>Client Phone: </Text>{subs["trainee_phone"]}</Text>
                        </CardItem>
                        <CardItem style={{backgroundColor: constants.card_body}}>
                            <Text><Text style={{fontWeight: 'bold'}}>Trainer Name: </Text>{subs["trainer_name"]}</Text>
                        </CardItem>
                        <CardItem style={{backgroundColor: constants.card_body}}>
                            <Text><Text style={{fontWeight: 'bold'}}>Trainer Phone: </Text>{subs["trainer_phone"]}</Text>
                        </CardItem>
                        <CardItem style={{backgroundColor: constants.card_body}}>
                            <Text><Text  style={{fontWeight: 'bold'}}>Amount Paid: </Text>{'₹'}{subs["amount"]}</Text>
                        </CardItem>
                        <CardItem style={{backgroundColor: constants.card_body}}>
                            <Text><Text style={{fontWeight: 'bold'}}>Training start date: </Text>{subs["start_date"]}</Text>
                        </CardItem>
                        <CardItem footer style={{backgroundColor: constants.card_body, borderRadius: 10}}>
                            <Text><Text style={{fontWeight: 'bold'}}>Training end date: </Text>{subs["end_date"]}</Text>
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
                    <ScrollView showsVerticalScrollBar={false}>
                      {this.state.trainers !== null ?
                         <View style={{margin: 15}} >
                            <View>
                               <TouchableOpacity onPress={() => {this.setState({isVisible: false})}}>
                                   <Icon size={25} name="md-arrow-back"/>
                               </TouchableOpacity>
                            </View>
                            <View style={{marginTop: 50}}>
                               <View>
                                 <Item regular><Input placeholder="type trainers name here ..." onChangeText={(text) => this.filterSearch(text)}
                                                                                            value={this.state.text}/></Item>
                               </View>
                               <View style={{marginTop: 15}}>
                                 <List>
                                    <ScrollView>
                                      {this.state.trainers["trainers"].length > 0 ? this.state.trainers["trainers"].reverse().map(tr =>
                                      <ListItem onPress={() => this.selectTrainer(tr["id"])} style={{justifyContent: 'space-between'}}>
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
                                      </ListItem>) : <View style={{justifyContent: 'center', alignItems: 'center'}}><Text>No Trainers</Text></View>}
                                    </ScrollView>
                                 </List>
                               </View>
                            </View>
                         </View> : <View style={{justifyContent: 'center', alignItems: 'center'}}><Text>loading ...</Text></View>}
                         </ScrollView>
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