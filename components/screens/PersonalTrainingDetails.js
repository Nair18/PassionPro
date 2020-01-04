import React,{Fragment, Component} from 'react';
import { EventRegister } from 'react-native-event-listeners';
import {Container,Text, Content, Item, Card, CardItem, Button,Input, Header, Left,Label, Right, Body, Title, Spinner} from 'native-base';
import {StyleSheet, View, TouchableOpacity, TextInput, ScrollView,AsyncStorage, BackHandler, Form,Modal, Alert, KeyboardAvoidingView} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import DatePicker from 'react-native-datepicker';
import ModalSelector from 'react-native-modal-selector';
import constants from '../constants';
export default class PersonalTrainingDetails extends Component{
  constructor(props){
      super(props)
      this.state={
         client_id: this.props.navigation.state.params.client_id,
         details: this.props.navigation.state.params.details,
         info: this.props.navigation.state.params.info,
         isVisible: false
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

  componentDidMount(){
              console.log("id has been retrieved", this.state.info["id"])

              const { navigation } = this.props;
              console.log("pagal bana rhe hai")
              this.focusListener = navigation.addListener('didFocus', () => {
                      console.log("The screen is focused")
                      var key  = this.retrieveItem('key').then(res =>
                                     this.setState({auth_key: res}, () => console.log("brother pls", res))
                                     ).then(() => {
                                          if(this.state.auth_key !== null){
                                              this.fetchDetails()
                                          }
                                     })
              });

  }

  fetchDetails = () => {
              console.log("what is the id ", this.state.info["id"])
              let course_list = fetch(constants.API + 'current/admin/gyms/'+ this.state.info["id"] + '/trainees/'+ this.state.info["client_id"], {
                  method: 'GET',
                  headers: {
                      'Accept': 'application/json',
                      'Content-Type': 'application/json',
                      'Authorization': this.state.auth_key,
                  }
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
              ).then(res => this.setState({details: res["course_subscriptions"]}))
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
  closeModal = () => {
    this.setState({isVisible: false})

    this.props.navigation.goBack()
  }



  static navigationOptions = {
        title: 'Personal Training Details',
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
    let active = []
    let expired = []
    if(this.state.details !== null){
        active = this.state.details.filter((value) => {
            return value["is_active"] === true
        })
        expired = this.state.details.filter((value) => {
            return value["is_active"] === false
        })
    }
    console.log("id in the personal training detail", this.state.id)
    return(
      <Container style={{backgroundColor: constants.screen_color}}>
        {this.state.info !== null && this.state.details !== null ?
        <ScrollView showsVerticalScrollIndicator={false}>
        <Content style={{padding: 15}}>
          <View>
            <Text style={{fontWeight: 'bold'}}>Active Subscription</Text>
          </View>
          {active.length > 0 ? active.map(ac =>
          <View style={{marginTop: 10}}>
             <Card style={{width: '100%', backgroundColor: constants.card_body, borderRadius: 10}}>
                <CardItem header style={{backgroundColor: constants.card_header, justifyContent: 'space-between', borderRadius: 10}}>
                   <Text style={{fontWeight: 'bold'}}>Training subscription</Text>
                   <Text style={{color: "green", fontWeight: 'bold'}}>{ac["is_active"] !== null ? "ACTIVE" : "EXPIRED"}</Text>
                </CardItem>
                <CardItem style={{backgroundColor: constants.card_body}}>
                    <Text><Text style={{fontWeight: 'bold'}}>Trainer:</Text> {ac["trainer_name"]}</Text>
                </CardItem>
                <CardItem style={{backgroundColor: constants.card_body}}>
                    <Text><Text style={{fontWeight: 'bold'}}>Trainer phone:</Text> {ac["phone"]}</Text>
                </CardItem>
                <CardItem style={{backgroundColor: constants.card_body}}>
                    <Text><Text style={{fontWeight: 'bold'}}>Client Name:</Text> {this.state.info["name"]}</Text>
                </CardItem>
                <CardItem style={{backgroundColor: constants.card_body}}>
                    <Text><Text style={{fontWeight: 'bold'}}>Client Phone:</Text> {this.state.info["mobile"]}</Text>
                </CardItem>
                <CardItem style={{backgroundColor: constants.card_body}}>
                   <Text><Text style={{fontWeight: 'bold'}}>Training start date:</Text> {ac["start_date"]}</Text>
                </CardItem>
                <CardItem style={{backgroundColor: constants.card_body}}>
                   <Text><Text style={{fontWeight: 'bold'}}> Training end date:</Text> {ac["end_date"]}</Text>
                </CardItem>
                <CardItem style={{backgroundColor: constants.card_body, borderRadius: 10}}>
                   <Text><Text style={{fontWeight: 'bold'}}>Amount Paid:</Text> {'₹'}{ac["amount"]}</Text>
                </CardItem>
             </Card>
          </View>) : <View style={{marginTop: 10}}><Card style={{backgroundColor: 'grey', padding: 10, alignItems: 'center', borderRadius: 10}}><Text>Nothing to show</Text></Card></View> }
          <View style={{marginTop: 20}}>
            <Text style={{fontWeight: 'bold'}}>Expired Subcriptions</Text>
          </View>
          { expired.length > 0 ? expired.map(ex =>
          <View style={{marginTop: 10}}>
                <Card style={{width: '100%', backgroundColor: constants.card_body, borderRadius: 10}}>
                    <CardItem header style={{backgroundColor: constants.card_header, justifyContent: 'space-between'}}>
                        <Text style={{fontWeight: 'bold'}}>Training subscription</Text>
                        <Text style={{color: "red", fontWeight: 'bold'}}> {ex["is_active"] !== null ? "EXPIRED" : "ACTIVE"}</Text>
                    </CardItem>
                    <CardItem style={{backgroundColor: constants.card_body}}>
                         <Text><Text style={{fontWeight: 'bold'}}>Trainer:</Text> {ex["trainer_name"]}</Text>
                    </CardItem>
                    <CardItem style={{backgroundColor: constants.card_body}}>
                         <Text><Text style={{fontWeight: 'bold'}}>Trainer phone:</Text> {ex["phone"]}</Text>
                    </CardItem>
                    <CardItem style={{backgroundColor: constants.card_body}}>
                         <Text><Text style={{fontWeight: 'bold'}}>Client Name:</Text> {this.state.info["name"]}</Text>
                    </CardItem>
                    <CardItem style={{backgroundColor: constants.card_body}}>
                         <Text><Text style={{fontWeight: 'bold'}}>Client Phone:</Text> {this.state.info["mobile"]}</Text>
                    </CardItem>
                    <CardItem style={{backgroundColor: constants.card_body}}>
                        <Text><Text style={{fontWeight: 'bold'}}>Training start date:</Text> {ex["start_date"]}</Text>
                    </CardItem>
                    <CardItem style={{backgroundColor: constants.card_body}}>
                        <Text><Text style={{fontWeight: 'bold'}}>Training end date:</Text> {ex["end_date"]}</Text>
                    </CardItem>
                    <CardItem style={{backgroundColor: constants.card_body, borderRadius: 10}}>
                        <Text><Text style={{fontWeight: 'bold'}}>Amount Paid:</Text> {'₹'}{ex["amount"]}</Text>
                    </CardItem>
                </Card>
          </View>) : <View style={{marginTop: 10}}><Card style={{backgroundColor: 'grey', padding: 10, alignItems: 'center', borderRadius: 10}}><Text>Nothing to show</Text></Card></View>}
        </Content>

        </ScrollView> : <View style={{justifyContent: 'center', alignItems: 'center'}}><Spinner color="black" /></View>}
        <View style={styles.addButton}>
                            <TouchableOpacity onPress={() => this.props.navigation.navigate('addSubscription', { id: this.state.info["id"], trainee_id: this.state.info["client_id"]})}>
                            <Button rounded style={{height: 50, width: 50, alignItems: 'center', backgroundColor: 'black', justifyContent: 'center'}} onPress={() => this.props.navigation.navigate('addSubscription', { id: this.state.info["id"], trainee_id: this.state.info["client_id"]})}>
                              <Icon size={30} style={{color: 'white'}}name="md-add" />
                            </Button>
                            </TouchableOpacity>
                          </View>
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