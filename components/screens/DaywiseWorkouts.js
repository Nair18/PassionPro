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
import {Agenda} from 'react-native-calendars';
import ModalSelector from 'react-native-modal-selector';
import Icon from 'react-native-vector-icons/Ionicons';
import constants from '../constants';
import {Calendar} from 'react-native-calendars';

import {Container, Accordion,Thumbnail, Card,List, ListItem, Input,Item, Form, Label, Textarea, Spinner,CheckBox, CardItem,Tab,Tabs, Header, Title, Content, Button, Left, Body, Text,Right} from 'native-base';


export default class DaywiseWorkouts extends Component {
    constructor(props){
        super(props);
        this.state = {
           trainee_id: this.props.navigation.state.params.trainee_id,
           modalVisible: false,
           auth_key: null,
           days: [{"id": "MONDAY", "name": "MONDAY"}, {"id": "TUESDAY", "name": "TUESDAY"}, {"id": "WEDNESDAY", "name": "WEDNESDAY"},
           {"id": "THURSDAY", "name": "THURSDAY"}, {"id": "FRIDAY", "name": "FRIDAY"}, {"id": "SATURDAY", "name": "SATURDAY"}, {"id": "SUNDAY", "name": "SUNDAY"}],
           dayName: null,
           day: null,
           onProcess: false,
           durations: "0",
           sets: null,
           weights: "0",
           reps: null,
           gymD: null,
           workoutDetails: null,
           exercise_id: null,
           exerciseName: null,
           instructions: null,
           partName: null,

           planDetails: null,
           plan_id: this.props.navigation.state.params.plan_id
        }
    }

    static navigationOptions = {
            title: 'Workouts of the week',
            headerTitleStyle: { color: constants.header_text, fontWeight: 'bold'},
            headerStyle: {backgroundColor: constants.header},
            headerTintColor: constants.header_text
          }

    setModalVisible = (bool=true) => {
        this.setState({modalVisible: bool})
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
            fetch(constants.API + 'current/trainer/trainees/'+this.state.trainee_id +"/plans/"+this.state.plan_id, {
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
            ).then(res => this.setState({planDetails: res})).then(() => {
                if(this.state.gymD !== null && this.state.gymD !== null){
                console.log("gym id ", this.state.gymD)
                fetch(constants.API + 'current/trainer/gym/'+ this.state.gymD + '/exercises', {
                    method: 'GET',
                    headers: {
                       'Accept': 'application/json',
                       'Content-Type': 'application/json',
                       'Authorization': this.state.auth_key,
                    }
                }).then( res => {
                    if(res.status === 200){
                       return res.json()
                    }
                    else if(res.status === 401){
                       this.props.navigation.navigate('LandingPage')
                    }
                    else{
                       Alert.alert(constants.failed, constants.fail_error)
                       return
                    }
                    }).then(
                        (res) => {
                            this.setState({exerciseList: res})
                        }
                    )
            }
            else{
                Alert.alert(constants.failed, 'Something is fishy')
            }
            })
    }
    async retrieveItem(key) {
                  try {
                    let retrievedItem = null
                    await AsyncStorage.multiGet([key, 'gym'], (err,stores) => {
                       stores.map((result, i, store) => {
                             // get at each store's key/value so you can work with it
                             let k = store[i][0];
                             let v = store[i][1];
                             if(k === 'gym'){
                                this.setState({gymD: v})
                             }
                             else{
                                retrievedItem = v
                             }
                       });
                      })
                    console.log("key retrieved")
                    console.log(this.state.gymD)
                    return retrievedItem;
                  } catch (error) {
                    console.log(error.message);
                  }
                  return;
          }

    onSubmit = () => {
        if(this.state.exercise_id === null || this.state.sets === null || this.state.reps === null){
            Alert.alert(constants.incomplete_info,"All '*' fields mandatory")
            return
        }
        console.log("state of the art ", this.state)
        this.setState({onProcess: true})
        fetch(constants.API + 'current/trainer/trainees/'+this.state.trainee_id +"/plans/"+this.state.plan_id + "/days/"+ this.state.day, {
                        method: 'POST',
                        headers: {
                                        'Accept': 'application/json',
                                        'Content-Type': 'application/json',
                                        'Authorization': this.state.auth_key,
                                    },
                        body: JSON.stringify({
                          "duration": this.state.durations,
                          "exercise_id": this.state.exercise_id,
                          "instruction": this.state.instructions,
                          "reps": this.state.reps,
                          "sets": this.state.sets,
                          "weights": this.state.weights
                        })
                    })
                    .then(
                        res => {
                            this.setState({onProcess: false})
                            if(res.status === 200){
                                Alert.alert(constants.success, 'Successfully added a day')
                                this.setState({modalVisible: false})
                                this.fetchDetails()
                            }
                            else if(res.status === 401){
                                this.props.navigation.navigate('LandingPage')
                            }
                            else{
                                Alert.alert(constants.failed, res)
                            }
                        }
                    )
    }
    render(){
        let plans = new Map()
        let days = []
        const {planDetails} = this.state
        console.log(planDetails)
        if(planDetails !== null){
            for(let i=0; i<planDetails["plans"].length; i++){
                let arr = []
                if(plans.has(planDetails["plans"][i]["day"])){
                    arr = plans.get(planDetails["plans"][i]["day"])
                }
                data = {
                         "duration": planDetails["plans"][i]["duration"],
                         "exercise": planDetails["plans"][i]["exercise"],
                         "id": planDetails["plans"][i]["id"],
                         "instructions": planDetails["plans"][i]["instructions"],
                         "reps": planDetails["plans"][i]["reps"],
                         "sets": planDetails["plans"][i]["sets"],
                         "weights": planDetails["plans"][i]["weights"]
                       }
                arr.push(data)
                plans.set(planDetails["plans"][i]["day"], arr)
            }

            for(let [k,v] of plans){
                days.push(k)
            }
        }

        let body_parts = null
        console.log("plan aay ki nhi")
        console.log(this.state.planDetails)
        const {exerciseList} = this.state
        console.log("came here")
        console.log(this.state.exerciseList)
        if(this.state.exerciseList !== null){
            body_parts = []
            for(var k in this.state.exerciseList){
                d = {
                    "id": k,
                    "name": k
                }
                body_parts.push(d)
                console.log("Ho ho")
            }
        }
        if(body_parts !== null && body_parts.length === 0){
            body_parts = null
        }
        console.log("body parts", body_parts)
        return(
            <Container style={{backgroundColor: constants.screen_color}}>
                    <ScrollView showsVerticalScrollIndicator={false}>
                    {this.state.planDetails !== null ?
                     <Content style={styles.content}>
                        <View style={{marginTop: 10}}>
                            <Text>Showing result for <Text style={{fontWeight: 'bold'}}>{this.state.planDetails["name"]}</Text></Text>
                        </View>
                        {days.length > 0 ? days.map(day =>
                        <View style={{marginLeft: 15, marginRight: 15, marginTop: 5}}>
                           <TouchableOpacity activeOpacity={1} onPress={() => this.props.navigation.navigate('TrainerWorkout', {"day": day, plan_id: this.state.plan_id, "trainee_id": this.state.trainee_id, workouts: plans.get(day), exerciseList: this.state.exerciseList, body_parts: body_parts})}>
                           <Card style={{backgroundColor: constants.item_card}}>
                            <CardItem style={{justifyContent: 'space-between', backgroundColor: constants.item_card}}>
                                <Text style={{fontWeight: 'bold'}}>{day}</Text>
                                <Icon size={20} name="md-arrow-dropright"/>
                            </CardItem>
                           </Card>
                           </TouchableOpacity>
                        </View>) : null}

                    </Content> : <View style={{justifyContent: 'center', alignItems: 'center'}}><Spinner color="black" /></View>}
                    </ScrollView>
                    <View style={styles.addButton}>
                         <Button  rounded style={{height: 50, width: 50, alignItems: 'center', backgroundColor: 'black', justifyContent: 'center'}} onPress={() => this.setModalVisible(true)}>
                             <Icon size={30} style={{color: 'white'}}name="md-add" />
                         </Button>
                    </View>
                    <View>

                                                                                            <Modal
                                                                                              animationType="slide"
                                                                                              transparent={false}
                                                                                              visible={this.state.modalVisible}
                                                                                              onRequestClose={() => {
                                                                                                this.setModalVisible(false)
                                                                                              }}>
                                                                                              <View style={{margin: 15}}>
                                                                                                <TouchableOpacity onPress={() => this.setModalVisible(false)}>
                                                                                                <Icon name="md-close" size={30}/>
                                                                                                </TouchableOpacity>
                                                                                          </View>
                                                                                              <Content style={styles.content}>

                                                                                                {body_parts !== null ?
                                                                                                (<Form>
                                                                                                   <View style={{margin: 15}}>
                                                                                                   <View>
                                                                                                    <Label><Text style={{fontWeight: 'bold'}}>Day</Text><Text style={{color: 'red'}}>*</Text></Label>
                                                                                                        <ModalSelector
                                                                                                           placeholder="Select the day"
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
                                                                                                           placeholder="Select the day"
                                                                                                           value={this.state.dayName}
                                                                                                       />

                                                                                                        </ModalSelector>
                                                                                                   </View>
                                                                                                   <View style={{marginTop: 10}}>
                                                                                                       <Label><Text style={{fontWeight: 'bold'}}>Body part</Text><Text style={{color: 'red'}}>*</Text></Label>
                                                                                                          <ModalSelector
                                                                                                              placeholder="Select body part"
                                                                                                              initValue={this.state.partName}
                                                                                                              data={body_parts}
                                                                                                              keyExtractor= {item => item.id}
                                                                                                              labelExtractor= {item => item.name}
                                                                                                              initValue={this.state.partName}
                                                                                                              supportedOrientations={['landscape']}
                                                                                                              accessible={true}
                                                                                                              scrollViewAccessibilityLabel={'Scrollable options'}
                                                                                                              cancelButtonAccessibilityLabel={'Cancel Button'}
                                                                                                              onChange={(option)=>{
                                                                                                                this.setState({partName: option.id, workoutDetails: this.state.exerciseList[option.name]})
                                                                                                              }}>
                                                                                                              <TextInput
                                                                                                                 style={{borderWidth:1, borderColor:'#ccc', color: 'black',padding:10, height:50}}
                                                                                                                 editable={false}
                                                                                                                 placeholder="Select body part"
                                                                                                                 value={this.state.partName}
                                                                                                              />

                                                                                                          </ModalSelector>
                                                                                                   </View>
                                                                                                   <View style={{marginTop: 10}}>
                                                                                                       <Label><Text style={{fontWeight: 'bold'}}>Exercise</Text><Text style={{color: 'red'}}>*</Text></Label>
                                                                                                       <ModalSelector
                                                                                                           placeholder="Select the exercise"
                                                                                                           initValue={this.state.exerciseName}
                                                                                                           data={this.state.workoutDetails === null ? [] : this.state.workoutDetails}
                                                                                                           keyExtractor= {item => item.id}
                                                                                                           labelExtractor= {item => item.exercise_name}
                                                                                                           initValue={this.state.exerciseName}
                                                                                                           supportedOrientations={['landscape']}
                                                                                                           accessible={true}
                                                                                                           scrollViewAccessibilityLabel={'Scrollable options'}
                                                                                                           cancelButtonAccessibilityLabel={'Cancel Button'}
                                                                                                           onChange={(option)=>{
                                                                                                                this.setState({exercise_id: parseInt(option.id), exerciseName: option.exercise_name})
                                                                                                           }}>
                                                                                                           <TextInput
                                                                                                              style={{borderWidth:1, borderColor:'#ccc', color: 'black',padding:10, height:50}}
                                                                                                              editable={false}
                                                                                                              placeholder="Select the exercise"
                                                                                                              value={this.state.exerciseName}
                                                                                                           />

                                                                                                       </ModalSelector>
                                                                                                   </View>
                                                                                                   <View style={{marginTop: 10}}>
                                                                                                   <Label><Text keyboardType='numeric' style={{fontWeight: 'bold'}}>Sets</Text><Text style={{color: 'red'}}>*</Text></Label>
                                                                                                   <Item regular>
                                                                                                        <Input keyboardType='numeric' placeholder="eg. 5" onChangeText={(text) => this.setState({sets: text})}/>
                                                                                                   </Item>
                                                                                                   </View>
                                                                                                   <View style={{marginTop: 10}}>
                                                                                                   <Label><Text style={{fontWeight: 'bold'}}>Reps</Text><Text style={{color: 'red'}}>*</Text></Label>
                                                                                                    <Item regular>
                                                                                                       <Input keyboardType='numeric' placeholder="eg. 10" onChangeText={(text) => this.setState({reps: text})}/>
                                                                                                    </Item>
                                                                                                    </View>
                                                                                                    <View style={{marginTop: 10}}>
                                                                                                    <Label><Text style={{fontWeight: 'bold'}}>Weight(Kg)</Text></Label>
                                                                                                       <Item regular>
                                                                                                          <Input keyboardType='numeric' placeholder="eg. 5" onChangeText={(text) => this.setState({weights: text})}/>
                                                                                                       </Item>
                                                                                                    </View>
                                                                                                    <View style={{marginTop: 10}}>
                                                                                                    <Label><Text style={{fontWeight: 'bold'}}>Duration(min)</Text></Label>
                                                                                                       <Item regular>
                                                                                                          <Input keyboardType='numeric' placeholder="eg. 10" onChangeText={(text) => this.setState({durations: parseInt(text)})}/>
                                                                                                       </Item>
                                                                                                    </View>
                                                                                                    <View style={{marginTop: 10}}>
                                                                                                        <Item>
                                                                                                            <Textarea rowSpan={5} style={{width: '100%'}}bordered placeholder="Instructions ..." onChangeText={text => this.setState({instructions: text})}/>
                                                                                                        </Item>
                                                                                                    </View>
                                                                                                   <View last style={{alignItems: 'center',justifyContent: 'center', marginTop: 15}}>
                                                                                                    {this.state.onProcess === false ?
                                                                                                        <Button onPress={this.onSubmit} style={{backgroundColor: 'black'}}>
                                                                                                            <Text>Add Day</Text>
                                                                                                        </Button> : <Spinner color="black"/>}
                                                                                                   </View>
                                                                                                   </View>
                                                                                                </Form>) : <View style={{justifyContent: 'center', alignItems: 'center'}}><Text>No body parts added. Please add them from admin dashboard</Text></View>}

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
  addButton: {
            position: 'absolute',
            right: 30,
            bottom: 30,
          },
  content: {
    margin: 15
  },
  cardText: {
    fontWeight: 'bold',
    fontSize: 20,
     color: 'white'
  },

      text: {
           color: '#3f2949',
           marginTop: 10
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

       }
})