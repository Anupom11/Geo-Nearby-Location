import React from "react";
import { StyleSheet } from "react-native";

export default styles = StyleSheet.create({
    input: {
        height: 40,
        width: 200,
        borderWidth:1,
        padding: 10
    },
    button1: {
        height: 50,
        width:300,  
    },
    button2: {
        alignItems:'center', 
        justifyContent:'center', 
        alignSelf:'center', 
        borderWidth:2, 
        borderColor:'#1369C1', 
        backgroundColor:'#ffffff', 
        padding:5, 
        margin:2, 
        borderRadius:5, 
        width:200, 
        height:100
    },
    button3: {
        alignItems:'center', 
        justifyContent:'center', 
        alignSelf:'center', 
        borderWidth:2, 
        borderColor:'#1369C1', 
        backgroundColor:'#ffffff', 
        padding:5, 
        margin:2, 
        borderRadius:5, 
        width:200, 
        height:100
    },
    seperatorLine: {
        margin: 10,
        borderBottomColor: 'black',
        borderBottomWidth: StyleSheet.hairlineWidth
    },
    distanceDtlSection: {
        flex:1, 
        height:200, 
        alignItems:'center', 
        justifyContent:'center', 
        alignSelf:'stretch', 
        borderWidth:1, 
        borderColor:'grey', 
        backgroundColor:'#f3edfa', 
        margin:5, 
        borderRadius:5
    }
});

