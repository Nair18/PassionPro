import React, {Fragment,Component} from 'react';
import Uploader from './Uploader';
import {
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  AsyncStorage,
  TouchableNativeFeedback,
  StatusBar,
  Modal,
  Alert,
  TouchableHighlight,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {Calendar} from 'react-native-calendars';
import CreateWorkout from './CreateWorkout';
import constants from '../constants';
import {Container, Accordion,Thumbnail,Spinner, Card,List, ListItem, Textarea, Item, CheckBox, CardItem,Tab,Tabs, Header, Title, Content, Button, Left, Body, Text,Right} from 'native-base';

export default class AdminWorkoutSpace extends Component {
    constructor(props){
        super(props)
        this.state={
          isVisible: false,
          plan_id: this.props.navigation.state.params.plan_id,
          exercise: this.props.navigation.state.params.plan_data,
          day: this.props.navigation.state.params.plan_day,
          gym_id: this.props.navigation.state.params.gym_id,
          exerciseList: null,
          onProcess: true
        }
    }
    static navigationOptions = {
                title: 'Workouts',
                headerTitleStyle: { color: 'black', fontWeight: 'bold'},
                headerStyle: {backgroundColor: '#eadea6'},
                headerTintColor: 'black'
              }
    showModal = () => {
        this.setState({isVisible: true})
    }

    selectExercise = (index) => {
        console.log("index", index["ex"])
        this.props.navigation.navigate('CreateWorkout', {exercise: this.state.exerciseList[index["ex"]], gym_id: this.state.gym_id, plan_id: this.state.plan_id, day: this.state.day});
        this.setState({isVisible: false})
    }

    componentDidMount(){
                console.log("id has been retrieved", this.state.gym_id)
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
                })

            }

      componentWillUnmount() {
              // Remove the event listener
              this.focusListener.remove();

      }

      fetchDetails = () => {
                let course_list = fetch(constants.API + 'current/admin/gym/'+ this.state.gym_id + '/exercises', {
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
                                                             'OOps!',
                                                             'Something went wrong ...',
                                                              [
                                                                  {text: 'OK', onPress: () => console.log('OK Pressed')},
                                                              ],
                                                              {cancelable: false},
                                                           );
                        }
                    }
                ).then(res => this.setState({exerciseList: res}, () => console.log(res))).then(
                    fetch(constants.API + 'current/admin/gym/'+ this.state.gym_id + '/plans/'+this.state.plan_id, {
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
                                          this.setState({onProcess: false})
                                          return res.json()
                                      }
                                      else{
                                          this.setState({loading: false, onProcess: false})
                                                                         Alert.alert(
                                                                           'OOps!',
                                                                           'Something went wrong ...',
                                                                            [
                                                                                {text: 'OK', onPress: () => console.log('OK Pressed')},
                                                                            ],
                                                                            {cancelable: false},
                                                                         );
                                      }
                                  }
                              ).then(res => this.setState({exercise: res["plans"]}))
                )


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

    delete_exercise = (id) => {
        console.log("id boy", id)
    }


    render(){
        let exercise = ['Triceps', 'Chest', 'Shoulders', 'Biceps', 'Core', 'Back', 'Forearms', 'Upper Legs', 'Glutes', 'Cardio', 'Calves']

        return(
            <Container style={{backgroundColor: '#efe9cc'}}>
                <ScrollView>

                <Content style={{margin: 15, padding: 10}}>
                    {this.state.exercise !== null && this.state.exerciseList !== null && this.state.onProcess == false ? this.state.exercise.map(exercise =>
                    <View>
                        <Card>
                           <CardItem header style={{backgroundColor: '#d7c79e', justifyContent: 'space-between'}}>
                              <Text style={{fontWeight: 'bold'}}>{exercise["exercise"]}</Text>
                                <Button bordered danger small onPress={(id) => {this.delete_exercise(exercise["id"])}}><Text>Delete</Text></Button>
                           </CardItem>
                           <CardItem style={{flexDirection: 'row'}}>
                              <Text style={{fontWeight: 'bold', flex: 1, fontSize: 15}}>Sets</Text>
                              <Text style={{fontWeight: 'bold', flex: 1, fontSize: 15}}>Weights</Text>
                              <Text style={{fontWeight: 'bold', flex: 1, fontSize: 15}}>Reps</Text>
                              <Text style={{fontWeight: 'bold', flex: 1, fontSize: 15}}>Duration</Text>
                           </CardItem>
                           <CardItem style={{flexDirection: 'row'}}>
                              <Text style={{fontWeight: 'bold', flex: 1, fontSize: 15}}>{exercise["sets"]}</Text>
                              <Text style={{fontWeight: 'bold', flex: 1, fontSize: 15}}>{exercise["weights"]}kg</Text>
                              <Text style={{fontWeight: 'bold', flex: 1, fontSize: 15}}>{exercise["reps"]}</Text>
                              <Text style={{fontWeight: 'bold', flex: 1, fontSize: 15}}>{exercise["duration"]}m</Text>
                           </CardItem>
                           {exercise["instructions"] !== null && exercise["instructions"].trim() !== "" ?
                           <View>
                            <CardItem>
                              <Text style={{fontWeight: 'bold', fontSize: 15}}>Instructions </Text>
                            </CardItem>
                            <CardItem>
                              <Text>{exercise["instructions"]}</Text>
                            </CardItem></View> : null}
                        </Card>
                    </View>) : <Spinner color="black" /> }

                    <View style={{justifyContent: 'center', alignItems: 'center', margin: 25}}>
                                                                    <Button disabled={this.state.exercise === null && this.state.exerciseList === null} onPress={this.showModal} style={{backgroundColor: 'black'}}><Text style={{color: 'white'}}>Add workout</Text></Button>
                                                                </View>
                </Content>
                </ScrollView>
                <Modal
                                    animationType = {"fade"}
                                    transparent = {false}

                                    visible = {this.state.isVisible}
                                    onRequestClose = {() =>{ this.setState({isVisible: false}) } }>
                                    {/*All views of Modal*/}
                                    <Content>
                                     <View  style={{minHeight: 500, width: '100%'}}  >
                                        <View style={{margin: 15}}>
                                            <TouchableOpacity onPress={() => {this.setState({isVisible: false})}}>
                                                <Icon size={25} name="md-arrow-back"/>
                                            </TouchableOpacity>
                                        </View>

                                        <View style={{marginTop: 15}}>
                                            <ScrollView>
                                              {exercise.map( (ex,index) =>
                                                <List>
                                                    <ListItem button onPress={() => this.selectExercise({ex})}>
                                                        <Text>{ex}</Text>
                                                    </ListItem>
                                                </List>
                                              )}
                                            </ScrollView>
                                        </View>
                                        <View style={{marginTop: 25}}>
                                        </View>
                                    </View>
                                    </Content>
                </Modal>
            </Container>
        );
    }
}