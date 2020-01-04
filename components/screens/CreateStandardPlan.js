import React, { Component, Fragment } from 'react';
import {StyleSheet,View, StatusBar, ScrollView,Picker, TouchableOpacity, Modal, Alert,KeyboardAvoidingView, AsyncStorage, TextInput} from 'react-native';
import {Container, Content,Input,Item,Button, Text,Card,CardItem,Label,Spinner, Body,Form,Textarea } from 'native-base';
import ModalSelector from 'react-native-modal-selector';
import { Header } from 'react-navigation-stack';
import constants from '../constants';
import PageLoader from './PageLoader';
import Icon from 'react-native-vector-icons/Ionicons';


export default class CreateStandardPlan extends Component {
  constructor(props){
    super(props)
    this.state = {
      name: null,
      description: "",
      coursetype: this.props.navigation.state.params.coursetype,
      course_type: null,
      courseTypeName: null,
      id: this.props.navigation.state.params.ID,
      visible: false,
      onProcess: false
    }
  }


  static navigationOptions = {
    title: 'Create Workout Plan',
    headerTitleStyle: { color: 'black', fontWeight: 'bold'},
    headerStyle: {backgroundColor: 'white', elevation: 0},
    headerTintColor: 'black'
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
  componentDidMount(){
    console.log("id has been retrieved", this.state.id)

              const { navigation } = this.props;
              console.log("pagal bana rhe hai")
//              this.focusListener = navigation.addListener('didFocus', () => {
                    console.log("The screen is focused")
                    var key  = this.retrieveItem('key').then(res =>
                                 this.setState({auth_key: res}, () => console.log("brother pls", res))
                                 ).then(() => {
                                      if(this.state.auth_key !== null){
//                                          this.fetchDetails()
                                      }
                                 })
//              });

  }


  onSelectedItemsChange = selectedItem => {
      this.setState({ selectedItem });
    };
  setModalVisible = (bool) => {
    this.setState({visible: bool})
  }
    _back = () => {
      if(this.state.name == null){
        Alert.alert(constants.incomplete_info, 'All * fields are mandatory')
        return
      }
      this.setState({onProcess: true})
      fetch(constants.API + 'current/admin/gym/'+ this.state.id + '/plans', {
                              method: 'POST',
                              headers: {
                                  'Accept': 'application/json',
                                  'Content-Type': 'application/json',
                                  'Authorization': this.state.auth_key,
                              },
                              body: JSON.stringify({
                                "name": this.state.name,
                                "description": this.state.description
                              })
                          }).then(res => {

                            this.setState({onProcess: false})
                            if(res.status == 200){

                                Alert.alert('✅ Success', 'Successfully added the plan')
                                this.props.navigation.goBack(this.props.navigation.goBack())
                            }
                            else if(res.status == 401){
                               this.props.navigation.navigate('LandingPage')
                            }
                            else{

                                Alert.alert(constants.failed, constants.fail_error)
                            }
                          })


    }
    render(){


      return(
        <Fragment>
           <StatusBar backgroundColor='black' barStyle='light-content' />
           <Container style={{padding: 15}}>
              {this.state.coursetype !== null ?
              <ScrollView showsVerticalScrollIndicator={false}>

                <Content>
                  <View style={styles.input}>
                    <Label><Text style={{fontWeight: 'bold'}}>Plan name<Text style={{color: 'red'}}>*</Text></Text></Label>
                    <Item regular>
                      <Input placeholder="Name of the Plan" onChangeText = {text => this.setState({name: text})}/>
                    </Item>
                  </View>
                  <View style={styles.input}>
                    <Label><Text style={{fontWeight: 'bold'}}>Description</Text></Label>
                    <Item regular>
                      <Textarea rowSpan={5} onChangeText = {text => this.setState({description: text})} placeholder="Description of the plan(Optional)" />
                    </Item>
                  </View>

                  <View style={styles.buttonView}>
                    {this.state.onProcess == false ?
                    <TouchableOpacity>
                      <Button style={styles.button} onPress={this._back}><Text>Create Plan</Text></Button>
                    </TouchableOpacity> : <Spinner color="black" />}
                  </View>

                </Content>
              </ScrollView> : <PageLoader />}
           </Container>
        </Fragment>
      );
    }
  }

  const styles = StyleSheet.create({
    input: {
      marginTop: 15
    },
    headings: {
      fontWeight: 'bold'
    },
    card_header: {
      justifyContent: 'center',
      alignItems: 'center'
    },
    background: {
      backgroundColor: 'grey'
    },
    buttonView: {
      marginTop: 15,
      justifyContent: 'center',
      alignItems: 'center'
    },
    button: {
      backgroundColor: constants.header
    }
  });