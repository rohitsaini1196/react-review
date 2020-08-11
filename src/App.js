import React from 'react';
import './App.css';
import Reviewer from './components/Reviewer';



function App() {

  const fieldData = [1,2,3,4,5]
  return (
    <div className="App">
    <Reviewer fieldData={fieldData}   />
    </div>
  );
}

export default App;
