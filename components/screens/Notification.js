import React, {Fragment,Component} from 'react';
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
  View,
  Linking
} from 'react-native';
import Hyperlink from 'react-native-hyperlink'
import {Agenda} from 'react-native-calendars';
import Icon from 'react-native-vector-icons/Ionicons';
import {Container, Accordion,Thumbnail, Card,ListItem,CheckBox, CardItem,Tab,Tabs, Header, Title, Content, Button, Left, Body, Text,Right} from 'native-base';

export default class Notification extends Component {
    static navigationOptions = {
          title: 'Notifications',
          headerTitleStyle: { color: 'black', fontWeight: 'bold'},
          headerStyle: {backgroundColor: '#eadea6'},
          headerTintColor: 'black'
      }


    componentDidMount(){
            console.log("id has been retrieved", this.state.id)

            const { navigation } = this.props;
            console.log("pagal bana rhe hai")
            this.focusListener = navigation.addListener('didFocus', () => {
                    console.log("The screen is focused")
                    var key  = this.retrieveItem('key').then(res =>
                               this.setState({auth_key: res}, () => console.log("brother pls", res))
                               ).then(() => {
                                    if(this.state.auth_key !== null){
                                        this.fetchDetails()
                                    }
                               })
            });
        }

    componentWillUnmount() {
              // Remove the event listener
              this.focusListener.remove();

          }
    fetchDetails = () => {
            this.setState({loading: true})
            let course_list = fetch(constants.API + 'current/trainer/trainees', {
                method: 'GET',
                headers: {
                                'Accept': 'application/json',
                                'Content-Type': 'application/json',
                                'Authorization': this.state.auth_key,
                            }
            })
            .then(
                res => {
                    if(res.status === 200){
                        return res.json()
                    }
                    else{
                        this.setState({loading: false})
                                                       Alert.alert(
                                                          constants.failed,
                                                          constants.fail_error,
                                                          [
                                                              {text: 'OK', onPress: () => console.log('OK Pressed')},
                                                          ],
                                                          {cancelable: false},
                                                       );
                    }
                }
            ).then(res => this.setState({traineeList: res["trainees"]}))


        }
    async retrieveItem(key) {
                  try {
                    const retrievedItem =  await AsyncStorage.getItem(key);
                    console.log("key retrieved")
                    return retrievedItem;
                  } catch (error) {
                    console.log(error.message);
                  }
                  return;
          }


    render(){
        return(
            <Container style={{padding: 15, backgroundColor: '#efe9cc'}}>
                <ScrollView>
                <Content>
                    <View>
                        <Card>
                            <CardItem header>
                                <Text style={{fontWeight: 'bold'}}>Promotional Post</Text>
                            </CardItem>
                            <CardItem>
                                <Hyperlink linkStyle={ { color: '#2980b9'} } linkDefault={true}>
                                    <Text selectable style={ { fontSize: 15 } }>
                                      This Valentine’s Day, get them something they’ll love from our weekly ad: https://docs.aws.amazon.com/rekognition/latest/dg/rekognition-dg.pdf
                                    </Text>
                                  </Hyperlink>
                            </CardItem>
                            <CardItem >

                            </CardItem>
                        </Card>
                    </View>
                </Content>
                </ScrollView>
            </Container>
        );
    }
}