import {Injectable} from '@angular/core';
import {CategoryModel} from '../models/category-model';

@Injectable({
    providedIn: 'root'
})
export class BaseCategoriesService {
    baseCategories: CategoryModel[] = [
        {
            id: 1,
            positive: false,
            icon: 'calculator',
            description: 'Basic'
        },
        {
            id: 2,
            positive: false,
            icon: 'happy',
            description: 'Fun'
        },
        {
            id: 3,
            positive: false,
            icon: 'fitness',
            description: 'Leisure'
        },
        {
            id: 4,
            positive: false,
            icon: 'man',
            description: 'Future'
        },
        {
            id: 5,
            positive: false,
            icon: 'book',
            description: 'Education'
        },
        {
            id: 6,
            positive: false,
            icon: 'gift',
            description: 'Gift'
        },
        {
            id: 7,
            positive: true,
            icon: 'cash',
            description: 'Salary'
        },
    ];

    constructor() {
    }
}
