import { Injectable, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromNotifications from 'src/app/store/reducers/notification.reducer';
import * as NotificationActions from 'src/app/store/actions/notification.action';

@Injectable({ providedIn: 'root' })
export class NotificationService {
    private notificationStore = inject<Store<fromNotifications.INotificationState>>(Store);

    get Notifications() {
        return this.notificationStore.select(fromNotifications.getNotifications);
    }

    /**
     * Displays success notification message
     * @param {string} message - text message for the notification to display
     * @param {string} header - optional param for setting the notification header.
     * @param {number} duration - optional param for duration setting in milliseconds. Default value is (5000)
     * @param {boolean} animate - optional param to set animation
     */
    showSuccess(
        message: string,
        header?: string,
        duration: number = 5000,
        animate: boolean = true,
        autoHide: boolean = true
    ) {
        this.show(message, header, {
            type: 'success',
            duration: duration,
            animate: animate,
            autoHide: autoHide
        });
    }

    /**
     * Displays warning notification message
     * @param {string} message - text message for the notification to display
     * @param {string} header - optional param for setting the notification header.
     * @param {number} duration - optional param for duration setting in milliseconds. Default value is (5000)
     * @param {boolean} animate - optional param to set animation
     */
    showWarning(
        message: string,
        header?: string,
        duration: number = 5000,
        animate: boolean = true,
        autoHide: boolean = true
    ) {
        this.show(message, header, {
            type: 'warning',
            duration: duration,
            animate: animate,
            autoHide: autoHide
        });
    }

    /**
     * Displays error notification message
     * @param {string} message - text message for the notification to display
     * @param {string} header - optional param for setting the notification header.
     * @param {number} duration - optional param for duration setting in milliseconds. Default value is five minutes
     * @param {boolean} animate - optional param to set animation
     */
    showError(
        message: string,
        header?: string,
        duration: number = 5000,
        animate: boolean = true,
        autoHide: boolean = false
    ) {
        this.show(message, header, {
            type: 'error',
            duration: duration,
            autoHide: autoHide,
            animate: animate
        });
    }

    showStandard(message: string, header?: string, duration: number = 5000, autoHide: boolean = true) {
        this.show(message, header, { duration: duration, autoHide: autoHide });
    }

    private show(text: string, header?: string, options: any = {}) {
        this.notificationStore.dispatch(
            NotificationActions.newNotification({
                notification: { text, header: header, ...options }
            })
        );
    }

    remove(notification: any) {
        this.notificationStore.dispatch(
            NotificationActions.removeNotification({ notification: notification })
        );
    }

    clear() {
        this.notificationStore.dispatch(NotificationActions.clearNotification());
    }
}
