import React,{Fragment, Component, PureComponent} from 'react';
import {Container,Text, Content, Item, Card, CardItem, Button,Input, Header, Form, Left,Label, Right, Body, Title, Spinner} from 'native-base';
import {StyleSheet, View, TouchableOpacity, TextInput, ScrollView, BackHandler, AsyncStorage, Modal, Alert} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import DatePicker from 'react-native-datepicker';
import ModalSelector from 'react-native-modal-selector';
import constants from '../constants';
import moment from 'moment';

export default class TrainerBilling extends PureComponent{
  constructor(props){
      super(props)
      this.state={
         payslip: null,
         amount: null,
         description: "NA",
         trainer_id: this.props.navigation.state.params.trainer_id,
         id: this.props.navigation.state.params.id,
         trainee_id: null,
         auth_key: null,
         modalVisible: false,
         onProcess: false
      }
  }



  setModalVisible = (bool) => {
    this.setState({modalVisible: bool})
  }

  static navigationOptions = {
        title: 'Payslip',
                        headerTitleStyle: { color: constants.header_text, fontWeight: 'bold'},
                        headerStyle: {backgroundColor: constants.header},
                        headerTintColor: constants.header_text
  }

  _changeNumber = (value) => {
     this.setState({number: value})
  }

  buttonPress = () => {
    alert("this is bomb")
  }

  componentDidMount(){
                console.log("id has been retrieved", this.state.id)

                const { navigation } = this.props;
                console.log("pagal bana rhe hai")
                this.focusListener = navigation.addListener('didFocus', () => {
                        console.log("The screen is focused")
                      });
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
                let course_list = fetch(constants.API + 'current/admin/gyms/'+ this.state.id + '/trainers/' + this.state.trainer_id + '/slips', {
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
                ).then(res => this.setState({payslip: res}))
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

  componentWillUnmount() {
            // Remove the event listener
            this.focusListener.remove();

  }

  onSubmit = () => {
    if(this.state.amount === null){
        Alert.alert(constants.incomplete_info, 'All * fields are mandatory')
        return
    }
    this.setState({onProcess: true})
    fetch(constants.API + 'current/admin/gyms/trainers/slips', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': this.state.auth_key,
        },
        body: JSON.stringify({
            "amount": parseInt(this.state.amount),
            "date": moment().format("YYYY-MM-DD"),
            "description": this.state.description,
            "gym_id": this.state.id,
            "trainer_id": this.state.trainer_id
        })
    }).then(res => {
        this.setState({onProcess: false, modalVisible: false})
        if(res.status === 200){
            Alert.alert(constants.success, 'Successfully added payslip')
            this.fetchDetails()
        }
        else if(res.status === 401){
            this.props.navigation.navigate('LandingPage')
        }
        else{
            Alert.alert(constants.failed, constants.fail_error)
        }
    })
  }
  render(){
    return(
      <Container style={{backgroundColor: constants.screen_color}}>

        <ScrollView showsVerticalScrollIndicator={false}>

        <Content>
         {this.state.payslip !== null ? this.state.payslip.map(ps =>
          <View style={{margin: 10}}>
             <Card style={{width: '100%', padding: 15, borderRadius: 10}}>
                <CardItem header style={{backgroundColor: constants.card_header,justifyContent: 'space-between'}}>
                   <View>
                    <Text style={{fontWeight: 'bold'}}>Payslip </Text>
                   </View>
                </CardItem>
                <CardItem style={{backgroundColor: constants.card_body}}>
                    <Text><Text style={{fontWeight: 'bold'}}>Trainer Name:</Text> {ps["trainer_name"]}</Text>
                </CardItem>
                <CardItem style={{backgroundColor: constants.card_body}}>
                   <Text><Text style={{fontWeight: 'bold'}}>Trainer Phone:</Text> {ps["trainer_phone"]}</Text>
                </CardItem>
                <CardItem style={{backgroundColor: constants.card_body}}>
                   <Text><Text style={{fontWeight: 'bold'}}>Paid on :</Text> {ps["created_at"]}</Text>
                </CardItem>
                <CardItem style={{backgroundColor: constants.card_body}}>
                   <Text><Text style={{fontWeight: 'bold'}}>Amount Paid:</Text> {'₹'}{ps["amount"]}</Text>
                </CardItem>
                <CardItem style={{ borderRadius: 10}}>
                    <Text><Text style={{fontWeight: 'bold'}}>Remark:</Text> {ps["description"]}</Text>
                </CardItem>
             </Card>
          </View>) : <View style={{justifyContent: 'center', alignItems: 'center'}}><Spinner color="black" /></View>}

        </Content>

        </ScrollView>
        <View style={styles.addButton}>
                            <TouchableOpacity onPress={() => this.setModalVisible(true)}>
                            <Button rounded style={{height: 50, width: 50, alignItems: 'center', backgroundColor: 'black', justifyContent: 'center'}} onPress={() => this.setModalVisible(true)}>
                              <Icon size={30} style={{color: 'white'}}name="md-add" />
                            </Button>
                            </TouchableOpacity>
                          </View>
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
                  <Content style={{margin: 15}}>

                    {this.state.payslip !== null ?
                    (<Form>
                       <View>
                          <Label><Text style={{fontWeight: 'bold'}}>Amount<Text style={{color: 'red'}}>*</Text></Text></Label>
                          <Item regular>
                             <Input keyboardType='numeric' onChangeText={(text) => this.setState({amount: text})}/>
                          </Item>
                       </View>
                       <View style={{marginTop: 10}}>
                          <Label><Text style={{fontWeight: 'bold'}}>Remark</Text></Label>
                          <Item regular>
                             <TextInput rowSpan={5} style={{width: '100%'}} bordered placeholder="Description" onChangeText={text => this.setState({description: text})}/>
                          </Item>
                       </View>
                       <View last style={{alignItems: 'center',justifyContent: 'center', marginTop: 15}}>
                       {this.state.onProcess === false ?
                       <Button onPress={this.onSubmit} style={{backgroundColor: 'black'}}>
                         <Text>Create payslip</Text>
                       </Button> : <Spinner color="black"/>}
                       </View>
                    </Form>) : <View style={{justifyContent: 'center', alignItems: 'center'}}><Text>loading ...</Text></View>}

                  </Content>
                </Modal>
              </View>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  infoView: {
         marginLeft: 15,
         marginRight: 15,
         marginTop: 10,
         flexDirection: 'row'
  },
  text: {
    fontWeight: 'bold'
  },
  content: {

  },
  view: {
    marginTop: 15
  },
  addButton: {
      position: 'absolute',
      right: 30,
      bottom: 30,
    }
})