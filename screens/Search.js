import { StyleSheet, Text, View, SafeAreaView , FlatList, TouchableOpacity, Image, TextInput} from 'react-native'
import React, { useState } from 'react'
import { useNavigation } from "@react-navigation/native";

import { COLORS, dummyData, SIZES, icons } from '../constants'
import { HeaderBar, SearchFilter } from '../components'
import { LogBox } from 'react-native';


LogBox.ignoreLogs(['Warning: Encountered']);
LogBox.ignoreAllLogs()

const Search = () => {
    const navigation = useNavigation()

    const data = dummyData.allData
    const numColumns = 2;

    const [input, setInput] = useState("")
    console.log(input)

  return (
    <View style={{
      flex: 1,
      //marginTop: 30,
      width: "100%",
      backgroundColor: "black"
    }}
    >
     <View style={{
        padding: 10,
        flexDirection: 'row',
        width: "100%",
        borderRadius: SIZES.radius,
        alignItems: 'center',
        marginTop: 50
      }}>
        
      <View style={{marginLeft: 10,  backgroundColor: "grey", width: '95%', padding: 10, borderRadius:SIZES.radius, flexDirection: 'row'}}>
        <Image source={icons.search} style={{height: 20, width: 20, tintColor: 'white', marginRight: 10}}/>
      <TextInput value={input} onChangeText={(text) => setInput(text)} style={{fontSize: 15, color: 'white'}} placeholder='Search'/>
      </View>
      </View> 
      
       <SearchFilter data={data} input={input} setInput={setInput}/> 
       <View style={{height: 200}}></View>
    </View>
  )
}

export default Search

const styles = StyleSheet.create({})