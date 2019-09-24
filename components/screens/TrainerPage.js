import React, {Fragment,Component} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TouchableNativeFeedback,
  StatusBar,
  View,
} from 'react-native';
import Workspace from './workspace';
import Courses from './Courses';
import Clients from './Clients';
import Plans from './Plans';
import Trainer from './Trainer';
import Icon from 'react-native-vector-icons/Ionicons';
import {Container, Accordion,Thumbnail, Card,ListItem,CheckBox, CardItem, Header, Title, Content, Button, Left, Body, Text,Right} from 'native-base';

export default class TrainerPage extends Component {
  constructor(props){
    super(props)
  }
  static navigationOptions = {
    header: null
  }


  render(){
    return(
      <Fragment>
         <Container style={{backgroundColor: "white"}}>
                  <Header noLeft style={styles.header} androidStatusBarColor='#000' iosBarStyle={"light-content"}>
                    <Body>
                      <Title style={styles.headerTitle}>Fitness Center, koramangala</Title>
                    </Body>
                  </Header>
                  <ScrollView showsVerticalScrollIndicator={false}>
                  <Content padder style={styles.contentBlock}>
                   <Text>Coming Soon my boy</Text>
                  </Content>
                  </ScrollView>
         </Container>
      </Fragment>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: 'black',
    paddingTop: 15
  },
  contentBlock: {


  },
  thumbnailAlign:{
    flexDirection: 'row',
    backgroundColor: "white",
    padding: 5,
  },
  todayPlan: {
    marginTop: 10
  },
  text: {
    fontWeight: 'bold',
    fontSize: 20
  },
  thumbnailBlock: {
    marginRight: 10,
    width: 80,
    justifyContent: 'center',
    alignItems: 'center'
  },
  notificationButton: {
    backgroundColor: 'white',
    padding: 10
  },
  notificationText: {
    fontWeight: 'bold'
  },
  card: {
    minHeight: 100
  },
  thumbnail: {
    backgroundColor: 'black'
  },
  notificationBlock: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  headerTitle: {
    color: 'white',
    flex: 3,
    justifyContent: 'center',
    fontSize: 20
  }
});


