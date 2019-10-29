import React, {Fragment,Component} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TouchableNativeFeedback,
  StatusBar,
  Modal,
  TouchableHighlight,
  TextInput,
  View,
} from 'react-native';
import ModalSelector from 'react-native-modal-selector';
import Icon from 'react-native-vector-icons/Ionicons';
import DatePicker from 'react-native-date-picker';
import {Container, Accordion,Thumbnail, Card,ListItem, Textarea, Picker, CheckBox, CardItem, Header, Title, Content, Button, Left, Body, Text,Right, Form, Item, Label, Input} from 'native-base';

export default class ClientRequestInfo extends Component {
    constructor(props){
        super(props);
        this.state = {
            name: 'Karthik',
            personal_contact: '9979090670',
            email: 'n@gmail.com',
            age: '23',
            course: null,
            amountPaid: "NA",
            startDate: null,
            endDate: null,
            ptBool: 'NO',
            pt: null,
            ptName: null,
            address: 'brothel near koramangala',
            gender: 'male',
            emergency_contact_name: 'Chaman',
            emergency_contact: '9979090671',
            relation: 'Fuckmate',
            certification: 'NASM, MSN, WINDOWS, DEVOPS',
        }
    }
    static navigationOptions = {
              title: 'Request Info',
              headerTitleStyle: { color: 'black', fontWeight: 'bold'},
              headerStyle: {backgroundColor: 'white', elevation: 0},
              headerTintColor: 'black'
          }
    render(){
        return(
            <Container>
                <Content style={{marginLeft: 15, marginRight: 15}}>
                <Form>
                    <Item floatingLabel>
                        <Label>Name</Label>
                          <Input value={this.state.name} onChangeText={text => this.setState({name: text})}/>
                    </Item>

                                            <View style={{margin: 15}}>
                                                                <ModalSelector
                                                                    placeholder="Select a course type"
                                                                    initValue={this.state.courseList}
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
                                                                        placeholder="Select the course type"
                                                                        value={this.state.courseTypeName}
                                                                    />

                                                                </ModalSelector>
                                                                </View>

                    <Item floatingLabel>
                                            <Label>Phone number</Label>
                                              <Input keyboardType='numeric' value={this.state.personal_contact} onChangeText={text => this.setState({personal_contact: text})}/>
                                        </Item>
                    <Item floatingLabel>
                                            <Label>Email</Label>
                                              <Input value={this.state.email} onChangeText={text => this.setState({email: text})}/>
                                        </Item>
                    <Item floatingLabel>
                                            <Label>Age</Label>
                                              <Input keyboardType='numeric' value={this.state.age} onChangeText={text => this.setState({age: text})}/>
                                        </Item>
                    <Item floatingLabel>
                                            <Label>Address</Label>
                                              <Input value={this.state.address} onChangeText={text => this.setState({address: text})}/>
                                        </Item>
                    <View style={{margin: 15}}>
                                                                         <Text>Membership Start Date</Text>
                                                                             <DatePicker
                                                                                   date={this.state.date}
                                                                                   onDateChange={date => this.setState({ date })}

                                                                                   mode = 'date'
                                                                                   textColor = '#3e4444'
                                                                             />
                                                             </View>
                    <View style={{marginLeft: 15, marginRight: 15}}>
                                                                         <Text>Membership End Date</Text>
                                                                             <DatePicker
                                                                                   date={this.state.date}
                                                                                   onDateChange={date => this.setState({ date })}

                                                                                   mode = 'date'
                                                                                   textColor = '#3e4444'
                                                                             />
                                                             </View>

                    <Item floatingLabel>
                                            <Label>Amount Paid</Label>
                                              <Input keyboardType='numeric' value={this.state.amountPaid} onChangeText={text => this.setState({amountPaid: text})}/>
                                        </Item>
                    <Item floatingLabel>
                                             <Label>Gender</Label>
                                               <Input value={this.state.gender} onChangeText={text => this.setState({gender: text})}/>
                                         </Item>

                                     <Item regular style={{marginRight: 15, marginLeft: 15, marginTop: 15}}>

                                               <Picker
                                                                                                    note
                                                                                                    mode="dropdown"
                                                                                                    style={{ width: 5, flex: 1 }}
                                                                                                    selectedValue={this.state.durationType}
                                                                                                    onValueChange={(itemValue, itemIndex) =>
                                                                                                    this.setState({durationType: itemValue})
                                                                                                    }
                                                                                                >
                                                                                                     <Picker.Item label="Personal Training ?" value="no" />
                                                                                                     <Picker.Item label="YES" value="yes" />
                                                                                                     <Picker.Item label="NO" value="no" />


                                                                                                </Picker>
                                         </Item>

                                            <View style={{margin: 15}}>
                                                                   <ModalSelector
                                                                       placeholder="Assign a trainer"
                                                                       initValue={this.state.ptName}
                                                                       data={this.state.trainerList}
                                                                       keyExtractor= {item => item.id}
                                                                       labelExtractor= {item => item.name}
                                                                       initValue={this.state.courseType}
                                                                       supportedOrientations={['landscape']}
                                                                       accessible={true}
                                                                       scrollViewAccessibilityLabel={'Scrollable options'}
                                                                       cancelButtonAccessibilityLabel={'Cancel Button'}
                                                                       onChange={(option)=>{
                                                                        this.setState({pt: option.id, ptName: option.name})
                                                                       }}>

                                                                       <TextInput
                                                                         style={{borderWidth:1, borderColor:'#ccc', color: 'black',padding:10, height:50}}
                                                                         editable={false}
                                                                         placeholder="Assign a trainer"
                                                                         value={this.state.ptName}
                                                                       />
                                                                     </ModalSelector>
                                                           </View>

                    <Item floatingLabel>
                                             <Label>Emergency contact person</Label>
                                               <Input value={this.state.emergency_contact_name} onChangeText={text => this.setState({emergency_contact_name: text})}/>
                                         </Item>
                    <Item floatingLabel>
                                            <Label>Emergency contact number</Label>
                                              <Input keyboardType='numeric' value={this.state.emergency_contact} onChangeText={text => this.setState({emergency_contact: text})}/>
                                        </Item>
                    <Item floatingLabel>
                                            <Label>Relation with the person</Label>
                                              <Input value={this.state.relation} onChangeText={text => this.setState({relation: text})}/>
                                        </Item>
                     </Form>
                    <View style={{ flexDirection: 'row'}}>
                        <View style={{flex: 1, margin: 25, justifyContent: 'center', alignItems: 'center'}}>
                            <Button style={{backgroundColor: '#c83349'}}><Text style={{color: 'white'}}>Cancel</Text></Button>
                        </View>
                        <View style={{flex: 1, margin: 25, justifyContent: 'center', alignItems: 'center'}}>
                            <Button style={{backgroundColor: 'black'}}><Text style={{color: 'white'}}>Approve</Text></Button>
                        </View>
                    </View>
                </Content>
            </Container>
        );
    }
}