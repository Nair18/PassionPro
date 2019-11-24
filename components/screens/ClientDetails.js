import React,{Fragment, Component} from 'react';
import { EventRegister } from 'react-native-event-listeners';
import {Container,Text, Content, Item, Card, CardItem, Button,Input, Header, Left,Label, Right, Body, Title, Spinner} from 'native-base';
import {StyleSheet, View, TouchableOpacity, TextInput, ScrollView, BackHandler, Form,Modal, Alert, KeyboardAvoidingView} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import DatePicker from 'react-native-datepicker';
import ModalSelector from 'react-native-modal-selector';

export default class ClientDetails extends Component{
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
        title: 'Client Details',
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
      <Container style={{backgroundColor: '#efe9cc'}}>

        <ScrollView showsVerticalScrollIndicator={false}>
        <Content>
          <View style={{margin: 15}}>
            <Text style={{fontWeight: 'bold'}}>---------- Active Subscription ----------</Text>
          </View>

          <View style={{margin: 10}}>
             <Card style={{width: '100%', padding: 15}}>
                <CardItem header style={{backgroundColor: '#d7c79e',justifyContent: 'center', alignItems: 'center'}}>
                   <Text style={{fontWeight: 'bold'}}>Bill No. 1 </Text>
                   <Text style={{color: "green"}}> Active</Text>
                </CardItem>
                <CardItem>
                    <Text><Text style={{fontWeight: 'bold'}}>Client:</Text> Hariram</Text>
                </CardItem>
                <CardItem>
                   <Text><Text style={{fontWeight: 'bold'}}>Course:</Text> Belly reduce</Text>
                </CardItem>
                <CardItem>
                   <Text><Text style={{fontWeight: 'bold'}}>Client Phone:</Text> 9979090671</Text>
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
             </Card>
          </View>
          <View style={{margin: 20}}>
            <Text style={{fontWeight: 'bold'}}>---------- Expired Subcriptions ----------</Text>
          </View>
          <View style={{margin: 10}}>
                <Card style={{width: '100%', padding: 15}}>
                    <CardItem header style={{backgroundColor: '#d7c79e', justifyContent: 'center', alignItems: 'center'}}>
                        <Text style={{fontWeight: 'bold'}}>Bill No. 2 </Text>
                        <Text style={{color: "red"}}> Expired</Text>
                    </CardItem>
                    <CardItem>
                        <Text><Text style={{fontWeight: 'bold'}}>Client:</Text> Lodash</Text>
                    </CardItem>
                    <CardItem>
                        <Text><Text style={{fontWeight: 'bold'}}>Course:</Text> Belly reduce</Text>
                    </CardItem>
                    <CardItem>
                        <Text><Text style={{fontWeight: 'bold'}}>Client Phone:</Text> 9979090671</Text>
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