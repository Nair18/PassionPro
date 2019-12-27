import React, { Component, Fragment,PureComponent } from 'react';
import {StyleSheet,View, TouchableOpacity, Modal, Alert,TextInput, AppState, AsyncStorage} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import MultiSelect from 'react-native-multiple-select';
import ModalSelector from 'react-native-modal-selector';
import CreateStandardPlan from './CreateStandardPlan';
import PlanInfo from './PlanInfo';
import constants from '../constants';
import DetailedExercise from './DetailedExercise'
import { Container, Accordion, Header, Content, Card, CardItem,Label, List, Spinner, ListItem, Form, Textarea, Left, Item, Input, Body,Button, Picker, Right, Thumbnail, Text } from 'native-base';


export default class TraineeWorkspace extends PureComponent {
  static navigationOptions = {
    title: 'Workout space',
    headerTitleStyle: { color: constants.header_text, fontWeight: 'bold'},
    headerStyle: {backgroundColor: constants.header},
    headerTintColor: constants.header_text
  }

  state = {
      modalVisible: false,
      selectedItems: [],
      auth_key: null,
      workouts: null,
      onProcess: false,
    };

    setModalVisible(visible) {
      this.setState({modalVisible: visible});
    }


    onSelectedItemsChange = selectedItems => {
      this.setState({ selectedItems });
    };

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
          fetch(constants.API + 'current/trainee/plans/workouts', {
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
          ).then(res => this.setState({workouts: res}, () => console.log(res)))
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
    if(this.state.body_part === null || this.state.exerciseName === null){
        Alert.alert(constants.incomplete_info, '')
    }
    this.setState({onProcess: true})
    fetch(constants.API + 'current/admin/gym/'+ this.state.id +'/exercises', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': this.state.auth_key,
        },
        body: JSON.stringify({
            "body_part": this.state.body_part,
            "exercise_name": this.state.exerciseName
        })
    }).then(res => {
        this.setState({onProcess: false, modalVisible: false}, () => this.fetchDetails())
        if(res.status === 200){
            Alert.alert(constants.success, 'Successfully added Body part and Exercise')
        }
        else if(res.status === 401){
            this.setModalVisible(false)
            this.props.navigation.navigate('LandingPage')
            return
        }
        else{
            Alert.alert(constants.failed, constants.fail_error)
            return
        }
    })
  }
  render() {
    let pt = []
    let sp = []
    if(this.state.workouts !== null){
        pt = this.state.workouts.filter((val) => {
            return val["standard"] === false
        })

        sp = this.state.workouts.filter((val) => {
            return val["standard"] === true
        })
    }
    return (
    <Fragment>
      <Container style={{backgroundColor: constants.screen_color}}>
       {this.state.workouts !== null ?
        <Content style={{margin: 5}}>
          <View style={{margin: 10}}>
            <Text style={{fontWeight: 'bold'}}>Personal Training Section</Text>
          </View>
          {pt.length > 0 ? pt.map(wk =>
          <View style={{margin: 10}}>
          <TouchableOpacity activeOpacity={1} onPress={() => this.props.navigation.navigate('DaywiseWorkoutTrainee', {details: wk})}>
          <Card style={{backgroundColor: constants.item_card}}>
            <CardItem style={{justifyContent: "space-between", backgroundColor: constants.item_card}}>
                <View>
                    <Text style={{color: 'black', fontWeight: 'bold'}}>{wk["name"]}</Text>
                    <Text>{wk["plans"].length} workout(s)</Text>
                </View>
                <Icon style={{color: 'black'}} size={20} name="md-arrow-round-forward"/>
            </CardItem>
          </Card>
          </TouchableOpacity></View>) : <Card style={{padding: 10, alignItems: 'center', justifyContent: 'center'}}><Text note>Nothing to show</Text></Card> }
          <View style={{margin: 10}}>
            <Text style={{fontWeight: 'bold'}}>Standard Plans</Text>
          </View>
          {sp.length > 0 ? sp.map( wk =>
          <View style={{margin: 10}}>
            <TouchableOpacity activeOpacity={1} onPress={() => this.props.navigation.navigate('DaywiseWorkoutTrainee', {details: wk})}>
               <Card style={{backgroundColor: constants.item_card}}>
                  <CardItem style={{justifyContent: "space-between", backgroundColor: constants.item_card}}>
                     <View>
                        <Text style={{color: 'black', fontWeight: 'bold'}}>{wk["name"]}</Text>
                        <Text>{wk["plans"].length} workout(s)</Text>
                     </View>
                     <Icon style={{color: 'black'}} size={20} name="md-arrow-round-forward"/>
                  </CardItem>
               </Card>
            </TouchableOpacity>
          </View>) : <Card style={{padding: 10, alignItems: 'center', justifyContent: 'center'}}><Text note>Nothing to show</Text></Card> }

        </Content> : <Spinner color="black"/>}
      </Container>
     </Fragment>
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
    margin: 15
  },
  modal: {
          backgroundColor : "#fff",
          height: 300 ,
          width: '80%',
          borderRadius:10,
          borderWidth: 1,
          borderColor: '#fff',
          marginTop: 80,
          marginLeft: 40,
          padding: 15
      }
});