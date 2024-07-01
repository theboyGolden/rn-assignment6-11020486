import React from 'react';
import { SafeAreaView, View, Text, Image } from 'react-native';

export default function HomeScreen() {
  return (
    <SafeAreaView style={{flex:1, paddingLeft: 10, backgroundColor: '#fff'}}>
        <View style={{flexDirection: 'row', marginTop: 10}}>
            <View style={{paddingTop: 10}}><Text style={{fontSize: 20, fontWeight: '500', fontFamily: 'Verdana', paddingRight: 130, }}>OUR STORY</Text> </View>
            <View style={{marginRight:20, padding: 10, backgroundColor: '#ededed', borderRadius: 30 }}><Image source={require('../assets/thumbnail.png')} style={{height:25, width: 25}}/> </View>
            <View style={{padding: 8, backgroundColor: '#ededed', borderRadius: 30 }}><Image source={require('../assets/filter.png')} style={{height:30, width: 30}}/></View>
        </View>
    </SafeAreaView>
  );
}
