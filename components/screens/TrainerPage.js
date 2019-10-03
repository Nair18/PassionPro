import React, {Fragment,Component} from 'react';
import { EventRegister } from 'react-native-event-listeners';
import {TextInput,Image, StyleSheet, ScrollView, TouchableOpacity} from 'react-native';
import { Button, Container, Content, View, Text,Item, Card, CardItem, Thumbnail} from 'native-base';
import UpdateTrainerPage from './UpdateTrainerPage';
import Icon from 'react-native-vector-icons/Ionicons'
export default class TrainerPage extends Component {
  constructor(props){
    super(props)
    this.state={
      datas: 'no data'
    }
  }
  static navigationOptions = {
      title: 'Trainer Info',
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
                        <Thumbnail large source={require('./client-profile.png')} />
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
                          <Text style={styles.text}>Contract Start Date </Text>
                       </View>
                       <View style={styles.textFormat}>
                          <Text>29-02-2019</Text>
                       </View>
                    </View>
                    <View style={styles.infoView}>
                       <View style={styles.title}>
                         <Text style={styles.text}>Contract End Date </Text>
                       </View>
                       <View style={styles.textFormat}>
                         <Text>29-02-2020</Text>
                       </View>
                    </View>
                    <View style={styles.infoView}>
                                           <View style={styles.title}>
                                             <Text style={styles.text}>Shift </Text>
                                           </View>
                                           <View style={styles.textFormat}>
                                             <Text>2</Text>
                                           </View>
                                        </View>
                    <View style={styles.infoView}>
                                           <View style={styles.title}>
                                             <Text style={styles.text}>Experience </Text>
                                           </View>
                                           <View style={styles.textFormat}>
                                             <Text>2 years</Text>
                                           </View>
                                        </View>
                    <View style={styles.infoView}>
                                           <View style={styles.title}>
                                             <Text style={styles.text}>Certifications </Text>
                                           </View>
                                           <View style={styles.textFormat}>
                                             <Text>{"NASM"}</Text>
                                           </View>
                                        </View>

                    <View style={styles.infoView}>
                                           <View style={styles.title}>
                                             <Text style={styles.text}>Active Clients</Text>
                                           </View>
                                           <View style={styles.textFormat}>
                                             <Text>2</Text>
                                           </View>
                                        </View>
                    <View style={styles.infoView}>
                                           <View style={styles.title}>
                                             <Text style={styles.text}>Total Clients till date</Text>
                                           </View>
                                           <View style={styles.textFormat}>
                                             <Text>20</Text>
                                           </View>
                                        </View>
                    <View style={styles.infoView}>
                       <View style={styles.title}>
                          <Text style={styles.text}>Salary Offered</Text>
                       </View>
                       <View style={styles.textFormat}>
                          <Text>{12000 + ' INR'}</Text>
                       </View>
                    </View>
                    <View style={styles.infoView}>
                                                               <View style={styles.title}>
                                                                 <Text style={styles.text}>Total Bonus offered </Text>
                                                               </View>
                                                               <View style={styles.textFormat}>
                                                                 <Text>{22000 + " INR"}</Text>
                                                               </View>
                                                            </View>
                    <View style={styles.view}>
                                              <Card>
                                                <CardItem header>
                                                   <Text style={styles.text}>Courses</Text>
                                                </CardItem>

                                                <CardItem>
                                                   <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                                                      <View style={{flex: 1}}>
                                                         <Text>Zumba class</Text>
                                                      </View>
                                                      <TouchableOpacity>
                                                         <View style={{flex: 1}}>
                                                            <Icon size={20} name="md-close"/>
                                                         </View>
                                                      </TouchableOpacity>
                                                   </View>
                                                </CardItem>
                                                   <TouchableOpacity>
                                                      <CardItem footer style={{backgroundColor: 'grey'}}>
                                                         <Text>Add Course</Text>
                                                      </CardItem>
                                                   </TouchableOpacity>
                                              </Card>
                                            </View>
                    <View style={styles.view}>
                                                                  <Card>
                                                                    <CardItem header>
                                                                       <Text style={styles.text}>Clients</Text>
                                                                    </CardItem>

                                                                    <CardItem>
                                                                       <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                                                                          <View style={{flex: 1}}>
                                                                             <Text>Chaganlal</Text>
                                                                          </View>
                                                                          <TouchableOpacity>
                                                                             <View style={{flex: 1}}>
                                                                                <Icon size={20} name="md-close"/>
                                                                             </View>
                                                                          </TouchableOpacity>
                                                                       </View>
                                                                    </CardItem>
                                                                       <TouchableOpacity>
                                                                          <CardItem footer style={{backgroundColor: 'grey'}}>
                                                                             <Text>Add Clients</Text>
                                                                          </CardItem>
                                                                       </TouchableOpacity>
                                                                  </Card>
                                                                </View>

                    <View style={{margin: 50}}>
                        <TouchableOpacity>
                            <Button onPress={() => this.props.navigation.navigate('UpdateTrainerPage')} style={{backgroundColor: 'black', justifyContent: 'center', alignItems: 'center'}}><Text>Update the profile</Text></Button>
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
       height: 100,
       width: 100,
       justifyContent: 'center',
       alignItems: 'center'
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
     text: {
         fontWeight: 'bold'
       },
       content: {
         margin: 15
       },
       view: {
         margin: 15
       }
})