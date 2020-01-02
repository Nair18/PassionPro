import React, {Fragment,Component} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  FlatList,
  Modal,
  TextInput,
  View,ImageBackground,
  AppState,
  Alert,
  Picker,
  AsyncStorage,
} from 'react-native';

import moment from 'moment';
import type Moment from 'moment';
import { Calendar} from 'react-native-calendars';
import ModalSelector from 'react-native-modal-selector';
import constants from '../constants';
import Icon from 'react-native-vector-icons/Ionicons';
import {Container, Accordion,Thumbnail, List, Card,ListItem, Textarea,Item, Form,Spinner, Label, Input, CheckBox, CardItem, Header, Title, Content, Button, Left, Body, Text,Right} from 'native-base';
let calendarDate = moment();
export default class WorkoutProgress extends Component{
    constructor(props) {
        super(props);
        let date = new Date()
        this.state = {
          calendarDate: calendarDate.format('YYYY-MM-DD'),
          horizontal: true,
          modalVisible: false,
          logs: null,
          partId: null,
          partName: null,
          duration: 0,
          reps: 0,
          weight: 0,
          sets: 0,
          exerciseId: null,
          exerciseName: '',
          start_date: moment().subtract('months', 1).format('YYYY-MM-DD'),
          end_date: moment().format("YYYY-MM-DD"),
          exerciseList: null,
          onProcess: false
        };

        this.onPressArrowLeft = this.onPressArrowLeft.bind(this);
        this.onPressArrowRight = this.onPressArrowRight.bind(this);


        this.onDayPress = this.onDayPress.bind(this);
      }
      static navigationOptions = {
                title: 'Activity Calendar',
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

      componentDidMount(){
         StatusBar.setHidden(false);
         console.log("bros in didmount")
         const { navigation } = this.props;
         console.log("pagal bana rhe hai")
       this.focusListener = navigation.addListener('didFocus', () => {
         var key  = this.retrieveItem('key').then(res =>
             this.setState({auth_key: res}, () => console.log("brother pls", res))
             ).then(() => this.fetchDetails())
       });
      }

      componentWillUnmount(){
        this.focusListener.remove()
      }

      fetchDetails = () => {
         fetch(constants.API + 'current/trainee/sets?end=' + this.state.end_date + '&start=' + this.state.start_date,{
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
                               Alert.alert(
                                   constants.failed,
                                   constants.fail_error,
                               [
                                   {text: 'OK', onPress: () => console.log('OK Pressed')},
                               ],
                               {cancelable: false},
                               );
                            }
                            }).then(res => {
                            this.setState({logs: res["logs"].reverse()}, () => console.log("fetched yayyy!!"))
                            }).then( () =>
                                fetch(constants.API + 'current/trainee/exercises', {
                                              method: 'GET',
                                              headers: {
                                                  'Accept': 'application/json',
                                                  'Content-Type': 'application/json',
                                                  'Authorization': this.state.auth_key,
                                              }
                                })
                                .then(
                                    res => {
                                       if(res.status === 200){
                                          return res.json()
                                       }
                                       else{
                                          this.setState({loading: false})
                                          Alert.alert(
                                            constants.failed,
                                            constants.fail_error,
                                            [
                                             {text: 'OK', onPress: () => console.log('OK Pressed')},
                                            ],
                                            {cancelable: false},
                                          );
                                       }
                                    }
                                ).then(res => this.setState({exerciseList: res}, () => console.log(res)))

             )
      }
    onSubmit = () => {
        if(this.state.partName === null || this.state.exerciseName === null){
            Alert.alert(constants.incomplete_info, 'All * fields are important')
            return
        }
        this.setState({onProcess: true})
        fetch(constants.API + 'current/trainee/sets', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': this.state.auth_key,
            },
            body: JSON.stringify({
                                   "duration": parseInt(this.state.duration),
                                   "exercise": parseInt(this.state.exerciseId),
                                   "reps": parseInt(this.state.reps),
                                   "weight": parseInt(this.state.weight),
                                   "sets": parseInt(this.state.sets),
                                   "date": this.state.calendarDate
                                 })
            }).then(res => {
            this.setState({onProcess: false, modalVisible: false}, () => this.fetchDetails())
            if(res.status === 200){
                Alert.alert(constants.success, 'Successfully logged your workout')
                this.fetchDetails()
            }
            else if(res.status === 401){
                this.setModalVisible(false)
                this.props.navigation.navigate('LandingPage')
                return
            }
            else{
                Alert.alert(constants.failed, constants.fail_error)
                return
            }
        })
    }

    setModalVisible = (bool) => {
            this.setState({modalVisible: bool})
        }
    onPressArrowLeft() {
        calendarDate = calendarDate.add(-1, 'month');
        this.updateCalendarDate();
      }

    onPressArrowRight() {
        calendarDate = calendarDate.add(1, 'month');
        this.updateCalendarDate();
      }

    onDayPress(date) {
        calendarDate = moment(date.dateString);
        console.log("date pressed", date.dateString)
        if(calendarDate.format("YYYY-MM-DD") < this.state.start_date){
            this.setState({start_date: calendarDate.format("YYYY-MM-DD")}, () => {
            console.log("fetch being called")
            this.fetchDetails})
        }
        else if(calendarDate.format("YYYY-MM-DD") > this.state.end_date){
            this.setState({end_date: calendarDate.format("YYYY-MM-DD")}, () => {
            console.log("fetch being called")
            this.fetchDetails})
        }
        this.updateCalendarDate();
      }

      updateCalendarDate() {
        this.setState({
          calendarDate: calendarDate.format('YYYY-MM-DD')
        });
      }
    strMapToJson = (strMap) => {
      return JSON.stringify(strMapToObj(strMap));
    }

    render(){
        console.log("end date", this.state.end_date)
        let body_part = []
        if(this.state.exerciseList !== null){
          for (var key in this.state.exerciseList) {
             let data = {
                "id": key,
                "exercise_name": key
             }
             body_part.push(data)
          }
        }
        console.log("body parts fetched", body_part)
        console.log("date", this.state.calendarDate)

        let d = new Map()
        let logs = new Map()
        if(this.state.logs !== null){
          for(let i=0; i<this.state.logs.length; i++){
             let dt = this.state.logs[i]["date"].split("T")[0]
             let arr = []
             if(logs.has(dt)){
                arr = logs.get(dt)
             }
             arr.push(this.state.logs[i])
             logs.set(dt, arr)
             d.set((this.state.logs[i]["date"].split("T")[0]).toString(), {selected: false, marked: true, selectedColor: 'green'})
          }
          d.set([this.state.calendarDate], {selected: true, disableTouchEvent: true, selectedDotColor: 'orange'})

        }
        let dates = Object.create(null);
        for (let [k,v] of d) {
            // We don’t escape the key '__proto__'
            // which can cause problems on older engines
           dates[k] = v;
        }

        console.log("marked dates loading", dates)
        return(
            <Container style={{backgroundColor: constants.screen_color}}>
               { this.state.logs !== null ?
               <Content>
                    <View>
                            <Calendar
                              current={this.state.calendarDate}
                              headerData={{
                                calendarDate: calendarDate.format('DD MMM, YYYY')
                              }}
                              style={{
                                paddingLeft: 0, paddingRight: 0
                              }}
                              onPressArrowLeft={this.onPressArrowLeft}
                              onPressArrowRight={this.onPressArrowRight}
                              markedDates={dates}
                              onDayPress={this.onDayPress}
                              onMonthChange={console.log("month changed")}
                              theme={{
                                  backgroundColor: '#ffffff',
                                  calendarBackground: '#ffffff',
                                  textSectionTitleColor: '#b6c1cd',
                                  selectedDayBackgroundColor: 'green',
                                  selectedDayTextColor: 'white',
                                  todayTextColor: '#00adf5',
                                  dayTextColor: '#2d4150',
                                  textDisabledColor: '#d9e1e8',
                                  dotColor: '#00adf5',
                                  selectedDotColor: '#ffffff',
                                  arrowColor: 'orange',
                                  monthTextColor: 'blue',
                                  indicatorColor: 'blue',
                                  textDayFontFamily: 'monospace',
                                  textMonthFontFamily: 'monospace',
                                  textDayHeaderFontFamily: 'monospace',
                                  textDayFontWeight: '300',
                                  textMonthFontWeight: 'bold',
                                  textDayHeaderFontWeight: '300',
                                  textDayFontSize: 16,
                                  textMonthFontSize: 16,
                                  textDayHeaderFontSize: 16
                                }}
                            />
                    </View>
                    <View style={{justifyContent: 'center', alignItems: 'center', marginTop: 10}}>
                        <Text style={{fontWeight: 'bold', fontSize: 20}}>Workouts</Text>
                    </View>
                    <View>
                       {this.state.logs !== null && logs.has(this.state.calendarDate)  ? logs.get(this.state.calendarDate).map(log =>
                       <View style={{margin: 10}}>
                          <Card>
                             <CardItem header style={{backgroundColor: constants.card_header}}>
                                <Text style={{fontWeight: 'bold'}}>{log["exercise"]}</Text>
                             </CardItem>
                             <CardItem style={{backgroundColor: constants.card_body}}>
                               <View style={{flexDirection: 'row', justifyContent: 'space-between', marginTop: 10}}>
                                  <Text style={{fontWeight: 'bold', flex: 1, fontSize: 15}}>Sets</Text>
                                  <Text style={{fontWeight: 'bold', flex: 1, fontSize: 15}}>Weights</Text>
                                  <Text style={{fontWeight: 'bold', flex: 1, fontSize: 15}}>Reps</Text>
                                  <Text style={{fontWeight: 'bold', flex: 1, fontSize: 15}}>Duration</Text>
                               </View>
                             </CardItem>

                             <CardItem style={{backgroundColor: constants.card_body}}>
                               <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                                  <View style={{flex: 1}}>
                                     <Text>{log["sets"]}</Text>
                                  </View>
                                  <View style={{flex: 1}}>
                                     <Text>{log["weight"]}kg</Text>
                                  </View>
                                  <View style={{flex: 1}}>
                                     <Text>{log["reps"]}</Text>
                                  </View>
                                  <View style={{flex: 1}}>
                                     <Text>{log["duration"]}min</Text>
                                  </View>
                               </View>
                             </CardItem>
                          </Card>
                       </View>) : <View style={{marginTop: 15}}><Card style={{backgroundColor: constants.header, justifyContent: 'center', alignItems: 'center', padding: 10}}><Text note>Nothing to show</Text></Card></View>}
                    </View>
               </Content> : <View style={{justifyContent: 'center', alignItems: 'center'}}><Spinner color="black" /></View> }
               <View style={styles.addButton}>
                                   <Button rounded style={{height: 50, width: 50, alignItems: 'center', backgroundColor: 'black', justifyContent: 'center'}} onPress={() => this.setModalVisible(true)}>
                                     <Icon size={30} style={{color: 'white'}}name="md-add" />
                                   </Button>
                                 </View>
               <Modal
                         animationType="slide"
                         transparent={false}
                         visible={this.state.modalVisible}
                         onRequestClose={() => {
                           this.setModalVisible(false)
                         }}>
                     <View style={{justifyContent: 'space-around', flexDirection: 'row'}}>
                         <View style={{marginLeft: 15,marginTop: 15, flex: 1}}>
                           <TouchableOpacity onPress={() => this.setModalVisible(false)}>
                           <Icon name="md-close" size={30}/>
                           </TouchableOpacity>
                         </View>
                         <View style={{flex: 2, marginTop: 15}}>
                            <Text style={{fontWeight: 'bold', fontSize: 20}}>Add progress</Text>
                         </View>
                     </View>
                         <Content style={styles.content}>

                           {this.state.logs !== null && this.state.exerciseList !== null ?
                           (<Form>
                              <View style={{margin: 15}}>
                                      <Label><Text style={{fontWeight: 'bold'}}>Body part</Text><Text style={{color: 'red'}}>*</Text></Label>
                                      <ModalSelector
                                          placeholder="Select the body part"
                                          initValue={this.state.partName}
                                          data={body_part}
                                          keyExtractor= {item => item.id}
                                          labelExtractor= {item => item.exercise_name}
                                          initValue={this.state.partName}
                                          supportedOrientations={['landscape']}
                                          accessible={true}
                                          scrollViewAccessibilityLabel={'Scrollable options'}
                                          cancelButtonAccessibilityLabel={'Cancel Button'}
                                          onChange={(option)=>{
                                           this.setState({partId: option.id, partName: option.exercise_name})
                                          }}>

                                          <TextInput
                                            style={{borderWidth:1, borderColor:'#ccc', color: 'black',padding:10, height:50}}
                                            editable={false}
                                            placeholder="Select the body part"
                                            value={this.state.partName}
                                          />
                                        </ModalSelector>
                              </View>
                              <View style={{margin: 15}}>
                                                                    <Label><Text style={{fontWeight: 'bold'}}>Exercise</Text><Text style={{color: 'red'}}></Text></Label>
                                                                    <ModalSelector
                                                                        placeholder="Select the exercise"
                                                                        initValue={this.state.exerciseName}
                                                                        data={this.state.exerciseList[this.state.partName]}
                                                                        keyExtractor= {item => item.id}
                                                                        labelExtractor= {item => item.exercise_name}
                                                                        initValue={this.state.exerciseName}
                                                                        supportedOrientations={['landscape']}
                                                                        accessible={true}
                                                                        scrollViewAccessibilityLabel={'Scrollable options'}
                                                                        cancelButtonAccessibilityLabel={'Cancel Button'}
                                                                        onChange={(option)=>{
                                                                         this.setState({exerciseId: option.id, exerciseName: option.exercise_name})
                                                                        }}>

                                                                        <TextInput
                                                                          style={{borderWidth:1, borderColor:'#ccc', color: 'black',padding:10, height:50}}
                                                                          editable={false}
                                                                          placeholder="Select the exercise"
                                                                          value={this.state.exerciseName}
                                                                        />
                                                                      </ModalSelector>
                                                            </View>
                              <View style={{margin: 15}}>

                                <Item>
                                 <Input placeholder="sets" keyboardType="numeric" onChangeText={(text) => this.setState({sets: text})}/>
                                </Item>
                              </View>
                              <View style={{margin: 15}}>
                                <Item>
                                    <Input placeholder="reps" keyboardType="numeric" onChangeText={(text) => this.setState({reps: text})}/>
                                </Item>
                              </View>
                              <View style={{margin: 15}}>
                                <Item>
                                    <Input placeholder="weights(Kg)" keyboardType="numeric" onChangeText={(text) => this.setState({weight: text})}/>
                                </Item>
                              </View>
                              <View style={{margin: 15}}>
                              <Item>
                                 <Input placeholder="duration(min)" keyboardType="numeric" onChangeText={(text) => this.setState({duration: text})}/>
                              </Item>
                              </View>
                              <View last style={{alignItems: 'center',justifyContent: 'center', marginTop: 15}}>
                              {this.state.onProcess === false ?
                              <Button onPress={this.onSubmit} style={{backgroundColor: 'black'}}>
                                <Text>Add progress</Text>
                              </Button> : <Spinner color="black"/>}
                              </View>
                           </Form>) : <View style={{justifyContent: 'center', alignItems: 'center'}}><Text>loading ...</Text></View>}

                         </Content>
                       </Modal>
            </Container>

        );
    }
}

const styles = StyleSheet.create({
  content: {
    marginTop: 20
  },
  addButton: {
    position: 'absolute',
    right: 30,
    bottom: 30,
  },
  content: {

  }
});