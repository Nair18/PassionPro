import React,{Fragment, Component} from 'react';
import { EventRegister } from 'react-native-event-listeners';
import {Container,Text, Content, Item, Card, CardItem, Button, Header, Left, Right, Body, Title} from 'native-base';
import {StyleSheet, View, TextInput, TouchableOpacity, ScrollView, BackHandler, Alert, StatusBar} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import DatePicker from 'react-native-datepicker';

export default class UpdateTrainerPage extends Component{
  constructor(props){
      super(props)
      this.state={
         date: '2019-12-09',
         number: '9979090670',
         amount: '12000'
      }
  }

  static navigationOptions = {
    title: 'Update Trainer Info',
                    headerTitleStyle: { color: 'black', fontWeight: 'bold'},
                    headerStyle: {backgroundColor: '#eadea6'},
                    headerTintColor: 'black'
  }
  componentDidMount() {
        this.props.navigation.setParams({ increaseCount: this._increaseCount })

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
      EventRegister.emit('UpdateClient', 'it works!!!')
      this.props.navigation.goBack()
    }
    componentWillUnmount() {

    }
  _changeNumber = (value) => {
     this.setState({number: value})
  }
  render(){
    return(
      <Container style={{backgroundColor: '#efe9cc'}}>

        <ScrollView>
        <Content style={styles.content}>

          <View style={styles.view}>
             <Text style={styles.text}>Salary Offered</Text>
             <Item regular>
               <TextInput editable = {true} keyboardType='numeric' value={this.state.amount} onChangeText = {(value) => this._changeNumber(value)}/>
             </Item>
          </View>

          <View style={styles.view}>
                       <Text style={styles.text}>Update shift</Text>
                       <Item regular>
                         <TextInput editable = {true} keyboardType='numeric' value={this.state.amount} onChangeText = {(value) => this._changeNumber(value)}/>
                       </Item>
          </View>
          <View style={{marginLeft: 15, marginTop: 25, width: '70%'}}>
                                    <TouchableOpacity activeOpacity={1} onPress = {() => this.props.navigation.navigate('MembershipDetails')}>
                                    <View>
                                          <Card style={{backgroundColor: '#e5d8bf'}}>
                                              <CardItem style={{backgroundColor: '#d7c79e'}}>
                                                  <View style={{marginLeft: 15,marginRight: 15, marginTop: 10, flexDirection: 'row', justifyContent: 'space-between'}}>
                                                      <View><Text style={{fontWeight: 'bold'}}>Billing details </Text></View>
                                                      <View style={{marginLeft: 10}}><Icon size={20} name="md-arrow-dropright"/></View>
                                                  </View>
                                              </CardItem>
                                          </Card>
                                    </View>
                                    </TouchableOpacity>
                                   <TouchableOpacity activeOpacity={1} onPress = {() => this.props.navigation.navigate('PersonalTrainingDetails')}>
                                    <View>
                                         <Card style={{backgroundColor: '#e5d8bf'}}>
                                          <CardItem style={{backgroundColor: '#d7c79e'}}>
                                              <View style={{marginLeft: 15,marginRight: 15, marginTop: 10, flexDirection: 'row', justifyContent: 'space-between'}}>
                                                  <View ><Text style={{fontWeight: 'bold'}}>Active Client details </Text></View>
                                                  <View style={{marginLeft: 10}}><Icon size={20} name="md-arrow-dropright"/></View>
                                              </View>
                                          </CardItem>
                                         </Card>
                                    </View>
                                    </TouchableOpacity>
                              </View>

          <View style={{margin: 25}}>
              <Button style={{backgroundColor: '#c83349', justifyContent: 'center', alignItems: 'center'}}><Text>End Contract</Text></Button>
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