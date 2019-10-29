import React, { Component, Fragment } from 'react';
import {StyleSheet,View, TouchableOpacity, Modal, Alert, AppState, AsyncStorage} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import TrainerPage from './TrainerPage';
import DatePicker from 'react-native-datepicker';
import constants from '../constants';
import ListSkeleton from './ListSkeleton';
import { Container, Header, Content, List, ListItem, Form, Left, Item, Input, Body,Button, Picker, Right, Thumbnail, Label,Text } from 'native-base';
export default class Trainer extends Component {
  constructor(props){
    super(props)
    this.state = {
         modalVisible: false,
         id: this.props.navigation.state.params.ID,
         auth_key: null,
         date: new Date(),
         trainerList: null,

    }
  }
  static navigationOptions = {
    title: 'Trainers',
    headerTitleStyle: { color: 'black', fontWeight: 'bold'},
    headerStyle: {backgroundColor: 'white', elevation: 0},
    headerTintColor: 'black'
  }

    setModalVisible(visible) {
      this.setState({modalVisible: visible});
    }

  componentDidMount() {
        AppState.addEventListener('change', this._handleAppStateChange);
        const { navigation } = this.props;
        console.log("pagal bana rhe hai")
        this.focusListener = navigation.addListener('didFocus', () => {
          console.log("The screen is focused")
          var key  = this.retrieveItem('key').then(res =>
                          this.setState({auth_key: res}, () => console.log("brother pls", res))
                        ).then(() => this.fetchDetails())
        });

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
                                   'OOps!',
                                   'Something went wrong ...',
                                    [
                                        {text: 'OK', onPress: () => console.log('OK Pressed')},
                                    ],
                                    {cancelable: false},
                                 );
                               }
                             }).then(res => {
                               this.setState({trainerList: res["trainers"]})

                             })

    }
    componentWillUnmount() {
        // Remove the event listener
        this.focusListener.remove();
        AppState.removeEventListener('change', this._handleAppStateChange);
    }

  _handleAppStateChange = (nextAppState) => {
        if (
          this.state.appState.match(/inactive|background/) &&
          nextAppState === 'active'
        ) {
          console.log('App has come to the foreground!');
          this.fetchDetails()
        }
        this.setState({appState: nextAppState});
  };
  render() {
    return (
    <Fragment>
      <Container>

        <Content>
          <List>
            {this.state.trainerList !== null ? this.state.trainerList.map(trainer =>
            <ListItem avatar onPress={() => this.props.navigation.navigate('TrainerPage')}>
              <Left>
                <Thumbnail source={require('./client-profile.png')} style={{backgroundColor: 'black'}} />
              </Left>
              <Body>
                <Text>{trainer["name"]}</Text>
                <Text note>Doing what you like will always keep you happy . .</Text>
              </Body>
            </ListItem>): <ListSkeleton/>}
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
            <TouchableOpacity activeOpacity={0.8} onPress={() => this.setModalVisible(false)}>
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
                 <Input placeholder="Address" />
               </Item>

               <Item style={styles.item}>
                  <Picker
                            note
                            mode="dropdown"
                            style={{ width: 120 }}


                            >
                            <Picker.Item label="Shift 1" value="key0" />
                            <Picker.Item label="Shift 2" value="key1" />
                            <Picker.Item label="Shift 3" value="key2" />
                  </Picker>
               </Item>
               <Item style={styles.item}>
                 <Input placeholder="Emergency contact person's name" />
               </Item>
               <Item style={styles.item}>
                 <Input placeholder="Phone number" />
               </Item>
               <Item style={styles.item}>
                                <Input placeholder="Certification" />
                              </Item>
               <Item style={styles.item}>
                                <Input placeholder="Any medical problem?" />
                              </Item>
               <View last style={{alignItems: 'center',justifyContent: 'center', margin: 15, }}>
               <Button style={{backgroundColor: 'black'}}>
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