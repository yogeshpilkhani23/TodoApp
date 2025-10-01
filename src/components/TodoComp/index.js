import {
  Button,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ScrollView,
} from 'react-native';
import { scaledValue } from '../../utils/designUtils';
import { appColors } from '../../utils/colors/index';

const TodoComp = props => {
  console.log('props', props);
  return (
    <TouchableOpacity style={styles.cardBody} onPress={props.delete}>
      <ScrollView>
        <Text style={styles.taskName}>Task Name :- {props.task}</Text>
        <Text style={styles.descriptionName}>
          Description Of Task :- {props.description}
        </Text>
        <View style={styles.btn}>
          <Button title="delete" color="green" onPress={props.delete}></Button>
        </View>
      </ScrollView>
    </TouchableOpacity>
  );
};

export default TodoComp;

const styles = StyleSheet.create({
  cardBody: {
    width: '46%',
    height: scaledValue(240),
    borderWidth: 0.5,
    borderRadius: scaledValue(8),
    overflow: 'hidden',
    borderColor: appColors.green,
    margin: '1%',
    marginTop: scaledValue(10),
  },
  taskName: {
    fontSize: scaledValue(16),
  },
  descriptionName: {
    fontSize: scaledValue(16),
  },
  btn: {
    flexDirection: 'row',
    justifyContent: 'center',
    cursor: 'pointer',
  },
});
