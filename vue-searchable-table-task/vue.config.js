module.exports = {
  css: {
    loaderOptions: {
      sass: {
        prependData: `
          @import "@/styles/_helpers.scss";
          @import "@/styles/_variables.scss";
        `
      }
    }
  }
}
