/*
 Template Name: Epoch - Bootstrap 4 Admin Dashboard
 Author: Mannatthemes
 Website: www.mannatthemes.com
 File:Dashboard init js
 */

!function($) {
    "use strict";

    var Dashboard = function() {};
    

    //creates area chart
    Dashboard.prototype.createAreaChart = function(element, pointSize, lineWidth, data, xkey, ykeys, labels, lineColors) {
        Morris.Area({
            element: element,
            pointSize: 3,
            lineWidth: 2,
            data: data,
            xkey: xkey,
            ykeys: ykeys,
            labels: labels,
            resize: true,
            hideHover: 'auto',
            gridLineColor: '#eef0f2',
            lineColors: lineColors,
            fillOpacity: 0.1,
            xLabelMargin: 10,
            yLabelMargin: 10,
            grid: false,
            axes: false,
            pointSize: 0
        });
    },
  
    //creates Bar chart
    Dashboard.prototype.createBarChart  = function(element, data, xkey, ykeys, labels, lineColors) {
        Morris.Bar({
            element: element,
            data: data,
            xkey: xkey,
            ykeys: ykeys,
            labels: labels,
            gridLineColor: '#eef0f2',
            barSizeRatio: 0.4,
            resize: true,
            hideHover: 'auto',
            barColors: lineColors,
            fillOpacity: 0.1,
            grid: false,
            axes: false,
        });
    },

    Dashboard.prototype.init = function () {
        
        //nice scroll
        $("#boxscroll").niceScroll({cursorborder:"",cursorcolor:"#cecece",boxzoom:true});
        $("#boxscroll2").niceScroll({cursorborder:"",cursorcolor:"#cecece",boxzoom:true}); 
       
        //stacked chart
        c3.generate({
            bindto: '#chart-stacked',
            data: {
                columns: [
                    ['Revenue', 130, 120, 150, 140, 160, 150, 130, 120, 150, 140, 160, 150],
                    ['Pageview', 200, 130, 90, 240, 130, 220, 200, 130, 90, 240, 130, 220]
                ],
                types: {
                    Revenue: 'area-spline',
                    Pageview: 'area-spline'
                    // 'line', 'spline', 'step', 'area', 'area-step' are also available to stack
                },
                colors: {
                    Revenue: '#f9b527',
                    Pageview: '#36c1a5'
                }
            }
        });
        
        //Donut Chart
        c3.generate({
             bindto: '#donut-chart',
            data: {
                columns: [
                    ['Laptops', 78],
                    ['Computers', 55],
                    ['Iphones', 40],
                    ['Tablets', 25]
                ],
                type : 'donut'
            },
            donut: {
                title: "Candidates",
                width: 30,
				label: { 
					show:false
				}
            },
            color: {
            	pattern: ['#5ff4d1', "#59dedd", '#52c3eb', '#5b9fe9']
            }
        });

         //map

         $('#world-map-markers').vectorMap({
            map : 'world_mill_en',
            scaleColors : ['#52c3eb', '#52c3eb'],
            normalizeFunction : 'polynomial',
            hoverOpacity : 0.7,
            hoverColor : false,
            regionStyle : {
                initial : {
                    fill : '#56b2bf'
                }
            },
            markerStyle: {
                initial: {
                    r: 9,
                    'fill': '#52c3eb',
                    'fill-opacity': 0.9,
                    'stroke': '#fff',
                    'stroke-width' : 7,
                    'stroke-opacity': 0.4
                },

                hover: {
                    'stroke': '#fff',
                    'fill-opacity': 1,
                    'stroke-width': 1.5
                }
            },
            backgroundColor : 'transparent',
            markers : [ {
                latLng : [7.11, 171.06],
                name : 'Marshall Islands'
            }, {
                latLng : [17.3, -62.73],
                name : 'Saint Kitts and Nevis'
            }, {
                latLng : [3.2, 73.22],
                name : 'Maldives'
            }, {
                latLng : [35.88, 14.5],
                name : 'Malta'
            }, {
                latLng : [12.05, -61.75],
                name : 'Grenada'
            }, {
                latLng : [13.16, -61.23],
                name : 'Saint Vincent and the Grenadines'
            }, {
                latLng : [13.16, -59.55],
                name : 'Barbados'
            }, {
                latLng : [-4.61, 55.45],
                name : 'Seychelles'
            },  {
                latLng : [14.01, -60.98],
                name : 'Saint Lucia'
            }, {
                latLng : [1.3, 103.8],
                name : 'Singapore'
            }, {
                latLng : [15.3, -61.38],
                name : 'Dominica'
            }, {
                latLng : [26.02, 50.55],
                name : 'Bahrain'
            }]
        });

        //creating area chart
        var $areaData = [
            {y: '2011', a: 10, b: 15},
            {y: '2012', a: 30, b: 35},
            {y: '2013', a: 10, b: 25},
            {y: '2014', a: 55, b: 45},
            {y: '2015', a: 30, b: 20},
            {y: '2016', a: 40, b: 35},
            {y: '2017', a: 10, b: 25},
            {y: '2018', a: 25, b: 30}
        ];
        this.createAreaChart('morris-area-chart', 0, 0, $areaData, 'y', ['a'], ['Series A'], ['#04cbe2']);

       
        //creating bar chart
        var $barData = [
            {y: 'January', a: 100, b: 90},
            {y: 'February', a: 75, b: 65},
            {y: 'March', a: 50, b: 40},
            {y: 'April', a: 75, b: 65},
            {y: 'May', a: 50, b: 40},
            {y: 'June', a: 75, b: 65},
            {y: 'July', a: 100, b: 90},
            {y: 'August', a: 90, b: 75}
        ];
        this.createBarChart('morris-bar-example', $barData, 'y', ['a', 'b'], ['$', 'Sales'], ['#52c3eb', '#5ff4d1']);

         //Pie Chart
         c3.generate({
            bindto: '#pie-chart',
           data: {
               columns: [
                   ['Rome', 78],
                   ['Paris', 55],
                   ['London', 40],
                   ['Belgium', 25],
                   ['New York', 24]
               ],
               type : 'pie'
           },
           color: {
               pattern: ['#04d0e7', "#5ff4d1", '#5b9fe9', '#fde0a5','#c8f0ad']
           },
           pie: {
               label: {
                 show: false
               }
           }
       });
    },
    $.Dashboard = new Dashboard, $.Dashboard.Constructor = Dashboard

}(window.jQuery),

//initializing 
function($) {
    "use strict";
    $.Dashboard.init()
}(window.jQuery);

