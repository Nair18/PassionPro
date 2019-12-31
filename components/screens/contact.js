import React, {Fragment,Component} from 'react';
import { EventRegister } from 'react-native-event-listeners';
import {TextInput,Image, StyleSheet, ScrollView, TouchableOpacity, Alert, StatusBar} from 'react-native';
import { Button, Container, Content, View, Text,Item, Thumbnail} from 'native-base';
import constants from '../constants';
export default class Contact extends Component {
  constructor(props){
    super(props)
    this.state={
      datas: 'no data'
    }
  }
  static navigationOptions = {
      title: 'Help',
      headerTitleStyle: { color: constants.header_text, fontWeight: 'bold'},
      headerStyle: {backgroundColor: constants.header},
      headerTintColor: constants.header_text
  }
  componentDidMount(){
                  StatusBar.setHidden(false);
              }
  componentWillMount() {

  }

  settingState = (datas) => {
    console.log("Bhai jaan aa gy mein")
    this.setState({datas})
  }


  render(){

    let courses = [];
    for(let i=0;i<DATA.length;i++){
       courses.push(<View><Item><Text>{DATA[i]['title']}</Text></Item></View>)
    }

    return(
       <Fragment>
        <Container style={{backgroundColor: constants.screen_color}}>

            <ScrollView showHorizontalScrollbar={false}>

                <Content style={{margin: 15}}>
                    <View style={styles.infoView}>
                      <View style={styles.title}>
                        <Text style={styles.text}>Email </Text>
                      </View>
                      <View style={styles.textFormat}>
                        <Text>contact@pepuphealth.space</Text>
                      </View>
                    </View>

                    <View style={styles.infoView}>
                      <View style={styles.title}>
                        <Text style={styles.text}>Mobile </Text>
                      </View>
                      <View style={styles.textFormat}>
                         <Text>9979090670</Text>
                      </View>
                    </View>
                    <View style={styles.infoView}>
                      <View style={styles.title}>
                         <Text style={styles.text}>Address </Text>
                      </View>
                      <View style={styles.textFormat}>
                         <Text>4th block koramangala, 100ft road, bangalore-560034</Text>
                      </View>
                    </View>
                </Content>
            </ScrollView>
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
       justifyContent: 'center',
       alignItems: 'center'
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
     }
})