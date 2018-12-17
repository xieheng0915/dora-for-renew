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

parasails.registerComponent('doughnut-chart', {
  extends: VueChartJs.Doughnut,

  //  ╦ ╦╔╦╗╔╦╗╦
  //  ╠═╣ ║ ║║║║
  //  ╩ ╩ ╩ ╩ ╩╩═╝
  template: `
  <doughnut-chart></doughnut-chart>
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
            backgroundColor: ['#41B883', '#A0D08D', '#00D8FF', '#DD1B16'],
            data: [50, 15, 5, 30],
          },
        ],
      },
      {
        responsive: true,
        maintainAspectRatio: false,
        legend: { position: 'left' },
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
