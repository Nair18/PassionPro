import React, {Fragment,Component} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TouchableNativeFeedback,
  StatusBar,
  Modal,
  AsyncStorage,
  Alert,
  TouchableHighlight,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import TrainerRequest from './TrainerRequest';
import ClientRequest from './ClientRequest';
import SwipeableViews from 'react-swipeable-views-native';
import {Container,List, Card,Header, Tab, Tabs, ListItem,TabHeading, Textarea, CheckBox, CardItem, Title, Content, Button, Left, Body, Text,Right} from 'native-base';
import constants from '../constants';
export default class Request extends Component{
    constructor(props){
        super(props);
        this.state={
            id: this.props.navigation.state.params.ID,
            auth_key: null,
        }
    }
    static navigationOptions = {
              title: 'Requests',
              headerTitleStyle: { color: constants.header_text, fontWeight: 'bold'},
              headerStyle: {backgroundColor: constants.header, elevation: 1},
              headerTintColor: constants.header_text
    }

    render(){

        return(
            <Container style={{backgroundColor: constants.screen_color}}>
            <SwipeableViews style={styles.slideContainer}>
                        <Tabs>
                          <Tab heading={<TabHeading style={{backgroundColor: constants.header}}><Text style={{color: constants.header_text}}>Clients</Text></TabHeading>}>
                              <ClientRequest ID = {this.state.id} navigation = {this.props.navigation} />
                          </Tab>
                          <Tab heading={<TabHeading style={{backgroundColor: constants.header}}><Text style={{color: constants.header_text}}>Trainer</Text></TabHeading>}>
                            <TrainerRequest ID = {this.state.id} navigation = {this.props.navigation} />
                          </Tab>
                        </Tabs>
            </SwipeableViews>
            </Container>
        );
    }
}

const styles = StyleSheet.create({
  slideContainer: {
    height: 100
  }
});