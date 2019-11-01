import React, {Component, Fragment} from 'react';
import {Picker,View,TouchableOpacity,Dimensions,StyleSheet,Image, StatusBar} from 'react-native';
import {Header,Content,Container, Text,Button, Thumbnail, Spinner} from 'native-base';


export default class PageLoader extends Component{
    render(){
        return(
            <Content>
                <View style={{justifyContent: 'center', alignItems: 'center'}}>
                    <Spinner color="black"/>
                    <Text>fetching your data ...</Text>
                </View>
            </Content>
        );
    }
}