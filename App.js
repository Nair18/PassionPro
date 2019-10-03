import React, { Component } from 'react';
//import react in our code.
//For react-navigation 3.0+
//import { createAppContainer, createStackNavigator } from 'react-navigation';
//For react-navigation 4.0+
import { createAppContainer } from 'react-navigation';
import { createStackNavigator} from 'react-navigation-stack';
import Clients from './components/screens/Clients';
import SLCProfile from './components/screens/second_level_customer_profile';
import SecondLevelCustomer from './components/screens/second_level_customer';
import Workspace from './components/screens/workspace';
import Courses from './components/screens/Courses';
import Plans from './components/screens/Plans';
import CreateStandardPlan from './components/screens/CreateStandardPlan'
import TrainerPage from './components/screens/TrainerPage';
import StepForm from './components/screens/step_form';
import LandingPage from './components/screens/LandingPage';
import CourseInfo from './components/screens/CourseInfo';
import Admin from './components/screens/Admin';
import PlanInfo from './components/screens/PlanInfo';
import ClientInfo from './components/screens/ClientInfo';
import Trainer from './components/screens/Trainer';
import Uploader from './components/screens/Uploader';
import UpdateClient from './components/screens/UpdateClient';
import UpdateTrainerPage from './components/screens/UpdateTrainerPage';
import Logs from './components/screens/Logs';
import StandardWorkout from './components/screens/StandardWorkout';
import Logging from './components/screens/Logging';
import PersonalizedWorkout from './components/screens/PersonalizedWorkout';
import Notification from './components/screens/Notification';
import BodyWeight from './components/screens/BodyWeight';
import BodyFat from './components/screens/BodyFat';
import TrainerSection from './components/screens/TrainerSection';
import SharedCalendar from './components/screens/SharedCalendar';
import TrainerClient from './components/screens/TrainerClient';
import TrainerWorkspace from './components/screens/TrainerWorkspace';
import TrainerWorkout from './components/screens/TrainerWorkout';
import CreateWorkout from './components/screens/CreateWorkout';
//import all the screens we are going to switch
const App = createStackNavigator({
  //Constant which holds all the screens like index of any book
    LandingPage: {screen: LandingPage},
    StepForm: {screen: StepForm},
    SecondLevelCustomer: { screen: SecondLevelCustomer },
    Admin: {screen: Admin},
    Courses: {screen: Courses},
    Clients: {screen: Clients},
    //First entry by default be our first screen
    //if we do not define initialRouteName
    Workspace: { screen: Workspace },
    Plans: {screen: Plans},
    CreateStandardPlan: {screen: CreateStandardPlan},
    Trainer: {screen: Trainer},
    ClientInfo: {screen: ClientInfo},
    TrainerPage: {screen: TrainerPage},
    CourseInfo: {screen: CourseInfo},
    PlanInfo: {screen: PlanInfo},
    UpdateClient: {screen: UpdateClient},
    UpdateTrainerPage: {screen: UpdateTrainerPage},
    Uploader: {screen: Uploader},
    Logs: {screen: Logs},
    StandardWorkout: {screen: StandardWorkout},
    Logging: {screen: Logging},
    PersonalizedWorkout: {screen: PersonalizedWorkout},
    Notification: {screen: Notification},
    SLCProfile: {screen: SLCProfile},
    BodyWeight: {screen: BodyWeight},
    BodyFat: {screen: BodyFat},
    TrainerSection: {screen: TrainerSection},
    SharedCalendar: {screen: SharedCalendar},
    TrainerClient: {screen: TrainerClient},
    TrainerWorkspace: {screen: TrainerWorkspace},
    TrainerWorkout: {screen: TrainerWorkout},
    CreateWorkout: {screen: CreateWorkout}
  },
  {
    initialRouteName: 'LandingPage',
  }
);
export default createAppContainer(App);