import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  FlatList,
  Image,
} from 'react-native';

import { appColors } from '../../utils/colors/index';
import { scaledValue } from '../../utils/designUtils/index';
import { appRoutes } from '../../utils/routerName/index';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import TodoComp from '../../components/TodoComp/index';
import plusIcon from '../../../assests/images/plusIcon.png';
import { useSelector, useDispatch } from 'react-redux';
import { setList } from '../../store/slice/todoListSlice';

const TodoApp = () => {
  const navigation = useNavigation();
  const cartTodoList = useSelector(state => state.todo.list);
  // console.log('cartTodoList', cartTodoList);
  const dispatch = useDispatch();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Todo App</Text>

        <TouchableOpacity
          onPress={() => {
            navigation.navigate(appRoutes.addTask);
          }}
        >
          <Image
            source={plusIcon}
            style={styles.plusIcon}
            tintColor={appColors.white}
          />
        </TouchableOpacity>
      </View>
      <FlatList
        data={cartTodoList}
        numColumns={2}
        // keyExtractor={item => item?.id}
        renderItem={({ item, index }) => {
          console.log('item', item);
          console.log('index', index);
          return (
            <TodoComp
              task={item.task}
              description={item.description}
              delete={() => {
                dispatch(setList(cartTodoList.filter((_, i) => i !== index)));
              }}
            />
          );
        }}
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
});
