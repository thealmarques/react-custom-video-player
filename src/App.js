import React from 'react';
import './App.scss';
import { Player } from './components/video-player/player';

function App() {
  return (
    <div className="App">
      <Player video="http://localhost:9000/media/umbrella_spotlight.mp4"></Player>
    </div>
  );
}

export default App;
