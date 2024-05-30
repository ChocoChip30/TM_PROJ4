import { SafeAreaView, StyleSheet, Text, View, FlatList, TouchableOpacity, Image } from "react-native";
import React from "react";
import { HeaderBar } from "../components";
import { useNavigation } from "@react-navigation/native";
import { COLORS, SIZES, FONTS, icons, images, dummyData } from "../constants";

const Saved = () => {
  const navigation = useNavigation();
  const data = dummyData.allData;
  const numColumns = 2

  return (
    <SafeAreaView
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: COLORS.black,
      }}
    >
      <Text
        style={{
          marginBottom: SIZES.radius * 5,
          color: COLORS.white,
          fontFamily: "Palatino-Bold",
          fontSize: 30,
          top: 60,
        }}
      >
        My Favorites
      </Text>

      <View style={{ marginTop: 10 }}>
        <FlatList
          data={data}
          renderItem={({ item, index }) => {
            return (
              <TouchableOpacity
                onPress={() => navigation.navigate("EachItems", item)}
              >
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
          }}
          numColumns={numColumns}
        />
        <View style={{height: 100}}></View>
      </View>
      

      {/* <View style={{ position: "absolute", top: 10, left: 2 }}>
        <HeaderBar
          title=""
          leftOnPress={() => navigation.goBack()}
          right={false}
          containerStyle={{
            marginTop: SIZES.padding * 1.5,
          }}
        />
      </View> */}
    </SafeAreaView>
  );
};

export default Saved;

const styles = StyleSheet.create({});
