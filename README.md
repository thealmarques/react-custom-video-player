
# JS Video player - React Hooks

Recently I've been working with video elements in Javascript. I've built a multi peer conference application ([Meetjs - source code](https://github.com/thealmarques/meetjs-webrtc-golang)), and I felt that I skipped something regarding this powerful HTML element. What about the simple use cases? For example, serving static videos from a server and playing these videos in the frontend.

In this project, you can find a simple Golang web server where two types of files are served, video files (.mp4 for example) and text files (subtitles in our case). And to finish, a React implementation of a video player, where you can perform basic operations

 - Play/Pause
 - Volume sound slider
 - Subtitle picker
 - Fullscreen

## Demo

<img src="resources/player.gif" height="100%" width="100%"/>

## How to run

    git clone https://github.com/thealmarques/react-custom-video-player
    cd react-custom-video-player

The first step to run my project is to start the golang project, and for that, you need to do the following:

    cd media-server
    go run src/main.go
  Note that the files being served are in location media-server/resources/video/something.mp4 and in media-server/resources/subtitles/en.srt. So if you want to add your custom files you need to add them here.

To start the web application you need to start the React application

    npm install
    npm start
  
  And that's it!
  Note: To change the video file being loaded change the App.js file path.

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.
