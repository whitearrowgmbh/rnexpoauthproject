import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Amplify, {Auth} from 'aws-amplify';
import AWSConfig from './aws-exports';

Amplify.configure(AWSConfig);


export default class App extends React.Component {

	state = {
		username        : '',
		password        : '',
		email           : '',
		phone_number    : '',
		confirmationCode: ''
	};


	signup = () => {
		const { username, password, email, phone_number } = this.state;

		Auth.signUp({
						username,
						password,
						attributes: {
							email,
							phone_number
						}
					})
			.then(() => console.log('App - signUp(): successfully signed up'))
			.catch((e) => console.log('App - signUp(): exception: ', e));

	};

	confirmSignup = () => {
		const { username, confirmationCode } = this.state;

		Auth.confirmSignUp(username, confirmationCode)
			.then(() => console.log('App - confirmSignup(): successfully confirmed'))
			.catch((e) => console.log('App - confirmSignup(): exception: ', e));
	};


	render()
	{
		return (
			<View style={styles.container}>
				<Text>Open up App.js to start working on your app!</Text>
			</View>
		);
	}
}

const styles = StyleSheet.create({
									 container: {
										 flex           : 1,
										 backgroundColor: '#fff',
										 alignItems     : 'center',
										 justifyContent : 'center',
									 },
								 });
