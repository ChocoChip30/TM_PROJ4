import React, { useState } from "react";
import { View, Text, ImageBackground, Image, Animated } from "react-native";

import { COLORS, SIZES, FONTS, icons, images } from "../constants";
import { HeaderBar, TextIconButton } from "../components";
import SlidingUpPanel from "rn-sliding-up-panel";
import ListItems from "./ListItems";

const Place = ({ navigation, route }) => {
  let _panel = React.useRef(null);

  const [selectedPlace, setSelectedPlace] = React.useState();

  React.useEffect(() => {
    let { selectedPlace } = route.params;
    setSelectedPlace(selectedPlace);
  }, []);

  function renderPlace() {
    return (
      <ImageBackground
        source={selectedPlace?.image[0].url}
        style={{
          width: "100%",
          height: "102%",
        }}
      >
        <HeaderBar
          title=""
          leftOnPress={() => navigation.goBack()}
          right={false}
          containerStyle={{
            marginTop: SIZES.padding * 2,
          }}
        />

        <Image
          source={images.shadow}
          resizeMode="cover"
          style={{
            height: 350,
            width: 550,
            position: "absolute",
            bottom: 0,
            justifyContent: "flex-end",
            opacity: 0.9,
          }}
          blurRadius={90}
        />
        
        <View
          style={{
            flex: 1,
            paddingHorizontal: SIZES.padding,
            justifyContent: "flex-end",
            marginBottom: 100,
          }}
        >
          {/* Name and ratings */}
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Text
              style={{
                color: COLORS.white,
                fontFamily: "Palatino-Bold",
                fontSize: 40,
              }}
            >
              {selectedPlace?.name}
            </Text>
          </View>

          <View></View>
          {/* Description */}
          <Text
            style={{
              marginTop: SIZES.base,
              color: COLORS.white,
              fontFamily: "Menlo",
            }}
          >
            {selectedPlace?.description}
          </Text>

          {/* Text icon */}
          <TextIconButton
            icon={icons.plane}
            label="Have a look"
            customContainerStyle={{
              marginTop: SIZES.padding,
              // top: -80,
              // marginLeft: 20,
              // marginRight: 20,
            }}
            onPress={() =>
              navigation.navigate("ListItems", selectedPlace?.items)
            }
          />
        </View>
      </ImageBackground>
    );
  }

  

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      {renderPlace()}
      {/* {renderMap()} */}
    </View>
  );
};

export default Place;
