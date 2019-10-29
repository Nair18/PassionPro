import React, { Component, Fragment } from 'react';
import {StyleSheet,View, TouchableOpacity, Modal, Alert, AppState, AsyncStorage} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import UpdateClient from './UpdateClient';
import ClientInfo from './ClientInfo';
import constants from '../constants';
import ListSkeleton from './ListSkeleton';
import { Container, Header, Content, List, ListItem, Form, Left, Item, Input, Body,Button, Picker, Right, Thumbnail, Text } from 'native-base';
export default class Clients extends Component {
  static navigationOptions = {
    title: 'Clients',
    headerTitleStyle: { color: 'black', fontWeight: 'bold'},
    headerStyle: {backgroundColor: 'white', elevation: 0},
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

  _handleAppStateChange = (nextAppState) => {
        if (
          this.state.appState.match(/inactive|background/) &&
          nextAppState === 'active'
        ) {
          this.fetchDetails()
          console.log('App has come to the foreground!');
        }
        this.setState({appState: nextAppState});
  };

  componentWillUnmount() {
        // Remove the event listener
        this.focusListener.remove();
        AppState.removeEventListener('change', this._handleAppStateChange);
  }

  componentDidMount(){
          console.log("id has been retrieved", this.state.id)
          AppState.addEventListener('change', this._handleAppStateChange);
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
          ).then(res => this.setState({traineeList: res["trainees"]})).then(

              fetch(constants.API + 'current/admin/gyms/'+ this.state.id + '/subscriptions/', {
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
                                    ).then(res => this.setState({traineeSub: res["subscriptions"]}, () => console.log("bhai wtf is this", this.state.coursetype)))
          )
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

  render() {
    return (
    <Fragment>
      <Container>

        <Content>
          <List>
            {this.state.traineeSub !== null ? this.state.traineeList.map((trainee, index) =>
                <ListItem avatar onPress={() => this.props.navigation.navigate('ClientInfo', {DATA: null})}>
                    <Left>
                        <Thumbnail source={require('./client-profile.png')} style={{backgroundColor: 'black'}} />
                    </Left>
                   <Body>
                        <Text>{trainee["name"]}</Text>
                        <Text note>Membership ends on {this.state.traineeSub[index]["end"]}</Text>
                   </Body>
                </ListItem>) : <ListSkeleton/>}
           </List>
            </Content>
                <View style={styles.addButton}>
                    <Button rounded style={{height: 50, width: 50, alignItems: 'center', backgroundColor: 'black', justifyContent: 'center'}} onPress={() => this.setModalVisible(true)}>
                      <Icon size={30} style={{color: 'white'}}name="md-add" />
                    </Button>
                </View>
      </Container>

      <View style={{marginTop: 22}}>
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
                  <Input placeholder="Phone number" />
               </Item>
               <Item style={styles.item}>
                  <Input placeholder="Email" />
               </Item>
               <Item style={styles.item}>
                 <Input placeholder="Password" />
               </Item>
               <Item style={styles.item}>
                 <Input placeholder="Age" />
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
                    <Picker.Item label="ATM Card" value="key1" />
                    <Picker.Item label="Debit Card" value="key2" />
                    <Picker.Item label="Credit Card" value="key3" />
                    <Picker.Item label="Net Banking" value="key4" />
                   </Picker>
                </Item>
                <Item style={styles.item}>
                                   <Picker
                                      note
                                      mode="dropdown"
                                      style={{ width: 120 }}


                                    >
                                    <Picker.Item label="Select plan" value="key0" />
                                    <Picker.Item label="ATM Card" value="key1" />
                                    <Picker.Item label="Debit Card" value="key2" />
                                    <Picker.Item label="Credit Card" value="key3" />
                                    <Picker.Item label="Net Banking" value="key4" />
                                   </Picker>
                                </Item>
               <Item style={styles.item}>
                 <Input placeholder="Emergency contact person's name" />
               </Item>
               <Item style={styles.item}>
                 <Input placeholder="Phone number" />
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