import React, {Fragment,Component} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  FlatList,
  View,ImageBackground
} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';
import {Container, Accordion,Thumbnail, List, Card, Input, Textarea, Item, ListItem,CheckBox, CardItem, Header, Title, Content, Button, Left, Body, Text,Right} from 'native-base';

export default class CreateWorkout extends Component {
    static navigationOptions = {
          title: 'Create Workout',
          headerTitleStyle: { color: 'black', fontWeight: 'bold'},
          headerStyle: {backgroundColor: 'white', elevation: 0},
          headerTintColor: 'black'
      }
    render(){
        return(
            <Container>
                <Content style={{margin: 15}}>
                    <View style={{marginTop: 15}}>
                        <View>
                            <Button style={{backgroundColor: 'white'}} onPress={() => {console.log("Hello bros chai pee lo!!")}}><Text style={{color: 'grey'}}>Select your Exercise</Text></Button>
                        </View>
                        <View >
                            <Item style={{marginTop: 10}}>
                               <Input keyboardType='numeric' placeholder="Sets"/>
                            </Item>
                            <Item style={{marginTop: 10}}>
                                <Input keyboardType='numeric' placeholder="Reps"/>
                            </Item>
                            <Item style={{marginTop: 10}}>
                                <Input keyboardType='numeric' placeholder="Weight(Kg)" />
                            </Item>
                            <Item style={{marginTop: 10}}>
                                <Input keyboardType='numeric' placeholder="Duration" />
                            </Item>
                            <Item regular style={{marginTop: 10}}>
                                <Textarea rowSpan={5} placeholder="Instructions"/>
                            </Item>
                        </View>
                        <View style={{marginTop: 15, justifyContent: 'center', alignItems: 'center'}}>
                              <Button style={{backgroundColor: 'black'}}><Text style={{color: 'white'}}>Save</Text></Button>
                        </View>
                    </View>
                </Content>
            </Container>
        );
    }
}