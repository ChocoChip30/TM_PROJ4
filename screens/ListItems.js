import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";

import { COLORS, SIZES, dummyData } from "../constants";
import { HeaderBar } from "../components";

const ListItems = ({ route }) => {
  const navigation = useNavigation();
  const numColumns = 2;
  const data = route.params;
  renderItem = ({ item, index }) => {};

  return (
    <SafeAreaView
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: COLORS.black,
      }}
    >
      <View style={{ marginTop: 0 }}>
        <FlatList
          data={data}
          renderItem={({ item, index }) => {
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
          }}
          numColumns={numColumns}
        />
      </View>
      <View style={{ position: "absolute", top: 10, left: 2 }}>
        <HeaderBar
          title=""
          leftOnPress={() => navigation.goBack()}
          right={false}
          containerStyle={{
            marginTop: SIZES.padding * 2,
          }}
        />
      </View>
    </SafeAreaView>
  );
};

export default ListItems;

const styles = StyleSheet.create({});
