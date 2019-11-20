import {Component, OnInit} from '@angular/core';
import {GoogleChartInterface} from 'ng2-google-charts/google-charts-interfaces';
import {DataForChartsService} from '../services/data-for-charts.service';

@Component({
    selector: 'app-graphics',
    templateUrl: './graphics.page.html',
    styleUrls: ['./graphics.page.scss'],
})
export class GraphicsPage implements OnInit {
    pieChart: GoogleChartInterface;
    columnChart1: GoogleChartInterface;
    dataForPieChart: any;

    constructor(private dataForCharts: DataForChartsService) {
    }

    async ngOnInit() {
        this.dataForPieChart = await this.dataForCharts.dataForPieChart();
        this.loadSimplePieChart();
        this.loadColumnChart();
        console.log(this.dataForCharts.dataForPieChart());
    }

    loadSimplePieChart() {
        this.pieChart = {
            chartType: 'PieChart',
            dataTable: this.dataForPieChart,
            options: {
                title: 'Expenses',
                // height: 600,
                width: '100%',
                is3D: true
            },
        };
    }

    loadColumnChart() {
        this.columnChart1 = {
            chartType: 'ColumnChart',
            dataTable: [
                ['City', '2010 Population'],
                ['New York City, NY', 8175000],
                ['Los Angeles, CA', 3792000],
                ['Chicago, IL', 2695000],
                ['Houston, TX', 2099000],
                ['Philadelphia, PA', 1526000]
            ],
            options: {
                title: 'Population of Largest U.S. Cities',
                // height: 600,
                // chartArea: { height: '400' },
                hAxis: {
                    title: 'Total Population',
                    minValue: 0
                },
                vAxis: {
                    title: 'City'
                }
            },
        };
    }

}
