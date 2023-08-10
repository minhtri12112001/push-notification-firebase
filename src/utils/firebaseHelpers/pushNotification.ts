import messaging from '@react-native-firebase/messaging';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { PermissionsAndroid } from 'react-native';

PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS);

async function requestUserPermission() {
    const authStatus = await messaging().requestPermission();
    const enabled =
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
        console.log('Authorization status:', authStatus);
    }
}

async function GetFCMToken() {
    let fcmToken = await AsyncStorage.getItem('fcmToken');
    if (!fcmToken) {
        try {
            await messaging().registerDeviceForRemoteMessages();
            fcmToken = await messaging().getToken();
            await AsyncStorage.setItem("fcmToken", fcmToken);
        }
        catch (error) {
            console.error('Get FCM Token failed: ', error)
        }
    }
    // await messaging().registerDeviceForRemoteMessages();
    // const fcmToken = await messaging().getToken();
    console.log(fcmToken);

}

async function notificationListener() {
    messaging().onNotificationOpenedApp(remoteMessage => {
        console.log(
            'Notification caused app to open from background state:',
            remoteMessage.notification,
        );

    });

    messaging()
        .getInitialNotification()
        .then(remoteMessage => {
            if (remoteMessage) {
                console.log(
                    'Notification caused app to open from quit state:',
                    remoteMessage.notification,
                );

            }
        });
}


export { requestUserPermission, GetFCMToken, notificationListener }