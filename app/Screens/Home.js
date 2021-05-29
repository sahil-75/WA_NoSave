import React, { Component } from 'react';
import { View, StyleSheet, Text, TextInput, TouchableOpacity, Linking, SafeAreaView, Switch, Image, Dimensions, TouchableHighlight } from 'react-native';
const { height, width } = Dimensions.get('window');

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            mobileNumber: "",
            messageText: "",
            modalVisible: false,
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
                let url = "whatsapp://send?text=" + msg + "&phone=" + mobno;
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
            <SafeAreaView style={{ flex: 1, backgroundColor: this.state.isDarkModeEnabled ? "#292929" : "#fafcf8" }}>
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
                        <Text style={{ color: "#FFF", fontSize: 15 }}>Send!</Text>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity activeOpacity={0.7} style={localStyles.footer} onPress={() => this.setState({ modalVisible: true })} >
                    <Text style={localStyles.footerText}>Developed with</Text>
                    <Image source={require('../../assets/Heart.png')} resizeMode='contain' style={localStyles.logo} />
                    <Text style={localStyles.footerText}>and</Text>
                    <Image source={require('../../assets/JS.png')} resizeMode='contain' style={localStyles.logo} />
                </TouchableOpacity>
                {this.state.modalVisible &&
                    <TouchableOpacity activeOpacity={1} style={localStyles.modalBg} onPress={() => this.setState({ modalVisible: false })}>
                        <TouchableOpacity style={localStyles.modal} activeOpacity={1}>
                            <Text style={[localStyles.modalText, { fontSize: 25, marginBottom: 30 }]}>WA_NoSave</Text>
                            <Image source={require('../../assets/Logo.png')} resizeMode='contain' style={localStyles.appLogo} />
                            <Text style={localStyles.modalText}>Version: 1.0.0</Text>
                            <View style={{ flexDirection: 'row' }}>
                                <Text style={localStyles.modalText}>Source Code: </Text>
                                <TouchableOpacity activeOpacity={0.7} onPress={() => Linking.openURL('https://github.com/sahil-75/WA_NoSave/')}>
                                    <Text style={localStyles.modalTextLinks}>GitHub</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={{ flexDirection: 'row' }}>
                                <Text style={localStyles.modalText}>Developed By: </Text>
                                <TouchableOpacity activeOpacity={0.7} onPress={() => Linking.openURL('http://sahilkalyani.tech/')}>
                                    <Text style={localStyles.modalTextLinks}>Sahil Kalyani</Text>
                                </TouchableOpacity>
                            </View>
                        </TouchableOpacity>
                    </TouchableOpacity>
                }
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
        paddingVertical: 15,
        paddingHorizontal: 20,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    logo: {
        width: '10%',
        height: '100%',
    },
    headerText: {
        color: "#FFF",
        fontSize: 25
    },
    footer: {
        flexDirection: 'row',
        position: 'absolute',
        bottom: 0,
        width: '100%',
        backgroundColor: "#128C7E",
        paddingVertical: 12,
        alignItems: 'center',
        justifyContent: 'center'
    },
    footerText: {
        color: "#FFF",
        fontSize: 17,
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
        backgroundColor: "#128C7E",
        paddingHorizontal: 15,
        paddingVertical: 7,
        marginTop: 20,
        borderRadius: 5,
        borderWidth: 0.5
    },
    modalBg: {
        top: 0,
        left: 0,
        width: width,
        height: height,
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#121212D9'
    },
    modal: {
        width: 300,
        maxHeight: height / 2,
        paddingVertical: 15,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#292929'
    },
    appLogo: {
        width: '30%',
        height: '30%',
        marginBottom: 20
    },
    modalText: {
        fontSize: 15,
        color: '#FFF',
        marginBottom: 5
    },
    modalTextLinks: {
        fontSize: 15,
        color: '#539bf5',
        fontWeight: 'bold'
    }
});