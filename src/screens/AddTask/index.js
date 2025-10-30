import { FlatList, StyleSheet, Text, View } from 'react-native';
import React, { useRef } from 'react';
import { appColors } from '../../utils/colors/index';
import { scaledValue } from '../../utils/designUtils/index';
import { useTabVisibility } from '../../utils/context/TabVisibilityContext';

const AddTask = () => {
  const { setIsTabVisible } = useTabVisibility();
  const scrollOffset = useRef(0);

  const handleScroll = event => {
    const currentOffset = event.nativeEvent.contentOffset.y;
    const diff = currentOffset - scrollOffset.current;

    if (Math.abs(diff) < 10) return;

    if (diff > 0) {
      // scrolling down
      setIsTabVisible(false);
    } else {
      // scrolling up
      setIsTabVisible(true);
    }

    scrollOffset.current = currentOffset;
  };

  const data = Array.from({ length: 50 }, (_, i) => `Item ${i + 1}`);

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={data}
        keyExtractor={item => item}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text>{item}</Text>
          </View>
        )}
        onScroll={handleScroll}
        scrollEventThrottle={16}
      />
    </View>
  );
};

export default AddTask;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: appColors.white,
  },
  header: {
    // paddingVertical: scaledValue(10),
    backgroundColor: appColors.green,
    paddingHorizontal: scaledValue(10),
    // justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  title: {
    fontSize: scaledValue(18),
    color: appColors.white,
    textAlign: 'center',
    marginLeft: scaledValue(120),
  },
  input: {
    height: scaledValue(40),
    borderColor: appColors.green,
    borderWidth: 1,
    margin: scaledValue(10),
    paddingHorizontal: scaledValue(10),
    borderRadius: scaledValue(4),
  },
  saveButton: {
    backgroundColor: appColors.green,
    padding: scaledValue(10),
    borderRadius: scaledValue(4),
    textAlign: 'center',
    margin: scaledValue(10),
    color: appColors.white,
    fontSize: scaledValue(16),
    fontWeight: '600',
  },
});
