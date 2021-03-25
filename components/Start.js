import React from 'react';
import { View, Text, Button, TextInput, StyleSheet, TouchableOpacity, ImageBackground, } from 'react-native';
const image = require('../assets/background-image.png');
export default class Start extends React.Component {
    constructor(props) {
        super(props);
        this.state = { name: "" };
    }
    render() {
        return (
            <ImageBackground source={image} style={{ flex: 1, }}>
                <View>
                    <View style={styles.box}>
                        <TextInput
                            style={styles.input}
                            onChangeText={(name) => this.setState({ name })}
                            value={this.state.name}
                            placeholder='Type here ...'
                        />
                        <Text
                            style={{ color: 'blue', }}>Chat With: {this.state.name}</Text>



                    </View>

                    <Text style={{ paddingBottom: 10, textAlign: 'center', color: '#1E90FF', fontSize: 20, }}> Choose Background Color: </Text>
                    <View style={styles.colorCon}>
                        <TouchableOpacity
                            style={styles.color1}
                            onPress={() => { this.setState({ color: 'red' }) }}
                        >
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.color2}
                            onPress={() => { this.setState({ color: 'blue' }) }}
                        >
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.color3}
                            onPress={() => { this.setState({ color: 'yellow' }) }}
                        >
                        </TouchableOpacity>


                    </View>
                    <Button
                        style={{ paddingBottom: 10, }}
                        title="Go to Chat"
                        onPress={() =>
                            this.props.navigation.navigate("Chat", { name: this.state.name, color: this.state.color })}

                    />
                </View>
            </ImageBackground>
        )
    }
}

const styles = StyleSheet.create({
    box: {
        flexDirection: 'column',
        position: 'relative',
        marginTop: 200,
        marginRight: 'auto',
        marginLeft: 'auto',
        width: '88%',
        borderRadius: 30,
        paddingTop: 20,
        paddingBottom: 20,
        backgroundColor: '#00BFFF',
        marginBottom: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    input: {
        height: 40,
        color: 'white',
        borderColor: 'white',
        borderWidth: 1,
        borderRadius: 10,
        width: 250,
        padding: 10,
        margin: 15,
    },
    color1: {
        flex: 1,
        backgroundColor: 'red',
        height: 50,
        borderRadius: 25,
        right: 25
    },
    color2: {
        flex: 1,
        backgroundColor: 'blue',
        borderRadius: 25,
        right: 10
    },
    color3: {
        flex: 1,
        backgroundColor: 'yellow',
        borderRadius: 25,
        left: 5
    },
    colorCon: {
        flexDirection: 'row',
        width: 200,
        marginLeft: 125
    },
});