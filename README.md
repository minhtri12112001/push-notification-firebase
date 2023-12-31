# push-notification-firebase

1. Install these packages
   ```
   yarn add @react-native-firebase/app
   yarn add @react-native-firebase/messaging
   yarn add @notifee/react-native
   ```
2. Add these codes to your android/gradle.bundle
   ```
   buildscript{
      //...
      dependencies{
         //...
         classpath 'com.google.gms:google-services:4.3.15'
      }
   }
   def REACT_NATIVE_VERSION = new File(['node', '--print',"JSON.parse(require('fs').readFileSync(require.resolve('react-native/package.json'), 'utf-8')).version"].execute(null, rootDir).text.trim())
   
   allprojects {
       configurations.all {
             resolutionStrategy {
               force "com.facebook.react:react-native:" + REACT_NATIVE_VERSION
             }
       }
   }
   ```
3. Add these codes to your app/gradle.bundle
   ```
   apply plugin: 'com.google.gms.google-services' // <- Add this line
   dependencies{
      //...
      implementation platform('com.google.firebase:firebase-bom:32.2.2')
      implementation 'com.google.firebase:firebase-analytics'
   }
   ```
4. Add this function to your App.tsx
   ```
   const App = () => {
      //...
      useEffect(() => {
       const unsubscribe = messaging().onMessage(async remoteMessage => {
         Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
       });
       return unsubscribe;
      }, []);
   }
   //...
   ```
5. Add this function to your $root/index.js
   ```
   import messaging from '@react-native-firebase/messaging';
   
   messaging().setBackgroundMessageHandler(async remoteMessage => {
     console.log('Message handled in the background!', remoteMessage);
   });
   
   AppRegistry.registerComponent(appName, () => App);
   ```
6. Add this repo to your root folder
7. Add this function to your App.tsx
   ```
   useEffect(() => {
       requestUserPermission();
       notificationListener();
       GetFCMToken();
   }, []);
   ```
8. Finally test in https://testfcm.com/ with your Server Key and your FCM Token
