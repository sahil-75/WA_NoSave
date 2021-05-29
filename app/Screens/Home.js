import React, { Component } from 'react';
import { View, StyleSheet, Text, TextInput, TouchableOpacity, Linking, SafeAreaView, Switch } from 'react-native';
import { ColorTheme } from '../utils/constants';

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            mobileNumber: "",
            messageText: "",
            isDarkModeEnabled: false
        };
    }

    toggleTheme = () => {
        this.setState({
            isDarkModeEnabled: !this.state.isDarkModeEnabled
        });
    };

    openWhatsApp = () => {
        let msg = this.state.messageText;
        let mobno = this.state.mobileNumber;

        if (mobno) {
            if (msg) {
                let url = "whatsapp://send?text=" + msg + "&phone=91" + mobno;
                console.log(url);
                Linking.openURL(url)
                    .then(data => {
                        console.log("WhatsApp Opened Successfully " + data);
                    })
                    .catch(() => {
                        alert("WhatsApp is not installed on your device");
                    });
            } else {
                alert("Please enter some Message Text to send");
            }
        } else {
            alert("Please enter a Mobile Number to send");
        }
    };

    handleMsg = (text) => {
        this.setState({
            messageText: text
        })
    };

    handleMobNo = (text) => {
        this.setState({
            mobileNumber: text
        })
    };

    render() {
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: this.state.isDarkModeEnabled ? "#000" : "#FFF" }}>
                <View style={localStyles.header}>
                    <Text style={localStyles.headerText}>WA_NoSave</Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: '#0101014d', borderRadius: 10, padding: 5 }}>
                        <Text>&#x2600;</Text>
                        <Switch
                            trackColor={{ false: "#767577", true: "#81b0ff" }}
                            thumbColor={"#f4f3f4"}
                            ios_backgroundColor="#3e3e3e"
                            onValueChange={this.toggleTheme}
                            value={this.state.isDarkModeEnabled}
                            style={{ marginLeft: 5 }}
                        />
                        <Text>&#x1F31C;</Text>
                    </View>
                </View>
                <View style={localStyles.container}>
                    <Text style={{ textAlign: "justify", fontSize: 15, marginBottom: 15, color: this.state.isDarkModeEnabled ? "#FFF" : "#444" }}>
                        Type your message here and send it to anyone on WhatsApp without having to save their numbers.
                    </Text>

                    <TextInput
                        value={this.state.mobileNumber}
                        onChangeText={(text) => this.handleMobNo(text)}
                        placeholder={"Enter Mobile Number here"}
                        placeholderTextColor={this.state.isDarkModeEnabled ? "#FFF" : "#777"}
                        keyboardType={"numeric"}
                        style={[localStyles.input, { borderColor: this.state.isDarkModeEnabled ? "#FFF" : "#000", }]}
                    />

                    <TextInput
                        value={this.state.messageText}
                        onChangeText={(text) => this.handleMsg(text)}
                        placeholder={"Enter your Message here"}
                        placeholderTextColor={this.state.isDarkModeEnabled ? "#FFF" : "#777"}
                        multiline={true}
                        style={[localStyles.input, { height: 90, borderColor: this.state.isDarkModeEnabled ? "#FFF" : "#000", }]}
                    />

                    <TouchableOpacity style={localStyles.button} onPress={this.openWhatsApp}>
                        <Text style={{ color: "#FFF" }}>Send!</Text>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity activeOpacity={0.7} style={localStyles.footer} onPress={() => Linking.openURL('http://sahilkalyani.tech/')}>
                    <Text style={localStyles.footerText}>Developed by Sahil Kalyani</Text>
                </TouchableOpacity>
            </SafeAreaView>
        );
    }
}

const localStyles = StyleSheet.create({
    container: {
        alignItems: 'center',
        padding: 30,
    },
    header: {
        backgroundColor: "#128C7E",
        paddingVertical: 20,
        paddingHorizontal: 15,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    headerText: {
        color: "#FFF",
        fontSize: 20
    },
    footer: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        backgroundColor: "#128C7E",
        paddingVertical: 12,
        alignItems: 'center'
    },
    footerText: {
        color: "#FFF",
        fontSize: 15,
    },
    input: {
        width: 300,
        height: 45,
        padding: 10,
        margin: 10,
        borderRadius: 5,
        borderWidth: 0.5
    },
    button: {
        backgroundColor: "#25D366",
        padding: 10,
        marginTop: 20,
        borderColor: "#128C7E",
        borderRadius: 5,
        borderWidth: 0.5
    }
});