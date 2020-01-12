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
import {Card, CardItem, Icon, Accordion, Container, Text,Label, Content, Spinner, List,ListItem, Button} from 'native-base'
let calendarDate = moment()
export default class StatsPage extends Component {
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
          start_date: moment().startOf('year').format('YYYY-MM-DD'),
          start_month: "JANUARY",
          end_month: "DECEMBER",
          monthLong: ["JANUARY", "FEBRUARY", "MARCH", "APRIL", "MAY", "JUNE", "JULY", "AUGUST", "SEPTEMBER", "OCTOBER", "NOVEMBER", "DECEMBER"],
          monthShort: ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"],
          end_date: calendarDate.format("YYYY-MM-DD"),
          start_year: new Date().getFullYear(),
          show: true,
          end_year: new Date().getFullYear(),
          onLoad: true,
          onProcess: true,
          curr: this.props.navigation.state.params.curr,
          data: [{"id": 1,"name": "Standard Workout"}, {"id": 2, "name": "Customize your Workout"}, {"id": 3, "name": "Workout plan by Ajay"}]
      }
  }

  static navigationOptions = {
      //Setting the header of the screen
      title: 'Income details',
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
//       this.focusListener = navigation.addListener('didFocus', () => {
          console.log("focusing admin screen")
          var key  = this.retrieveItem('key').then(res =>
                        this.setState({auth_key: res}, () => console.log("brother pls", res))
                      ).then(() => {
                        if(this.state.id !== null){
                          this.fetchStats()
                        }
                      })
//        });

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

  fetchStats = (st) => {
      const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
      ]

      console.log("came in the stats fetch")
      let start_year = this.state.start_year
      let end_year = this.state.end_year
      let start_month = this.state.start_month
      let end_month = this.state.end_month
      if(st === "submit"){
        this.setState({onProcess: false})
        let sdate = this.state.start_date.split("-")
        let edate =  this.state.end_date.split("-")
        start_year = sdate[0]
        end_year = edate[0]
        start_month = monthNames[parseInt(sdate[1])-1].toUpperCase()
        end_month = monthNames[parseInt(edate[1])-1].toUpperCase()
      }
      console.log("dates and month", start_year, end_year, start_month, end_month)
      fetch(constants.API + 'current/admin/gyms/'+ this.state.id + '/statistics', {
          method: 'POST',
          headers: {
               'Accept': 'application/json',
               'Content-Type': 'application/json',
               'Authorization': this.state.auth_key,
          },
          body: JSON.stringify({
              "end_month": end_month,
              "end_year": parseInt(end_year),
              "start_month": start_month,
              "start_year": parseInt(start_year)
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
      }).then(res => {
          this.setState({stats: res}, () => console.log("stats data dear", res))
      })
  }

  showModal = () => {
    this.setState({isVisible: true})
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

  render(){
    const { navigate } = this.props.navigation;
    if(this.state.stats !== null){
        console.log("he is pretending")
    }
    year = ["2019", "2020", "2021", "2022", "2023", "2024", "2025"]
    workouts = {1: "StandardWorkout", 2: "PersonalizedWorkout", 3: "StandardWorkout"}
    console.log("hello moto",this.state.start_date, this.state.end_date)
    let start_date = new Date(new Date().getFullYear(), 0, 1).toLocaleDateString().split("/").reverse().join("-")
    let end_date = new Date(new Date().getFullYear(), 11, 31).toLocaleDateString().split("/").reverse().join("-")
    return(
       <Container style={{backgroundColor: constants.screen_color}}>

          <ScrollView showsVerticalScrollIndicator={false}>
          {this.state.stats !== null && this.state.start_date !== null && this.state.end_date !== null ? (
          <Content style={styles.content}>
            <Content>
            <View>
                {this.state.show ?
                <View>
                    <Card style={{borderRadius: 10, backgroundColor: constants.card_body}}>
                        <CardItem header style={{justifyContent: 'space-between', backgroundColor: 'black', borderRadius: 10}}>
                            <Text style={{fontWeight: 'bold', color: 'white'}}>Filter by date <Text note>(Year-Month-Date)</Text></Text>
                            <Text />
                        </CardItem>
                        <CardItem style={{justifyContent: 'space-around', backgroundColor: constants.card_body}}>
                           <Label><Text style={{fontWeight: 'bold'}}>From Date</Text></Label>
                           <DatePicker
                                date={this.state.start_date}
                                onDateChange={date => this.setState({ start_date: date })}
                                mode = 'date'
                                textColor = '#3e4444'
                           />
                        </CardItem>
                        <CardItem style={{justifyContent: 'space-around', backgroundColor: constants.card_body}}>
                           <Label><Text style={{fontWeight: 'bold'}}>To Date</Text></Label>
                           <DatePicker
                             date={this.state.end_date}
                             onDateChange={date => this.setState({ end_date: date })}
                             mode = 'date'
                             textColor = '#3e4444'
                           />
                        </CardItem>
                        <CardItem footer style={{justifyContent: 'flex-end', backgroundColor: constants.card_body, borderRadius: 10}}>
                            {this.state.onProcess ?
                            <Button style={{backgroundColor: 'black'}} onPress={() => this.fetchStats("submit")}><Text>Apply</Text></Button> : <Spinner color="black" />}
                        </CardItem>
                    </Card>

                </View> : <View style={{ justifyContent: 'flex-end', alignItems: 'flex-end'}}><Button style={{backgroundColor: 'black'}} onPress={() => this._hideFilter(true)}><Text>Filters</Text></Button></View>}
                <View style={styles.cardListView}>
                   <TouchableOpacity activeOpacity={1} onPress={() => this.props.navigation.navigate('AllClientSubscriptions', {"id": this.state.id, start_date: this.state.start_date, end_date: this.state.end_date, curr: this.state.curr})}>
                     <Card style={{borderRadius: 10, backgroundColor: constants.card_body}}>
                        <CardItem header style={{backgroundColor: constants.card_header, height: 70, borderRadius: 10}}>
                            <Text>Total money received for <Text style={{fontWeight: 'bold', color: constants.text_highlight}}>Gym Membership</Text></Text>
                        </CardItem>
                        <CardItem style={{justifyContent: 'center', alignItems: 'center', backgroundColor: constants.card_body}}>
                            <Text style={{fontWeight: 'bold', fontSize: 20}}>{this.state.curr}<Text style={{fontSize: 30,color: constants.green_money}}>{this.state.stats["gym_subs"]}</Text></Text>
                        </CardItem>
                        <CardItem footer style={{justifyContent: 'space-between', backgroundColor: constants.card_body, elevation: 2, borderRadius: 10}}>
                            <Text style={{fontWeight: 'bold'}}>Gym Membership Details</Text>
                            <Icon size={10} name="md-arrow-round-forward" />
                        </CardItem>
                     </Card>
                   </TouchableOpacity>
                </View>
                <View style={styles.cardListView}>
                   <TouchableOpacity activeOpacity={1} onPress={() => this.props.navigation.navigate('AllTrainerSubscriptions', {"id": this.state.id, start_date: this.state.start_date, end_date: this.state.end_date, curr: this.state.curr})}>
                     <Card style={{borderRadius: 10, backgroundColor: constants.card_body}}>
                        <CardItem header style={{backgroundColor: constants.card_header, height: 70, borderRadius: 10}}>
                            <Text>Total money received for <Text style={{fontWeight: 'bold', color: constants.text_highlight}}>Personal Training</Text></Text>
                        </CardItem>
                        <CardItem style={{justifyContent: 'center', alignItems: 'center', backgroundColor: constants.card_body}}>
                            <Text style={{fontWeight: 'bold', fontSize: 20}}>{this.state.curr}<Text style={{fontSize: 30,color: constants.green_money}}>{this.state.stats["pt_subs"]}</Text></Text>
                        </CardItem>
                        <CardItem style={{justifyContent: 'space-between', backgroundColor: constants.card_body, elevation: 2, borderRadius: 10}}>
                            <Text style={{fontWeight: 'bold'}}>Personal Training Details</Text>
                            <Icon name="md-arrow-round-forward" size={10}/>
                        </CardItem>
                     </Card>

                   </TouchableOpacity>
                </View>
            </View>
            </Content>
          </Content>) : <View style={{justifyContent: 'center', alignItems: 'center'}}><Spinner color="black"/></View> }
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