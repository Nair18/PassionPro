import React, {Fragment,Component} from 'react';
import { EventRegister } from 'react-native-event-listeners';
import {TextInput,Image, StyleSheet, ScrollView, TouchableOpacity, AsyncStorage, Alert} from 'react-native';
import { Button, Container, Content, View, Spinner, Text,Item, Card, CardItem, Thumbnail} from 'native-base';
import UpdateTrainerPage from './UpdateTrainerPage';
import Icon from 'react-native-vector-icons/Ionicons'
import TrainerBilling from './TrainerBilling';
import ClientDetails from './ClientDetails';
import constants from '../constants';
export default class TrainerPage extends Component {
  constructor(props){
    super(props)
    this.state={
      id: this.props.navigation.state.params.id,
      trainer_id: this.props.navigation.state.params.trainer_id,
      trainerDetails: null,
      onProcess: false,
      role: null,
      trainer: null
    }
  }
  static navigationOptions = {
      title: 'Trainer Info',
      headerTitleStyle: { color: 'white', fontWeight: 'bold'},
      headerStyle: {backgroundColor: 'black'},
      headerTintColor: 'white'
  }

  componentDidMount(){
              console.log("id has been retrieved", this.state.id)

              const { navigation } = this.props;
              console.log("pagal bana rhe hai")
              this.focusListener = navigation.addListener('didFocus', () => {
                      console.log("The screen is focused")
                    });
              var key  = this.retrieveItem(['key', 'id', 'role', 'trainer']).then(res =>
                 this.setState({auth_key: res}, () => console.log("brother pls", res))
                 ).then(() => {
                      if(this.state.auth_key !== null){
                          this.fetchDetails()
                      }
                 })
          }

  fetchDetails = () => {
              console.log("what is the id ", this.state.id)
              let course_list = fetch(constants.API + 'current/admin/gyms/'+ this.state.id + '/trainers/'+this.state.trainer_id, {
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
              ).then(res => this.setState({trainerDetails: res}))
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
//                                   this.setState({gymId: parseInt(m[1])}, () => console.log("key set hai boss", m[1]))
                                }
                                else if(m[0] === 'trainer' && m[1] !== null){
                                   this.setState({trainer: m[1]}, () => console.log("fetched role", m[1]))
                                }
                                else if(m[0] === 'role' && m[1] !== null){
                                   this.setState({role: m[1]}, () => console.log("fetched role", m[1]))
                                }
                                console.log("key retrieved")
                              } catch (error) {
                                console.log(error.message);
                              }
                           })
                           return auth_key;
          }
  componentWillUnmount() {
          // Remove the event listener
          this.focusListener.remove();

  }

  archive_trainer = () => {
    this.setState({onProcess: true})
    fetch(constants.API + 'current/admin/gyms/'+ this.state.id + '/trainers/' + this.state.trainer_id + '/gym-subscription-end', {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': this.state.auth_key,
        }
    }).then(res => {
        this.setState({onProcess: false})
        if(res.status === 200){
            Alert.alert(constants.success, 'Successfully expired the trainer')
            this.props.navigation.goBack()
        }
        else if(res.status === 401){
            this.props.navigation.navigate('LandingPage')
        }
        else{
            Alert.alert(constants.failed, constants.fail_error)
        }
    })
  }
  _endAlert = () => {
    Alert.alert(constants.warning, 'Are sure you want to do this?',
        [
           {
              text: 'Cancel',
              style: 'cancel',
           },
           {text: 'OK', onPress: () => this.archive_trainer()},

        ],
    )
  }

  render(){

    const {trainerDetails} = this.state
    return(
       <Fragment>
        <Container style={{backgroundColor: '#F4EAE6'}}>
            {this.state.trainerDetails !== null ?
            <ScrollView showHorizontalScrollbar={false}>
                <Content style={{padding: 15}}>
                  <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                    <View style={styles.imageView}>
                        <Thumbnail large source={require('./profile.jpg')} />
                    </View>
                    {this.state.onProcess === false ?
                    trainerDetails["is_active"] ?
                    <View style={{flex: 1}}>
                        <Button style={{backgroundColor: '#c83349', justifyContent: 'center', alignItems: 'center'}} onPress={this._endAlert}><Text>end contract</Text></Button>
                    </View> :null : <Spinner color="black" /> }
                  </View>
                </Content>
                <Content style={{padding: 15}}>
                    <View style={styles.infoView}>
                      <View style={styles.title}>
                         <Text style={styles.text}>Active: </Text>
                      </View>
                      <View style={styles.textFormat}>
                         <Text style={{fontWeight: 'bold', color: trainerDetails["is_active"] ? "green" : "red"}}>{trainerDetails["is_active"] ? "YES" : "NO"}</Text>
                      </View>
                    </View>
                    <View style={styles.infoView}>
                      <View style={styles.title}>
                        <Text style={styles.text}>Name: </Text>
                      </View>
                      <View style={styles.textFormat}>
                        <Text>{trainerDetails["name"]}</Text>
                      </View>
                    </View>
                    <View style={styles.infoView}>
                        <View style={styles.title}>
                            <Text style={styles.text}>Age: </Text>
                        </View>
                        <View style={styles.textFormat}>
                            <Text>{trainerDetails["age"]}</Text>
                        </View>
                    </View>
                    <View style={styles.infoView}>
                      <View style={styles.title}>
                        <Text style={styles.text}>Mobile: </Text>
                      </View>
                      <View style={styles.textFormat}>
                         <Text>{trainerDetails["phone"]}</Text>
                      </View>
                    </View>
                    <View style={styles.infoView}>
                      <View style={styles.title}>
                         <Text style={styles.text}>Address: </Text>
                      </View>
                      <View style={styles.textFormat}>
                         <Text>{trainerDetails["address"] === null ? "NA": trainerDetails["address"]}</Text>
                      </View>
                    </View>

                    <View style={styles.infoView}>
                       <View style={styles.title}>
                          <Text style={styles.text}>Contract Start Date: </Text>
                       </View>
                       <View style={styles.textFormat}>
                          <Text>{trainerDetails["start_date"] === null ? "NA" : trainerDetails["start_date"]}</Text>
                       </View>
                    </View>
                    <View style={styles.infoView}>
                       <View style={styles.title}>
                         <Text style={styles.text}>Contract End Date </Text>
                       </View>
                       <View style={styles.textFormat}>
                         <Text>{trainerDetails["end_date"] === null || new Date(trainerDetails["end_date"]) > new Date("01-Jan-2050") ? "NA" : trainerDetails["end_date"]}</Text>
                       </View>
                    </View>
                    <View style={styles.infoView}>
                                           <View style={styles.title}>
                                             <Text style={styles.text}>Certifications </Text>
                                           </View>
                                           <View style={styles.textFormat}>
                                             <Text>{trainerDetails["certifications"] === null ? "NA" : trainerDetails["certifications"]}</Text>
                                           </View>
                                        </View>
                    <View style={{margin: 15, width: '90%'}}>
                                                        { this.state.trainer !== "true" ?
                                                        <TouchableOpacity activeOpacity={1} onPress = {() => this.props.navigation.navigate('TrainerBilling', {trainer_id: this.state.trainer_id, id: this.state.id})}>
                                                        <View>
                                                              <Card style={{backgroundColor: constants.item_card, borderRadius: 10}}>
                                                                  <CardItem style={{backgroundColor: constants.item_card, justifyContent: 'space-between', borderRadius: 10}}>

                                                                          <Text style={{fontWeight: 'bold'}}>Trainer Salary details </Text>
                                                                          <Icon size={20} name="md-arrow-dropright"/>

                                                                  </CardItem>
                                                              </Card>
                                                        </View>
                                                        </TouchableOpacity> : null }
                                                       <TouchableOpacity activeOpacity={1} onPress = {() => this.props.navigation.navigate('ClientDetails', {trainer_id: this.state.trainer_id, id: this.state.id})}>
                                                        <View style={{marginTop: 10}}>
                                                             <Card style={{backgroundColor: constants.item_card, borderRadius: 10}}>
                                                              <CardItem style={{backgroundColor: constants.item_card, justifyContent: 'space-between', borderRadius: 10}}>

                                                                      <Text style={{fontWeight: 'bold'}}>Personal Training Client</Text>
                                                                      <Icon size={20} name="md-arrow-dropright"/>

                                                              </CardItem>
                                                             </Card>
                                                        </View>
                                                        </TouchableOpacity>
                                                  </View>




                </Content>
            </ScrollView> : <View style={{justifyContent: 'center', alignItems: 'center'}}><Spinner color="black" /></View>}
        </Container>
       </Fragment>
    );
  }
}

const styles = StyleSheet.create({
     image: {
       width: '100%',
       height: undefined,
       aspectRatio: 1,
     },
     imageView: {
       height: 100,
       width: 100,
       justifyContent: 'center',
       alignItems: 'flex-start',
       flex: 1
     },
     infoView: {
       marginLeft: 15,
       marginRight: 15,
       marginTop: 10,
       flexDirection: 'row'
     },
     textFormat: {
       marginLeft: 25,
       flex: 1
     },
     title: {
       flex: 1
     },
     text: {
         fontWeight: 'bold'
       },
       content: {
         margin: 15
       },
       view: {
         margin: 15
       }
})