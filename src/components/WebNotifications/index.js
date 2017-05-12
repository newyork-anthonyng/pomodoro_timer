import { PureComponent } from 'react';

class WebNotifications extends PureComponent {
  constructor() {
    super();

    this.notificationSupported = false;
  }

  componentDidMount() {
    if (!('Notification' in window)) {
      // eslint-disable-next-line no-console
      console.error('This browser does not support desktop notification');

    } else if (window.Notification.permission === 'granted') {
      this.notificationSupported = true;

    } else if (window.Notification.permission !== 'denied') {
      window.Notification.requestPermission().then((result) => {
        if (result === 'granted') {
          this.notificationSupported = true;
        }
      });
    }
  }

  createNotification({ title = 'Pomodoro Timer expired', body = '' } = {}) {
    if (!this.notificationSupported) return;

    const options = {
      body,
      requireInteraction: true,
    };
    new window.Notification(title, options);
  }

  render() {
    return null;
  }
}

export default WebNotifications;
