import React,{Fragment, Component} from 'react';
import { EventRegister } from 'react-native-event-listeners';
import {Container,Text, Content, Item, Card, CardItem, Button,Input, Header, Left,Label, Right, Body, Title, Spinner} from 'native-base';
import {StyleSheet, View, TouchableOpacity, TextInput, ScrollView, AsyncStorage, BackHandler, Form,Modal, Alert, KeyboardAvoidingView} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import DatePicker from 'react-native-datepicker';
import ModalSelector from 'react-native-modal-selector';
import Divider from 'react-native-divider';
import constants from '../constants';
export default class AppBilling extends Component{
  constructor(props){
      super(props)
      this.state={
         date: '2019-12-09',
         number: '9979090670',
         amount: '12000',
         auth_key: null,
         isVisible: false,
         gymList: null
      }
  }

  componentDidMount() {
        const { navigation } = this.props;
        console.log("pagal bana rhe hai")
//        this.focusListener = navigation.addListener('didFocus', () => {
          console.log("focusing admin screen")
          var key  = this.retrieveItem(['key', 'id']).then(res =>
                        this.setState({auth_key: res}, () => console.log("brother pls", res))
                      ).then(() => {
                          this.fetchDetails()
                      })
//        });

  }
  async retrieveItem(keys) {
         let auth_key = null
         const retrievedItem =  await AsyncStorage.multiGet(keys);
         retrievedItem.map(m => {
            try {
              if(m[0] === 'key'){
                 auth_key = m[1]
              }
              else if(m[0] === 'id' && m[1] !== null && m[1] !== "{}" && m[1] !== "null"){
                 this.setState({gymId: parseInt(m[1])}, () => console.log("key set hai boss", m[1]))
              }
              console.log("key retrieved")
            } catch (error) {
              console.log(error.message);
            }
         })
         return auth_key;
  }
  fetchDetails = () => {
          console.log("came in fetching fish")
          fetch(constants.API + 'current/admin/gyms', {
              method: 'GET',
              headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json',
                  'Authorization': this.state.auth_key,
              }
          }).then(res => {
              this.setState({loading: false})
              if(res.status === 200){
                  return res.json()
              }
              else if(res.status === 401){
                  this.props.navigation.navigate('LandingPage')
              }
              else{
                  Alert.alert(constants.failed, constants.fail_error)
              }
          }).then(res => this.setState({gymList: res["data"]}))
  }
  showModal = () => {
    Alert.alert(
          'Update',
          'Do you want to save your changes?',
          [

            {
              text: 'Cancel',
              onPress: () => this.closeModal(),
              style: 'cancel',
            },
            {text: 'Save', onPress: () => this.closeModal()},
          ],
          {cancelable: false},
        );
  }
  closeModal = () => {
    this.setState({isVisible: false})

    this.props.navigation.goBack()
  }



  static navigationOptions = {
        title: 'Billing Details',
                        headerTitleStyle: { color: constants.header_text, fontWeight: 'bold'},
                        headerStyle: {backgroundColor: constants.header},
                        headerTintColor: constants.header_text
  }

  _changeNumber = (value) => {
     this.setState({number: value})
  }

  buttonPress = () => {
    alert("this is bomb")
  }
  render(){
    return(
      <Container style={{backgroundColor: constants.screen_color}}>
        {this.state.gymList !== null ?
        <ScrollView showsVerticalScrollIndicator={false}>
        <Content style={{padding: 15}}>
          <View style={{marginTop: 10}}>
             <Card style={{width: '100%', padding: 15}}>
                <CardItem header style={{backgroundColor: constants.card_header, justifyContent: 'space-between'}}>
                   <Text style={{fontWeight: 'bold'}}>Bill</Text>
                   <Text style={{color: constants.active_color, fontWeight: 'bold'}}>ACTIVE</Text>
                </CardItem>
                <CardItem style={{backgroundColor: constants.card_body}}>
                   <Text><Text style={{fontWeight: 'bold'}}>Client:</Text> {this.state.gymList["name"]}</Text>
                </CardItem>
                <CardItem style={{backgroundColor: constants.card_body}}>
                   <Text><Text style={{fontWeight: 'bold'}}>Location count:</Text> {this.state.gymList["gyms"].length}</Text>
                </CardItem>
                <CardItem style={{backgroundColor: constants.card_body}}>
                   <Text><Text style={{fontWeight: 'bold'}}>Mobile:</Text> {this.state.gymList["owner_phone"]}</Text>
                </CardItem>
                <CardItem style={{backgroundColor: constants.card_body}}>
                   <Text style={{fontWeight: 'bold'}}>Plan Type: <Text style={{color: constants.active_color}}> FREE </Text></Text>
                </CardItem>
             </Card>
          </View>


        </Content>
        </ScrollView> : <View style={{justifyContent: 'center', alignItems: 'center'}}><Spinner color="black"/></View>}


      </Container>
    );
  }
}

const styles = StyleSheet.create({
  infoView: {
         marginLeft: 15,
         marginRight: 15,
         marginTop: 10,
         flexDirection: 'row'
  },
  text: {
    fontWeight: 'bold'
  },
  content: {
  },
  view: {
    marginTop: 15
  },
  addButton: {
      position: 'absolute',
      right: 30,
      bottom: 30,
    }
})