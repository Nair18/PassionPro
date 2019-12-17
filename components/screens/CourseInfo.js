import React, {Fragment,Component} from 'react';
import {TextInput, StyleSheet, Image, ScrollView, Alert, AsyncStorage} from 'react-native';
import { Button, Container, Content, View, Text, Thumbnail, Spinner, Input} from 'native-base';
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
      courseDuration: null,
      saveProcess: false
    }
  }
  static navigationOptions = {
    title: 'Course Info',
    headerTitleStyle: { color: 'black', fontWeight: 'bold'},
    headerStyle: {backgroundColor: '#eadea6'},
    headerTintColor: 'black'
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
        if(res.status !== 200){
            Alert.alert('OOps!!', "Something went wrong. Couldn't update ...")
            this.setState({saveProcess: false})
        }
        else{
            this._cancel()
            this.setState({saveProcess: false})
            Alert.alert('Success', 'Course was successfully updated.')
            this.fetchDetails()
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
  render(){

    return(
    <Fragment>
       {this.state.courseInfo !== null ?
       <Container style={{backgroundColor: '#efe9cc'}}>
         <ScrollView showHorizontalScrollbar={false}>
         { this.state.editable === false ? <Content>
                             <View style={styles.imageView}>
                                 <Thumbnail large style={{backgroundColor: "black"}} />
                             </View>
                         </Content> : null}
         <Content style={{padding: 15}}>
           <View>
             {this.state.editable === false ? <Text style={{textAlign: 'justify', fontWeight: 'bold', fontSize: 20}}>{this.state.courseInfo["name"]}</Text> :
             <TextInput  editable={this.state.editable} style={{textAlign: 'justify', fontWeight: 'bold', fontSize: 20, backgroundColor: 'white'}} placeholder="Name" onChangeText = {text => this.setState({courseName: text})}>{this.state.courseInfo["name"]}</TextInput>}
           </View>
           <View>
            {this.state.editable === false ? <Text style={{textAlign: 'justify', fontWeight: 'bold', fontSize: 20}}>Duration: {this.state.courseInfo["duration"]} days</Text> :
            <TextInput  editable={this.state.editable} onChangeText = {text => this.setState({courseDuration: parseInt(text)})} style={{textAlign: 'justify', fontSize: 20, backgroundColor: 'white'}} placeholder="Duration">{this.state.courseInfo["duration"]}</TextInput>}
           </View>
           <View style={{marginTop: 10, justifyContent: 'center', alignItems: 'center'}}>
             { this.state.editable === false ? <Text selectable multiline={true}>{this.state.courseInfo["description"]}</Text> :

             <TextInput multiline={true} style={{backgroundColor: 'white', width: '100%'}} placeholder="Description" onChangeText={text => this.setState({courseDescription: text})}>
                 {this.state.courseInfo["description"]}
             </TextInput>}
           </View>
           {  this.state.editable ?
                <Content style={{marginTop: 15}}>
                    {this.state.saveProcess === false ? <Fragment><View>
                        <Button onPress={this.saveChange} style={{backgroundColor: 'black', justifyContent: 'center', alignItems: 'center'}}><Text>Save changes</Text></Button>
                    </View>
                    <View style={{marginTop: 10}}>
                        <Button onPress={this._cancel} style={{backgroundColor: 'black', justifyContent: 'center', alignItems: 'center'}}><Text>Cancel</Text></Button>
                    </View></Fragment> : <View style={{justifyContent: 'center', alignItems: 'center'}}><Spinner color="black" /></View>}
                </Content> :
                <Content style={{marginTop: 15}}>
                    <View>
                        <Button onPress={this._editable} style={{backgroundColor: 'black', justifyContent: 'center', alignItems: 'center'}}><Text>Edit</Text></Button>
                    </View>
                </Content>
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
    width: 100,
    justifyContent: 'center',
    alignItems: 'center'
  }

})
