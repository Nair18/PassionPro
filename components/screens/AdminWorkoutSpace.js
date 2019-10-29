import React, {Fragment,Component} from 'react';
import Uploader from './Uploader';
import {
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TouchableNativeFeedback,
  StatusBar,
  Modal,
  TouchableHighlight,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {Calendar} from 'react-native-calendars';
import CreateWorkout from './CreateWorkout';
import {Container, Accordion,Thumbnail, Card,List, ListItem, Item, CheckBox, CardItem,Tab,Tabs, Header, Title, Content, Button, Left, Body, Text,Right} from 'native-base';

export default class AdminWorkoutSpace extends Component {
    constructor(props){
        super(props)
        this.state={
          isVisible: false
        }
    }
    static navigationOptions = {
                title: 'Workouts',
                headerTitleStyle: { color: 'black', fontWeight: 'bold'},
                headerStyle: {backgroundColor: 'white', elevation: 0},
                headerTintColor: 'black'
              }
    showModal = () => {
        this.setState({isVisible: true})
    }

    selectExercise = (index) => {
        console.log("index", index)
        this.props.navigation.navigate('CreateWorkout');
        this.setState({isVisible: false})
    }
    render(){
        let exercise = ['Triceps', 'Chest', 'Shoulders', 'Biceps', 'Core', 'Back', 'Forearms', 'Upper Legs', 'Glutes', 'Cardio', 'Calves']
        return(
            <Container>
                <ScrollView>
                <Content style={{margin: 15}}>
                    <View>
                        <Card>
                           <CardItem header>
                              <Text style={{fontWeight: 'bold'}}>Bench Press</Text>
                           </CardItem>
                           <CardItem style={{flexDirection: 'row'}}>
                              <Text style={{fontWeight: 'bold', flex: 1, fontSize: 15}}>Sets</Text>
                              <Text style={{fontWeight: 'bold', flex: 1, fontSize: 15}}>Weights</Text>
                              <Text style={{fontWeight: 'bold', flex: 1, fontSize: 15}}>Reps</Text>
                              <Text style={{fontWeight: 'bold', flex: 1, fontSize: 15}}>Duration</Text>
                           </CardItem>
                           <CardItem>
                              <Text style={{fontWeight: 'bold', fontSize: 15}}>Instructions</Text>
                           </CardItem>

                        </Card>
                    </View>
                    <View style={{justifyContent: 'center', alignItems: 'center', margin: 25}}>
                        <Button onPress={this.showModal} style={{backgroundColor: 'black'}}><Text style={{color: 'white'}}>Add workout</Text></Button>
                    </View>
                </Content>
                </ScrollView>
                <Modal
                                    animationType = {"fade"}
                                    transparent = {false}

                                    visible = {this.state.isVisible}
                                    onRequestClose = {() =>{ this.setState({isVisible: false}) } }>
                                    {/*All views of Modal*/}
                                    <Content>
                                     <View  style={{minHeight: 500, width: '100%'}}  >
                                        <View style={{margin: 15}}>
                                            <TouchableOpacity onPress={() => {this.setState({isVisible: false})}}>
                                                <Icon size={25} name="md-arrow-back"/>
                                            </TouchableOpacity>
                                        </View>

                                        <View style={{marginTop: 15}}>
                                            <ScrollView>
                                              {exercise.map( (ex,index) =>
                                                <List>
                                                    <ListItem button onPress={() => this.selectExercise({index})}>
                                                        <Text>{ex}</Text>
                                                    </ListItem>
                                                </List>
                                              )}
                                            </ScrollView>
                                        </View>
                                        <View style={{marginTop: 25}}>
                                        </View>
                                    </View>
                                    </Content>
                </Modal>
            </Container>
        );
    }
}