import React,{Fragment, Component} from 'react';
import { EventRegister } from 'react-native-event-listeners';
import {Container,Text, Content, Item, Card, CardItem, Button, Header, Left, Right, Body, Title} from 'native-base';
import {StyleSheet, View, TextInput, TouchableOpacity, ScrollView, BackHandler, Alert, StatusBar} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import DatePicker from 'react-native-date-picker';

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
    header: null
  }
  componentDidMount() {
        this.props.navigation.setParams({ increaseCount: this._increaseCount })
        this.backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
          this.showModal() // works best when the goBack is async
          return true;
        });
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
        this.backHandler.remove();
    }
  _changeNumber = (value) => {
     this.setState({number: value})
  }
  render(){
    return(
      <Container>

         <Header style={{backgroundColor: 'black'}} androidStatusBarColor='#000' iosBarStyle={"light-content"}>
            <Left>
              <Button transparent onPress={this.showModal}>
                <Icon style={{color: 'white'}} size={25} name='md-arrow-back' />
              </Button>
            </Left>
            <Body>
              <Title style={{color: 'white'}}>Update Trainer Info</Title>
            </Body>
            <Right>
            </Right>
         </Header>
        <ScrollView>
        <Content style={styles.content}>
          <View style={styles.view}>
            <Text style={styles.text}>Mobile</Text>
            <Item regular>
                <TextInput editable = {true} keyboardType='numeric' value={this.state.number} onChangeText = {(value) => this._changeNumber(value)}/>
            </Item>
          </View>
          <View style={styles.view}>
             <Text style={styles.text}>Salary Offered</Text>
             <Item regular>
               <TextInput editable = {true} keyboardType='numeric' value={this.state.amount} onChangeText = {(value) => this._changeNumber(value)}/>
             </Item>
          </View>
          <View style={styles.view}>
                       <Text style={styles.text}>Total Bonus Offered</Text>
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

          <View style={styles.view}>
            <Text style={styles.text}>Update Contract End Date</Text>
            <DatePicker
                  date={this.state.date}
                  onDateChange={date => this.setState({ date })}

                  mode = 'date'
                  textColor = '#3e4444'
            />
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