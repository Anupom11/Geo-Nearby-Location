
import React, {useState} from "react";
import { Text, Button, TextInput, View, ScrollView } from "react-native";
import GetLocation from 'react-native-get-location';

import styles from './component/StyleSheet';

export default CalcLocDistanceScreen=()=> {

    const [latLoc1, setLatLoc1]               = useState('');
    const [longLoc1, setLongLoc1]             = useState('');
    const [latLoc2, setLatLoc2]               = useState('');
    const [longLoc2, setLongLoc2]             = useState('');

    const [distanceVal, setDistanceVal]     = useState('-');

    const submitLocData=()=> {
        if(latLoc1 != '' && longLoc1 != '' && latLoc2 != '' && longLoc2 != '') {
            calcDistOnLocation(latLoc1, longLoc1, latLoc2, longLoc2, response=> {
                setDistanceVal(response);
            });
        }
        else {
            alert("Please enter the details!");
        }
    }

    const calcDistOnLocation=(lat1, long1, lat2, long2, callback)=> {					
		const R = 6371e3;	// radius of earth
			
		const Q1 = lat1 * Math.PI/180;
		const Q2 = lat2 * Math.PI/180;
			
		const q = (lat2-lat1) * Math.PI/180;
		const p = (long2-long1) * Math.PI/180;
			
		const A = Math.sin(q/2) * Math.sin(q/2) + Math.cos(Q1) * Math.cos(Q2) * Math.sin(p/2) * Math.sin(p/2);
			
		const C = 2 * Math.atan2(Math.sqrt(A), Math.sqrt(1-A));
			
		const D = R*C;
        
        if(parseFloat(D) > 1000) {
            callback(parseFloat(D/1000)+" km");
        }
        else {
            callback(D+" m");
        }

    }

    return (
        <>
        <ScrollView>
            <View style={{flex:1, backgroundColor:'#f0faf4'}}>
                <Text style={{fontWeight:'bold', fontSize:18, margin:5, color:'red', alignSelf:'center'}}>Please enter your Geo-Location details</Text>
            
                <View style={{alignSelf:'stretch', margin:5, padding:10, borderColor:'black', borderWidth:2}}>

                    <View style={{alignSelf:'center', margin: 5, flexDirection:'row', }}>
                        <Text style={{color:'black', fontWeight:'bold', alignSelf:'center',}}>Coordinate of 1st location</Text>
                    </View>

                    <View style={{alignSelf:'center', margin: 5, flexDirection:'row', }}>
                        <Text style={{fontWeight:'bold', alignSelf:'center', width:100}}>Latitude: </Text>
                        <TextInput
                            style={styles.input}
                            onChangeText={(val)=> setLatLoc1(val)}
                            value={latLoc1}
                            placeholder="Latitude"
                            keyboardType="number-pad"
                            maxLength={20} />

                    </View>

                    <View style={{alignSelf:'center', margin: 5, flexDirection:'row', }}>
                        <Text style={{fontWeight:'bold', alignSelf:'center', width:100}}>Longitude: </Text>
                        <TextInput
                            style={styles.input}
                            onChangeText={(val)=> setLongLoc1(val)}
                            value={longLoc1}
                            placeholder="Longitude"
                            keyboardType="number-pad"
                            maxLength={20} />

                    </View>
                </View>

                <View style={{alignSelf:'stretch', margin:5, padding:10, borderColor:'black', borderWidth:2}}>

                    <View style={{alignSelf:'center', margin: 5, flexDirection:'row', }}>
                        <Text style={{color:'black', fontWeight:'bold', alignSelf:'center',}}>Coordinate of 2nd location</Text>
                    </View>

                    <View style={{alignSelf:'center', margin: 5, flexDirection:'row', }}>
                        <Text style={{fontWeight:'bold', alignSelf:'center', width:100}}>Latitude: </Text>
                        <TextInput
                            style={styles.input}
                            onChangeText={(val)=> setLatLoc2(val)}
                            value={latLoc2}
                            placeholder="Latitude"
                            keyboardType="number-pad"
                            maxLength={20} />

                    </View>

                    <View style={{alignSelf:'center', margin: 5, flexDirection:'row', }}>
                        <Text style={{fontWeight:'bold', alignSelf:'center', width:100}}>Longitude: </Text>
                        <TextInput
                            style={styles.input}
                            onChangeText={(val)=> setLongLoc2(val)}
                            value={longLoc2}
                            placeholder="Longitude"
                            keyboardType="number-pad"
                            maxLength={20} />

                    </View>
                </View>

                <View style={[styles.button1, {alignSelf:'center', marginTop:20}]}>
                    <Button
                        color="#2196F3"
                        title="Submit"
                        onPress={()=> submitLocData()}/>
                </View>
                
                <View style={styles.seperatorLine}/>

                <View style={styles.distanceDtlSection}>
                    <Text style={{fontSize:18, color:'black', fontWeight:'normal'}}>Arial Distance: {distanceVal}</Text>                    
                </View>

            </View>
        </ScrollView>
        </>
    )
}