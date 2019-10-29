import React, {Component, Fragment} from 'react';
import {Picker,View,TouchableOpacity,Dimensions,StyleSheet,Image, StatusBar} from 'react-native';
import {Header,Content,Container, Text,Button, Thumbnail, Spinner} from 'native-base';
import LandingPage from './LandingPage';
import SecondLevelCustomer from './second_level_customer';
import Admin from './Admin';
import TrainerSection from './TrainerSection';

const deviceWidth = Dimensions.get('window').width;
export default class RequestProcessingPage extends Component {
   constructor(props){
        super(props);
        this.state = {
           role: props.navigation.state.params.ROLE
        }
   }
   static navigationOptions = {
                   //Setting the header of the screen
      headerStyle: {backgroundColor: 'white', elevation: 0}
   };

   _decidePath = () => {
        this.props.navigation.navigate(this.state.role)
   }
   render(){

     return(

        <Container style={styles.container}>
            <StatusBar backgroundColor='black' barStyle='light-content' />
            <View style={{ height: '70%', width: '70%', borderRadius: 100,padding: '5%', justifyContent: 'center', alignItems: 'center'}}>
               <Image style={styles.image} source={require('./processing.png')} resizeMode='contain'/>
            </View>
            <Content style={styles.content}>
                <Fragment>
                    <View style={{marginLeft: '15%', width: '70%', justifyContent: 'center', alignItems: 'center'}}>
                        <Text>Your request is successfully sent to Admin for approval ...</Text>
                    </View>
                    <View style={{justifyContent: 'center', alignItems: 'center', margin: 25}}>
                        <Button rounded onPress={this._decidePath} style={{backgroundColor: 'black'}}><Text style={{color: 'white'}}>Retry</Text></Button>
                    </View>
                    <View style={{justifyContent: 'center', alignItems: 'center'}}>
                        <Text note>Powered by PassionPro</Text>
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
     top: '50%',
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