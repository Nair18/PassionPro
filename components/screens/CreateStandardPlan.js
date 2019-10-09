import React, { Component, Fragment } from 'react';
import {StyleSheet,View, StatusBar, ScrollView,Picker, TouchableOpacity, Modal, Alert,KeyboardAvoidingView, TextInput} from 'react-native';
import {Container, Content,Input,Item,Button, Text,Card,CardItem,Body,Form,Textarea } from 'native-base';

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
    title: 'Create a Plan',
    headerTitleStyle: { color: 'black', fontWeight: 'bold'},
    headerStyle: {backgroundColor: 'white', elevation: 0},
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
            <TouchableOpacity onPress={() => this.setModalVisible(true)}>
                <CardItem footer style={styles.background}>
                    <Text>Add Workout</Text>
                </CardItem>
            </TouchableOpacity>
          </Card>
        )
      }
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

                    <TouchableOpacity><View style={{justifyContent: 'center', alignItems: 'center', marginTop: 10}}><Button block style={styles.button}><Text>Select Course Type</Text></Button></View></TouchableOpacity>
                  </View>
                  <View style={styles.input}>
                    <Item regular>
                      <Textarea rowSpan={5} placeholder="Description of the plan" />
                    </Item>
                  </View>
                  <View style={{margin: 20, justifyContent: 'center', alignItems: 'center'}}>
                    <Text style={{fontWeight: 'bold', textDecorationLine: 'underline'}}>
                       Exercise
                    </Text>
                  </View>
                  <View>
                    {card}
                  </View>
                  <View style={styles.buttonView}>
                    <TouchableOpacity>
                      <Button style={styles.button} onPress={this._back}><Text>Submit</Text></Button>
                    </TouchableOpacity>
                  </View>

                </Content>
                </ScrollView>
           </Container>
             <Modal
                       animationType="slide"
                       transparent={false}
                       visible={this.state.visible}
                       onRequestClose={() => {
                         () => this.setModalVisible(false)
                       }}>
                       <View style={{margin: 15}}>
                         <TouchableOpacity onPress={() => this.setModalVisible(false)}>
                         <Icon name="md-close" size={30}/>
                         </TouchableOpacity>
                   </View>
                       <Content style={styles.content}>
                         <Form>
                            <View style={{marginTop: 10, marginLeft: 15, marginRight: 15}}>
                              <MultiSelect
                                        hideTags
                                        items={this.state.items}
                                        uniqueKey="id"
                                        ref={(component) => { this.multiSelect = component }}
                                        onSelectedItemsChange={this.onSelectedItemsChange}
                                        selectedItems={this.state.selectedItem}
                                        selectText="Pick Items"
                                        searchInputPlaceholderText="Search Items..."
                                        onChangeInput={ (text)=> console.log(text)}
                                        altFontFamily="ProximaNova-Light"
                                        tagRemoveIconColor="#CCC"
                                        tagBorderColor="#CCC"
                                        tagTextColor="#CCC"
                                        single={true}
                                        selectedItemTextColor="#CCC"
                                        selectedItemIconColor="#CCC"
                                        itemTextColor="#000"
                                        displayKey="name"
                                        searchInputStyle={{ color: '#CCC' }}
                                        submitButtonColor="#CCC"
                                        submitButtonText="Submit"
                                      />
                            </View>
                            <Item style={{marginTop: 10, marginLeft: 15, marginRight: 15}}>
                               <Input placeholder="Exercise Name" />
                            </Item>
                            <Item style={{marginTop: 10, marginLeft: 15, marginRight: 15}}>
                               <Input placeholder="Reps" />
                            </Item>
                            <Item style={{marginTop: 10, marginLeft: 15, marginRight: 15}}>
                               <Input placeholder="Sets" />
                            </Item>
                            <Item style={{marginTop: 10, marginLeft: 15, marginRight: 15}}>
                               <Textarea row={5} placeholder="Instructions" />
                            </Item>
                            <View last style={{alignItems: 'center',justifyContent: 'center', marginTop: 15}}>

                            <Button rounded style={{backgroundColor: 'black'}}>
                              <Text>Submit</Text>
                            </Button>
                            </View>
                         </Form>
                       </Content>
                     </Modal>

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