import {Component, OnInit} from '@angular/core';
import {LokiJSService} from '../services/loki-js.service';
import {EntryModel} from '../models/entry-model';

@Component({
    selector: 'app-report',
    templateUrl: './report.page.html',
    styleUrls: ['./report.page.scss'],
})
export class ReportPage implements OnInit {
    entries: EntryModel[];
    totalExpenses = 0;
    totalIncome = 0;

    constructor(private loki: LokiJSService) {
    }

    async ngOnInit() {
        this.entries = await this.loki.getCollection('entries').chain().data();
        await this.findIconsCalculateTotal();
    }

    editEntry(entry: EntryModel) {

    }

    async findIconsCalculateTotal() {
        for (const entry of this.entries) {
            const cat = await this.loki.getCollection('categories').chain().find({description: entry.category}).data()[0];
            entry.icon = cat.icon;
            entry.positive = cat.positive;
            cat.positive ? this.totalIncome += entry.value : this.totalExpenses += entry.value;
        }
    }
}
