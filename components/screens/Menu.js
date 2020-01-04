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
import {Card, CardItem, Icon, Accordion, Container, Text, Spinner, Content,List,ListItem, Button} from 'native-base'
import constants from '../constants';

export default class Menu extends Component {
  constructor(props){
    super(props)
  }
  state = {
      isVisible: false, //state of modal default false
      workoutName: null,
      workoutType: null,
      permission: null,
      id: null,
      workoutSection: null,
      onLoad: true
  }
  static navigationOptions = {
      //Setting the header of the screen
      title: 'Explore',
      headerStyle: {backgroundColor: constants.header},
      headerTitleStyle: {
          color: constants.header_text,
          fontWeight: 'bold'
        },
      headerTintColor: constants.header_text,
    };

  showModal = () => {
    this.setState({isVisible: true})
  }

  redirect = () => {
       console.log("kya ho rha hai yaar")
  }
   async retrieveItem(keys) {
        let roles = null
        const retrievedItem = await AsyncStorage.multiGet(keys);
        retrievedItem.map(m => {
            try {
              if(m[0] === 'role'){
                roles = m[1]
              }
              else if(m[0] === 'id' && m[1] === null){
                //
              }
              else if(m[0] === 'id' && m[1] !== null){
                this.setState({id: parseInt(m[1])})
              }
            } catch (error) {
              console.log(error.message);
            }
        })

        return roles;
    }
  componentDidMount(){
     StatusBar.setHidden(false);
     var key  = this.retrieveItem(['role', 'id']).then(res => {
         console.log(res)
         return JSON.parse(res)
     }).then(res => {
          if(res!==null){
              if(res.includes("OWNER") && res.includes("TRAINER")){
                this.setState({permission: "owner+trainer"})
              }
              else if(res.includes("ADMIN") && res.includes("TRAINER")){
                this.setState({permission: "admin+trainer"})
              }
              else if(res.includes("OWNER")){
                this.setState({permission: "owner"})
              }
              else if(res.includes("ADMIN")){
                this.setState({permission: "admin"})
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
       <Container style={{backgroundColor: constants.screen_color}}>
          {this.state.id !== null && this.state.permission !== null ?
          <ScrollView showsVerticalScrollIndicator={false}>
          <Content style={styles.content}>
            <Content>
            <View>
                {this.state.permission !== null && this.state.permission.includes("owner")?
                <View style={styles.cardListView}>
                   <TouchableOpacity activeOpacity={1} onPress={() => this.props.navigation.navigate('GymLocations')}>
                     <Card style={{backgroundColor: constants.item_card, borderRadius: 10}}>
                        <CardItem style={{backgroundColor: constants.item_card, justifyContent: 'space-between', borderRadius: 10}}>
                            <Text style={{fontWeight: 'bold'}}>Switch Gym Location</Text>
                            <Icon name="md-arrow-dropright" />
                        </CardItem>
                     </Card>
                   </TouchableOpacity>
                </View> : null }
                <View style={styles.cardListView}>
                   <TouchableOpacity activeOpacity={1} onPress={() => this.props.navigation.navigate('AddExercise', {id: this.state.id})}>
                      <Card style={{backgroundColor: constants.item_card, borderRadius: 10}}>
                         <CardItem style={{backgroundColor: constants.item_card, justifyContent: 'space-between', borderRadius: 10}}>
                             <Text style={{fontWeight: 'bold'}}>Add Exercise</Text>
                               <Icon  name="md-arrow-dropright" />
                         </CardItem>
                      </Card>
                   </TouchableOpacity>
                </View>
                <View style={styles.cardListView}>
                   <TouchableOpacity activeOpacity={1} onPress={() => this.props.navigation.navigate('Sessions', {id: this.state.id})}>
                      <Card style={{backgroundColor: constants.item_card, borderRadius: 10}}>
                         <CardItem style={{backgroundColor: constants.item_card, justifyContent: 'space-between', borderRadius: 10}}>
                           <Text style={{fontWeight: 'bold'}}>Add Fitness Program</Text>
                           <Icon name="md-arrow-dropright" />
                         </CardItem>
                      </Card>
                   </TouchableOpacity>
                </View>
                {this.state.permission !== null && this.state.permission.includes("owner") ?
                <View style={styles.cardListView}>
                   <TouchableOpacity activeOpacity={1} onPress={() => this.props.navigation.navigate('AppBilling')}>
                     <Card style={{backgroundColor: constants.item_card, borderRadius: 10}}>
                        <CardItem style={{backgroundColor: constants.item_card, justifyContent: 'space-between', borderRadius: 10}}>
                           <Text style={{fontWeight: 'bold'}}>Billing Details</Text>
                           <Icon name="md-arrow-dropright" />
                        </CardItem>
                     </Card>
                   </TouchableOpacity>
                </View> : null}
                 <View style={{justifyContent: 'center', alignItems: 'center', marginTop: 40}}>
                    <Button onPress={() => {this.props.navigation.navigate('LandingPage')}} style={{borderRadius: 10, alignItems: 'center', backgroundColor: '#d1274b', justifyContent: 'center'}}><Icon size={20} name="md-power"/><Text>Logout</Text></Button>
                 </View>
            </View>
            </Content>
          </Content>
          </ScrollView> : <View style={{justifyContent: 'center', alignItems: 'center'}}><Spinner color="black" /></View> }
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