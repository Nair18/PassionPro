import React, { Component, Fragment, PureComponent } from 'react';
import {StyleSheet,View, TouchableOpacity, Modal, Alert, AppState, AsyncStorage} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import UpdateClient from './UpdateClient';
import ClientInfo from './ClientInfo';
import constants from '../constants';
import PageLoader from './PageLoader';
import DatePicker from 'react-native-datepicker'
import { Container, Header, Content, List, ListItem, Form, Left, Item, Input, Label,Body,Button, Picker, Right, Thumbnail, Text } from 'native-base';
import { debounce } from "lodash";

export default class Clients extends PureComponent {
  static navigationOptions = {
    title: 'Clients',
    headerTitleStyle: { color: 'black', fontWeight: 'bold'},
    headerStyle: {backgroundColor: '#eadea6'},
    headerTintColor: 'black'
  }

  state = {
      modalVisible: false,
      traineeList: null,
      traineeSub: null,
      auth_key: null,
      id: this.props.navigation.state.params.ID
    };

  setModalVisible(visible) {
      this.setState({modalVisible: visible});
  }

  onChangeSearchInput = (text)=> {
      this.debouncedSearch(text);
  };

  debouncedSearch = debounce(function (query) {
      console.log("debouncing")
  }, 300);

  componentWillUnmount() {
        // Remove the event listener
//        this.focusListener.remove();

  }

  componentDidMount(){
          console.log("id has been retrieved", this.state.id)

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
          console.log("what is the id ", this.state.id)
          let course_list = fetch(constants.API + 'current/admin/gyms/'+ this.state.id + '/trainees/', {
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
          ).then(res => this.setState({traineeList: res["trainees"]}))
      }
      retrieveItem = async (key) => {
                try {
                  const retrievedItem =  await AsyncStorage.getItem(key);
                  console.log("key retrieved")
                  return retrievedItem;
                } catch (error) {
                  console.log(error.message);
                }
                return;
      }

  render() {
    return (
    <Fragment>
      <Container style={{backgroundColor: '#efe9cc'}}>

        <Content>
         {this.state.traineeList !== null ?
          <View style={{margin:15}}>
            <Item rounded>
                 <Input keyboardType='numeric' onChangeText = {text => this.onChangeSearchInput(text)} style={{backgroundColor: 'white'}} placeholder='Search by phone number'/>
            </Item>
          </View> : null }
          <List>
            {this.state.traineeList !== null ? this.state.traineeList.map((trainee, index) =>
                <ListItem avatar onPress={() => this.props.navigation.navigate('ClientInfo', {DATA: null})}>
                    <Left>
                        <Thumbnail source={require('./profile.jpg')} style={{backgroundColor: 'black'}} />
                    </Left>
                   <Body>
                        <View>
                        <Text>Karthik Nair</Text>
                        <Text note>Membership ends on </Text>
                        </View>
                   </Body>
                </ListItem>) : <PageLoader/>}
           </List>
            </Content>
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
                  <Input placeholder="Name" />
               </Item>
               <Item style={styles.item}>
                  <Input keyboardType="numeric" placeholder="Phone number" />
               </Item>
               <Item style={styles.item}>
                  <Input placeholder="Email" />
               </Item>
               <Item style={styles.item}>
                 <Input placeholder="Password" />
               </Item>
               <Item style={styles.item}>
                 <Input keyboardType="numeric" placeholder="Age" />
               </Item>
               <Item style={styles.item}>
                  <Picker
                  note
                  mode="dropdown"
                  style={{ width: 120 }}

                  >
                  <Picker.Item label="Male" value="key0" />
                  <Picker.Item label="Female" value="key1" />
                  </Picker>
               </Item>
               <Item style={styles.item}>
                 <Input placeholder="Address" />
               </Item>
               <Item style={styles.item}>
                   <Picker
                      note
                      mode="dropdown"
                      style={{ width: 120 }}


                    >
                    <Picker.Item label="Select course" value="key0" />
                    <Picker.Item label="6 months membership" value="key1" />
                    <Picker.Item label="Zumba class" value="key2" />
                    <Picker.Item label="Aerobics classes" value="key3" />
                    <Picker.Item label="Hip hop class" value="key4" />
                    <Picker.Item label="Comtemprary dance" value="key5" />
                                        <Picker.Item label="3 months membership" value="key6" />
                                        <Picker.Item label="zumba + aerobics class" value="key7" />
                                        <Picker.Item label="Defence course" value="key8" /><Picker.Item label="ATM Card" value="key9" />
                                                                                                            <Picker.Item label="Kick boxing class" value="key10" />
                                                                                                            <Picker.Item label="MMA Training" value="key11" />
                                                                                                            <Picker.Item label="Bulking Course" value="key12" />
                                                                                                            <Picker.Item label="Mass gain course" value="key13" />
                                                                                                                                <Picker.Item label="Bulking Course level-1" value="key14" />
                                                                                                                                <Picker.Item label="Bulking Course level-2" value="key15" />
                                                                                                                                <Picker.Item label="Bulking Course level-3" value="key16" />
                   </Picker>
                </Item>
                <Item style={styles.item}>
                                  <Label>Start Date</Label>
                                  <DatePicker
                                          style={{width: 200}}
                                          date={this.state.date}
                                          mode="date"
                                          placeholder="select start date"
                                          format="YYYY-MM-DD"
                                          minDate="2016-05-01"
                                          maxDate="2016-06-01"
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
                                          onDateChange={(date) => {this.setState({date: date})}}
                                        />
                               </Item>
               <Item style={styles.item}>
                                 <Label>End Date</Label>
                                 <DatePicker
                                         style={{width: 200}}
                                         date={this.state.date}
                                         mode="date"
                                         placeholder="select end date"
                                         format="YYYY-MM-DD"
                                         minDate="2016-05-01"
                                         maxDate="2016-06-01"
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
                                         onDateChange={(date) => {this.setState({date: date})}}
                                       />
                              </Item>

                <Item style={styles.item}>
                                <Input keyboardType="numeric" placeholder="Amount paid" />
                              </Item>
               <Item style={styles.item}>
                 <Input placeholder="Emergency contact person's name" />
               </Item>
               <Item style={styles.item}>
                                <Input placeholder="Relation with the person" />
                              </Item>
               <Item style={styles.item}>
                 <Input keyboardType="numeric" placeholder="Emergency Phone number" />
               </Item>
               <View last style={{alignItems: 'center',justifyContent: 'center', margin: 15, }}>
               <Button rounded style={{backgroundColor: 'black'}}>
                 <Text>Submit</Text>
               </Button>
               </View>
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