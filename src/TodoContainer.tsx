import React, {useState} from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import dayjs from 'dayjs';
import 'react-native-get-random-values';
import {v4 as uuidv4} from 'uuid';
import LinearGradient from 'react-native-linear-gradient';

import TodoItem from './TodoItem';
import {Todo} from './types';

const initialState: Todo[] = [
  {id: '1', task: 'Buy milk', completed: false},
  {id: '2', task: 'Walk the dog', completed: true},
  {id: '3', task: 'Write article', completed: true},
  {id: '4', task: 'Attend reiew meeting', completed: false},
  {id: '5', task: 'Some other tasks', completed: false},
];

const TodoContainer = () => {
  const [todos, setTodos] = useState<Todo[]>(initialState);
  const [task, setTask] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredTodos = todos.filter(todo =>
    todo.task.toLowerCase().includes(searchTerm.toLowerCase()),
  );
  const completedTodoCount = todos.filter(todo => todo.completed).length;

  const onAddTodo = () => {
    if (task.trim() === '') return;

    const id = uuidv4();
    const newTodo: Todo = {
      id: id,
      task: task,
      completed: false,
    };

    setTodos(todos => {
      return [...todos, newTodo];
    });
    setTask('');
  };

  const onToggleTodo = (id: string) => {
    setTodos(todos => {
      return [
        ...todos.map(todo => {
          if (todo.id === id) {
            todo.completed = !todo.completed;
          }
          return todo;
        }),
      ];
    });
  };

  const onDeleteTodo = (id: string) => {
    setTodos(todos => {
      return [...todos.filter(todo => todo.id !== id)];
    });
  };

  return (
    <View style={styles().container}>
      {/* header */}
      <View style={styles().headerContainer}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <View>
            <Text style={styles().headerTitle}>Hello, Aman!</Text>
            <Text style={styles().headerDate}>
              {dayjs(new Date()).format('MMM D, YYYY')}
            </Text>
          </View>
          <Text style={styles().headerSubtitle}>
            Completed {completedTodoCount}/{todos.length}
          </Text>
        </View>

        <View style={{height: 15}} />

        <TextInput
          placeholder="Search task"
          style={{
            borderWidth: 1,
            borderColor: '#B3B3B3',
            height: 45,
            borderRadius: 10,
            paddingHorizontal: 15,
            color: '#000',
          }}
          onChangeText={setSearchTerm}
          value={searchTerm}
        />
      </View>

      {/* list */}
      <LinearGradient colors={['#53b6ff', '#6f0bff']} style={{flex: 1}}>
        <View style={styles().listContainer}>
          <Text style={{fontWeight: '700', fontSize: 18, color: 'white'}}>
            All Tasks
          </Text>

          <View style={{height: 10}} />

          <FlatList
            data={filteredTodos}
            ItemSeparatorComponent={() => <View style={{height: 10}} />}
            renderItem={({item: todo}) => {
              return (
                <TodoItem
                  todo={todo}
                  onToggleTodo={onToggleTodo}
                  onDeleteTodo={onDeleteTodo}
                />
              );
            }}
          />
        </View>

        {/* input */}
        <View style={styles().inputContainer}>
          <TextInput
            style={{
              backgroundColor: '#fff',
              height: 45,
              flex: 1,
              borderRadius: 10,
              paddingHorizontal: 15,
              fontSize: 18,
              color: '#6f0bff',
            }}
            onChangeText={setTask}
            value={task}
          />
          <View style={{width: 10}} />
          <TouchableOpacity
            onPress={onAddTodo}
            disabled={task.trim() === ''}
            style={{opacity: task.trim() === '' ? 0.5 : 1}}>
            <Icon name="pluscircle" size={40} color={'#ff0b62'} />
          </TouchableOpacity>
        </View>
      </LinearGradient>
    </View>
  );
};

const styles = () =>
  StyleSheet.create({
    container: {height: '100%'},
    headerContainer: {
      backgroundColor: '#fff',
      paddingHorizontal: 20,
      paddingVertical: 10,
    },
    headerTitle: {fontWeight: '700', fontSize: 20, color: '#000'},
    headerDate: {fontSize: 15, color: '959595'},
    headerSubtitle: {fontSize: 15, color: 'black'},
    listContainer: {
      flex: 1,
      paddingHorizontal: 20,
      paddingVertical: 10,
    },
    inputContainer: {
      paddingHorizontal: 20,
      paddingBottom: 10,
      flexDirection: 'row',
      alignItems: 'center',
    },
    input: {
      borderWidth: 1,
      borderColor: '#B3B3B3',
      height: 50,
      flex: 1,
      borderRadius: 999,
      paddingHorizontal: 15,
      color: '#000',
    },
  });

export default TodoContainer;
