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
  View,
} from 'react-native';
import Workspace from './workspace';
import Courses from './Courses';
import Clients from './Clients';
import Plans from './Plans';
import Trainer from './Trainer';
import ModalSelector from 'react-native-modal-selector';
import {Agenda} from 'react-native-calendars';
import Icon from 'react-native-vector-icons/Ionicons';
import {Calendar} from 'react-native-calendars';
import TrainerCreateWorkout from './TrainerCreateWorkout';
import constants from '../constants';
import {Container, Accordion,Thumbnail, Card,List, Form, Label,ListItem,Spinner, Input, Item,Textarea, CheckBox, CardItem,Tab,Tabs, Header, Title, Content, Button, Left, Body, Text,Right} from 'native-base';

export default class TrainerWorkout extends Component {
    constructor(props){
        super(props)
        this.state={
          isVisible: false,
          workouts: this.props.navigation.state.params.workouts,
          plan_id: this.props.navigation.state.params.plan_id,
          trainee_id: this.props.navigation.state.params.trainee_id,
          day: this.props.navigation.state.params.day,
          partName: null,
          workoutDetails: null,
          exercise_id: null,
          exerciseName: null,
          instructions: null,
          reps: null,
          onProcess: false,
          sets: null,
          durations: "0",
          weights: "0",
          body_parts: this.props.navigation.state.params.body_parts,
          exerciseList: this.props.navigation.state.params.exerciseList
        }
    }
    static navigationOptions = {
                title: 'Workouts',
                headerTitleStyle: { color: constants.header_text, fontWeight: 'bold'},
                headerStyle: {backgroundColor: constants.header},
                headerTintColor: constants.header_text
              }
    showModal = (bool) => {
        this.setState({isVisible: bool})
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
//                                            this.fetchDetails()
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
                fetch(constants.API + 'current/trainer/trainees/'+this.state.trainee_id +"/plans/"+this.state.plan_id+'/days/'+this.state.day, {
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
                ).then(res => this.setState({workouts: res}))
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
                                    Alert.alert(constants.success, 'Successfully added a workout')
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

    selectExercise = (index) => {
        console.log("index", index)
        this.props.navigation.navigate('TrainerCreateWorkout');
        this.setState({isVisible: false})
    }
    _delete = (id) => {
        this.setState({onProcess: true})
        fetch(constants.API + 'current/trainer/trainees/archive/plan-day-exercise/'+id, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': this.state.auth_key,
            }
        }).then(res => {
            this.setState({onProcess: false})
            if(res.status === 200){
                Alert.alert(constants.success, 'Successfully deleted the workout')
                this.fetchDetails()
            }
            else if(res.status === 401){
                this.props.navigation.navigate('LandingPage')
            }
            else{
                Alert.alert(constants.failed, constants.fail_error)
            }
        })
    }
    _deleteCard = (id) => {
        Alert.alert(
            constants.warning,
            'Are you sure you want to delete?',
            [
                {text: 'OK', onPress: () => this._delete(id)},
                {text: 'cancel', onPress: () => console.log("ok pressed")}
            ],
            {cancelable: false}
        )
    }
    render(){
        return(
            <Container style={{backgroundColor: constants.screen_color}}>
                <ScrollView>
                <Content style={{margin: 15}}>
                    {this.state.workouts !== null ? this.state.workouts.map(workout =>
                    <View>
                        <Card>
                           <CardItem header style={{backgroundColor: '#393e46'}}>
                              <Left>
                                <Text style={{fontWeight: 'bold', color: 'white'}}>{workout["exercise"]}</Text>
                              </Left>
                              <Right>
                                {this.state.onProcess === false ?
                                <Icon onPress={() => this._deleteCard(workout["id"])} style={{color: 'white'}} size={20} name="md-close" /> : <Spinner color='black' />}
                              </Right>
                           </CardItem>
                           <CardItem style={{flexDirection: 'row', backgroundColor: '#ebe6e6'}}>
                              <Text style={{fontWeight: 'bold', flex: 1, fontSize: 15}}>Sets</Text>
                              <Text style={{fontWeight: 'bold', flex: 1, fontSize: 15}}>Weights</Text>
                              <Text style={{fontWeight: 'bold', flex: 1, fontSize: 15}}>Reps</Text>
                              <Text style={{fontWeight: 'bold', flex: 1, fontSize: 15}}>Duration</Text>
                           </CardItem>
                           <CardItem style={{flexDirection: 'row', backgroundColor: '#ebe6e6'}}>
                              <Text style={{fontWeight: 'bold', flex: 1, fontSize: 15}}>{workout["sets"]}</Text>
                              <Text style={{fontWeight: 'bold', flex: 1, fontSize: 15}}>{workout["weights"]}kg</Text>
                              <Text style={{fontWeight: 'bold', flex: 1, fontSize: 15}}>{workout["reps"]}</Text>
                              <Text style={{fontWeight: 'bold', flex: 1, fontSize: 15}}>{workout["duration"]}m</Text>
                           </CardItem>
                           {workout["instructions"] !== null ?
                           <CardItem style={{backgroundColor: '#ebe6e6'}}>
                              <Text><Text style={{fontWeight: 'bold'}}>Instructions: </Text>{workout["instructions"]}</Text>
                           </CardItem> : null }

                        </Card>
                    </View>): <View style={{justifyContent: 'center', alignItems: 'center'}}><Spinner color="black" /></View>}

                </Content>
                </ScrollView>
                <View style={styles.addButton}>
                  <Button  rounded style={{height: 50, width: 50, alignItems: 'center', backgroundColor: 'black', justifyContent: 'center'}} onPress={() => this.showModal(true)}>
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

                                                                                                                {this.state.body_parts !== null ?
                                                                                                                (<Form>
                                                                                                                   <View style={{margin: 15}}>

                                                                                                                   <View style={{marginTop: 10}}>
                                                                                                                       <Label><Text style={{fontWeight: 'bold'}}>Body part</Text><Text style={{color: 'red'}}>*</Text></Label>
                                                                                                                          <ModalSelector
                                                                                                                              placeholder="Select body part"
                                                                                                                              initValue={this.state.partName}
                                                                                                                              data={this.state.body_parts}
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
                                                                                                                            <Text>Add workout</Text>
                                                                                                                        </Button> : <Spinner color="black"/>}
                                                                                                                   </View>
                                                                                                                   </View>
                                                                                                                </Form>) : <View style={{justifyContent: 'center', alignItems: 'center'}}><Text>No body parts added. Please add it from the admin dashboard</Text></View>}

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