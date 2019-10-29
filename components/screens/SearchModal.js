import React, {Fragment,Component} from 'react';
import { EventRegister } from 'react-native-event-listeners';
import Logging from './Logging';
import {TextInput,Image, StyleSheet, ScrollView, TouchableOpacity, Alert, Modal, StatusBar} from 'react-native';
import { Button, Container, Content, View, Text,Item,ListItem, Input, List, Card, CardItem,  Textarea} from 'native-base';
import Icon from 'react-native-vector-icons/Ionicons';


export default class SearchModal extends Component {
  constructor(props){
    super(props)
    this.state={
      data: ["Item1", "Item2", "Item3", "Item4", "Item5", "Item6","Item1", "Item2", "Item3", "Item4", "Item5", "Item6","Item1", "Item2", "Item3", "Item4", "Item5", "Item6"],
      isVisible: false,
      temp: ["Item1", "Item2", "Item3", "Item4", "Item5", "Item6","Item1", "Item2", "Item3", "Item4", "Item5", "Item6","Item1", "Item2", "Item3", "Item4", "Item5", "Item6"],

    }
  }
  static navigationOptions = {
      title: 'Workouts',
      headerTitleStyle: { color: 'black', fontWeight: 'bold'},
      headerStyle: {backgroundColor: 'white', elevation: 0},
      headerTintColor: 'black'
  }
  showModal = () => {
    this.setState({isVisible: true})
  }
  componentDidMount(){
     StatusBar.setHidden(false);
  }

  filterSearch = (text) => {
      const newData = this.state.data.filter((item)=>{
        const itemData = item.toUpperCase()
        const textData = text.toUpperCase()
        return itemData.indexOf(textData)>-1
      });
      this.setState({
        text:text,
        data: newData.length > 0 ? newData : this.state.temp// after filter we are setting users to new array
      });
  }

  render(){
    return(
        <Container>
            <Content>

                  <View style={{margin: 15}} >
                  <View style={{marginTop: 15}}>
                     <TouchableOpacity onPress={() => {this.setState({isVisible: false})}}>
                         <Icon size={25} name="md-arrow-back"/>
                     </TouchableOpacity>
                  </View>
                  <View style={{marginTop: 50}}>
                     <View>
                       <Item regular><Input placeholder="Search here" onChangeText={(text) => this.filterSearch(text)}
                                                                                  value={this.state.text}/></Item>
                     </View>
                     <View style={{marginTop: 15}}>
                       <List>
                          <ScrollView>
                          {this.state.data.map(item =>
                            <TouchableOpacity>
                            <ListItem>
                                <Text>{item}</Text>
                            </ListItem>
                            </TouchableOpacity>
                          )}
                          </ScrollView>
                       </List>
                     </View>
                  </View>
                  </View>

            </Content>
        </Container>
    );
  }
}

