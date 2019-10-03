import React, {Component, Fragment} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  FlatList,
  View,Modal, Alert
} from 'react-native';
import StandardWorkout from './StandardWorkout';
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

const randomColor = () => {
  var RandomNumber = Math.floor(Math.random() * data.length) ;
  return data[RandomNumber].value;
}

const randomStyle = () => {
 return { flex: 1,
      height: 100,
      width: '100%',
      backgroundColor: randomColor(),
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
  }
  static navigationOptions = {
      //Setting the header of the screen
      title: 'Workspace',
      headerStyle: {backgroundColor: 'black'},
      headerTitleStyle: {
          color: 'white'
        },
      headerTintColor: 'white',
    };

  showModal = () => {
    this.setState({isVisible: true})
  }

  buttonPress = (type) => {
    console.log('Hello friends button daba diya')
    this.props.navigation.navigate(type)
    this.setState({isVisible: false})
  }
  render(){
    const { navigate } = this.props.navigation;
    return(
       <Container >
          <ScrollView showsVerticalScrollIndicator={false}>
          <Content style={styles.content}>
            <View>
              <Text style={{fontSize: 20, fontWeight: 'bold'}}>Todays Burnout 🔥</Text>
            </View>
            <TouchableOpacity onPress={this.showModal}>
            <View style={styles.cardListView}>

                <Card style={styles.cardView} >
                    <Text style={styles.cardText}>#MovitationalMonday</Text>
                </Card>

            </View>
            </TouchableOpacity>
            <View style={styles.cardListView}>
              <Text style={{fontSize: 20, fontWeight: 'bold'}}>Full Week Burnouts 🔥</Text>
            </View>
            <View>
               {data.map(item =>
                <View style={styles.cardListView}>
                   <TouchableOpacity>
                     <Card style={randomStyle()}>
                        <Text style={styles.cardText}>{item.key}</Text>
                     </Card>
                   </TouchableOpacity>
                </View>
               )}
            </View>
          </Content>
          </ScrollView>
          <Modal
                    animationType = {"fade"}
                    transparent = {false}

                    visible = {this.state.isVisible}
                    onRequestClose = {() =>{ this.setState({isVisible: false}) } }>
                    {/*All views of Modal*/}
                     <View>
                        <View style={{margin: 25}}>
                            <TouchableOpacity onPress={() => {this.setState({isVisible: false})}}>
                                <Icon size={10} name="md-arrow-back"/>
                            </TouchableOpacity>
                        </View>
                        <View style={{marginTop: 50}}>
                            <ScrollView>
                                <List>

                                    <ListItem button onPress={() => this.buttonPress('StandardWorkout')}>
                                        <Text style = {styles.text}>Standard Workout Plan</Text>
                                    </ListItem>

                                    <ListItem >
                                        <Text style = {styles.text}>Meal Plan by PT1</Text>
                                    </ListItem>
                                    <ListItem >
                                        <Text style = {styles.text}>Workout Plan by PT1</Text>
                                    </ListItem>
                                    <ListItem button onPress={() => this.buttonPress('PersonalizedWorkout')}>
                                        <Text style = {styles.text}>Customize your todays workout</Text>
                                    </ListItem>
                                </List>
                            </ScrollView>
                        </View>
                    </View>
                  </Modal>
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
    backgroundColor: randomColor(),
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