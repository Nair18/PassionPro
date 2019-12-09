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
  AsyncStorage,
  TouchableHighlight,
  TextInput,
  View,
} from 'react-native';
import ModalSelector from 'react-native-modal-selector';
import Icon from 'react-native-vector-icons/Ionicons';
import DatePicker from 'react-native-datepicker';
import constants from '../constants';
import {Container, Accordion,Thumbnail, Card,ListItem, Textarea, Spinner, Picker, CheckBox, CardItem, Header, Title, Content, Button, Left, Body, Text,Right, Form, Item, Label, Input} from 'native-base';

export default class ClientRequestInfo extends Component {
    constructor(props){
        super(props);
        date = new Date();
        this.state = {
            id: this.props.navigation.state.params.ID,
            auth_key: null,
            request_id: this.props.navigation.state.params.details['request_id'],
            name: this.props.navigation.state.params.details['name'],
            personal_contact: this.props.navigation.state.params.details['phone'],
            email: this.props.navigation.state.params.details['email'],
            age: this.props.navigation.state.params.details['age'],
            onProcess: false,
            start_date: date.getFullYear() + "-" + (date.getMonth()+1) + "-" + (date.getDate() > 9 ? date.getDate() : "0" + date.getDate()),
            end_date: date.getFullYear() + "-" + ((date.getMonth()+1) > 9 ? (date.getMonth()+1) : "0" + (date.getMonth()+1)) + "-" + (date.getDate() > 9 ? date.getDate() : "0" + date.getDate()),
            address: this.props.navigation.state.params.details['address'],
            gender: this.props.navigation.state.params.details['gender'],
            emergency_contact_name: this.props.navigation.state.params.details['emergency_person'],
            emergency_contact: this.props.navigation.state.params.details['emergency_phone'],
            relation: this.props.navigation.state.params.details['relation_with_person'],
            certification: this.props.navigation.state.params.details['certifications'],
            cancel: false
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
//                fetch(constants.API + 'current/admin/gyms/'+ this.state.id + '/courses/',{
//                 method: 'GET',
//                    headers: {
//                       'Accept': 'application/json',
//                       'Content-Type': 'application/json',
//                       'Authorization': this.state.auth_key,
//                     },
//                }).then(response => {
//                    if (response.status === 200) {
//                        return response.json();
//                     } else {
//                        this.setState({loading: false})
//                        Alert.alert(
//                            constants.failed,
//                            'Something went wrong',
//                        [
//                            {text: 'OK', onPress: () => console.log('OK Pressed')},
//                        ],
//                        {cancelable: false},
//                        );
//                     }
//                     }).then(res => {
//                     this.setState({courseData: res["courses"]})
//                     }).then(console.log("fetched the api data", this.state.courseData))
    }

    componentWillUnmount() {
//       this.focusListener.remove();
    }

    static navigationOptions = {
              title: 'Request Info',
              headerTitleStyle: { color: 'black', fontWeight: 'bold'},
              headerStyle: {backgroundColor: 'white'},
              headerTintColor: 'black'
          }
    onApprove = () => {
        console.log(this.state)

        if(this.state.cancel === false && (this.state.amount == null || this.state.start_date == null || this.state.end_date == null)){
            Alert.alert('Incomplete Info', 'All * fields are mandatory')
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
                  "amount": this.state.amount ? this.state.amount : 0,
                  "start_date": this.state.start_date,
                  "end_date": this.state.end_date,
                  "to_reject": this.state.cancel
            })
        }).then(res => {
           this.setState({onProcess: false})
           if(res.status == 200){
             Alert.alert(constants.success, 'Successfully added the client')
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
    _cancel = () => {
        this.setState({cancel: true}, () => this.onApprove())
    }
    render(){
        let courseList=[]

        return(
            <Container style={{backgroundColor: 'white'}}>
            {this.state.name !== null && this.state.auth_key !== null ?
            <ScrollView showsVerticalScrollIndicator={false}>
                <Content style={{marginLeft: 15, marginRight: 15}}>

                <Form>
                    <Item regular style={{marginTop: 15, padding: 5}}>
                        <Label>Name - </Label>
                          <Input editable= {false} value={this.state.name} style={{fontWeight: 'bold', fontSize: 15}}/>
                    </Item>
                    <Item regular style={{marginTop: 15, padding: 5}}>
                                            <Label>Phone number - </Label>
                                              <Input editable={false} value={this.state.personal_contact} style={{fontWeight: 'bold', fontSize: 15}}/>
                                        </Item>
                    <Item regular style={{marginTop: 15, padding: 5}}>
                                            <Label>Email - </Label>
                                              <Input editable={false} value={this.state.email} style={{fontWeight: 'bold', fontSize: 15}}/>
                                        </Item>
                    <Item regular style={{marginTop: 15, padding: 5}}>
                                            <Label>Age - </Label>
                                              <Input editable={false} value={this.state.age} style={{fontWeight: 'bold', fontSize: 15}}/>
                                        </Item>
                    <Item regular style={{marginTop: 15, padding: 5}}>
                                            <Label>Address - </Label>
                                              <Input editable={false} value={this.state.address} style={{fontWeight: 'bold', fontSize: 15}}/>
                                        </Item>
                    <View style={{marginTop: 15}}>
                                                                         <Text>Membership Start Date<Text style={{color: 'red'}}> *</Text></Text>
                                                                             <DatePicker
                                                                                   date={this.state.start_date}
                                                                                   onDateChange={date => this.setState({ start_date: date })}

                                                                                   mode = 'date'
                                                                                   textColor = '#3e4444'
                                                                             />
                                                             </View>
                    <View style={{marginTop: 15}}>
                                                                         <Text>Membership End Date<Text style={{color: 'red'}}> *</Text></Text>
                                                                             <DatePicker
                                                                                   date={this.state.end_date}
                                                                                   onDateChange={date => this.setState({ end_date: date })}

                                                                                   mode = 'date'
                                                                                   textColor = '#3e4444'
                                                                             />
                                                             </View>

                    <Item regular style={{marginTop: 15, padding: 5}}>
                                            <Label>Amount Paid <Text style={{color: 'red'}}>* </Text>- </Label>
                                              <Input keyboardType='numeric' value={this.state.amountPaid} onChangeText={text => this.setState({amount: parseInt(text)})}/>
                                        </Item>
                    <Item regular style={{marginTop: 15, padding: 5}}>
                                             <Label>Gender - </Label>
                                               <Input editable={false} value={this.state.gender} style={{fontWeight: 'bold', fontSize: 15}}/>
                                         </Item>


                    <Item regular style={{marginTop: 15, padding: 5}}>
                                             <Label>Emergency contact person - </Label>
                                               <Input editable={false} value={this.state.emergency_contact_name} style={{fontWeight: 'bold', fontSize: 15}}/>
                                         </Item>
                    <Item regular style={{marginTop: 15, padding: 5}}>
                                            <Label>Emergency contact number - </Label>
                                              <Input editable={false} value={this.state.emergency_contact} style={{fontWeight: 'bold', fontSize: 15}}/>
                                        </Item>
                    <Item regular style={{marginTop: 15, padding: 5}}>
                                            <Label>Relation with the person - </Label>
                                              <Input editable={false} value={this.state.relation} style={{fontWeight: 'bold', fontSize: 15}}/>
                                        </Item>
                     </Form>
                     { this.state.onProcess == false ?
                    <View style={{ flexDirection: 'row'}}>

                        <View style={{flex: 1, margin: 25, justifyContent: 'center', alignItems: 'center'}}>
                            <Button style={{backgroundColor: '#c83349'}} onPress={this._cancel}><Text style={{color: 'white'}}>Cancel</Text></Button>
                        </View>

                        <View style={{flex: 1, margin: 25, justifyContent: 'center', alignItems: 'center'}}>
                            <Button style={{backgroundColor: 'black'}} onPress={this.onApprove}><Text style={{color: 'white'}}>Approve</Text></Button>
                        </View>
                    </View>: <Spinner color="black"/>}

                </Content>
                </ScrollView> : <View style={{justifyContent: 'center', alignItems: 'center'}}><Spinner color="black"/></View>}
            </Container>
        );
    }
}