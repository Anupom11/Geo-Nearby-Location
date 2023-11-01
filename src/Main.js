
import React, {useState} from "react";
import { Text, Button, TextInput, View, BackHandler, DeviceEventEmitter } from "react-native";
import GetLocation from 'react-native-get-location';

import LocationServicesDialogBox from "react-native-android-location-services-dialog-box";

import styles from '../src/component/StyleSheet';

export default HomeScreen=()=> {

    const [latLoc, setLatLoc]               = useState('');
    const [longLoc, setLongLoc]             = useState('');
    const [enteredLoc, setEnteredLoc]       = useState('0, 0');
    const [currentLoc, setCurrentLoc]       = useState('0, 0');
    const [locNearbyFlag, setLocNearbyFlag] = useState('NO');
    const [distanceVal, setDistanceVal]     = useState('-');

    const submitLocData=()=> {
        if(latLoc != '' && longLoc != '') {
            setEnteredLoc(latLoc+", "+longLoc);
        }
        else {
            alert("Please enter the details!");
        }
    }

    const getGPSCoordinate=()=> {
        GetLocation.getCurrentPosition({
            enableHighAccuracy: true,
            timeout: 60000,
        })
        .then(location => {
            setCurrentLoc(location.latitude+", "+location.longitude);

            calcDistOnLocation(latLoc, longLoc, location.latitude, location.longitude, response=> {
                setDistanceVal(response);
            });
        })
        .catch(error => {
            const { code, message } = error;
            console.warn(code, message);

            if(code === "UNAVAILABLE") {
                checkForGPSService();
            }
        });
    }

    const checkForGPSService=()=> {
        if(Platform.OS === 'android') {
            LocationServicesDialogBox.checkLocationServicesIsEnabled({ 
                message: "<h2>Use Location?</h2> \
                            This app wants to change your device settings:<br/><br/>\
                            Use GPS for location<br/><br/>", 
                ok: "YES", 
                cancel: "NO" 
            }).then(() => { 
                locationTracking(dispatch, getState, geolocationSettings)
            })
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

        //-----------------------------
        if(parseFloat(D) < 10) {
            setLocNearbyFlag("Yes");
        }
        else {
            setLocNearbyFlag("NO");
        }
        //-----------------------------

        if(parseFloat(D) > 1000) {
            callback(parseFloat(D/1000)+" km");
        }
        else {
            callback(D+" m");
        }

    }

    return (
        <>
            <View style={{flex:1, backgroundColor:'#f0faf4'}}>
                <Text style={{fontWeight:'bold', fontSize:18, margin:5, color:'red', alignSelf:'center'}}>Please enter your targeted Geo-Location</Text>
            
                <View style={{alignSelf:'center', margin: 5, flexDirection:'row', }}>
                    <Text style={{fontWeight:'bold', alignSelf:'center', width:100}}>Latitude: </Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={(val)=> setLatLoc(val)}
                        value={latLoc}
                        placeholder="Latitude"
                        keyboardType="number-pad"
                        maxLength={20} />

                </View>

                <View style={{alignSelf:'center', margin: 5, flexDirection:'row', }}>
                    <Text style={{fontWeight:'bold', alignSelf:'center', width:100}}>Longitude: </Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={(val)=> setLongLoc(val)}
                        value={longLoc}
                        placeholder="Longitude"
                        keyboardType="number-pad"
                        maxLength={20} />

                </View>

                <View style={[styles.button1, {alignSelf:'center', marginTop:20}]}>
                    <Button
                        color="#2196F3"
                        title="Submit"
                        onPress={()=> submitLocData()}/>
                </View>
                
                <View style={styles.seperatorLine}/>

                <View style={{alignItems:'flex-start', marginStart:5}}>
                    <Text style={{color:'black', fontWeight:'bold', margin:5}}>Entered Location: {enteredLoc}</Text>
                    {
                        locNearbyFlag == 'Yes' ?
                            <Text style={{color:'green', fontWeight:'bold', margin:5, fontSize:16}}>Nearby Found: {locNearbyFlag}</Text>
                        :
                            <Text style={{color:'red', fontWeight:'bold', margin:5, fontSize:16}}>Nearby Found: {locNearbyFlag}</Text>
                    }
                    
                </View>

                <View style={{flex:1, alignItems:'center', justifyContent:'center', alignSelf:'stretch', borderWidth:1, borderColor:'grey', backgroundColor:'#f3edfa', margin:5, borderRadius:5}}>
                    <Text style={{fontSize:16, color:'black', fontWeight:'normal'}}>Current Location: </Text>
                    <View/>
                    <Text style={{fontSize:20, color:'black', fontWeight:'bold'}}>{currentLoc}</Text>
                    
                    <View style={{margin:10}}/>

                    <Text style={{fontSize:18, color:'black', fontWeight:'normal'}}>Distance: {distanceVal}</Text>
                    
                    <View style={{position:'absolute', bottom:10, width:150, left:'center'}}>
                        <Button color="#2196F3" title="Locate" onPress={()=> getGPSCoordinate()}    />
                    </View>
                    
                </View>

            </View>
        </>
    )
}