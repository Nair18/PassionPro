import React, {Fragment,Component} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  FlatList,
  TextInput,
  Alert,
  AsyncStorage,
  View,ImageBackground
} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';
import ModalSelector from 'react-native-modal-selector';
import constants from '../constants';
import {Container, Accordion,Thumbnail, Spinner, List, Card, Input, Textarea, Item, ListItem,CheckBox, CardItem, Header, Title, Content, Button, Left, Body, Text,Right} from 'native-base';

export default class CreateWorkout extends Component {
    constructor(props){
        super(props);
        this.state = {
            set: null,
            weight: null,
            duration: null,
            rep: null,
            exercise_id: null,
            instruction: null,
            exercise: this.props.navigation.state.params.exercise,
            gym_id: this.props.navigation.state.params.gym_id,
            day: this.props.navigation.state.params.day,
            plan_id: this.props.navigation.state.params.plan_id,
            exerciseName: null,
            onProcess: false
        }
    }
    static navigationOptions = {
          title: 'Create Workout',
          headerTitleStyle: { color: 'black', fontWeight: 'bold'},
          headerStyle: {backgroundColor: 'white', elevation: 0},
          headerTintColor: 'black'
      }

    componentDidMount(){
                console.log("id has been retrieved", this.state.gym_id)
                console.log("exercise", this.state.exercise)
                const { navigation } = this.props;
                console.log("pagal bana rhe hai")
                this.focusListener = navigation.addListener('didFocus', () => {
                    console.log("The screen is focused")
                     var key  = this.retrieveItem('key').then(res =>
                                 this.setState({auth_key: res}, () => console.log("brother pls", res))
                                 ).then(() => {
                                      if(this.state.auth_key !== null){
//                                          this.fetchDetails()
                                      }
                                 })
                });

            }

      componentWillUnmount() {
              // Remove the event listener
      //        this.focusListener.remove();

      }

      fetchDetails = () => {
                this.setState({onProcess: true})
                console.log(this.state.gym_id, this.state.plan_id, this.state.day)
                let course_list = fetch(constants.API + 'current/admin/gym/'+ this.state.gym_id + '/plans/'+this.state.plan_id + '/days/'+this.state.day.toUpperCase(), {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization': this.state.auth_key,
                    },
                    body: JSON.stringify({
                         "duration": this.state.duration,
                          "exercise_id": parseInt(this.state.exercise_id),
                          "instruction": this.state.instruction,
                          "reps": this.state.rep,
                          "sets": this.state.set,
                          "weights": this.state.weight
                    })
                })
                .then(
                    res => {
                        if(res.status === 200){
                            this.setState({onProcess: false})
                            Alert.alert(
                               'Yayy!!',
                               'Workout added ...',
                               [
                                  {text: 'OK', onPress: () => console.log('OK Pressed')},
                               ],
                               {cancelable: false},
                            );
                        }
                        else{
                            this.setState({loading: false, onProcess: false})
                                                           console.log(this.state)
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

    render(){
        return(
            <Container>
                <Content style={{margin: 15}}>
                {this.state.exercise !== null ?
                    <View style={{marginTop: 15}}>
                        <View style={{margin: 15}}>
                                               <ModalSelector
                                                   placeholder="Select exercise"
                                                   initValue={this.state.exerciseName}
                                                   data={this.state.exercise}
                                                   keyExtractor= {item => item.id}
                                                   labelExtractor= {item => item.exercise_name}
                                                   initValue={this.state.exerciseName}
                                                   supportedOrientations={['landscape']}
                                                   accessible={true}
                                                   scrollViewAccessibilityLabel={'Scrollable options'}
                                                   cancelButtonAccessibilityLabel={'Cancel Button'}
                                                   onChange={(option)=>{
                                                    this.setState({exercise_id: option.id, exerciseName: option.exercise_name})
                                                   }}>

                                                   <TextInput
                                                     style={{borderWidth:1, borderColor:'#ccc', color: 'black',padding:10, height:50}}
                                                     editable={false}
                                                     placeholder="Select the course type"
                                                     value={this.state.exerciseName}
                                                   />
                                                 </ModalSelector>
                                       </View>
                        <View >
                            <Item style={{marginTop: 10}}>
                               <Input onChangeText = {text => this.setState({set: text})} keyboardType='numeric' placeholder="Sets"/>
                            </Item>
                            <Item style={{marginTop: 10}}>
                                <Input onChangeText = {text => this.setState({rep: text})} keyboardType='numeric' placeholder="Reps"/>
                            </Item>
                            <Item style={{marginTop: 10}}>
                                <Input onChangeText = {text => this.setState({weight: text})} keyboardType='numeric' placeholder="Weight(Kg)" />
                            </Item>
                            <Item style={{marginTop: 10}}>
                                <Input onChangeText = {text => this.setState({duration: parseInt(text)})} keyboardType='numeric' placeholder="Duration" />
                            </Item>
                            <Item regular style={{marginTop: 10}}>
                                <Textarea rowSpan={5} onChangeText = {text => this.setState({instruction: text})} placeholder="Instructions"/>
                            </Item>
                        </View>
                        {this.state.onProcess === false ?
                        <View style={{marginTop: 15, justifyContent: 'center', alignItems: 'center'}}>
                              <Button style={{backgroundColor: 'black'}} onPress={this.fetchDetails}><Text style={{color: 'white'}}>Save</Text></Button>
                        </View>: <Spinner color="black" />}
                    </View>
                    : <Spinner color="black"/>}
                </Content>
            </Container>
        );
    }
}