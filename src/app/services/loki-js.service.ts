import {Injectable} from '@angular/core';
import * as Loki from 'lokijs';
import * as LokiIndexedAdapter from 'lokijs/src/loki-indexed-adapter';
import {BaseCategoriesService} from './base-categories.service';

@Injectable({
    providedIn: 'root'
})
export class LokiJSService {
    db: any;
    adapter: any;
    isLoaded = false;

    constructor(private baseCategories: BaseCategoriesService) {
    }

    async initDB() {
        await this.setupDatabase();
        if (this.isLoaded) {
            await this.databaseHasBeenLoaded();
        }
    }

    setupDatabase() {
        return new Promise((resolve, reject) => {
            this.adapter = new LokiIndexedAdapter();
            // if (this.platform.is('cordova')) {
            //     this.adapter = new LokiIndexedAdapter();
            // } else {
            //     this.adapter = new LokiIndexedAdapter();
            // }

            const databaseName = 'lokijs';
            // if (window.connectionConfig && window.connectionConfig.database) {
            //     databaseName = window.connectionConfig.database;
            // }

            this.db = new Loki(databaseName,
                {
                    verbose: true,
                    autosave: true,
                    autosaveInterval: 1000,
                    adapter: this.adapter,
                    autoload: true,
                    autoloadCallback: () => {
                        this.isLoaded = true;
                    },
                });
            // this.databaseHasBeenLoaded();

            try {
                const interval = setInterval(() => {
                    if (this.isLoaded) {
                        console.log('autoloadCallback done');
                        clearInterval(interval);
                        resolve(true);
                    }
                }, 100);
            } catch (error) {
                reject(error);
            }

        });
    }

    async databaseHasBeenLoaded() {

        let table = await this.db.getCollection('configuration');

        if (table === null) {
            this.db.addCollection('configuration');
        }

        table = await this.db.getCollection('entries');
        if (table === null) {
            this.db.addCollection('entries');
        }

        table = await this.db.getCollection('categories');

        if (table === null) {
            this.db.addCollection('categories');
        }

        const coll = this.getCollection('categories').chain().data();
        if (coll.length <= 0) {
            this.upsert('categories', '$loki', this.baseCategories.baseCategories);
        }
    }

    getCollection(name: string) {
        return this.db.getCollection(name);
    }

    upsert(collectionName: string, uniqueId: string, data: any) {
        const collection = this.getCollection(collectionName);
        this.upsertfunction(collection, uniqueId, data);
    }

    private upsertfunction(collection: any, uniqueId: string, data: any) {
        let localRec: any;

        if (uniqueId === '$loki') {
            if (data[uniqueId]) {
                localRec = collection.get(data[uniqueId]);
            } else {
                localRec = null;
            }

        } else {
            localRec = collection.by(uniqueId, data[uniqueId]);
        }

        if (localRec) {
            data.$loki = localRec.$loki;
            data.meta = localRec.meta;
            return collection.update(data);
        } else {
            return collection.insert(data);
        }
    }

    async bulkUpsert(collectionName: string, uniqueId: string, dataArray: any []) {
        const collection = this.getCollection(collectionName);

        for (const d of dataArray) {
            await this.upsertfunction(collection, uniqueId, d);
        }

    }
}
