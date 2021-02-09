import React, { useEffect, useState, useContext } from 'react';
import { View, Image, StyleSheet, Text, Dimensions, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Wrapper, Header, HeaderContainer, Title } from '../components/header';
import { Feather, AntDesign } from '@expo/vector-icons';
import MyContext from '../contexts/MyContext';
import api from '../services/api';

export default function Save() {
    const navigation = useNavigation();
    const { userTemp, dispatch } = useContext(MyContext);
    const [login, setLogin] = useState('');


    const [name, setName] = useState('');
    const [bio, setBio] = useState('');
    const [avatar, setAvatar] = useState();
    const [location, setLocation] = useState();
    const [repos, setRepos] = useState();
    const [followers, setFollowers] = useState();
    const [following, setFollowing] = useState();

    useEffect(() => {
        setLogin(userTemp);
        getLogin();
    }, [userTemp])


    async function getLogin() {
        try {
            const response = await api.get(`${userTemp}`);
            const { bio, avatar_url, name, location, public_repos, followers, following } = response.data;
            setBio(bio);
            setAvatar(avatar_url);
            setName(name);
            setLocation(location);
            setRepos(public_repos);
            setFollowers(followers);
            setFollowing(following);
        } catch (error) {
            alert("Ocorreu um erro ao recuperar as informações");
        }
    }

    function goToHome(userLogin) {
        dispatch({
          type: 'loadUser',
          payload: userLogin.toString()
        })
        navigation.navigate('Home');
      }

    return (
        <>
            <Wrapper>
                <Header>

                    <HeaderContainer>
                        <AntDesign name="arrowleft" size={24} color="#FFF" onPress={() => {
                            navigation.navigate('Seguidores');
                        }} />
                        
                    </HeaderContainer>
                    <HeaderContainer>
                    <Title style= {styles.title}>#{userTemp}</Title>
                    </HeaderContainer>
                    
                    <HeaderContainer>
                        <Title>Salvar</Title>
                        <Feather name="log-in" size={24} color="green" onPress={() => {
                            goToHome(login);
                        }} />
                    </HeaderContainer>

                </Header>
            </Wrapper>
            <ScrollView style={styles.container}>

                <View style={styles.avatarContainer}>
                    <Image
                        style={styles.avatar}
                        source={{ uri: avatar }}
                    />
                </View>

                <View style={styles.userDados}>
                    <View style={styles.marker}></View>
                    <Text style={styles.userName}>{name}</Text>
                </View>

                <Text style={styles.location}>{location}</Text>

                <View style={styles.dadosContainer}>

                    <View style={styles.dados}>
                        <Text style={styles.number}>{followers}</Text>
                        <Text style={styles.description}>Seguidores</Text>
                    </View>

                    <View style={styles.dados}>
                        <Text style={styles.number}>{following}</Text>
                        <Text style={styles.description}>Seguindo</Text>
                    </View>

                    <View style={styles.dados}>
                        <Text style={styles.number}>{repos}</Text>
                        <Text style={styles.description}>Repos</Text>
                    </View>

                </View>
                <View style={styles.bioContainer}>
                    <View style={styles.marker}></View>
                    <Text style={styles.label}>BIO</Text>
                </View>
                <Text style={styles.bio}>{bio}</Text>
            </ScrollView>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#1c1c1c"

    },
    avatarContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 20,
    },
    userDados: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    avatar: {
        width: 110,
        height: 110,
        borderRadius: 100,
        borderWidth: 3,
        borderColor: '#FFF'
    },
    userName: {
        fontSize: 30,
        fontFamily: 'Nunito_800ExtraBold',
        color: "#FFF",
        marginLeft: 10,
    },
    location: {
        color: "#FFF",
        fontSize: 18,
        paddingHorizontal: 20,

    },
    dadosContainer: {
        backgroundColor: '#363636',

        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        marginTop: 40,

        width: Dimensions.get('window').width,
        height: 100,
    },

    dados: {
        flexDirection: "column",
    },
    marker: {
        width: 10,
        height: 35,
        backgroundColor: "#FFCE00",
        borderTopRightRadius: 8,
        borderBottomRightRadius: 8
    },
    label: {
        fontSize: 24,
        color: "#FFF",
        marginLeft: 10,
        fontFamily: 'Nunito_800ExtraBold'
    },
    bio: {
        fontSize: 18,
        color: "#FFF",
        marginTop: 10,
        paddingHorizontal: 20,
        paddingBottom: 10,
    },
    bioContainer: {
        flexDirection: 'row',
        alignItems: 'stretch',
        marginTop: 60,

    },
    number: {
        fontSize: 30,
        fontFamily: 'Nunito_800ExtraBold',
        color: "#FFF",
    },
    description: {
        fontSize: 18,
        color: "#fff",
    },
    title: {
        marginLeft: 50,
    }
})