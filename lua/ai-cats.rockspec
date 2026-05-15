package = "voxgig-sdk-ai-cats"
version = "0.0-1"
source = {
  url = "git://github.com/voxgig-sdk/ai-cats-sdk.git"
}
description = {
  summary = "AiCats SDK for Lua",
  license = "MIT"
}
dependencies = {
  "lua >= 5.3",
  "dkjson >= 2.5",
  "dkjson >= 2.5",
}
build = {
  type = "builtin",
  modules = {
    ["ai-cats_sdk"] = "ai-cats_sdk.lua",
    ["config"] = "config.lua",
    ["features"] = "features.lua",
  }
}
