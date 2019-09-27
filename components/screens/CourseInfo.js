import React, {Fragment,Component} from 'react';
import {TextInput, StyleSheet, Image, ScrollView} from 'react-native';
import { Button, Container, Content, View, Text} from 'native-base';

export default class CourseInfo extends Component {
  constructor(props){
    super(props)
    this.state={
      editable: false
    }
  }
  static navigationOptions = {
    title: 'Course Info',
    headerTitleStyle: { color: 'white'},
    headerStyle: {backgroundColor: 'black'},
    headerTintColor: 'white'
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
                                 <Image source={require('./course-image.jpg')} style={styles.image}/>
                             </View>
                         </Content> : null}
         <Content style={{padding: 15}}>
           <View>
             {this.state.editable === false ? <Text style={{textAlign: 'justify', fontWeight: 'bold', fontSize: 20}}>Course Name</Text> : <TextInput  editable={this.state.editable} style={{textAlign: 'justify', fontWeight: 'bold', fontSize: 20}}>Course Name</TextInput>}
           </View>
           <View style={{marginTop: 10, justifyContent: 'center', alignItems: 'center'}}>
             { this.state.editable === false ? <Text multiline={true} style={{textAlign: 'justify'}}>jnkhubnk n,bhufkrn kjnkjhijnlmlknhuihef knihihjf,e kloihjiomojoh9hwef knihhfowhiuhjnkhubnk n,bhufkrn kjnkjhijnlmlknhuihef knihihjf,e kloihjiomojoh9hwef knihhfowhiuhjnkhubnk n,bhufkrn kjnkjhijnlmlknhuihef knihihjf,e kloihjiomojoh9hwef knihhfowhiuhjnkhubnk n,bhufkrn kjnkjhijnlmlknhuihef knihihjf,e kloihjiomojoh9hwef knihhfowhiuhjnkhubnk n,bhufkrn kjnkjhijnlmlknhuihef knihihjf,e kloihjiomojoh9hwef knihhfowhiuh
                                                                                                                                ubnk n,bhufkrn kjnkjhijnlmlknhuihef knihihjf,e kloihjiomojoh9hwef knihhfowhiuhjnkhubnk n,bhuf
                                                                                                                                ubnk n,bhufkrn kjnkjhijnlmlknhuihef knihihjf,e kloihjiomojoh9hwef knihhfowhiuhjnkhubnk n,bhuf
                                                                                                                                ubnk n,bhufkrn kjnkjhijnlmlknhuihef knihihjf,e kloihjiomojoh9hwef knihhfowhiuhjnkhubnk n,bhuf, hello karthik
                                              </Text> :
             <TextInput multiline={true} style={{textAlign: 'justify'}}>
               jnkhubnk n,bhufkrn kjnkjhijnlmlknhuihef knihihjf,e kloihjiomojoh9hwef knihhfowhiuhjnkhubnk n,bhufkrn kjnkjhijnlmlknhuihef knihihjf,e kloihjiomojoh9hwef knihhfowhiuhjnkhubnk n,bhufkrn kjnkjhijnlmlknhuihef knihihjf,e kloihjiomojoh9hwef knihhfowhiuhjnkhubnk n,bhufkrn kjnkjhijnlmlknhuihef knihihjf,e kloihjiomojoh9hwef knihhfowhiuhjnkhubnk n,bhufkrn kjnkjhijnlmlknhuihef knihihjf,e kloihjiomojoh9hwef knihhfowhiuh
               ubnk n,bhufkrn kjnkjhijnlmlknhuihef knihihjf,e kloihjiomojoh9hwef knihhfowhiuhjnkhubnk n,bhuf
               ubnk n,bhufkrn kjnkjhijnlmlknhuihef knihihjf,e kloihjiomojoh9hwef knihhfowhiuhjnkhubnk n,bhuf
               ubnk n,bhufkrn kjnkjhijnlmlknhuihef knihihjf,e kloihjiomojoh9hwef knihhfowhiuhjnkhubnk n,bhuf, hello karthik
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
       }
})
