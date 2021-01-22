import React, { useState,useEffect, useContext } from 'react';
import { View, TextInput, Text, Image, StyleSheet, TouchableOpacity, Alert,KeyboardAvoidingView, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import MyContext from '../contexts/MyContext';
import { AntDesign } from '@expo/vector-icons';

import api from '../services/api';

import Logo from '../images/octoPolvo.png';

export default function Login() {

    const {state, dispatch} = useContext(MyContext);
    const navigation = useNavigation();
    const [user, setUser] = useState('');


    async function loginGithub() {

        if(user === ''){
            Alert.alert('OPA!', 'Esse campo é Obrigatório', [
                {text:'Tentar novamente'}
            ])
        }

        const response = await api.get(`${user}`);
        try {
            const { login} = response.data;

            dispatch({
                type: 'loadUser',
                payload: login
            })

            goToHome();
            
        }
        catch (e) {
            console.log("Usuario não encontrado")
        }
    }

    function goToHome() {
        navigation.navigate("Home");
    }
    return (
        <KeyboardAvoidingView enabled={Platform.OS === 'ios'} behavior='padding' style={styles.container}>
            <View style={styles.containerLogo}>
                <Image
                    style={styles.logo}
                    source={Logo}

                />
            </View>
            
            <View style={styles.containerLogin}>
                <TextInput
                    style={styles.input}
                    placeholder="Usuário"
                    placeholderTextColor="#000"
                    autoCapitalize='none'
                    autoCorrect={false}
                    value={user}
                    onChangeText={setUser}
                />

                <TouchableOpacity style={styles.loginButton} onPress={loginGithub}>
                    <Text style={styles.loginText}>ENTRAR</Text>
                    <AntDesign name="arrowright" size={30} color="black" />
                </TouchableOpacity>
            </View>

        </KeyboardAvoidingView>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#151515',
        alignItems: 'center',
        justifyContent: 'center',
    },
    containerLogo: {
        flex: 1,
        justifyContent: 'center',
    },
    containerLogin: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        width: '90%',
        paddingBottom: 50,
    },
    logo: {
        width: 350,
        height: 350,
    },
    input: {
        width: '95%',
        borderRadius: 12,
        backgroundColor: "#FFF",

        fontSize: 17,
        padding: 10,


    },
    loginButton: {
        backgroundColor: '#FFCE00',

        width: '95%',
        height: 45,
        borderRadius: 12,
        marginTop: 20,

        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',


    },
    loginText: {
        fontSize: 18,
        fontFamily: 'Nunito_800ExtraBold',
        paddingHorizontal: 10,


    }

})