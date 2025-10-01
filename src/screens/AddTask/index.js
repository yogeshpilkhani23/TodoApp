import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { appColors } from '../../utils/colors/index';
import { scaledValue } from '../../utils/designUtils/index';
import { useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useSelector, useDispatch } from 'react-redux';
import { setList } from '../../store/slice/todoListSlice';
import { collection, addDoc } from 'firebase/firestore';
import { db } from './../../../firebase';

const AddTask = () => {
  const navigation = useNavigation();
  const [task, setTask] = useState('');
  console.log('task', task);
  const [description, setDescription] = useState('');
  const dispatch = useDispatch();
  const todoList = useSelector(state => state.todo.list);
  console.log('todoList', todoList);

  const save = async () => {
    try {
      dispatch(setList([{ task, description, completed: false }, ...todoList]));
      navigation.goBack();
    } catch (error) {
      console.log('Error saving task:', error);
      alert('Error saving task!');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Ionicons
          name="arrow-back-circle-outline"
          size={27}
          color="black"
          onPress={() => {
            navigation.goBack();
          }}
        />
        <Text style={styles.title}>Add Task</Text>
      </View>
      <View>
        <TextInput
          style={styles.input}
          placeholder="Add a new task...."
          onChangeText={e => setTask(e)}
          value={task}
        />
      </View>
      <View>
        <TextInput
          style={styles.input}
          placeholder="Add the description....."
          onChangeText={e => setDescription(e)}
          value={description}
        />
      </View>
      <TouchableOpacity onPress={save}>
        <Text style={styles.saveButton}>Save</Text>
      </TouchableOpacity>
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
