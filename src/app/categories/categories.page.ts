import {Component, OnInit} from '@angular/core';
import {LokiJSService} from '../services/loki-js.service';
import {CategoryModel} from '../models/category-model';
import {ModalController} from '@ionic/angular';
import {AddCategoryComponent} from '../components/add-category/add-category.component';

@Component({
    selector: 'app-categories',
    templateUrl: 'categories.page.html',
    styleUrls: ['categories.page.scss']
})
export class CategoriesPage implements OnInit {
    categories: CategoryModel[];
    category: CategoryModel;
    credit = true;
    debit = true;



    constructor(private loki: LokiJSService,
                private modalController: ModalController) {
    }

    async ngOnInit() {
        this.category = new CategoryModel();
        await this.loadCategories();
    }

    async loadCategories() {
        this.categories = await this.loki.getCollection('categories').chain().data();
    }

    async addCategory(cat: CategoryModel) {
        const modal = await this.modalController.create({
            component: AddCategoryComponent,
            cssClass: 'loading-modal-css',
            backdropDismiss: false,
            componentProps: {}
        });
        modal.onDidDismiss().then(() => {
            this.loadCategories();
        });
        return await modal.present();
    }

    async filterCategories() {
        const tempCategories = await this.loki.getCollection('categories').chain().data();
        let positives = [];
        let negatives = [];
        if (this.credit) {
            positives = tempCategories.filter(elem => {
                return elem.positive;
            });
        }
        if (this.debit) {
            negatives = tempCategories.filter(elem => {
                return !elem.positive;
            });
        }
        this.categories = [...negatives, ...positives];
    }
}
