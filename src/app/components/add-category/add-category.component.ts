import {Component, OnInit} from '@angular/core';
import {CategoryModel} from '../../models/category-model';
import {ModalController} from '@ionic/angular';
import {LokiJSService} from '../../services/loki-js.service';

@Component({
    selector: 'app-add-category',
    templateUrl: './add-category.component.html',
    styleUrls: ['./add-category.component.scss'],
})
export class AddCategoryComponent implements OnInit {
    icons = [
        'airplane',
        'alarm',
        'american-football',
        'aperture',
        'at',
        'attach',
        'basket',
        'battery-charging',
        'bed',
        'beer',
        'bicycle',
        'boat',
        'bonfire',
        'book',
        'bowtie',
        'briefcase',
        'brush',
        'bus',
        'cafe',
        'camera',
        'car',
        'card',
        'cart',
        'cash',
        'clock',
        'color-palette',
        'egg',
        'film',
        'fitness',
        'football',
        'gift',
        'glasses',
        'globe',
        'headset',
        'heart',
        'home',
        'ice-cream',
        'laptop',
        'mail',
        'moon',
        'musical-notes',
        'paw',
        'people',
        'pint',
        'pizza',
        'pricetag',
        'rainy',
        'restaurant',
        'school',
        'shirt',
        'snow',
        'speedometer',
        'subway',
        'train',
        'trash',
        'trophy',
        'tv',
        'umbrella',
        'videocam',
        'wallet',
        'warning',
        'wine',
    ];
    category: CategoryModel;
    showIcons = false;

    constructor(public modalController: ModalController,
                private loki: LokiJSService) {
    }

    ngOnInit() {
        this.category = new CategoryModel();
    }

    async addCategory() {
        if (this.category.description && this.category.icon) {
            if (!this.category.positive) {
                this.category.positive = false;
            }
            const coll = await this.loki.getCollection('categories').chain().find({description: this.category.description}).data();
            if (coll && coll.length > 0) {
                alert('There\'s already a category with this name');
                return;
            }
            await this.loki.upsert('categories', '$loki', this.category);
            this.modalController.dismiss();
        } else {
            alert('Please inform description and pick an icon');
        }
    }
}
