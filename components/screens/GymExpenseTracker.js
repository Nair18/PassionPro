import React, {Component, Fragment} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  FlatList,
  View,Modal, Alert,
  Linking,
  TextInput,
} from 'react-native';
import StandardWorkout from './StandardWorkout';
import ModalSelector from 'react-native-modal-selector';
import PersonalizedWorkout from './PersonalizedWorkout';

import {Card, CardItem, Icon, Accordion, Form, Thumbnail, Container, Text,Item, Content,List,ListItem, Button, Spinner, Input} from 'native-base'


export default class GymExpenseTracker extends Component {
  constructor(props){
    super(props)
  }
  state = {
      isVisible: false, //state of modal default false
      workoutName: null,
      workoutType: null,
      workoutSection: null,
      onLoad: true,
      onProcess: false
  }
  static navigationOptions = {
      //Setting the header of the screen
      title: 'Expense Tracker',
      headerStyle: {backgroundColor: '#eadea6'},
      headerTitleStyle: {
          color: 'black',
          fontWeight: 'bold'
        },
      headerTintColor: 'black',
    };

  componentDidMount(){
    StatusBar.setHidden(false);
  }
  showModal = (bool) => {
    this.setState({isVisible: bool})
  }

  buttonPress = (type) => {
    console.log('Hello friends button daba diya')
    this.props.navigation.navigate(type)
    this.setState({isVisible: false})
  }
  optionChange = () => {
    this.setState({onLoad: false})
  }

  onSubmit = () => {
    this.setState({onProcess: true})
  }
  render(){
    const { navigate } = this.props.navigation;

    return(
       <Container style={{backgroundColor: '#efe9cc'}}>
          <ScrollView showsVerticalScrollIndicator={false}>
          <Content style={styles.content}>
            <Content>
            <View>
                <View style={styles.cardListView}>
                     <Card>
                        <CardItem style={{justifyContent: 'space-between'}}>
                            <View style={{flex: 2}}>
                                <Text style={{margin: 10, fontWeight: 'bold'}}>Rent</Text>
                            </View>
                            <View style={{flex: 1, backgroundColor: '#e6b2c6'}}>
                                <Text style={{margin: 10, fontWeight: 'bold'}}>{'₹'}50000</Text>
                            </View>
                        </CardItem>
                     </Card>
                </View>
                <View style={styles.cardListView}>
                      <Card>
                         <CardItem style={{justifyContent: 'space-between'}}>
                            <View style={{flex: 2}}>
                                <Text style={{margin: 10,fontWeight: 'bold'}}>Machine Repair</Text>
                            </View>
                            <View style={{flex: 1, backgroundColor:'#e6b2c6'}}>
                                <Text style={{margin: 10, fontWeight: 'bold'}}>{'₹'}4000</Text>
                            </View>
                         </CardItem>
                      </Card>
                </View>
            </View>
            </Content>

          </Content>
          </ScrollView>
          <View style={styles.addButton}>
             <Button rounded style={{height: 50, width: 50, alignItems: 'center', backgroundColor: 'black', justifyContent: 'center'}} onPress={() => this.showModal(true)}>
                <Icon size={30} style={{color: 'white'}}name="md-add" />
             </Button>
          </View>
           <Modal
                           animationType="slide"
                           transparent={true}
                           visible={this.state.isVisible}
                           onRequestClose={() => {
                             this.showModal(false)
                           }}>
                           <View style={styles.modal}>
                                <View style={{margin: 10}}>
                                    <TouchableOpacity onPress={() => this.showModal(false)}>
                                        <Icon name="md-close" size={30}/>
                                    </TouchableOpacity>
                                </View>
                                <Content style={styles.content}>
                                    {this.state.exerciseList !== null && this.state.name !== null ?
                                    (<Form>
                                        <View style={{marginTop: 15}}>
                                            <Text style={{fontWeight: 'bold'}}>Title</Text>
                                        </View>
                                        <Item regular>
                                            <Input placeholder="eg. Rent" onChangeText={text => this.setState({exerciseName: text})}/>
                                        </Item>
                                        <View style={{marginTop: 15}}>
                                            <Text style={{fontWeight: 'bold'}}>Amount</Text>
                                        </View>
                                        <Item regular>
                                            <Input placeholder="Type amount here" onChangeText={text => this.setState({exerciseName: text})}/>
                                        </Item>
                                        <View last style={{alignItems: 'center',justifyContent: 'center', marginTop: 15}}>
                                            {this.state.onProcess === false ?
                                            <Button block disabled={this.state.exerciseName === null || this.state.exerciseName === ""} onPress={this.onSubmit} style={{backgroundColor: 'black'}}>
                                                <Text>Add Expense</Text>
                                            </Button> : <Spinner color="black"/>}
                                        </View>
                                    </Form>) : <View style={{justifyContent: 'center', alignItems: 'center'}}><Text>loading ...</Text></View>}
                                </Content>
                           </View>
                         </Modal>
       </Container>
    );
  }

}

const styles = StyleSheet.create({
  cardListView: {
    margin: 5
  },
  cardView: {
    flex: 1,
    height: 100,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  content: {
    margin: 15
  },
  cardText: {
    fontWeight: 'bold',
    fontSize: 20,
     color: 'white'
  },
  modal: {
    backgroundColor : "#fffdf9",
    height: 300 ,
    flex: 1,
    width: '80%',
    borderRadius:10,
    borderWidth: 1,
    borderColor: '#fff',
    marginTop: 80,
    marginLeft: 40,

     },
      text: {
           color: '#3f2949',
           marginTop: 10
        },
  addButton: {
      position: 'absolute',
      right: 30,
      bottom: 30,
    }
})