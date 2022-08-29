import { View, Text, Modal, Image, TouchableOpacity } from "react-native";
import React, { useState, useEffect } from "react";
import axios from "axios";
import myStyles from "../static/myStyles.json";
import CardPokemon from "./CardPokemon.jsx";

let defaultImgPokemon =
  "https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/Pokebola-pokeball-png-0.png/640px-Pokebola-pokeball-png-0.png";

export default PreviewPokemon = ({ name, url }) => {
  const [sprites, setSprites] = useState({});
  const [artWork, setArtWork] = useState(null);
  const [types, setTypes] = useState([]);
  const [abilities, setAbilities] = useState([]);
  const [moves, setMoves] = useState([]);
  const [stats, setStats] = useState([]);
  const [currentSprite, setCurrentSprite] = useState(defaultImgPokemon);
  const [modalVisible, setModalVisible] = useState(false);

  const setNextPokemonSprite = () => {
    const arrSprites = Object.values(sprites).filter(Boolean);
    const position = arrSprites.indexOf(currentSprite);
    const nextPosition = position + 1;
    if (nextPosition < arrSprites.length) {
      setCurrentSprite(arrSprites[nextPosition]);
    } else {
      setCurrentSprite(arrSprites[0]);
    }
  };

  const getPokemon = () => {
    axios
      .get(url)
      .then((response) => {
        const { sprites, types, abilities, stats, moves } = response.data;
        setArtWork(sprites.other.home.front_default);
        setMoves(moves.map((item) => item.move.name));
        setTypes(types.map((item) => item.type.name));
        setStats(
          stats.map((item) => {
            return {
              name: item.stat.name,
              base: item.base_stat,
            };
          })
        );
        setAbilities(abilities.map((item) => item.ability.name));
        setSprites({
          front_default: sprites.front_default,
          back_default: sprites.back_default,
          front_shiny: sprites.front_shiny,
          back_shiny: sprites.back_shiny,
        });
        setCurrentSprite(sprites.front_default);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    setCurrentSprite(defaultImgPokemon);
    getPokemon();
  }, [name]);

  return (
    <View
      style={{
        ...myStyles.row,
        ...myStyles.bg_white,
        marginBottom: 3,
        marginTop: 3,
        marginLeft: 20,
        marginRight: 20,
        borderTopRightRadius: 15,
        borderBottomRightRadius: 15,
        borderTopLeftRadius: 15,
        borderBottomLeftRadius: 15,
      }}
    >
      <TouchableOpacity
        style={{
          flex: 1,
        }}
        onPress={() => setModalVisible(true)}
      >
        <Text
          style={{
            textAlignVertical: "center",
            textAlign: "center",
            fontSize: 30,
            fontWeight: "bold",
            flex: 1,
            borderTopRightRadius: 50,
            borderBottomRightRadius: 50,
            borderTopLeftRadius: 15,
            borderBottomLeftRadius: 15,
            ...myStyles.bg_danger,
          }}
        >
          {name}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          setNextPokemonSprite();
        }}
      >
        <Image
          style={{
            width: 80,
            height: 80,
          }}
          source={{
            uri: currentSprite,
          }}
        />
      </TouchableOpacity>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <CardPokemon
          name={name}
          types={types}
          abilities={abilities}
          currentSprite={artWork}
          stats={stats}
          moves={moves}
          closeModal={() => {
            setModalVisible(false);
          }}
        />
      </Modal>
    </View>
  );
};
