import React from 'react';
import './App.scss';
import { Player } from './components/video-player/player';

function App() {
  return (
    <div className="App">
      <Player video="./assets/video/umbrella_spotlight.mp4"></Player>
    </div>
  );
}

export default App;
