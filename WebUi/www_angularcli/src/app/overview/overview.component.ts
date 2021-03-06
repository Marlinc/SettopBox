import { Component, OnInit } from '@angular/core';

import { SettopboxService } from '../settopbox.service';
import { Channel } from '../models';

@Component({
    selector: 'app-overview',
    templateUrl: './overview.component.html',
    styleUrls: ['./overview.component.css']
})
export class OverviewComponent implements OnInit {

    channels: Channel[];
    search: string;
    loading: boolean;

    constructor(private settopboxService: SettopboxService) { }

    ngOnInit() {
        this.loading = true;
        this.settopboxService.get().then(response => {
            this.channels = response;
            this.loading = false;
        }).catch(r => {
            this.loading = false;
        });
    }

    visible(channel: Channel) {
        if (!this.search) return '';
        if (channel.Name.toLowerCase().indexOf(this.search.toLowerCase()) === -1) return 'hide';
        return '';
    }

    clear() {
        this.search = '';
    }
}
