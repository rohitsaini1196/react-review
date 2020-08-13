import React from 'react';
import './App.css';
import Reviewer from './components/Reviewer';



function App() {

  const fieldData = ['Speed', 'Value Of Money', 'For Gaming', 'Comfort', 'Thickness']
  return (
    <div className="App">
    <Reviewer fieldData={['Speed', 'Value Of Money', 'For Gaming', 'Comfort', 'Thickness']}   />
    </div>
  );
}

export default App;
