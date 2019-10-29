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
  Dimensions,
  View,
} from 'react-native';
import {Container, Content, Button, Text, Item, Input, List, ListItem, Right, Left,Picker, Form} from 'native-base';

export default class PassKey extends Component{
    constructor(props) {
        super(props);
        this.state = {
          selected: "key0"
        };
      }
      onValueChange(value: string) {
        this.setState({
          selected: value
        });
      }

    render(){
        return(
            <Container>
                <Content>
                    <Form style={{justifyContent: 'center', alignItems: 'center'}}>
                                <Picker
                                  note
                                  mode="dropdown"
                                  style={{ width: 120 }}
                                  selectedValue={this.state.selected}
                                  onValueChange={this.onValueChange.bind(this)}
                                  placeholder="Select one"
                                >
                                  <Picker.Item label="Select one" value="key0" />
                                  <Picker.Item label="Trainer" value="key1" />
                                  <Picker.Item label="Client" value="key2" />
                                </Picker>
                              </Form>
                    <View style={{margin: 15}}>
                        <Button style={{backgroundColor: 'black', justifyContent: 'center', alignItems: 'center'}}>
                            <Text style={{color: 'white'}}>
                                Generate Passkey
                            </Text>
                        </Button>
                    </View>
                    <View style={{margin: 15, justifyContent: 'center', alignItems: 'center'}}>
                        <Text selectable>QWERTY123</Text>
                    </View>
                </Content>
            </Container>
        );
    }
}