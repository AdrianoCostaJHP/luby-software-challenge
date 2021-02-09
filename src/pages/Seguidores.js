import React, { useState, useEffect, useContext } from 'react';
import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity, Dimensions} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {AntDesign} from '@expo/vector-icons';

import { Wrapper, Header, HeaderContainer, Title } from '../components/header';
import MyContext from '../contexts/MyContext';
import api from '../services/api';


export default function Seguidores() {
    const { userLogin, dispatch } = useContext(MyContext);
    const navigation = useNavigation();
    const [seguidores, setSeguidores] = useState([]);
    const [seguidoresAcount, setSeguidoresAcount] = useState(0);

    useEffect(() => {
        loadData();
    }, [userLogin])

    async function loadData() {
        try {

            const response = await api.get(`${userLogin}/followers`);
            const seguidores = await api.get(`${userLogin}`);
            const {followers} = seguidores.data;
            setSeguidoresAcount(followers);
            setSeguidores(response.data);

        } catch (error) {
            alert("Ocorreu um erro ao buscar os items");
        }
    }

    function getSave(followerLogin) {
        
        dispatch({
            type: 'loadUserTemp',
            payload: followerLogin.toString()
        })
        
        navigation.navigate('Save');
    }       
        return(
            <>
            <Wrapper>
                <Header>
                    <HeaderContainer>
                        <AntDesign name="arrowleft" size={24} color="#FFF" onPress={()=>{
                            navigation.navigate('Repos');
                        }} />
                    </HeaderContainer>
                        <Title>{seguidoresAcount}  Seguidores</Title>
                        <View />

                </Header>
            </Wrapper>
            <View style={styles.container}>
                <FlatList 
                contentContainerStyle={styles.SeguidoresItem}
                data={seguidores}
                renderItem={(user)=>{
                    return(
                        <View style={styles.listContainer}>
                            <View style={styles.header}>
                                <View style={styles.marker}></View>
                                <Image 
                                    style={styles.avatar} 
                                    source={{uri: `${user.item.avatar_url}`}}
                                />
                            </View>
                            
                                <Text style={styles.itemLogin}>#{user.item.login}</Text>
                                <TouchableOpacity
                                    onPress={ ()=> {getSave(user.item.login)}}
                                >
                                <AntDesign name="arrowright" size={24} color="#FFF"  />
                                </TouchableOpacity>
                            
                </View>
                        )
                    }}
                >
                </FlatList>
            </View> 
            </>
        )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#1c1c1c',
        flex: 1,
    },
    listContainer: {
        backgroundColor: '#1c1c1c',
        
        width: Dimensions.get('window').width,
        borderBottomWidth: 0.4,
        borderBottomColor: '#363636',
        paddingVertical: 35,
        paddingRight: 25,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    SeguidoresItem: {
    },
    itemLogin: {
        color: '#FFF',
        paddingRight: 35,
        fontSize:16,
        fontFamily: 'Nunito_800ExtraBold'
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
    }
    ,
    avatar: {
        width: 70,
        height: 70,
        marginLeft: 15,

        borderRadius: 50,
        borderWidth: 3,
        borderColor: '#FFF'
    },
    marker: {
        width: 10,
        height: 40,
        backgroundColor: "#FFCE00",
        borderTopRightRadius: 8,
        borderBottomRightRadius: 8
    },
})

