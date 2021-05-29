import React, { Component } from 'react';
import { View, StyleSheet, Text, TextInput, TouchableOpacity, Linking, SafeAreaView, Switch, Image, Dimensions } from 'react-native';
import { ColorTheme, countryCodes } from '../utils/constants';

const { height, width } = Dimensions.get('window');

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            countryCode: "+91",
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
            <SafeAreaView style={{ flex: 1, backgroundColor: this.state.isDarkModeEnabled ? ColorTheme.black : ColorTheme.white }}>
                <View style={localStyles.header}>
                    <Text style={localStyles.headerText}>WA_NoSave</Text>
                    <View style={localStyles.switchBox}>
                        <Text>&#x2600;</Text>
                        <Switch
                            trackColor={{ false: ColorTheme.offTrack, true: ColorTheme.onTrack }}
                            thumbColor={ColorTheme.thumbColor}
                            onValueChange={this.toggleTheme}
                            value={this.state.isDarkModeEnabled}
                            style={{ marginLeft: 5 }}
                        />
                        <Text>&#x1F31C;</Text>
                    </View>
                </View>
                <View style={localStyles.container}>
                    <Text style={[localStyles.instructions, { color: this.state.isDarkModeEnabled ? ColorTheme.white : ColorTheme.black }]}>
                        Type your message here and send it to anyone on WhatsApp without having to save their numbers.
                    </Text>

                    <View style={[localStyles.inputGroup, { flexDirection: 'row' }]}>
                        <TextInput
                            editable={false}
                            selectTextOnFocus={false}
                            value={this.state.countryCode}
                            style={[localStyles.input, {
                                flex: 0.2, marginRight: 5, textAlign: 'center', color: ColorTheme.grey,
                                backgroundColor: this.state.isDarkModeEnabled ? ColorTheme.disabledInputDark : ColorTheme.disabledInputLight
                            }]}
                        />

                        <TextInput
                            value={this.state.mobileNumber}
                            onChangeText={(text) => this.handleMobNo(text)}
                            placeholder={"Enter Mobile Number here"}
                            placeholderTextColor={ColorTheme.grey}
                            keyboardType={"numeric"}
                            style={[localStyles.input, { flex: 0.8, marginLeft: 5 }]}
                        />
                    </View>

                    <TextInput
                        value={this.state.messageText}
                        onChangeText={(text) => this.handleMsg(text)}
                        placeholder={"Enter your Message here"}
                        placeholderTextColor={ColorTheme.grey}
                        multiline={true}
                        style={[localStyles.input, { height: 100, width: 300 }]}
                    />

                    <TouchableOpacity style={localStyles.button} onPress={this.openWhatsApp}>
                        <Text style={{ color: ColorTheme.white, fontSize: 15 }}>Send</Text>
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
        backgroundColor: ColorTheme.primary,
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
        color: ColorTheme.white,
        fontSize: 25
    },
    switchBox: {
        padding: 5,
        borderRadius: 10,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: ColorTheme.switchBox,
    },
    instructions: {
        textAlign: "justify",
        fontSize: 15,
    },
    footer: {
        flexDirection: 'row',
        position: 'absolute',
        bottom: 0,
        width: '100%',
        backgroundColor: ColorTheme.primary,
        paddingVertical: 12,
        alignItems: 'center',
        justifyContent: 'center'
    },
    footerText: {
        color: ColorTheme.white,
        fontSize: 17,
    },
    inputGroup: {
        marginVertical: 30,
        height: 45,
        width: 300
    },
    input: {
        height: 45,
        padding: 10,
        marginVertical: 10,
        borderRadius: 5,
        borderWidth: 0.5,
        borderColor: ColorTheme.grey
    },
    button: {
        backgroundColor: ColorTheme.primary,
        paddingHorizontal: 15,
        paddingVertical: 7,
        marginTop: 20,
        borderRadius: 5,
    },
    modalBg: {
        top: 0,
        left: 0,
        width: width,
        height: height,
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: ColorTheme.modalBg
    },
    modal: {
        width: 300,
        maxHeight: height / 2,
        paddingVertical: 15,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: ColorTheme.black
    },
    appLogo: {
        width: '30%',
        height: '30%',
        marginBottom: 20
    },
    modalText: {
        fontSize: 15,
        color: ColorTheme.white,
        marginBottom: 5
    },
    modalTextLinks: {
        fontSize: 15,
        color: ColorTheme.blue,
        fontWeight: 'bold'
    }
});