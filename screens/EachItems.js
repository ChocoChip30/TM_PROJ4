import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  useWindowDimensions,
  Animated,
  TouchableOpacity,
} from "react-native";
import React, { useReducer, useState } from "react";
import { useRef } from "react";

import { COLORS, SIZES, icons, images } from "../constants";
import SlidingUpPanel from "rn-sliding-up-panel";
import { HeaderBar } from "../components";

const EachItems = ({ route, navigation }) => {
  let _panel = React.useRef(null);

  const [currentIndex, setCurrentIndex] = useState(0);

  const { width } = useWindowDimensions();
  const scrollX = useRef(new Animated.Value(0)).current;

  const viewableItemsChanged = useRef(({ viewableItems }) => {
    setCurrentIndex(viewableItems[0].index);
  }).current;

  const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current;

  const data = route.params;

  function renderDetails() {
    return (
      <SlidingUpPanel
        ref={(c) => (_panel = c)}
        draggableRange={{ top: SIZES.height + 120, bottom: 120 }}
        showBackdrop={false}
        snappingPoints={[SIZES.height + 120]}
        height={SIZES.height + 120}
        friction={0.7}
      >
        <View style={{ flex: 1, backgroundColor: "transparent" }}>
          {/* Panel Header */}
          <View
            style={{
              height: 120,
              backgroundColor: "transparent",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Image
              source={icons.up_arrow}
              style={{ height: 20, width: 20, tintColor: COLORS.grey }}
            />
            <Text style={{ color: COLORS.grey, fontFamily: "Menlo" }}>
              SWIPE FOR DETAILS
            </Text>
          </View>

          {/* Panel Detail */}
          <View
            style={{ flex: 1, top: 300,}}
          >
            <View
              style={{
                backgroundColor: COLORS.transparentBlack2,
                margin: SIZES.margin,
                padding: SIZES.padding,
                height: 600,
                justifyContent: 'center'
              }}
            >

              <Text
                style={{
                  color: COLORS.white,
                  fontFamily: "Menlo",
                  fontSize: 15,
                }}
              >
                {data.description}
              </Text>
              <Text
                style={{
                  color: COLORS.white,
                  fontFamily: "Menlo",
                  marginTop: 10,
                  fontSize: 20
                }}
              >
                $ {data.price}
              </Text>
              <View style={{ marginTop: 50 }}>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-evenly",
                  }}
                >
                  <TouchableOpacity><Text style={{borderColor: 'white', borderWidth: 2, padding: 5, color: "white"}}>XS</Text></TouchableOpacity>
                  <TouchableOpacity><Text  style={{borderColor: 'white', borderWidth: 2, padding: 5, color: "white"}}>S</Text></TouchableOpacity>
                  <TouchableOpacity><Text  style={{borderColor: 'white', borderWidth: 2, padding: 5, color: "white"}}>M</Text></TouchableOpacity>
                  <TouchableOpacity><Text  style={{borderColor: 'white', borderWidth: 2, padding: 5, color: "white"}}>L</Text></TouchableOpacity>
                  <TouchableOpacity><Text  style={{borderColor: 'white', borderWidth: 2, padding: 5, color: "white"}}>XL</Text></TouchableOpacity>
                  <TouchableOpacity><Text  style={{borderColor: 'white', borderWidth: 2, padding: 5, color: "white"}}>XXL</Text></TouchableOpacity>
                </View>
              </View>

              <View style={{marginTop: 60, flexDirection: 'row', justifyContent: 'space-evenly', marginBottom: 50}}>
                <TouchableOpacity style={{flexDirection: 'row', alignItems: 'center', marginRight: 20, marginLeft: 5}}>
                  <Image source={icons.heart} style={{height: 24, width: 24, tintColor: 'pink', marginRight: 15}}/>
                  <Text style={{ color: "white", fontFamily: 'Menlo'}}>Save</Text>
                </TouchableOpacity>

                <TouchableOpacity style={{flexDirection: 'row', alignItems: 'center', marginRight: 5, marginLeft: 20}}>
                  <Image source={icons.bag} style={{height: 24, width: 24, tintColor: 'gray', marginRight: 15}}/>
                  <Text style={{ color: "white", fontFamily: 'Menlo'}}>Add To Bag</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </SlidingUpPanel>
    );
  }

  return (
    <SafeAreaView
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <FlatList
        data={data.image}
        renderItem={({ item, index }) => {
          return (
            <View
              style={{
                backgroundColor: COLORS.black,
                width,
                //height: 600,
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Image
                source={item.url}
                resizeModestyle="contain"
                style={{
                  flex: 1,
                  justifyContent: "center",
                  borderColor: COLORS.black,
                  borderWidth: 5,
                  width,
                }}
              />
            </View>
          );
        }}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        bounces={false}
        keyExtractor={(item) => item.id}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          {
            useNativeDriver: false,
          }
        )}
        scrollEventThrottle={32}
        onViewableItemsChanged={viewableItemsChanged}
        viewabilityConfig={viewConfig}
      />
      <View style={{ height: 30 }}></View>
      <Text style={{ fontSize: 30, fontFamily: "Copperplate", margin: 4 }}>
        {data.name}
      </Text>
      <View style={{ height: 70 }}></View>
      {renderDetails()}
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

export default EachItems;

const styles = StyleSheet.create({});
