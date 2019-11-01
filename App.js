import React, { Component } from 'react';
//import react in our code.
//For react-navigation 3.0+
//import { createAppContainer, createStackNavigator } from 'react-navigation';
//For react-navigation 4.0+
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator} from 'react-navigation-stack';
import Clients from './components/screens/Clients';
import SLCProfile from './components/screens/second_level_customer_profile';
import SecondLevelCustomer from './components/screens/second_level_customer';
import Workspace from './components/screens/workspace';
import Courses from './components/screens/Courses';
import Plans from './components/screens/Plans';
import CreateStandardPlan from './components/screens/CreateStandardPlan'
import TrainerPage from './components/screens/TrainerPage';
import StepFormTrainer from './components/screens/step_form_trainer';
import StepFormCustomer from './components/screens/step_form_customer';
import LandingPage from './components/screens/LandingPage';
import CourseInfo from './components/screens/CourseInfo';
import Admin from './components/screens/Admin';
import PlanInfo from './components/screens/PlanInfo';
import ClientInfo from './components/screens/ClientInfo';
import Trainer from './components/screens/Trainer';
import Uploader from './components/screens/Uploader';
import UpdateClient from './components/screens/UpdateClient';
import PdfViewer from './components/screens/PdfViewer';
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
import CreateMeal from './components/screens/CreateMeal';
import TrainerMeal from './components/screens/TrainerMeal';
import SearchModal from './components/screens/SearchModal';
import ClientCourseInfo from './components/screens/ClientCourseInfo';
import AdminWorkoutSpace from './components/screens/AdminWorkoutSpace';
import WorkoutProgress from './components/screens/WorkoutProgress';
import Login from './components/screens/Login';
import SplashScreen from './components/screens/SplashScreen';
import CustomerNotification from './components/screens/CustomerNotification';
import TrainerCreateWorkout from './components/screens/TrainerCreateWorkout';
import TrainerProfile from './components/screens/TrainerProfile';
import Request from './components/screens/Request';
import TrainerRequest from './components/screens/TrainerRequest';
import ClientRequest from './components/screens/ClientRequest';
import TrainerRequestInfo from './components/screens/TrainerRequestInfo';
import ClientRequestInfo from './components/screens/ClientRequestInfo';
import QuickClient from './components/screens/QuickClient';
import RequestProcessingPage from './components/screens/RequestProcessingPage';

//import all the screens we are going to switch

// To see all the requests in the chrome Dev tools in the network tab.

const Auth = createStackNavigator({
    LandingPage: {screen: LandingPage},
    StepFormTrainer: {screen: StepFormTrainer},
    StepFormCustomer: {screen: StepFormCustomer},
    Login: {screen: Login},
});

const AdminPage = createStackNavigator({
    Admin: {screen: Admin},
    Courses: {screen: Courses},
    Clients: {screen: Clients},
    Plans: {screen: Plans},
    Trainer: {screen: Trainer},
    PlanInfo: {screen: PlanInfo},
    CreateStandardPlan: {screen: CreateStandardPlan},
    CourseInfo: {screen: CourseInfo},
    UpdateClient: {screen: UpdateClient},
    ClientInfo: {screen: ClientInfo},
    TrainerPage: {screen: TrainerPage},
    AdminWorkoutSpace: {screen: AdminWorkoutSpace},
    UpdateTrainerPage: {screen: UpdateTrainerPage},
    CreateWorkout: {screen: CreateWorkout},
    Request: {screen: Request},
    ClientRequest: {screen: ClientRequest},
    TrainerRequest: {screen: TrainerRequest},
    TrainerRequestInfo: {screen: TrainerRequestInfo},
    ClientRequestInfo: {screen: ClientRequestInfo},
    QuickClient: {screen: QuickClient}
  },
  {
    initialRouteName: 'Admin'
  }
)

const Customer = createStackNavigator({
     SecondLevelCustomer: { screen: SecondLevelCustomer },
     WorkoutProgress: {screen: WorkoutProgress},
     BodyWeight: {screen: BodyWeight},
     BodyFat: {screen: BodyFat},
     CustomerNotification: {screen: CustomerNotification},
     SLCProfile: {screen: SLCProfile},
     Workspace: { screen: Workspace },
     ClientCourseInfo: {screen: ClientCourseInfo},
     PersonalizedWorkout: {screen: PersonalizedWorkout},
     StandardWorkout: {screen: StandardWorkout},
     Logging: {screen: Logging},
     PdfViewer: {screen: PdfViewer}

     },
     {
        initialRouteName: 'SecondLevelCustomer'
     }
);
const PersonalTrainer = createStackNavigator({
  //Constant which holds all the screens like index of any book
    TrainerSection: {screen: TrainerSection},
    Notification: {screen: Notification},
    SharedCalendar: {screen: SharedCalendar},
    TrainerClient: {screen: TrainerClient},
    TrainerWorkspace: {screen: TrainerWorkspace},
    TrainerProfile: {screen: TrainerProfile},
    Uploader: {screen: Uploader},
    TrainerWorkout: {screen: TrainerWorkout},
    TrainerMeal: {screen: TrainerMeal},
    CreateMeal: {screen: CreateMeal},
    SearchModal: {screen: SearchModal},
    TrainerCreateWorkout: {screen: TrainerCreateWorkout}
  },
  {
    initialRouteName: 'TrainerSection'
  }
  );

  const App = createSwitchNavigator({
   Admin: {
      screen: AdminPage
   },
   Auth: {
      screen: Auth,
   },
   SplashScreen: {
      screen: SplashScreen,
   },
   SecondLevelCustomer: {
      screen: Customer
   },
   RequestProcessingPage: {
       screen: RequestProcessingPage
   },
   TrainerSection: {
      screen: PersonalTrainer,
    },
  },
  {
     initialRouteName: 'SplashScreen'
  }
  );
export default createAppContainer(App);