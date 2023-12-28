import React from "react";
import {
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Platform,
  Alert,
} from "react-native";

const SelectItemsComponent = ({ items, max, selected, selectionUpdated }) => {
  const handleSelectItem = (item) => {
    if (selected.includes(item)) {
      selectionUpdated(selected.filter((i) => i !== item));
    } else if (selected.length < max) {
      selectionUpdated([...selected, item]);
    } else {
      Alert.alert(
        "Maximale Anzahl erreicht",
        `Um die Übersichtlichkeit zu bewahren, können nur maximal ${max} Sender ausgewählt werden.`,
        [{ text: "OK" }],
        { cancelable: false }
      );
    }
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={[styles.item, selected.includes(item.id) && styles.selectedItem]}
      onPress={() => handleSelectItem(item.id)}
    >
      <Text
        style={[styles.text, selected.includes(item.id) && styles.selectedText]}
      >
        {item.name}
      </Text>
    </TouchableOpacity>
  );

  return (
    <FlatList
      data={items}
      renderItem={renderItem}
      keyExtractor={(item, index) => index.toString()}
    />
  );
};

const styles = StyleSheet.create({
  item: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "#ddd",
    backgroundColor: "#fff",
  },
  selectedItem: {
    backgroundColor: Platform.OS === "ios" ? "#007aff" : "#6200ee",
  },
  text: {
    color: "#000",
    fontSize: 16,
  },
  selectedText: {
    color: "#fff",
  },
});

export default SelectItemsComponent;
