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
  render(){
    return(
       <Container>
         <ScrollView showHorizontalScrollbar={false}>
         <Content>
                             <View style={styles.imageView}>
                                 <Image source={require('./course-image.jpg')} style={styles.image}/>
                             </View>
                         </Content>
         <Content style={{padding: 15}}>
           <View>
             <TextInput  editable={this.state.editable} style={{textAlign: 'justify', fontWeight: 'bold', fontSize: 20}}>Course Name</TextInput>
           </View>
           <View style={{marginTop: 5, justifyContent: 'center', alignItems: 'center'}}>
             <TextInput editable={this.state.editable} multiline={true} numberOfLines={10} style={{textAlign: 'justify'}}>
               jnkhubnk n,bhufkrn kjnkjhijnlmlknhuihef knihihjf,e kloihjiomojoh9hwef knihhfowhiuhjnkhubnk n,bhufkrn kjnkjhijnlmlknhuihef knihihjf,e kloihjiomojoh9hwef knihhfowhiuhjnkhubnk n,bhufkrn kjnkjhijnlmlknhuihef knihihjf,e kloihjiomojoh9hwef knihhfowhiuhjnkhubnk n,bhufkrn kjnkjhijnlmlknhuihef knihihjf,e kloihjiomojoh9hwef knihhfowhiuhjnkhubnk n,bhufkrn kjnkjhijnlmlknhuihef knihihjf,e kloihjiomojoh9hwef knihhfowhiuh
               ubnk n,bhufkrn kjnkjhijnlmlknhuihef knihihjf,e kloihjiomojoh9hwef knihhfowhiuhjnkhubnk n,bhuf
               ubnk n,bhufkrn kjnkjhijnlmlknhuihef knihihjf,e kloihjiomojoh9hwef knihhfowhiuhjnkhubnk n,bhuf
               ubnk n,bhufkrn kjnkjhijnlmlknhuihef knihihjf,e kloihjiomojoh9hwef knihhfowhiuhjnkhubnk n,bhuf, hello karthik
             </TextInput>
           </View>
           <View>

            {this.state.editable == true ? <Content><View><Button onPress={this.save} style={{justifyContent: 'center', alignItems: 'center', backgroundColor: 'black'}}><Text>Save Changes</Text></Button></View><View style={{marginTop: 5}}><Button style={{justifyContent: 'center', alignItems: 'center', backgroundColor: 'black'}}onPress={this.discard}><Text>Cancel</Text></Button></View></Content>: <Button style={{justifyContent: 'center', alignItems: 'center', backgroundColor: 'black'}} onPress={this._editable}><Text>Edit</Text></Button>}
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
       }
})