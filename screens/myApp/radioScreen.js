import React, { Component } from 'react';
import { Text, StyleSheet, View } from 'react-native';
import { RadioButton } from 'react-native-paper';

const products = [
  {
    id: 1,
    title: 'Soft Drinks',
    data: [
      {
        label: 'Coca Cola',
        price: '500 KMF',
      },
      {
        label: 'Fanta',
        price: '250 KMF',
      },
      {
        label: 'Sprite',
        price: '200 KMF',
      },
    ]
  },
  {
    id: 2,
    title: 'Juices',
    data: [
      {
        label: 'Mango',
        price: '500 KMF',
      },
      {
        label: 'Orange',
        price: '250 KMF',
      },
      {
        label: 'Strawberry',
        price: '200 KMF',
      },
    ]
  },
];



export default class DrinkSelector extends Component {

  checkDrink(drink, object) {
    var i;
    for (i = 0; i < object.length; i++) {
      if (object[i].isChecked === 'checked') {
        object[i].isChecked = 'unchecked';
      }
    }
    console.log('radio button checked');
    drink.isChecked = "checked";
    this.setState({ refresh: true });
  }

  render() {
    return (
      <View style={{ flex: 1, padding: 20, backgroundColor: "#f2f2f2" }}>
        {products.map((object, d) =>
          <View key={d} style={{ justifyContent: 'space-between' }}>
            <Text style={{ fontSize: 18, marginBottom: 20 }}>{object.title}</Text>
            {object.data.map((drink, i) =>
              <View key={i} style={styles.drinkCard}>
                <RadioButton  value={drink.price} status={drink.isChecked} onPress={() => this.checkDrink(drink, object.data)} />
                <Text style={{ fontSize: 20, paddingLeft: 10 }}>{drink.label}</Text>
              </View>
            )}
          </View>
        )}
      </View>
    )
  }
}


const styles = StyleSheet.create({
  drinkCard: {
    paddingLeft: 6,
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: 16,
    backgroundColor: 'white',
    height: 55,
    elevation: 1,
    borderRadius: 4,
  }
})