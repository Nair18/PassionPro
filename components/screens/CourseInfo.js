import React, {Fragment,Component} from 'react';
import {TextInput, StyleSheet, Image, ScrollView} from 'react-native';
import { Button, Container, Content, View, Text, Thumbnail} from 'native-base';

export default class CourseInfo extends Component {
  constructor(props){
    super(props)
    this.state={
      editable: false
    }
  }
  static navigationOptions = {
    title: 'Course Info',
    headerTitleStyle: { color: 'black', fontWeight: 'bold'},
    headerStyle: {backgroundColor: 'white', elevation: 0},
    headerTintColor: 'black'
  }
  _editable = () => {
    this.setState({editable: true})
  }
  _cancel = () => {
    this.setState({editable: false})
  }

  _save = () => {
  }
  render(){
    return(
       <Container>
         <ScrollView showHorizontalScrollbar={false}>
         { this.state.editable === false ? <Content>
                             <View style={styles.imageView}>
                                 <Thumbnail large source={require('./course-image.jpg')} />
                             </View>
                         </Content> : null}
         <Content style={{padding: 15}}>
           <View>
             {this.state.editable === false ? <Text style={{textAlign: 'justify', fontWeight: 'bold', fontSize: 20}}>Course Name</Text> : <TextInput  editable={this.state.editable} style={{textAlign: 'justify', fontWeight: 'bold', fontSize: 20}}>Course Name</TextInput>}
           </View>
           <View style={{marginTop: 10, justifyContent: 'center', alignItems: 'center'}}>
             { this.state.editable === false ? <Text selectable multiline={true}>Yoga is an East Indian method of mind/body exercise designed to stretch, strengthen, and enhance muscle tone through the
                                                                                                                practice of asanas (poses) and pranayama (breathing exercises). Yoga practice plus meditation helps decrease stress and increase energy levels
                                                                                                                while improving focus, concentration, and self-realization. The variety of health benefits a yoga practice offers are: for inner harmony, balance, and
                                                                                                                overall well-being, for spiritual connection and growth; or for stretching and strengthening a variety of muscle groups involved in a yoga practice. This
                                                                                                                course is designed to assist any and all of those goals through support and guidance in a safe and nurturing learning environment. Students will be required to purchase a yoga mat.
                                              </Text> :
             <TextInput multiline={true}>
               Yoga is an East Indian method of mind/body exercise designed to stretch, strengthen, and enhance muscle tone
               through the practice of asanas (poses) and pranayama (breathing exercises). Yoga practice plus meditation helps
               decrease stress and increase energy levels while improving focus, concentration, and self-realization. The variety
               of health benefits a yoga practice offers are: for inner harmony, balance, and overall well-being, for spiritual connection and growth;
               or for stretching and strengthening a variety of muscle groups involved in a yoga practice. This course is designed to assist any and all
               of those goals through support and guidance in a safe and nurturing learning environment. Students will be required to purchase a yoga mat.
             </TextInput>}
           </View>
           {  this.state.editable ?
                <Content style={{marginTop: 15}}><View><Button style={{backgroundColor: 'black', justifyContent: 'center', alignItems: 'center'}}><Text>Save changes</Text></Button></View><View style={{marginTop: 10}}><Button onPress={this._cancel} style={{backgroundColor: 'black', justifyContent: 'center', alignItems: 'center'}}><Text>Cancel</Text></Button></View></Content> : <Content style={{marginTop: 15}}><View><Button onPress={this._editable} style={{backgroundColor: 'black', justifyContent: 'center', alignItems: 'center'}}><Text>Edit</Text></Button></View></Content>
           }
         </Content>
         </ScrollView>
       </Container>
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
    height: 100,
    width: 100,
    justifyContent: 'center',
    alignItems: 'center'
  }

})
