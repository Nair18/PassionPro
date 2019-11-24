import React, {Fragment,Component} from 'react';
import { EventRegister } from 'react-native-event-listeners';
import {TextInput,Image, StyleSheet, ScrollView, TouchableOpacity, Alert, StatusBar} from 'react-native';
import { Button, Container, Content, View, Text,Item, Thumbnail} from 'native-base';
import Icon from 'react-native-vector-icons/Ionicons';
import AppBilling from './AppBilling';
export default class AdminProfile extends Component {
  constructor(props){
    super(props)
    this.state={
      datas: 'no data'
    }
  }
  static navigationOptions = {
      title: 'Profile',
      headerTitleStyle: { color: 'black', fontWeight: 'bold'},
      headerStyle: {backgroundColor: '#eadea6'},
      headerTintColor: 'black'
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
        <Container style={{backgroundColor: '#efe9cc'}}>
                <View style={styles.addButton}>
                                        <Button rounded style={{height: 50, width: 150, alignItems: 'center', backgroundColor: '#d1274b', justifyContent: 'center'}}><Text><Icon size={20} name="md-power"/> Logout </Text></Button>
                                    </View>

            <ScrollView showHorizontalScrollbar={false}>
                <Content style={{padding: 15}}>
                    <View style={{flexDirection: 'row'}}>
                        <View style={styles.imageView}>
                            <Thumbnail large source={require('./client-profile.png')}/>
                        </View>
                        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                            <Button block style={{backgroundColor: "black", justifyContent: 'center', alignItems: 'center'}}><Text> Help ? </Text></Button>
                        </View>
                    </View>
                </Content>
                <Content style={{padding: 15}}>
                    <View style={styles.infoView}>
                      <View style={styles.title}>
                        <Text style={styles.text}>Name </Text>
                      </View>
                      <View style={styles.textFormat}>
                        <Text>Baghadeesh</Text>
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
                        <Text style={styles.text}>Username/Mobile </Text>
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
                          <Text style={styles.text}>Contract start date </Text>
                       </View>
                       <View style={styles.textFormat}>
                          <Text>29-02-2019</Text>
                       </View>
                    </View>
                    <View style={{justifyContent: 'center', alignItems: 'center', marginTop: 40}}>
                        <Button style={{backgroundColor: "black"}} onPress={() => this.props.navigation.navigate('AppBilling')}><Text>Billing Details</Text></Button>
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
       flex: 1
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
     },
     addButton: {
         position: 'absolute',
         left: '35%',
         bottom: 10
       }
})