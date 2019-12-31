import React,{Fragment, Component} from 'react';
import { EventRegister } from 'react-native-event-listeners';
import {Container,Text, Content, Item, Card, CardItem, Button,Input, Header, Left,Label, Right, Body, Title, Spinner} from 'native-base';
import {StyleSheet, View, TouchableOpacity, TextInput, ScrollView, BackHandler, Form,Modal, Alert, KeyboardAvoidingView} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import DatePicker from 'react-native-datepicker';
import ModalSelector from 'react-native-modal-selector';

export default class UpdateClient extends Component{
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
        title: 'Update Client Info',
                        headerTitleStyle: { color: 'black', fontWeight: 'bold'},
                        headerStyle: {backgroundColor: 'white', elevation: 0},
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
      <Container>

        <ScrollView>
        <Content style={styles.content}>
          <View style={styles.view}>
             <Text style={styles.text}>Update membership amount paid</Text>
             <Item regular>
               <Input  keyboardType='numeric' value={this.state.amount} onChangeText = {(value) => this._changeNumber(value)}/>
             </Item>
          </View>
          <View style={styles.view}>
            <Text style={styles.text}>Update membership end date</Text>
            <DatePicker
                  date={this.state.date}
                  onDateChange={date => this.setState({ date })}

                  mode = 'date'
                  textColor = '#3e4444'
            />
          </View>
          <View style={styles.view}>
            <Card>
                <CardItem header>
                    <Text style={styles.text}>Courses</Text>
                </CardItem>

                    <CardItem>
                        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                            <View style={{flex: 1}}>
                                <Text>Muscle building</Text>
                            </View>
                            <TouchableOpacity>
                            <View style={{flex: 1}}>
                                <Icon size={20} name="md-close"/>
                            </View>
                            </TouchableOpacity>
                        </View>
                    </CardItem>
                <TouchableOpacity>
                <CardItem footer style={{backgroundColor: 'grey'}}>
                    <Text>Assign Course</Text>
                </CardItem>
                </TouchableOpacity>
            </Card>
          </View>
            <View style={styles.view}>
              <Card>
                <CardItem header>
                   <Text style={styles.text}>Trainers</Text>
                </CardItem>

                <CardItem>
                   <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                      <View style={{flex: 1}}>
                         <Text>Jagga Pehelwan</Text>
                      </View>
                      <TouchableOpacity>
                         <View style={{flex: 1}}>
                            <Icon size={20} name="md-close"/>
                         </View>
                      </TouchableOpacity>
                   </View>
                </CardItem>
                   <TouchableOpacity>
                      <CardItem footer style={{backgroundColor: 'grey'}}>
                         <Text>Assign Trainer</Text>
                      </CardItem>
                   </TouchableOpacity>
              </Card>
            </View>

            <View style={{margin: 25}}>
              <Button style={{backgroundColor: '#c83349', justifyContent: 'center', alignItems: 'center'}}><Text>End Membership</Text></Button>
            </View>

        </Content>

        </ScrollView>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  text: {
    fontWeight: 'bold'
  },
  content: {
    margin: 15
  },
  view: {
    marginTop: 15
  }
})