import React from 'react';
import {StatusBar, View} from 'react-native';

import TodoContainer from './TodoContainer';

const App = () => {
  return (
    <View>
      <StatusBar barStyle="dark-content" backgroundColor="#06d6a0" />
      <TodoContainer />
    </View>
  );
};

export default App;
