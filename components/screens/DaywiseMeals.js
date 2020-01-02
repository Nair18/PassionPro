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
  AsyncStorage,
  KeyboardAvoidingView,
  Alert,
  TextInput,
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
import ModalSelector from 'react-native-modal-selector';
import {Agenda} from 'react-native-calendars';
import Icon from 'react-native-vector-icons/Ionicons';
import constants from '../constants';
import {Calendar} from 'react-native-calendars';
import {Container, Accordion,Thumbnail, Card,List, ListItem, Form, Item, Label, Textarea, Spinner,CheckBox, CardItem,Tab,Tabs, Header, Title, Content, Button, Left, Body, Text,Right, Input} from 'native-base';


export default class DaywiseMeals extends Component {
    constructor(props){
        super(props);
        this.state = {
           trainee_id: this.props.navigation.state.params.trainee_id,
           isVisible: false,
           auth_key: null,
           planDetails: null,
           day: null,
           name: null,
           onProcess: false,
           description: null,
           dayName: null,
           days: [{"id": "MONDAY", "name": "MONDAY"}, {"id": "TUESDAY", "name": "TUESDAY"}, {"id": "WEDNESDAY", "name": "WEDNESDAY"},
                      {"id": "THURSDAY", "name": "THURSDAY"}, {"id": "FRIDAY", "name": "FRIDAY"}, {"id": "SATURDAY", "name": "SATURDAY"}, {"id": "SUNDAY", "name": "SUNDAY"}],
           plan_id: this.props.navigation.state.params.plan_id
        }
    }

    static navigationOptions = {
            title: 'Meal Space',
            headerTitleStyle: { color: constants.header_text, fontWeight: 'bold'},
            headerStyle: {backgroundColor: constants.header},
            headerTintColor: constants.header_text
          }

    showModal = (bool=true) => {
        this.setState({isVisible: bool})
      }

    buttonPress = (type) => {
        console.log('Hello friends button daba diya')
        this.props.navigation.navigate(type)
        this.setState({isVisible: false})
    }

    componentDidMount(){
            console.log("id has been retrieved", this.state.id)

            const { navigation } = this.props;
            console.log("pagal bana rhe hai")
            this.focusListener = navigation.addListener('didFocus', () => {
                    console.log("The screen is focused")
                    var key  = this.retrieveItem('key').then(res =>
                               this.setState({auth_key: res}, () => console.log("brother pls", res))
                               ).then(() => {
                                    if(this.state.auth_key !== null){
                                        this.fetchDetails()
                                    }
                               })
            });
        }

    componentWillUnmount() {
              // Remove the event listener
              this.focusListener.remove();

          }
    fetchDetails = () => {
            this.setState({loading: true})
            let course_list = fetch(constants.API + 'current/trainer/trainees/'+this.state.trainee_id +"/mealplans/"+this.state.plan_id, {
                method: 'GET',
                headers: {
                                'Accept': 'application/json',
                                'Content-Type': 'application/json',
                                'Authorization': this.state.auth_key,
                            }
            })
            .then(
                res => {
                    if(res.status === 200){
                        return res.json()
                    }
                    else{
                        this.setState({loading: false})
                                                       Alert.alert(
                                                          constants.failed,
                                                          constants.fail_error,
                                                          [
                                                              {text: 'OK', onPress: () => console.log('OK Pressed')},
                                                          ],
                                                          {cancelable: false},
                                                       );
                    }
                }
            ).then(res => this.setState({planDetails: res}))
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

    onSubmit = () => {
        if(this.state.day === null || this.state.description === null || this.state.name === null){
            Alert.alert(constants.incomplete_info, "All '*' fields are mandatory")
            return
        }
        this.setState({onProcess: true})
        fetch(constants.API + 'current/trainer/trainees/'+this.state.trainee_id + '/mealplans/'+this.state.plan_id+'/days/'+this.state.day, {
            method: 'POST',
            headers: {
               'Accept': 'application/json',
               'Content-Type': 'application/json',
               'Authorization': this.state.auth_key,
            },
            body: JSON.stringify({
                "description": this.state.description,
                "name": this.state.name
            })
        }).then(res => {
            this.setState({onProcess: false})
            if(res.status === 200){
                Alert.alert(constants.success, 'Successfully added the day')
                this.showModal(false)
                this.fetchDetails()
            }
            else if(res.status === 401){
                this.props.navigation.navigate('LandingPage')
                return
            }
            else{
                Alert.alert(constants.failed, constants.fail_error)
                return
            }
        }
        )
    }

    render(){
        let plans = new Map()
        let days = []
        const {planDetails} = this.state
        if(planDetails !== null){
            for(let i=0; i<planDetails["meal_plans"].length; i++){
                let arr = []
                if(plans.has(planDetails["meal_plans"][i]["day"])){
                    arr = plans.get(planDetails["meal_plans"][i]["day"])
                }
                data = {
                         "name": planDetails["meal_plans"][i]["name"],
                         "description": planDetails["meal_plans"][i]["description"],
                         "id": planDetails["meal_plans"][i]["id"]
                       }
                arr.push(data)
                plans.set(planDetails["meal_plans"][i]["day"], arr)
            }
            console.log("dict got created", plans)
        }
        for(let [k,v] of plans){
           days.push(k)
        }
        var daysOfWeek = ["SUNDAY","MONDAY","TUESDAY","WEDNESDAY","THURSDAY","FRIDAY","SATURDAY"];

        {
            var today = new Date().getDay();
            for (var i=0;i<today;i++) daysOfWeek.push(daysOfWeek.shift());
        }

        function daysOfWeekSorter(x,y) {
            return daysOfWeek.indexOf(x)-daysOfWeek.indexOf(y);
        }

        var myDays = ["Tue", "Thu", "Sun"];
        days.sort(daysOfWeekSorter);
        console.log("days are generated", days)
        return(
            <Container style={{backgroundColor: constants.screen_color}}>
                    <ScrollView showsVerticalScrollIndicator={false}>
                    {this.state.planDetails !== null ?
                      <Content style={styles.content}>
                        <View style={{marginTop: 10}}>
                            <Text>Showing result for <Text style={{fontWeight: 'bold'}}>{this.state.planDetails["name"]}</Text></Text>
                        </View>
                        <View style={{marginTop: 5}}>
                        {days.length > 0 ? days.map(day =>
                        <View style={{marginLeft: 15, marginRight: 15, marginTop: 5}}>
                           <TouchableOpacity activeOpacity={1} onPress={() => this.props.navigation.navigate('CreateMeal', {details: plans.get(day), plan_id: this.state.plan_id, trainee_id: this.state.trainee_id,day: day})}>
                           <Card style={{backgroundColor: constants.item_card}}>
                            <CardItem style={{justifyContent: 'space-between', backgroundColor: constants.item_card}}>
                                <Text style={{fontWeight: 'bold'}}>{day}</Text>
                                <Icon size={20} name="md-arrow-dropright"/>
                            </CardItem>
                           </Card>
                           </TouchableOpacity>
                        </View>) : null}
                        </View>
                     </Content> : <View style={{justifyContent: 'center', alignItems: 'center'}}><Spinner color="black" /></View>}
                     </ScrollView>
                        <View style={styles.addButton}>
                                                <Button rounded style={{height: 50, width: 50, alignItems: 'center', backgroundColor: 'black', justifyContent: 'center'}} onPress={() => this.showModal(true)}>
                                                        <Icon size={30} style={{color: 'white'}}name="md-add" />
                                                </Button>
                                            </View>
                        <View>
                                <Modal
                                  animationType="slide"
                                  transparent={false}
                                  visible={this.state.isVisible}
                                  onRequestClose={() => {
                                    this.showModal(false)
                                  }}>
                                  <View style={{margin: 15}}>
                                    <TouchableOpacity onPress={() => this.showModal(false)}>
                                    <Icon name="md-close" size={30}/>
                                    </TouchableOpacity>
                              </View>
                                  <Content style={styles.content}>

                                    {this.state.planDetails !== null ?
                                    (<Form>
                                       <View style={{margin: 15}}>
                                        <Label><Text style={{fontWeight: 'bold'}}>Day</Text><Text style={{color: 'red'}}>*</Text></Label>
                                               <ModalSelector
                                                   placeholder="Select Day"
                                                   initValue={this.state.dayName}
                                                   data={this.state.days}
                                                   keyExtractor= {item => item.id}
                                                   labelExtractor= {item => item.name}
                                                   initValue={this.state.dayName}
                                                   supportedOrientations={['landscape']}
                                                   accessible={true}
                                                   scrollViewAccessibilityLabel={'Scrollable options'}
                                                   cancelButtonAccessibilityLabel={'Cancel Button'}
                                                   onChange={(option)=>{
                                                    this.setState({day: option.id, dayName: option.name})
                                                   }}>

                                                   <TextInput
                                                     style={{borderWidth:1, borderColor:'#ccc', color: 'black',padding:10, height:50}}
                                                     editable={false}
                                                     placeholder="Select Day"
                                                     value={this.state.dayName}
                                                   />
                                                 </ModalSelector>
                                       </View>
                                       <View style={{margin: 15}}>
                                       <Label><Text style={{fontWeight: 'bold'}}>Meal Name</Text><Text style={{color: 'red'}}>*</Text></Label>
                                       <Item regular>

                                            <Input placeholder="Meal name here ..." onChangeText={(text) => this.setState({name: text})}/>

                                       </Item>
                                       </View>
                                       <Item style={{marginLeft: 15, marginRight: 15, marginTop: 10}}>
                                          <Textarea rowSpan={5} style={{width: '100%'}} bordered placeholder="Meal content here ..." onChangeText={text => this.setState({description: text})}/>
                                       </Item>
                                       <View last style={{alignItems: 'center',justifyContent: 'center', marginTop: 15}}>
                                       {this.state.onProcess === false ?
                                       <Button onPress={this.onSubmit} style={{backgroundColor: 'black'}}>
                                         <Text>Add Day</Text>
                                       </Button> : <Spinner color="black"/>}
                                       </View>
                                    </Form>) : <View style={{justifyContent: 'center', alignItems: 'center'}}><Text>loading ...</Text></View>}

                                  </Content>
                                </Modal>
                              </View>

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
   addButton: {
      position: 'absolute',
      right: 30,
      bottom: 30,
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