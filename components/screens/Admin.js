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
import {Container, Accordion,Thumbnail, Card,ListItem,CheckBox, CardItem,Tab,Tabs, Header, Title, Content, Button, Left, Body, Text,Right} from 'native-base';

export default class Admin extends Component {
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
                    <View>
                    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                    <View style={styles.thumbnailAlign}>
                    <TouchableOpacity key={1} onPress={() => this.props.navigation.navigate('Courses')}>
                    <View style={styles.thumbnailBlock}><Thumbnail large source={require('./bank-icon.jpg')}style={styles.thumbnail}/><Text>Courses</Text></View></TouchableOpacity>
                    <TouchableOpacity key={2} onPress={() => this.props.navigation.navigate('Plans')}>
                    <View style={styles.thumbnailBlock}><Thumbnail large source={require('./crisis-plan.jpg')} style={styles.thumbnail}/><Text>Plans</Text></View></TouchableOpacity>
                    <TouchableOpacity key={3} onPress={() => this.props.navigation.navigate('Clients')}>
                    <View style={styles.thumbnailBlock}><Thumbnail source={require('./client.png')}large style={styles.thumbnail}/><Text>Clients</Text></View></TouchableOpacity>
                    <TouchableOpacity key={4} onPress={() => this.props.navigation.navigate('Trainer')}>
                    <View style={styles.thumbnailBlock}><Thumbnail large source={require('./trainer.jpeg')}style={styles.thumbnail}/><Text>Trainers</Text></View></TouchableOpacity>
                    <TouchableOpacity key={5}>
                    <View style={styles.thumbnailBlock}><Thumbnail source={require('./requests.jpg')} large style={styles.thumbnail}/><Text>Requests</Text></View></TouchableOpacity>
                    <TouchableOpacity key={6}>
                    <View style={styles.thumbnailBlock}><Thumbnail source={require('./profile.jpg')} large style={styles.thumbnail}/><Text>Profile</Text></View></TouchableOpacity>
                    <TouchableOpacity key={7}>
                    <View style={styles.thumbnailBlock}><Thumbnail source={require('./qr.jpg')} large style={styles.thumbnail}/><Text>Scan</Text></View></TouchableOpacity>
                    </View>
                    </ScrollView>
                    </View>
                  </Content>
                  <View style={{margin: 15}}>
                    <Tabs>
                      <Tab heading="Updates" activeTabStyle={{backgroundColor: '#3e4444'}} tabStyle={{backgroundColor: '#3e4444'}}>
                         <Content style={styles.card}>
                         <Card>
                           <CardItem header>
                             <Text>Updates</Text>
                           </CardItem>
                           <CardItem footer>
                             <Text>Footer</Text>
                           </CardItem>
                         </Card>
                         </Content>
                      </Tab>
                      <Tab heading="Overview" activeTabStyle={{backgroundColor: '#3e4444'}} tabStyle={{backgroundColor: '#3e4444'}}>
                         <Content style={styles.card}>
                         <Card style={styles.card}>
                           <CardItem header>
                             <Text>Overview</Text>
                           </CardItem>
                           <CardItem footer>
                             <Text>Footer</Text>
                           </CardItem>
                         </Card>
                         </Content>
                      </Tab>
                    </Tabs>
                   </View>
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
  card: {
    marginTop: 10
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


