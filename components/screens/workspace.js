import React, {Component, Fragment} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  FlatList,
  View,Modal, Alert,
  Image,
  Linking,
  TextInput,
} from 'react-native';
import StandardWorkout from './StandardWorkout';
import ModalSelector from 'react-native-modal-selector';
import PersonalizedWorkout from './PersonalizedWorkout';
import constants from '../constants';
import {Card, CardItem, Icon, Accordion, Container, Text, Content,List,ListItem, Button} from 'native-base'

const data = [ {key: "#MotivationalMonday", value: "#e37070"},
                 {key: "#TransformationTuesday", value: '#c7004c'},
                 {key: "#WorkoutWednesday", value: "#8f1537"},
                 {key: "#ThursdayThrust", value: "#cc6a87"},
                 {key: "#FitnessFriday", value: "#b5525c"},
                 {key: "#SaturdaySweat", value: "#d35656"},
                 {key: "#SundaySweat", value: "#8d448b"}
               ]


const randomStyle = () => {
 return { flex: 1,
      height: 100,
      width: '100%',

      justifyContent: 'center',
      alignItems: 'center'
     }
}
export default class Workspace extends Component {
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
      title: 'Workspace',
      headerStyle: {backgroundColor: constants.header},
      headerTitleStyle: {
          color: constants.header_text,
          fontWeight: 'bold'
        },
      headerTintColor: constants.header_text,
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
    
    return(
       <Container style={{backgroundColor: constants.screen_color}}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <Content style={{margin: 15}}>
                <TouchableOpacity activeOpacity={1} onPress={() => this.props.navigation.navigate('TraineeMealSpace')}>
                <View>
                    <Card style={{borderRadius: 10, backgroundColor: "#d1d1d1"}}>
                        <CardItem style={{justifyContent: 'center', alignItems: 'center', backgroundColor: "#d1d1d1", borderRadius: 10}}>
                            <Image source={require('./meal.jpg')} style={{height: 200, width: null, flex: 1}}/>
                        </CardItem>
                        <CardItem style={{justifyContent: 'space-between', backgroundColor: constants.item_card, borderRadius: 10}}>
                            <Text style={{fontWeight: 'bold'}}>Meal Plans</Text>
                            <Icon name="md-arrow-round-forward" size={20}/>
                        </CardItem>
                    </Card>
                </View>
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={1} onPress={() => this.props.navigation.navigate('TraineeWorkspace')}>
                <View>
                    <Card style={{backgroundColor: "black", borderRadius: 10}}>
                        <CardItem style={{justifyContent: 'center', alignItems: 'center', backgroundColor: 'black', borderRadius: 10}}>
                           <Image source={require('./workout.jpg')} style={{height: 200, width: null, flex: 1}}/>
                        </CardItem>
                        <CardItem style={{justifyContent: 'space-between', backgroundColor: constants.item_card, borderRadius: 10}}>
                            <Text style={{fontWeight: 'bold'}}>Workout Plans</Text>
                            <Icon name="md-arrow-round-forward" size={20}/>
                        </CardItem>
                    </Card>
                </View>
                </TouchableOpacity>
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