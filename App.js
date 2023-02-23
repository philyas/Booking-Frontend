import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import Datepicker from './components/Datepicker';
import Appointment from './components/Appointment';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


const Stack = createNativeStackNavigator()

export default function App() {


  return (
  <NavigationContainer>
    <SafeAreaView style={{flex:1}}>
      <View style={styles.container}>
        <Stack.Navigator initialRouteName='Datepicker'
         screenOptions={{headerShown:false}}
        >
           <Stack.Screen 
                  name='Datepicker'
                  component={Datepicker}
                />
            <Stack.Screen 
                name="Appointment"
                component={Appointment}
                />
             
        </Stack.Navigator>
        
      <StatusBar style="auto" />
    </View>
    </SafeAreaView>
  </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
});
