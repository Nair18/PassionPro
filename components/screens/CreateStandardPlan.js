import React, { Component, Fragment } from 'react';
import {StyleSheet,View, StatusBar, ScrollView,Picker, TouchableOpacity, Modal, Alert,KeyboardAvoidingView, TextInput} from 'react-native';
import {Container, Content,Input,Item,Button, Text,Card,CardItem,Body,Form,Textarea } from 'native-base';
import ModalSelector from 'react-native-modal-selector';
import { Header } from 'react-navigation-stack';
import constants from '../constants';
import Icon from 'react-native-vector-icons/Ionicons';


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
    title: 'Create a Plan',
    headerTitleStyle: { color: 'black', fontWeight: 'bold'},
    headerStyle: {backgroundColor: 'white', elevation: 0},
    headerTintColor: 'black'
  }

  componentDidMount(){

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

      return(
        <Fragment>
           <StatusBar backgroundColor='black' barStyle='light-content' />
           <Container style={{padding: 15}}>
              <ScrollView showsVerticalScrollIndicator={false}>
                <Content>
                  <View style={styles.input}>
                    <Item regular>
                      <Input placeholder="Name of the Plan"/>
                    </Item>
                  </View>
                  <View style={{marginTop: 15}}>
                    <ModalSelector
                        placeholder="Select a course type"
                        initValue={this.state.courseTypeName}
                        data={this.state.coursetype}
                        keyExtractor= {item => item.id}
                        labelExtractor= {item => item.name}
                        initValue={this.state.courseType}
                        supportedOrientations={['landscape']}
                        accessible={true}
                        scrollViewAccessibilityLabel={'Scrollable options'}
                        cancelButtonAccessibilityLabel={'Cancel Button'}
                        onChange={(option)=>{
                        this.setState({courseType: option.id, courseTypeName: option.name})
                        }}>
                        <TextInput
                            style={{borderWidth:1, borderColor:'#ccc', color: 'black',padding:10, height:50}}
                            editable={false}
                            placeholder="Select the course type"
                            value={this.state.courseTypeName}
                        />

                    </ModalSelector>
                    </View>
                  <View style={styles.input}>
                    <Item regular>
                      <Textarea rowSpan={5} placeholder="Description of the plan" />
                    </Item>
                  </View>
                  <View style={styles.buttonView}>
                    <TouchableOpacity>
                      <Button style={styles.button} onPress={this._back}><Text>Submit</Text></Button>
                    </TouchableOpacity>
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