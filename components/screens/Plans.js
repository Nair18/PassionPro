import React, { Component, Fragment } from 'react';
import {StyleSheet,View, TouchableOpacity, Modal, Alert, AppState, AsyncStorage} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import MultiSelect from 'react-native-multiple-select';
import CreateStandardPlan from './CreateStandardPlan';
import PlanInfo from './PlanInfo';
import { Container, Header, Content, List, ListItem, Form, Textarea, Left, Item, Input, Body,Button, Picker, Right, Thumbnail, Text } from 'native-base';
export default class Plans extends Component {
  static navigationOptions = {
    title: 'Plans',
    headerTitleStyle: { color: 'black', fontWeight: 'bold'},
    headerStyle: {backgroundColor: 'white', elevation: 0},
    headerTintColor: 'black'
  }

  state = {
      modalVisible: false,
      selectedItems: [],
      auth_key: null,
      plan: "Select your plan",
      id: this.props.navigation.state.params.ID,
    };

    setModalVisible(visible) {
      this.setState({modalVisible: visible});
    }


    onSelectedItemsChange = selectedItems => {
      this.setState({ selectedItems });
    };

  componentDidMount(){
          console.log("id has been retrieved", this.state.id)
          AppState.addEventListener('change', this._handleAppStateChange);
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
        AppState.removeEventListener('change', this._handleAppStateChange);
   }
  fetchDetails = () => {
          let course_list = fetch(constants.API + 'current/admin/gyms/'+ this.state.id + '/courses/', {
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
          ).then(res => this.setState({courseList: res["courses"]})).then(

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
      <Container>

        <Content>
          <List>
            <ListItem avatar onPress={() => this.props.navigation.navigate('PlanInfo')}>
              <Left>
                <Thumbnail source={require('./crisis-plan.jpg')}style={{backgroundColor: 'black'}} />
              </Left>
              <Body>
                <Text>Standard Workout Plan</Text>
                <Text note>Doing what you like will always keep you happy . .</Text>
              </Body>
            </ListItem>
          </List>
        </Content>
        <View style={styles.addButton}>

                    <Button  onPress={() => this.props.navigation.navigate('CreateStandardPlan', {go_back_key: this.props.navigation.state.key})} rounded style={{height: 50, width: 50, alignItems: 'center', backgroundColor: 'black', justifyContent: 'center'}}>
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
    right: 30,
    bottom: 30,
  },
  content: {
    margin: 15
  }
});