
import React, { useRef } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { useTabVisibility } from '../../utils/context/TabVisibilityContext';
import { appColors } from '../../utils/colors/index';
import { scaledValue } from '../../utils/designUtils/index';

const TodoApp = ({ navigation }) => {
  const { setIsTabVisible } = useTabVisibility();
  const scrollOffset = useRef(0);

  const handleScroll = (event) => {
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
        keyExtractor={(item) => item}
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


export default TodoApp;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: appColors.white,
  },
  header: {
    paddingVertical: scaledValue(5),
    backgroundColor: appColors.green,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: scaledValue(20),
  },
  title: {
    fontSize: scaledValue(18),
    color: appColors.white,
  },
  plusIcon: {
    height: scaledValue(20),
    width: scaledValue(20),
  },
   item: {
    padding: 20,
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
});

