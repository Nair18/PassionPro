import React, { Component, Fragment } from 'react';
import {StyleSheet,View, TouchableOpacity, Modal, Alert,KeyboardAvoidingView, TextInput} from 'react-native';
import ModalSelector from 'react-native-modal-selector';
import { Header } from 'react-navigation-stack';
import CourseInfo from './CourseInfo';
import Icon from 'react-native-vector-icons/Ionicons';
import MultiSelect from 'react-native-multiple-select';

import { Container, Content, List, ListItem, Form, Textarea, Left, Item, Input, Body,Button, Picker, Right, Thumbnail, Text } from 'native-base';
export default class Courses extends Component {
  constructor(props){
    super(props)
  }
  static navigationOptions = {
    title: 'Courses',
    headerTitleStyle: { color: 'white'},
    headerStyle: {backgroundColor: 'black'},
    headerTintColor: 'white'
  }

  state = {
      modalVisible: false,
      selectedItems: [],
      courseType: "Select a course type",
      duration: "Select the duration"
    };

    setModalVisible(visible) {
      this.setState({modalVisible: visible});
    }


    onSelectedItemsChange = selectedItems => {
      this.setState({ selectedItems });
    };

  render() {
    let items = [{
              id: '92iijs7yta',
              name: 'Ondo',
            }, {
              id: 'a0s0a8ssbsd',
              name: 'Ogun',
            }, {
              id: '16hbajsabsd',
              name: 'Calabar',
            }, {
              id: 'nahs75a5sg',
              name: 'Lagos',
            }, {
              id: '667atsas',
              name: 'Maiduguri',
            }, {
              id: 'hsyasajs',
              name: 'Anambra',
            }, {
              id: 'djsjudksjd',
              name: 'Benue',
            }, {
              id: 'sdhyaysdj',
              name: 'Kaduna',
            }, {
              id: 'suudydjsjd',
              name: 'Abuja',
            }];

    return (
    <Fragment>
      <Container >
        <Content>
          <List>
            <ListItem avatar onPress={() => this.props.navigation.navigate('CourseInfo')}>
              <Left>
                <Thumbnail source={require('./bank-icon.jpg')} style={{backgroundColor: 'black'}} />
              </Left>
              <Body>
                <Text>Zumba Class</Text>
                <Text note>Doing what you like will always keep you happy . .</Text>
              </Body>

            </ListItem>
          </List>
        </Content>
        <View style={styles.addButton}>
                    <Button rounded style={{height: 50, width: 50, alignItems: 'center', backgroundColor: 'black', justifyContent: 'center'}} onPress={() => this.setModalVisible(true)}>
                      <Icon size={30} style={{color: 'white'}}name="md-add" />
                    </Button>
                  </View>
      </Container>

      <View style={{marginTop: 22}}>
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
            <Form>
               <View style={{margin: 15}}>

                       <ModalSelector
                           placeholder="Select a course type"
                           data={items}
                           keyExtractor= {item => item.id}
                           labelExtractor= {item => item.name}
                           initValue="Select something yummy!"
                           supportedOrientations={['landscape']}
                           accessible={true}
                           scrollViewAccessibilityLabel={'Scrollable options'}
                           cancelButtonAccessibilityLabel={'Cancel Button'}
                           onChange={(option)=>{ this.setState({courseType:option.id})}}>

                           <TextInput
                             style={{borderWidth:1, borderColor:'#ccc', color: 'black',padding:10, height:50}}
                             editable={false}
                             placeholder="Select something yummy!"
                             value={this.state.courseType}
                           />
                         </ModalSelector>
               </View>
                <View style={{marginLeft: 15, marginRight: 15}}>
                  <Text note>Didnt find the course type you wanted, type your course type below!!</Text>
                </View>
                <Item style={{margin: 15}}>
                   <Input placeholder="Create your course type" />
                </Item>
               <Item style={{margin: 15}}>
                  <Input placeholder="Course Name" />
               </Item>
               <Item style={{marginLeft: 15, marginRight: 15, marginTop: 10}}>
                  <Textarea rowSpan={5} style={{width: '100%'}} bordered placeholder="Description" />
               </Item>

               <Item regular style={{marginLeft: 15,marginRight: 15,marginTop: 10,  flexDirection: 'row'}}>
                                <Input placeholder="duration" keyboardType='numeric' style={{flex: 1,  backgroundColor: "#CCC"}}/>
                                <Picker
                                              note
                                              mode="dropdown"
                                              style={{ width: 5, flex: 1 }}
                                              onValueChange={(itemValue, itemIndex) =>
                                                  this.setState({duration: itemValue})
                                                }
                                            >
                                              <Picker.Item label="days" value="days" />
                                              <Picker.Item label="weeks" value="weeks" />
                                              <Picker.Item label="months" value="months" />
                                              <Picker.Item label="years" value="years" />

                                            </Picker>
                              </Item>




               <View last style={{alignItems: 'center',justifyContent: 'center', marginTop: 15}}>
               <Button rounded style={{backgroundColor: 'black'}}>
                 <Text>Submit</Text>
               </Button>
               </View>
            </Form>
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
    right: 10,
    bottom: 10,
  },
  content: {

  }
});