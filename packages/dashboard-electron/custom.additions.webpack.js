const configureYarnWorkspaces = require("@loopmode/electron-webpack-config-yarn-workspaces")
const path = require('path')
const workspaceRoot = path.resolve(__dirname, "..")

module.exports = function(config) {
  config = configureYarnWorkspaces(config, workspaceRoot)
  return config
}