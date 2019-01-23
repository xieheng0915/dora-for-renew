/**
 * <chart>
 * -----------------------------------------------------------------------------
 * A button with a built-in loading spinner.
 *
 * @type {Component}
 *
 * @event load
 * -----------------------------------------------------------------------------
 */

parasails.registerComponent('pie-chart', {
  extends: VueChartJs.Pie,

  //  ╦ ╦╔╦╗╔╦╗╦
  //  ╠═╣ ║ ║║║║
  //  ╩ ╩ ╩ ╩ ╩╩═╝
  template: `
  <pie-chart></pie-chart>
  `,

  //  ╦  ╦╔═╗╔═╗╔═╗╦ ╦╔═╗╦  ╔═╗
  //  ║  ║╠╣ ║╣ ║  ╚╦╝║  ║  ║╣
  //  ╩═╝╩╚  ╚═╝╚═╝ ╩ ╚═╝╩═╝╚═╝
  beforeMount: function() {
    //…
  },
  mounted: async function() {
    this.renderChart(
      {
        labels: [
          '50% For Sale',
          '15% Timebonus',
          '5% Introducer',
          '30% Reserved',
        ],
        datasets: [
          {
            backgroundColor: ['#E6603C', '#46C7AB', '#3B2921', '#084E7F'],
            data: [50, 15, 5, 30],
          },
        ],
      },
      {
        responsive: true,
        maintainAspectRatio: false,
        legend: { 
          position: 'bottom',
           labels: {
            padding: 50, 
            // boxWidth: 50
          }
        },
        tooltipTemplate: '<%= value %>',
        showTooltips: true,
        tooltipEvents: [],
      }
    );
  },
  beforeDestroy: function() {
    //…
  },
});

// var vm = new Vue({
//     el: '#chart'
//   });
