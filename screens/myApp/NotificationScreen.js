import React, { useState } from 'react';

import { View, SafeAreaView, StyleSheet, Text } from 'react-native';

import SegmentedControlTab from 'react-native-segmented-control-tab';

export default function NotificationScreen() {

  const [singleIndex, setSingleIndex] = useState(0);

  const [singleIndexBadge, setSingleIndexBadge] = useState(0);

  const [multipleSelectedIndex, setMultipleSelectedIndex] = useState([0]);

  const [customSelectedIndex, setCustomSelectedIndex] = useState(0);

  const updateSingleSegment = (index) => {
    setSingleIndex(index);
  };

  const updateSingleSegmentBadge = (index) => {
    setSingleIndexBadge(index);
  };

  const updateMultipleSegment = (index) => {
    if (multipleSelectedIndex.includes(index)) {
      setMultipleSelectedIndex(
        multipleSelectedIndex.filter((i) => i !== index)
      );
    } else {
      setMultipleSelectedIndex([...multipleSelectedIndex, index]);
    }
  };

  const updateCustomSegment = (index) => {
    setCustomSelectedIndex(index);
  };

  return (
    <SafeAreaView style={stylesSheet.MainContainer}>

      <View style={stylesSheet.MainContainer}>

        <Text style={stylesSheet.titleText}> Single Selection Segment Control </Text>
        <SegmentedControlTab
          values={['Segment One', 'Segment two']}
          selectedIndex={singleIndex}
          tabStyle={{ borderColor: '#48fe01' }}
          activeTabStyle={{ backgroundColor: '#FF3D00' }}
          onTabPress={updateSingleSegment} />

        <View style={stylesSheet.divider} />

        <Text style={stylesSheet.titleText}> Single Selection Segment Control with Badges </Text>
        <SegmentedControlTab
          badges={[10, 20]}
          values={['Segment One', 'Segment two']}
          selectedIndex={singleIndexBadge}
          onTabPress={updateSingleSegmentBadge} />

        <View style={stylesSheet.divider} />

        <Text style={stylesSheet.titleText}> Multiple Selection Segment Control </Text>
        <SegmentedControlTab
          values={['Segment One', 'Segment two', 'Segment Three']}
          multiple
          selectedIndices={multipleSelectedIndex}
          onTabPress={updateMultipleSegment} />

        <View style={stylesSheet.divider} />

        <Text style={stylesSheet.titleText}> Custom Style Segment Control </Text>
        <SegmentedControlTab
          borderRadius={0}
          values={['Tab-1', 'Tab-2', 'Tab-3']}
          selectedIndex={customSelectedIndex}
          onTabPress={updateCustomSegment}
          tabsContainerStyle={{
            height: 45,
            backgroundColor: '#263238'
          }}
          tabStyle={{
            backgroundColor: '#263238',
            borderWidth: 0,
            borderColor: 'transparent',
          }}
          activeTabStyle={{ backgroundColor: '#F5F5F5', marginTop: 2 }}
          tabTextStyle={{ color: '#fff', fontWeight: 'bold', fontSize: 16 }}
          activeTabTextStyle={{ color: '#000', fontSize: 16 }}
        />
        {customSelectedIndex === 0 && (
          <Text style={stylesSheet.tabTextStyle}> Selected Tab = Tab One </Text>
        )}
        {customSelectedIndex === 1 && (
          <Text style={stylesSheet.tabTextStyle}> Selected Tab = Tab Two </Text>
        )}
        {customSelectedIndex === 2 && (
          <Text style={stylesSheet.tabTextStyle}> Selected Tab = Tab Three </Text>
        )}

      </View>

    </SafeAreaView>
  );
};

const stylesSheet = StyleSheet.create({

  MainContainer: {
    flex: 1,
    alignItems: 'center',
    padding: 8,
  },

  titleText: {
    fontSize: 22,
    color: '#000',
    textAlign: 'center',
    padding: 8,
  },

  tabTextStyle: {
    padding: 20,
    color: '#000',
    fontSize: 18,
  },

  divider: {
    alignSelf: 'stretch',
    borderBottomWidth: 1,
    borderBottomColor: '#000',
    marginTop: 20

  }
});