module.exports = function (config, cwd){
  config.resolve.alias = {
      "asha/_.less":process.cwd() + "/src/asha/css/_.less"
  }
  return config
}