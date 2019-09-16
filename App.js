import React, { Component } from 'react';
//import react in our code.
//For react-navigation 3.0+
//import { createAppContainer, createStackNavigator } from 'react-navigation';
//For react-navigation 4.0+
import { createAppContainer } from 'react-navigation';
import { createStackNavigator} from 'react-navigation-stack';

import SecondLevelCustomer from './components/screens/second_level_customer';
import Workspace from './components/screens/workspace';
import StepForm from './components/screens/step_form';
//import all the screens we are going to switch
const App = createStackNavigator({
  //Constant which holds all the screens like index of any book
    StepForm: {screen: StepForm},
    SecondLevelCustomer: { screen: SecondLevelCustomer },
    //First entry by default be our first screen
    //if we do not define initialRouteName
    Workspace: { screen: Workspace },
  },
  {
    initialRouteName: 'StepForm',
  }
);
export default createAppContainer(App);