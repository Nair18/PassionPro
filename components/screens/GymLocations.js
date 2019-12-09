import React, { Component, Fragment, PureComponent } from 'react';
import {StyleSheet,View, TouchableOpacity, Modal, Alert, AppState, AsyncStorage} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import UpdateClient from './UpdateClient';
import ClientInfo from './ClientInfo';
import constants from '../constants';
import PageLoader from './PageLoader';
import DatePicker from 'react-native-datepicker';
import { Container, Header, Content, List, ListItem, Form, Left, Spinner, Item, Input, Label,Body,Button, Picker, Right, Thumbnail, Text } from 'native-base';
import { debounce } from "lodash";

export default class GymLocations extends PureComponent {
  static navigationOptions = {
    title: 'Gyms',
    headerTitleStyle: { color: 'black', fontWeight: 'bold'},
    headerStyle: {backgroundColor: '#eadea6'},
    headerTintColor: 'black'
  }

  state = {
      modalVisible: false,
      traineeList: null,
      traineeSub: null,
      gymList: null,
      auth_key: null,
      onProcess: true
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
          let course_list = fetch(constants.API + 'current/admin/gyms', {
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
          ).then(res => this.setState({gymList: res["data"]["gyms"]}))
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
          {this.state.gymList !== null ? this.state.gymList.map(gyms =>
          <List>
              <ListItem avatar onPress={() => this.props.navigation.navigate('Admin', {id: gyms["id"]})}>
                  <Left>
                    <Thumbnail source={require('./exercise.jpg')}/>
                  </Left>
                  <Body>
                      <View>
                        <Text style={{fontWeight: 'bold'}}>{gyms["name"]}</Text>
                        <Text note>{gyms["location"]}koramangala</Text>
                      </View>
                   </Body>
              </ListItem>
           </List>) : <View style={{justifyContent: 'center', alignItems: 'center'}}><Spinner color="black" /></View>}
            </Content>
      </Container>
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