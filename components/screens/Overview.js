import React, {Fragment,Component} from 'react';
import Uploader from './Uploader';
import {
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TouchableNativeFeedback,
  StatusBar,
  Modal,
  TouchableHighlight,
  View,
  Linking
} from 'react-native';
import Workspace from './workspace';
import Hyperlink from 'react-native-hyperlink'
import Courses from './Courses';
import Clients from './Clients';
import Plans from './Plans';
import Trainer from './Trainer';
import QuickClient from './QuickClient';
import Icon from 'react-native-vector-icons/Ionicons';
import {Container, Accordion,Thumbnail, Card,ListItem,CheckBox,Spinner, CardItem,Tab,Tabs, Header, Title, Content, Button, Left, Body, Text,Right} from 'native-base';

export default class Overview extends Component {
    constructor(props){
        super(props)

    }
    render(){
        let data = this.props.data
        return(

              <View style={{marginTop: 10}}>
                    <View style={{flexDirection: 'row'}}>
                        <View style={{flex: 1}}>
                            <TouchableOpacity activeOpacity={1} onPress={() => this.props.navigation.navigate('QuickClient', {DETAILS: data!==null ? data["members_in_month"]["details"] : null})}>
                            <Card style={{height: 200}}>
                                <CardItem header>
                                    <Text>New members in last 1 month</Text>
                                </CardItem>
                                <CardItem>
                                    <Text style={{fontWeight: 'bold'}}><Text style={{fontWeight: 'bold', fontSize: 50}}>{data !== null ? data["members_in_month"]["count"] : "..."}</Text>clients</Text>
                                </CardItem>
                            </Card>
                            </TouchableOpacity>
                        </View>
                        <View style={{flex: 1}}>
                            <TouchableOpacity activeOpacity={1}>
                            <Card style={{height: 200}}>
                               <CardItem>
                                    <Text>Currently taking personal training</Text>
                               </CardItem>
                               <CardItem>
                                    <Text style={{fontWeight: 'bold'}}><Text style={{fontWeight: 'bold', fontSize: 50}}>{data !== null ? data["all_pt_members"]["count"] : "..."}</Text>clients</Text>
                               </CardItem>
                            </Card>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={{flexDirection: 'row'}}>
                        <View style={{flex: 1}}>
                            <TouchableOpacity activeOpacity={1}>
                            <Card style={{height: 200}}>
                               <CardItem header>
                                    <Text>Personal training expires in 1 month for</Text>
                               </CardItem>
                               <CardItem>
                                    <Text style={{fontWeight: 'bold'}}><Text style={{fontWeight: 'bold', fontSize: 50}}>{data !== null ? data["pt_expiring"]["count"] : "..."}</Text>clients</Text>
                               </CardItem>
                            </Card>
                            </TouchableOpacity>
                        </View>
                        <View style={{flex: 1}}>
                            <TouchableOpacity activeOpacity={1}>
                            <Card style={{height: 200}}>
                               <CardItem>
                                    <Text>Gym Membership expires in 1 month for</Text>
                               </CardItem>
                               <CardItem>
                                    <Text style={{fontWeight: 'bold'}}><Text style={{fontWeight: 'bold', fontSize: 50}}>{data !== null ? data["membership_expiring"]["count"] : "..."}</Text>clients</Text>
                               </CardItem>
                            </Card>
                            </TouchableOpacity>
                        </View>
                    </View>

              </View>
        );
    }
}