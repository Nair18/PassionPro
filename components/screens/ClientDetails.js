import React,{Fragment, Component} from 'react';
import { EventRegister } from 'react-native-event-listeners';
import {Container,Text, Content, Item, Card, CardItem, Button,Input, Header, Left,Label, Right, Body, Title, Spinner} from 'native-base';
import {StyleSheet, View, TouchableOpacity, TextInput, ScrollView, BackHandler, AsyncStorage,Modal, Alert, KeyboardAvoidingView} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import DatePicker from 'react-native-datepicker';
import ModalSelector from 'react-native-modal-selector';
import constants from '../constants';
import moment from 'moment';

export default class ClientDetails extends Component{
  constructor(props){
      super(props)
      this.state={
         trainerDetails: null,
         trainer_id: this.props.navigation.state.params.trainer_id,
         id: this.props.navigation.state.params.id,
         trainee_id: null,
         auth_key: null
      }
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
        title: 'Client Details',
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

  componentDidMount(){
                console.log("id has been retrieved", this.state.id)

                const { navigation } = this.props;
                console.log("pagal bana rhe hai")
                this.focusListener = navigation.addListener('didFocus', () => {
                        console.log("The screen is focused")
                      });
                var key  = this.retrieveItem('key').then(res =>
                   this.setState({auth_key: res}, () => console.log("brother pls", res))
                   ).then(() => {
                        if(this.state.auth_key !== null){
                            this.fetchDetails()
                        }
                })
  }

  fetchDetails = () => {
                console.log("what is the id ", this.state.id)
                let course_list = fetch(constants.API + 'current/admin/gym/'+ this.state.id + '/subscriptions', {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization': this.state.auth_key,
                    },
                    body: JSON.stringify({
                        "end_date": "2099-01-01",
                        "start_date": "1900-01-01",
                        "trainee_id": this.state.trainee_id,
                        "trainer_id": this.state.trainer_id,
                        "type": "PERSONAL_TRAINING"
                    })
                })
                .then(
                    res => {
                        if(res.status === 200){
                            return res.json()
                        }

                        else{
                            this.setState({loading: false})
                                                           Alert.alert(
                                                             constants.failed,
                                                             constants.fail_error,
                                                              [
                                                                  {text: 'OK', onPress: () => console.log('OK Pressed')},
                                                              ],
                                                              {cancelable: false},
                                                           );
                        }
                    }
                ).then(res => this.setState({trainerDetails: res}))
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

  componentWillUnmount() {
            // Remove the event listener
            this.focusListener.remove();

  }


  render(){
    let active_subs = []
    let expired_subs = []
    console.log("trainerDetails", this.state.trainerDetails)
    if(this.state.trainerDetails !== null){
        active_subs = this.state.trainerDetails["subscriptions"].filter((val) => {
            return val["is_active"] === true
        })
        expired_subs = this.state.trainerDetails["subscriptions"].filter((val) => {
            return val["is_active"] === false
        })
         console.log("trainerDetails", active_subs)
    }
    return(
      <Container style={{backgroundColor: constants.screen_color}}>

        <ScrollView showsVerticalScrollIndicator={false}>
        {this.state.trainerDetails !== null ?
        <Content>
          <View style={{margin: 15}}>
            <Text style={{fontWeight: 'bold'}}>Active Subscription</Text>
          </View>
          {active_subs.length > 0 ? active_subs.map(subs =>
          <View style={{margin: 10}}>
             <Card style={{width: '100%', backgroundColor: constants.card_body, borderRadius: 10}}>
                <CardItem header style={{backgroundColor: constants.card_header,justifyContent: 'space-between', borderRadius: 10}}>
                   <View>
                    <Text style={{fontWeight: 'bold'}}>Bill </Text>
                   </View>
                   <View>
                    <Text style={{color: "green", fontWeight: 'bold'}}> Active</Text>
                   </View>
                </CardItem>
                <CardItem style={{backgroundColor: constants.card_body}}>
                    <Text><Text style={{fontWeight: 'bold'}}>Client:</Text> {subs["trainee_name"]}</Text>
                </CardItem>
                <CardItem style={{backgroundColor: constants.card_body}}>
                   <Text><Text style={{fontWeight: 'bold'}}>Client Phone:</Text> {subs["trainee_phone"]}</Text>
                </CardItem>
                <CardItem style={{backgroundColor: constants.card_body}}>
                   <Text><Text style={{fontWeight: 'bold'}}>From date:</Text> {subs["start_date"]}</Text>
                </CardItem>
                <CardItem style={{backgroundColor: constants.card_body}}>
                   <Text><Text style={{fontWeight: 'bold'}}>To date:</Text> {subs["end_date"]}</Text>
                </CardItem>
                <CardItem style={{backgroundColor: constants.card_body, borderRadius: 10}}>
                   <Text><Text style={{fontWeight: 'bold'}}>Amount Paid:</Text> {'₹'}{subs["amount"]}</Text>
                </CardItem>
             </Card>
          </View>) : <View style={{marginLeft: 15, marginRight: 15}}><Card style={{justifyContent: 'center', alignItems: 'center', padding: 10, backgroundColor: "grey", borderRadius: 10}}><Text>Nothing to show</Text></Card></View>}
          <View style={{margin: 15}}>
            <Text style={{fontWeight: 'bold'}}>Expired Subcriptions</Text>
          </View>
          {expired_subs.length > 0 ? expired_subs.map(subs =>
          <View style={{margin: 10}}>
                <Card style={{width: '100%', backgroundColor: constants.card_body, borderRadius: 10}}>
                    <CardItem header style={{backgroundColor: constants.card_header, justifyContent: 'space-between', borderRadius: 10}}>
                        <View>
                            <Text style={{fontWeight: 'bold'}}>Bill </Text>
                        </View>
                        <View>
                            <Text style={{color: "red", fontWeight: 'bold'}}> Expired</Text>
                        </View>
                    </CardItem>
                    <CardItem style={{backgroundColor: constants.card_body}}>
                        <Text><Text style={{fontWeight: 'bold'}}>Client:</Text> {subs["trainee_name"]}</Text>
                    </CardItem>
                    <CardItem style={{backgroundColor: constants.card_body}}>
                        <Text><Text style={{fontWeight: 'bold'}}>Client Phone:</Text> {subs["trainee_phone"]}</Text>
                    </CardItem>
                    <CardItem style={{backgroundColor: constants.card_body}}>
                        <Text><Text style={{fontWeight: 'bold'}}>From date:</Text> {subs["start_date"]}</Text>
                    </CardItem>
                    <CardItem style={{backgroundColor: constants.card_body}}>
                        <Text><Text style={{fontWeight: 'bold'}}>To date:</Text> {subs["end_date"]}</Text>
                    </CardItem>
                    <CardItem style={{backgroundColor: constants.card_body, borderRadius: 10}}>
                        <Text><Text style={{fontWeight: 'bold'}}>Amount Paid:</Text> {'₹'}{subs["amount"]}</Text>
                    </CardItem>
                </Card>
          </View>) : <View style={{marginLeft: 15, marginRight: 15}}><Card style={{justifyContent: 'center', alignItems: 'center', padding: 10, backgroundColor: "grey", borderRadius: 10}}><Text>Nothing to show</Text></Card></View>}

        </Content> : <View style={{justifyContent: 'center', alignItems: 'center'}}><Spinner color="black" /></View>}

        </ScrollView>

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