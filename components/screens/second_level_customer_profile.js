import React, {Fragment,Component} from 'react';
import { EventRegister } from 'react-native-event-listeners';
import {TextInput,Image, StyleSheet, ScrollView, TouchableOpacity, Alert, StatusBar} from 'react-native';
import { Button, Container, Content, View, Text,Item, Thumbnail, Spinner} from 'native-base';
import constants from '../constants';
export default class SLCProfile extends Component {
  constructor(props){
    super(props)
    this.state={
      profile: this.props.navigation.state.params.profile
    }
  }
  static navigationOptions = {
      title: 'Profile',
      headerTitleStyle: { color: constants.header_text, fontWeight: 'bold'},
      headerStyle: {backgroundColor: constants.header},
      headerTintColor: constants.header_text
  }
  componentDidMount(){
    StatusBar.setHidden(false);
  }

  render(){
    let subs = []
    let Totalamount = 0
    let csubs = []
    if(this.state.profile !== null){
        let gym_subs = this.state.profile["gym_subscriptions"]
        subs = gym_subs.filter((val) => {
            return val["is_active"] === true
        })
        for(let i=0;i<gym_subs; i++){
            Totalamount = Totalamount + parseInt(gym_subs[i]["amount"])
        }

        let pt_subs = this.state.profile["course_subscriptions"]
        csubs = pt_subs.filter((val) => {
            return val["is_active"] === true
        })
    }

    return(
       <Fragment>
        <Container style={{backgroundColor: constants.screen_color}}>
            {this.state.profile !== null ?
            <ScrollView showsVerticalScrollbar={false}>
                <Content style={{marginLeft: 15, marginRight: 15}}>
                    <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                        <View style={styles.imageView}>
                            <Thumbnail large source={require('./client-profile.png')}/>
                        </View>
                        <View style={{justifyContent: 'center', alignItems: 'center', flex:1 }}>
                            <Button block style={{backgroundColor: constants.logout, borderRadius: 10}} onPress={() => {this.props.navigation.navigate('LandingPage')}}><Text>Logout</Text></Button>
                        </View>
                    </View>
                </Content>
                <Content style={{margin: 15}}>
                    <View style={styles.infoView}>
                      <View style={styles.title}>
                        <Text style={styles.text}>Name </Text>
                      </View>
                      <View style={styles.textFormat}>
                        <Text>{this.state.profile["name"]}</Text>
                      </View>
                    </View>
                    <View style={styles.infoView}>
                        <View style={styles.title}>
                            <Text style={styles.text}>Age </Text>
                        </View>
                        <View style={styles.textFormat}>
                            <Text>{this.state.profile["age"]}</Text>
                        </View>
                    </View>
                    <View style={styles.infoView}>
                      <View style={styles.title}>
                        <Text style={styles.text}>Mobile </Text>
                      </View>
                      <View style={styles.textFormat}>
                         <Text>{this.state.profile["mobile"]}</Text>
                      </View>
                    </View>
                    <View style={styles.infoView}>
                      <View style={styles.title}>
                         <Text style={styles.text}>Address </Text>
                      </View>
                      <View style={styles.textFormat}>
                         <Text>{this.state.profile["address"] === null ? "NA" : this.state.profile["address"]}</Text>
                      </View>
                    </View>

                    <View style={styles.infoView}>
                       <View style={styles.title}>
                          <Text style={styles.text}>Membership start date </Text>
                       </View>
                       <View style={styles.textFormat}>
                          <Text>{subs.length > 0 ? subs[0]["start_date"].split("T")[0] : "NA"}</Text>
                       </View>
                    </View>
                    <View style={styles.infoView}>
                       <View style={styles.title}>
                         <Text style={styles.text}>Membership end date </Text>
                       </View>
                       <View style={styles.textFormat}>
                         <Text>{subs.length > 0 ? subs[0]["end_date"].split("T")[0] : "NA"}</Text>
                       </View>
                    </View>
                    {csubs.length > 0 ?
                    <View style={styles.infoView}>
                       <View style={styles.title}>
                         <Text style={styles.text}>Personal Training start date </Text>
                       </View>
                       <View style={styles.textFormat}>
                         <Text>{csubs.length > 0 ? csubs[0]["start_date"].split("T")[0] : "NA"}</Text>
                       </View>
                    </View> : null }
                    {csubs.length > 0 ?
                    <View style={styles.infoView}>
                       <View style={styles.title}>
                         <Text style={styles.text}>Personal Training end date </Text>
                       </View>
                       <View style={styles.textFormat}>
                         <Text>{csubs.length > 0 ? csubs[0]["end_date"].split("T")[0] : "NA"}</Text>
                       </View>
                    </View> : null }
                    <View style={styles.infoView}>
                       <View style={styles.title}>
                          <Text style={styles.text}>Trainer </Text>
                       </View>
                       <View style={styles.textFormat}>
                            <Text>{csubs.length > 0 ? csubs[0]["trainer_name"] : "NA"}</Text>
                       </View>
                    </View>
                    <View style={styles.infoView}>
                       <View style={styles.title}>
                           <Text style={styles.text}>Trainer phone</Text>
                       </View>
                       <View style={styles.textFormat}>
                           <Text>{csubs.length > 0 ? csubs[0]["phone"] : "NA"}</Text>
                       </View>
                    </View>
                </Content>
            </ScrollView> : <View style={{justifyContent: 'center', alignItems: 'center'}}><Spinner color="black" /></View>}
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
       flex: 1,
       justifyContent: 'center',
       alignItems: 'flex-start'
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