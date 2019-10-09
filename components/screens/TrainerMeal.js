import React, {Fragment,Component} from 'react';
import Uploader from './Uploader';
import {
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TouchableNativeFeedback,
  StatusBar,
  Modal,
  TouchableHighlight,
  View,
} from 'react-native';
import Workspace from './workspace';
import Courses from './Courses';
import Clients from './Clients';
import Plans from './Plans';
import Trainer from './Trainer';
import {Agenda} from 'react-native-calendars';
import Icon from 'react-native-vector-icons/Ionicons';
import {Calendar} from 'react-native-calendars';
import CreateWorkout from './CreateWorkout';
import {Container, Accordion,Thumbnail, Card,List, ListItem, Textarea, Item, CheckBox, CardItem,Tab,Tabs, Header, Title, Content, Button, Left, Body, Text,Right} from 'native-base';

export default class TrainerMeal extends Component {
    constructor(props){
        super(props)
        this.state={
          isVisible: false
        }
    }
    static navigationOptions = {
                title: 'Meals',
                headerTitleStyle: { color: 'black', fontWeight: 'bold'},
                headerStyle: {backgroundColor: 'white', elevation: 0},
                headerTintColor: 'black'
              }
    showModal = () => {
        this.props.navigation.navigate('CreateMeal');
    }

    selectExercise = (index) => {
        console.log("index", index)

        this.setState({isVisible: false})
    }
    render(){
        let exercise = ['Triceps', 'Chest', 'Shoulders', 'Biceps', 'Core', 'Back', 'Forearms', 'Upper Legs', 'Glutes', 'Cardio', 'Calves']
        return(
            <Container>
                <ScrollView>
                <Content style={{margin: 15}}>
                    <View>
                        <Card>
                           <CardItem header>
                              <Text style={{fontWeight: 'bold'}}>Meal 1</Text>
                           </CardItem>
                           <CardItem style={{flexDirection: 'row'}}>
                              <Textarea>Black bean + lentil chili with skillet corn bread</Textarea>
                           </CardItem>
                        </Card>
                    </View>
                    <View style={{justifyContent: 'center', alignItems: 'center', margin: 25}}>
                        <Button onPress={this.showModal} style={{backgroundColor: 'black'}}><Text style={{color: 'white'}}>Add Meal</Text></Button>
                    </View>
                </Content>
                </ScrollView>
            </Container>
        );
    }
}