import React, {Fragment,Component} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TouchableNativeFeedback,
  StatusBar,
  Modal,
  AppState,
  AsyncStorage,
  Alert,
  TouchableHighlight,
  View,
} from 'react-native';
import constants from '../constants';
import TrainerRequestInfo from './TrainerRequestInfo';
import Icon from 'react-native-vector-icons/Ionicons';
import {Container, Accordion,Thumbnail, Card,List,ListItem, Spinner,Textarea, CheckBox, CardItem,Tab,Tabs, Header, Title, Content, Button, Left, Body, Text,Right} from 'native-base';

export default class TrainerRequest extends Component {
    constructor(props){
        super(props)
        this.state={
            id: this.props.ID,
            auth_key: null,
            request: null

        }
    }
    static navigationOptions = {
              title: 'Trainer Request',
              headerTitleStyle: { color: constants.header_text, fontWeight: 'bold'},
              headerStyle: {backgroundColor: constants.header},
              headerTintColor: constants.header_text
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
        componentWillUnmount(){
            this.focusListener.remove();

        }
        componentDidMount(){
          StatusBar.setHidden(false);
          const { navigation } = this.props;
                console.log("pagal bana rhe hai")
                var key  = this.retrieveItem('key').then(res =>
                                                this.setState({auth_key: res}, () => console.log("brother pls", res))
                ).then(() => this.fetchDetails())
                this.focusListener = navigation.addListener('didFocus', () => {
                  console.log("focusing admin screen")
//                   hack
                  this.fetchDetails();
                });



        }

        fetchDetails = () => {
            console.log("fetch")
            fetch(constants.API + 'current/admin/gyms/'+ this.state.id + '/requests',{
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
                    return null
                 }
                 }).then(res => {
                 if(res !== null){
                    this.setState({request: res["trainers"] })
                 }
                 }).then(console.log("fetched the api data", this.state.request))
        }
    render(){
        return(
            <Container style={{backgroundColor: constants.screen_color}}>
                <Content style={{padding: 15}}>
                    <List>
                        {this.state.request !== null ? this.state.request.map(req =>
                        <TouchableOpacity activeOpacity={1} onPress={() => this.props.navigation.navigate('TrainerRequestInfo', {details: req, ID: this.state.id})}>
                        <Card styles={styles.items}>
                            <View style={{flex: 1, padding: 5}}>
                               <Thumbnail source={require('./profile.jpg')} style={{backgroundColor: 'black'}} />
                            </View>
                            <View style={{flex: 4, padding: 5}}>
                                <View>
                                    <Text style={{fontWeight: 'bold'}}>{req["name"]}</Text>
                                    <Text note>Mobile - {req["phone"]}</Text>
                                </View>
                            </View>
                        </Card></TouchableOpacity>) : (<View style={{justifyContent: 'center', alignItems: 'center'}}><Spinner color="black"/><Text>loading ....</Text></View>)}
                    </List>

                </Content>
               <View style={styles.addButton}>
                                       <Button rounded style={{height: 50, width: 50, alignItems: 'center', backgroundColor: 'black', justifyContent: 'center'}} onPress={this.fetchDetails}>
                                            <Icon size={30} style={{color: 'white'}}name="md-refresh-circle" />
                                       </Button>
                                    </View>
            </Container>
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
        }
});