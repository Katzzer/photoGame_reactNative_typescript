# Photo Game - React Native application with Typescript

## How to run this app:
- Type: `npm start` to start the app
- Use Android or iPhone real device or emulation
- Enable Developer mode in Android (how to do it you can find with Google)
- Go to developer menu and enable debugging mode
- [Allow port 19000 on Windows or Linux](https://stackoverflow.com/questions/43593042/network-response-time-out-error-create-react-native-app-expo)
---

## Run, develop using docker container:
- One downside is that you must enter your host IP manually and PORT into expo go app instead of QR
### Build
- **It can take about 1 minute, because it's fetching dependencies**
- ```sh
  docker build -t photo-game-react-native-ts .
  ```
### Run with default context
- Firstly it'll install npm modules than immediately runs npx expo start.
- You can append whatever cmd from alpine linux after container name e.g. **"sh"** to avoid default behavior
- ```sh
  docker run\
      -it\
      --rm\
      -v $(pwd):/app:rw\
      -p 19000-19005:19000-19005\
      photo-game-react-native-ts
  ```

### Run if using rootles docker
- There you must run container as root because container is mapped to host
using **uidmaps**.

- ***From container perspective you are root but you are running container in your user-namespace only***
- ```sh
  docker run\
      -it\
      --rm\
      -u root\
      -v $(pwd):/app:rw\
      -p 19000-19005:19000-19005\
      photo-game-react-native-ts
  ```
  
## Interesting tutorials:
- [Authentication Form in React Native using React Hook Form](https://www.youtube.com/watch?v=G4jD_u7isXk)
- [AWS Amplify Authentication in React Native (Full tutorial)](https://www.youtube.com/watch?v=EvzLRCDe6VI)
