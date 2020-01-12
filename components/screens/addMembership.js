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

export default class addMembership extends Component {
  constructor(props){
    super(props)
    this.state = {
          isVisible: false,
          id: this.props.navigation.state.params.id,
          course: null,
          trainer_id: null,
          amount: null,
          days: null,
          trainers: null,
          auth_key: null,
          temp: null,
          course_id: 0,
          course_name: null,
          start_date: moment().format("YYYY-MM-DD"),
          end_date: moment().format("YYYY-MM-DD"),
          trainee_id: this.props.navigation.state.params.trainee_id,
          onProcess: false
      }
  }

  static navigationOptions = {
      //Setting the header of the screen
      title: 'Add Membership',
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
             if(this.state.auth_key !== null){
//                this.fetchTrainer()

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


  onSubmit = () => {
    if(this.state.amount === null || this.state.amount.trim() === ''|| this.state.start_date === null || this.state.end_date === null){
        Alert.alert(constants.warning, "All * fields are mandatory")
        return
    }
    console.log("state value", this.state)
    this.setState({onProcess: true})
    fetch(constants.API + 'current/admin/gyms/'+this.state.id + '/trainees/' + this.state.trainee_id + '/renew-subscription', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': this.state.auth_key,
        },
        body: JSON.stringify({
            "amount": parseInt(this.state.amount),
            "end_date": this.state.end_date,
            "start_date": this.state.start_date,
        })
    }).then(res => {
        this.setState({onProcess: false})
        if(res.status === 200){
            Alert.alert(constants.success, 'Successfully created gym membership for the client')
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
     this.setState({isVisible: false, trainer_id: id})
  }
  render(){
    let trainer = []
    searchText = "Search here ..."
    if(this.state.trainer_id !== null){
       trainer = this.state.trainers["trainers"].filter(temp => {
          return temp["id"] === this.state.trainer_id
       })
       if(trainer.length > 0 ){
          searchText = trainer[0]["name"]
       }
    }
    return(
       <Container >

          <ScrollView showsVerticalScrollIndicator={false}>
          { this.state.trainee_id !== null ? (
          <Content style={styles.content}>
            <View>
                    <View style={{marginTop: 15}}>
                        <Label><Text style={{fontWeight: 'bold'}}>Membership start date </Text><Text note>(Year-month-date)</Text></Label>
                        <DatePicker
                          date={this.state.start_date}
                          onDateChange={date => this.setState({ start_date: date })}
                          mode = 'date'
                          textColor = '#3e4444'
                        />
                    </View>
                    <View style={{marginTop: 15}}>
                                            <Label><Text style={{fontWeight: 'bold'}}>Membership end date </Text><Text note>(Year-month-date)</Text></Label>
                                            <DatePicker
                                              date={this.state.end_date}
                                              onDateChange={date => this.setState({ end_date: date })}
                                              mode = 'date'
                                              textColor = '#3e4444'
                                            />
                    </View>
                    <View style={{marginTop: 15}}>
                          <Label><Text style={{fontWeight: 'bold'}}>Amount<Text style={{color: 'red'}}>*</Text></Text></Label>
                          <Item regular>
                             <Input keyboardType='numeric' style={{backgroundColor: 'white'}}  onChangeText = {text => this.setState({amount: text})}/>
                          </Item>
                    </View>
                    <View style={{margin: 25}}>
                        {this.state.onProcess === false ?
                            <Button style={{backgroundColor: 'black', justifyContent: 'center', alignItems: 'center'}} onPress={this.onSubmit}><Text style={{color: 'white'}}>Add Membership</Text></Button>
                        : <Spinner color="black" />}
                    </View>
            </View>
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