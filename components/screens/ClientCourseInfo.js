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
           <Content>
                             <View style={styles.imageView}>
                                 <Thumbnail large source={require('./course-image.jpg')} />
                             </View>
                         </Content>
         <Content style={{padding: 15}}>
           <View>
             <Text style={{textAlign: 'justify', fontWeight: 'bold', fontSize: 20}}>Course Name</Text>
           </View>
           <View style={{marginTop: 10, justifyContent: 'center', alignItems: 'center'}}>
              <Text selectable multiline={true} style={{textAlign: 'justify'}}>jnkhubnk n,bhufkrn kjnkjhijnlmlknhuihef knihihjf,e kloihjiomojoh9hwef knihhfowhiuhjnkhubnk n,bhufkrn kjnkjhijnlmlknhuihef knihihjf,e kloihjiomojoh9hwef knihhfowhiuhjnkhubnk n,bhufkrn kjnkjhijnlmlknhuihef knihihjf,e kloihjiomojoh9hwef knihhfowhiuhjnkhubnk n,bhufkrn kjnkjhijnlmlknhuihef knihihjf,e kloihjiomojoh9hwef knihhfowhiuhjnkhubnk n,bhufkrn kjnkjhijnlmlknhuihef knihihjf,e kloihjiomojoh9hwef knihhfowhiuh
                                                                                                                                ubnk n,bhufkrn kjnkjhijnlmlknhuihef knihihjf,e kloihjiomojoh9hwef knihhfowhiuhjnkhubnk n,bhuf
                                                                                                                                ubnk n,bhufkrn kjnkjhijnlmlknhuihef knihihjf,e kloihjiomojoh9hwef knihhfowhiuhjnkhubnk n,bhuf
                                                                                                                                ubnk n,bhufkrn kjnkjhijnlmlknhuihef knihihjf,e kloihjiomojoh9hwef knihhfowhiuhjnkhubnk n,bhuf, hello karthik
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
