import React, { Component, Fragment,PureComponent } from 'react';
import {StyleSheet,View,ScrollView, TouchableOpacity, Modal, Alert, AppState, AsyncStorage} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import MultiSelect from 'react-native-multiple-select';
import CreateStandardPlan from './CreateStandardPlan';
import PlanInfo from './PlanInfo';
import constants from '../constants'
import { Container, Header, Content, List, Spinner, ListItem,Card, CardItem, Form, Textarea, Left, Item, Input, Body,Button, Picker, Right, Thumbnail, Text } from 'native-base';


export default class Plans extends PureComponent {
  static navigationOptions = {
    title: 'Standard Plans',
    headerTitleStyle: { color: constants.header_text, fontWeight: 'bold'},
    headerStyle: {backgroundColor: constants.header},
    headerTintColor: constants.header_text
  }

  state = {
      modalVisible: false,
      selectedItems: [],
      auth_key: null,
      plan: "Select your plan",
      id: this.props.navigation.state.params.ID,
      planList: null,
      coursetype: null
    };

    setModalVisible(visible) {
      this.setState({modalVisible: visible});
    }


    onSelectedItemsChange = selectedItems => {
      this.setState({ selectedItems });
    };

  componentDidMount(){
          console.log("id has been retrieved", this.state.id)

          const { navigation } = this.props;
          console.log("pagal bana rhe hai")
          this.focusListener = navigation.addListener('didFocus', () => {
              console.log("The screen is focused")
               var key  = this.retrieveItem('key').then(res =>
                           this.setState({auth_key: res}, () => console.log("brother pls", res))
                           ).then(() => {
                                if(this.state.auth_key !== null){
                                    this.fetchDetails()
                                }
                           })
          });

      }

  componentWillUnmount() {
        // Remove the event listener
        this.focusListener.remove();

   }
  fetchDetails = () => {
          let course_list = fetch(constants.API + 'current/admin/gyms/'+ this.state.id + '/plans/', {
              method: 'GET',
              headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json',
                  'Authorization': this.state.auth_key,
              }
          })
          .then(
              res => {
                  if(res.status === 200){
                      return res.json()
                  }
                  else{
                      this.setState({loading: false})
                                                     Alert.alert(
                                                       'OOps!',
                                                       'Something went wrong ...',
                                                        [
                                                            {text: 'OK', onPress: () => console.log('OK Pressed')},
                                                        ],
                                                        {cancelable: false},
                                                     );
                  }
              }
          ).then(res => this.setState({planList: res})).then(

              fetch(constants.API + 'current/admin/gyms/'+ this.state.id + '/coursetypes/', {
                                        method: 'GET',
                                        headers: {
                                            'Accept': 'application/json',
                                            'Content-Type': 'application/json',
                                            'Authorization': this.state.auth_key,
                                        }
                                    })
                                    .then(
                                        res => {
                                            if(res.status === 200){
                                                return res.json()
                                            }
                                            else{
                                                this.setState({loading: false})
                                                                               Alert.alert(
                                                                                 'OOps!',
                                                                                 'Something went wrong ...',
                                                                                  [
                                                                                      {text: 'OK', onPress: () => console.log('OK Pressed')},
                                                                                  ],
                                                                                  {cancelable: false},
                                                                               );
                                            }
                                        }
                                    ).then(res => this.setState({coursetype: res["data"]}, () => console.log("bhai wtf is this", this.state.coursetype)))
          )


      }
      async retrieveItem(key) {
                    try {
                      const retrievedItem =  await AsyncStorage.getItem(key);
                      console.log("key retrieved")
                      return retrievedItem;
                    } catch (error) {
                      console.log(error.message);
                    }
                    return;
            }

  render() {
    return (
    <Fragment>
      <Container style={{backgroundColor: constants.screen_color}}>
        <ScrollView showsVerticalScrollBar={false}>
        <Content style={{margin: 15}}>
        <List>
          {this.state.planList !== null && this.state.coursetype !== null ? this.state.planList.map(plan =>
            <TouchableOpacity activeOpacity={1} onPress={() => this.props.navigation.navigate('PlanInfo', {plan_data: plan, plan_id: plan["id"], gym_id: this.state.id})}>
            <Card style={styles.items}>
              <View style={{flex: 1, padding: 5}}>
                <Thumbnail source={require('./crisis-plan.jpg')}style={{backgroundColor: 'black'}} />
              </View>
              <View style={{flex: 4, padding: 5}}>
                <Text style={{fontWeight: 'bold'}}>{plan["name"]}</Text>

              </View>
            </Card></TouchableOpacity>) : <Spinner color="black"/>}
          </List>
        </Content>
        </ScrollView>
        <View style={styles.addButton}>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('CreateStandardPlan', {go_back_key: this.props.navigation.state.key, ID: this.state.id, coursetype: this.state.coursetype})}>
                    <Button onPress={() => this.props.navigation.navigate('CreateStandardPlan', {go_back_key: this.props.navigation.state.key, ID: this.state.id, coursetype: this.state.coursetype})} rounded style={{height: 50, width: 50, alignItems: 'center', backgroundColor: 'black', justifyContent: 'center'}}>
                      <Icon size={30} style={{color: 'white'}}name="md-add" />
                    </Button>
                    </TouchableOpacity>
                  </View>
      </Container>
     </Fragment>
    );
  }
}
const styles = StyleSheet.create({
  addButton: {
    position: 'absolute',
    right: 30,
    bottom: 30,
  },
  items: {
      elevation: 2,
      padding: 10,
      backgroundColor: constants.card_header,
      marginTop: 2,
      marginLeft: 15,
      marginRight: 15,
      justifyContent: 'space-around',
      flexDirection: 'row',
      borderRadius: 10
  },
  content: {
    margin: 15
  }
});