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


export default class TraineeMealSpace extends PureComponent {
  static navigationOptions = {
    title: 'Meal space',
    headerTitleStyle: { color: constants.header_text, fontWeight: 'bold'},
    headerStyle: {backgroundColor: constants.header},
    headerTintColor: constants.header_text
  }

  state = {
      modalVisible: false,
      selectedItems: [],
      auth_key: null,
      meals: null,
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
          fetch(constants.API + 'current/trainee/plans/meals', {
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
          ).then(res => this.setState({meals: res}, () => console.log(res)))
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
    exercises = []
    if(this.state.exerciseList !== null){
        for (var key in this.state.exerciseList) {
            exercises.push(key)
        }
    }
    console.log(exercises)
    return (
    <Fragment>
      <Container style={{backgroundColor: constants.screen_color}}>
        <Content style={{margin: 20}}>
          {this.state.meals !== null ? this.state.meals.map(meal =>
          <View style={{margin: 5}}>
          <TouchableOpacity activeOpacity={1} onPress={() => this.props.navigation.navigate('DaywiseMealTrainee', {details: meal})}>
          <Card style={{backgroundColor: constants.item_card}}>
            <CardItem style={{justifyContent: "space-between", backgroundColor: constants.item_card}}>
                <View>
                    <Text style={{color: 'black', fontWeight: 'bold'}}>{meal["name"]}</Text>
                    <Text>{meal["meal_plans"].length} meal(s)</Text>
                </View>
                <Icon style={{color: 'black'}} size={20} name="md-arrow-round-forward"/>
            </CardItem>
          </Card>
          </TouchableOpacity></View>): <Spinner color="black"/>}
        </Content>
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