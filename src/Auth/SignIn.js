import React from 'react';
import {StyleSheet, Text, View, TextInput, Button} from 'react-native';
import Amplify, {Auth} from 'aws-amplify';


/*
 username: Test
 password: password1
 */


export default class SignIn extends React.Component {
	state = {
		username        : '',
		password        : '',
		confirmationCode: ''
	};


	signIn = () => {
		const { username, password } = this.state;

		Auth.signIn({
						username,
						password,
					})
			.then((user) => console.log('App - signIn(): successfully signed in with user ', user))
			.catch((e) => console.log('App - signIn(): exception: ', e));

	};

	confirmSignIn = () => {
		const { username, confirmationCode } = this.state;

		Auth.confirmSignIn(username, confirmationCode)
			.then(() => console.log('App - confirmSignIn(): successfully confirmed'))
			.catch((e) => console.log('App - confirmSignIn(): exception: ', e));
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
				<Button title="Sign in"
						onPress={this.signin}/>
				<TextInput style={styles.textInput}
						   placeholder="confirmation code"
						   onChangeText={value => this.onChange('confirmationCode', value)}/>
				<Button title="Confirm"
						onPress={this.confirmSignIn}/>
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
