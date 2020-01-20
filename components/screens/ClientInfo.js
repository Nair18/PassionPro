import React, {Fragment,Component} from 'react';
import { EventRegister } from 'react-native-event-listeners';
import {TextInput,Image, StyleSheet, ScrollView, TouchableOpacity, Alert, AppState, AsyncStorage} from 'react-native';
import { Button, Container, Content, View, Text,Item, Spinner, Thumbnail, Card, CardItem, List, ListItem} from 'native-base';
import Icon from 'react-native-vector-icons/Ionicons';
import MembershipDetails from './MembershipDetails';
import constants from '../constants';
import PersonalTrainingDetails from './PersonalTrainingDetails';
export default class ClientInfo extends Component {
  constructor(props){
    super(props)
    this.state={
      id: this.props.navigation.state.params.id,
      client_id: this.props.navigation.state.params.client_id,
      courseInfo: null,
      active: this.props.navigation.state.params.active,
      traineeDetails: null,
      role: null
    }
  }
  static navigationOptions = {
      title: 'Client Info',
      headerTitleStyle: { color: constants.header_text, fontWeight: 'bold'},
      headerStyle: {backgroundColor: constants.header},
      headerTintColor: constants.header_text
  }


  componentDidMount(){
            console.log("id has been retrieved", this.state.id)

            const { navigation } = this.props;
            console.log("pagal bana rhe hai")
            this.focusListener = navigation.addListener('didFocus', () => {
                    console.log("The screen is focused")
                    var key  = this.retrieveItem('key', 'id', 'role').then(res =>
                                   this.setState({auth_key: res}, () => console.log("brother pls", res))
                                   ).then(() => {
                                        if(this.state.auth_key !== null){
                                            this.fetchDetails()
                                        }
                                   })
            });

        }

        fetchDetails = () => {
            console.log("what is the id ", this.state.id)
            let course_list = fetch(constants.API + 'current/admin/gyms/'+ this.state.id + '/trainees/'+this.state.client_id, {
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
            ).then(res => this.setState({traineeDetails: res}))
        }

  async retrieveItem(key) {
                 let auth_key = null
                 const retrievedItem =  await AsyncStorage.multiGet(keys);
                        retrievedItem.map(m => {
                           try {
                             if(m[0] === 'key'){
                                auth_key = m[1]
                             }
                             else if(m[0] === 'id' && m[1] !== null && m[1] !== "{}" && m[1] !== "null"){
//                                this.setState({gymId: parseInt(m[1])}, () => console.log("key set hai boss", m[1]))
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

  settingState = (datas) => {
    console.log("Bhai jaan aa gy mein")
    this.setState({datas})
  }


  render(){
    const {traineeDetails} = this.state
    let active = []
    if(traineeDetails !== null){
        active = traineeDetails["gym_subscriptions"].filter(val => {
            return val["is_active"] === true
        })
    }
    return(
       <Fragment>
        <Container style={{backgroundColor: constants.screen_color}}>

            <ScrollView showHorizontalScrollbar={false}>
              {this.state.traineeDetails !== null ?
              <Content>
                <Content style={{marginTop: 10, marginLeft: 30}}>
                    <Thumbnail source={require('./profile.jpg')} />
                </Content>
                <Content style={{padding: 15}}>
                    <View style={styles.infoView}>
                                          <View style={styles.title}>
                                            <Text style={styles.text}>Membership </Text>
                                          </View>
                                          <View style={styles.textFormat}>
                                            <Text style={{color: active.length>0 ? 'green' : 'red', fontWeight: 'bold'}}>{active.length>0 ? "ACTIVE" : "EXPIRED"}</Text>
                                          </View>
                    </View>
                    <View style={styles.infoView}>
                      <View style={styles.title}>
                        <Text style={styles.text}>Name </Text>
                      </View>
                      <View style={styles.textFormat}>
                        <Text>{traineeDetails["name"]}</Text>
                      </View>
                    </View>
                    <View style={styles.infoView}>
                        <View style={styles.title}>
                           <Text style={styles.text}>Gender </Text>
                        </View>
                        <View style={styles.textFormat}>
                           <Text>{traineeDetails["gender"]}</Text>
                        </View>
                     </View>
                    <View style={styles.infoView}>
                        <View style={styles.title}>
                            <Text style={styles.text}>Age </Text>
                        </View>
                        <View style={styles.textFormat}>
                            <Text>{traineeDetails["age"]}</Text>
                        </View>
                    </View>
                    <View style={styles.infoView}>
                      <View style={styles.title}>
                        <Text style={styles.text}>Mobile </Text>
                      </View>
                      <View style={styles.textFormat}>
                         <Text>{traineeDetails["mobile"]}</Text>
                      </View>
                    </View>
                    <View style={styles.infoView}>
                      <View style={styles.title}>
                         <Text style={styles.text}>Address </Text>
                      </View>
                      <View style={styles.textFormat}>
                         <Text>{traineeDetails["address"] === null ? "NA" : traineeDetails["address"]}</Text>
                      </View>
                    </View>

                    <View style={{marginLeft: 15, marginTop: 25, width: '90%'}}>
                          { this.state.role !== "PERSONAL_TRAINER" ?
                          <View>
                          <TouchableOpacity activeOpacity={1} onPress = {() => this.props.navigation.navigate('MembershipDetails', {client_id: this.state.client_id, details: traineeDetails["gym_subscriptions"], info: {"name": traineeDetails["name"], "mobile": traineeDetails["mobile"]}})}>
                                <Card style={{backgroundColor: constants.item_card, borderRadius: 10}}>
                                    <CardItem style={{backgroundColor: constants.item_card, padding: 15, justifyContent: 'space-between', borderRadius: 10}}>
                                            <Text style={{fontWeight: 'bold'}}>Membership details </Text>
                                            <Icon size={20} name="md-arrow-dropright"/>

                                    </CardItem>
                                </Card>
                          </TouchableOpacity>
                          </View> : null }
                         <View style={{marginTop: 10}}>
                         <TouchableOpacity activeOpacity={1} onPress = {() => this.props.navigation.navigate('PersonalTrainingDetails', {auth_key: this.state.auth_key, details: traineeDetails["course_subscriptions"], info: {"name": traineeDetails["name"], "mobile": traineeDetails["mobile"], "id": this.state.id, "client_id": this.state.client_id}})}>
                               <Card style={{backgroundColor: constants.item_card, borderRadius: 10}}>
                                <CardItem style={{backgroundColor: constants.item_card, padding: 15, justifyContent: 'space-between', borderRadius: 10}}>
                                   <Text style={{fontWeight: 'bold'}}>Personal Training details </Text>
                                   <Icon size={20} name="md-arrow-dropright"/>
                                </CardItem>
                               </Card>
                          </TouchableOpacity>
                         </View>
                    </View>
                </Content>
              </Content> : <View style={{justifyContent: 'center', alignItems: 'center'}}><Spinner color="black"/></View>}
            </ScrollView>
        </Container>
       </Fragment>
    );
  }
}

const styles = StyleSheet.create({
     image: {

     },
     imageView: {
       height: 100,
       width: 100,
       justifyContent: 'center',
       alignItems: 'center'
     },
     text: {
       fontWeight: 'bold',
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
     }
})