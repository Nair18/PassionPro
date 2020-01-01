import React, {Fragment,Component} from 'react';
import { EventRegister } from 'react-native-event-listeners';
import {TextInput,Image, StyleSheet, ScrollView, TouchableOpacity, Alert, StatusBar, AsyncStorage} from 'react-native';
import { Button, Container, Content, View, Text,Item, Thumbnail, Spinner} from 'native-base';
import Icon from 'react-native-vector-icons/Ionicons';
import AppBilling from './AppBilling';
import { withNavigation } from 'react-navigation';
import constants from '../constants';

class AdminProfile extends Component {
  constructor(props){
    super(props)
    this.state={
      datas: 'no data',
      auth_key: null,
      id: this.props.navigation.state.params.ID,
      navigation: this.props.navigation.state.params.navigation,
      admin_profile: null
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
                        console.log("bros in didmount")

//                          const { navigation } = this.props;
                          console.log("pagal bana rhe hai")
//                          this.focusListener = navigation.addListener('didFocus', () => {
                                  var key  = this.retrieveItem('key').then(res =>
                                  this.setState({auth_key: res}, () => console.log("brother pls", res))
                                  ).then(() => this.fetchDetails())
//                          });
              }
  componentWillMount() {

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

  fetchDetails = () => {
          fetch(constants.API + 'current/admin/me',{
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
                  this.setState({loading: false})
                  Alert.alert(
                      constants.failed,
                      'Something went wrong',
                  [
                      {text: 'OK', onPress: () => console.log('OK Pressed')},
                  ],
                  {cancelable: false},
                  );
               }
               }).then(res => {
               this.setState({admin_profile: res})
               }).then(console.log("fetched the api data", this.state.admin_profile))
      }

  settingState = (datas) => {
    console.log("Bhai jaan aa gy mein")
    this.setState({datas})
  }



  render(){
    data = ""
    if(this.state.admin_profile !== null){
        for(let i=0;i<this.state.admin_profile["roles"].length; i++){
            data = data + this.state.admin_profile["roles"][i]["name"]
            if(i<this.state.admin_profile["roles"].length-1){
                data = data + " + "
            }
        }
    }
    return(
       <Fragment>
        <Container style={{backgroundColor: constants.screen_color}}>
        {this.state.admin_profile !== null ?
        <Content>


            <ScrollView showHorizontalScrollbar={false}>
                <Content style={{padding: 15}}>
                    <View style={{flexDirection: 'row'}}>
                        <View style={styles.imageView}>
                            <Thumbnail large source={require('./profile.jpg')}/>
                        </View>
                    </View>
                </Content>
                <Content style={{padding: 15}}>
                    <View style={styles.infoView}>
                      <View style={styles.title}>
                        <Text style={styles.text}>Name </Text>
                      </View>
                      <View style={styles.textFormat}>
                        <Text>{this.state.admin_profile["name"]}</Text>
                      </View>
                    </View>
                    <View style={styles.infoView}>
                        <View style={styles.title}>
                            <Text style={styles.text}>Age </Text>
                        </View>
                        <View style={styles.textFormat}>
                            <Text>{this.state.admin_profile["age"]}</Text>
                        </View>
                    </View>
                    <View style={styles.infoView}>
                      <View style={styles.title}>
                        <Text style={styles.text}>Username/Mobile </Text>
                      </View>
                      <View style={styles.textFormat}>
                         <Text>{this.state.admin_profile["mobile"]}</Text>
                      </View>
                    </View>
                    <View style={styles.infoView}>
                      <View style={styles.title}>
                         <Text style={styles.text}>Address </Text>
                      </View>
                      <View style={styles.textFormat}>
                         <Text>{this.state.admin_profile["address"] === null ? "NA" : this.state.admin_profile["address"]}</Text>
                      </View>
                    </View>

                    <View style={styles.infoView}>
                       <View style={styles.title}>
                          <Text style={styles.text}>Permissions </Text>
                       </View>
                       <View style={styles.textFormat}>
                          <Text>{data}</Text>
                       </View>
                    </View>

                </Content>
            </ScrollView>
            </Content> : <Spinner color="black" />}
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
       flex: 1
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
     },
     addButton: {
         position: 'absolute',
         left: '35%',
         bottom: 10
       }
})

export default withNavigation(AdminProfile)