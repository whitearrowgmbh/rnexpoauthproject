/**
 * Created by Juergen Pichler on 12.08.2018
 * WhiteArrow GmbH, DE-85405 Nandlstadt
 */

import {createTabNavigator} from 'react-navigation';

import SignIn from './Auth/SignIn';
import SignUp from './Auth/SignUp';

const tabs = createTabNavigator({
									SignIn: {
										screen: SignIn
									},
									SignUp: {
										screen: SignUp
									}
								});

export default tabs;
