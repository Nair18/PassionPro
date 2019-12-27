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
import {Container, Accordion,Thumbnail, Spinner, List, Card, Input, Label,Textarea, Item, ListItem,CheckBox, CardItem, Header, Title, Content, Button, Left, Body, Text,Right} from 'native-base';

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
            bodyparts: this.props.navigation.state.params.bodyparts,
            exercise: this.props.navigation.state.params.exercise,
            gym_id: this.props.navigation.state.params.gym_id,
            day: this.props.navigation.state.params.day,
            plan_id: this.props.navigation.state.params.plan_id,
            exerciseName: null,
            type: this.props.navigation.state.params.type,
            onProcess: false,
            partName: '',
            day: null,
        }
    }
    static navigationOptions = {
          title: 'Add Workout',
          headerTitleStyle: { color: constants.header_text, fontWeight: 'bold'},
          headerStyle: {backgroundColor: constants.header},
          headerTintColor: constants.header_text
      }

    componentDidMount(){
                console.log("id has been retrieved", this.state.gym_id)
                console.log("exercise", this.state.exercise)
                const { navigation } = this.props;
                console.log("pagal bana rhe hai")
//                this.focusListener = navigation.addListener('didFocus', () => {
                    console.log("The screen is focused")
                     var key  = this.retrieveItem('key').then(res =>
                                 this.setState({auth_key: res}, () => console.log("brother pls", res))
                                 ).then(() => {
                                      if(this.state.auth_key !== null){
//                                         this.fetchDetails()
                                      }
                                 })
//                });

            }

      componentWillUnmount() {
              // Remove the event listener
      //        this.focusListener.remove();

      }

      fetchDetails = () => {
        console.log("fetch mei aaya")
        fetch(constants.API + 'current/admin/gyms/'+this.state.gym_id + '/exercises', {
           method: 'GET',
           headers: {
               'Accept': 'application/json',
               'Content-Type': 'application/json',
               'Authorization': this.state.auth_key,
           },
        }).then(res => {
            if(res.status === 200){
                return res.json()
            }
            else{
                Alert.alert(constants.failed, constants.fail_error)
                return null
            }
        }).then(
            res => {
                if(res !== null && this.state.exercise){
                    this.setState({exerciseList: res[this.state.exercise]}, () => console.log(res[this.state.exercise]))
                }
            }
        )
      }
      onSubmit = () => {
                if(this.state.day === null || this.state.exercise_id === null || this.state.bodyparts === null){
                    Alert.alert("All * fields are mandatory")
                    return
                }
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
                         "duration": parseInt(this.state.duration),
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
                               constants.success,
                               'Successfully added the workout',
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
                                                             constants.failed,
                                                             'Something went wrong',
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
        let days = [{"id": "MONDAY", "name": "MONDAY"},{"id": "TUESDAY", "name": "TUESDAY"},{"id": "WEDNESDAY", "name": "WEDNESDAY"},{"id": "THURSDAY", "name": "THURSDAY"},{"id": "FRIDAY", "name": "FRIDAY"},{"id": "SATURDAY", "name": "SATURDAY"},{"id": "SUNDAY", "name": "SUNDAY"}]
        return(
            <Container>
                <Content style={{margin: 15}}>
                {this.state.exercise !== null && this.state.bodyparts !== null || this.state.exercise !== undefined ?
                    <View style={{marginTop: 15}}>
                        {this.state.type !== 'workout' ?
                        <View style={{margin: 10}}>
                                                      <Label>Select Day <Text style={{color: 'red'}}>*</Text></Label>
                                                      <ModalSelector
                                                          placeholder="Select Day"
                                                          initValue={this.state.day}
                                                          data={days}
                                                          keyExtractor= {item => item.id}
                                                          labelExtractor= {item => item.name}
                                                          supportedOrientations={['landscape']}
                                                          accessible={true}
                                                          scrollViewAccessibilityLabel={'Scrollable options'}
                                                          cancelButtonAccessibilityLabel={'Cancel Button'}
                                                          onChange={(option)=>{
                                                              this.setState({day: option.id})
                                                          }}>

                                                          <TextInput
                                                              style={{borderWidth:1, borderColor:'#ccc', color: 'black',padding:10, height:50}}
                                                              editable={false}
                                                              placeholder="Select Exercise"
                                                              value={this.state.day}
                                                          />
                                                      </ModalSelector>
                                                </View> : null}
                        <View style={{margin: 10}}>
                              <Label>Body parts <Text style={{color: 'red'}}>*</Text></Label>
                              <ModalSelector
                                  placeholder="Select body part"
                                  initValue={this.state.partName}
                                  data={this.state.bodyparts}
                                  keyExtractor= {item => item.id}
                                  labelExtractor= {item => item.name}
                                  supportedOrientations={['landscape']}
                                  accessible={true}
                                  scrollViewAccessibilityLabel={'Scrollable options'}
                                  cancelButtonAccessibilityLabel={'Cancel Button'}
                                  onChange={(option)=>{
                                      this.setState({partName: option.name})
                                  }}>

                                  <TextInput
                                      style={{borderWidth:1, borderColor:'#ccc', color: 'black',padding:10, height:50}}
                                      editable={false}
                                      placeholder="Select body part"
                                      value={this.state.partName}
                                  />
                              </ModalSelector>
                        </View>
                        <View style={{margin: 10}}>
                            <Label>Exercise <Text style={{color: 'red'}}>*</Text></Label>
                                               <ModalSelector
                                                   placeholder="Select Exercise"
                                                   initValue={this.state.exerciseName}
                                                   data={this.state.exercise[this.state.partName]}
                                                   keyExtractor= {item => item.id}
                                                   labelExtractor= {item => item.exercise_name}
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
                                                     placeholder="Select Exercise"
                                                     value={this.state.exerciseName}
                                                   />
                                                 </ModalSelector>
                                       </View>
                        <View >
                            <Item style={{marginTop: 10}}>
                               <Label>Sets - </Label>
                                <Input onChangeText = {text => this.setState({set: text})} keyboardType='numeric' />
                            </Item>
                            <Item style={{marginTop: 10}}>
                                <Label>Reps - </Label>
                                <Input onChangeText = {text => this.setState({rep: text})} keyboardType='numeric'/>
                            </Item>
                            <Item style={{marginTop: 10}}>
                                <Label>Weight(kg) - </Label>
                                <Input onChangeText = {text => this.setState({weight: text})} keyboardType='numeric'/>
                            </Item>
                            <Item style={{marginTop: 10}}>
                                <Label>Duration(min) - </Label>
                                <Input onChangeText = {text => this.setState({duration: parseInt(text)})} keyboardType='numeric'/>
                            </Item>
                            <Item style={{marginTop: 10}}>
                                <Label>Instruction - </Label>
                                <Input rowSpan={2} onChangeText = {text => this.setState({instruction: text})}/>
                            </Item>
                        </View>
                        {this.state.onProcess === false ?
                        <View style={{marginTop: 15, justifyContent: 'center', alignItems: 'center'}}>
                              <Button style={{backgroundColor: 'black'}} onPress={this.onSubmit}><Text style={{color: 'white'}}>Add workout</Text></Button>
                        </View>: <Spinner color="black" />}
                    </View>
                    : <Spinner color="black"/>}
                </Content>
            </Container>
        );
    }
}