import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import React from "react";

import { COLORS, SIZES, FONTS, icons, images } from "../constants";

const HeaderBar = ({ title, leftOnPress, right, containerStyle }) => {
  return (
    <View
      style={{
        flexDirection: "row",
        paddingHorizontal: SIZES.padding,
        ...containerStyle,
      }}
    >
      {/* BACK */}
      <View style={{ alignItems: "flex-start" }}>
        <TouchableOpacity
          style={{
            alignItems: "center",
            justifyContent: "center",
            width: 50,
            height: 50,
            borderRadius: 25,
            backgroundColor: COLORS.transparentBlack,
          }}
          onPress={leftOnPress}
        >
          <Image
            source={icons.left_arrow}
            resizeMode="contain"
            style={{
              width: 20,
              height: 20,
              tintColor: COLORS.white,
            }}
          />
        </TouchableOpacity>
      </View>

      {/* TITLE */}
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text
          style={{ color: COLORS.white, fontFamily: "Menlo", fontSize: 15 }}
        >
          {title}
        </Text>
      </View>

      {/* SETTINGS */}
      <TouchableOpacity
        style={{
          width: 50,
          height: 50,
          borderRadius: 25,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: right ? COLORS.transparentBlack : null,
        }}
      >
        {right && (
          <Image
            source={icons.settings}
            resizeMode="contain"
            style={{ width: 20, height: 20, tintColor: COLORS.white }}
          />
        )}
      </TouchableOpacity>
    </View>
  );
};

export default HeaderBar;

const styles = StyleSheet.create({});
