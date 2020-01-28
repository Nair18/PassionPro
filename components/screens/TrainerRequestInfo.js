import React, {Fragment,Component} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TouchableNativeFeedback,
  StatusBar,
  Modal,
  Alert,
  TextInput,
  AsyncStorage,
  TouchableHighlight,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import DatePicker from 'react-native-datepicker';
import ModalSelector from 'react-native-modal-selector';
import constants from '../constants';
import {Container, Accordion,Thumbnail, Card,ListItem, Spinner,Textarea, CheckBox, CardItem, Header, Title, Content, Button, Left, Body, Text,Right, Form, Item, Label, Input} from 'native-base';

export default class TrainerRequestInfo extends Component {
    constructor(props){
        super(props);
        this.state = {
            id: this.props.navigation.state.params.ID,
            name: this.props.navigation.state.params.details['name'],
            request_id: this.props.navigation.state.params.details['request_id'],
            personal_contact: this.props.navigation.state.params.details['phone'],
            email: this.props.navigation.state.params.details['email'],
            age: this.props.navigation.state.params.details['age'],
            amount: 0,
            courseData: null,
            onProcess: false,
            courseName: null,
            courseId: null,
            auth_key: null,
            cancel: false,
            shift: null,
            contract_start: new Date(),
            address: this.props.navigation.state.params.details['address'],
            gender: this.props.navigation.state.params.details['gender'],
            emergency_contact_name: this.props.navigation.state.params.details['emergency_person'],
            emergency_contact: this.props.navigation.state.params.details['emergency_phone'],
            relation: this.props.navigation.state.params.details['relation_with_person'],
            certification: this.props.navigation.state.params.details['certification'] !== null ? this.props.navigation.state.params.details['certification'] : "NA",
        }
    }

    async retrieveItem(key) {
                    try {
                      const retrievedItem =  await AsyncStorage.getItem(key);
                      console.log("key retrieved")
                      return retrievedItem;
                    } catch (error) {
                      console.log(error.message);
                    }
                    return
        }
    componentDidMount(){
            StatusBar.setHidden(false);
            console.log("bros in didmount")
            const { navigation } = this.props;
            console.log("pagal bana rhe hai")
    //        this.focusListener = navigation.addListener('didFocus', () => {
               var key  = this.retrieveItem('key').then(res =>
               this.setState({auth_key: res}, () => console.log("brother pls", res))
               ).then(() => this.fetchDetails())
    //        });
        }

    fetchDetails = () => {
                    fetch(constants.API + 'current/admin/gyms/'+ this.state.id + '/coursetypes/',{
                     method: 'GET',
                        headers: {
                           'Accept': 'application/json',
                           'Content-Type': 'application/json',
                           'Authorization': this.state.auth_key,
                         },
                    }).then(response => {
                        if (response.status === 200) {
                        return response.json();
                         } else {
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
                         }).then(res => {
                         this.setState({courseData: res["data"]})
                         }).then(console.log("fetched the api data", this.state.courseData))
        }

    componentWillUnmount() {
    //       this.focusListener.remove();
        }
    _cancel = () => {
       this.setState({cancel: true}, () => this.onApprove())
    }

    onApprove = () => {
            if(this.state.contract_start == null){
                Alert.alert('Incomplete Info', "All '*' fields are mandatory")
                return
            }
            this.setState({onProcess: true})
            fetch(constants.API + 'current/admin/gyms/'+ this.state.id + '/request/'+ this.state.request_id, {
                method: 'PUT',
                headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json',
                  'Authorization': this.state.auth_key,
                },
                body: JSON.stringify({
                      "amount": this.state.amount,
                      "start_date": this.state.contract_start,
                      "end_date": "2099-12-01",
                      "shift": this.state.shift,
                      "to_reject": this.state.cancel
                })
            }).then(res => {
               this.setState({onProcess: false})
               if(res.status == 200){
                 Alert.alert(constants.success, 'Action was successful')

                 this.props.navigation.goBack()
                 return
               }
               else{
                this.setState({onProcess: false})
                Alert.alert(constants.failed, constants.fail_error)
                return
               }
            })
        }
    static navigationOptions = {
              title: 'Request Info',
              headerTitleStyle: { color: 'black', fontWeight: 'bold'},
              headerStyle: {backgroundColor: 'white'},
              headerTintColor: 'black'
          }
    render(){
        if(this.props.navigation.state.params.details !== null){
            console.log("age is the number", this.state.age)
        }
        let courseList=[]
        if(this.state.courseData !== null){
            for(let i=0;i<this.state.courseData.length; i++){
                data={
                    "name": this.state.courseData[i]["name"],
                    "id": this.state.courseData[i]["id"]
                }
                courseList.push(data)
            }
        }
        return(
            <Container style={{backgroundColor: 'white'}}>
                {this.state.courseData !== null ?
                <ScrollView showsVerticalScrollIndicator={false}>
                <Content style={{margin: 15}}>
                <Form>
                    <Item regular style={{padding: 5, marginTop: 15}}>
                        <Label>Name - </Label>
                          <Input value={this.state.name} editable={false} style={{fontWeight: 'bold', fontSize: 15, backgroundColor: '#f4f4f4'}}/>
                    </Item>

                    <Item regular style={{padding: 5, marginTop: 15}}>
                                            <Label>Phone number - </Label>
                                              <Input  value={this.state.personal_contact} editable={false} style={{fontWeight: 'bold', fontSize: 15, backgroundColor: '#f4f4f4'}}/>
                                        </Item>
                    <Item regular style={{padding: 5, marginTop: 15}}>
                                            <Label>Email - </Label>
                                              <Input value={this.state.email} editable={false} style={{fontWeight: 'bold', fontSize: 15, backgroundColor: '#f4f4f4'}}/>
                                        </Item>
                     <Item regular style={{padding: 5, marginTop: 15}}>
                                                                <Label>Age - </Label>
                                                                <View style={{backgroundColor: '#f4f4f4', width: '100%'}}>
                                                                  <Text editable={false} style={{fontWeight: 'bold', padding: 15, fontSize: 15}}>{this.state.age}</Text>
                                                                </View>
                                                            </Item>
                    <Item regular style={{padding: 5, marginTop: 15}}>
                                            <Label>Address - </Label>
                                              <Input value={this.state.address}  style={{fontWeight: 'bold', fontSize: 15, backgroundColor: '#f4f4f4'}}/>
                                        </Item>
                    <Item regular style={{padding: 5, marginTop: 15}}>
                                             <Label>Gender - </Label>
                                               <Input value={this.state.gender} editable={false} style={{fontWeight: 'bold', fontSize: 15, backgroundColor: '#f4f4f4'}}/>
                                         </Item>
                    <Item regular style={{padding: 5, marginTop: 15}}>
                                             <Label>Shift - </Label>
                                               <Input keyboardType="numeric" value={this.state.shift} style={{fontWeight: 'bold', fontSize: 15, backgroundColor: '#f4f4f4'}} onChangeText={text => this.setState({shift: text})}/>
                                         </Item>

                                         <View style={{marginTop: 15}}>
                                                     <Text>Contract Start Date</Text>
                                                     <DatePicker
                                                           date={this.state.contract_start}
                                                           onDateChange={date => {
                                                                    console.log(date)
                                                                    this.setState({contract_start: date})
                                                                    }}
                                                           mode = 'date'
                                                           textColor = '#3e4444'
                                                     />
                                                   </View>

                     <Item regular style={{padding: 5, marginTop: 15}}>

                                               <Input  placeholder="Certifications" value={this.state.certification} style={{fontWeight: 'bold', fontSize: 15, backgroundColor: '#f4f4f4'}}/>
                                         </Item>
                     <Item regular style={{padding: 5, marginTop: 15}}>

                                               <Input  placeholder="Emergency contact person" value={this.state.emergency_contact_name} style={{fontWeight: 'bold', fontSize: 15, backgroundColor: '#f4f4f4'}}/>
                                         </Item>
                    <Item regular style={{padding: 5, marginTop: 15}}>

                                              <Input  placeholder="Emergency contact number" value={this.state.emergency_contact} style={{fontWeight: 'bold', fontSize: 15, backgroundColor: '#f4f4f4'}}/>
                                        </Item>
                    <Item regular style={{padding: 5, marginTop: 15}}>

                                              <Input value={this.state.relation} placeholder="Relation with the person"  style={{fontWeight: 'bold', fontSize: 15, backgroundColor: '#f4f4f4'}}/>
                                        </Item>
                     </Form>
                    <View style={{ flexDirection: 'row'}}>
                        <View style={{flex: 1, margin: 25, justifyContent: 'center', alignItems: 'center'}}>
                            <Button style={{backgroundColor: '#c83349'}} onPress={this._cancel}><Text style={{color: 'white'}}>Reject</Text></Button>
                        </View>
                        {this.state.onProcess == false ?
                        <View style={{flex: 1, margin: 25, justifyContent: 'center', alignItems: 'center'}}>
                            <Button style={{backgroundColor: 'black'}}><Text style={{color: 'white'}} onPress={this.onApprove}>Approve</Text></Button>
                        </View> : <Spinner color="black" />}
                    </View>
                </Content>
                </ScrollView>: <View style={{justifyContent: 'center', alignItems: 'center'}}><Spinner color="black" /></View>}
            </Container>
        );
    }
}