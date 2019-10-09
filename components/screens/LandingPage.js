import React, {Component} from 'react';
import {Picker,View,TouchableOpacity,Dimensions,StyleSheet,Image, StatusBar} from 'react-native';
import {Header,Content,Container, Text,Button} from 'native-base';
import StepForm from './step_form';

const deviceWidth = Dimensions.get('window').width;
export default class LandingPage extends Component {
   constructor(props){
     super(props)
     this.state = {
       role: ''
     }
   }
   static navigationOptions = {
                   //Setting the header of the screen
      headerStyle: {backgroundColor: 'black'}
   };

   _validate = () => {
     if(this.state.role !== ''){
       this.props.navigation.navigate('StepForm', {ROLE: this.state.role})
     }
     else{
       alert("Please select your role")
     }
   }

   render(){

     return(
        <Container style={styles.container}>
            <StatusBar backgroundColor='black' barStyle='light-content' />
            <Image
              style={ styles.image }
              source={require('./landing-image.jpg')}
            />
            <Content style={styles.content}>

                <View style={{marginLeft: '15%', width: '70%', justifyContent: 'center', alignItems: 'center'}}>
                <Picker
                  selectedValue={this.state.role}
                  style={{height: 50, width: '100%', backgroundColor: "white"}}
                  onValueChange={(itemValue, itemIndex) =>
                    this.setState({role: itemValue})
                  }>
                  <Picker.Item label="Select your role" value={null} />
                  <Picker.Item style={{fontWeight: 'bold'}} label="Customer" value="Trainee" />
                  <Picker.Item style={{fontWeight: 'bold'}} label="Trainer" value="Trainer" />
                  <Picker.Item style={{fontWeight: 'bold'}} label="Admin" value="Admin" />
                </Picker>
                <View style={styles.button}>
                   <Button block style={{backgroundColor: 'black'}} onPress={this._validate}><Text>Continue</Text></Button>
                </View>
                </View>
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
      width: '100%',
      height: '100%'
    },
    content: {
     position: 'absolute',
     top: '40%',
     width: '100%',
     height: 'auto'
    },
    button: {
      marginTop: 10,
      width: '100%',
      alignItems: 'center'
    }
});