import {Injectable} from '@angular/core';
import {LokiJSService} from './loki-js.service';
import {EntryModel} from '../models/entry-model';

@Injectable({
    providedIn: 'root'
})
export class DataForChartsService {
    dataTable: [
        ['Task', 'Hours per Day'],
        ['Work', 11],
        ['Eat', 2],
        ['Commute', 2],
        ['Watch TV', 2],
        ['Sleep', 7]
        ];

    constructor(private loki: LokiJSService) {
    }

    async dataForPieChart() {
        const categories = await this.loki.getCollection('categories').chain().data();
        let entries;
        const result = [['Category', 'Spent']];
        for (const cat of categories) {
            let total = 0;
            if (!cat.positive) {
                entries = await this.loki.getCollection('entries').chain().find({category: cat.description}).data() as EntryModel[];
                if (entries && entries.length > 0) {
                    for (const entry of entries) {
                        total += entry.value;
                    }
                    result.push([cat.description, total]);
                }
            }
        }
        console.log(result);
        return result;
    }
}
