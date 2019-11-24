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

            const { navigation } = this.props;
            console.log("pagal bana rhe hai")
            this.focusListener = navigation.addListener('didFocus', () => {
                console.log("The screen is focused")
                 var key  = this.retrieveItem('key').then(res =>
                             this.setState({auth_key: res}, () => console.log("brother pls", res))
                             ).then(() => {
                                  if(this.state.auth_key !== null){
//                                      this.fetchDetails()
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
    headerTitleStyle: { color: 'black', fontWeight: 'bold'},
    headerStyle: {backgroundColor: '#eadea6'},
    headerTintColor: 'black'
  }

  onSelectedItemsChange = selectedItem => {
      this.setState({ selectedItem });
    };
  setModalVisible = (bool) => {
    this.setState({visible: bool})
  }
    _back = () => {
      this.props.navigation.goBack(this.props.navigation.state.params.go_back_key)

    }
    render(){
      let list = [
        	{Id: 1, Name: 'Test1 Name', Value: 'Test1 Value'},
        	{Id: 2, Name: 'Test2 Name', Value: 'Test2 Value'},
        	{Id: 3, Name: 'Test3 Name', Value: 'Test3 Value'},
        	{Id: 4, Name: 'Test4 Name', Value: 'Test4 Value'}
        ]
      let card = []
      let options = [
            {
              key: 'kenya',
              label: 'Kenya',
            },
            {
              key: 'uganda',
              label: 'Uganda',
            },
            {
              key: 'libya',
              label: 'Libya',
            },
            {
              key: 'morocco',
              label: 'Morocco',
            },
            {
              key: 'estonia',
              label: 'Estonia',
            },
          ];
      for(let i=0;i<(this.state.data.length && (this.state.plan_data !== null));i++){
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
           <Container style={{backgroundColor: '#efe9cc'}}>
                <ScrollView showsVerticalScrollIndicator={false}>
                 <Content style={{padding: 15}}>
                    <View style={{flexDirection: 'row'}}>
                        <View style={styles.imageView}>
                            <Thumbnail large source={require('./workout.jpg')} />
                        </View>
                        <View style={{flex: 1}}>
                            <Button danger style={{justifyContent: 'center', alignItems: 'center'}}><Text>Delete Plan</Text></Button>
                            <Button style={{backgroundColor: "black", marginTop: 10, justifyContent: 'center', alignItems: 'center'}}><Text>Edit</Text></Button>
                        </View>
                    </View>
                 </Content>
                {this.state.plan_data != null && this.state.gym_id !== null ?
                <Content style={{padding: 15}}>
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
                </Content>
                : <Spinner color="black" />}
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
    }
  });