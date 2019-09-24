import React, { Component, Fragment } from 'react';
import {StyleSheet,View, TouchableOpacity, Modal, Alert} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import UpdateClient from './UpdateClient';
import ClientInfo from './ClientInfo';
import { Container, Header, Content, List, ListItem, Form, Left, Item, Input, Body,Button, Picker, Right, Thumbnail, Text } from 'native-base';
export default class Clients extends Component {
  static navigationOptions = {
    title: 'Clients',
    headerTitleStyle: { color: 'white'},
    headerStyle: {backgroundColor: 'black'},
    headerTintColor: 'white'
  }

  state = {
      modalVisible: false,
    };

    setModalVisible(visible) {
      this.setState({modalVisible: visible});
    }

  render() {
    return (
    <Fragment>
      <Container>

        <Content>
          <List>
            <ListItem avatar onPress={() => this.props.navigation.navigate('ClientInfo')}>
              <Left>
                <Thumbnail style={{backgroundColor: 'black'}} />
              </Left>
              <Body>
                <Text>Kumar Pratik</Text>
                <Text note>Doing what you like will always keep you happy . .</Text>
              </Body>
            </ListItem>
          </List>
        </Content>
        <View style={styles.addButton}>
                    <Button rounded style={{height: 50, width: 50, alignItems: 'center', backgroundColor: 'black', justifyContent: 'center'}} onPress={() => this.setModalVisible(true)}>
                      <Icon size={30} style={{color: 'white'}}name="md-add" />
                    </Button>
                  </View>
      </Container>

      <View style={{marginTop: 22}}>
        <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.modalVisible}
          onRequestClose={() => {
            this.setModalVisible(false)
          }}>
          <View style={{margin: 15}}>
            <TouchableOpacity onPress={() => this.setModalVisible(false)}>
            <Icon name="md-close" size={30}/>
            </TouchableOpacity>
      </View>
          <Content style={styles.content}>
            <Form>
               <Item style={styles.item}>
                  <Input placeholder="Name" />
               </Item>
               <Item style={styles.item}>
                  <Input placeholder="Phone number" />
               </Item>
               <Item style={styles.item}>
                  <Input placeholder="Email" />
               </Item>
               <Item style={styles.item}>
                 <Input placeholder="Password" />
               </Item>
               <Item style={styles.item}>
                 <Input placeholder="Age" />
               </Item>
               <Item style={styles.item}>
                  <Picker
                  note
                  mode="dropdown"
                  style={{ width: 120 }}

                  >
                  <Picker.Item label="Male" value="key0" />
                  <Picker.Item label="Female" value="key1" />
                  </Picker>
               </Item>
               <Item style={styles.item}>
                 <Input placeholder="Address" />
               </Item>

               <Item style={styles.item}>
                 <Picker
                               note
                               mode="dropdown"
                               style={{ width: 120 }}

                             >
                               <Picker.Item label="Karnataka" value="key0" />
                               <Picker.Item label="ATM Card" value="key1" />
                               <Picker.Item label="Debit Card" value="key2" />
                               <Picker.Item label="Credit Card" value="key3" />
                               <Picker.Item label="Net Banking" value="key4" />
                             </Picker>
               </Item>


               <Item style={styles.item}>
                <Picker
                              note
                              mode="dropdown"
                              style={{ width: 120 }}


                            >
                              <Picker.Item label="Bangalore" value="key0" />
                              <Picker.Item label="ATM Card" value="key1" />
                              <Picker.Item label="Debit Card" value="key2" />
                              <Picker.Item label="Credit Card" value="key3" />
                              <Picker.Item label="Net Banking" value="key4" />
                            </Picker>
               </Item>
               <Item style={styles.item}>
                   <Picker
                      note
                      mode="dropdown"
                      style={{ width: 120 }}


                    >
                    <Picker.Item label="Select course" value="key0" />
                    <Picker.Item label="ATM Card" value="key1" />
                    <Picker.Item label="Debit Card" value="key2" />
                    <Picker.Item label="Credit Card" value="key3" />
                    <Picker.Item label="Net Banking" value="key4" />
                   </Picker>
                </Item>
                <Item style={styles.item}>
                                   <Picker
                                      note
                                      mode="dropdown"
                                      style={{ width: 120 }}


                                    >
                                    <Picker.Item label="Select plan" value="key0" />
                                    <Picker.Item label="ATM Card" value="key1" />
                                    <Picker.Item label="Debit Card" value="key2" />
                                    <Picker.Item label="Credit Card" value="key3" />
                                    <Picker.Item label="Net Banking" value="key4" />
                                   </Picker>
                                </Item>
               <Item style={styles.item}>
                 <Input placeholder="Emergency contact person's name" />
               </Item>
               <Item style={styles.item}>
                 <Input placeholder="Phone number" />
               </Item>
               <View last style={{alignItems: 'center',justifyContent: 'center', margin: 15, }}>
               <Button rounded style={{backgroundColor: 'black'}}>
                 <Text>Submit</Text>
               </Button>
               </View>
            </Form>
          </Content>
        </Modal>
      </View>

     </Fragment>
    );
  }
}
const styles = StyleSheet.create({
  addButton: {
    position: 'absolute',
    right: 10,
    bottom: 10,
  },
  item: {
    margin: 15
  }
});