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
          trainee_id: this.props.navigation.state.params.trainee_id,
          onProcess: false
      }
  }

  static navigationOptions = {
      //Setting the header of the screen
      title: 'Add subscription',
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
    }).then(res =>
        {
            this.setState({trainers: res, temp: res})
            console.log("trainers fetched", res)
            return res
        }
      )
    .then(res => {
      if(res !== null){
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
           }).then(res => this.setState({course: res}, () => console.log("courses fetched", res)))
      }
      }
      )
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

  onSubmit = () => {
    if(this.state.amount === null || this.state.start_date === null || this.state.duration === null || this.state.trainer_id === null || this.state.course_id === 0 ){
        Alert.alert(constants.warning, "All * fields are mandatory")
        return
    }
    console.log("state value", this.state)
    this.setState({onProcess: true})
    fetch(constants.API + 'current/admin/course-subscriptions/', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': this.state.auth_key,
        },
        body: JSON.stringify({
            "amount": parseInt(this.state.amount),
            "course": parseInt(this.state.course_id),
            "days": parseInt(this.state.days),
            "start_date": this.state.start_date,
            "trainee_id": parseInt(this.state.trainee_id),
            "trainer_id": parseInt(this.state.trainer_id)
        })
    }).then(res => {
        this.setState({onProcess: false})
        if(res.status === 200){
            Alert.alert(constants.success, 'Successfully created personal training subscription for the client')
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
          { this.state.trainee_id !== null && this.state.trainers !== null && this.state.course !== null ? (
          <Content style={styles.content}>
            <View>
                    <View style={{marginTop: 15}}><Label><Text style={{fontWeight: 'bold'}}>Select Trainer<Text style={{color: 'red'}}>*</Text></Text></Label>
                     <View style={{padding: 10, backgroundColor: '#f4f4f4'}}>
                        <TouchableOpacity onPress={() => this.showModal(true)}>
                            <View style={{justifyContent: 'space-between', flexDirection: 'row'}}>
                                <Text>{searchText}</Text>
                                <Icon name="md-arrow-dropdown" size={20}/>
                            </View>
                        </TouchableOpacity>
                     </View>
                    </View>
                    <View style={{marginTop: 15}}>
                        <Label><Text style={{fontWeight: 'bold'}}>Select Fitness Package<Text style={{color: 'red'}}>*</Text></Text></Label>
                        <Item regular>
                        <Picker
                          selectedValue={this.state.course_name}
                          style={{height: 50, width: '100%'}}
                          onValueChange={(itemValue, itemIndex) =>{
                              console.log("value of picker itemValue", itemValue)
                              this.setState({course_id: itemValue, course_name:itemValue})
                             }
                          }>
                          <Picker.Item label="Select Fitness Package" value="null" />
                          {this.state.course["courses"].map(course =>
                          <Picker.Item label={course["name"]} value={course["id"]} />)}
                        </Picker>
                        </Item>
                    </View>
                    <View style={{marginTop: 15}}>
                        <Label><Text style={{fontWeight: 'bold'}}>Training start date</Text></Label>
                        <DatePicker
                          date={this.state.start_date}
                          onDateChange={date => this.setState({ start_date: date })}
                          mode = 'date'
                          textColor = '#3e4444'
                        />
                    </View>
                    </View>
                    <View style={{marginTop: 15}}>
                          <Label><Text style={{fontWeight: 'bold'}}>Enter no. of days<Text style={{color: 'red'}}>*</Text></Text></Label>
                          <Item regular style={{flexDirection: 'row'}}>
                            <Input placeholder="duration" keyboardType='numeric' onChangeText={text => this.setState({days: text})} style={{flex: 1}}/>
                          </Item>
                    </View>
                    <View style={{marginTop: 15}}>
                          <Label><Text style={{fontWeight: 'bold'}}>Amount<Text style={{color: 'red'}}>*</Text></Text></Label>
                          <Item regular>
                             <Input keyboardType='numeric' style={{backgroundColor: 'white'}}  onChangeText = {text => this.setState({amount: text})}/>
                          </Item>
                    <View style={{margin: 25}}>
                        {this.state.onProcess === false ?
                            <Button style={{backgroundColor: 'black', justifyContent: 'center', alignItems: 'center'}} onPress={this.onSubmit}><Text style={{color: 'white'}}>Add Subscription</Text></Button>
                        : <Spinner color="black" />}
                    </View>
            </View>
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
                                                {this.state.trainers["trainers"].length > 0 ? this.state.trainers["trainers"].map(tr =>
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