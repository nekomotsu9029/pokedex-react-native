import {
  ScrollView,
  SafeAreaView,
  Text,
  View,
  StatusBar,
  Dimensions,
  TouchableOpacity,
  Modal,
  ActivityIndicator,
  TextInput,
} from "react-native";
import React, { useState, useEffect } from "react";
import axios from "axios";

import PreviewPokemon from "../components/PreviewPokemon.jsx";
import myStyles from "../static/myStyles.json";
import api from "../static/api.json";

export default MainPokedex = () => {
  const [pokedex, setPokedex] = useState([]);
  const [loading, setLoading] = useState(false);
  const width = Dimensions.get("window").width; //full width
  const height = Dimensions.get("window").height; //full height
  const [modalVisible, setModalVisible] = useState(false);
  const [limit, setLimit] = useState(10);
  const [offset, setOffset] = useState(0);

  const changeValueOffset = (value) => {
    if (value > -1) {
      setOffset(value);
      getPokemonIndex(value);
    }
  };

  const getPokemonIndex = (value = null) => {
    if (!loading) {
      setLoading(true);
      const offsetTemp = value !== null ? value : offset;
      axios
        .get(`${api.base}/pokemon?limit=${limit}&offset=${offsetTemp * limit}`)
        .then((response) => {
          const { results } = response.data;
          setPokedex(results);
          setLoading(false);
        })
        .catch((error) => console.log(error));
    }
  };

  useEffect(() => {
    getPokemonIndex();
  }, []);

  return (
    <SafeAreaView
      style={{
        flex: 1,
        paddingTop: StatusBar.currentHeight,
        paddingBottom: 1,
        ...myStyles.bg_light,
      }}
    >
      {loading && (
        <ActivityIndicator
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: width,
            height: height + StatusBar.currentHeight,
            opacity: 0.7,
            zIndex: 5,
            ...myStyles.bg_light,
          }}
          size="large"
          color={myStyles.bg_danger.backgroundColor}
        />
      )}

      <View
        style={{
          height: 90,
          padding: 20,
          ...myStyles.bg_danger,
          flexDirection: "row",
          marginBottom: 1,
        }}
      >
        <Text
          style={{
            fontSize: 40,
            width: (width * 3) / 4 - 20,
            height: 50,
            fontWeight: "bold",
          }}
        >
          PokeApi
        </Text>
        <TouchableOpacity
          onPress={() => {
            setModalVisible(true);
          }}
          style={{
            width: (width * 1) / 4 - 20,
            height: 50,
            justifyContent: "center",
            alignContent: "center",
          }}
        >
          <Text
            style={{
              fontSize: 20,
              ...myStyles.text_light,
            }}
          >
            settings
          </Text>
        </TouchableOpacity>
      </View>
      <ScrollView>
        {pokedex?.map((item, index) => {
          return (
            <PreviewPokemon
              key={index}
              name={item.name[0].toUpperCase() + item.name.substring(1)}
              url={item.url}
            />
          );
        })}
      </ScrollView>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View
          style={{
            ...myStyles.bg_light,
            position: "absolute",
            width: 200,
            top: height / 2 - 100,
            left: width / 2 - 100,
            padding: 15,
            paddingTop: 40,
            borderRadius: 15,
          }}
        >
          <TouchableOpacity
            onPress={() => {
              setModalVisible(false);
            }}
            style={{
              ...myStyles.bg_dark,
              width: 40,
              position: "absolute",
              left: 0,
              top: 0,
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
          <Text
            style={{
              fontSize: 20,
              justifyContent: "center",
              alignItems: "center",
              alignContent: "center",
            }}
          >
            Limit results per page
          </Text>
          <TextInput
            style={{
              height: 40,
              margin: 12,
              borderWidth: 1,
              padding: 10,
              width: 140,
            }}
            onChangeText={setLimit}
            minLength={0}
            placeholder="Default 10"
            keyboardType="numeric"
          />
          <TouchableOpacity
            onPress={() => {
              getPokemonIndex();
            }}
            style={{
              ...myStyles.bg_danger,
              padding: 10,
              borderRadius: 15,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text>Apply limit</Text>
          </TouchableOpacity>
        </View>
      </Modal>
      <View
        style={{
          height: 35,
          width: width,
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "row",
        }}
      >
        <TouchableOpacity
          onPress={() => {
            changeValueOffset(offset - 1);
          }}
          style={{
            height: 30,
            width: 30,
            ...myStyles.bg_danger,
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 15,
            marginRight: 5,
            marginLeft: 5,
          }}
        >
          <Text style={{ fontWeight: "bold" }}>←</Text>
        </TouchableOpacity>
        <Text style={{ fontWeight: "bold" }}>{offset + 1}</Text>
        <TouchableOpacity
          onPress={() => {
            changeValueOffset(offset + 1);
          }}
          style={{
            height: 30,
            width: 30,
            ...myStyles.bg_danger,
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 15,
            marginRight: 5,
            marginLeft: 5,
          }}
        >
          <Text style={{ fontWeight: "bold" }}>→</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};
