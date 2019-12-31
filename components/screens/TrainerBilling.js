import React,{Fragment, Component} from 'react';
import { EventRegister } from 'react-native-event-listeners';
import {Container,Text, Content, Item, Card, CardItem, Button,Input, Header, Left,Label, Right, Body, Title, Spinner} from 'native-base';
import {StyleSheet, View, TouchableOpacity, TextInput, ScrollView, BackHandler, Form,Modal, Alert, KeyboardAvoidingView} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import DatePicker from 'react-native-datepicker';
import ModalSelector from 'react-native-modal-selector';
import Divider from 'react-native-divider';
import constants from '../constants';
export default class TrainingBilling extends Component{
  constructor(props){
      super(props)
      this.state={
         date: '2019-12-09',
         number: '9979090670',
         amount: '12000',
         isVisible: false
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
  render(){
    return(
      <Container style={{backgroundColor: constants.screen_color}}>
        <ScrollView showsVerticalScrollIndicator={false}>
        <Content style={{margin: 15}}>
          <View>
            <Text style={{fontWeight: 'bold'}}>---------- Payment history ----------</Text>
          </View>
          <View style={{marginTop: 10}}>
             <Card style={{width: '100%', padding: 15}}>
                <CardItem header style={{backgroundColor: constants.card_header, justifyContent: 'center', alignItems: 'center'}}>
                   <Text style={{fontWeight: 'bold'}}>Payslip for</Text>
                   <Text style={{color: "green"}}> June</Text>
                </CardItem>
                <CardItem style={{backgroundColor: constants.card_body}}>
                    <Text><Text style={{fontWeight: 'bold'}}>Center:</Text> Gold Gym, Hsr</Text>
                </CardItem>
                <CardItem style={{backgroundColor: constants.card_body}}>
                    <Text><Text style={{fontWeight: 'bold'}}>Trainer:</Text> Haresh</Text>
                </CardItem>
                <CardItem style={{backgroundColor: constants.card_body}}>
                   <Text><Text style={{fontWeight: 'bold'}}>Mobile:</Text> 9979090670</Text>
                </CardItem>
                <CardItem style={{backgroundColor: constants.card_body}}>
                   <Text><Text style={{fontWeight: 'bold'}}>Paid on:</Text> 2019-12-10</Text>
                </CardItem>
                <CardItem style={{backgroundColor: constants.card_body}}>
                   <Text><Text style={{fontWeight: 'bold'}}>Salary Paid:</Text> Rs 10000</Text>
                </CardItem>
                <CardItem style={{backgroundColor: constants.card_body}}>
                   <Text><Text style={{fontWeight: 'bold'}}>Penalty Amount:</Text> NA</Text>
                </CardItem>
             </Card>
          </View>

          <View style={{marginTop: 10}}>
                <Card style={{width: '100%', padding: 15}}>
                   <CardItem header style={{backgroundColor: constants.card_header, justifyContent: 'center', alignItems: 'center'}}>
                       <Text style={{fontWeight: 'bold'}}>Payslip for</Text>
                       <Text style={{color: "green"}}> May</Text>
                   </CardItem>
                   <CardItem style={{backgroundColor: constants.card_body}}>
                       <Text><Text style={{fontWeight: 'bold'}}>Center:</Text> Gold Gym, Hsr</Text>
                   </CardItem>
                   <CardItem style={{backgroundColor: constants.card_body}}>
                       <Text><Text style={{fontWeight: 'bold'}}>Trainer:</Text> Haresh</Text>
                   </CardItem>
                   <CardItem style={{backgroundColor: constants.card_body}}>
                       <Text><Text style={{fontWeight: 'bold'}}>Mobile:</Text> 9979090670</Text>
                   </CardItem>
                   <CardItem style={{backgroundColor: constants.card_body}}>
                       <Text><Text style={{fontWeight: 'bold'}}>Paid on:</Text> 2019-09-10</Text>
                   </CardItem>
                   <CardItem style={{backgroundColor: constants.card_body}}>
                       <Text><Text style={{fontWeight: 'bold'}}>Salary Paid:</Text> Rs 10000</Text>
                   </CardItem>
                   <CardItem style={{backgroundColor: constants.card_body}}>
                       <Text><Text style={{fontWeight: 'bold'}}>Penalty Amount:</Text> NA</Text>
                   </CardItem>
                </Card>
          </View>
        </Content>
        </ScrollView>

        <View style={styles.addButton}>
                            <Button rounded style={{height: 50, width: 50, alignItems: 'center', backgroundColor: 'black', justifyContent: 'center'}}>
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