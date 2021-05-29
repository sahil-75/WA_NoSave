import React, { Component } from 'react';
import { View, StyleSheet, Text, SafeAreaView, Image } from 'react-native';
import { Actions } from 'react-native-router-flux';

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    componentDidMount() {
        setTimeout(() => Actions.Home(), 2000);
    }

    render() {
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: "#FFF", justifyContent: 'center' }}>
                <View style={localStyles.logoBox}>
                    <Image source={require('../assets/Logo.png')} resizeMode='contain' style={localStyles.logo} />
                    <Text style={localStyles.logoText}>WA_NoSave</Text>
                </View>
                <View style={localStyles.footer}>
                    <Text style={localStyles.footerText}>Powered by React Native</Text>
                </View>
            </SafeAreaView>
        );
    }
}

const localStyles = StyleSheet.create({
    container: {
        alignItems: 'center',
        padding: 30,
    },
    footer: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        paddingVertical: 12,
        alignItems: 'center'
    },
    footerText: {
        color: "#000",
        fontSize: 15,
    },
    logoBox: {
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 50
    },
    logo: {
        width: '30%',
        height: '40%',
        marginBottom: 10
    },
    logoText: {
        fontWeight: '500'
    }
});