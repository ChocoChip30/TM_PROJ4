import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import React from "react";

import { COLORS, SIZES, FONTS, images, icons } from "../constants";

const TextIconButton = ({
  label,
  icon,
  customContainerStyle,
  customLabelStyle,
  onPress,
}) => {
  return (
    <TouchableOpacity
      style={{
        flexDirection: "row",
        height: 60,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: SIZES.radius,
        backgroundColor: COLORS.white,
        ...customContainerStyle,
      }}
      onPress={onPress}
    >
      <Text
        style={{
          marginRight: SIZES.base,
          fontFamily: "Copperplate",
          ...customLabelStyle,
        }}
      >
        {label}
      </Text>
      <Image source={icon} style={{width: 25, height: 25}} />
    </TouchableOpacity>
  );
};

export default TextIconButton;

const styles = StyleSheet.create({});
