import React, {Fragment,Component} from 'react';
import {TextInput, StyleSheet, Image, ScrollView, Alert, AsyncStorage} from 'react-native';
import { Button, Container, Content, View, Text, Thumbnail, Spinner, Input, Label} from 'native-base';
import constants from '../constants';
import PageLoader from './PageLoader';
export default class CourseInfo extends Component {
  constructor(props){
    super(props)
    this.state={
      editable: false,
      course_id: this.props.navigation.state.params.ID,
      gym_id: this.props.navigation.state.params.GYM_ID,
      loading: true,
      courseInfo: null,
      courseName: null,
      courseDescription: null,
      onProcess: false,
      courseDuration: null,
      saveProcess: false
    }
  }
  static navigationOptions = {
    title: 'Course Info',
    headerTitleStyle: { color: constants.header_text, fontWeight: 'bold'},
    headerStyle: {backgroundColor: constants.header},
    headerTintColor: constants.header_text
  }
  _editable = () => {
    this.setState({editable: true})
  }
  _cancel = () => {
    this.setState({editable: false})
  }

  _save = () => {
  }

  componentDidMount(){
    const { navigation } = this.props;
    this.focusListener = navigation.addListener('didFocus', () => {
                    var key  = this.retrieveItem('key').then(res =>
                    this.setState({auth_key: res}, () => console.log("brother pls", res))
                    ).then(() => this.fetchDetails())
            });
  }

  componentWillUnmount(){
    this.focusListener.remove();
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
  saveChange = () => {
    this.setState({saveProcess: true})
    console.log("on save call", this.state.courseName, this.state.courseDescription, this.state.courseDuration,this.state.gym_id,this.state.course_id)
    fetch(constants.API + 'current/admin/gyms/'+ this.state.gym_id + '/courses/' + this.state.course_id, {
        method: 'PUT',
        headers: {
                              'Accept': 'application/json',
                              'Content-Type': 'application/json',
                              'Authorization': this.state.auth_key,
        },
        body: JSON.stringify({
            "description": this.state.courseDescription,
            "duration": this.state.courseDuration,
            "name": this.state.courseName
        })
    })
    .then(res => {
        if(res.status === 401){
           this.props.navigation.navigate('LandingPage')
        }
        else if(res.status === 200){
            this._cancel()
                        this.setState({saveProcess: false})
                        Alert.alert(constants.success, 'Course was successfully updated.')
                        this.fetchDetails()
        }
        else{
            Alert.alert(constants.failed, constants.fail_error)
                                    this.setState({saveProcess: false})
        }

    })
  }


  fetchDetails = () => {
    fetch(constants.API + 'current/admin/gyms/'+this.state.gym_id+'/courses/'+this.state.course_id, {
       method: 'GET',
       headers: {
                      'Accept': 'application/json',
                      'Content-Type': 'application/json',
                      'Authorization': this.state.auth_key,
                    },
    }).then(res => {
        if(res.status === 200){
           return res.json()
        }
        else{
            Alert.alert('OOps!','Something went wrong. Please try later ...')
            return null
        }
    }).then( res => {
        if(res !== null){
            this.setState({courseInfo: res, courseDuration: res["duration"], courseDescription: res["description"], courseName: res["name"]})
        }
    })
  }

  _delete = (id) => {
    this.setState({onProcess: true})
    fetch(constants.API + 'current/admin/gyms/'+ this.state.gym_id + '/archive/coursetypes/'+this.state.course_id, {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': this.state.auth_key,
        }
    }).then(res => {
        this.setState({onProcess: false})
        if(res.status === 200){
            Alert.alert(constants.success, 'Successfully deleted the course')
            this.props.navigation.goBack()

        }
        else if(res.status === 401){
            this.props.navigation.navigate('LandingPage')
        }
        else{
            Alert.alert(constants.failed, constants.fail_error)
        }
    })
  }
  _deletealert = (id) => {
    Alert.alert(
                constants.warning,
                'Are you sure you want to delete?',
                [
                    {text: 'OK', onPress: () => this._delete(id)}
                ],
                {cancelable: false}
            )
  }
  render(){

    return(
    <Fragment>
       {this.state.courseInfo !== null ?
       <Container style={{backgroundColor: constants.screen_color}}>
         <ScrollView showHorizontalScrollbar={false}>
         { this.state.editable === false ? (this.state.onProcess === false ? <Content>
                           <View style={{justifyContent: 'space-between', flexDirection: 'row'}}>
                             <View style={{flex: 1, margin: 15}}>
                                 <Thumbnail large style={{backgroundColor: "black"}} />
                             </View>

                             <View style={{flex: 1, margin: 15}}>
                                <View style={{margin: 15}}>
                                    <Button block style={{backgroundColor: 'black'}} onPress={this._editable}><Text>Edit</Text></Button>
                                </View>
                             </View>
                           </View>
                         </Content>: <Spinner color="black" />) : null}
         <Content style={{padding: 15}}>
           <View style={{marginTop: 10}}>
             {this.state.editable === false ? <Text style={{textAlign: 'justify', fontWeight: 'bold', fontSize: 20}}>{this.state.courseInfo["name"]}</Text> :
             <View>
               <Label><Text>Name</Text> </Label>
               <TextInput  editable={this.state.editable} style={{textAlign: 'justify', fontWeight: 'bold', fontSize: 20, backgroundColor: 'white'}} placeholder="Name" onChangeText = {text => this.setState({courseName: text})}>{this.state.courseInfo["name"]}</TextInput>
             </View>}
           </View>
           <View style={{marginTop: 5}}>
              {this.state.editable === false ? <Text style={{textAlign: 'justify', fontWeight: 'bold', fontSize: 20}}><Label><Text>Duration - </Text></Label>{this.state.courseInfo["duration"]} days</Text> :
               <View>
                <Label><Text>Duration</Text></Label>
                <TextInput  editable={this.state.editable} onChangeText = {text => this.setState({courseDuration: parseInt(text)})} style={{textAlign: 'justify', fontSize: 20, backgroundColor: 'white'}} placeholder="Duration">{this.state.courseInfo["duration"]}</TextInput>
               </View>}
           </View>
           <View style={{marginTop: 10}}>
             { this.state.editable === false ? <Text selectable multiline={true}>{this.state.courseInfo["description"]}</Text> :
               <View>
                <Label><Text>Description</Text></Label>
                <TextInput multiline={true} style={{backgroundColor: 'white', width: '100%'}} placeholder="Description" onChangeText={text => this.setState({courseDescription: text})}>
                 {this.state.courseInfo["description"]}
                </TextInput>
              </View>}
           </View>
           {  this.state.editable ?
                <Content style={{marginTop: 15}}>
                    {this.state.saveProcess === false ? <Fragment><View>
                        <Button onPress={this.saveChange} style={{backgroundColor: 'black', justifyContent: 'center', alignItems: 'center'}}><Text>Save changes</Text></Button>
                    </View>
                    <View style={{marginTop: 10}}>
                        <Button onPress={this._cancel} style={{backgroundColor: 'black', justifyContent: 'center', alignItems: 'center'}}><Text>Cancel</Text></Button>
                    </View></Fragment> : <View style={{justifyContent: 'center', alignItems: 'center'}}><Spinner color="black" /></View>}
                </Content> : null
           }
         </Content>
         </ScrollView>
       </Container> : <PageLoader /> }
     </Fragment>
    );
}
}

const styles = StyleSheet.create({
  image: {
         width: '100%',
         height: undefined,
         aspectRatio: 1,
       },
  imageView: {
    height: 100,
    width: 100
  }

})
