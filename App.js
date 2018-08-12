import React from 'react';
import {StyleSheet, Text, View, TextInput, Button} from 'react-native';
import Amplify, {Auth} from 'aws-amplify';
import AWSConfig from './aws-exports';
import Tabs from './src/TabNavigation';


Amplify.configure(AWSConfig);

/*
 username: Test
 password: password1
 */


export default class App extends React.Component {

	state = {
		isAuthenticated: false
	};


	authenticate = (isAuthenticated) => {
		this.setState({ isAuthenticated });
	};


	render()
	{
		if (this.state.isAuthenticated)
		{
			return (
				<View>
					<Text>Authenticated</Text>
				</View>
			);
		}

		return (
			<View style={styles.container}>
				<Tabs screenProps={{ authenticate: this.authenticate }}/>
			</View>
		);
	}
}

const styles = StyleSheet.create({
									 container: {
										 flex           : 1,
										 backgroundColor: '#fff',
										 justifyContent : 'center',
									 },
									 textInput: {
										 height           : 50,
										 margin           : 10,
										 borderBottomWidth: 2,
										 borderBottomColor: '#2196F3'
									 }
								 });
