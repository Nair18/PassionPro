import React,{Fragment, Component} from 'react';
import { EventRegister } from 'react-native-event-listeners';
import {Container,Text, Content, Item, Card, CardItem, Button,Input, Header, Left,Label, Right, Body, Title, Spinner} from 'native-base';
import {StyleSheet, View, TouchableOpacity, TextInput,AsyncStorage, ScrollView, BackHandler, Form,Modal, Alert, KeyboardAvoidingView} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import DatePicker from 'react-native-datepicker';
import ModalSelector from 'react-native-modal-selector';
import Divider from 'react-native-divider';
import constants from '../constants';

export default class MembershipDetails extends Component{
  constructor(props){
      super(props)
      this.state={
         date: '2019-12-09',
         number: '9979090670',
         amount: '12000',
         isVisible: false,
         client_id: this.props.navigation.state.params.client_id,
         details: this.props.navigation.state.params.details,
         info: this.props.navigation.state.params.info,
         gymId: null,
         auth_key: null
      }
  }

  componentDidMount() {
        const { navigation } = this.props;
        console.log("pagal bana rhe hai")
        this.focusListener = navigation.addListener('didFocus', () => {
          console.log("focusing admin screen")
          var key  = this.retrieveItem(['key', 'id']).then(res =>
                        this.setState({auth_key: res}, () => console.log("brother pls", res))
                      ).then(() => {
                          this.fetchDetails()
                      })
        });
  }

  fetchDetails = () => {
                                   console.log("what is the id ", this.state.gymId)
                                   let course_list = fetch(constants.API + 'current/admin/gyms/'+ this.state.gymId + '/trainees/'+this.state.client_id, {
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
                                   ).then(res => this.setState({details: res["gym_subscriptions"]}))
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


  end_membership = (id) => {
    this.setState({onProcess: true})
    fetch(constants.API + 'current/admin/gyms/'+this.state.gymId + '/trainees/'+ this.state.client_id + '/archive-subscription/'+ id, {
        method: 'PUT',
        headers: {
           'Accept': 'application/json',
           'Content-Type': 'application/json',
           'Authorization': this.state.auth_key,
        },
    }).then(res => {
        this.setState({onProcess: false})
        if(res.status === 200){
            Alert.alert(constants.success, 'Successfully ended the membership')
            this.fetchDetails()
        }
        else if(res.status === 401){
            this.props.navigation.navigate('LandingPage')
        }
        else{
            Alert.alert(constants.failed, constants.fail_error)
        }
    })
  }

  end_membership_alert = (id) => {
    Alert.alert(constants.warning, 'Are you sure you want to delete?',
                [
                    {
                        text: 'Cancel',
                        style: 'cancel',
                    },
                    {text: 'OK', onPress: () => this.end_membership(id)},
                ],
            )
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
        title: 'Membership Details',
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
    if(this.state.details !== null && this.state.details.length>0){
        active = this.state.details.filter((value) => {
            return value["is_active"] === true
        })
        console.log("active bills", active)
        expired = this.state.details.filter((value) => {
                              return value["is_active"] === false
                          })
        console.log("expired bill", expired)
    }
    return(
      <Container style={{backgroundColor: constants.screen_color}}>
         {this.state.details !== null && this.state.info !== null ?
        <ScrollView showsVerticalScrollIndicator={false}>
        <Content style={{padding: 15}}>
          <View>
            <Text style={{fontWeight: 'bold'}}>Active Membership</Text>
          </View>
          {active.length > 0 ? active.map( ac =>
          <View style={{marginTop: 10}}>
             <Card style={{width: '100%',borderRadius: 10, backgroundColor: constants.card_body}}>
                <CardItem header style={{backgroundColor: constants.card_header, justifyContent: 'space-between', borderRadius: 10}}>
                   <Text style={{fontWeight: 'bold'}}>Membership </Text>
                   <Text style={{color: "green", fontWeight: 'bold'}}>{ac["is_active"] ? "ACTIVE" : "EXPIRED"}</Text>
                </CardItem>
                <CardItem style={{backgroundColor: constants.card_body}}>
                   <Text><Text style={{fontWeight: 'bold'}}>Client:</Text> {this.state.info["name"]}</Text>
                </CardItem>
                <CardItem style={{backgroundColor: constants.card_body}}>
                   <Text><Text style={{fontWeight: 'bold'}}>Mobile:</Text> {this.state.info["mobile"]}</Text>
                </CardItem>
                <CardItem style={{backgroundColor: constants.card_body}}>
                   <Text><Text style={{fontWeight: 'bold'}}>Membership start date:</Text> {ac["start_date"]}</Text>
                </CardItem>
                <CardItem style={{backgroundColor: constants.card_body}}>
                   <Text><Text style={{fontWeight: 'bold'}}>Membership end date:</Text> {ac["end_date"]}</Text>
                </CardItem>
                <CardItem style={{backgroundColor: constants.card_body, borderRadius: 10}}>
                   <Text><Text style={{fontWeight: 'bold'}}>Amount Paid:</Text> {'₹'}{ac["amount"]}</Text>
                </CardItem>
                <CardItem style={{justifyContent: 'center', alignItems:'center', borderRadius: 10}}>
                    <Button style={{backgroundColor: constants.red_money, borderRadius: 10}} onPress={() => this.end_membership_alert(ac["sub_id"])}><Text style={{color: 'white'}}>End Membership</Text></Button>
                </CardItem>
             </Card>
          </View>): <View style={{marginTop: 10}}><Card style={{backgroundColor: 'grey', padding: 10, borderRadius: 10, justifyContent: 'center', alignItems: 'center'}}><Text>Nothing to show</Text></Card></View>}
          <View style={{marginTop: 20}}>
            <Text style={{fontWeight: 'bold'}}>Expired Memberships</Text>
          </View>
          {expired.length > 0 ? expired.map(ex =>
          <View style={{marginTop: 10}}>
                <Card style={{width: '100%', borderRadius: 10, backgroundColor: constants.card_body}}>
                   <CardItem header style={{backgroundColor: constants.card_header, justifyContent: 'space-between', borderRadius: 10}}>
                       <Text style={{fontWeight: 'bold'}}>Membership</Text>
                       <Text style={{color: "red", fontWeight: 'bold'}}>{ex["is_active"] ? "ACTIVE" : "EXPIRED"}</Text>
                   </CardItem>
                   <CardItem style={{backgroundColor: constants.card_body}}>
                       <Text><Text style={{fontWeight: 'bold'}}>Client:</Text> {this.state.info["name"]}</Text>
                   </CardItem>
                   <CardItem style={{backgroundColor: constants.card_body}}>
                       <Text><Text style={{fontWeight: 'bold'}}>Mobile:</Text> {this.state.info["mobile"]}</Text>
                   </CardItem>
                   <CardItem style={{backgroundColor: constants.card_body}}>
                       <Text><Text style={{fontWeight: 'bold'}}>Membership start date:</Text> {ex["start_date"]}</Text>
                   </CardItem>
                   <CardItem style={{backgroundColor: constants.card_body}}>
                       <Text><Text style={{fontWeight: 'bold'}}>Membership end date:</Text> {ex["end_date"]}</Text>
                   </CardItem>
                   <CardItem style={{backgroundColor: constants.card_body, borderRadius: 10}}>
                       <Text><Text style={{fontWeight: 'bold'}}>Amount Paid:</Text> {'₹'}{ex["amount"]}</Text>
                   </CardItem>
                </Card>
          </View>): <View style={{marginTop: 10}}><Card style={{backgroundColor: 'grey', padding: 10, alignItems: 'center', borderRadius: 10}}><Text>Nothing to show</Text></Card></View>}
        </Content>
        </ScrollView> : <View style={{justifyContent: 'center', alignItems: 'center'}}><Spinner color="black"/></View>}
        { active.length === 0 ?
        <View style={styles.addButton}>
                            <TouchableOpacity onPress={() => this.props.navigation.navigate('addMembership', {trainee_id: this.state.client_id, id: this.state.gymId})}>
                            <Button rounded style={{height: 50, width: 50, alignItems: 'center', backgroundColor: 'black', justifyContent: 'center'}} onPress={() => this.props.navigation.navigate('addMembership', {trainee_id: this.state.client_id, id: this.state.gymId})}>
                              <Icon size={30} style={{color: 'white'}}name="md-add" />
                            </Button>
                            </TouchableOpacity>
                          </View> : null}

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