<template>
  <div class="hello">
    <div>rotation: {{rotation.toFixed(2)}}deg</div>
    <clipper-range v-model="rotation" :min="0" :max="360"></clipper-range>
    <clipper-fixed :src="src" :rotate="rotation"></clipper-fixed>
  </div>
</template>

<script>
import { clipperFixed, clipperRange } from "vuejs-clipper";

export default {
  name: 'HelloWorld',
  components: {
    clipperFixed,
    clipperRange
  },
  data: () => {
    return {
      src: "bird.jpg",
      rotation: 0
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.hello {
  max-width: 500px;
}
</style>
