import {Dimensions} from 'react-native';
const windowWidth = Dimensions.get('window').width;

const scaleFactor = windowWidth / 375;

export const scaledValue = (value = 0) => value * scaleFactor;