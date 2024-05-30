import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  FlatList,
} from "react-native";
import React from "react";

import { COLORS, SIZES, icons, images, cart, dummyData } from "../constants";
import { useNavigation } from "@react-navigation/native";

const Bag = () => {
  const data = dummyData.cart;
  const numColumns = 2;
  const navigation = useNavigation()

  return (
    <SafeAreaView
      style={{
        flex: 1,
        alignItems: "center",
        //justifyContent: "center",
        backgroundColor: COLORS.black,
      }}
    >
      <Text
        style={{
          marginBottom: SIZES.radius * 3,
          color: COLORS.white,
          fontFamily: "Palatino-Bold",
          fontSize: 30,
          top: 10,
        }}
      >
        My Shopping Bag
      </Text>

      <View
        style={{
          height: 650,
          width: 380,
          backgroundColor: COLORS.white,
          //top: 10,
          borderRadius: SIZES.radius,
          //alignItems: "center",
        }}
      >
        <View
          style={{
            //top: 80,
            backgroundColor: "silver",
            margin: 20,
            borderRadius: SIZES.radius,
            marginTop: 30,
          }}
        >
          <FlatList
            data={data}
            renderItem={({ item, index }) => {
              return (
                <TouchableOpacity
                  onPress={() => navigation.navigate("EachItems", item)}
                  style={{
                    margin: 5,
                    padding: 5,
                    borderColor: "white",
                    borderWidth: 2,
                    borderRadius: SIZES.radius,
                  }}
                >
                  <View
                    style={{
                      //backgroundColor: COLORS.black,
                      padding: SIZES.padding * 0.2,
                      margin: 0,
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <Image
                      source={item.image[0].url}
                      resizeModestyle="contain"
                      style={{
                        height: 120,
                        width: 80,
                        borderColor: COLORS.white,
                        borderWidth: 4,
                        //marginRight: 40,
                      }}
                    />
                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center",
                        //marginTop: 45,
                      }}
                    >
                      <View style={{alignItems: "center",  marginRight: 50,}}>
                      <Text
                        style={{
                         marginBottom: 10,
                          fontSize: 20,
                          fontFamily: "Menlo",
                          color: "white",
                        }}
                      >
                        {item.price}
                      </Text>
                      <Text
                        style={{
                          fontSize: 20,
                          fontFamily: "Menlo",
                          color: "white",
                        }}
                      >
                        {item.size}
                      </Text>
                      </View>

                      <TouchableOpacity
                        style={{
                          alignItems: "center",
                          justifyContent: "center",
                          width: 35,
                          height: 35,
                          borderRadius: 25,
                          backgroundColor: COLORS.transparentBlack,
                          marginRight: 10
                        }}
                      >
                        <Image
                          source={icons.close}
                          resizeMode="contain"
                          style={{
                            width: 20,
                            height: 20,
                            tintColor: COLORS.white,
                          }}
                        />
                      </TouchableOpacity>
                    </View>
                  </View>
                </TouchableOpacity>
              );
            }}
          />
        </View>

        <View
          style={{
            justifyContent: "space-between",
            flexDirection: "row",
            marginLeft: 100,
            marginRight: 100,
            marginTop: 30
          }}
        >
          <Text style={{ fontFamily: "Menlo", fontWeight: "bold", fontSize: 20 }}>Total  </Text>
          <Text style={{ fontFamily: "Menlo", fontWeight: "bold", fontSize: 20 }}>
            $439.98
          </Text>
        </View>

        <View
          style={{
            marginTop: 50,
            //flexDirection: "row",
            justifyContent: "space-evenly",
            marginBottom: 50,
          }}
        >
          <TouchableOpacity
            style={{
              flexDirection: "row",
              alignItems: "center",
              backgroundColor: "black",
              padding: 20,
              marginHorizontal: 20,
              marginBottom: 10,
              borderRadius: SIZES.radius,
              justifyContent: "space-between"
            }}
          >
            
            <Text style={{ color: "white", fontFamily: "Menlo" }}>Use Coupon</Text>
            <Image
              source={icons.gift}
              style={{
                height: 24,
                width: 24,
                tintColor: "grey",
                //marginRight: 15,
              }}
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={{
              flexDirection: "row",
              alignItems: "center",
              backgroundColor: "black",
              padding: 20,
              marginHorizontal: 20,
              borderRadius: SIZES.radius,
              justifyContent: "space-between"
            }}
          >
            <Text style={{ color: "white", fontFamily: "Menlo" }}>
              Proceed to checkout
            </Text>
            <Image
              source={icons.right_arrow}
              style={{
                height: 24,
                width: 24,
                tintColor: "gray",
                //marginRight: 15,
              }}
            />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Bag;

const styles = StyleSheet.create({});
