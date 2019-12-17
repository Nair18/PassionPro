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


export default class AddExercise extends PureComponent {
  static navigationOptions = {
    title: 'Exercise',
    headerTitleStyle: { color: 'black', fontWeight: 'bold'},
    headerStyle: {backgroundColor: '#eadea6'},
    headerTintColor: 'black'
  }

  state = {
      modalVisible: false,
      selectedItems: [],
      auth_key: null,
      exerciseName: null,
      body_part: null,
      onProcess: false,
      plan: "Select your plan",
      id: this.props.navigation.state.params.ID,
      exerciseList: null
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
          fetch(constants.API + 'current/admin/gym/'+ this.state.id + '/exercises', {
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
          ).then(res => this.setState({exerciseList: res}, () => console.log(res)))
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
      <Container style={{backgroundColor: '#efe9cc'}}>
        <Content style={{margin: 20}}>
          {this.state.exerciseList !== null ? exercises.map(ex =>
          <View style={{margin: 5}}>
          <TouchableOpacity activeOpacity={1} onPress={() => this.props.navigation.navigate('DetailedExercise', {list: this.state.exerciseList[ex], ID: this.state.id, name: ex})}>
          <Card style={{backgroundColor: '#e3c4a8'}}>
            <CardItem style={{justifyContent: "space-between", backgroundColor: '#e3c4a8'}}>
                <Text style={{color: 'black', fontWeight: 'bold'}}>{ex}</Text>
                <Icon style={{color: 'black'}} size={20} name="md-arrow-dropright"/>
            </CardItem>
          </Card>
          </TouchableOpacity></View>): <Spinner color="black"/>}
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

                           <Item regular style={{padding: 5}}>
                              <Label>Body part<Text style={{color: 'red', fontWeight: 'bold'}}>*</Text> - </Label>
                              <Input placeholder="eg. Biceps" onChangeText={text => this.setState({body_part: text})}/>
                           </Item>

                           <Item regular style={{padding: 5}}>
                              <Label>Exercise<Text style={{color: 'red',fontWeight: 'bold'}}>*</Text> - </Label>
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