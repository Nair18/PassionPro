import React, { Component, Fragment,PureComponent } from 'react';
import {StyleSheet,View, TouchableOpacity, Modal, Alert,KeyboardAvoidingView, TextInput, AppState,AsyncStorage} from 'react-native';
import ModalSelector from 'react-native-modal-selector';
import { Header } from 'react-navigation-stack';
import CourseInfo from './CourseInfo';
import constants from '../constants';
import Icon from 'react-native-vector-icons/Ionicons';
import MultiSelect from 'react-native-multiple-select';
import PageLoader from './PageLoader';
import { Container, Content, List, ListItem, Form, Textarea, Left, Item, Input, Spinner,Body,Button, Picker, Right, Thumbnail, Text, Toast } from 'native-base';


export default class Courses extends PureComponent {
  constructor(props){
    super(props)
    this.state = {
          modalVisible: false,
          selectedItems: [],
          courseType: null,
          duration: "days",
          description: null,
          days: null,
          courseList: null,
          coursetype: null,
          auth_key: null,
          onProcess: false,
          loading: true,
          courseTypeName: 'Select the fitness progam',
          courseName: null,
          id: this.props.navigation.state.params.ID
        };
  }
  static navigationOptions = {
    title: 'Courses',
    tabBarVisible: false,
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
                                                      constants.failed,
                                                      constants.fail_error,
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
                                          else{
                                              this.setState({loading: false})
                                                                             Alert.alert(
                                                                               constants.failed,
                                                                               constants.fail_error,
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
        if(this.state.courseType === null || this.state.duration == null || this.state.courseName == null || this.state.description == null){
            Alert.alert('All fields are mandatory', 'Please fill out all the details')
            return
        }
        this.setState({onProcess: true})
        fetch(constants.API + 'current/admin/gyms/'+ this.state.id + '/courses/', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': this.state.auth_key
            },
            body: JSON.stringify(
              {
                "course_type": this.state.courseType,
                "duration": this.state.days,
                "days": this.state.duration,
                "name": this.state.courseName,
                "description": this.state.description
              }
            )
        })
        .then(res => {
            if(res.status === 200){
                this.setState({modalVisible: false, onProcess: false})
                this.fetchDetails()
                Alert.alert(
                   '✅ Success',
                   'Course added successfully 😀',
                   [
                      {text: 'OK', onPress: () => console.log('OK Pressed')},
                   ],
                   {cancelable: false}

                );
            }
            else{
                this.setState({modalVisible: false, onProcess: false})
                Alert.alert(
                    '❌ Failed',
                    'Something went wrong 😭',
                     [
                       {text: 'OK', onPress: () => console.log('OK Pressed')},
                     ],
                    {cancelable: false},
                );
            }
        })

    }
  render() {
    return (
    <Fragment>
      <Container style={{backgroundColor: constants.screen_color}}>
        <Content>
          <List>
            {this.state.coursetype !== null && this.state.courseList !== null ? this.state.courseList.map(course =>
            <ListItem key={course["id"]} avatar onPress={() => this.props.navigation.navigate('CourseInfo', {ID: course["id"], GYM_ID: this.state.id})}>
              <Left style={{margin: 5}}>
                <Thumbnail source={require('./bank-icon.jpg')} style={{backgroundColor: 'black'}} />
              </Left>
              <Body>
                <Text style={{fontWeight: 'bold'}}>{course["name"]}</Text>
                <Text note>{course["course_type"]}</Text>
              </Body>

            </ListItem>): <PageLoader/>}
          </List>
        </Content>
        <View style={styles.addButton}>
                    <Button rounded style={{height: 50, width: 50, alignItems: 'center', backgroundColor: 'black', justifyContent: 'center'}} onPress={() => this.setModalVisible(true)}>
                      <Icon size={30} style={{color: 'white'}}name="md-add" />
                    </Button>
                  </View>
      </Container>

      <View>
        <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.modalVisible}
          onRequestClose={() => {
            this.setModalVisible(false)
          }}>
          <View style={{margin: 15}}>
            <TouchableOpacity onPress={() => this.setModalVisible(false)}>
            <Icon name="md-close" size={30}/>
            </TouchableOpacity>
      </View>
          <Content style={styles.content}>
            <KeyboardAvoidingView style={styles.container} keyboardVerticalOffset = {Header.HEIGHT + 20}  behavior="padding" enabled>
            {this.state.coursetype !== null ?
            (<Form>
               <View style={{margin: 15}}>
                       <ModalSelector
                           placeholder="Select the fitness program"
                           initValue={this.state.courseTypeName}
                           data={this.state.coursetype}
                           keyExtractor= {item => item.id}
                           labelExtractor= {item => item.name}
                           initValue={this.state.courseType}
                           supportedOrientations={['landscape']}
                           accessible={true}
                           scrollViewAccessibilityLabel={'Scrollable options'}
                           cancelButtonAccessibilityLabel={'Cancel Button'}
                           onChange={(option)=>{
                            this.setState({courseType: option.id, courseTypeName: option.name})
                           }}>

                           <TextInput
                             style={{borderWidth:1, borderColor:'#ccc', color: 'black',padding:10, height:50}}
                             editable={false}
                             placeholder="Select the fitness program"
                             value={this.state.courseTypeName}
                           />
                         </ModalSelector>
               </View>

               <Item style={{margin: 15}}>
                  <Input placeholder="Course Name" onChangeText={(text) => this.setState({courseName: text})}/>
               </Item>
               <Item style={{marginLeft: 15, marginRight: 15, marginTop: 10}}>
                  <Textarea rowSpan={5} style={{width: '100%'}} bordered placeholder="Description" onChangeText={text => this.setState({description: text})}/>
               </Item>

               <Item regular style={{marginLeft: 15,marginRight: 15,marginTop: 10,  flexDirection: 'row'}}>
                                <Input placeholder="duration" keyboardType='numeric' onChangeText={text => this.setState({days: text})} style={{flex: 1,  backgroundColor: "#CCC"}}/>
                                <Picker
                                              note
                                              mode="dropdown"
                                              style={{ width: 5, flex: 1 }}
                                              selectedValue={this.state.duration}
                                              onValueChange={(itemValue, itemIndex) =>
                                                  this.setState({duration: itemValue})
                                                }
                                            >
                                              <Picker.Item label="days" value="days" />
                                            </Picker>
                              </Item>




               <View last style={{alignItems: 'center',justifyContent: 'center', marginTop: 15}}>
               {this.state.onProcess === false ?
               <Button onPress={this.onSubmit} style={{backgroundColor: 'black'}}>
                 <Text>Submit</Text>
               </Button> : <Spinner color="black"/>}
               </View>
            </Form>) : <View style={{justifyContent: 'center', alignItems: 'center'}}><Text>loading ...</Text></View>}
            </KeyboardAvoidingView>
          </Content>
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

  }
});