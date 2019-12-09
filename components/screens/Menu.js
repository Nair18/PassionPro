import React, {Component, Fragment} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  AsyncStorage,
  FlatList,
  View,Modal, Alert,
  Linking,
  TextInput,
} from 'react-native';
import StandardWorkout from './StandardWorkout';
import ModalSelector from 'react-native-modal-selector';
import PersonalizedWorkout from './PersonalizedWorkout';
import GymExpenseTracker from './GymExpenseTracker';
import GymLocations from './GymLocations';
import CreateAdmin from './CreateAdmin';
import LandingPage from './LandingPage';
import {Card, CardItem, Icon, Accordion, Container, Text, Content,List,ListItem, Button} from 'native-base'


export default class Menu extends Component {
  constructor(props){
    super(props)
  }
  state = {
      isVisible: false, //state of modal default false
      workoutName: null,
      workoutType: null,
      workoutSection: null,
      onLoad: true
  }
  static navigationOptions = {
      //Setting the header of the screen
      title: 'Explore',
      headerStyle: {backgroundColor: '#eadea6'},
      headerTitleStyle: {
          color: 'black',
          fontWeight: 'bold'
        },
      headerTintColor: 'black',
    };

  showModal = () => {
    this.setState({isVisible: true})
  }

  redirect = () => {
       console.log("kya ho rha hai yaar")
  }
   async retrieveItem(key) {
            try {
              const retrievedItem =  await AsyncStorage.getItem(key);
              console.log("key retrieved")
              return retrievedItem;
            } catch (error) {
              console.log(error.message);
            }
            return;
    }
  componentDidMount(){
     StatusBar.setHidden(false);
     var key  = this.retrieveItem('role').then(res => {
         console.log(res)
         return JSON.parse(res)
     }).then(res => {
          if(res!==null){
              if(res == "Admin2"){
                 this.props.navigation.navigate('Admin')
              }
              else if(res == "ADMIN"){
                 this.props.navigation.navigate('Admin')
              }
              else if(res == "Trainer"){
                 this.props.navigation.navigate('TrainerSection')
              }
              else if(res == "Customer"){
                 this.props.navigation.navigate('SecondLevelCustomer')
              }
          }
          else{
                 this.props.navigation.navigate('LandingPage')
          }
     })
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
       <Container style={{backgroundColor: '#efe9cc'}}>
          <ScrollView showsVerticalScrollIndicator={false}>
          <Content style={styles.content}>
            <Content>
            <View>
                <View style={styles.cardListView}>
                   <TouchableOpacity activeOpacity={1} onPress={() => this.props.navigation.navigate('GymLocations')}>
                     <Card style={{backgroundColor: '#9dab86'}}>
                        <CardItem style={{backgroundColor: '#9dab86', justifyContent: 'space-between'}}>
                            <Text style={{fontWeight: 'bold'}}>Switch Gym Location</Text>
                            <Icon size={20} name="md-arrow-round-forward" />
                        </CardItem>
                     </Card>
                   </TouchableOpacity>
                </View>

                <View style={styles.cardListView}>
                   <TouchableOpacity activeOpacity={1} onPress={() => this.props.navigation.navigate('TrainerSection')}>
                      <Card style={{backgroundColor: '#9dab86'}}>
                         <CardItem style={{backgroundColor: '#9dab86', justifyContent: 'space-between'}}>
                             <Text style={{fontWeight: 'bold'}}>Switch to Trainer Screen</Text>
                             <Icon size={20} name="md-arrow-round-forward" />
                         </CardItem>
                      </Card>
                   </TouchableOpacity>
                </View>
                <View style={styles.cardListView}>
                   <TouchableOpacity activeOpacity={1} onPress={() => this.props.navigation.navigate('AppBilling')}>
                     <Card style={{backgroundColor: '#9dab86'}}>
                        <CardItem style={{backgroundColor: '#9dab86', justifyContent: 'space-between'}}>
                           <Text style={{fontWeight: 'bold'}}>Billing Details</Text>
                           <Icon size={20} name="md-arrow-round-forward" />
                        </CardItem>
                     </Card>
                   </TouchableOpacity>
                </View>
                 <View style={{justifyContent: 'center', alignItems: 'center', marginTop: 40}}>
                    <Button rounded onPress={() => {this.props.navigation.navigate('LandingPage')}}style={{height: 50, width: 150, alignItems: 'center', backgroundColor: '#d1274b', justifyContent: 'center'}}><Icon size={20} name="md-power"/><Text>Logout</Text></Button>
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
    marginTop: 10
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