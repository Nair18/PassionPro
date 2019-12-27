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
import constants from '../constants';
import {Card, CardItem, Icon, Accordion, Container, Text, Spinner,Content,List,ListItem, Button} from 'native-base'


export default class FinancialHistory extends Component {
  constructor(props){
    super(props)
  }
  state = {
      isVisible: false, //state of modal default false
      workoutName: null,
      workoutType: null,
      workoutSection: null,
      gym_stats: this.props.navigation.state.params.gym_stats,
      onLoad: true,
      id: this.props.navigation.state.params.id,
      data: [{"id": 1,"name": "Standard Workout"}, {"id": 2, "name": "Customize your Workout"}, {"id": 3, "name": "Workout plan by Ajay"}]
  }
  static navigationOptions = {
      //Setting the header of the screen
      title: 'Expense History',
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
    workouts = {1: "StandardWorkout", 2: "PersonalizedWorkout", 3: "StandardWorkout"}
    return(
       <Container style={{backgroundColor: constants.screen_color}}>
          {this.state.gym_stats !== null ?
          <ScrollView showsVerticalScrollIndicator={false}>
          <Content style={styles.content}>
            <Content>
            <View>
                <View style={styles.cardListView}>
                   <TouchableOpacity activeOpacity={1} onPress={() => this.props.navigation.navigate('StatsPage', {id: this.state.id})}>
                     <Card>
                        <CardItem header style={{backgroundColor: constants.card_header, height: 80}}>
                            <Text>Total money received from clients <Text style={{fontWeight: 'bold', color: constants.text_highlight}}>till now</Text> in <Text style={{fontSize: 20, fontWeight: 'bold', color: constants.text_highlight}}>{new Date().getFullYear()}</Text></Text>
                        </CardItem>
                        <CardItem style={{justifyContent: 'center', alignItems: 'center', backgroundColor: constants.card_body}}>
                            <Text style={{fontWeight: 'bold', fontSize: 30}}>{'₹'}<Text style={{fontSize: 50,color: constants.green_money}}>{this.state.gym_stats["net"]}</Text></Text>
                        </CardItem>
                        <CardItem footer style={{justifyContent: 'space-between', backgroundColor: constants.card_body, elevation: 2}}>
                            <View>
                                <Text style={{fontWeight: 'bold'}}>Details </Text>
                            </View>
                            <View>
                                <Icon style={20} name="md-arrow-round-forward"/>
                            </View>
                        </CardItem>
                     </Card>
                   </TouchableOpacity>
                </View>
                <View style={styles.cardListView}>
                   <TouchableOpacity activeOpacity={1} onPress={() => this.props.navigation.navigate('StatsPageTrainer', {id: this.state.id})}>
                     <Card>
                        <CardItem header style={{backgroundColor: constants.card_header, height: 80}}>
                            <Text>Total money paid to Trainers <Text style={{fontWeight: 'bold', color: constants.text_highlight}}>till now</Text> in <Text style={{fontSize: 20, fontWeight: 'bold', color: constants.text_highlight}}>{new Date().getFullYear()}</Text></Text>
                        </CardItem>
                        <CardItem style={{justifyContent: 'center', alignItems: 'center', backgroundColor: constants.card_body}}>
                            <Text style={{fontWeight: 'bold', fontSize: 30}}>{'₹'}<Text style={{fontSize: 50,color: constants.red_money}}>0</Text></Text>
                        </CardItem>
                        <CardItem footer style={{justifyContent: 'space-between',backgroundColor: constants.card_body, elevation: 2}}>
                            <View>
                               <Text style={{fontWeight: 'bold'}}>Details</Text>
                            </View>
                            <View>
                               <Icon style={20} name="md-arrow-round-forward"/>
                            </View>
                        </CardItem>
                     </Card>
                   </TouchableOpacity>
                </View>
            </View>
            </Content>
          </Content>
          </ScrollView> : <View style={{justifyContent: 'center', alignItems: 'center'}}><Spinner color='black' /></View>}
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