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

parasails.registerComponent('animated-count', {
//   extends: AnimateNumber,

  //  ╦ ╦╔╦╗╔╦╗╦
  //  ╠═╣ ║ ║║║║
  //  ╩ ╩ ╩ ╩ ╩╩═╝
  template: `
  <div>
    <animate-number
      from="1"
      to="10"
      duration="1000"
      easing="easeOutQuad"
      :formatter="formatter"
    ></animate-number>

    <!-- parseInt as default formatter -->
    <animate-number from="1" to="10"></animate-number>

    <!-- manually start animation by click -->
    <animate-number ref="myNum" from="0" to="10" mode="manual" ></animate-number><br>

    <button type="button" @click="startAnimate()"> animate! </button>
  </div>
  `,

  //  ╦  ╦╔═╗╔═╗╔═╗╦ ╦╔═╗╦  ╔═╗
  //  ║  ║╠╣ ║╣ ║  ╚╦╝║  ║  ║╣
  //  ╩═╝╩╚  ╚═╝╚═╝ ╩ ╚═╝╩═╝╚═╝
  beforeMount: function() {
    //…
  },
  mounted: async function() {
    this.startAnimate();
  },
  beforeDestroy: function() {
    //…
  },

  methods: {
    formatter: function(num){
      return num.toFixed(2);
    },

    startAnimate: function () {
      this.$refs.myNum.start();
    }
  }

});


// var vm = new Vue({
//     el: '#chart'
//   });
