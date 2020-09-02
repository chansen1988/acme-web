import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { OperatorFunction } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { Email } from '../models/email';

@Injectable()
export class EmailService {
    private map: OperatorFunction<Email[], Email[]> = map(i => this.parse(i));

    constructor(private http: HttpClient) { }

    list() {
        return this.http.get(`${environment.apiRoot}/emails`).pipe(this.map).toPromise();
    }

    private parse(emails: Email[]) {
        for (const email of emails) {
            email.SendDate = new Date(email.SendDate);
        }

        return emails;
    }
}