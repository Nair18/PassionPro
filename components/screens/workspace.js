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
            <View style={{margin: 15}}>
                                   <ModalSelector
                                       placeholder="Select a course type"
                                       initValue={this.state.workoutType}
                                       data={this.state.data}
                                       keyExtractor= {item => item.id}
                                       labelExtractor= {item => item.name}
                                       initValue={this.state.workoutType}
                                       supportedOrientations={['landscape']}
                                       accessible={true}
                                       scrollViewAccessibilityLabel={'Scrollable options'}
                                       cancelButtonAccessibilityLabel={'Cancel Button'}
                                       onChange={(option)=>{
                                        this.setState({workoutType: option.id, workoutName: option.name, workoutSection: workouts[option.id]})
                                        this.optionChange
                                       }}>

                                       <TextInput
                                         style={{borderWidth:1, borderColor:'black', color: 'black', backgroundColor: "white", padding:10, height:50}}
                                         editable={false}
                                         placeholder="Select your workout type"
                                         value={this.state.workoutName}
                                       />
                                     </ModalSelector>
                           </View>
            {this.state.workoutName !== null ?
            <Content>
            <View style={styles.cardListView}>
              <Text style={{fontSize: 20, fontWeight: 'bold'}}>Full Week Burnouts 🔥</Text>
            </View>
            <View>
               {data.map(item =>
                <View style={styles.cardListView}>
                   <TouchableOpacity activeOpacity={1} onPress={() => this.props.navigation.navigate(this.state.workoutSection)}>
                     <Card style={randomStyle()}>
                        <Text style={styles.cardText}>{item.key}</Text>
                     </Card>
                   </TouchableOpacity>
                </View>
               )}
            </View>
            </Content> : <View style={{justifyContent: 'center', alignItems: 'center'}}><Text note>Select the workout option you want</Text></View>}
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