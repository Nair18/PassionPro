import React, {Component, Fragment} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  FlatList,
  View,Modal, Alert,
  Linking,
  TextInput,
} from 'react-native';
import StandardWorkout from './StandardWorkout';
import ModalSelector from 'react-native-modal-selector';
import PersonalizedWorkout from './PersonalizedWorkout';
import constants from '../constants';
import {Card, CardItem, Icon, Accordion, Container, Text, Content,List,ListItem, Button} from 'native-base'


export default class YearwiseExpense extends Component {
  constructor(props){
    super(props)
  }
  state = {
      isVisible: false, //state of modal default false
      workoutName: null,
      workoutType: null,
      workoutSection: null,
      onLoad: true
  }
  static navigationOptions = {
      //Setting the header of the screen
      title: 'Year wise history',
      headerStyle: {backgroundColor: constants.header},
      headerTitleStyle: {
          color: constants.header_text,
          fontWeight: 'bold'
        },
      headerTintColor: constants.header_text,
    };

  componentDidMount(){
    StatusBar.setHidden(false);
  }
  showModal = () => {
    this.setState({isVisible: true})
  }

  buttonPress = (type) => {
    console.log('Hello friends button daba diya')
    this.props.navigation.navigate(type)
    this.setState({isVisible: false})
  }
  optionChange = () => {
    this.setState({onLoad: false})

  }
  render(){
    const { navigate } = this.props.navigation;

    return(
       <Container style={{backgroundColor: constants.screen_color}}>
          <ScrollView showsVerticalScrollIndicator={false}>
          <Content style={styles.content}>
            <Content>
            <View>
                <View style={styles.cardListView}>
                   <TouchableOpacity activeOpacity={1} onPress={() => this.props.navigation.navigate('FinancialHistory')}>
                     <Card styel={{height: 200, backgroundColor: constants.item_card}}>
                        <CardItem style={{backgroundColor: constants.item_card, justifyContent: 'space-between'}}>
                            <Text style={{fontWeight: 'bold'}}>Expense of 2019</Text>
                            <Icon size={20} name="md-arrow-round-forward" />
                        </CardItem>
                     </Card>
                   </TouchableOpacity>
                </View>
                <View style={styles.cardListView}>
                   <TouchableOpacity activeOpacity={1} onPress={() => this.props.navigation.navigate('FinancialHistory')}>
                      <Card styel={{height: 200, backgroundColor: constants.item_card}}>
                         <CardItem style={{backgroundColor: constants.item_card, justifyContent: 'space-between'}}>
                            <Text style={{fontWeight: 'bold'}}>Expense of 2018</Text>
                            <Icon size={20} name="md-arrow-round-forward" />
                         </CardItem>
                      </Card>
                   </TouchableOpacity>
                </View>
            </View>
            </Content>
          </Content>
          </ScrollView>
       </Container>
    );
  }

}

const styles = StyleSheet.create({
  cardListView: {
    marginTop: 10
  },
  cardView: {
    flex: 1,
    height: 100,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  content: {
    margin: 15
  },
  cardText: {
    fontWeight: 'bold',
    fontSize: 20,
     color: 'white'
  },
  modal: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor : "#00BCD4",
    height: 300 ,
    width: '80%',
    borderRadius:10,
    borderWidth: 1,
    borderColor: '#fff',
    marginTop: 80,
    marginLeft: 40,

     },
      text: {
           color: '#3f2949',
           marginTop: 10
        }
})