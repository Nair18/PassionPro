import React, { Component, Fragment, PureComponent } from 'react';
import {StyleSheet,ScrollView, View, TouchableOpacity, Modal, Alert, AppState, AsyncStorage} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import TrainerPage from './TrainerPage';
import DatePicker from 'react-native-datepicker';
import constants from '../constants';
import PageLoader from './PageLoader';
import { Container, Header, Content, List, ListItem, Form, Left, Item,Spinner, Input, Body,Button, Picker, Right, Thumbnail, Label,Text } from 'native-base';
import {debounce} from 'lodash';

export default class Trainer extends PureComponent {
  constructor(props){
    super(props)
    this.state = {
         modalVisible: false,
         id: this.props.navigation.state.params.ID,
         auth_key: null,
         onProcess: false,
         name: null,
         dob: null,
         start_date: null,
         certifications: null,
         relation_with_person: null,
         emergency_person: null,
         emergency_phone: null,
         phone: null,
         email: null,
         gender: "MALE",
         error: null,
         date: new Date(),
         trainerList: null,

    }
  }
  static navigationOptions = {
    title: 'Trainers',
    headerTitleStyle: { color: 'white', fontWeight: 'bold'},
    headerStyle: {backgroundColor: 'black'},
    headerTintColor: 'white'
  }

    setModalVisible(visible) {
      this.setState({modalVisible: visible});
    }

  componentDidMount() {

        const { navigation } = this.props;
        console.log("pagal bana rhe hai")
        this.focusListener = navigation.addListener('didFocus', () => {
          console.log("The screen is focused")
          var key  = this.retrieveItem('key').then(res =>
                          this.setState({auth_key: res}, () => console.log("brother pls", res))
                        ).then(() => this.fetchDetails())
        });

    }

    onChangeSearchInput = (text)=> {
          this.debouncedSearch(text);
      };

      debouncedSearch = debounce(function (query) {
          console.log("debouncing")
      }, 100);

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
    fetchDetails = () => {
      console.log("Api fetch going to be called")
      this.setState({loading: true})
      console.log("auth key fetched", this.state.auth_key)
      fetch(constants.API + 'current/admin/gyms/' + this.state.id + '/trainers/',{
                                    method: 'GET',
                                    headers: {
                                      'Accept': 'application/json',
                                      'Content-Type': 'application/json',
                                      'Authorization': this.state.auth_key,
                                    },
                              })
                             .then(response => {
                               if (response.status === 200) {
                                 return response.json();
                               } else {
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
                             }).then(res => {
                               this.setState({trainerList: res["trainers"].reverse()})

                             })

    }
    componentWillUnmount() {
        // Remove the event listener
        this.focusListener.remove();

    }
    onSubmit = () => {
        console.log("state", this.state)
        if(this.state.name === null || this.state.email === null || this.state.gender === null ||
        this.state.phone === null || this.state.start_date === null){
            Alert.alert(constants.incomplete_info, "All '*' fields are mandatory")
            return
        }
        this.setState({onProcess: true})
        fetch(constants.API + 'current/admin/gyms/trainers/', {
            method: 'POST',
            headers: {
               'Accept': 'application/json',
               'Content-Type': 'application/json',
               'Authorization': this.state.auth_key,
            },
            body: JSON.stringify({
              "address": this.state.address === null ? "NA" : this.state.address,
              "certifications": this.state.certifications === null ? "NA" : this.state.certifications,
              "dob": this.state.dob,
              "device_token": "string",
              "email": this.state.email,
              "emergency_person": this.state.emergency_person === null ? "NA" : this.state.emergency_person,
              "emergency_phone": this.state.emergency_phone === null ? "NA": this.state.emergency_phone,
              "gender": this.state.gender,
              "amount": 0,
              "is_active": true,
              "name": this.state.name,
              "passkey": parseInt(this.state.id),
              "password": "admin",
              "phone": this.state.phone,
              "relation_with_person": this.state.relation_with_person === null ? "NA" : this.state.relation_with_person,
              "start_date": this.state.start_date,
              "end_date": "2099-01-01"
            })
        }).then(res => {
            if(res.status === 200){
                this.setState({onProcess: false, modalVisible: false}, () => this.fetchDetails())
                Alert.alert(constants.success, 'Successfully added trainer')
                return
            }
            else if(res.status === 400){
                console.log("message", res.json().then(res => this.setState({error: res.message}, () => Alert.alert(constants.failed, res.message))))
            }
            else if(res.status === 401){
                this.setState({onProcess: false})
                this.props.navigation.navigate('LandingPage')
                return
            }
            else{
                this.setState({onProcess: false})
                Alert.alert(constants.failed, constants.fail_error)
                return
            }
        })
  }

  onChangeSearchInput = (text)=> {
        this.debouncedSearch(text);
  };

  debouncedSearch = debounce(function (query) {
           this.setState({onProcess: true})
          fetch(constants.API + 'current/admin/gyms/'+this.state.id + '/trainer-search?phone='+ query, {
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
                this.setState({trainerList: res["trainers"], onProcess: false}, () => console.log(res, "Hello frands"))
            }
          })
  }, 100);


  render() {
    let actiive_list = []
    let expired_list = []
    let trainerslist = []
    return (
    <Fragment>
      <Container style={{backgroundColor: '#F4EAE6'}}>
        <ScrollView showsVerticalScrollBar={false}>
        <Content style={{margin: 15}}>
          {this.state.trainerList !== null ?
                    <View style={{margin:15, backgroundColor: 'white'}}>
                      <Item regular style={{padding: 5}}>
                           <Input keyboardType='numeric' style={{borderColor: 'black', borderWidth: 1}} onChangeText = {text => this.onChangeSearchInput(text)} style={{backgroundColor: 'white'}} placeholder='Search by phone number'/>
                           <Icon name="md-search" size={30} />
                      </Item>
                    </View> : null }
          <List>
            {this.state.trainerList !== null && this.state.onProcess == false ? this.state.trainerList.map(trainer =>
            <ListItem avatar style={{padding: 5}} onPress={() => this.props.navigation.navigate('TrainerPage', {id: this.state.id, trainer_id: trainer["id"]})}>
              <Left>
                <Thumbnail source={require('./client-profile.png')} style={{backgroundColor: 'black'}} />
              </Left>
              <Body>
                <Text style={{fontWeight: 'bold', color: trainer["is_active"] ? '#2c7873' : '#9d0b0b'}}>{trainer["name"]}</Text>
                <Text note>Mobile - {trainer["phone"]}</Text>
              </Body>
            </ListItem>): <PageLoader/>}
          </List>
        </Content>
        </ScrollView>
        <View style={styles.addButton}>
                    <Button rounded style={{height: 50, width: 50, alignItems: 'center', backgroundColor: 'black', justifyContent: 'center'}} onPress={() => this.setModalVisible(true)}>
                      <Icon size={30} style={{color: 'white'}}name="md-add" />
                    </Button>
                  </View>
      </Container>

      <View >
        <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.modalVisible}
          onRequestClose={() => {
            this.setModalVisible(false)
          }}>
          <View style={{margin: 15}}>
            <TouchableOpacity activeOpacity={1} onPress={() => this.setModalVisible(false)}>
            <Icon name="md-close" size={30}/>
            </TouchableOpacity>
      </View>
          <Content style={styles.content}>
            <Form>
               <Item style={styles.item}>
                  <Label>Name<Text style={{color: 'red'}}>*</Text> - </Label>
                  <Input onChangeText={text => this.setState({name: text})} />
               </Item>
               <Item style={styles.item}>
                  <Label>Phone<Text style={{color: 'red'}}>*</Text> - </Label>
                  <Input keyboardType="numeric" onChangeText={text => this.setState({phone: text})}/>
               </Item>
               <Item style={styles.item}>
                  <Label>Email<Text style={{color: 'red'}}>*</Text> - </Label>
                  <Input onChangeText={text => this.setState({email: text})}/>
               </Item>

               <Item style={styles.item}>
                 <Label>DOB - </Label>
                                   <DatePicker
                                           style={{width: 200}}
                                           date={this.state.dob}
                                           mode="date"
                                           placeholder="select Date of Birth"
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
                  <Label>Contract Start Date <Text style={{color: 'red'}}>*</Text></Label>
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
                 <Label>Address - </Label>
                 <Input onChangeText={text => this.setState({address: text})}/>
               </Item>
               <Item style={styles.item}>
                   <Label>Certifications - </Label>
                   <Input onChangeText={text => this.setState({certifications: text})}/>
               </Item>
               <Item style={styles.item}>
                 <Input placeholder="Emergency contact person's name" onChangeText={text => this.setState({emergency_person: text})}/>
               </Item>
               <Item style={styles.item}>
                 <Input placeholder="Relation with the person" onChangeText={text => this.setState({relation_with_person: text})}/>
               </Item>
               <Item style={styles.item}>
                 <Input placeholder="Emergency Phone number" keyboardType="numeric" onChangeText={text => this.setState({emergency_phone: text})}/>
               </Item>
               {this.state.onProcess == false ?
               <View last style={{alignItems: 'center',justifyContent: 'center', margin: 15, }}>
                 <Button style={{backgroundColor: 'black'}} onPress={this.onSubmit}>
                    <Text>Add Trainer</Text>
                 </Button>
               </View> : <Spinner color="black" /> }
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