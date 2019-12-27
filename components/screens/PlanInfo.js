import React, { Component, Fragment } from 'react';
import {StyleSheet,View, AsyncStorage, StatusBar, ScrollView,Picker, Image, TouchableOpacity, Modal, Alert,KeyboardAvoidingView, TextInput} from 'react-native';
import {Container, Spinner, Content,Input,Item,Button, Text,Card,CardItem,Body,Form,Textarea, Thumbnail } from 'native-base';

import { Header } from 'react-navigation-stack';
import AdminWorkoutSpace from './AdminWorkoutSpace';
import Icon from 'react-native-vector-icons/Ionicons';
import MultiSelect from 'react-native-multiple-select';
import constants from '../constants';
export default class CreateStandardPlan extends Component {
  constructor(props){
    super(props)
    this.state = {
      plan_data: this.props.navigation.state.params.plan_data,
      plan_id: this.props.navigation.state.params.plan_id,
      gym_id: this.props.navigation.state.params.gym_id,
      modalVisible: false,
      onProcess: false,
      name: null,
      exerciseList: null,
      description: null,
      data: [
             {
               "Day": 'Monday',
             },
             {
               "Day": 'Tuesday',
             },
             {
               "Day": 'Wednesday',
             },
             {
               "Day": 'Thursday',
             },
             {
               "Day": 'Friday',
             },
             {
               "Day": 'Saturday',
             },
             {
               "Day": 'Sunday',
             }
      ],

      selectedItem: [],
      visible: false
    }
  }

  componentDidMount(){
            console.log("id has been retrieved", this.state.gym_id)
            this.setState({name: this.state.plan_data["name"], description: this.state.plan_data["description"]})
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

  static navigationOptions = {
    title: 'Plan Info',
    headerTitleStyle: { color: constants.header_text, fontWeight: 'bold'},
    headerStyle: {backgroundColor: constants.header},
    headerTintColor: constants.header_text
  }

  onSelectedItemsChange = selectedItem => {
      this.setState({ selectedItem });
    };
  setModalVisible = (bool) => {
    this.setState({modalVisible: bool})
  }

  _back = () => {
      this.props.navigation.goBack(this.props.navigation.state.params.go_back_key)

  }

  fetchDetails = () => {
    fetch(constants.API + 'current/admin/gym/'+this.state.gym_id+'/plans/'+this.state.plan_id, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': this.state.auth_key
        }
    }).then(res => {
        if(res.status === 200){
            return res.json()
        }
        else if(res.status === 401){
            this.props.navigation.navigate('LandingPage')
        }
        else{
            Alert.alert(constants.failed, constants.fail_error)
        }
    }).then(res => this.setState({plan_data: res}, () => {
        fetch(constants.API + 'current/admin/gym/' + this.state.gym_id + '/exercises', {
            method: 'GET',
            headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': this.state.auth_key
            }
        }).then(response => {
            if(res.status === 200){
                return res.json()
            }
            else if(res.status === 401){
                this.props.navigation.navigate('LandingPage')
            }
            else{
                Alert.alert(constants.failed, constants.fail_error)
            }
        }).then(res => this.setState({exerciseList: res}))
    }))
  }

  onSubmit = () => {
    this.setState({onProcess: true})
    fetch(constants.API + 'current/admin/gym/'+ this.state.gym_id + '/plans/'+ this.state.plan_id, {
        method: 'PUT',
        headers: {
           'Accept': 'application/json',
           'Content-Type': 'application/json',
           'Authorization': this.state.auth_key
        },
        body: JSON.stringify({
            "name": this.state.name,
            "description": this.state.description
        })
    }).then(res => {
        this.setState({onProcess: false})
        if(res.status === 200){
            Alert.alert(constants.success, "Successfully updated")
            return fetchDetails()
        }
        else if(res.status === 401){
            this.props.navigation.navigate('LandingPage')
        }
        else{
            Alert.alert(constants.failed, constants.fail_error)
        }
    })
  }

  render(){
      let card = []
      let bodyparts = []
      if(this.state.exerciseList !== null){
          console.log("exercise list", this.state.exerciseList)
          for(var key in this.state.exerciseList){
             data = {
                "id": key,
                "name": key
             }
             bodyparts.push(data)
          }
      }
      console.log("plan info", bodyparts)
      for(let i=0;i<this.state.data.length && this.state.plan_data !== null ;i++){
        card.push(
          <TouchableOpacity activeOpacity={1} onPress={() => this.props.navigation.navigate('AdminWorkoutSpace', {plan_day: this.state.data[i]["Day"],
          plan_data: this.state.plan_data["plans"], plan_id: this.state.plan_data["id"], gym_id: this.state.gym_id})}>
          <Card style={{marginTop: 10}}>
            <CardItem header style={styles.card_header}>
              <Text style={styles.headings}>{this.state.data[i]["Day"]}</Text>
            </CardItem>
          </Card>
          </TouchableOpacity>
        )
      }
      return(
        <Fragment>
           <StatusBar backgroundColor='black' barStyle='light-content' />
           <Container style={{backgroundColor: constants.screen_color}}>
                <ScrollView showsVerticalScrollIndicator={false}>
                 <Content style={{padding: 15}}>
                    <View style={{flexDirection: 'row'}}>
                        <View style={styles.imageView}>
                            <Thumbnail large style={{backgroundColor: "black"}} />
                        </View>
                        <View>
                            <Button block style={{backgroundColor: 'black'}} onPress={() => this.setModalVisible(true)}><Text>Edit</Text></Button>
                        </View>
                    </View>

                {this.state.plan_data != null && this.state.gym_id !== null && this.state.exerciseList !== null ?
                <View style={{paddingLeft: 15, paddingRight: 15}}>
                  <View style={styles.input}>
                      <View>
                        <Text style={{fontWeight: 'bold', fontSize: 20}}>{this.state.plan_data["name"]}</Text>
                      </View>

                  </View>
                  <View style={styles.input}>
                      <Text selectable rowSpan={5} style={{textAlign: 'justify'}}>{this.state.plan_data["description"]}</Text>

                  </View>
                  <View style={{margin: 20, justifyContent: 'center', alignItems: 'center'}}>
                    <Text style={{fontWeight: 'bold', textDecorationLine: 'underline', fontSize: 20}}>
                       Exercise
                    </Text>
                  </View>
                  <View>
                    {card}
                  </View>
                </View>
                : <Spinner color="black" />}
                </Content>
                </ScrollView>
           </Container>

        </Fragment>
      );
    }
  }

  const styles = StyleSheet.create({
    input: {
      marginTop: 15
    },

    imageView: {
        height: 100,
        width: 100,
        flex: 1
    },
    addButton: {
        position: 'absolute',
        right: 30,
        bottom: 30,
      },
    headings: {
      fontWeight: 'bold',
      fontSize: 20
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
      backgroundColor: 'black'
    },
    modal: {
            backgroundColor : "#fff",
            height: 350 ,
            width: '80%',
            borderRadius:10,
            borderWidth: 1,
            borderColor: '#fff',
            marginTop: 80,
            marginLeft: 40,
            padding: 15
        }
  });