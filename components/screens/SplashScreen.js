import React, {Component, Fragment} from 'react';
import {Picker,View,TouchableOpacity,Dimensions,StyleSheet,Image, StatusBar, AsyncStorage} from 'react-native';
import {Header,Content,Container, Text,Button, Thumbnail, Spinner} from 'native-base';
import LandingPage from './LandingPage';
import SecondLevelCustomer from './second_level_customer';
import Admin from './Admin';
import constants from '../constants';
import TrainerSection from './TrainerSection';

const deviceWidth = Dimensions.get('window').width;
export default class SplashScreen extends Component {
   constructor(props){
    super(props);
    this.state = {
        role: null
    }
   }
   static navigationOptions = {
      headerStyle: {backgroundColor: 'white', elevation: 0}
   };

   _storeData = async (key,data) => {
        if(data !== null && data.length>0){
            console.log("hitting it hard")
            data = JSON.stringify(data[0]["id"])
            try {
             await AsyncStorage.setItem(key, data);
            } catch (error) {
             console.log("got error while setting", error)
           }
        }
   }

   fetchDetails = (key) => {
     fetch(constants.API + 'current/admin/gyms', {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': key,
        }
     }).then(res => {
        if(res.status === 200){
            return res.json()
        }
        else if(res.status === 401){
            this.props.navigation.navigate('LandingPage')
        }
        else{
            Alert.alert(constants.failed, constants.fail_error)
        }
     }).then(res => {
        console.log("gym details", res["data"]["gyms"])
        this._storeData("id", res["data"]["gyms"]).then(() => {return true})
     })
   }

   async retrieveItem(keys) {
      let key = null
      let bools = false
      const retrievedItem =  await AsyncStorage.multiGet(keys);
      retrievedItem.map( m => {
        try {
            console.log("key retrieved", m)
            if(m[0] === 'key'){
                key = m[1]
            }
            else if(m[0]==='role'){
                roles = m[1]
            }
            else if((m[1] === null || m[1] === "{}") && m[0] === "id" && key !== null){
                this.fetchDetails(key).then((bools) => {
                    if(bools){
                        return roles
                    }
                })
            }
        } catch (error) {
         console.log(error.message);
      }})
      return roles;
   }

   resolve = () => {
       console.log("splash screen")
   }



   componentDidMount(){
        var key  = this.retrieveItem(['role', 'key', 'id']).then(res => {
                        return JSON.parse(res)
                   }).then(res => {
                        if(res!==null){
                            if(res === "OWNERADMIN" || res === "OWNERADMINTRAINER" || res === "ADMIN" || res === "ADMINTRAINER" || res === "OWNER"){
                                this.props.navigation.navigate('Admin')
                            }

                            else if(res === "TRAINER"){
                                this.props.navigation.navigate('TrainerSection')
                            }
                            else if(res === "CUSTOMER"){
                                this.props.navigation.navigate('SecondLevelCustomer')
                            }
                            else{
                                this.props.navigation.navigate('LandingPage')
                            }
                        }
                        else{
                            this.props.navigation.navigate('LandingPage')
                        }
                   })
   }

   render(){
     return(
        <Container style={styles.container}>
            <StatusBar backgroundColor='black' barStyle='light-content' />
            <View style={{ height: '70%', width: '70%', borderRadius: 100,padding: '5%', justifyContent: 'center', alignItems: 'center'}}>
               <Image style={styles.image}  source={require('./ic_launcher_round.png')} resizeMode='contain'/>
            </View>
            <Content style={styles.content}>
                <Fragment>
                    <View style={{marginLeft: '15%', width: '70%', justifyContent: 'center', alignItems: 'center'}}>
                        <Text>Hustle for that muscle</Text>
                        <Text note>Powered by Mygymnasio</Text>
                    </View>
                    <View>
                        <Spinner color = 'black'/>
                    </View>
                </Fragment>
            </Content>


        </Container>

     );
   }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center'
  },
  image: {
      height: '100%',
      width: '100%'
  },
    content: {
     position: 'absolute',
     top: '60%',
     width: '100%',
     height: 'auto'
    },
    button: {
      flexDirection: 'row',
      marginTop: 10,
      width: '100%',
      alignItems: 'center'
    }
});