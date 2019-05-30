new Vue({
  el :'#app',
  data: {
    src: '../issue6/shallow.jpg',
    resultSrc: '',
    resultSrc2: ''
  },
  methods: {
    load () {
      // listen to clipper's load event @load="load"
      const clipper = this.$refs.clipper
      const sourceImg = clipper.imgEl
      clipper.inMemCanvas = clipper.inMemCanvas || document.createElement('CANVAS')
      const inMemCanvas = clipper.inMemCanvas
      const mpImg = new MegaPixImage(sourceImg)
      mpImg.render(inMemCanvas, { width: sourceImg.naturalWidth, height: sourceImg.naturalHeight })
    },
    getResult () {
      this.resultSrc = this.clip().toDataURL()
      this.resultSrc2 = this.$refs.clipper.clip().toDataURL()
    },
    clip () {
      const clipper = this.$refs.clipper
      const drawPos = clipper.getDrawPos()
      const canvas = clipper.canvasEl
      let ctx = canvas.getContext('2d')
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      const width = drawPos.pos.swidth // sw
      const height = drawPos.pos.sheight// sh
      canvas.width = width
      canvas.height = height
      ctx = canvas.getContext('2d')
      ctx.fillStyle = clipper.bgColor
      ctx.fillRect(0, 0, width, height)
      ctx.translate(drawPos.translate.rotateX, drawPos.translate.rotateY)
      ctx.rotate(clipper.rotate * Math.PI / 180)
      ctx.translate(drawPos.translate.drawX - drawPos.translate.rotateX, drawPos.translate.drawY - drawPos.translate.rotateY)
      ctx.drawImage(clipper.inMemCanvas, 0, 0)
      return canvas
    }
  }
})