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
  AppState,
  AsyncStorage,
  Alert,
  View,
} from 'react-native';
import TrainerRequestInfo from './ClientRequestInfo';
import Icon from 'react-native-vector-icons/Ionicons';
import constants from '../constants';
import {Container, Accordion,Thumbnail, Card,List,ListItem, Spinner,Textarea, CheckBox, CardItem,Tab,Tabs, Header, Title, Content, Button, Left, Body, Text,Right} from 'native-base';

export default class ClientRequest extends Component {
    constructor(props){
        super(props)
        this.state={
            id: this.props.ID,
            auth_key: null,
            request: null
        }
    }
    static navigationOptions = {
              title: 'Client Request',
              headerTitleStyle: { color: 'black', fontWeight: 'bold'},
              headerStyle: {backgroundColor: '#eadea6'},
              headerTintColor: 'black'
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
//            this.focusListener = navigation.addListener('didFocus', () => {
                    var key  = this.retrieveItem('key').then(res =>
                    this.setState({auth_key: res}, () => console.log("brother pls", res))
                    ).then(() => this.fetchDetails())
//            });
        }
        componentWillUnmount() {
//            this.focusListener.remove();

          }
        _handleAppStateChange = (nextAppState) => {
              if (
                this.state.appState.match(/inactive|background/) &&
                nextAppState === 'active'
              ) {
                this.fetchDetails()
                console.log('App has come to the foreground!');
              }
              this.setState({appState: nextAppState});
            };
        fetchDetails = () => {
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
                 }
                 }).then(res => {
                 this.setState({request: res["trainees"]})
                 }).then(console.log("fetched the api data", this.state.request))
        }
    render(){
        return(
            <Container style={{backgroundColor: '#efe9cc'}}>
                <Content style={{padding: 15}}>
                    <List>
                        {this.state.request !== null ? this.state.request.map(req =>
                        <ListItem avatar onPress={() => this.props.navigation.navigate('ClientRequestInfo')}>
                            <Left>
                                <Thumbnail source={require('./profile.jpg')} style={{backgroundColor: 'black'}} />
                            </Left>
                            <Body>
                                <Text>{req["name"]}</Text>
                                <Text note>{req["age"]}</Text>
                            </Body>
                        </ListItem>) : (<View style={{justifyContent: 'center', alignItems: 'center'}}><Spinner color="black"/><Text>loading ....</Text></View>)}
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

  }
});