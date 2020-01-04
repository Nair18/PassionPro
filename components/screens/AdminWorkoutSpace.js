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
          onProcess: false,
          onProcess: true
        }
    }
    static navigationOptions = {
                title: 'Workouts',
                headerTitleStyle: { color: constants.header_text, fontWeight: 'bold'},
                headerStyle: {backgroundColor: constants.header},
                headerTintColor: constants.header_text
              }
    showModal = () => {
        this.setState({isVisible: true})
    }

    selectExercise = (bodyparts) => {
        this.props.navigation.navigate('CreateWorkout', {bodyparts: bodyparts, exercise: this.state.exerciseList, gym_id: this.state.gym_id, plan_id: this.state.plan_id, day: (this.state.day).toString()});
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
                                                             constants.failed,
                                                             constants.fail_error,
                                                              [
                                                                  {text: 'OK', onPress: () => console.log('OK Pressed')},
                                                              ],
                                                              {cancelable: false},
                                                           );
                        }
                    }
                ).then(res => this.setState({exerciseList: res}, () => console.log(res))).then(
                    fetch(constants.API + 'current/admin/gym/'+ this.state.gym_id + '/plans/'+this.state.plan_id +'/days/' + this.state.day, {
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
                                                                           constants.failed,
                                                                           constants.fail_error,
                                                                            [
                                                                                {text: 'OK', onPress: () => console.log('OK Pressed')},
                                                                            ],
                                                                            {cancelable: false},
                                                                         );
                                      }
                                  }
                              ).then(res => this.setState({exercise: res}))
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
        this.setState({onProcess: true})
        fetch(constants.API + 'current/admin/gym/'+this.state.gym_id + '/archive/plan-day-exercise/'+ id, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': this.state.auth_key,
            }
        }).then(res => {
            if(res.status === 200){
                this.setState({onProcess: false})
                Alert.alert(constants.success, 'Successfully deleted the exercise')
                this.fetchDetails()

            }
            else if(res.status === 401){
                this.setState({onProcess: false})
                this.props.navigation.navigate('LandingPage')
            }
            else{
                this.setState({onProcess: false})
                Alert.alert(constants.failed, constants.fail_error)
                return
            }
        })
    }

    delete_exercisealert = (id) => {
        Alert.alert(constants.warning, 'Are you sure you want delete?',
            [
               {text: 'OK', onPress: () => this.delete_exercise(id)},
            ],
            {cancelable: false}
        )
    }

    render(){
        console.log("admin workout day", this.state.day)
        let bodyparts = []
        if(this.state.exerciseList !== null){
            for(var key in this.state.exerciseList){
                data = {
                        "id": key,
                        "name": key
                       }
                bodyparts.push(data)
            }
        }
        if(bodyparts.length === 0){
            bodyparts = null
        }
        return(
            <Container style={{backgroundColor: constants.screen_color}}>
                <ScrollView>

                <Content style={{margin: 15, padding: 10}}>
                    <View style={{padding: 10, backgroundColor: constants.yellow}}><Text><Text style={{fontWeight: 'bold'}}>{this.state.day}</Text> workouts</Text></View>
                    {this.state.exercise !== null && this.state.exerciseList !== null && this.state.onProcess == false ? this.state.exercise.map(exercise =>
                    <View>
                      <View>
                        <Card style={{borderRadius: 10, backgroundColor: constants.card_body}}>
                           <CardItem header style={{backgroundColor: constants.card_header, justifyContent: 'space-between', borderRadius: 10}}>
                              <Text style={{fontWeight: 'bold'}}>{exercise["exercise"]}</Text>
                              {this.state.onProcess == false ?
                              <View>
                                <Button bordered danger small onPress={(id) => {this.delete_exercisealert(exercise["id"])}}><Text>Delete</Text></Button>
                              </View> : <Spinner color="black"/>}
                           </CardItem>
                           <CardItem style={{flexDirection: 'row', backgroundColor: constants.card_body}}>
                              <Text style={{fontWeight: 'bold', flex: 1, fontSize: 15}}>Sets</Text>
                              <Text style={{fontWeight: 'bold', flex: 1, fontSize: 15}}>Weights</Text>
                              <Text style={{fontWeight: 'bold', flex: 1, fontSize: 15}}>Reps</Text>
                              <Text style={{fontWeight: 'bold', flex: 1, fontSize: 15}}>Duration</Text>
                           </CardItem>
                           <CardItem style={{flexDirection: 'row', backgroundColor: constants.card_body, borderRadius: 10}}>
                              <Text style={{fontWeight: 'bold', flex: 1, fontSize: 15}}>{exercise["sets"]}</Text>
                              <Text style={{fontWeight: 'bold', flex: 1, fontSize: 15}}>{exercise["weights"]}kg</Text>
                              <Text style={{fontWeight: 'bold', flex: 1, fontSize: 15}}>{exercise["reps"]}</Text>
                              <Text style={{fontWeight: 'bold', flex: 1, fontSize: 15}}>{exercise["duration"]}m</Text>
                           </CardItem>
                           {exercise["instructions"] !== null && exercise["instructions"].trim() !== "" ?
                           <View>
                            <CardItem style={{backgroundColor: constants.card_body, borderRadius: 10}}>
                              <Text style={{fontWeight: 'bold', fontSize: 15}}>Instructions </Text>
                            </CardItem>
                            <CardItem footer style={{backgroundColor: constants.card_body, borderRadius: 10}}>
                              <Text>{exercise["instructions"]}</Text>
                            </CardItem></View> : null}
                        </Card>
                      </View>
                    </View>) : <Spinner color="black" /> }
                    </Content>


                </ScrollView>
                {this.state.exercise !== null && this.state.exerciseList !== null ?

                                    <View style={styles.addButton}>
                                                        <TouchableOpacity onPress={() => this.selectExercise(bodyparts)}>
                                                        <Button rounded style={{height: 50, width: 50, alignItems: 'center', backgroundColor: 'black', justifyContent: 'center'}} onPress={() => this.selectExercise(bodyparts)}>
                                                          <Icon size={30} style={{color: 'white'}}name="md-add" />
                                                        </Button>
                                                        </TouchableOpacity>
                                                      </View>: null}
            </Container>
        );
    }
}

const styles = StyleSheet.create({
  addButton: {
    position: 'absolute',
    right: 30,
    bottom: 30,
  },
  content: {

  }
});