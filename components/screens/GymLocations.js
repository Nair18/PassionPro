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
    headerTitleStyle: { color: constants.header_text, fontWeight: 'bold'},
    headerStyle: {backgroundColor: constants.header},
    headerTintColor: constants.header_text
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

  _storeData = async (key,data) => {
          console.log("hitting it hard")
          if(key == "id"){
              data = JSON.stringify(data)
          }
          try {
            await AsyncStorage.setItem(key, data);
          } catch (error) {
            console.log("got error while setting", error)
          }
      return true
  }

  componentWillUnmount() {

//        this.focusListener.remove();

  }

  componentDidMount(){


          const { navigation } = this.props;
          console.log("pagal bana rhe hai")
//          this.focusListener = navigation.addListener('didFocus', () => {
                console.log("The screen is focused")
                var key  = this.retrieveItem('key').then(res =>
                             this.setState({auth_key: res}, () => console.log("brother pls", res))
                             ).then(() => {
                                  if(this.state.auth_key !== null){
                                      this.fetchDetails()
                                  }
                             })
//          });

      }

      fetchDetails = () => {
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
          ).then(res => this.setState({gymList: res["data"]["gyms"]}, () => console.log("gym data revealing", res["data"]["gyms"])))
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

  _gymSwitcher = (id) => {
    this._storeData('id', id).then(res => {
        if(res){
            this.props.navigation.navigate('SplashScreen')
        }
    })
  }

  render() {
    return (
    <Fragment>
      <Container style={{backgroundColor: constants.screen_color}}>

        <Content>
          {this.state.gymList !== null ? this.state.gymList.map(gyms =>
          <List>
              <ListItem avatar onPress={() => this._gymSwitcher(gyms["id"])}>
                  <Left>
                    <Thumbnail source={require('./bank-icon.jpg')}/>
                  </Left>
                  <Body>
                      <View>
                        <Text style={{fontWeight: 'bold'}}>{gyms["name"]}</Text>
                        <Text note>{gyms["location"]}</Text>
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