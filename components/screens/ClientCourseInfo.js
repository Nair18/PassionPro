import React, {Fragment,Component} from 'react';
import {TextInput, StyleSheet, Image, ScrollView} from 'react-native';
import { Button, Container, Content, View, Text, Thumbnail} from 'native-base';

export default class ClientCourseInfo extends Component {
  constructor(props){
    super(props)
    this.state={
      editable: false
    }
  }
  static navigationOptions = {
    title: 'Course Info',
    headerTitleStyle: { color: 'black', fontWeight: 'bold'},
    headerStyle: {backgroundColor: '#eadea6'},
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
       <Container style={{backgroundColor: '#efe9cc'}}>
         <ScrollView showHorizontalScrollbar={false}>
           <Content>
                             <View style={styles.imageView}>
                                 <Thumbnail large source={require('./course-image.jpg')} />
                             </View>
                         </Content>
         <Content style={{margin: 15}}>
           <View>
             <Text style={{textAlign: 'justify', fontWeight: 'bold', fontSize: 20}}>Course Name</Text>
           </View>
           <View style={{marginTop: 10, justifyContent: 'center', alignItems: 'center'}}>
              <Text selectable multiline={true}>Yoga is an East Indian method of mind/body exercise designed to
                                                                                stretch, strengthen, and enhance muscle tone through the practice of asanas
                                                                                (poses) and pranayama (breathing exercises). Yoga practice plus meditation helps decrease stress
                                                                                and increase energy levels while improving focus, concentration, and self-realization. The variety of
                                                                                health benefits a yoga practice offers are: for inner harmony, balance, and overall well-being, for spiritual
                                                                                connection and growth or for stretching and strengthening a variety of muscle groups involved in a yoga practice.
                                                                                This course is designed to assist any and all of those goals through support and guidance in a safe and nurturing learning
                                                                                environment. Students will be required to purchase a yoga mat.
                                              </Text>
           </View>

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
