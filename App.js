import React, { Component } from 'react';
//import react in our code.
//For react-navigation 3.0+
//import { createAppContainer, createStackNavigator } from 'react-navigation';
//For react-navigation 4.0+
import { createAppContainer, createSwitchNavigator, createDrawerNavigator } from 'react-navigation';
import {createBottomTabNavigator} from 'react-navigation-tabs';
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
import MembershipDetails from './components/screens/MembershipDetails';
import PersonalTrainingDetails from './components/screens/PersonalTrainingDetails';
import TrainerBilling from './components/screens/TrainerBilling';
import ClientDetails from './components/screens/ClientDetails';
import AdminProfile from './components/screens/AdminProfile';
import Contact from './components/screens/contact';
import AppBilling from './components/screens/AppBilling';
import AddExercise from './components/screens/AddExercise';
import DetailedExercise from './components/screens/DetailedExercise';
import Sessions from './components/screens/Sessions';
import FinancialHistory from './components/screens/FinancialHistory';
import YearwiseExpense from './components/screens/YearwiseExpense';
import Menu from './components/screens/Menu';
import GymExpenseTracker from './components/screens/GymExpenseTracker';
import GymLocations from './components/screens/GymLocations';
import Icon from 'react-native-vector-icons/Ionicons';
import CreateAdmin from './components/screens/CreateAdmin';
import WorkoutSpace from './components/screens/WorkoutSpace';
import MealSpace from './components/screens/MealSpace';
import DaywiseMeals from './components/screens/DaywiseMeals';
import DaywiseWorkouts from './components/screens/DaywiseWorkouts';
//import all the screens we are going to switch/

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
    QuickClient: {screen: QuickClient},
    TrainerBilling: {screen: TrainerBilling},
    ClientDetails: {screen: ClientDetails},
    MembershipDetails: {screen: MembershipDetails},
    PersonalTrainingDetails: {screen: PersonalTrainingDetails},
    AdminProfile: {screen: AdminProfile},
    Contact: {screen: Contact},
    AppBilling: {screen: AppBilling},
    AddExercise: {screen: AddExercise},
    DetailedExercise: {screen: DetailedExercise},
    Sessions: {screen: Sessions},
    FinancialHistory: {screen: FinancialHistory},
    YearwiseExpense: {screen: YearwiseExpense}
  },
  {
    initialRouteName: 'Admin'
  }
)

AdminPage.navigationOptions = ({ navigation }) => {
  let tabBarVisible = true;
  if (navigation.state.index > 0) {
    tabBarVisible = false;
  }

  return {
    tabBarVisible,
  };
};

const MenuPage = createStackNavigator({
    Menu: {screen: Menu},
    TrainerSection: {screen: TrainerSection},
    GymExpenseTracker: {screen: GymExpenseTracker},
    GymLocations: {screen: GymLocations},
    CreateAdmin: {screen: CreateAdmin}
},
{
    initialRouteName: 'Menu'
});

MenuPage.navigationOptions = ({ navigation }) => {
  let tabBarVisible = true;
  if (navigation.state.index > 0) {
    tabBarVisible = false;
  }

  return {
    tabBarVisible,
  };
};

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
    MealSpace: {screen: MealSpace},
    WorkoutSpace: {screen: WorkoutSpace},
    SearchModal: {screen: SearchModal},
    TrainerCreateWorkout: {screen: TrainerCreateWorkout},
    DaywiseWorkouts: {screen: DaywiseWorkouts},
    DaywiseMeals: {screen: DaywiseMeals}
  },
  {
    initialRouteName: 'TrainerSection'
  }
  );

  const Tabs = createBottomTabNavigator({
    Dashboard: {screen: AdminPage,
    navigationOptions: {
            tabBarLabel:null,
            tabBarIcon: ({ tintColor }) => (
              <Icon name="md-home" size={30} color="black" />
            )
          },
    },
    Explore: {screen: MenuPage,
        navigationOptions: {
                    tabBarLabel:null,
                    tabBarIcon: ({ tintColor }) => (
                      <Icon name="md-compass" size={30} color="black" />
                    )
                  },
    }
  },
  {
    tabBarOptions: {
      activeTintColor: '#e91e63',
      activeBackgroundColor: '#e3b04b',
      showLabel: false,
      labelStyle: {
        fontSize: 15
      },
      tabStyle: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10
      },
      style: {
        backgroundColor: '#f1d6ab',
      },
    }
  });
  
  const App = createSwitchNavigator({
   Home: {
      screen: Tabs,
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