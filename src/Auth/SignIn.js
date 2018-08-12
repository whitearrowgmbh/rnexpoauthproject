import React from 'react';
import {StyleSheet, Text, View, TextInput, Button} from 'react-native';
import Amplify, {Auth} from 'aws-amplify';


/*
 username: Test
 password: Password1
 */


export default class SignIn extends React.Component {
	state = {
		username        : '',
		password        : '',
		confirmationCode: '',
		user            : {},
		status          : ''
	};


	signIn = () => {
		const { username, password } = this.state;

		this.setState({ status: 'signing in...' });

		Auth.signIn(username,
					password)
			.then((user) => {
				this.setState({ user, status: 'signed in' });
				console.log('App - signIn(): successfully signed in with user ', user);
			})
			.catch((e) => {
				console.log('App - signIn(): exception: ', e);
				this.setState({ status: e.message });
			});

	};

	confirmSignIn = () => {
		const { user, confirmationCode } = this.state;

		debugger;

		Auth.confirmSignIn(user, confirmationCode, 'SMS_MFA')
			.then((data) => {
				console.log('SignIn - confirmSignIn(): successfully confirmed');
				console.log('SignIn - confirmSignIn(): data signUpConfirm = ', data);
				this.setState({ status: 'signin confirmed' });
			})
			.catch((e) => {
				console.log('App - confirmSignIn(): exception: ', e);
				this.setState({ status: e.message });
			});
	};

	onChange = (key, value) => {
		console.group('OnChange SignIn');
		console.log('App - onChange(): key =', key);
		console.log('App - onChange(): value =', value);
		console.groupEnd();

		this.setState({ [key]: value });
	};


	render()
	{
		return (
			<View style={styles.container}>
				<TextInput style={styles.textInput}
						   placeholder="username"
						   onChangeText={value => this.onChange('username', value)}/>
				<TextInput style={styles.textInput}
						   placeholder="password"
						   secureTextEntry
						   onChangeText={value => this.onChange('password', value)}/>
				<Button title="Sign in"
						onPress={this.signIn}/>
				<TextInput style={styles.textInput}
						   placeholder="confirmation code"
						   keyboardType="numeric"
						   onChangeText={value => this.onChange('confirmationCode', value)}/>
				<Button title="Confirm"
						onPress={this.confirmSignIn}/>

				<Text style={styles.statusLabel}>{this.state.status}</Text>
			</View>
		);
	}
}

const styles = StyleSheet.create({
									 container  : {
										 flex           : 1,
										 backgroundColor: '#fff',
										 justifyContent : 'center',
									 },
									 textInput  : {
										 height           : 50,
										 margin           : 10,
										 borderBottomWidth: 2,
										 borderBottomColor: '#2196F3'
									 },
									 statusLabel: {
										 margin: 20,
										 color : '#0000cc'
									 }
								 });
