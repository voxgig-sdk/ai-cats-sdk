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
      },
      "feature" => {
        "test" => {
          "options" => {
            "active" => false,
          },
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
              "name" => "createdAt",
              "type" => "`$STRING`",
            },
            {
              "name" => "height",
              "type" => "`$INTEGER`",
            },
            {
              "name" => "id",
              "type" => "`$STRING`",
            },
            {
              "name" => "url",
              "type" => "`$STRING`",
            },
            {
              "name" => "width",
              "type" => "`$INTEGER`",
            },
          ],
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
                  "parts" => [
                    "cats",
                    "{id}",
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
              "name" => "createdAt",
              "type" => "`$STRING`",
            },
            {
              "name" => "height",
              "type" => "`$INTEGER`",
            },
            {
              "name" => "id",
              "type" => "`$STRING`",
            },
            {
              "name" => "url",
              "type" => "`$STRING`",
            },
            {
              "name" => "width",
              "type" => "`$INTEGER`",
            },
          ],
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
                  "parts" => [
                    "cats",
                    "random",
                  ],
                  "select" => {},
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
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
              "type" => "`$STRING`",
            },
            {
              "name" => "heartRate",
              "type" => "`$INTEGER`",
            },
            {
              "name" => "id",
              "type" => "`$STRING`",
            },
            {
              "name" => "temperature",
              "type" => "`$NUMBER`",
            },
            {
              "name" => "timestamp",
              "type" => "`$STRING`",
            },
            {
              "name" => "weight",
              "op" => {
                "create" => {
                  "req" => true,
                  "type" => "`$NUMBER`",
                },
              },
              "type" => "`$NUMBER`",
            },
          ],
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
                  "parts" => [
                    "cats",
                    "health",
                  ],
                  "select" => {},
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
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
                  "parts" => [
                    "cats",
                    "health",
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
              "type" => "`$STRING`",
            },
            {
              "name" => "duration",
              "type" => "`$INTEGER`",
            },
            {
              "name" => "id",
              "type" => "`$STRING`",
            },
            {
              "name" => "notes",
              "type" => "`$STRING`",
            },
            {
              "name" => "quality",
              "type" => "`$STRING`",
            },
            {
              "name" => "timestamp",
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
              "type" => "`$STRING`",
            },
          ],
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
                  "parts" => [
                    "interactions",
                  ],
                  "select" => {},
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
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
                  "parts" => [
                    "interactions",
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
              "type" => "`$INTEGER`",
            },
            {
              "name" => "id",
              "type" => "`$STRING`",
            },
            {
              "name" => "notes",
              "type" => "`$STRING`",
            },
            {
              "name" => "success",
              "type" => "`$BOOLEAN`",
            },
            {
              "name" => "timestamp",
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
              "type" => "`$STRING`",
            },
          ],
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
                  "parts" => [
                    "training",
                  ],
                  "select" => {},
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
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
                  "parts" => [
                    "training",
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
