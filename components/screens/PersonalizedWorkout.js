import React, {Fragment,Component} from 'react';
import { EventRegister } from 'react-native-event-listeners';
import Logging from './Logging';
import {TextInput,Image, StyleSheet, ScrollView, TouchableOpacity, Alert, Modal} from 'react-native';
import { Button, Container, Content, View, Text,Item, Input, Card, CardItem,  Textarea} from 'native-base';
import Icon from 'react-native-vector-icons/Ionicons';
export default class PersonalizedWorkout extends Component {
  constructor(props){
    super(props)
    this.state={
      datas: 'no data',
      isVisible: false
    }
  }
  static navigationOptions = {
      title: 'Workouts',
      headerTitleStyle: { color: 'white'},
      headerStyle: {backgroundColor: 'black'},
      headerTintColor: 'white'
  }
  showModal = () => {
    this.setState({isVisible: true})
  }


  render(){
    return(

        <Container style={{margin: 15}}>
            <Content>
                <View>
                    <Card>
                        <CardItem header>
                            <Text style={{fontWeight: 'bold'}}>Barbell bench press</Text>
                        </CardItem>
                        <CardItem>
                            <Text>Sets: 4 / Reps: 10 / Rest: 60 seconds</Text>
                        </CardItem>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('Logging')}>
                            <CardItem footer style={{backgroundColor: '#e5e5e5'}}>
                                <Text>Track your progress</Text>
                            </CardItem>
                        </TouchableOpacity>
                    </Card>
                </View>
               <View style={{margin: 25, justifyContent: 'center', alignItems: 'center'}}>
                  <Button style={{backgroundColor: 'black'}} onPress={this.showModal}><Text style={{color: 'white'}}>Add Workout</Text></Button>
               </View>
            </Content>
            <Modal
                                animationType = {"fade"}
                                transparent = {false}

                                visible = {this.state.isVisible}
                                onRequestClose = {() =>{ this.setState({isVisible: false}) } }>
                                {/*All views of Modal*/}
                                 <View style={{margin: 15}} >
                                    <View style={{marginTop: 15}}>
                                        <TouchableOpacity onPress={() => {this.setState({isVisible: false})}}>
                                            <Icon size={25} name="md-arrow-back"/>
                                        </TouchableOpacity>
                                    </View>
                                    <View style={{marginTop: 50}}>
                                        <View>
                                             <Button style={{backgroundColor: 'white'}}><Text style={{color: 'grey'}}>Select your Exercise</Text></Button>
                                        </View>
                                        <View style={{marginTop: 15}}>
                                            <Item regular>
                                                <Textarea rowSpan={5} placeholder="Jot down your points" style={{textAlign: 'justify'}}/>
                                            </Item>
                                        </View>
                                        <View style={{marginTop: 15, justifyContent: 'center', alignItems: 'center'}}>
                                            <Button style={{backgroundColor: 'black'}}><Text style={{color: 'white'}}>Save</Text></Button>
                                        </View>
                                    </View>
                                </View>
                              </Modal>
        </Container>
    );
  }
}