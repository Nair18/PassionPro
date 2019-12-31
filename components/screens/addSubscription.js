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
export default class addSubscription extends Component {
  constructor(props){
    super(props)
    this.state = {
          isVisible: false, //state of modal default false
          workoutName: null,
          id: this.props.navigation.state.params.id,
          client_id: this.props.navigation.state.client_id,
          workoutType: null,
          stats: null,
          auth_key: null,
          workoutSection: null,
          start_date: calendarDate.format("YYYY-MM-DD"),
          start_month: "JANUARY",
          end_month: "DECEMBER",
          monthLong: ["JANUARY", "FEBRUARY", "MARCH", "APRIL", "MAY", "JUNE", "JULY", "AUGUST", "SEPTEMBER", "OCTOBER", "NOVEMBER", "DECEMBER"],
          monthShort: ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"],
          end_date: calendarDate.format("YYYY-MM-DD"),
          start_year: new Date().getFullYear(),
          show: true,
          end_year: new Date().getFullYear(),
          onLoad: true,
          trainer_id: null,
          onProcess: true,
          subscriptions: null,
          courses: null,
          trainers: null,
          data: [{"id": 1,"name": "Standard Workout"}, {"id": 2, "name": "Customize your Workout"}, {"id": 3, "name": "Workout plan by Ajay"}]
      }
  }

  static navigationOptions = {
      //Setting the header of the screen
      title: 'Statistics',
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
                          this.fetchCourses()
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
    }).then(res => this.setState({trainers: res, temp: res}, () => console.log("trainers fetched")))
  }

  fetchCourses = () => {
      fetch(constants.API + 'current/admin/gyms/'+ this.state.id + '/courses/', {
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
           }).then(res => this.setState({courses: res}, () => console.log("courses fetched", res)))
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
          const itemData = item["name"]
          const textData = text
          return itemData.indexOf(textData)>-1
        });
        this.setState({
            text: text,
            trainers: newData !== null && text !== '' ? {"trainers": newData} : this.state.temp
        })
    }
  }

  addSubscriptions = () => {
    fetch(constants.API + 'current/admin/course-subscriptions/', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': this.state.auth_key,
        },
        body: JSON.stringify({
            "trainer_id": this.state.trainer_id,
            "trainee_id": this.state.client_id,
            "days": this.state.days,
            "amount": this.state.amount,
            "course": this.state.course_id,
            "start_date": this.state.start_date
        })
    }).then(res => {
        if(res.status === 200){
            Alert.alert(constants.success, "Successfully added the course subscription")
            this.props.navigation.goBack()
        }
        else if(res.status === 401){
            this.props.navigation.navigate('LandingPage')
        }
        else{
            Alert.alert(constants.failed, constants.fail_error)
        }
    })
  }
  selectTrainer = (id) => {
     this.setState({isVisible: false})

     this.setState({trainer_id: id})
  }
  render(){
    const { navigate } = this.props.navigation;
    let trainer_subs = []
    searchText = "Search Trainer"

    if(this.state.trainers !== null){
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
    console.log("courses hai bhai", this.state.courses)
    year = ["2019", "2020", "2021", "2022", "2023", "2024", "2025"]
    workouts = {1: "StandardWorkout", 2: "PersonalizedWorkout", 3: "StandardWorkout"}
    console.log("hello moto",this.state.start_date, this.state.end_date)
    let start_date = new Date(new Date().getFullYear(), 0, 1).toLocaleDateString().split("/").reverse().join("-")
    let end_date = new Date(new Date().getFullYear(), 11, 31).toLocaleDateString().split("/").reverse().join("-")
    return(
       <Container style={{backgroundColor: constants.screen_color}}>

          <ScrollView showsVerticalScrollIndicator={false}>
          {this.state.trainers !== null && this.state.courses !== null ? (
          <Content style={styles.content}>
            <Content>
            <View>
                {this.state.show ?
                   <View>
                        <View style={{backgroundColor: constants.card_body, justifyContent: 'center'}}>
                           <View style={{backgroundColor: constants.card_header, padding: 10}}><Icon name="md-search" size={30} onPress={() => this.showModal(true)}/></View>
                           <View style={{flex: 1, justifyContent: 'center', alignItems: 'flex-start'}}>
                            <Button transparent block style={{backgroundColor: 'white', padding: 10}} onPress={() => this.showModal(true)}><Text note>{searchText}</Text></Button>
                           </View>
                        </View>
                        <View style={{justifyContent: 'space-around', backgroundColor: constants.card_body}}>
                           <Label><Text style={{fontWeight: 'bold'}}>Select Course <Text style={{color: 'red'}}>*</Text></Text></Label>
                           <DatePicker
                               date={this.state.start_date}
                               onDateChange={date => this.setState({ start_date: date })}
                               mode = 'date'
                               textColor = '#3e4444'
                           />
                        </View>
                        <View style={{justifyContent: 'space-around', backgroundColor: constants.card_body}}>
                           <Label><Text style={{fontWeight: 'bold'}}>Select Course<Text style={{color: 'red'}}>*</Text></Text></Label>
                           <Item regular>
                            <Picker
                             selectedValue={this.state.language}
                             style={{height: 50, width: 100}}
                             onValueChange={(itemValue, itemIndex) =>
                               this.setState({course_id: itemValue})
                             }>
                             {this.state.courses["courses"].map(course =>
                                <Picker.Item label={course["name"]} value={course["id"]} /> )}
                            </Picker>
                           </Item>
                        </View>
                        <View style={{justifyContent: 'space-around', backgroundColor: constants.card_body}}>
                           <Label><Text style={{fontWeight: 'bold'}}>Training Duration</Text></Label>
                           <Input placeholder="eg. 180" onChangeText={text => this.setState({days: text})}/>
                        </View>
                        <View style={{justifyContent: 'flex-end', backgroundColor: constants.card_body}}>
                            {this.state.onProcess ?
                            <Button style={{backgroundColor: 'black'}} onPress={this.addSubscriptions}><Text>Apply</Text></Button> : <Spinner color="black" />}
                        </View>
                   </View> : null}

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
                      {this.state.trainers !== null && this.state.courses !== null ?
                         <View style={{margin: 15}} >
                            <View style={{marginTop: 15}}>
                               <TouchableOpacity onPress={() => {this.setState({isVisible: false})}}>
                                   <Icon size={25} name="md-arrow-back"/>
                               </TouchableOpacity>
                            </View>
                            <View style={{marginTop: 50}}>
                               <View>
                                 <Item regular><Input placeholder="Search here" onChangeText={(text) => this.filterSearch(text)}
                                                                                            value={this.state.text}/></Item>
                               </View>
                               <View style={{marginTop: 15}}>
                                 <List>
                                    <ScrollView>
                                      {this.state.trainers !== null && this.state.trainers["trainers"].length > 0 ? this.state.trainers["trainers"].map(tr =>
                                      <ListItem onPress={() => this.selectTrainer(tr["id"])} style={{justifyContent: 'space-between'}}>
                                        <View>
                                          <Text style={{color: tr["is_active"] ? constants.active_color : constants.archive_color}}>{tr["name"]}</Text>
                                          <Text note>Mobile {tr["phone"]}</Text>
                                        </View>
                                        <View>
                                            <Icon size={20} name="md-arrow-round-forward" />
                                        </View>
                                      </ListItem>) : <View style={{justifyContent: 'center', alignItems: 'center'}}><Text>No Trainers</Text></View>}
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