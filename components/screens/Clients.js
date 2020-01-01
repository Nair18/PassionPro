import React, { Component, Fragment, PureComponent } from 'react';
import {StyleSheet,View,ScrollView, TouchableOpacity, Modal, Alert, AppState, AsyncStorage} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import UpdateClient from './UpdateClient';
import ClientInfo from './ClientInfo';
import constants from '../constants';
import PageLoader from './PageLoader';
import DatePicker from 'react-native-datepicker'
import { Container, Header, Content, List, ListItem, Form, Left, Item, Input,Spinner, Label,Body,Button, Picker, Right, Thumbnail, Text } from 'native-base';
import { debounce } from "lodash";

export default class Clients extends PureComponent {
  static navigationOptions = {
    title: 'Clients',
    headerTitleStyle: { color: 'white', fontWeight: 'bold'},
    headerStyle: {backgroundColor: 'black'},
    headerTintColor: 'white'
  }

  state = {
      modalVisible: false,
      traineeList: null,
      traineeSub: null,
      auth_key: null,
      onProcess: false,
      address: null,
      phone: null,
      emergency_phone: null,
      emergency_person: null,
      relation_with_person: null,
      name: null,
      amount: null,
      dob: null,
      start_date: null,
      end_date: null,
      error: constants.fail_error,
      gender: "MALE",
      email: null,
      id: this.props.navigation.state.params.ID
    };

  setModalVisible(visible) {
      this.setState({modalVisible: visible});
      this.fetchDetails()
  }

  onChangeSearchInput = (text)=> {
      this.debouncedSearch(text);
  };

  debouncedSearch = debounce(function (query) {
       this.setState({onProcess: true})
      fetch(constants.API + 'current/admin/gyms/'+this.state.id + '/trainee-search?phone='+ query, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': this.state.auth_key,
        }
      }).then(res => {
        if(res.status !== 200){
            this.setState({onProcess: false})
            Alert.alert(constants.failed, constants.fail_error)
            return null
        }
        else{
//            this.setState({onProcess: false})
            return res.json()
        }
      }).then(res => {
        if(res !== null){
            this.setState({traineeList: res["trainees"], onProcess: false}, () => console.log(res, "Hello frands"))
        }
      })
  }, 100);

  componentWillUnmount() {
        // Remove the event listener
//        this.focusListener.remove();

  }

  componentDidMount(){
          console.log("id has been retrieved", this.state.id)

          const { navigation } = this.props;
          console.log("pagal bana rhe hai")
          console.log("The screen is focused")
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
          fetch(constants.API + 'current/admin/gyms/'+ this.state.id + '/trainees/', {
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
                                                       'OOps!',
                                                       'Something went wrong ...',
                                                        [
                                                            {text: 'OK', onPress: () => console.log('OK Pressed')},
                                                        ],
                                                        {cancelable: false},
                                                     );
                  }
              }
          ).then(res => this.setState({traineeList: res["trainees"].reverse()},() => console.log(res["trainees"])))
      }
      async retrieveItem(key){
                try {
                  const retrievedItem =  await AsyncStorage.getItem(key);
                  console.log("key retrieved")
                  return retrievedItem;
                } catch (error) {
                  console.log(error.message);
                }
                return;
      }

  onSubmit = () => {
    console.log(this.state)
    if(this.state.name === null || this.state.gender === null || this.state.amount === null
    || this.state.start_date === null || this.state.end_date === null || this.state.phone === null || this.state.email === null || this.state.dob === null){
        Alert.alert('Incomplete Info', "All '*' fields are mandatory")
        return
    }
    else if(this.state.start_date > this.state.end_date ){
        Alert.alert(constants.warning, 'Start end cannot be greater than End date')
        return
    }
    this.setState({onProcess: true})
    fetch(constants.API + 'current/admin/gyms/trainees/',{
        method: 'POST',
        headers: {
                          'Accept': 'application/json',
                          'Content-Type': 'application/json',
                          'Authorization': this.state.auth_key,
                 },
        body: JSON.stringify({
          "address": this.state.address,
          "amount": this.state.amount,
          "dob": this.state.dob,
          "email": this.state.email,
          "emergency_person": this.state.emergency_person,
          "emergency_phone": this.state.emergency_phone,
          "end_date": this.state.end_date,
          "gender": this.state.gender,
          "is_active": true,
          "name": this.state.name,
          "passkey": this.state.id,
          "password": "admin",
          "phone": this.state.phone,
          "relation_with_person": this.state.relation_with_person,
          "start_date": this.state.start_date
        })
    }).then(res => {
            this.setState({onProcess: false})
            if(res.status === 200){
                Alert.alert(constants.success, 'Successfully added the client')
                this.setModalVisible(false)
            }
            else if(res.status === 400){
                console.log("message", res.json().then(res => this.setState({error: res.message}, () => Alert.alert(constants.failed, res.message))))

            }
            else if(res.status === 401){

                this.props.navigation.navigate('LandingPage')
                return null
            }
            else{

                Alert.alert(constants.failed, 'Something went wrong')
                return null
            }
        })
  }
  render() {
    return (
    <Fragment>
      <Container style={{backgroundColor: '#F4EAE6'}}>
        <ScrollView showsVerticalScrollBar={false}>
        <Content style={{margin: 15}}>
         {this.state.traineeList  !== null ?
          <View style={{margin:15, backgroundColor: 'white'}}>
            <Item style={{padding: 5}}>
                 <Input keyboardType='numeric' onChangeText = {text => this.onChangeSearchInput(text)} style={{backgroundColor: 'white'}} placeholder='Search by phone number'/>
                 <Icon name="md-search" size={30} />
            </Item>
          </View> : null }
          <List>
            {this.state.traineeList !== null && this.state.onProcess == false ? this.state.traineeList.map((trainee) =>
                <ListItem avatar onPress={() => this.props.navigation.navigate('ClientInfo', {client_id: trainee["id"], id: this.state.id, active: trainee["is_active"]})}>
                    <Left>
                        <Thumbnail source={require('./profile.jpg')} style={{backgroundColor: 'black'}} />
                    </Left>
                   <Body>
                        <View>
                        <Text style={{fontWeight: 'bold', color: trainee["is_active"] ? '#2c7873' : '#9d0b0b'}}>{trainee["name"]}</Text>
                        <Text note>Mobile - {trainee["phone"]}</Text>
                        </View>
                   </Body>
                </ListItem>) : <PageLoader/>}
           </List>
            </Content>
            </ScrollView>
                <View style={styles.addButton}>
                    <Button rounded style={{height: 50, width: 50, alignItems: 'center', backgroundColor: 'black', justifyContent: 'center'}} onPress={() => this.setModalVisible(true)}>
                      <Icon size={30} style={{color: 'white'}}name="md-add" />
                    </Button>
                </View>
      </Container>

      <View>
        <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.modalVisible}
          onRequestClose={() => {
            this.setModalVisible(false)
          }}>
          <View style={{margin: 15}}>
            <TouchableOpacity onPress={() => this.setModalVisible(false)}>
            <Icon name="md-close" size={30}/>
            </TouchableOpacity>
      </View>
          <Content style={styles.content}>
            <Form>
               <Item style={styles.item}>
                  <Label>Name <Text style={{color: 'red'}}>*</Text> - </Label>
                  <Input onChangeText={text => this.setState({name: text})}/>
               </Item>
               <Item style={styles.item}>
                  <Label>Phone <Text style={{color: 'red'}}>*</Text> - </Label>
                  <Input keyboardType="numeric" onChangeText={text => this.setState({phone: text})} />
               </Item>
               <Item style={styles.item}>
                  <Label>Email <Text style={{color: 'red'}}>*</Text> - </Label>
                  <Input onChangeText={text => this.setState({email: text})} />
               </Item>
               <Item style={styles.item}>
                 <Label>DoB <Text style={{color: 'red'}}>*</Text></Label>
                 <DatePicker
                                                           style={{width: 200}}
                                                           date={this.state.dob}
                                                           mode="date"
                                                           placeholder="Select Date of Birth"
                                                           format="YYYY-MM-DD"
                                                           minDate="1900-01-01"
                                                           maxDate= "2099-01-01"
                                                           confirmBtnText="Confirm"
                                                           cancelBtnText="Cancel"
                                                           customStyles={{
                                                             dateIcon: {
                                                               position: 'absolute',
                                                               left: 0,
                                                               top: 4,
                                                               marginLeft: 0
                                                             },
                                                             dateInput: {
                                                               marginLeft: 36
                                                             }
                                                             // ... You can check the source to find the other keys.
                                                           }}
                                                           onDateChange={(date) => {this.setState({dob: date})}}
                                                         />
               </Item>
               <Item style={styles.item}>
                  <Label>Gender <Text style={{color: 'red'}}>*</Text> - </Label>
                  <Picker
                  note
                  mode="dropdown"
                  style={{ width: 120 }}
                  selectedValue={this.state.gender}
                  onValueChange={(itemValue, itemIndex) =>
                      this.setState({gender: itemValue.toUpperCase()})
                  }
                  >
                  <Picker.Item label="Male" value="MALE" />
                  <Picker.Item label="Female" value="FEMALE" />
                  </Picker>
               </Item>
               <Item style={styles.item}>
                 <Label>Address - </Label>
                 <Input onChangeText={text => this.setState({address: text})} />
               </Item>

                <Item style={styles.item}>
                                  <Label>Start Date <Text style={{color: 'red'}}>*</Text> - </Label>
                                  <DatePicker
                                          style={{width: 200}}
                                          date={this.state.start_date}
                                          mode="date"
                                          placeholder="select start date"
                                          format="YYYY-MM-DD"
                                          minDate="1900-01-01"
                                          maxDate="2099-01-01"
                                          confirmBtnText="Confirm"
                                          cancelBtnText="Cancel"
                                          customStyles={{
                                            dateIcon: {
                                              position: 'absolute',
                                              left: 0,
                                              top: 4,
                                              marginLeft: 0
                                            },
                                            dateInput: {
                                              marginLeft: 36
                                            }
                                            // ... You can check the source to find the other keys.
                                          }}
                                          onDateChange={(date) => {this.setState({start_date: date})}}
                                        />
                               </Item>
               <Item style={styles.item}>
                                 <Label>End Date <Text style={{color: 'red'}}>*</Text> - </Label>
                                 <DatePicker
                                         style={{width: 200}}
                                         date={this.state.end_date}
                                         mode="date"
                                         placeholder="select end date"
                                         format="YYYY-MM-DD"
                                         minDate="1900-01-01"
                                         maxDate="2099-01-01"
                                         confirmBtnText="Confirm"
                                         cancelBtnText="Cancel"
                                         customStyles={{
                                           dateIcon: {
                                             position: 'absolute',
                                             left: 0,
                                             top: 4,
                                             marginLeft: 0
                                           },
                                           dateInput: {
                                             marginLeft: 36
                                           }
                                           // ... You can check the source to find the other keys.
                                         }}
                                         onDateChange={(date) => {this.setState({end_date: date})}}
                                       />
                              </Item>

                <Item style={styles.item}>
                                <Label>Amount Paid <Text style={{color: 'red'}}>*</Text> - </Label>
                                <Input keyboardType="numeric" onChangeText={text => this.setState({amount: parseInt(text)})} />
                              </Item>
               <Item style={styles.item}>
                 <Input placeholder="Emergency contact person's name" onChangeText={text => this.setState({emergency_person: text})}/>
               </Item>
               <Item style={styles.item}>
                                <Input placeholder="Relation with the person" onChangeText={text => this.setState({relation_with_person: text})}/>
                              </Item>
               <Item style={styles.item}>
                 <Input keyboardType="numeric" placeholder="Emergency Phone number" onChangeText={text => this.setState({emergency_phone: text})}/>
               </Item>
               {this.state.onProcess == false ?
                    <View last style={{alignItems: 'center',justifyContent: 'center', margin: 15, }}>
                        <Button style={{backgroundColor: 'black'}} onPress={this.onSubmit}>
                            <Text>Add Client</Text>
                        </Button>
                    </View> : <View style={{justifyContent: 'center', alignItems: 'center'}}><Spinner color="black"/></View>}
            </Form>
          </Content>
        </Modal>
      </View>

     </Fragment>
    );
  }
}
const styles = StyleSheet.create({
  addButton: {
    position: 'absolute',
    right: 30,
    bottom: 30,
  },
  item: {
    margin: 15
  }
});