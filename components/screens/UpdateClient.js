import React,{Fragment, Component} from 'react';
import { EventRegister } from 'react-native-event-listeners';
import {Container,Text, Content, Item, Card, CardItem, Button,Input, Header, Left, Right, Body, Title} from 'native-base';
import {StyleSheet, View, TouchableOpacity, ScrollView, BackHandler, Modal, Alert} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import DatePicker from 'react-native-date-picker';

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
    EventRegister.emit('UpdateClient', 'it works!!!')
    this.props.navigation.goBack()
  }



  static navigationOptions = {
        header: null
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
        <Header style={{backgroundColor: 'white', elevation: 0}} androidStatusBarColor='#000' iosBarStyle={"light-content"}>
           <Left>
             <Button transparent onPress={this.showModal}>
               <Icon style={{color: 'black'}} size={25} name='md-arrow-back' />
             </Button>
           </Left>
           <Body>
             <Title style={{color: 'black'}}>Update Client Info</Title>
           </Body>
           <Right>
                <Button transparent><Text style={{color: 'white'}}>save</Text></Button>
           </Right>
        </Header>
        <ScrollView>
        <Content style={styles.content}>
          <View style={styles.view}>
            <Text style={styles.text}>Mobile</Text>
            <Item regular>
                <Input keyboardType='numeric' value={this.state.number} onChangeText = {(value) => this._changeNumber(value)}/>
            </Item>
          </View>
          <View style={styles.view}>
             <Text style={styles.text}>Total Amount Paid</Text>
             <Item regular>
               <Input  keyboardType='numeric' value={this.state.amount} onChangeText = {(value) => this._changeNumber(value)}/>
             </Item>
          </View>
          <View style={styles.view}>
            <Text style={styles.text}>Update Membership End Date</Text>
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
                    <Text>Add Course</Text>
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
                         <Text>Add Trainer</Text>
                      </CardItem>
                   </TouchableOpacity>
              </Card>
            </View>
            <View style={styles.view}>
                          <Card>
                            <CardItem header>
                               <Text style={styles.text}>Plans</Text>
                            </CardItem>

                            <CardItem>
                               <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                                  <View style={{flex: 1}}>
                                     <Text>Workout Plan</Text>
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
                                     <Text>Add Plan</Text>
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