import React, { useState, useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  SafeAreaView,
  Animated,
  ScrollView,
  Platform,
} from "react-native";

import { dummyData, COLORS, SIZES, FONTS, icons, images } from "../constants";
import { TextButton } from "../components";

const COUNTRIES_ITEM_SIZE = SIZES.width / 3;
const PLACES_ITEM_SIZE =
  Platform.OS === "ios" ? SIZES.width / 1.25 : SIZES.width / 1.2;
const EMPTY_ITEM_SIZE = (SIZES.width - PLACES_ITEM_SIZE) / 2;

const Dashboard = ({ navigation }) => {
  const [countries, setCountries] = useState([
    { id: -1 },
    ...dummyData.fashion,
    { id: -2 },
  ]);
  const countryScrollX = useRef(new Animated.Value(0)).current;

  const [places, setPlaces] = useState([
    { id: -1 },
    ...dummyData.fashion[0].categories,
    { id: -2 },
  ]);
  const placesScrollX = useRef(new Animated.Value(0)).current;

  const [placesScrollPosition, setPlacesScrollPosition] = useState(0);

  function renderHeader() {
    return (
      <View
        style={{
          flexDirection: "row",
          paddingHorizontal: SIZES.padding,
          paddingVertical: SIZES.base,
          alignItems: "center",
        }}
      >
        {/* Hamburger Menu */}
        <TouchableOpacity
          style={{
            width: 45,
            height: 45,
            alignItems: "center",
            justifyContent: "center",
          }}
          onPress={() => console.log("Hamburger")}
        >
          <Image
            source={icons.side_drawer}
            resizeMode="contain"
            style={{ tintColor: COLORS.white, height: 22, width: 25 }}
          />
        </TouchableOpacity>

        {/* TITLE */}
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <Text
            style={{
              color: COLORS.white,
              fontFamily: "Palatino-Bold",
              fontSize: 15,
            }}
          >
            ASIA
          </Text>
        </View>

        {/* PROFILE */}
        <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
          <Image
            source={images.profile_pic}
            resizeMode="contain"
            style={{ width: 45, height: 45, borderRadius: 30 }}
          />
        </TouchableOpacity>
      </View>
    );
  }

  function renderCountries() {
    return (
      <Animated.FlatList
        horizontal
        pagingEnabled
        snapToAlignment="center"
        snapToInterval={COUNTRIES_ITEM_SIZE}
        showsHorizontalScrollIndicator={false}
        scrollEventThrottle={16}
        decelerationRate={0}
        data={countries}
        keyExtractor={(item) => `${item.id}`}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: countryScrollX } } }],
          { useNativeDriver: false }
        )}
        onMomentumScrollEnd={(event) => {
          var position = (
            event.nativeEvent.contentOffset.x / COUNTRIES_ITEM_SIZE
          ).toFixed(0);

          setPlaces([
            { id: -1 },
            ...dummyData.fashion[position].categories,
            { id: -2 },
          ]);
        }}
        renderItem={({ item, index }) => {
          const opacity = countryScrollX.interpolate({
            inputRange: [
              (index - 2) * COUNTRIES_ITEM_SIZE,
              (index - 1) * COUNTRIES_ITEM_SIZE,
              index * COUNTRIES_ITEM_SIZE,
            ],
            outputRange: [0.3, 1, 0.3],
            extrapolate: "clean",
          });

          const mapSIZE = countryScrollX.interpolate({
            inputRange: [
              (index - 2) * COUNTRIES_ITEM_SIZE,
              (index - 1) * COUNTRIES_ITEM_SIZE,
              index * COUNTRIES_ITEM_SIZE,
            ],
            outputRange: [15, Platform.OS === "ios" ? 50 : 30, 15],
            extrapolate: "clean",
          });

          const fontSize = countryScrollX.interpolate({
            inputRange: [
              (index - 2) * COUNTRIES_ITEM_SIZE,
              (index - 1) * COUNTRIES_ITEM_SIZE,
              index * COUNTRIES_ITEM_SIZE,
            ],
            outputRange: [15, 25, 15],
            extrapolate: "clean",
          });

          if (index == 0 || index == countries.length - 1) {
            return (
              <View
                style={{
                  width: COUNTRIES_ITEM_SIZE,
                }}
              />
            );
          } else {
            return (
              <Animated.View
                opacity={opacity}
                style={{
                  height: 130,
                  width: COUNTRIES_ITEM_SIZE,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Animated.Image
                  source={item.image}
                  resizeMode="contain"
                  style={{
                    width: mapSIZE ,
                    height: mapSIZE,
                    tintColor: COLORS.white,
                  }}
                />
                <Animated.Text
                  style={{
                    marginTop: 3,
                    color: COLORS.white,
                    fontFamily: "Copperplate",
                    fontSize: fontSize,
                    fontWeight: "bold",
                  }}
                >
                  {item.name}
                </Animated.Text>
              </Animated.View>
            );
          }
        }}
      />
    );
  }

  function exploreButtonHandler() {
    //get current index
    const currentIndex = parseInt(placesScrollPosition, 10) + 1;

    navigation.navigate("Place", { selectedPlace: places[currentIndex] });
  }

  function renderPlaces() {
    return (
      <Animated.FlatList
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        data={places}
        keyExtractor={(item) => `${item.id}`}
        contentContainerStyle={{
          alignItems: "center",
        }}
        snapToAlignment="center"
        snapToInterval={
          Platform.OS === "ios" ? PLACES_ITEM_SIZE + 28 : PLACES_ITEM_SIZE
        }
        scrollEventThrottle={16}
        decelerationRate={0}
        bounces={false}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: placesScrollX } } }],
          { useNativeDriver: false }
        )}
        onMomentumScrollEnd={(event) => {
          var position = (
            event.nativeEvent.contentOffset.x / PLACES_ITEM_SIZE
          ).toFixed(0);

          setPlacesScrollPosition(position);
        }}
        renderItem={({ item, index }) => {
          const opacity = placesScrollX.interpolate({
            inputRange: [
              (index - 2) * PLACES_ITEM_SIZE,
              (index - 1) * PLACES_ITEM_SIZE,
              index * PLACES_ITEM_SIZE,
            ],
            outputRange: [0.3, 1, 0.3],
            extrapolate: "clean",
          });

          let activeHeight = 0;

          if (Platform.OS === "ios") {
            if (SIZES.height > 800) {
              activeHeight = SIZES.height / 2;
            } else {
              activeHeight = SIZES.height / 1.65;
            }
          } else {
            activeHeight = SIZES.height / 1.6;
          }
          const height = placesScrollX.interpolate({
            inputRange: [
              (index - 2) * PLACES_ITEM_SIZE,
              (index - 1) * PLACES_ITEM_SIZE,
              index * PLACES_ITEM_SIZE,
            ],
            outputRange: [
              SIZES.height / 2.25,
              activeHeight,
              SIZES.height / 2.25,
            ],
            extrapolate: "clean",
          });

          if (index == 0 || index == places.length - 1) {
            return (
              <View
                style={{
                  width: EMPTY_ITEM_SIZE,
                }}
              />
            );
          } else {
            return (
              <Animated.View
                opacity={opacity}
                style={{
                  width: PLACES_ITEM_SIZE,
                  height: height,
                  alignItems: "center",
                  borderRadius: 20,
                  padding: 10,
                }}
              >
                <Image
                  source={item.image[0].url}
                  resizeMode="cover"
                  style={{
                    position: "absolute",
                    width: "100%",
                    height: "100%",
                    borderRadius: 20,
                    borderWidth: 3,
                    borderColor: COLORS.black,
                  }}
                />

                <View
                  style={{
                    flex: 1,
                    alignItems: "center",
                    justifyContent: "flex-end",
                    marginHorizontal: SIZES.padding,
                  }}
                >
                  <Image
                    source={images.shadow}
                    resizeMode="cover"
                    style={{
                      height: 350,
                      width: 350,
                      position: "absolute",
                      bottom: 0,
                      justifyContent: "flex-end",
                      opacity: 0.9
                    }}
                    blurRadius={90}
                  />
                  <Text
                    style={{
                      marginBottom: SIZES.radius * 5,
                      color: COLORS.white,
                      fontFamily: "Palatino-Bold",
                      fontSize: 45,
                    }}
                  >
                    {item.name}
                  </Text>
                  {/* <Text style={{marginBottom: SIZES.padding * 2, textAlign: 'center', color: COLORS.white, fontFamily:'Menlo', fontSize: 12}}>{item.description}</Text> */}
                  <TextButton
                    label="Explore"
                    customContainerStyle={{
                      position: "absolute",
                      bottom: -20,
                      width: 150,
                    }}
                    onPress={() => exploreButtonHandler()}
                  />
                </View>
              </Animated.View>
            );
          }
        }}
      />
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.black }}>
      {renderHeader()}
      <ScrollView
        contentContainerStyle={{
          paddingBottom: Platform.OS === "ios" ? 40 : 0,
        }}
      >
        <View style={{ height: 700 }}>
          {/* COUNTRIES */}
          <View>{renderCountries()}</View>

          {/* PLACES */}
          <View style={{ height: Platform.OS === "ios" ? 500 : 450 }}>
            {renderPlaces()}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Dashboard;
