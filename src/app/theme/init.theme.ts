import { ThemeService } from './theme.service';
import { Observable } from 'rxjs';

export function initializePreference(themeService: ThemeService): () => Observable<boolean> {
    return () => themeService.initTheme();
}
