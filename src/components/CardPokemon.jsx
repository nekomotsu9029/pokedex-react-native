import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Dimensions,
  SafeAreaView,
  ScrollView,
} from "react-native";
import React, { useState } from "react";

import myStyles from "../static/myStyles.json";

const CardPokemon = ({
  currentSprite,
  name,
  types,
  stats,
  abilities,
  moves,
  closeModal,
}) => {
  const [currentTap, setCurrentTap] = useState(1);
  const [zIndexCurrentSprite, setZIndexCurrentSprite] = useState(1);
  const width = Dimensions.get("window").width; //full width
  const height = Dimensions.get("window").height; //full height
  return (
    <View
      style={{
        ...myStyles.bg_light,
      }}
    >
      <TouchableOpacity
        onPress={() => {
          closeModal();
        }}
        style={{
          ...myStyles.bg_dark,
          width: 40,
          position: "absolute",
          left: 10,
          top: 10,
          zIndex: 3,
          borderRadius: 25,
          justifyContent: "center",
          alignItems: "center",
          height: 40,
        }}
      >
        <Text
          style={{
            ...myStyles.text_light,
            justifyContent: "center",
            alignContent: "center",
            fontSize: 20,
            fontWeight: "bold",
          }}
        >
          ←
        </Text>
      </TouchableOpacity>
      <View
        style={{
          ...myStyles.bg_danger,
          marginBottom: 20,
          marginTop: 20,
          marginLeft: 10,
          marginRight: 10,
          borderTopRightRadius: 15,
          borderBottomRightRadius: 15,
          borderTopLeftRadius: 15,
          borderBottomLeftRadius: 15,
          height: height - 40,
          alignItems: "center",
        }}
      >
        <Text
          style={{
            ...myStyles.text_dark,
            fontSize: 72,
            fontWeight: "bold",
            position: "absolute",
            top: 0,
            zIndex: 2 * zIndexCurrentSprite,
          }}
        >
          {name}
        </Text>
        <Text
          style={{
            ...myStyles.text_white,
            fontSize: 70,
            fontWeight: "bold",
            position: "absolute",
            top: 0,
            zIndex: 2 * zIndexCurrentSprite,
          }}
        >
          {name}
        </Text>
        <TouchableOpacity
          onPress={() => {
            setZIndexCurrentSprite(zIndexCurrentSprite * -1);
          }}
        >
          <Image
            style={{
              width: 300,
              height: 300,
            }}
            source={{
              uri: currentSprite,
            }}
          />
        </TouchableOpacity>

        <View
          style={{
            ...myStyles.bg_white,
            borderTopRightRadius: 60,
            borderBottomRightRadius: 15,
            borderTopLeftRadius: 60,
            borderBottomLeftRadius: 15,

            width: width - 20,
            height: height - 340,
          }}
        >
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "row",
            }}
          >
            <TouchableOpacity
              onPress={() => {
                setCurrentTap(1);
              }}
            >
              <Text
                style={{
                  fontSize: 30,
                  marginLeft: 10,
                  marginRight: 10,
                  marginTop: 20,
                  fontWeight: "bold",
                }}
              >
                About
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setCurrentTap(2);
              }}
            >
              <Text
                style={{
                  fontSize: 30,
                  marginLeft: 10,
                  marginRight: 10,
                  marginTop: 20,
                  fontWeight: "bold",
                }}
              >
                Base Stats
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setCurrentTap(3);
              }}
            >
              <Text
                style={{
                  fontSize: 30,
                  marginLeft: 10,
                  marginRight: 10,
                  marginTop: 20,
                  fontWeight: "bold",
                }}
              >
                Moves
              </Text>
            </TouchableOpacity>
          </View>
          {currentTap === 1 && (
            <View
              style={{
                paddingTop: 20,
                paddingLeft: 40,
                paddingRight: 40,
                paddingBottom: 60,
              }}
            >
              <Text style={{ fontSize: 20, marginBottom: 10 }}>
                Types: {types.join(", ")}
              </Text>
              <Text style={{ fontSize: 20, marginBottom: 10 }}>
                Abilities: {abilities.join(", ")}
              </Text>
            </View>
          )}
          {currentTap === 2 && (
            <View
              style={{
                paddingTop: 20,
                paddingLeft: 40,
                paddingRight: 40,
                paddingBottom: 60,
              }}
            >
              {stats.map((item, index) => {
                return (
                  <Text
                    key={`base_stat_${item.name}_${index}`}
                    style={{ fontSize: 20, marginBottom: 10 }}
                  >
                    {item.name}: {item.base}
                  </Text>
                );
              })}
            </View>
          )}
          {currentTap === 3 && (
            <SafeAreaView
              style={{
                paddingTop: 20,
                paddingLeft: 40,
                paddingRight: 40,
                paddingBottom: 60,
              }}
            >
              <ScrollView>
                {moves.map((item, index) => {
                  return (
                    <Text
                      key={`moves_${item}_${index}`}
                      style={{ fontSize: 20, marginBottom: 10 }}
                    >
                      {item}
                    </Text>
                  );
                })}
              </ScrollView>
            </SafeAreaView>
          )}
        </View>
      </View>
    </View>
  );
};

export default CardPokemon;
