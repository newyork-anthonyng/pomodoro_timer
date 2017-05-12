import React from 'react';
import { mount } from 'enzyme';
import WebNotifications from './';

/*
 * Shhh...remove console from jest output
 */
 /* eslint-disable no-console */
console.log = jest.fn();
console.error = jest.fn();
/* eslint-enable no-console */

beforeEach(() => {
  delete window.Notification;
});

describe('Notification is not supported in window', () => {
  it('should do nothing', () => {
    const wrapper = mount(<WebNotifications />);

    expect(() => {
      wrapper.instance().createNotification();
    }).not.toThrow();
  });
});

describe('Notification permission is already granted', () => {
  beforeEach(() => {
    window.Notification = jest.fn();
    window.Notification.permission = 'granted';
  });

  it('should create notification without errors', () => {
    const wrapper = mount(<WebNotifications />);

    expect(() => {
      wrapper.instance().createNotification();
    }).not.toThrow();
    expect(window.Notification).toHaveBeenCalledTimes(1);
  });

  it('should create notification with correct defaults', () => {
    const wrapper = mount(<WebNotifications />);

    wrapper.instance().createNotification();

    expect(window.Notification.mock.calls[0]).toMatchSnapshot();
  });

  it('should pass correct options when creating nofications', () => {
    const wrapper = mount(<WebNotifications />);

    wrapper.instance().createNotification({
      title: 'Batman v Superman',
      body: 'Best movie ever',
    });

    expect(window.Notification.mock.calls[0]).toMatchSnapshot();
  });
});

describe('Notification permission was not denied', () => {
  let requestPermissionPromise;

  beforeEach(() => {
    window.Notification = jest.fn();
    window.Notification.permission = 'something else';

    window.Notification.requestPermission = jest.fn(() => {
      requestPermissionPromise = Promise.resolve();
      return requestPermissionPromise;
    });
  });

  it('should request permission', () => {
    mount(<WebNotifications />);

    expect(window.Notification.requestPermission).toHaveBeenCalledTimes(1);
  });

  it('should create notification without errors, if permission was granted', () => {
    window.Notification.requestPermission = jest.fn(() => {
      return Promise.resolve('granted');
    });
    const wrapper = mount(<WebNotifications />);

    return requestPermissionPromise.then(() => {
      expect(() => {
        wrapper.instance().createNotification();
      }).not.toThrow();
      expect(window.Notification).toHaveBeenCalledTimes(1);
    });
  });

  it('should do nothing if permission was not granted', () => {
    window.Notification.requestPermission = jest.fn(() => {
      return Promise.resolve('something else');
    });
    const wrapper = mount(<WebNotifications />);

    return requestPermissionPromise.then(() => {
      expect(() => {
        wrapper.instance().createNotification();
      }).not.toThrow();
      expect(window.Notification).not.toHaveBeenCalled();
    });
  });
});

describe('Notification permission was denied', () => {
  it('should do nothing', () => {
    window.Notification = jest.fn();
    window.Notification.permission = 'denied';
    const wrapper = mount(<WebNotifications />);

    expect(() => {
      wrapper.instance().createNotification();
    }).not.toThrow();
    expect(window.Notification).not.toHaveBeenCalled();
  });
});
