
import { GiftedChat, Bubble } from 'react-native-gifted-chat';
import React, { Component } from 'react';
import { View, Text, Platform, KeyboardAvoidingView } from 'react-native';

const firebase = require('firebase');
require('firebase/firestore');

export default class Chat extends React.Component {
    constructor() {
        super();
        this.state = {
            messages: [],
            user: {
                _id: '',
                name: '',
                avatar: ''
            },
            uid: 0,
            isConnected: false,
            image: null
        }
        const firebaseConfig = {
            apiKey: "AIzaSyA8wMdPqN9qzguvAgdqHWX3AafNhWK_Xkk",
            authDomain: "chat-app-a5bc3.firebaseapp.com",
            projectId: "chat-app-a5bc3",
            storageBucket: "chat-app-a5bc3.appspot.com",
            messagingSenderId: "909566895747",
            appId: "1:909566895747:web:771449fe68d86ac4b49db6",
            measurementId: "G-XTQ9R1NLJ7"
        }

        if (!firebase.apps.length) {
            firebase.initializeApp(firebaseConfig);
        }

        this.referenceChatMessages = firebase.firestore().collection('messages');
        firebase.firestore().collection('messages').doc('messages');

    }


    componentDidMount() {

        this.authUnsubscribe = firebase.auth().onAuthStateChanged(async (user) => {
            if (!user) {
                await firebase.auth().signInAnonymously();
            }
            this.setState({
                uid: user.id,
                isConnected: true,
                user: {
                    _id: user.uid,
                    name: this.props.route.params.name,
                    avatar: 'https://placeimg.com/140/140/any'
                },
                messages: [],
            });
            this.referenceChatMessages = firebase.firestore().collection('messages');
            this.unsubscribeChatUser = this.referenceChatMessages.orderBy('createdAt', 'desc').onSnapshot(this.onCollectionUpdate);
        });
    }

    componentWillUnmount() {
        this.authUnsubscribe();
        this.unsubscribeChatUser();
    }

    onCollectionUpdate = (querySnapshot) => {
        const messages = [];
        querySnapshot.forEach((doc) => {
            let data = doc.data();
            messages.push({
                _id: data._id,
                text: data.text,
                createdAt: data.createdAt.toDate(),
                user: {
                    _id: data.user._id,
                    name: data.user.name,
                    avatar: data.user.avatar,
                },
                image: data.image || null,
                location: data.location || null,
            });
        });
        this.setState({
            messages
        });
    };

    addMessage() {
        const message = this.state.messages[0];
        this.referenceChatMessages.add({
            _id: message._id,
            createdAt: message.createdAt,
            text: message.text,
            user: message.user,
            image: message.image || null,
            location: message.location || null,
        });
    }

    onSend(messages = []) {
        this.setState((previousState) => ({
            messages: GiftedChat.append(previousState.messages, messages),
        }),
            () => {
                this.addMessage();
            })
            ;
    }

    renderBubble(props) {
        return (
            <Bubble
                {...props}
                wrapperStyle={{
                    right: {
                        backgroundColor: '#00BFFF'
                    }
                }}
            />
        );
    }

    render() {
        let name = this.props.route.params.name;
        let color = this.props.route.params.color;

        this.props.navigation.setOptions({ title: name });

        return (
            <View style={{ flex: 1, backgroundColor: color }}>
                <GiftedChat
                    renderBubble={this.renderBubble.bind(this)}
                    messages={this.state.messages}
                    onSend={messages => this.onSend(messages)}
                    user={this.state.user}
                />
                { Platform.OS === 'android' ? <KeyboardAvoidingView behavior="height" /> : null}
            </View >
        );
    }
}