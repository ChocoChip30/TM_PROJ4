import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  FlatList,
  useWindowDimensions,
  Animated,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { useRef } from "react";
import { COLORS, images, icons, SIZES, dummyData } from "../constants";
import { HeaderBar } from "../components";
import { useNavigation } from "@react-navigation/native";

const Profile = () => {
  const navigation = useNavigation();

  const data = dummyData.allData;

  const [currentIndex, setCurrentIndex] = React.useState(0);

  const { width } = useWindowDimensions();
  const scrollX = useRef(new Animated.Value(0)).current;
  const viewableItemsChanged = useRef(({ viewableItems }) => {
    setCurrentIndex(viewableItems[0].index);
  }).current;

  const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current;

  return (
    <SafeAreaView
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: COLORS.black,
      }}
    >
      <View
        style={{
          height: 650,
          width: 380,
          backgroundColor: COLORS.white,
          top: 20,
          borderRadius: SIZES.radius,
          //alignItems: "center",
        }}
      >
        <View style={{ top: 80, alignItems: "center" }}>
          <Text
            style={{
              fontFamily: "Copperplate",
              fontSize: 30,
              fontWeight: "bold",
            }}
          >
            Ahava Todah
          </Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-evenly",
            alignItems: "center",
            top: 80,
            width: "100%",
            marginTop: 10,
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Image
              source={icons.phone}
              style={{ height: 20, width: 20, marginRight: 8 }}
            />
            <Text style={{ fontSize: 10, fontFamily: "Menlo", color: "gray" }}>
              +10 1234567890
            </Text>
          </View>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Image
              source={icons.email}
              style={{ height: 20, width: 20, marginRight: 8 }}
            />
            <Text style={{ fontSize: 10, fontFamily: "Menlo", color: "gray" }}>
              ahavatodah30@gmail.com
            </Text>
          </View>
        </View>

        <View
          style={{
            top: 100,
            alignItems: "center",
            marginBottom: 30,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Image
            source={icons.home}
            style={{ height: 20, width: 20, marginRight: 8, tintColor: "grey" }}
          />
          <Text style={{ fontSize: 10, fontFamily: "Menlo", color: "gray" }}>
            1 Rothschild Blvd Tel Aviv, Israel
          </Text>
        </View>

        <Image
          source={images.shadow}
          resizeMode="cover"
          style={{
            height: 400,
            width: 400,
            position: "absolute",
            bottom: 0,
            justifyContent: "flex-end",
            opacity: 0.2,
          }}
          blurRadius={90}
        />

        <View
          style={{
            top: 80,
            backgroundColor: "silver",
            margin: 20,
            borderRadius: SIZES.radius,
            
          }}
        >
          <TouchableOpacity
            style={{
              margin: 10,
              padding: 10,
              borderColor: "white",
              borderWidth: 2,
              borderRadius: SIZES.radius,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Text
                style={{ fontSize: 15, fontFamily: "Menlo", color: "white" }}
              >
                Points
              </Text>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Image
                  source={icons.shine}
                  style={{
                    height: 25,
                    width: 25,
                    marginRight: 8,
                    tintColor: "white",
                  }}
                />
                <Text
                  style={{ fontSize: 15, fontFamily: "Menlo", color: "white" }}
                >
                  250
                </Text>
              </View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              margin: 10,
              padding: 10,
              borderColor: "white",
              borderWidth: 2,
              borderRadius: SIZES.radius,
            }}
          >
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <Text
                style={{ fontSize: 15, fontFamily: "Menlo", color: "white" }}
              >
                Offers
              </Text>
              <View style={{ flexDirection: "row" }}>
                <Image
                  source={icons.gift}
                  style={{
                    height: 20,
                    width: 20,
                    marginRight: 8,
                    tintColor: "white",
                  }}
                />
                <Text
                  style={{ fontSize: 15, fontFamily: "Menlo", color: "white" }}
                >
                  10
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>

        <View
          style={{
            top: 70,
            margin: 10,
            borderRadius: SIZES.radius,
          }}
        >
          <Text
            style={{
              fontSize: 15,
              fontFamily: "Menlo",
              color: "black",
              margin: 10,
              marginLeft: 25,
            }}
          >
            Recently Purchased
          </Text>
          <FlatList
            data={data}
            renderItem={({ item, index }) => {
              return (
                <TouchableOpacity
                  style={{
                    backgroundColor: COLORS.black,
                    width: 100,
                    height: 200,
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                  onPress={()=> navigation.navigate("EachItems", item)}
                >
                  <Image
                    source={item.image[0].url}
                    resizeModestyle="contain"
                    style={{
                      flex: 1,
                      justifyContent: "center",
                      borderColor: COLORS.black,
                      borderWidth: 5,
                      width: 100,
                      height: 100,
                    }}
                  />
                </TouchableOpacity>
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
            style={{
              marginLeft: 20,
              marginRight: 20,
              marginBottom: 20,
              borderColor: "black",
              borderWidth: 5,
            }}
          />
        </View>
      </View>

      <Image
        source={images.profile_pic}
        style={{
          position: "absolute",
          top: 60,
          height: 150,
          width: 150,
          borderRadius: 90,
        }}
      />

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

export default Profile;

const styles = StyleSheet.create({});
