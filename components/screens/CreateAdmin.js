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

export default class CreateAdmin extends PureComponent {
  static navigationOptions = {
    title: 'Admins',
    headerTitleStyle: { color: 'black', fontWeight: 'bold'},
    headerStyle: {backgroundColor: '#eadea6'},
    headerTintColor: 'black'
  }

  state = {
      modalVisible: false,
      traineeList: null,
      traineeSub: null,
      auth_key: null,
      onProcess: true,

    };

  setModalVisible(visible) {
      this.setState({modalVisible: visible});
  }

  onChangeSearchInput = (text)=> {
      this.debouncedSearch(text);
  };

  debouncedSearch = debounce(function (query) {
       this.setState({onProcess: false})
      fetch(constants.API + 'current/admin/gyms/'+this.state.id + '/trainee-search?phone='+ query, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': this.state.auth_key,
        }
      }).then(res => {
        if(res.status !== 200){
            this.setState({onProcess: true})
            Alert.alert('OOps!!', 'Something went wrong')
            return null
        }
        else{
            return res.json()
        }
      }).then(res => {
        if(res !== null){
            this.setState({traineeList: res["trainees"], onProcess: true}, () => console.log(res, "Hello frands"))
        }
      })
  }, 100);

  componentWillUnmount() {
        // Remove the event listener
//        this.focusListener.remove();

  }

  componentDidMount(){
//          console.log("id has been retrieved", this.state.id)
//
//          const { navigation } = this.props;
//          console.log("pagal bana rhe hai")
//          this.focusListener = navigation.addListener('didFocus', () => {
//                console.log("The screen is focused")
//                var key  = this.retrieveItem('key').then(res =>
//                             this.setState({auth_key: res}, () => console.log("brother pls", res))
//                             ).then(() => {
//                                  if(this.state.auth_key !== null){
//                                      this.fetchDetails()
//                                  }
//                             })
//          });

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

          <View style={{margin:15}}>
            <Item rounded>
                 <Input keyboardType='numeric' onChangeText = {text => this.onChangeSearchInput(text)} style={{backgroundColor: 'white'}} placeholder='Search by phone number'/>
            </Item>
          </View>
          <List>

                <ListItem avatar>
                    <Left>
                        <Thumbnail source={require('./profile.jpg')} style={{backgroundColor: 'black'}} />
                    </Left>
                   <Body>
                        <View>
                        <Text>Anshul Chug</Text>
                        <Text note>Mobile - 9979090670</Text>
                        </View>
                   </Body>
                </ListItem>
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
                 <Input placeholder="Create Password" />
               </Item>
               <View last style={{alignItems: 'center',justifyContent: 'center', margin: 15, }}>
               <Button rounded style={{backgroundColor: 'black'}}>
                 <Text>Create Admin</Text>
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