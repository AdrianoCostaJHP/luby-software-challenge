import 'react-native-gesture-handler';
import React from 'react';
import Routes from './src/routes';
import { StatusBar } from 'react-native';
import {useFonts} from 'expo-font';
import {Nunito_600SemiBold, Nunito_700Bold, Nunito_800ExtraBold} from '@expo-google-fonts/nunito';
import {ContextProvider} from './src/contexts/MyContext';


export default function App() {
  const [fontsLoaded] = useFonts({
		Nunito_600SemiBold,
		Nunito_700Bold,
		Nunito_800ExtraBold
	});

	if(!fontsLoaded){
		return null;
	}
  return (
	<ContextProvider>
		 <StatusBar barStyle="light-content" backgroundColor="#000"/>
    	<Routes/>
	</ContextProvider>
  );
}


