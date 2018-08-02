/** @format */

import {AppRegistry} from 'react-native';
import App from './app/index';
import {name as appName} from './app.json';

console.disableYellowBox = true // 忽略黄色警告
AppRegistry.registerComponent(appName, () => App);
