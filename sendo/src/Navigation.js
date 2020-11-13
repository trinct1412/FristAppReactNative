import { createAppContainer } from 'react-navigation';
import {createDrawerNavigator} from 'react-navigation-drawer'
import { createStackNavigator } from "react-navigation-stack";
import LandingScreen from './screens/Landing/LandingScreen'
import HomeScreen from './screens/Home/HomeScreen';
import CategoriesScreen from './screens/Categories/CategoriesScreen';
import RecipeScreen from './screens/Recipe/RecipeScreen';
import RecipesListScreen from './screens/RecipesList/RecipesListScreen';
import DrawerContainer from './screens/DrawerContainer/DrawerContainer';
import SearchScreen from './screens/Search/SearchScreen';
import IngredientsDetailsScreen from './screens/IngredientsDetails/IngredientsDetailsScreen';
import Recommend from './screens/Recommend/Recommend';
import LoginScreen from './screens/Login/LoginScreen';
import RegisterScreen from './screens/Register/RegisterScreen';
import LogoutScreen from './screens/Logout/Logout';

const MainNavigator = createStackNavigator(
  {
    Landing: LandingScreen,
    Home: HomeScreen,
    Categories: CategoriesScreen,
    Recipe: RecipeScreen,
    RecipesList: RecipesListScreen,
    Search: SearchScreen,
    Logout:LogoutScreen,
    IngredientsDetails: IngredientsDetailsScreen,
    Recommend: Recommend,
    Login:LoginScreen,
    Register:RegisterScreen,
  },
  {
    initialRouteName: 'Landing',
    defaulfNavigationOptions: ({ navigation }) => ({
      headerTitleStyle: {
        fontWeight: 'bold',
        textAlign: 'center',
        alignSelf: 'center',
        flex: 1,
        fontFamily: 'FallingSkyCond'
      }
    })
  }
);


const DrawerStack = createDrawerNavigator(
  {
    Main: MainNavigator
  },
  {
    drawerPosition: 'left',
    initialRouteName: 'Main',
    drawerWidth: 250,
    contentComponent: DrawerContainer
  }
);

export default Navigation = createAppContainer(DrawerStack);

console.disableYellowBox = true;