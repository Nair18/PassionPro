import firebase from 'react-native-firebase';

export default async (message) => {
  // handle your message
  const notification = new firebase.notifications.Notification()
  .setNotificationId(message.messageId)
  .setTitle(message.data.title)
  .setBody(message.data.body)
  .android.setChannelId('test-channel')
  .android.setSmallIcon('ic_launcher')
  .android.setPriority(firebase.notifications.Android.Priority.Max)
  .setSound('default');

  await firebase.notifications().displayNotification(notification);
  console.log({message})
  return Promise.resolve();
}