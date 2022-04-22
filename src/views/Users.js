import { Text, View } from 'react-native'
import React, { Component } from 'react'

export default class Users extends Component {
	render() {
		return (
			<View>
				<Text>
					Nome: {this.props.data.nome}, Email: {this.props.data.email},{' '}
					Telefone: {this.props.data.telefone}{' '}
				</Text>
			</View>
		)
	}
}
