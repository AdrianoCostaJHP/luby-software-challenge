import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {Feather} from '@expo/vector-icons';


const { Navigator, Screen} = createStackNavigator();
const Tab = createBottomTabNavigator();

import Login from './pages/Login';
import Home from './pages/Home';
import Repos from './pages/Repos';
import Seguidores from './pages/Seguidores';
import Seguindo from './pages/Seguindo';


const icons= {
    
    Home: {
        lib: Feather,
        name: 'home',
    },
    Repos: {
        lib: Feather,
        name: 'github',
    },
    Seguidores: {
        lib: Feather,
        name: 'users',
    },
    Seguindo: {
        lib: Feather,
        name: 'users',
    },

}



function MyTabBottom() {
    return (
      <Tab.Navigator
      screenOptions={({ route}) => ({
        tabBarIcon: ({ color, size }) => {
            const { lib: Icon, name } = icons[route.name];
            return <Icon name={name}  size={30} color={color} />

        }
    })}

    tabBarOptions={{
        style: {
            backgroundColor: '#FFF',
            borderTopColor: 'rgba(255, 255,255,0.2)',
            borderTopEndRadius: 20,
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            height: 60,
            
        }
        ,
        labelStyle: {
            fontSize: 17,
            fontFamily: 'Nunito_700Bold',
        },
        activeTintColor: '#000',
        inactiveTintColor: '#A9A9A9',
    }}
>
        <Tab.Screen 
        name="Home" 
        component={Home}
        options = {{
            
        }}
        />
        <Tab.Screen name="Repos" component={Repos} />
        <Tab.Screen name="Seguidores" component={Seguidores} />
        <Tab.Screen name="Seguindo" component={Seguindo} />
      </Tab.Navigator>
      
    );
  }

export default function Routes(){
    return(
        <NavigationContainer>
            <Navigator>
                <Screen
                name="Login"
                component={Login}
                options = {{
                    headerShown: false,
                }}

                />
                <Screen 
                    name="Home"
                    component ={MyTabBottom}
                    options = {{
                        headerShown: false,
                    }}
                />
            </Navigator>
        </NavigationContainer>
    )
}
