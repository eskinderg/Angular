import { Injectable, inject } from '@angular/core';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Preference } from '../models/preference';
import { User } from '../admin/models/user';

const PREFERENCE_API_URL = '/api/preference'; // Use the proxy path

@Injectable({ providedIn: 'root' })
export class PreferenceDataService {
    http = inject(HttpClient);

    getPreference(): Observable<Preference[]> {
        return this.http.get<Preference[]>(PREFERENCE_API_URL);
    }

    getUserInfo(): Observable<User[]> {
        return this.http.get<User[]>(PREFERENCE_API_URL + '/userinfo');
    }

    updateUserInfo(users: User[]): Observable<User[]> {
        return this.http.put<User[]>(PREFERENCE_API_URL + '/update', users);
    }

    bulkUpdatePreference(payload: Preference[]): Observable<Preference[]> {
        return this.http
            .put(PREFERENCE_API_URL, payload)
            .pipe(map((response: Preference[]) => response.map((preference) => new Preference(preference))));
    }

    async getPreference2(): Promise<any> {
        return fetch(PREFERENCE_API_URL);
    }
}
