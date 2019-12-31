import React, {Fragment,Component,PureComponent} from 'react';
import Uploader from './Uploader';
import {
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TouchableNativeFeedback,
  StatusBar,
  Modal,
  TouchableHighlight,
  Dimensions,
  AppState,
  AsyncStorage,
  Alert,
  View,
} from 'react-native';
import {Agenda} from 'react-native-calendars';
import constants from '../constants';
import Icon from 'react-native-vector-icons/Ionicons';
import {Container, Content, Button, Text, Item, Input, List, ListItem, Spinner} from 'native-base';
import {LineChart} from 'react-native-chart-kit';


export default class BodyWeight extends PureComponent {
    constructor(props){
      super(props)
      this.state = {
        weight: null,
        weightList: null,
        onProcess: false
      }
    }

    static navigationOptions = {
          title: 'Weight Tracker',
          headerTitleStyle: { color: constants.header_text, fontWeight: 'bold'},
          headerStyle: {backgroundColor: constants.header},
          headerTintColor: constants.header_text
      }

         async retrieveItem(key) {
                 try {
                   const retrievedItem =  await AsyncStorage.getItem(key);
                   console.log("key retrieved")
                   return retrievedItem;
                 } catch (error) {
                   console.log(error.message);
                 }
                 return
             }

         componentDidMount(){
             StatusBar.setHidden(false);
             console.log("bros in didmount")

                     const { navigation } = this.props;
                     console.log("pagal bana rhe hai")
                     this.focusListener = navigation.addListener('didFocus', () => {
                             var key  = this.retrieveItem('key').then(res =>
                             this.setState({auth_key: res}, () => console.log("brother pls", res))
                             ).then(() => this.fetchDetails())
                     });
         }

         fetchDetails = () => {
                 fetch(constants.API + 'current/trainee/logs/weight',{
                  method: 'GET',
                     headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization': this.state.auth_key,
                      },
                 }).then(response => {
                     if (response.status === 200) {
                     return response.json();
                      } else {
                         Alert.alert(
                             constants.failed,
                             constants.fail_error,
                         [
                             {text: 'OK', onPress: () => console.log('OK Pressed')},
                         ],
                         {cancelable: false},
                         );
                      }
                      }).then(res => {
                      this.setState({weightList: res["logs"].reverse()}, () => console.log("fetched yayyy!!"))
                      })
             }

             onSubmit = () => {
                this.setState({onProcess: true})
                fetch(constants.API + 'current/trainee/logs/weight',{
                    method: 'POST',
                    headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': this.state.auth_key,
                    },
                    body: JSON.stringify({
                        'weight': this.state.weight
                    })
                    }).then(response => {
                        if (response.status === 200) {
                        this.fetchDetails()
                        Alert.alert(
                            constants.success,
                            'Successfully recorded body weight',
                            [
                                {text: 'OK', onPress: () => console.log('OK Pressed')},
                            ],
                            {cancelable: false},
                        );
                        this.setState({onProcess: false})
                        }
                        else {
                                 this.setState({onProcess: false})
                                Alert.alert(
                                    constants.failed,
                                    constants.fail_error,
                                     [
                                        {text: 'OK', onPress: () => console.log('OK Pressed')},
                                     ],
                                     {cancelable: false},
                                );
                        }
                    })
             }
    componentWillUnmount(){
        this.focusListener.remove();

    }
    render(){
        let chartConfig = {
          backgroundGradientFrom: 'grey',
          backgroundGradientFromOpacity: 0,
          backgroundGradientTo: 'grey',
          backgroundGradientToOpacity: 0.1,
          color: (opacity = 0.1) => `rgba(0, 0, 0, ${opacity})`,
          strokeWidth: 2,
          barPercentage:0.5
        }
        let data = {
          labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep','Oct', 'Nov', 'Dec'],
          datasets: [{
            data: [ 40, 45, 50, 55, 60, 65, 70,  100, 105, 110],

            strokeWidth: 2 // optional
          }]
        }
        let screenWidth = Dimensions.get('window').width
        return(
            <Container style={{backgroundColor: constants.screen_color}}>
                <ScrollView showsVerticalScrollbar={false}>
                {this.state.weightList !== null ?
                <Content style={{margin: 15}}>

                    <View style={{marginTop: 25}}>
                      <Item regular>
                        <Input style={{backgroundColor: 'white'}} keyboardType="numeric" placeholder="enter your current weight(kg)" onChangeText={text => this.setState({weight: text})}/>
                      </Item>
                    </View>
                    <View style={{marginTop: 25, justifyContent: 'center', alignItems: 'center'}}>
                        {this.state.onProcess === false ?
                          <Button block onPress={this.onSubmit} style={{backgroundColor: 'black'}}><Text style={{color: 'white'}}>Add</Text></Button> :
                          <Spinner color="black" />}
                    </View>
                    <View style={{marginTop: 25}}>
                        <Text style={{fontWeight: 'bold'}}>Current Weight</Text>
                        <Text note>last updated {this.state.weightList.length> 0 ? this.state.weightList[0]["date"].split("T")[0]: null}</Text>
                    </View>
                    <View style={{marginTop: 10, justifyContent: 'center', alignItems: 'center'}}>
                        <Text style={{fontWeight: 'bold'}}><Text style={{fontWeight: 'bold', fontSize: 60}}>{this.state.weightList.length > 0 ? this.state.weightList[0]["weight"] : "NA"}</Text>kg</Text>
                    </View>
                    <View style={{marginTop: 25}}>
                        <Text style={{fontWeight: 'bold'}}>Logged Body Weights</Text>
                    </View>
                    <View style={{marginTop: 10}}>
                        <List>
                            {this.state.weightList !== null ? this.state.weightList.map(weight =>
                            <ListItem style={{justifyContent: 'space-between'}}>
                                <Text>{weight["date"].split("T")[0]}</Text>
                                <Text>{weight["weight"]}kg</Text>
                            </ListItem>) : <View style={{justifyContent: 'center', alignItems: 'center'}}><Text>loading ...</Text></View>}
                        </List>
                    </View>

                </Content> : <Content><View style={{justifyContent: 'center', alignItems: 'center'}}><Spinner color="black"/><Text>loading ...</Text></View></Content>}
                </ScrollView>
            </Container>
        );
    }
}