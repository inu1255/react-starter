module.exports = function (config, cwd){
  config.resolve.alias = {
      "asha/_.less":process.cwd() + "/src/asha/css/_.less"
  }
  config.resolve.root = [process.cwd() + '/src',process.cwd() + '/node_modules']
  // console.log(JSON.stringify(config))
  // process.exit()
  return config
}