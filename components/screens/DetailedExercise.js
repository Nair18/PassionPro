import React, { Component, Fragment,PureComponent } from 'react';
import {StyleSheet,View, TouchableOpacity, Modal,KeyboardAvoidingView, Alert, AppState, AsyncStorage, TextInput} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import MultiSelect from 'react-native-multiple-select';
import CreateStandardPlan from './CreateStandardPlan';
import PlanInfo from './PlanInfo';
import constants from '../constants'
import { Container, Accordion, Header, Content, Card, CardItem, List, Spinner, ListItem, Form, Textarea, Left, Item, Input, Body,Button, Picker, Right, Thumbnail, Text } from 'native-base';


export default class DetailedExercise extends PureComponent {
  static navigationOptions = {
    title: "Workouts",
    headerTitleStyle: { color: 'black', fontWeight: 'bold'},
    headerStyle: {backgroundColor: '#eadea6'},
    headerTintColor: 'black'
  }
  constructor(props){
    super(props);
    this.state = {
      modalVisible: false,
      selectedItems: [],
      auth_key: null,
      exerciseName: null,
      onProcess: false,
      name: this.props.navigation.state.params.name,
      id: this.props.navigation.state.params.ID,
      exerciseList: this.props.navigation.state.params.list
    };
  }
    setModalVisible(visible) {
      this.setState({modalVisible: visible});
    }

    setModalCancel = () => {
        this.setState({modalVisible: false})
    }
    onSelectedItemsChange = selectedItems => {
      this.setState({ selectedItems });
    };

  onSubmit = () => {
    this.setState({onProcess: true})
    fetch(constants.API + 'current/admin/gym/'+this.state.id+'/exercises', {
        method: 'POST',
                      headers: {
                          'Accept': 'application/json',
                          'Content-Type': 'application/json',
                          'Authorization': this.state.auth_key,
                      },
        body: JSON.stringify({
            "body_part": this.state.name,
            "exercise_name": this.state.exerciseName
        })}).then(res => {
            if(res.status === 200){
                Alert.alert(constants.success, 'Successfully added the exercise')
                this.setModalCancel()
                this.setState({onProcess: false})
                this.fetchDetails()
            }
            else{
                this.setState({onProcess: false})
                Alert.alert(constants.failed, constants.fail_error)
            }
        })

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
//                                    this.fetchDetails()
                                }
                           })
          });

      }

  componentWillUnmount() {
        // Remove the event listener
//        this.focusListener.remove();

   }
  fetchDetails = () => {
          let course_list = fetch(constants.API + 'current/admin/gym/'+ this.state.id + '/exercises', {
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
          ).then(res => this.setState({exerciseList: res[this.state.name] === undefined ? null : res[this.state.name]}, () => {
            if(res[this.state.name] === undefined){
                this.props.navigation.goBack()
            }
          }))
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
      archive_exercise = (id) => {
        console.log("exercise id", id)
        this.setState({onProcess: true})
        fetch(constants.API + 'current/admin/gym/'+ this.state.id + '/archive/exercises/'+id ,{
            method: 'PUT',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              'Authorization': this.state.auth_key,
            }
        }).then(res => {
            this.setState({onProcess: false})
            if(res.status === 200){
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
            }
        })
      }
      archive_exercise_alert = (id) => {
        Alert.alert('Delete Exercise', 'Are you sure you want to delete?',
            [
                {
                    text: 'Cancel',
                    style: 'cancel',
                },
                {text: 'OK', onPress: () => this.archive_exercise(id)},
            ],
        )
      }

  render() {

    return (
    <Fragment>
      <Container style={{backgroundColor: '#efe9cc'}}>

        <Content style={{margin: 15}}>
          <View style={{margin: 5}}><Text>Showing result for <Text style={{fontWeight: 'bold'}}>{this.state.name}</Text></Text></View>
          {this.state.exerciseList !== null  ? this.state.exerciseList.map(ex =>
          <View style={{margin: 5}}>
          <Card style={{backgroundColor: '#e3c4a8'}}>
            <CardItem style={{justifyContent: 'space-between', backgroundColor: '#e3c4a8'}}>
                <Text style={{color: 'black', fontWeight:'bold'}}>{ex["exercise_name"]}</Text>
                {this.state.onProcess == false ?
                <Icon size={15} name="md-close" onPress={() => this.archive_exercise_alert(ex["id"])}/> : <Spinner color="black"/>}
            </CardItem>
          </Card></View>): <Spinner color="black"/>}
        </Content>
        <View style={styles.addButton}>
                                      <Button rounded style={{height: 50, width: 50, alignItems: 'center', backgroundColor: 'black', justifyContent: 'center'}} onPress={() => this.setModalVisible(true)}>
                                        <Icon size={30} style={{color: 'white'}}name="md-add" />
                                      </Button>
                                    </View>
      </Container>
      <Modal
                animationType="slide"
                transparent={true}
                visible={this.state.modalVisible}
                onRequestClose={() => {
                  this.setModalVisible(false)
                }}>
                <View style={styles.modal}>
                <View>
                  <TouchableOpacity onPress={() => this.setModalVisible(false)}>
                  <Icon name="md-close" size={30}/>
                  </TouchableOpacity>
            </View>
                <Content style={styles.content}>
                  {this.state.exerciseList !== null && this.state.name !== null ?
                  (<Form>
                     <View style={{marginTop: 15}}>
                        <Text style={{fontWeight: 'bold'}}>Exercise Name</Text>
                     </View>
                     <Item regular>
                        <Input placeholder="eg. Bench Press" onChangeText={text => this.setState({exerciseName: text})}/>
                     </Item>
                     <View last style={{alignItems: 'center',justifyContent: 'center', marginTop: 15}}>
                     {this.state.onProcess === false ?
                     <Button block disabled={this.state.exerciseName === null || this.state.exerciseName === ""} onPress={this.onSubmit} style={{backgroundColor: 'black'}}>
                       <Text>Add Workout</Text>
                     </Button> : <Spinner color="black"/>}
                     </View>
                  </Form>) : <View style={{justifyContent: 'center', alignItems: 'center'}}><Text>loading ...</Text></View>}

                </Content>
                </View>
              </Modal>
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