import React, {Fragment,Component} from 'react';
import { EventRegister } from 'react-native-event-listeners';
import {TextInput,Image, StyleSheet, ScrollView, TouchableOpacity, Alert, AppState, AsyncStorage} from 'react-native';
import { Button, Container, Content, View, Text,Item, Thumbnail} from 'native-base';
import Icon from 'react-native-vector-icons/Ionicons';
export default class ClientInfo extends Component {
  constructor(props){
    super(props)
    this.state={
      data: this.props.navigation.state.params.DATA,
      courseInfo: null,
      traineeSub: null,
      traineeList: null
    }
  }
  static navigationOptions = {
      title: 'Client Info',
      headerTitleStyle: { color: 'black', fontWeight: 'bold'},
      headerStyle: {backgroundColor: 'white', elevation: 0},
      headerTintColor: 'black'
  }


  componentDidMount(){
            console.log("id has been retrieved", this.state.id)

            const { navigation } = this.props;
            console.log("pagal bana rhe hai")
            this.focusListener = navigation.addListener('didFocus', () => {
                    console.log("The screen is focused")
                  });
            var key  = this.retrieveItem('key').then(res =>
               this.setState({auth_key: res}, () => console.log("brother pls", res))
               ).then(() => {
                    if(this.state.auth_key !== null){
//                        this.fetchDetails()
                    }
               })
        }

        fetchDetails = () => {
            console.log("what is the id ", this.state.id)
            let course_list = fetch(constants.API + 'current/admin/gyms/'+ this.state.id + '/trainees/', {
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
                                                         'OOps!',
                                                         'Something went wrong ...',
                                                          [
                                                              {text: 'OK', onPress: () => console.log('OK Pressed')},
                                                          ],
                                                          {cancelable: false},
                                                       );
                    }
                }
            ).then(res => this.setState({traineeList: res["trainees"]})).then(

                fetch(constants.API + 'current/admin/gyms/'+ this.state.id + '/subscriptions/', {
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
                                                                                   'OOps!',
                                                                                   'Something went wrong ...',
                                                                                    [
                                                                                        {text: 'OK', onPress: () => console.log('OK Pressed')},
                                                                                    ],
                                                                                    {cancelable: false},
                                                                                 );
                                              }
                                          }
                                      ).then(res => this.setState({traineeSub: res["subscriptions"]}, () => console.log("bhai wtf is this", this.state.coursetype)))
            )
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
  componentWillUnmount() {
        // Remove the event listener
        this.focusListener.remove();

  }

  settingState = (datas) => {
    console.log("Bhai jaan aa gy mein")
    this.setState({datas})
  }


  render(){
    let DATA = [
      {
        id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
        title: 'First Item',
      },
      {
        id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
        title: 'Second Item',
      },
      {
        id: '58694a0f-3da1-471f-bd96-145571e29d72',
        title: 'Third Item',
      },
    ];

    let courses = [];
    for(let i=0;i<DATA.length;i++){
       courses.push(<View><Item><Text>{DATA[i]['title']}</Text></Item></View>)
    }

    return(
       <Fragment>
        <Container>

            <ScrollView showHorizontalScrollbar={false}>
              {this.state.data !== null ?
              <Content>
                <Content>
                    <View style={styles.imageView}>
                        <Thumbnail large source={require('./client-profile.png')}/>
                    </View>
                </Content>
                <Content>
                    <View style={styles.infoView}>
                                          <View style={styles.title}>
                                            <Text style={styles.text}>Active </Text>
                                          </View>
                                          <View style={styles.textFormat}>
                                            <Text>{this.state.data["active"]}</Text>
                                          </View>
                    </View>
                    <View style={styles.infoView}>
                      <View style={styles.title}>
                        <Text style={styles.text}>Name </Text>
                      </View>
                      <View style={styles.textFormat}>
                        <Text>{this.state.data["trainee_name"]}</Text>
                      </View>
                    </View>
                    <View style={styles.infoView}>
                        <View style={styles.title}>
                            <Text style={styles.text}>Age </Text>
                        </View>
                        <View style={styles.textFormat}>
                            <Text>22</Text>
                        </View>
                    </View>
                    <View style={styles.infoView}>
                      <View style={styles.title}>
                        <Text style={styles.text}>Mobile </Text>
                      </View>
                      <View style={styles.textFormat}>
                         <Text>9979090670</Text>
                      </View>
                    </View>
                    <View style={styles.infoView}>
                      <View style={styles.title}>
                         <Text style={styles.text}>Address </Text>
                      </View>
                      <View style={styles.textFormat}>
                         <Text>4th block koramangala, 100ft road, bangalore-560034</Text>
                      </View>
                    </View>

                    <View style={styles.infoView}>
                       <View style={styles.title}>
                          <Text style={styles.text}>Membership start date </Text>
                       </View>
                       <View style={styles.textFormat}>
                          <Text>{this.state.data["start"]}</Text>
                       </View>
                    </View>
                    <View style={styles.infoView}>
                       <View style={styles.title}>
                         <Text style={styles.text}>Membership end date </Text>
                       </View>
                       <View style={styles.textFormat}>
                         <Text>{this.start.data["end"]}</Text>
                       </View>
                    </View>
                    <View style={styles.infoView}>
                       <View style={styles.title}>
                          <Text style={styles.text}>Total Amount Paid</Text>
                       </View>
                       <View style={styles.textFormat}>
                          <Text>{12000 + ' INR'}</Text>
                       </View>
                    </View>
                    <View style={styles.infoView}>
                       <View style={styles.title}>
                          <Text style={styles.text}>Course </Text>
                       </View>
                       <View style={{flex: 1, marginLeft: 25}}>
                          {courses}
                       </View>
                    </View>
                    <View style={styles.infoView}>
                                           <View style={styles.title}>
                                              <Text style={styles.text}>Plans</Text>
                                           </View>
                                           <View style={{flex: 1, marginLeft: 25}}>
                                              {courses}
                                           </View>
                                        </View>
                    <View style={styles.infoView}>
                       <View style={styles.title}>
                          <Text style={styles.text}>Trainer </Text>
                       </View>
                          <View style={styles.textFormat}>
                            <Text>Baghadeesh</Text>
                          </View>
                    </View>

                    <View style={{margin: 50}}>
                        <TouchableOpacity>
                            <Button onPress={() => this.props.navigation.navigate('UpdateClient')} style={{backgroundColor: 'black', justifyContent: 'center', alignItems: 'center'}}><Text>Update the profile</Text></Button>
                        </TouchableOpacity>
                    </View>

                </Content>
              </Content> : <View style={{justifyContent: 'center', alignItems: 'center'}}><Text>loading ...</Text></View>}
            </ScrollView>
        </Container>
       </Fragment>
    );
  }
}

const styles = StyleSheet.create({
     image: {

     },
     imageView: {
       height: 100,
       width: 100,
       justifyContent: 'center',
       alignItems: 'center'
     },
     text: {
       fontWeight: 'bold',
     },
     infoView: {
       marginLeft: 15,
       marginRight: 15,
       marginTop: 10,
       flexDirection: 'row'
     },
     textFormat: {
       marginLeft: 25,
       flex: 1
     },
     title: {
       flex: 1
     }
})