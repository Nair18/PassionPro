import React, {Fragment,Component} from 'react';
import { EventRegister } from 'react-native-event-listeners';
import {TextInput,Image, StyleSheet, ScrollView, TouchableOpacity, Alert, StatusBar, AsyncStorage} from 'react-native';
import { Button, Container, Content, View, Icon, Text,Item,Spinner, Thumbnail, Label, Input} from 'native-base';
import constants from '../constants';
export default class TrainerProfile extends Component {
  constructor(props){
    super(props)
    this.state={
      data: null,
      auth_key: null
    }
  }
  static navigationOptions = {
      title: 'Profile',
      headerTitleStyle: { color: constants.header_text, fontWeight: 'bold'},
      headerStyle: {backgroundColor: constants.header},
      headerTintColor: constants.header_text
  }
  componentDidMount(){
     StatusBar.setHidden(false);
     console.log("id has been retrieved", this.state.id)
     const { navigation } = this.props;
     console.log("pagal bana rhe hai")
//     this.focusListener = navigation.addListener('didFocus', () => {
     console.log("The screen is focused")
     var key  = this.retrieveItem('key').then(res =>
         this.setState({auth_key: res}, () => console.log("brother pls", res))
     ).then(() => {
           if(this.state.auth_key !== null){
                this.fetchDetails()
           }
       })
//     });
  }
  componentWillMount() {
//    this.focusListener.remove();
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

  fetchDetails = () => {
          this.setState({loading: true})
          let course_list = fetch(constants.API + 'current/trainer/me', {
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
          ).then(res => this.setState({data: res}))
  }

  render(){
    const {data} = this.state
    return(
       <Fragment>
        <Container style={{backgroundColor: constants.screen_color}}>
            {this.state.data !== null ?
            <ScrollView showHorizontalScrollbar={false}>
                <Content style={{marginLeft: 15, marginRight: 15}}>
                    <View style={styles.imageView}>
                        <Thumbnail large source={require('./client-profile.png')}/>
                    </View>
                </Content>
                <Content style={{margin: 15}}>
                    <View style={styles.infoView}>
                      <View style={styles.title}>
                        <Text style={styles.text}>Name </Text>
                      </View>
                      <View style={styles.textFormat}>
                        <Text>{data["name"]}</Text>
                      </View>
                    </View>
                    <View style={styles.infoView}>
                        <View style={styles.title}>
                            <Text style={styles.text}>Age </Text>
                        </View>
                        <View style={styles.textFormat}>
                            <Text>{data["age"]}</Text>
                        </View>
                    </View>
                    <View style={styles.infoView}>
                      <View style={styles.title}>
                        <Text style={styles.text}>Username/Mobile </Text>
                      </View>
                      <View style={styles.textFormat}>
                         <Text>{data["mobile"]}</Text>
                      </View>
                    </View>
                    <View style={styles.infoView}>
                      <View style={styles.title}>
                         <Text style={styles.text}>Address </Text>
                      </View>
                      <View style={styles.textFormat}>
                         <Text>{data["address"]}</Text>
                      </View>
                    </View>
                    <View style={{justifyContent: 'center', alignItems: 'center', marginTop: 40}}>
                        <Button rounded onPress={() => {this.props.navigation.navigate('LandingPage')}}style={{height: 50, width: 150, alignItems: 'center', backgroundColor: '#d1274b', justifyContent: 'center'}}><Icon size={20} name="md-power"/><Text>Logout</Text></Button>
                    </View>
                </Content>
            </ScrollView> : <View style={{justifyContent: 'center', alignItems: 'center'}}><Spinner color="black"/></View> }
        </Container>
       </Fragment>
    );
  }
}

const styles = StyleSheet.create({
     image: {
       width: '100%',
       height: undefined,
       aspectRatio: 1,
     },
     imageView: {
       width: 100,
       height: 100,
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