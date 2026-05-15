-- AiCats SDK error

local AiCatsError = {}
AiCatsError.__index = AiCatsError


function AiCatsError.new(code, msg, ctx)
  local self = setmetatable({}, AiCatsError)
  self.is_sdk_error = true
  self.sdk = "AiCats"
  self.code = code or ""
  self.msg = msg or ""
  self.ctx = ctx
  self.result = nil
  self.spec = nil
  return self
end


function AiCatsError:error()
  return self.msg
end


function AiCatsError:__tostring()
  return self.msg
end


return AiCatsError
