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
import Hyperlink from 'react-native-hyperlink'
import {Agenda} from 'react-native-calendars';
import Icon from 'react-native-vector-icons/Ionicons';
import {Container, Accordion,Thumbnail, Card,ListItem,CheckBox, CardItem,Tab,Tabs, Header, Title, Content, Button, Left, Body, Text,Right} from 'native-base';

export default class Notification extends Component {
    static navigationOptions = {
          title: 'Notifications',
          headerTitleStyle: { color: 'black', fontWeight: 'bold'},
          headerStyle: {backgroundColor: 'white',elevation: 0},
          headerTintColor: 'black'
      }
    componentDidMount(){
                    StatusBar.setHidden(false);
                }
    render(){
        return(
            <Container style={{margin: 15}}>
                <ScrollView>
                <Content>
                    <View>
                        <Card>
                            <CardItem header>
                                <Text style={{fontWeight: 'bold'}}>Promotional Post</Text>
                            </CardItem>
                            <CardItem>
                                <Hyperlink linkStyle={ { color: '#2980b9'} } linkDefault={true}>
                                    <Text selectable style={ { fontSize: 15 } }>
                                      This Valentine’s Day, get them something they’ll love from our weekly ad: https://docs.aws.amazon.com/rekognition/latest/dg/rekognition-dg.pdf
                                    </Text>
                                  </Hyperlink>
                            </CardItem>
                            <CardItem >
                              <Button onPress={() => { Linking.openURL('https://neilpatel.com/ubersuggest/')}}><Text>Open</Text></Button>
                            </CardItem>
                        </Card>
                    </View>
                </Content>
                </ScrollView>
            </Container>
        );
    }
}