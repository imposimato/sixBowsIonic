import {Component, enableProdMode, OnInit} from '@angular/core';

import {Platform} from '@ionic/angular';
import {SplashScreen} from '@ionic-native/splash-screen/ngx';
import {StatusBar} from '@ionic-native/status-bar/ngx';
import {LokiJSService} from './services/loki-js.service';

@Component({
    selector: 'app-root',
    templateUrl: 'app.component.html'
})
export class AppComponent implements OnInit {

    public appPages = [
        {
            title: 'Home',
            url: '/home',
            icon: 'home'
        },
        {
            title: 'Categories',
            url: '/categories',
            icon: 'list'
        },
        {
            title: 'Report',
            url: '/report',
            icon: 'clipboard'
        },
        {
            title: 'Charts',
            url: '/graphics',
            icon: 'pie'
        },
        {
            title: 'Options',
            url: '/options',
            icon: 'settings'
        }
    ];

    constructor(
        private loki: LokiJSService,
        private platform: Platform,
        private splashScreen: SplashScreen,
        private statusBar: StatusBar) {

    }

    async ngOnInit() {
        await this.initializeApp();
    }

    async initializeApp() {
        await this.platform.ready();
        await this.loki.initDB();
        await this.statusBar.styleDefault();
        await this.splashScreen.hide();
        // this.platform.ready().then(() => {
        //     this.statusBar.styleDefault();
        //     this.loki.initDB().then(() => {
        //         this.splashScreen.hide();
        //     });
        // });
    }
}
