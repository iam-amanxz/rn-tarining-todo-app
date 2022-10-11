import React, {FC} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/AntDesign';

import {Todo} from './types';

interface Props {
  todo: Todo;
  onDeleteTodo: (id: string) => void;
  onToggleTodo: (id: string) => void;
}

const TodoItem: FC<Props> = ({todo, onToggleTodo, onDeleteTodo}) => {
  return (
    <TouchableOpacity onPress={() => onToggleTodo(todo.id)}>
      <LinearGradient
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}
        colors={['rgba(255, 255, 255, 0.4)', 'rgba(255, 255, 255, 0.05)']}
        style={{
          paddingHorizontal: 20,
          paddingVertical: 10,
          borderRadius: 7,
          borderColor: 'rgba(255, 255, 255, 0.5)',
          borderWidth: 0.5,
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <View style={{flex: 1}}>
          <Text style={styles(todo).text}>{todo.task}</Text>
        </View>
        <TouchableOpacity onPress={() => onDeleteTodo(todo.id)}>
          <Icon name="close" size={15} color="white" />
        </TouchableOpacity>
      </LinearGradient>
    </TouchableOpacity>
  );
};

const styles = (todo: Todo) =>
  StyleSheet.create({
    text: {
      fontSize: 16,
      color: 'white',
      textDecorationStyle: 'solid',
      textDecorationLine: todo.completed ? 'line-through' : 'none',
    },
  });

export default TodoItem;
