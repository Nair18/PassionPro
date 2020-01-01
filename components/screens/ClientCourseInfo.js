import React, {Fragment,Component} from 'react';
import {TextInput, StyleSheet, Image, ScrollView} from 'react-native';
import { Button, Container, Content, View,Card, Spinner,Text,Label, Thumbnail} from 'native-base';
import constants from '../constants';
export default class ClientCourseInfo extends Component {
  constructor(props){
    super(props)
    this.state={
      editable: false,
      courseInfo: this.props.navigation.state.params.courseInfo
    }
  }
  static navigationOptions = {
    title: 'Course Info',
    headerTitleStyle: { color: constants.header_text, fontWeight: 'bold'},
    headerStyle: {backgroundColor: constants.header},
    headerTintColor: constants.header_text
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
       <Container style={{backgroundColor: constants.screen_color}}>
         {this.state.courseInfo !== null ?
         <ScrollView showHorizontalScrollbar={false}>
           <Content>
                             <View style={styles.imageView}>
                                 <Thumbnail large source={require('./exercise.jpg')} style={{backgroundColor: "black"}} />
                             </View>
                         </Content>
         <Content style={{margin: 15}}>
          <Card style={{padding: 10,backgroundColor: constants.screen_color}}>
           <View>
             <Text style={{textAlign: 'justify', fontWeight: 'bold', fontSize: 20}}>{this.state.courseInfo["name"]}</Text>
           </View>
           <View><Text>Duration: <Text style={{fontWeight: 'bold'}}>{this.state.courseInfo["duration"]}</Text> days</Text></View>
           <View><Text>Offered under: <Text style={{fontWeight: 'bold'}}>{this.state.courseInfo["course_type"]}</Text></Text></View>
          </Card>
           <View style={{marginTop: 10}}>
              <Label><Text style={{fontWeight: 'bold'}}>Summary</Text></Label>
              <Text selectable multiline={true}>{this.state.courseInfo["description"]}</Text>
           </View>

         </Content>
         </ScrollView> : <View style={{justifyContent: 'center', alignItems: 'center'}}><Spinner color="black" /></View>}
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
