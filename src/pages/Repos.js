import React, { useEffect, useState, useContext } from 'react';
import { View, Text, FlatList, StyleSheet, Dimensions } from 'react-native';
import { Wrapper, Header, HeaderContainer, Title } from '../components/header';
import {useNavigation} from '@react-navigation/native';
import {AntDesign, FontAwesome, Feather} from '@expo/vector-icons';
import MyContext from '../contexts/MyContext';
import api from '../services/api';


export default function Repos() {
    
    const navigation = useNavigation();
    const [repositorios, setRepositorios] = useState([]);
    const { userLogin } = useContext(MyContext);

    useEffect(() => {
        loadData();
    }, [userLogin])

    async function loadData() {
        try {
            const response = await api.get(`${userLogin}/repos`);
            setRepositorios(response.data);

        } catch (error) {
            alert("Ocorreu um erro ao buscar os items");
        }
    }

    return (
        <>
            <Wrapper>
                <Header>
                    <HeaderContainer>
                        <AntDesign name="arrowleft" size={24} color="#FFF" onPress={()=>{
                            navigation.navigate('Home');
                        }} />
                    </HeaderContainer>
                        <Title>{repositorios.length}  Repositorios</Title>
                        <View />

                </Header>
            </Wrapper>
            <View style={styles.container}>
                <FlatList
                    contentContainerStyle={styles.reposItem}
                    data={repositorios}
                    renderItem={(userData) => {
                        return (
                            <View style={styles.listContainer}>
                                <View style={styles.header}>
                                    <View style={styles.marker}></View>
                                    <Text style={styles.itemName}>{userData.item.name}</Text>
                                </View>

                                <Text style={styles.itemDescription}>{userData.item.description}</Text>
                                
                                <View style={styles.reposData}>

                                    <View style={styles.reposAcount}>
                                        <FontAwesome name="star-o" size={20} color="yellow" />
                                        <Text style={styles.stars}>{userData.item.stargazers_count}</Text>
                                    </View>

                                    <View style={{ flexDirection:'row'}}>
                                        <Feather name="unlock" size={20} color="green" iconStyle={`marginLeft:30`}  />
                                        <View style={{paddingHorizontal: 5}}></View>
                                        <Feather name="lock" size={20} color="red" />
                                    </View>
                                </View>
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
        borderRadius: 4,
        width: Dimensions.get('window').width,
        borderBottomWidth: 0.4,
        borderBottomColor: '#363636',
        paddingVertical: 35
    },
    reposItem: {

    },
    marker: {
        width: 10,
        height: 30,
        backgroundColor: "#FFCE00",
        borderTopRightRadius: 8,
        borderBottomRightRadius: 8
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
    }
    ,
    itemName: {
        marginLeft: 10,
        color: '#FFF',
        fontSize: 20,
        fontFamily: 'Nunito_700Bold',
    },
    itemDescription: {
        paddingHorizontal: 20,
        marginTop: 8,
        color: '#D3D3D3',
    },
    reposData: {
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        marginTop: 10,
    },

    reposAcount: {
        flexDirection: 'row',
    }
    ,
    stars: {
        color: '#FFF',
        marginLeft: 5,
    },
    lockIcon: {
        marginLeft: 10,
    }
})

