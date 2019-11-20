import {Component, OnInit} from '@angular/core';
import {CategoryModel} from '../models/category-model';
import {LokiJSService} from '../services/loki-js.service';
import {EntryModel} from '../models/entry-model';
import {AlertController} from '@ionic/angular';

@Component({
    selector: 'app-home',
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
    entry: EntryModel;
    categories: CategoryModel[];
    positive = false;

    constructor(private loki: LokiJSService,
                private alertController: AlertController) {
    }

    async ngOnInit() {
        await this.initEntry();
    }

    async initEntry() {
        this.entry = new EntryModel();
        this.entry.date = new Date();
        await this.filterCategories();
    }

    async addEntry() {
        if (this.entry.value && typeof +this.entry.value === 'number') {
            this.entry.value = +this.entry.value;
            await this.loki.upsert('entries', '$loki', this.entry);
            console.log(this.loki.db);
            this.initEntry();
        } else {
            alert('Please inform a valid value');
        }

        // this.openModal();
    }

    async filterCategories() {
        try {
            this.categories = await this.loki.getCollection('categories').chain().find({positive: this.positive}).data();
            this.entry.category = this.categories[0].description;
        } catch (e) {
            console.log(e);
        }
    }

    async selectDate() {
        const alert = await this.alertController.create({
            header: 'Select Date',
            inputs: [
                {
                    name: 'date',
                    type: 'date',
                    value: this.generateDate(new Date().toISOString())
                },
                {
                    name: 'time',
                    type: 'time',
                    value: this.generateTime(new Date().toISOString())
                }
            ],
            buttons: [
                {
                    text: 'Cancel',
                    role: 'cancel',
                    cssClass: 'secondary',
                    handler: () => {
                        console.log('Confirm Cancel');
                    }
                }, {
                    text: 'Ok',
                    handler: data => {
                        console.log(data);
                        this.entry.date = this.formDate(data.date, data.time);
                    }
                }
            ]
        });
        await alert.present();
    }


    formDate(date: string, time: string): Date {
        const year = date.substr(0, 4);
        const month = date.substr(5, 2);
        const day = date.substr(8, 2);
        const hour = time.substr(0, 2);
        const minute = time.substr(3, 2);

        const resDate = new Date();
        resDate.setFullYear(+year, +month - 1, +day);
        resDate.setHours(+hour, +minute);
        return resDate;
    }

    generateDate(date: string) {
        return date.substr(0, 10);
    }

    generateTime(time: string) {
        return time.substr(11, 2) + ':' + time.substr(14, 2);
    }
}
