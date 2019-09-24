/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Fragment,Component} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  View,
} from 'react-native';
import Workspace from './workspace';
import Icon from 'react-native-vector-icons/Ionicons';
import {Container, Accordion,Thumbnail, Card,ListItem,CheckBox, CardItem, Header, Title, Content, Button, Left, Body, Text,Right} from 'native-base';

class SecondLevelCustomer extends Component {
    constructor(props) {
        //constructor to set default state
        super(props);
    }
    static navigationOptions = {
          //Setting the header of the screen
         header: null
        };
  render() {
    const dataArray = [
      { title: "Drink water", content: "drink 1 glass of water in every 30mins" },
      { title: "pre workout meal", content: "6 egg whites and 200g milk oats" },
      { title: "post workout meal", content: "4 chappatees and 200g boiled brown rice" }
    ];
    Date.prototype.monthNames = [
      "January", "February", "March",
      "April", "May", "June",
      "July", "August", "September",
      "October", "November", "December"
    ];
    Date.prototype.dayName = ["Sun","Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    Date.prototype.getDayName = function() {
          return this.dayName[this.getDay()];
        };
    Date.prototype.getMonthName = function() {
      return this.monthNames[this.getMonth()];
    };
    Date.prototype.getShortMonthName = function () {
      return this.getMonthName().substr(0, 3);
    };
    var today = new Date();

  return (
    <Fragment>

    <Container style={{backgroundColor: "white"}}>
            <Header noLeft style={styles.header} androidStatusBarColor='#000' iosBarStyle={"light-content"}>
              <Body>
                <Title style={styles.headerTitle}>Fitness Center, koramangala</Title>
              </Body>
            </Header>
            <ScrollView showsVerticalScrollIndicator={false}>
            <Content padder style={styles.contentBlock}>
              <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
              <View style={styles.thumbnailAlign}>
              <TouchableOpacity onPress={() => this.props.navigation.navigate('#')}>
              <View style={styles.thumbnailBlock}><Thumbnail large style={styles.thumbnail}/><Text>Classes</Text></View></TouchableOpacity>
              <TouchableOpacity>
              <View style={styles.thumbnailBlock}><Thumbnail large style={styles.thumbnail}/><Text>Book a session</Text></View></TouchableOpacity>
              <TouchableOpacity>
              <View style={styles.thumbnailBlock}><Thumbnail large style={styles.thumbnail}/><Text>Compete & Build</Text></View></TouchableOpacity>
              <TouchableOpacity>
              <View style={styles.thumbnailBlock}><Thumbnail large style={styles.thumbnail}/><Text>Refer & Earn</Text></View></TouchableOpacity>
              <TouchableOpacity>
              <View style={styles.thumbnailBlock}><Thumbnail large style={styles.thumbnail}/><Text>Profile</Text></View></TouchableOpacity>
              </View>
              </ScrollView>
              <View style={styles.notificationBlock}>
                <Content>
                  <Text style={styles.notificationText}>Notifications Tile</Text>
                </Content>
              </View>
              <View>
                <TouchableOpacity>
                <Card style={styles.card}>
                  <CardItem style={styles.card}>
                    <Text style={{color: 'grey'}}>Your latest notifications will appear here</Text>
                  </CardItem>
                </Card>
                </TouchableOpacity>
               </View>
              <View style={styles.todayPlan}>
                <Card>

                  <CardItem>
                    <Text style={styles.text}>Today's Agenda: </Text>
                    <Text>{today.getDayName() +" "+today.getDate() + " " + today.getShortMonthName() + ", " + today.getFullYear()}</Text>
                  </CardItem>
                  <CardItem>
                    <Text style={{fontWeight: 'bold'}}>FitList</Text>
                  </CardItem>
                  <TouchableOpacity onPress={() => this.props.navigation.navigate('Workspace', {JSON_ListView_Clicked_Item: "Bench Press"})}>
                  <CardItem>
                    <Left>
                      <Text>Chest Workout</Text>
                    </Left>
                    <Right>
                       <Icon size={20} name="md-add"/>
                    </Right>
                  </CardItem>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => this.props.navigation.navigate('Workspace', {JSON_ListView_Clicked_Item: "Bench Press"})}>
                    <CardItem>
                      <Left>
                        <Text>Dance Class</Text>
                      </Left>
                      <Right>
                        <Icon size={20} name="md-add"/>
                      </Right>
                    </CardItem>
                  </TouchableOpacity>
                  <CardItem>
                    <Text style={{fontWeight: 'bold'}}>Todos</Text>
                  </CardItem>
                  <CardItem >
                    <Accordion

                      dataArray={dataArray}
                      headerStyle={{ backgroundColor: "#f0efef", marginTop: 5 }}
                      contentStyle={{ backgroundColor: "#e0e2e4", paddingLeft: 15}}
                    />
                  </CardItem>
                  <CardItem>
                      <Text style={{color: 'grey'}}onPress={() => alert("This is add")}>ADD YOUR AGENDA</Text>
                  </CardItem>

                </Card>
              </View>
            </Content>
            </ScrollView>
          </Container>
          </Fragment>
  );
}};

const styles = StyleSheet.create({
  header: {
    backgroundColor: 'black',
    paddingTop: 15
  },
  contentBlock: {
    padding: 5
  },
  thumbnailAlign:{
    flexDirection: 'row'
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
    width: 80
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


export default SecondLevelCustomer;