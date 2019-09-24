import React, { Component, Fragment } from 'react';
import {StyleSheet,View, TouchableOpacity, Modal, Alert} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import MultiSelect from 'react-native-multiple-select';
import CreateStandardPlan from './CreateStandardPlan';
import PlanInfo from './PlanInfo';
import { Container, Header, Content, List, ListItem, Form, Textarea, Left, Item, Input, Body,Button, Picker, Right, Thumbnail, Text } from 'native-base';
export default class Plans extends Component {
  static navigationOptions = {
    title: 'Plans',
    headerTitleStyle: { color: 'white'},
    headerStyle: {backgroundColor: 'black'},
    headerTintColor: 'white'
  }

  state = {
      modalVisible: false,
      selectedItems: [],
      plan: "Select your plan"
    };

    setModalVisible(visible) {
      this.setState({modalVisible: visible});
    }


    onSelectedItemsChange = selectedItems => {
      this.setState({ selectedItems });
    };

  render() {
    return (
    <Fragment>
      <Container>

        <Content>
          <List>
            <ListItem avatar onPress={() => this.props.navigation.navigate('PlanInfo')}>
              <Left>
                <Thumbnail source={require('./crisis-plan.jpg')}style={{backgroundColor: 'black'}} />
              </Left>
              <Body>
                <Text>6 months Muscle Building + Personal Assistance</Text>
                <Text note>Doing what you like will always keep you happy . .</Text>
              </Body>
            </ListItem>
          </List>
        </Content>
        <View style={styles.addButton}>
                    <Button onPress={() => this.props.navigation.navigate('CreateStandardPlan', {go_back_key: this.props.navigation.state.key})} rounded style={{height: 50, width: 50, alignItems: 'center', backgroundColor: 'black', justifyContent: 'center'}}>
                      <Icon size={30} style={{color: 'white'}}name="md-add" />
                    </Button>
                  </View>
      </Container>
     </Fragment>
    );
  }
}
const styles = StyleSheet.create({
  addButton: {
    position: 'absolute',
    right: 20,
    bottom: 30,
  },
  content: {
    margin: 15
  }
});