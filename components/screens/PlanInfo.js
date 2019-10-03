import React, { Component, Fragment } from 'react';
import {StyleSheet,View, StatusBar, ScrollView,Picker, Image, TouchableOpacity, Modal, Alert,KeyboardAvoidingView, TextInput} from 'react-native';
import {Container, Content,Input,Item,Button, Text,Card,CardItem,Body,Form,Textarea, Thumbnail } from 'native-base';

import { Header } from 'react-navigation-stack';

import CourseInfo from './CourseInfo';
import Plans from './Plans';
import Icon from 'react-native-vector-icons/Ionicons';
import MultiSelect from 'react-native-multiple-select';

export default class CreateStandardPlan extends Component {
  constructor(props){
    super(props)
    this.state = {
      items: [{
          id: '92iijs7yta',
          name: 'Ondo',
        }, {
          id: 'a0s0a8ssbsd',
          name: 'Ogun',
        }, {
          id: '16hbajsabsd',
          name: 'Calabar',
        }, {
          id: 'nahs75a5sg',
          name: 'Lagos',
        }, {
          id: '667atsas',
          name: 'Maiduguri',
        }, {
          id: 'hsyasajs',
          name: 'Anambra',
        }, {
          id: 'djsjudksjd',
          name: 'Benue',
        }, {
          id: 'sdhyaysdj',
          name: 'Kaduna',
        }, {
          id: 'suudydjsjd',
          name: 'Abuja',
        }],
      data: [
             {
               "Day": 'Monday',
               "workout": [
                 {
                   "exercise1": {"name": 'bench press', "reps": 2, "sets": 10, "duration": '10min'},
                   "exercise-2": {"name": 'shoulder press', "reps": 2, "sets": 10, "duration": '10min'},
                   "exercise-3": {"name": 'dumbell', "reps": 2, "sets": 10, "duration": '10min'}
                 }
               ]
             },
             {
               "Day": 'Tuesday',
               "workout": {

               }
             },
             {
               "Day": 'Wednesday',
               "workout": {

               }
             },
             {
               "Day": 'Thursday',
               "workout": {

               }
             }
      ],

      selectedItem: [],
      visible: false
    }
  }


  static navigationOptions = {
    headerTitleStyle: { color: 'white'},
    headerStyle: {backgroundColor: 'black'},
    headerTintColor: 'white'
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
      for(let i=0;i<this.state.data.length;i++){
        card.push(
          <Card>
            <CardItem header style={styles.card_header}>
              <Text style={styles.headings}>{this.state.data[i]["Day"]}</Text>
            </CardItem>
            <CardItem>
                <View>
                  <View style={{flex: 1}}>
                    <Text style={styles.headings}>Exercise - </Text>
                  </View>
                  <View style={{flex: 1}}>
                    <Text style={styles.headings}>Reps - </Text>
                  </View>
                  <View style={{flex: 1}}>
                    <Text style={styles.headings}>Sets - </Text>
                  </View>
                  <View style={{flex: 1}}>
                    <Text style={styles.headings}>Duration - </Text>
                  </View>
                  <View style={{flex: 1}}>
                    <Text style={styles.headings}>Instruction - </Text>
                  </View>
                </View>
            </CardItem>
          </Card>
        )
      }
      return(
        <Fragment>
           <StatusBar backgroundColor='black' barStyle='light-content' />
           <Container >
                <ScrollView showsVerticalScrollIndicator={false}>
                 <Content>
                     <View style={styles.imageView}>
                        <Thumbnail large source={require('./workout.jpg')} />
                     </View>
                 </Content>
                <Content style={{padding: 15}}>
                  <View style={styles.input}>
                      <View>
                        <Text style={{fontWeight: 'bold', fontSize: 20}}>6 months body building + personal assistance</Text>
                      </View>

                  </View>
                  <View style={styles.input}>
                      <Text selectable rowSpan={5} style={{textAlign: 'justify'}}>lkjihugyftdresdfghjiko lkjsdfghjiko lkjihusdfghjiko lkjitdresdfghjiko ghjiko ko dfghjiko resdfghjiko lkjihugyftdresdfghjiko
                       lkjihugyftdresdfghjiko lkjihugyftdresdfghjiko lkjihugyftdresdfghjiko lkjihugyftdresdfghjiko lkjihugyftdresdfghjiko lkjihugyftdresdfghjiko lkjihugyftdresdfghjiko</Text>

                  </View>
                  <View style={{margin: 20, justifyContent: 'center', alignItems: 'center'}}>
                    <Text style={{fontWeight: 'bold', textDecorationLine: 'underline'}}>
                       Exercise
                    </Text>
                  </View>
                  <View>
                    {card}
                  </View>


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
        justifyContent: 'center',
        alignItems: 'center'
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
      backgroundColor: 'black'
    }
  });