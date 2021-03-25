import React from 'react';
import { View, Text, Button, TextInput, StyleSheet } from 'react-native';


export default class Chat extends React.Component {
    render() {
        let color = this.props.route.params.color;
        let name = this.props.route.params.name;
        this.props.navigation.setOptions({ title: name });

        return (

            <View style={{ flex: 1, backgroundColor: color, justifyContent: 'center', alignItems: 'center' }}>
                <Button
                    title="Go to Start"
                    onPress={() => this.props.navigation.navigate("Start")}
                />
            </View>
        );
    }
}