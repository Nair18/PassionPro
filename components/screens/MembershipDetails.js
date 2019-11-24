import React,{Fragment, Component} from 'react';
import { EventRegister } from 'react-native-event-listeners';
import {Container,Text, Content, Item, Card, CardItem, Button,Input, Header, Left,Label, Right, Body, Title, Spinner} from 'native-base';
import {StyleSheet, View, TouchableOpacity, TextInput, ScrollView, BackHandler, Form,Modal, Alert, KeyboardAvoidingView} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import DatePicker from 'react-native-datepicker';
import ModalSelector from 'react-native-modal-selector';
import Divider from 'react-native-divider';

export default class MembershipDetails extends Component{
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
        title: 'Membership Details',
                        headerTitleStyle: { color: 'black', fontWeight: 'bold'},
                        headerStyle: {backgroundColor: '#eadea6'},
                        headerTintColor: 'black'
  }

  _changeNumber = (value) => {
     this.setState({number: value})
  }

  buttonPress = () => {
    alert("this is bomb")
  }
  render(){
    return(
      <Container style={{justifyContent: 'center', alignItems: 'center',backgroundColor: '#efe9cc'}}>
        <ScrollView showsVerticalScrollIndicator={false}>
        <Content style={{padding: 15}}>
          <View style={{margin: 15}}>
            <Text style={{fontWeight: 'bold'}}>---------- Active Subscription ----------</Text>
          </View>
          <View style={{marginTop: 10}}>
             <Card style={{width: '100%', padding: 15}}>
                <CardItem header style={{backgroundColor: '#d7c79e'}}>
                   <Text style={{fontWeight: 'bold'}}>Bill No. 1 </Text>
                   <Text style={{color: "green"}}> Active</Text>
                </CardItem>
                <CardItem>
                   <Text><Text style={{fontWeight: 'bold'}}>Client:</Text> Hariram</Text>
                </CardItem>
                <CardItem>
                   <Text><Text style={{fontWeight: 'bold'}}>Mobile:</Text> 9979090670</Text>
                </CardItem>
                <CardItem>
                   <Text><Text style={{fontWeight: 'bold'}}>Start date:</Text> 2019-09-10</Text>
                </CardItem>
                <CardItem>
                   <Text><Text style={{fontWeight: 'bold'}}>End date:</Text> 2019-12-10</Text>
                </CardItem>
                <CardItem>
                   <Text><Text style={{fontWeight: 'bold'}}>Amount Paid:</Text> Rs 10000</Text>
                </CardItem>
                <TouchableOpacity>
                    <CardItem footer style={{backgroundColor: "#d96459"}}>
                        <Text style={{color: 'white'}}>End membership</Text>
                    </CardItem>
                </TouchableOpacity>
             </Card>
          </View>
          <View style={{margin: 20}}>
            <Text style={{fontWeight: 'bold'}}>---------- Expired Subscriptions ----------</Text>
          </View>
          <View style={{marginTop: 10}}>
                <Card style={{width: '100%', padding: 15}}>
                   <CardItem header style={{backgroundColor: '#d7c79e'}}>
                       <Text style={{fontWeight: 'bold'}}>Bill No. 2 </Text>
                       <Text style={{color: "red"}}> Expired</Text>
                   </CardItem>
                   <CardItem>
                       <Text><Text style={{fontWeight: 'bold'}}>Center:</Text> Gold Gym, Hsr</Text>
                   </CardItem>
                   <CardItem>
                       <Text><Text style={{fontWeight: 'bold'}}>Client:</Text> Hariram</Text>
                   </CardItem>
                   <CardItem>
                       <Text><Text style={{fontWeight: 'bold'}}>Mobile:</Text> 9979090670</Text>
                   </CardItem>
                   <CardItem>
                       <Text><Text style={{fontWeight: 'bold'}}>Start date:</Text> 2019-01-10</Text>
                   </CardItem>
                   <CardItem>
                       <Text><Text style={{fontWeight: 'bold'}}>End date:</Text> 2019-09-10</Text>
                   </CardItem>
                   <CardItem>
                       <Text><Text style={{fontWeight: 'bold'}}>Amount Paid:</Text> Rs 10000</Text>
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