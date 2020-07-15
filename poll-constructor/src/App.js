import React from 'react';
import data from './shared/data'
import Workspace from './pages/Workspace/Workspace'
import './App.scss';
import 'fontsource-roboto';
function App() {
  return (
    <Workspace poll = {data.poll} />
  );
}

export default App;
