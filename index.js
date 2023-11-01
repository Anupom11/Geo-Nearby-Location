/**
 * @format
 */

import {AppRegistry} from 'react-native';
//import App from './App';
import {name as appName} from './app.json';

import HomeScreen from './src/Main';
import StartScreen from './src/StartScreen';
import App from './src/NavigationScreen';

AppRegistry.registerComponent(appName, () => App);
