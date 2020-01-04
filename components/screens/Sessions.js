import React, { Component, Fragment,PureComponent } from 'react';
import {StyleSheet,View, TouchableOpacity, Modal, Alert,KeyboardAvoidingView, TextInput, AppState,AsyncStorage, Dimensions} from 'react-native';
import ModalSelector from 'react-native-modal-selector';
import { Header } from 'react-navigation-stack';
import CourseInfo from './CourseInfo';
import constants from '../constants';
import Icon from 'react-native-vector-icons/Ionicons';
import MultiSelect from 'react-native-multiple-select';
import PageLoader from './PageLoader';
import { Container, Content, List, ListItem, Form, Card, Label,CardItem, Textarea, Left, Item, Input, Spinner,Body,Button, Picker, Right, Thumbnail, Text, Toast } from 'native-base';


export default class Sessions extends PureComponent {
  constructor(props){
    super(props)
    this.state = {
          modalVisible: false,
          courseType: null,
          coursetype: null,
          auth_key: null,
          onProcess: false,
          id: this.props.navigation.state.params.id,
          loading: true
        };
  }
  static navigationOptions = {
    title: 'Fitness Programs',
    headerTitleStyle: { color: constants.header_text, fontWeight: 'bold'},
    headerStyle: {backgroundColor: constants.header},
    headerTintColor: constants.header_text
  }



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
        this.setState({loading: true})
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
        ).then(res => this.setState({courseList: res["courses"], loading: false})).then(

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
                                          else if(res.status === 401){
                                            this.props.navigation.navigate('LandingPage')
                                            return
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
    setModalVisible(visible) {
      this.setState({modalVisible: visible});
    }


    onSelectedItemsChange = selectedItems => {
      this.setState({ selectedItems });
    };

    onSubmit = () => {

        this.setState({onProcess: true})
        fetch(constants.API + 'current/admin/gyms/'+ this.state.id + '/coursetypes/', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': this.state.auth_key
            },
            body: JSON.stringify(
              {
                "course_type": this.state.courseType,
                "gym_id": this.state.id
              }
            )
        })
        .then(res => {
            this.setState({onProcess: false})
            if(res.status === 200){
                this.setState({modalVisible: false, onProcess: false})
                this.fetchDetails()
                Alert.alert(
                   constants.success,
                   'Successfully added the fitness program',
                   [
                      {text: 'OK', onPress: () => console.log('OK Pressed')},
                   ],
                   {cancelable: false}
                );
            }
            else{
                this.setState({modalVisible: false, onProcess: false})
                Alert.alert(
                    constants.failed,
                    constants.fail_error,
                     [
                       {text: 'OK', onPress: () => console.log('OK Pressed')},
                     ],
                    {cancelable: false},
                );
            }
        })

  }

  _delete = (c_id) => {
    fetch(constants.API + 'current/admin/gyms/'+this.state.id + '/archive/coursetypes/'+c_id, {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': this.state.auth_key
        }
    }).then(res => {
        if(res.status === 200){
            Alert.alert(constants.success, 'Successfully deleted')
            this.fetchDetails()
        }
        else if(res.status === 401){
            this.props.navigation.navigate('LandingPage')
        }
        else{
            Alert.alert(constants.failed, constants.fail_error)
            return
        }
    })
  }
  _deletealert = (id) => {
//    Alert.alert(constants.warning, "Are you sure you want to delete?",
//
//                    [
//                        {text: 'Cancel', onPress: () => console.log("pressed cancel")},
//                        {text: 'OK', onPress: () => this._delete(id)},
//
//                    ],
//                    {cancelable: false}
//    )

      if(this.state.coursetype !== null){
        let ct = []
        ct = this.state.coursetype.filter(val => {
            return val["id"] === id
        })
        if(ct.length > 0){
            this.setState({courseType: ct[0]["name"]}, () => {
                console.log("text set")

            })
        }
      }
  }
  render() {
    return (
    <Fragment>
      <Container style={{backgroundColor: constants.screen_color}}>
        <Content style={{margin: 15}}>
            {this.state.coursetype !== null ? this.state.coursetype.map(coursetype =>
                <View style={{marginTop: 5}}>
                    <Card style={{backgroundColor: constants.item_card}}>
                        <CardItem style={{backgroundColor: constants.item_card, justifyContent: 'space-between'}}>
                            <Text style={{fontWeight: 'bold'}}>{coursetype["name"]}</Text>
                            <TouchableOpacity onPress={() => this._deletealert(coursetype["id"])}>
                                <Icon name="md-create" size={25} style={{color: 'white'}} onPress={() => this._deletealert(coursetype["id"])}/>
                            </TouchableOpacity>
                        </CardItem>
                    </Card>
                </View>):<PageLoader/>}
        </Content>
        <View style={styles.addButton}>
                    <TouchableOpacity onPress={() => this.setModalVisible(true)}>
                    <Button rounded style={{height: 50, width: 50, alignItems: 'center', backgroundColor: 'black', justifyContent: 'center'}} onPress={() => this.setModalVisible(true)}>
                      <Icon size={30} style={{color: 'white'}}name="md-add" />
                    </Button>
                    </TouchableOpacity>
                  </View>
      </Container>

      <View>
        <Modal
          animationType="slide"
          transparent={true}

          visible={this.state.modalVisible}
          onRequestClose={() => {
            this.setModalVisible(false)
          }}>
          <View style = {styles.modal}>
          <View>
            <TouchableOpacity onPress={() => this.setModalVisible(false)}>
            <Icon name="md-close" size={30}/>
            </TouchableOpacity>
          </View>
          <Content style={styles.content}>
            <KeyboardAvoidingView style={styles.container} keyboardVerticalOffset = {Header.HEIGHT + 20}  behavior="padding" enabled>
            {this.state.coursetype !== null ?
            (<Form>
               <View style={{marginTop: 20}}>
               <Label><Text style={{fontWeight: 'bold'}}>Name</Text></Label>
                <Item regular>
                   <Input placeholder="eg. Zumba" onChangeText={(text) => this.setState({courseType: text})}/>
                </Item>
               </View>
               <View last style={{alignItems: 'center',justifyContent: 'center', marginTop: 25}}>
               {this.state.onProcess === false ?
               <Button block onPress={this.onSubmit} style={{backgroundColor: 'black'}}>
                 <Text>Add</Text>
               </Button> : <Spinner color="black"/>}
               </View>
            </Form>) : <View style={{justifyContent: 'center', alignItems: 'center'}}><Text>loading ...</Text></View>}
            </KeyboardAvoidingView>
          </Content>
          </View>
        </Modal>
      </View>

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

  },
  modal: {
      backgroundColor : constants.card_header,
      height: 300 ,
      width: '80%',
      borderRadius:10,
      borderWidth: 1,
      borderColor: '#fff',
      marginTop: 80,
      marginLeft: 40,
      padding: 15
  }
});