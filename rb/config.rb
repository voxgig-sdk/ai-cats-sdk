# AiCats SDK configuration

module AiCatsConfig
  # Return the process-wide config, built once on first use. The SDK reads
  # the config on every request and never writes to it, so one instance is
  # shared by every client rather than rebuilt per client.
  #
  # The returned hash is shared: treat it as read-only. Callers that need to
  # mutate should use make_config, which always returns a fresh copy.
  def self.shared_config
    @shared_config ||= make_config
  end


  # Build a fresh, fully materialised config hash. Every call rebuilds the
  # whole structure, so prefer shared_config unless you need a private copy
  # you intend to mutate.
  def self.make_config
    {
      "main" => {
        "name" => "AiCats",
        "slug" => "ai-cats",
        "version" => "0.0.1",
        "target" => "rb",
      },
      "feature" => {
        "test" => {
          "options" => {
            "active" => false,
          },
          "transport" => "base",
        },
      },
      "options" => {
        "base" => "https://ai-cats.net/api",
        "headers" => {
          "content-type" => "application/json",
        },
        "entity" => {
          "cat" => {},
          "cat_image" => {},
          "health" => {},
          "interaction" => {},
          "training" => {},
        },
      },
      "entity" => {
        "cat" => {
          "fields" => [
            {
              "format" => "date-time",
              "name" => "createdAt",
              "short" => "Timestamp when the image was generated",
              "type" => "`$STRING`",
            },
            {
              "name" => "height",
              "short" => "Height of the image in pixels",
              "type" => "`$INTEGER`",
            },
            {
              "name" => "id",
              "short" => "Unique identifier for the cat image",
              "type" => "`$STRING`",
            },
            {
              "format" => "uri",
              "name" => "url",
              "short" => "URL of the AI-generated cat image",
              "type" => "`$STRING`",
            },
            {
              "name" => "width",
              "short" => "Width of the image in pixels",
              "type" => "`$INTEGER`",
            },
          ],
          "id" => {
            "field" => "id",
            "name" => "id",
          },
          "name" => "cat",
          "op" => {
            "load" => {
              "input" => "data",
              "name" => "load",
              "points" => [
                {
                  "args" => {
                    "params" => [
                      {
                        "kind" => "param",
                        "name" => "id",
                        "orig" => "id",
                        "reqd" => true,
                        "type" => "`$STRING`",
                      },
                    ],
                  },
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/cats/{id}",
                  "segments" => [
                    {
                      "lit" => "cats",
                    },
                    {
                      "var" => "id",
                    },
                  ],
                  "select" => {
                    "exist" => [
                      "id",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "parts" => [
                    "cats",
                    "{id}",
                  ],
                },
              ],
            },
          },
          "relations" => {
            "ancestors" => [],
          },
        },
        "cat_image" => {
          "fields" => [
            {
              "format" => "date-time",
              "name" => "createdAt",
              "short" => "Timestamp when the image was generated",
              "type" => "`$STRING`",
            },
            {
              "name" => "height",
              "short" => "Height of the image in pixels",
              "type" => "`$INTEGER`",
            },
            {
              "name" => "id",
              "short" => "Unique identifier for the cat image",
              "type" => "`$STRING`",
            },
            {
              "format" => "uri",
              "name" => "url",
              "short" => "URL of the AI-generated cat image",
              "type" => "`$STRING`",
            },
            {
              "name" => "width",
              "short" => "Width of the image in pixels",
              "type" => "`$INTEGER`",
            },
          ],
          "id" => {
            "field" => "id",
            "name" => "id",
          },
          "name" => "cat_image",
          "op" => {
            "load" => {
              "input" => "data",
              "name" => "load",
              "points" => [
                {
                  "args" => {},
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/cats/random",
                  "segments" => [
                    {
                      "lit" => "cats",
                    },
                    {
                      "lit" => "random",
                    },
                  ],
                  "select" => {},
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "parts" => [
                    "cats",
                    "random",
                  ],
                },
              ],
            },
          },
          "relations" => {
            "ancestors" => [],
          },
        },
        "health" => {
          "fields" => [
            {
              "name" => "activityLevel",
              "short" => "Activity level of the cat",
              "type" => "`$STRING`",
            },
            {
              "name" => "catId",
              "op" => {
                "create" => {
                  "req" => true,
                  "type" => "`$STRING`",
                },
              },
              "short" => "ID of the cat",
              "type" => "`$STRING`",
            },
            {
              "name" => "heartRate",
              "short" => "Heart rate in beats per minute",
              "type" => "`$INTEGER`",
            },
            {
              "name" => "id",
              "short" => "Unique identifier for the health record",
              "type" => "`$STRING`",
            },
            {
              "format" => "float",
              "name" => "temperature",
              "short" => "Body temperature in Celsius",
              "type" => "`$NUMBER`",
            },
            {
              "format" => "date-time",
              "name" => "timestamp",
              "short" => "When the health data was recorded",
              "type" => "`$STRING`",
            },
            {
              "format" => "float",
              "name" => "weight",
              "op" => {
                "create" => {
                  "req" => true,
                  "type" => "`$NUMBER`",
                },
              },
              "short" => "Weight of the cat in kg",
              "type" => "`$NUMBER`",
            },
          ],
          "id" => {
            "field" => "id",
            "name" => "id",
          },
          "name" => "health",
          "op" => {
            "create" => {
              "input" => "data",
              "name" => "create",
              "points" => [
                {
                  "args" => {},
                  "kind" => "http",
                  "method" => "POST",
                  "orig" => "/cats/health",
                  "segments" => [
                    {
                      "lit" => "cats",
                    },
                    {
                      "lit" => "health",
                    },
                  ],
                  "select" => {},
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "parts" => [
                    "cats",
                    "health",
                  ],
                },
              ],
            },
            "load" => {
              "input" => "data",
              "name" => "load",
              "points" => [
                {
                  "args" => {
                    "query" => [
                      {
                        "kind" => "query",
                        "name" => "cat_id",
                        "orig" => "cat_id",
                        "type" => "`$STRING`",
                      },
                    ],
                  },
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/cats/health",
                  "segments" => [
                    {
                      "lit" => "cats",
                    },
                    {
                      "lit" => "health",
                    },
                  ],
                  "select" => {
                    "exist" => [
                      "cat_id",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "parts" => [
                    "cats",
                    "health",
                  ],
                },
              ],
            },
          },
          "relations" => {
            "ancestors" => [],
          },
        },
        "interaction" => {
          "fields" => [
            {
              "name" => "catId",
              "op" => {
                "list" => {
                  "type" => "`$STRING`",
                },
              },
              "req" => true,
              "short" => "ID of the cat",
              "type" => "`$STRING`",
            },
            {
              "name" => "duration",
              "short" => "Duration of the interaction in minutes",
              "type" => "`$INTEGER`",
            },
            {
              "name" => "id",
              "short" => "Unique identifier for the interaction",
              "type" => "`$STRING`",
            },
            {
              "name" => "notes",
              "short" => "Additional notes about the interaction",
              "type" => "`$STRING`",
            },
            {
              "name" => "quality",
              "short" => "Quality rating of the interaction",
              "type" => "`$STRING`",
            },
            {
              "format" => "date-time",
              "name" => "timestamp",
              "short" => "When the interaction occurred",
              "type" => "`$STRING`",
            },
            {
              "name" => "type",
              "op" => {
                "list" => {
                  "type" => "`$STRING`",
                },
              },
              "req" => true,
              "short" => "Type of interaction",
              "type" => "`$STRING`",
            },
          ],
          "id" => {
            "field" => "id",
            "name" => "id",
          },
          "name" => "interaction",
          "op" => {
            "create" => {
              "input" => "data",
              "name" => "create",
              "points" => [
                {
                  "args" => {},
                  "kind" => "http",
                  "method" => "POST",
                  "orig" => "/interactions",
                  "segments" => [
                    {
                      "lit" => "interactions",
                    },
                  ],
                  "select" => {},
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "parts" => [
                    "interactions",
                  ],
                },
              ],
            },
            "list" => {
              "input" => "data",
              "name" => "list",
              "points" => [
                {
                  "args" => {
                    "query" => [
                      {
                        "kind" => "query",
                        "name" => "cat_id",
                        "orig" => "cat_id",
                        "type" => "`$STRING`",
                      },
                      {
                        "kind" => "query",
                        "name" => "end_date",
                        "orig" => "end_date",
                        "type" => "`$STRING`",
                      },
                      {
                        "kind" => "query",
                        "name" => "start_date",
                        "orig" => "start_date",
                        "type" => "`$STRING`",
                      },
                    ],
                  },
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/interactions",
                  "segments" => [
                    {
                      "lit" => "interactions",
                    },
                  ],
                  "select" => {
                    "exist" => [
                      "cat_id",
                      "end_date",
                      "start_date",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "parts" => [
                    "interactions",
                  ],
                },
              ],
            },
          },
          "relations" => {
            "ancestors" => [],
          },
        },
        "training" => {
          "fields" => [
            {
              "name" => "catId",
              "op" => {
                "list" => {
                  "type" => "`$STRING`",
                },
              },
              "req" => true,
              "short" => "ID of the cat",
              "type" => "`$STRING`",
            },
            {
              "name" => "duration",
              "op" => {
                "list" => {
                  "type" => "`$INTEGER`",
                },
              },
              "req" => true,
              "short" => "Duration of the session in minutes",
              "type" => "`$INTEGER`",
            },
            {
              "name" => "id",
              "short" => "Unique identifier for the training session",
              "type" => "`$STRING`",
            },
            {
              "name" => "notes",
              "short" => "Additional notes about the training session",
              "type" => "`$STRING`",
            },
            {
              "name" => "success",
              "short" => "Whether the training was successful",
              "type" => "`$BOOLEAN`",
            },
            {
              "format" => "date-time",
              "name" => "timestamp",
              "short" => "When the training session occurred",
              "type" => "`$STRING`",
            },
            {
              "name" => "type",
              "op" => {
                "list" => {
                  "type" => "`$STRING`",
                },
              },
              "req" => true,
              "short" => "Type of training session",
              "type" => "`$STRING`",
            },
          ],
          "id" => {
            "field" => "id",
            "name" => "id",
          },
          "name" => "training",
          "op" => {
            "create" => {
              "input" => "data",
              "name" => "create",
              "points" => [
                {
                  "args" => {},
                  "kind" => "http",
                  "method" => "POST",
                  "orig" => "/training",
                  "segments" => [
                    {
                      "lit" => "training",
                    },
                  ],
                  "select" => {},
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "parts" => [
                    "training",
                  ],
                },
              ],
            },
            "list" => {
              "input" => "data",
              "name" => "list",
              "points" => [
                {
                  "args" => {
                    "query" => [
                      {
                        "kind" => "query",
                        "name" => "cat_id",
                        "orig" => "cat_id",
                        "type" => "`$STRING`",
                      },
                      {
                        "example" => 10,
                        "kind" => "query",
                        "name" => "limit",
                        "orig" => "limit",
                        "type" => "`$INTEGER`",
                      },
                    ],
                  },
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/training",
                  "segments" => [
                    {
                      "lit" => "training",
                    },
                  ],
                  "select" => {
                    "exist" => [
                      "cat_id",
                      "limit",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "parts" => [
                    "training",
                  ],
                },
              ],
            },
          },
          "relations" => {
            "ancestors" => [],
          },
        },
      },
    }
  end


  def self.make_feature(name)
    require_relative 'features'
    AiCatsFeatures.make_feature(name)
  end
end
