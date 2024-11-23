import { inject } from '@angular/core';
import { LoggingService } from '../error/loggingservice';
import { NotificationService } from '../shared/notification/notification.service';

export function initializeErrorLogger(): () => void {
    return () => {
        const errorLog: LoggingService = inject(LoggingService);
        const notificationService: NotificationService = inject(NotificationService);
        errorLog.onError.subscribe((error) => {
            notificationService.showError(
                error['message'],
                error['statusText'] ? error['statusText'] : 'Error'
            );
        });
    };
}
