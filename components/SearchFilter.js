import { FlatList, StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";

import { COLORS, dummyData, SIZES } from '../constants'

const SearchFilter = ({ data, input, setInput }) => {
  const navigation = useNavigation()
  const numColumns = 2;

  return (
    <View>
      <FlatList
        data={data}
        renderItem={({ item }) => {
          if (input === "") {
            return (
              <TouchableOpacity onPress={()=> navigation.navigate("EachItems", item)}>
                <View
                  style={{
                    backgroundColor: COLORS.black,
                    padding: SIZES.padding * 0.2,
                    margin: 0,
                  }}
                >
                  <Image
                    source={item.image[0].url}
                    resizeModestyle="contain"
                    style={{
                      height: 300,
                      width: 200,
                      borderColor: COLORS.black,
                      borderWidth: 4,
                    }}
                  />
                </View>
                
              </TouchableOpacity>
            );
          }
          if (item.name.toLowerCase().includes(input.toLowerCase())) {
            return (
              <TouchableOpacity onPress={()=> navigation.navigate("EachItems", item)}>
                <View
                  style={{
                    backgroundColor: COLORS.black,
                    padding: SIZES.padding * 0.2,
                    margin: 0,
                  }}
                >
                  <Image
                    source={item.image[0].url}
                    resizeModestyle="contain"
                    style={{
                      height: 300,
                      width: 200,
                      borderColor: COLORS.black,
                      borderWidth: 4,
                    }}
                  />
                </View>

              </TouchableOpacity>
            );
          }
        }}
        numColumns={numColumns}
      />
      
    </View>
  );
};

export default SearchFilter;

const styles = StyleSheet.create({});
