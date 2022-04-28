import React, { Component } from 'react'
import { StatusBar } from 'expo-status-bar'
import { Text, View, FlatList, StyleSheet } from 'react-native'

// ! import api file from axios
import api from './src/services/api'

// * import User's view
import Users from './src/views/Users'

export default class App extends Component {
	constructor(props) {
		super(props)
		this.state = {
			users: [],
		}
	}
	async componentDidMount() {
		const response = await api.get('/users/index')
		this.setState({ users: response.data })
	}

	render() {
		return (
			<View style={styles.container}>
				<StatusBar style='auto' />
				<Text>Usuários Cadastrados:</Text>
				<FlatList
					data={this.state.users}
					keyExtractor={item => item.id}
					renderItem={({ item }) => <Users data={item} />}
				/>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
	},
})
