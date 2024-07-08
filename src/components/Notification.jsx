import React, { useEffect } from 'react';
import { useNotificationDispatch, useNotificationValue } from "../NotificationContex";
const Notification = ({ bad }) => {
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 5
  }
  const notification = useNotificationValue();
  const dispatch = useNotificationDispatch();
  
  useEffect(() => {
    if (notification) {
      setTimeout(() => {
        dispatch({ type: 'CLEAR_NOTIFICATION' });
      }, 50000);
    }
  }, [notification, dispatch]);

  if (notification&& notification.message.length>0) {
 
      return (
        <div style={style}>
          {notification.message}
        </div>
      );
    
  }

  
};

export default Notification;
