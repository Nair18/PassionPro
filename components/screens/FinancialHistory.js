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

import {Card, CardItem, Icon, Accordion, Container, Text, Content,List,ListItem, Button} from 'native-base'


export default class FinancialHistory extends Component {
  constructor(props){
    super(props)
  }
  state = {
      isVisible: false, //state of modal default false
      workoutName: null,
      workoutType: null,
      workoutSection: null,
      onLoad: true,
      data: [{"id": 1,"name": "Standard Workout"}, {"id": 2, "name": "Customize your Workout"}, {"id": 3, "name": "Workout plan by Ajay"}]
  }
  static navigationOptions = {
      //Setting the header of the screen
      title: 'Expense History',
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
  showModal = () => {
    this.setState({isVisible: true})
  }

  buttonPress = (type) => {
    console.log('Hello friends button daba diya')
    this.props.navigation.navigate(type)
    this.setState({isVisible: false})
  }
  optionChange = () => {
    this.setState({onLoad: false})

  }
  render(){
    const { navigate } = this.props.navigation;
    workouts = {1: "StandardWorkout", 2: "PersonalizedWorkout", 3: "StandardWorkout"}
    return(
       <Container style={{backgroundColor: '#efe9cc'}}>
          <ScrollView showsVerticalScrollIndicator={false}>
          <Content style={styles.content}>
            <Content>
            <View>
                <View style={styles.cardListView}>
                   <TouchableOpacity activeOpacity={1}>
                     <Card>
                        <CardItem header>
                            <Text>Total money received from clients <Text style={{fontWeight: 'bold', color: '#4d80e4'}}>till now</Text> in <Text style={{fontSize: 20, fontWeight: 'bold', color: "#4d80e4"}}>2019</Text></Text>
                        </CardItem>
                        <CardItem style={{justifyContent: 'center', alignItems: 'center'}}>
                            <Text style={{fontWeight: 'bold', fontSize: 50}}>{'₹'}<Text style={{fontSize: 50,color: '#2c7873'}}>3250000</Text></Text>
                        </CardItem>
                        <CardItem footer style={{justifyContent: 'space-between', backgroundColor: '#d7c79e'}}>
                            <View>
                                <Text>Details</Text>
                            </View>
                            <View>
                                <Icon style={20} name="md-arrow-round-forward"/>
                            </View>
                        </CardItem>
                     </Card>
                   </TouchableOpacity>
                </View>
                <View style={styles.cardListView}>
                   <TouchableOpacity activeOpacity={1}>
                     <Card>
                        <CardItem header>
                            <Text>Total money paid to Trainers <Text style={{fontWeight: 'bold', color: '#4d80e4'}}>till now</Text> in <Text style={{fontSize: 20, fontWeight: 'bold', color: "#4d80e4"}}>2019</Text></Text>
                        </CardItem>
                        <CardItem style={{justifyContent: 'center', alignItems: 'center'}}>
                            <Text style={{fontWeight: 'bold', fontSize: 50}}>{'₹'}<Text style={{fontSize: 50,color: '#801336'}}>3250000</Text></Text>
                        </CardItem>
                     </Card>
                   </TouchableOpacity>
                </View>
            </View>
            </Content>
          </Content>
          </ScrollView>
       </Container>
    );
  }

}

const styles = StyleSheet.create({
  cardListView: {
    marginTop: 15
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
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor : "#00BCD4",
    height: 300 ,
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
        }
})