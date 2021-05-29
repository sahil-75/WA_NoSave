import React, { Component } from 'react';
import { View, StyleSheet, Text, SafeAreaView, Image } from 'react-native';
import { ColorTheme } from '../utils/constants';

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    componentDidMount() {
        setTimeout(() => {
            this.props.navigation.push('Home');
        }, 2000);
    }

    render() {
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: ColorTheme.black, justifyContent: 'center' }}>
                <View style={localStyles.logoBox}>
                    <Image source={require('../../assets/Logo.png')} resizeMode='contain' style={localStyles.logo} />
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
        color: ColorTheme.white,
        fontSize: 15,
    },
    logoBox: {
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 50
    },
    logo: {
        width: '40%',
        height: '40%',
        marginBottom: 15
    },
    logoText: {
        color: ColorTheme.white,
        fontSize: 25,
        fontWeight: '500'
    }
});