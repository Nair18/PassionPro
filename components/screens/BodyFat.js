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
  Dimensions,
  View,
} from 'react-native';
import Workspace from './workspace';
import Courses from './Courses';
import Clients from './Clients';
import Plans from './Plans';
import Trainer from './Trainer';
import {Agenda} from 'react-native-calendars';
import Icon from 'react-native-vector-icons/Ionicons';
import {Container, Content, Button, Text, Item, Input} from 'native-base';
import {BarChart} from 'react-native-chart-kit';

export default class BodyWeight extends Component {
    static navigationOptions = {
          title: 'Fat % Tracker',
          headerTitleStyle: { color: 'white'},
          headerStyle: {backgroundColor: 'black'},
          headerTintColor: 'white'
      }
    render(){
        let chartConfig = {
          backgroundGradientFrom: 'grey',
          backgroundGradientFromOpacity: 0,
          backgroundGradientTo: 'grey',
          backgroundGradientToOpacity: 0.1,
          color: (opacity = 0.1) => `rgba(0, 0, 0, ${opacity})`,
          strokeWidth: 2,
          barPercentage:0.5
        }
        let data = {
          labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep','Oct', 'Nov', 'Dec'],
          datasets: [{
            data: [30, 29, 27, 25, 24, 22, 21, 20, 20, 20, 20, 20],
          }]
        }
        let screenWidth = Dimensions.get('window').width
        return(
            <Container style={{margin: 15}}>
                <Content>
                    <View style={{marginTop: 25}}>
                      <Item regular>
                        <Input keyboardType="numeric" placeholder="enter your fat %" />
                      </Item>
                    </View>
                    <View style={{marginTop: 25, justifyContent: 'center', alignItems: 'center'}}>
                        <Button block style={{backgroundColor: 'black'}}><Text style={{color: 'white'}}>Add</Text></Button>
                    </View>
                    <View style={{justifyContent: 'center', alignItems: 'center', marginTop: 25}}>
                        <Text style={{fontWeight: 'bold'}}>Chart</Text>
                    </View>
                    <View style={{marginTop: 10}}>
                        <BarChart

                          data={data}
                          width={screenWidth}
                          height={220}
                          yAxisLabel={'%'}
                          chartConfig={chartConfig}
                          verticalLabelRotation={30}
                        />
                    </View>
                </Content>
            </Container>
        );
    }
}