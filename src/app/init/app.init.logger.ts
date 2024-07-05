import { LoggingService } from '../error/loggingservice';
import { NotificationService } from '../shared/notification/notification.service';

export function initializeErrorLogger(
    errorLog: LoggingService,
    notificationService: NotificationService
): () => void {
    return () => {
        errorLog.onError.subscribe((error) => {
            notificationService.showError(
                error['message'],
                error['statusText'] ? error['statusText'] : 'Error'
            );
        });
    };
}
