import { Component, OnInit } from '@angular/core';
import moment from 'moment';
import { Email } from '../../models/email';
import { EmailService } from '../../services/email.service';

@Component({
    selector: 'app-page-emails-list',
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
    columns = [
        'CustomerId',
        'ProductName',
        'Domain',
        'SendDate'
    ]

    emails: Email[];

    constructor(private emailService: EmailService) { }

    formatDate(value: Date) {
        return moment(value).startOf('day').format('MMM D, YYYY');
    }

    async ngOnInit() {
        this.emails = await this.emailService.list();
    }
}
