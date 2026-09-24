-- AiCats SDK configuration

-- Build a fresh, fully materialised config table. Every call rebuilds the
-- whole structure, so prefer require("config_shared") unless you need a
-- private copy you intend to mutate.
local function make_config()
  return {
    main = {
      name = "AiCats",
      slug = "ai-cats",
      version = "0.0.1",
      target = "lua",
    },
    feature = {
      ["ratelimit"] = {
        ["options"] = {
          ["active"] = false,
          ["burst"] = 5,
          ["rate"] = 5,
        },
        ["optspec"] = {
          ["now"] = "`$FUNCTION`",
          ["sleep"] = "`$FUNCTION`",
        },
        ["strict"] = false,
        ["transport"] = "wrap",
      },
      ["retry"] = {
        ["options"] = {
          ["active"] = false,
          ["factor"] = 2,
          ["maxDelay"] = 2000,
          ["minDelay"] = 50,
          ["retries"] = 2,
          ["statuses"] = {
            408,
            425,
            429,
            500,
            502,
            503,
            504,
          },
        },
        ["optspec"] = {
          ["jitter"] = "`$BOOLEAN`",
          ["sleep"] = "`$FUNCTION`",
        },
        ["strict"] = false,
        ["transport"] = "wrap",
      },
      ["test"] = {
        ["options"] = {
          ["active"] = false,
        },
        ["optspec"] = {
          ["entity"] = "`$MAP`",
          ["net"] = "`$MAP`",
        },
        ["strict"] = false,
        ["transport"] = "base",
      },
      ["timeout"] = {
        ["options"] = {
          ["active"] = false,
          ["ms"] = 30000,
        },
        ["optspec"] = {
          ["clearTimer"] = "`$FUNCTION`",
          ["setTimer"] = "`$FUNCTION`",
        },
        ["strict"] = false,
        ["transport"] = "wrap",
      },
    },
    options = {
      base = "https://ai-cats.net/api",
      headers = {
        ["content-type"] = "application/json",
      },
      entity = {
        ["cat"] = {},
        ["cat_image"] = {},
        ["health"] = {},
        ["interaction"] = {},
        ["training"] = {},
      },
    },
    entity = {
      ["cat"] = {
        ["fields"] = {
          {
            ["name"] = "createdAt",
            ["title"] = "Created At",
            ["type"] = "`$STRING`",
            ["short"] = "Timestamp when the image was generated",
            ["format"] = "date-time",
          },
          {
            ["name"] = "height",
            ["title"] = "Height",
            ["type"] = "`$INTEGER`",
            ["short"] = "Height of the image in pixels",
          },
          {
            ["name"] = "id",
            ["title"] = "Id",
            ["type"] = "`$STRING`",
            ["short"] = "Unique identifier for the cat image",
          },
          {
            ["name"] = "url",
            ["title"] = "Url",
            ["type"] = "`$STRING`",
            ["short"] = "URL of the AI-generated cat image",
            ["format"] = "uri",
          },
          {
            ["name"] = "width",
            ["title"] = "Width",
            ["type"] = "`$INTEGER`",
            ["short"] = "Width of the image in pixels",
          },
        },
        ["id"] = {
          ["field"] = "id",
          ["name"] = "id",
        },
        ["name"] = "cat",
        ["op"] = {
          ["load"] = {
            ["input"] = "data",
            ["name"] = "load",
            ["points"] = {
              {
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/cats/{id}",
                ["segments"] = {
                  {
                    ["lit"] = "cats",
                  },
                  {
                    ["var"] = "id",
                  },
                },
                ["parts"] = {
                  "cats",
                  "{id}",
                },
                ["rename"] = {},
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["args"] = {
                  ["params"] = {
                    {
                      ["name"] = "id",
                      ["orig"] = "id",
                      ["type"] = "`$STRING`",
                      ["kind"] = "param",
                      ["reqd"] = true,
                    },
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "id",
                  },
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
      ["cat_image"] = {
        ["fields"] = {
          {
            ["name"] = "createdAt",
            ["title"] = "Created At",
            ["type"] = "`$STRING`",
            ["short"] = "Timestamp when the image was generated",
            ["format"] = "date-time",
          },
          {
            ["name"] = "height",
            ["title"] = "Height",
            ["type"] = "`$INTEGER`",
            ["short"] = "Height of the image in pixels",
          },
          {
            ["name"] = "id",
            ["title"] = "Id",
            ["type"] = "`$STRING`",
            ["short"] = "Unique identifier for the cat image",
          },
          {
            ["name"] = "url",
            ["title"] = "Url",
            ["type"] = "`$STRING`",
            ["short"] = "URL of the AI-generated cat image",
            ["format"] = "uri",
          },
          {
            ["name"] = "width",
            ["title"] = "Width",
            ["type"] = "`$INTEGER`",
            ["short"] = "Width of the image in pixels",
          },
        },
        ["id"] = {
          ["field"] = "id",
          ["name"] = "id",
        },
        ["name"] = "cat_image",
        ["op"] = {
          ["load"] = {
            ["input"] = "data",
            ["name"] = "load",
            ["points"] = {
              {
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/cats/random",
                ["segments"] = {
                  {
                    ["lit"] = "cats",
                  },
                  {
                    ["lit"] = "random",
                  },
                },
                ["parts"] = {
                  "cats",
                  "random",
                },
                ["rename"] = {},
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["args"] = {},
                ["select"] = {},
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
      ["health"] = {
        ["fields"] = {
          {
            ["name"] = "activityLevel",
            ["title"] = "Activity Level",
            ["type"] = "`$STRING`",
            ["short"] = "Activity level of the cat",
          },
          {
            ["name"] = "catId",
            ["title"] = "Cat Id",
            ["type"] = "`$STRING`",
            ["op"] = {
              ["create"] = {
                ["req"] = true,
                ["type"] = "`$STRING`",
              },
            },
            ["short"] = "ID of the cat",
          },
          {
            ["name"] = "heartRate",
            ["title"] = "Heart Rate",
            ["type"] = "`$INTEGER`",
            ["short"] = "Heart rate in beats per minute",
          },
          {
            ["name"] = "id",
            ["title"] = "Id",
            ["type"] = "`$STRING`",
            ["short"] = "Unique identifier for the health record",
          },
          {
            ["name"] = "temperature",
            ["title"] = "Temperature",
            ["type"] = "`$NUMBER`",
            ["short"] = "Body temperature in Celsius",
            ["format"] = "float",
          },
          {
            ["name"] = "timestamp",
            ["title"] = "Timestamp",
            ["type"] = "`$STRING`",
            ["short"] = "When the health data was recorded",
            ["format"] = "date-time",
          },
          {
            ["name"] = "weight",
            ["title"] = "Weight",
            ["type"] = "`$NUMBER`",
            ["op"] = {
              ["create"] = {
                ["req"] = true,
                ["type"] = "`$NUMBER`",
              },
            },
            ["short"] = "Weight of the cat in kg",
            ["format"] = "float",
          },
        },
        ["id"] = {
          ["field"] = "id",
          ["name"] = "id",
        },
        ["name"] = "health",
        ["op"] = {
          ["create"] = {
            ["input"] = "data",
            ["name"] = "create",
            ["points"] = {
              {
                ["kind"] = "http",
                ["method"] = "POST",
                ["orig"] = "/cats/health",
                ["segments"] = {
                  {
                    ["lit"] = "cats",
                  },
                  {
                    ["lit"] = "health",
                  },
                },
                ["parts"] = {
                  "cats",
                  "health",
                },
                ["rename"] = {},
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["args"] = {},
                ["select"] = {},
              },
            },
          },
          ["load"] = {
            ["input"] = "data",
            ["name"] = "load",
            ["points"] = {
              {
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/cats/health",
                ["segments"] = {
                  {
                    ["lit"] = "cats",
                  },
                  {
                    ["lit"] = "health",
                  },
                },
                ["parts"] = {
                  "cats",
                  "health",
                },
                ["rename"] = {},
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["args"] = {
                  ["query"] = {
                    {
                      ["name"] = "cat_id",
                      ["orig"] = "cat_id",
                      ["type"] = "`$STRING`",
                      ["kind"] = "query",
                    },
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "cat_id",
                  },
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
      ["interaction"] = {
        ["fields"] = {
          {
            ["name"] = "catId",
            ["title"] = "Cat Id",
            ["type"] = "`$STRING`",
            ["req"] = true,
            ["op"] = {
              ["list"] = {
                ["type"] = "`$STRING`",
              },
            },
            ["short"] = "ID of the cat",
          },
          {
            ["name"] = "duration",
            ["title"] = "Duration",
            ["type"] = "`$INTEGER`",
            ["short"] = "Duration of the interaction in minutes",
          },
          {
            ["name"] = "id",
            ["title"] = "Id",
            ["type"] = "`$STRING`",
            ["short"] = "Unique identifier for the interaction",
          },
          {
            ["name"] = "notes",
            ["title"] = "Notes",
            ["type"] = "`$STRING`",
            ["short"] = "Additional notes about the interaction",
          },
          {
            ["name"] = "quality",
            ["title"] = "Quality",
            ["type"] = "`$STRING`",
            ["short"] = "Quality rating of the interaction",
          },
          {
            ["name"] = "timestamp",
            ["title"] = "Timestamp",
            ["type"] = "`$STRING`",
            ["short"] = "When the interaction occurred",
            ["format"] = "date-time",
          },
          {
            ["name"] = "type",
            ["title"] = "Type",
            ["type"] = "`$STRING`",
            ["req"] = true,
            ["op"] = {
              ["list"] = {
                ["type"] = "`$STRING`",
              },
            },
            ["short"] = "Type of interaction",
          },
        },
        ["id"] = {
          ["field"] = "id",
          ["name"] = "id",
        },
        ["name"] = "interaction",
        ["op"] = {
          ["create"] = {
            ["input"] = "data",
            ["name"] = "create",
            ["points"] = {
              {
                ["kind"] = "http",
                ["method"] = "POST",
                ["orig"] = "/interactions",
                ["segments"] = {
                  {
                    ["lit"] = "interactions",
                  },
                },
                ["parts"] = {
                  "interactions",
                },
                ["rename"] = {},
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["args"] = {},
                ["select"] = {},
              },
            },
          },
          ["list"] = {
            ["input"] = "data",
            ["name"] = "list",
            ["points"] = {
              {
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/interactions",
                ["segments"] = {
                  {
                    ["lit"] = "interactions",
                  },
                },
                ["parts"] = {
                  "interactions",
                },
                ["rename"] = {},
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["args"] = {
                  ["query"] = {
                    {
                      ["name"] = "cat_id",
                      ["orig"] = "cat_id",
                      ["type"] = "`$STRING`",
                      ["kind"] = "query",
                    },
                    {
                      ["name"] = "end_date",
                      ["orig"] = "end_date",
                      ["type"] = "`$STRING`",
                      ["kind"] = "query",
                    },
                    {
                      ["name"] = "start_date",
                      ["orig"] = "start_date",
                      ["type"] = "`$STRING`",
                      ["kind"] = "query",
                    },
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "cat_id",
                    "end_date",
                    "start_date",
                  },
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
      ["training"] = {
        ["fields"] = {
          {
            ["name"] = "catId",
            ["title"] = "Cat Id",
            ["type"] = "`$STRING`",
            ["req"] = true,
            ["op"] = {
              ["list"] = {
                ["type"] = "`$STRING`",
              },
            },
            ["short"] = "ID of the cat",
          },
          {
            ["name"] = "duration",
            ["title"] = "Duration",
            ["type"] = "`$INTEGER`",
            ["req"] = true,
            ["op"] = {
              ["list"] = {
                ["type"] = "`$INTEGER`",
              },
            },
            ["short"] = "Duration of the session in minutes",
          },
          {
            ["name"] = "id",
            ["title"] = "Id",
            ["type"] = "`$STRING`",
            ["short"] = "Unique identifier for the training session",
          },
          {
            ["name"] = "notes",
            ["title"] = "Notes",
            ["type"] = "`$STRING`",
            ["short"] = "Additional notes about the training session",
          },
          {
            ["name"] = "success",
            ["title"] = "Success",
            ["type"] = "`$BOOLEAN`",
            ["short"] = "Whether the training was successful",
          },
          {
            ["name"] = "timestamp",
            ["title"] = "Timestamp",
            ["type"] = "`$STRING`",
            ["short"] = "When the training session occurred",
            ["format"] = "date-time",
          },
          {
            ["name"] = "type",
            ["title"] = "Type",
            ["type"] = "`$STRING`",
            ["req"] = true,
            ["op"] = {
              ["list"] = {
                ["type"] = "`$STRING`",
              },
            },
            ["short"] = "Type of training session",
          },
        },
        ["id"] = {
          ["field"] = "id",
          ["name"] = "id",
        },
        ["name"] = "training",
        ["op"] = {
          ["create"] = {
            ["input"] = "data",
            ["name"] = "create",
            ["points"] = {
              {
                ["kind"] = "http",
                ["method"] = "POST",
                ["orig"] = "/training",
                ["segments"] = {
                  {
                    ["lit"] = "training",
                  },
                },
                ["parts"] = {
                  "training",
                },
                ["rename"] = {},
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["args"] = {},
                ["select"] = {},
              },
            },
          },
          ["list"] = {
            ["input"] = "data",
            ["name"] = "list",
            ["points"] = {
              {
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/training",
                ["segments"] = {
                  {
                    ["lit"] = "training",
                  },
                },
                ["parts"] = {
                  "training",
                },
                ["rename"] = {},
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["args"] = {
                  ["query"] = {
                    {
                      ["name"] = "cat_id",
                      ["orig"] = "cat_id",
                      ["type"] = "`$STRING`",
                      ["kind"] = "query",
                    },
                    {
                      ["name"] = "limit",
                      ["orig"] = "limit",
                      ["type"] = "`$INTEGER`",
                      ["kind"] = "query",
                      ["example"] = 10,
                    },
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "cat_id",
                    "limit",
                  },
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
    },
  }
end


local function make_feature(name)
  local features = require("features")
  local factory = features[name]
  if factory ~= nil then
    return factory()
  end
  return features.base()
end


-- Attach make_feature to the SDK class
local function setup_sdk(SDK)
  SDK._make_feature = make_feature
end


return make_config
