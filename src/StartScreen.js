import React from "react";
import { View, Text, TouchableOpacity } from "react-native";

import styles from '../src/component/StyleSheet';

export default StartScreen=({navigation})=> {

    return (
        <>
            <View style={{flex:1, alignItems:'center', justifyContent:'center',}}>

                <TouchableOpacity style={styles.button2}>
                    <Text style={{fontWeight:"normal", color:'#1369C1', fontSize:18}}>Calculate Distance</Text>
                </TouchableOpacity>

                <View style={{margin:25}}/>

                <TouchableOpacity style={styles.button3} onPress={()=> navigation.navigate('Home')}>
                    <Text style={{fontWeight:"normal", color:'#1369C1', fontSize:18}}>Calculate Nearby</Text>
                </TouchableOpacity>

            </View>
            
        </>
        
    )

}