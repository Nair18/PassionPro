import React, {Component} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  View,
} from 'react-native';
import {Card, CardItem, Accordion, Container, Text} from 'native-base'


export default class Workspace extends Component {

  static navigationOptions = {
      //Setting the header of the screen
      title: 'Workspace',
      headerStyle: {backgroundColor: 'black'},
      headerTitleStyle: {
          color: 'white'
        },
      headerTintColor: 'white',
    };
  render(){
    const { navigate } = this.props.navigation;
    return(
       <Container>
        <View>
        <Text>
            Hi fucker!!!
        </Text>
        <Text>
            {this.props.navigation.state.params.JSON_ListView_Clicked_Item
                        ? this.props.navigation.state.params.JSON_ListView_Clicked_Item
                        : 'No Value Passed'}
        </Text>
        </View>
       </Container>
    );
  }

}