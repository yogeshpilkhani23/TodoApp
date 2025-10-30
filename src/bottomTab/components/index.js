import { View, StyleSheet, Image, Animated, Easing } from 'react-native';
import { useLinkBuilder } from '@react-navigation/native';
import { PlatformPressable } from '@react-navigation/elements';
import { scaledValue } from '../../utils/designUtils';
import { appColors } from '../../utils/colors';
import plusIcon from '../../../assests/images/plusIcon.png';
import { useEffect, useRef } from 'react';

const CustomTabBar = ({ state, descriptors, navigation, isVisible }) => {
  const { buildHref } = useLinkBuilder();

  // Animated value for showing/hiding the tab bar
  const translateY = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(translateY, {
      toValue: isVisible ? 0 : 100, // move down 100px to hide
      duration: 250,
      easing: Easing.out(Easing.ease),
      useNativeDriver: true,
    }).start();
  }, [isVisible]);

  const tabImgs = label => {
    if (label === 'TodoApp') {
      return plusIcon;
    }
    if (label === 'AddTask') {
      return plusIcon;
    }
  };

  return (
    <Animated.View style={[styles.bottomTab, { transform: [{ translateY }] }]}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (
          <PlatformPressable
            key={index.toString()}
            href={buildHref(route.name, route.params)}
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarButtonTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={styles.bottomPlatForm}
          >
            <Image
              resizeMode="contain"
              style={styles.img}
              source={tabImgs(label)}
              tintColor={isFocused ? appColors.green : appColors.green}
            />
          </PlatformPressable>
        );
      })}
    </Animated.View>
  );
};
export default CustomTabBar;
const styles = StyleSheet.create({
  bottomTab: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(10,12,18,0.95)',
    position: 'absolute',
    bottom: 0,
    height: scaledValue(70),
    borderTopRightRadius: scaledValue(16),
    borderTopLeftRadius: scaledValue(16),
    width: '100%',
    overflow: 'hidden',
  },
  liveStreaming: {
    width: scaledValue(40),
    height: scaledValue(40),
    position: 'absolute',
    zIndex: 2,
  },
  img: { height: scaledValue(38), width: scaledValue(55) },
  bottomPlatForm: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  blurView: {
    height: scaledValue(30),
    color: appColors.black,
  },
});
