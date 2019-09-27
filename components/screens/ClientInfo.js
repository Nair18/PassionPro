import React, {Fragment,Component} from 'react';
import { EventRegister } from 'react-native-event-listeners';
import {TextInput,Image, StyleSheet, ScrollView, TouchableOpacity, Alert} from 'react-native';
import { Button, Container, Content, View, Text,Item} from 'native-base';

export default class ClientInfo extends Component {
  constructor(props){
    super(props)
    this.state={
      datas: 'no data'
    }
  }
  static navigationOptions = {
      title: 'Client Info',
      headerTitleStyle: { color: 'white'},
      headerStyle: {backgroundColor: 'black'},
      headerTintColor: 'white'
  }

  componentWillMount() {
          this.listener = EventRegister.addEventListener('UpdateClient', (datas) => {
              this.settingState(datas)
          })
  }

  settingState = (datas) => {
    console.log("Bhai jaan aa gy mein")
    this.setState({datas})
  }


  render(){
    let DATA = [
      {
        id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
        title: 'First Item',
      },
      {
        id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
        title: 'Second Item',
      },
      {
        id: '58694a0f-3da1-471f-bd96-145571e29d72',
        title: 'Third Item',
      },
    ];

    let courses = [];
    for(let i=0;i<DATA.length;i++){
       courses.push(<View><Item><Text>{DATA[i]['title']}</Text></Item></View>)
    }

    return(
       <Fragment>
        <Container>
            <ScrollView showHorizontalScrollbar={false}>
                <Content>
                    <View style={styles.imageView}>
                        <Image source={require('./client-profile.png')} style={styles.image}/>
                    </View>
                </Content>
                <Content>
                    <View style={styles.infoView}>
                      <View style={styles.title}>
                        <Text style={styles.text}>Name </Text>
                      </View>
                      <View style={styles.textFormat}>
                        <Text>{this.state.datas}</Text>
                      </View>
                    </View>
                    <View style={styles.infoView}>
                        <View style={styles.title}>
                            <Text style={styles.text}>Age </Text>
                        </View>
                        <View style={styles.textFormat}>
                            <Text>22</Text>
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

                    <View style={styles.infoView}>
                       <View style={styles.title}>
                          <Text style={styles.text}>Membership start date </Text>
                       </View>
                       <View style={styles.textFormat}>
                          <Text>29-02-2019</Text>
                       </View>
                    </View>
                    <View style={styles.infoView}>
                       <View style={styles.title}>
                         <Text style={styles.text}>Membership end date </Text>
                       </View>
                       <View style={styles.textFormat}>
                         <Text>29-02-2020</Text>
                       </View>
                    </View>
                    <View style={styles.infoView}>
                       <View style={styles.title}>
                          <Text style={styles.text}>Total Amount Paid</Text>
                       </View>
                       <View style={styles.textFormat}>
                          <Text>{12000 + ' INR'}</Text>
                       </View>
                    </View>
                    <View style={styles.infoView}>
                       <View style={styles.title}>
                          <Text style={styles.text}>Course </Text>
                       </View>
                       <View style={{flex: 1, marginLeft: 25}}>
                          {courses}
                       </View>
                    </View>
                    <View style={styles.infoView}>
                       <View style={styles.title}>
                          <Text style={styles.text}>Trainer </Text>
                       </View>
                          <View style={styles.textFormat}>
                            <Text>Baghadeesh</Text>
                          </View>
                    </View>
                    <View style={{margin: 50}}>
                        <TouchableOpacity>
                            <Button onPress={() => this.props.navigation.navigate('UpdateClient')} style={{backgroundColor: 'black', justifyContent: 'center', alignItems: 'center'}}><Text>Update the profile</Text></Button>
                        </TouchableOpacity>
                    </View>
                    <View>
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
       height: 300
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