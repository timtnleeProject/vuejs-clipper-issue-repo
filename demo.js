new Vue({
    el: '#app',
    data: {
      src: "shallow.jpg",
      src2: "",
      src3: "",
      originImg: {},
      compressImg: {},
      clipImg: {}
    },
    mounted() {
      const img = this.$el.querySelector('.img')
      this.getImageSize(img,this.originImg)
      this.compress()
      const img2 = this.$el.querySelector('.img2')
      img2.onload = ()=>{
        this.getImageSize(img2,this.compressImg)
        this.$set(this.compressImg,'dataURL length',this.src2.length)
      }
    },
    methods: {
      getImageSize(img,data) {
        this.$set(data,'width',img.naturalWidth)
        this.$set(data,'height',img.naturalHeight)
      },
      compress(){
        const img = this.$el.querySelector('.img')
        const canvas = document.createElement('canvas')
        canvas.width = 192
        canvas.height = 108
        
        const ctx = canvas.getContext('2d')
        ctx.drawImage(img,0,0,1920,1080,0,0,192,108)
        this.src2 = canvas.toDataURL()
      },
      clip() {
        const canvas = this.$refs.clipper.clip()
        this.src3 = canvas.toDataURL()
        const img = this.$el.querySelector('.img3')
        img.onload = ()=>{
          this.getImageSize(img,this.clipImg)
          this.$set(this.clipImg,'dataURL length',this.src3.length)
        }
      }
    }
  })