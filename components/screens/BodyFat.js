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
  AsyncStorage,
  AppState,
  Alert,
  View,
} from 'react-native';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import {Agenda} from 'react-native-calendars';
import Icon from 'react-native-vector-icons/Ionicons';
import {Container, Content, Button, Text, Item, Input, List, ListItem, Right, Left, Spinner} from 'native-base';
import {BarChart} from 'react-native-chart-kit';
import constants from '../constants';


export default class BodyWeight extends PureComponent {
    constructor(props){
        super(props)
        this.state = {
            fat: null,
            fatList: null,
            onProcess: false
        }
    }
    static navigationOptions = {
          title: 'Fat % Tracker',
          headerTitleStyle: { color: 'black', fontWeight: 'bold'},
          headerStyle: {backgroundColor: '#eadea6'},
          headerTintColor: 'black'
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
             fetch(constants.API + 'current/trainee/logs/fat',{
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
                  this.setState({fatList: res["logs"].reverse()})
                  }).then(console.log("fetched the api data", this.state.fatList))
         }

         onSubmit = () => {
            this.setState({onProcess: true})
            fetch(constants.API + 'current/trainee/logs/fat',{
                method: 'POST',
                headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': this.state.auth_key,
                },
                body: JSON.stringify({
                    'fat': this.state.fat
                })
                }).then(response => {
                    if (response.status === 200) {
                    this.fetchDetails()
                    Alert.alert(
                        constants.success,
                        'Successfully recorded the fat %',
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
                                "Something went wrong. Do not use '%' symbol while entering the fat.",
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
            data: [30, 29, 27, 25, 24, 22, 21, 20, 20, 20, 20, 20],
          }]
        }

        let screenWidth = Dimensions.get('window').width
        let height = getStatusBarHeight()
        return(
            <Fragment>
            <Container style={{paddingLeft: 15, paddingRight: 15, backgroundColor: '#efe9cc'}}>
                {this.state.fatList !== null ?
                (<Content>
                    <View style={{marginTop: 25}}>
                      <Item regular>
                        <Input style={{backgroundColor: 'white'}} keyboardType="numeric" placeholder="Enter % value eg. 33" onChangeText={text => this.setState({fat: text})}/>
                      </Item>
                    </View>
                    <View style={{marginTop: 25, justifyContent: 'center', alignItems: 'center'}}>
                        {this.state.onProcess === false ?
                            <Button block onPress={this.onSubmit} style={{backgroundColor: 'black'}}><Text style={{color: 'white'}}>Add</Text></Button> :
                            <Spinner color="black"/>
                        }
                    </View>
                    <View style={{marginTop: 25}}>
                        <Text style={{fontWeight: 'bold'}}>Current Fat %</Text>
                        <Text note>last updated {this.state.fatList.length > 0 ? this.state.fatList[0]["date"].split("T")[0] : null}</Text>
                    </View>
                    <View style={{marginTop: 10, justifyContent: 'center', alignItems: 'center'}}>
                        <Text style={{fontWeight: 'bold'}}><Text style={{fontWeight: 'bold', fontSize: 60}}>{this.state.fatList.length > 0 ? this.state.fatList[0]["fat"] : "NA"}</Text>%</Text>
                    </View>
                    <View style={{marginTop: 25}}>
                        <Text style={{fontWeight: 'bold'}}>Logged Fat %</Text>
                    </View>
                    <View style={{marginTop: 10}}>
                        <List>
                            {this.state.fatList !== null ? this.state.fatList.map(log =>
                            <ListItem>
                                <Left>
                                    <Text>{log["date"].split("T")[0]}</Text>
                                </Left>
                                <Right>
                                    <Text>{log["fat"]}%</Text>
                                </Right>
                            </ListItem>) : (<View style={{justifyContent: 'center', alignItems: 'center'}}><Text note >No data</Text></View>)}
                        </List>
                    </View>
                </Content>) : (<Content><View style={{justifyContent: 'center', alignItems: 'center'}}><Spinner color="black"/><Text>loading ...</Text></View></Content>)}
            </Container>
            </Fragment>
        );
    }
}