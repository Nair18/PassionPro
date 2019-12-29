import React,{Fragment, Component} from 'react';
import { EventRegister } from 'react-native-event-listeners';
import {Container,Text, Content, Item, Card, CardItem, Button,Input, Header, Left,Label, Right, Body, Title, Spinner} from 'native-base';
import {StyleSheet, View, TouchableOpacity, TextInput, ScrollView, BackHandler, Form,Modal, Alert, KeyboardAvoidingView} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import DatePicker from 'react-native-datepicker';
import ModalSelector from 'react-native-modal-selector';
import constants from '../constants';
export default class PersonalTrainingDetails extends Component{
  constructor(props){
      super(props)
      this.state={
         client_id: this.props.navigation.state.params.client_id,
         details: this.props.navigation.state.params.details,
         info: this.props.navigation.state.params.info,
         isVisible: false,
         id: this.props.navigation.state.params.id
      }
  }



  showModal = () => {
    Alert.alert(
          'Update',
          'Do you want to save your changes?',
          [

            {
              text: 'Cancel',
              onPress: () => this.closeModal(),
              style: 'cancel',
            },
            {text: 'Save', onPress: () => this.closeModal()},
          ],
          {cancelable: false},
        );
  }
  closeModal = () => {
    this.setState({isVisible: false})

    this.props.navigation.goBack()
  }



  static navigationOptions = {
        title: 'Personal Training Details',
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
  render(){
    let active = []
    let expired = []
    if(this.state.details !== null){
        active = this.state.details.filter((value) => {
            return value["is_active"] === true
        })
        expired = this.state.details.filter((value) => {
            return value["is_active"] === false
        })
    }
    return(
      <Container style={{backgroundColor: constants.screen_color}}>
        {this.state.info !== null && this.state.details !== null ?
        <ScrollView showsVerticalScrollIndicator={false}>
        <Content style={{padding: 15}}>
          <View>
            <Text style={{fontWeight: 'bold'}}>Active Subscription</Text>
          </View>
          {active.length > 0 ? active.map(ac =>
          <View style={{marginTop: 10}}>
             <Card style={{width: '100%', padding: 15}}>
                <CardItem header style={{backgroundColor: constants.card_header, justifyContent: 'space-between'}}>
                   <Text style={{fontWeight: 'bold'}}>Bill</Text>
                   <Text style={{color: "green", fontWeight: 'bold'}}>{ac["is_active"] !== null ? "ACTIVE" : "EXPIRED"}</Text>
                </CardItem>
                <CardItem style={{backgroundColor: constants.card_body}}>
                    <Text><Text style={{fontWeight: 'bold'}}>Trainer:</Text> {ac["trainer_name"]}</Text>
                </CardItem>
                <CardItem style={{backgroundColor: constants.card_body}}>
                    <Text><Text style={{fontWeight: 'bold'}}>Trainer phone:</Text> {ac["phone"]}</Text>
                </CardItem>
                <CardItem style={{backgroundColor: constants.card_body}}>
                    <Text><Text style={{fontWeight: 'bold'}}>Client:</Text> {this.state.info["name"]}</Text>
                </CardItem>
                <CardItem style={{backgroundColor: constants.card_body}}>
                    <Text><Text style={{fontWeight: 'bold'}}>Trainer Phone:</Text> {this.state.info["mobile"]}</Text>
                </CardItem>
                <CardItem style={{backgroundColor: constants.card_body}}>
                   <Text><Text style={{fontWeight: 'bold'}}>Start date:</Text> {ac["start_date"]}</Text>
                </CardItem>
                <CardItem style={{backgroundColor: constants.card_body}}>
                   <Text><Text style={{fontWeight: 'bold'}}>End date:</Text> {ac["end_date"]}</Text>
                </CardItem>
                <CardItem style={{backgroundColor: constants.card_body}}>
                   <Text><Text style={{fontWeight: 'bold'}}>Amount Paid:</Text> {'₹'}{ac["amount"]}</Text>
                </CardItem>
             </Card>
          </View>) : <View><Card style={{backgroundColor: 'black', padding: 10, alignItems: 'center'}}><Text note>Nothing to show</Text></Card></View> }
          <View style={{marginTop: 20}}>
            <Text style={{fontWeight: 'bold'}}>Expired Subcriptions</Text>
          </View>
          { expired.length > 0 ? expired.map(ex =>
          <View style={{marginTop: 10}}>
                <Card style={{width: '100%', padding: 15}}>
                    <CardItem header style={{backgroundColor: constants.card_header, justifyContent: 'space-between'}}>
                        <Text style={{fontWeight: 'bold'}}>Bill</Text>
                        <Text style={{color: "red", fontWeight: 'bold'}}> {ex["is_active"] !== null ? "EXPIRED" : "ACTIVE"}</Text>
                    </CardItem>
                    <CardItem style={{backgroundColor: constants.card_body}}>
                         <Text><Text style={{fontWeight: 'bold'}}>Trainer:</Text> {ex["trainer_name"]}</Text>
                    </CardItem>
                    <CardItem style={{backgroundColor: constants.card_body}}>
                         <Text><Text style={{fontWeight: 'bold'}}>Trainer phone:</Text> {ex["phone"]}</Text>
                    </CardItem>
                    <CardItem style={{backgroundColor: constants.card_body}}>
                         <Text><Text style={{fontWeight: 'bold'}}>Client:</Text> {this.state.info["name"]}</Text>
                    </CardItem>
                    <CardItem style={{backgroundColor: constants.card_body}}>
                         <Text><Text style={{fontWeight: 'bold'}}>Trainer Phone:</Text> {this.state.info["mobile"]}</Text>
                    </CardItem>
                    <CardItem style={{backgroundColor: constants.card_body}}>
                        <Text><Text style={{fontWeight: 'bold'}}>Start date:</Text> {ex["start_date"]}</Text>
                    </CardItem>
                    <CardItem style={{backgroundColor: constants.card_body}}>
                        <Text><Text style={{fontWeight: 'bold'}}>End date:</Text> {ex["end_date"]}</Text>
                    </CardItem>
                    <CardItem style={{backgroundColor: constants.card_body}}>
                        <Text><Text style={{fontWeight: 'bold'}}>Amount Paid:</Text> {'₹'}{ex["amount"]}</Text>
                    </CardItem>
                </Card>
          </View>) : <View style={{marginTop: 10}}><Card style={{backgroundColor: 'black', padding: 10, alignItems: 'center'}}><Text note>Nothing to show</Text></Card></View>}
        </Content>

        </ScrollView> : <View style={{justifyContent: 'center', alignItems: 'center'}}><Spinner color="black" /></View>}
        <View style={styles.addButton}>
                            <Button rounded style={{height: 50, width: 50, alignItems: 'center', backgroundColor: 'black', justifyContent: 'center'}} onPress={() => this.props.navigation.navigate()}>
                              <Icon size={30} style={{color: 'white'}}name="md-add" />
                            </Button>
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