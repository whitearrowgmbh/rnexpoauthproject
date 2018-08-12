import React from 'react';
import {StyleSheet, Text, View, TextInput, Button} from 'react-native';
import Amplify, {Auth} from 'aws-amplify';


/*
 username: Test
 password: password1
 */


export default class SignUp extends React.Component {
	state = {
		username        : '',
		password        : '',
		email           : '',
		phone_number    : '',
		confirmationCode: '',
		status          : ''
	};


	signup = () => {
		const { username, password, email, phone_number } = this.state;

		this.setState({ status: 'signup started...' });

		Auth.signUp({
						username,
						password,
						attributes: {
							email,
							phone_number
						}
					})
			.then(() => {
				console.log('App - signUp(): successfully signed up');
				this.setState({ status: 'signed up' });
			})
			.catch((e) => {
				console.log('App - signUp(): exception: ', e);
				this.setState({ status: 'error in signup' });
			});

	};

	confirmSignup = () => {
		const { username, confirmationCode } = this.state;

		Auth.confirmSignUp(username, confirmationCode)
			.then(() => {
				console.log('App - confirmSignup(): successfully confirmed');
				this.setState({ status: 'signup confirmed' });
			})
			.catch((e) => {
				console.log('App - confirmSignup(): exception: ', e);
				this.setState({ status: 'error signup confirmation' });
			});
	};

	onChange = (key, value) => {
		console.group('OnChange');
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
				<TextInput style={styles.textInput}
						   placeholder="email"
						   onChangeText={value => this.onChange('email', value)}/>
				<TextInput style={styles.textInput}
						   placeholder="phone number"
						   onChangeText={value => this.onChange('phone_number', value)}/>
				<Button title="Sign up"
						onPress={this.signup}/>
				<TextInput style={styles.textInput}
						   placeholder="confirmation code"
						   onChangeText={value => this.onChange('confirmationCode', value)}/>
				<Button title="Confirm"
						onPress={this.confirmSignup}/>
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
