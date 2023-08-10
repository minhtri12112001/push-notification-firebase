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
