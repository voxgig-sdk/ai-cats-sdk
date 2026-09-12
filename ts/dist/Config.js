"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FEATURE_PLUGINS = exports.config = void 0;
const TestFeature_1 = require("./feature/test/TestFeature");
const FEATURE_CLASS = {
    test: TestFeature_1.TestFeature,
};
// Per-feature plugin DEFINITIONS (voxgig/plugin `Definition` values), from
// the model's active plugin groups. A feature that takes a `plugins` option
// (secrets over sekreto) reads its own entry; a feature with no plugins has
// none. Named imports above make each definition statically reachable, so
// an SDK carries exactly the plugin modules its model selects — the same
// leanness the old side-effect registry imports bought, without a registry.
const FEATURE_PLUGINS = {};
exports.FEATURE_PLUGINS = FEATURE_PLUGINS;
class Config {
    makeFeature(fn) {
        const fc = FEATURE_CLASS[fn];
        const fi = new fc();
        // TODO: errors etc
        return fi;
    }
    // False for a feature added at runtime via options.extend (station's
    // adopt path) - the constructor uses this to skip makeFeature for names
    // no generated class backs.
    hasFeature(fn) {
        return null != FEATURE_CLASS[fn];
    }
    main = {
        name: 'AiCats',
        slug: "ai-cats",
        version: "0.0.1",
        target: "ts",
    };
    feature = {
        test: {
            "options": {
                "active": false
            },
            "transport": "base"
        },
    };
    options = {
        base: "https://ai-cats.net/api",
        headers: {
            "content-type": "application/json"
        },
        entity: {
            cat: {},
            cat_image: {},
            health: {},
            interaction: {},
            training: {},
        }
    };
    entity = {
        "cat": {
            "fields": [
                {
                    "format": "date-time",
                    "name": "createdAt",
                    "short": "Timestamp when the image was generated",
                    "type": "`$STRING`"
                },
                {
                    "name": "height",
                    "short": "Height of the image in pixels",
                    "type": "`$INTEGER`"
                },
                {
                    "name": "id",
                    "short": "Unique identifier for the cat image",
                    "type": "`$STRING`"
                },
                {
                    "format": "uri",
                    "name": "url",
                    "short": "URL of the AI-generated cat image",
                    "type": "`$STRING`"
                },
                {
                    "name": "width",
                    "short": "Width of the image in pixels",
                    "type": "`$INTEGER`"
                }
            ],
            "id": {
                "field": "id",
                "name": "id"
            },
            "name": "cat",
            "op": {
                "load": {
                    "input": "data",
                    "name": "load",
                    "points": [
                        {
                            "args": {
                                "params": [
                                    {
                                        "kind": "param",
                                        "name": "id",
                                        "orig": "id",
                                        "reqd": true,
                                        "type": "`$STRING`"
                                    }
                                ]
                            },
                            "kind": "http",
                            "method": "GET",
                            "orig": "/cats/{id}",
                            "segments": [
                                {
                                    "lit": "cats"
                                },
                                {
                                    "var": "id"
                                }
                            ],
                            "select": {
                                "exist": [
                                    "id"
                                ]
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "parts": [
                                "cats",
                                "{id}"
                            ]
                        }
                    ]
                }
            },
            "relations": {
                "ancestors": []
            }
        },
        "cat_image": {
            "fields": [
                {
                    "format": "date-time",
                    "name": "createdAt",
                    "short": "Timestamp when the image was generated",
                    "type": "`$STRING`"
                },
                {
                    "name": "height",
                    "short": "Height of the image in pixels",
                    "type": "`$INTEGER`"
                },
                {
                    "name": "id",
                    "short": "Unique identifier for the cat image",
                    "type": "`$STRING`"
                },
                {
                    "format": "uri",
                    "name": "url",
                    "short": "URL of the AI-generated cat image",
                    "type": "`$STRING`"
                },
                {
                    "name": "width",
                    "short": "Width of the image in pixels",
                    "type": "`$INTEGER`"
                }
            ],
            "id": {
                "field": "id",
                "name": "id"
            },
            "name": "cat_image",
            "op": {
                "load": {
                    "input": "data",
                    "name": "load",
                    "points": [
                        {
                            "args": {},
                            "kind": "http",
                            "method": "GET",
                            "orig": "/cats/random",
                            "segments": [
                                {
                                    "lit": "cats"
                                },
                                {
                                    "lit": "random"
                                }
                            ],
                            "select": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "parts": [
                                "cats",
                                "random"
                            ]
                        }
                    ]
                }
            },
            "relations": {
                "ancestors": []
            }
        },
        "health": {
            "fields": [
                {
                    "name": "activityLevel",
                    "short": "Activity level of the cat",
                    "type": "`$STRING`"
                },
                {
                    "name": "catId",
                    "op": {
                        "create": {
                            "req": true,
                            "type": "`$STRING`"
                        }
                    },
                    "short": "ID of the cat",
                    "type": "`$STRING`"
                },
                {
                    "name": "heartRate",
                    "short": "Heart rate in beats per minute",
                    "type": "`$INTEGER`"
                },
                {
                    "name": "id",
                    "short": "Unique identifier for the health record",
                    "type": "`$STRING`"
                },
                {
                    "format": "float",
                    "name": "temperature",
                    "short": "Body temperature in Celsius",
                    "type": "`$NUMBER`"
                },
                {
                    "format": "date-time",
                    "name": "timestamp",
                    "short": "When the health data was recorded",
                    "type": "`$STRING`"
                },
                {
                    "format": "float",
                    "name": "weight",
                    "op": {
                        "create": {
                            "req": true,
                            "type": "`$NUMBER`"
                        }
                    },
                    "short": "Weight of the cat in kg",
                    "type": "`$NUMBER`"
                }
            ],
            "id": {
                "field": "id",
                "name": "id"
            },
            "name": "health",
            "op": {
                "create": {
                    "input": "data",
                    "name": "create",
                    "points": [
                        {
                            "args": {},
                            "kind": "http",
                            "method": "POST",
                            "orig": "/cats/health",
                            "segments": [
                                {
                                    "lit": "cats"
                                },
                                {
                                    "lit": "health"
                                }
                            ],
                            "select": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "parts": [
                                "cats",
                                "health"
                            ]
                        }
                    ]
                },
                "load": {
                    "input": "data",
                    "name": "load",
                    "points": [
                        {
                            "args": {
                                "query": [
                                    {
                                        "kind": "query",
                                        "name": "cat_id",
                                        "orig": "cat_id",
                                        "type": "`$STRING`"
                                    }
                                ]
                            },
                            "kind": "http",
                            "method": "GET",
                            "orig": "/cats/health",
                            "segments": [
                                {
                                    "lit": "cats"
                                },
                                {
                                    "lit": "health"
                                }
                            ],
                            "select": {
                                "exist": [
                                    "cat_id"
                                ]
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "parts": [
                                "cats",
                                "health"
                            ]
                        }
                    ]
                }
            },
            "relations": {
                "ancestors": []
            }
        },
        "interaction": {
            "fields": [
                {
                    "name": "catId",
                    "op": {
                        "list": {
                            "type": "`$STRING`"
                        }
                    },
                    "req": true,
                    "short": "ID of the cat",
                    "type": "`$STRING`"
                },
                {
                    "name": "duration",
                    "short": "Duration of the interaction in minutes",
                    "type": "`$INTEGER`"
                },
                {
                    "name": "id",
                    "short": "Unique identifier for the interaction",
                    "type": "`$STRING`"
                },
                {
                    "name": "notes",
                    "short": "Additional notes about the interaction",
                    "type": "`$STRING`"
                },
                {
                    "name": "quality",
                    "short": "Quality rating of the interaction",
                    "type": "`$STRING`"
                },
                {
                    "format": "date-time",
                    "name": "timestamp",
                    "short": "When the interaction occurred",
                    "type": "`$STRING`"
                },
                {
                    "name": "type",
                    "op": {
                        "list": {
                            "type": "`$STRING`"
                        }
                    },
                    "req": true,
                    "short": "Type of interaction",
                    "type": "`$STRING`"
                }
            ],
            "id": {
                "field": "id",
                "name": "id"
            },
            "name": "interaction",
            "op": {
                "create": {
                    "input": "data",
                    "name": "create",
                    "points": [
                        {
                            "args": {},
                            "kind": "http",
                            "method": "POST",
                            "orig": "/interactions",
                            "segments": [
                                {
                                    "lit": "interactions"
                                }
                            ],
                            "select": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "parts": [
                                "interactions"
                            ]
                        }
                    ]
                },
                "list": {
                    "input": "data",
                    "name": "list",
                    "points": [
                        {
                            "args": {
                                "query": [
                                    {
                                        "kind": "query",
                                        "name": "cat_id",
                                        "orig": "cat_id",
                                        "type": "`$STRING`"
                                    },
                                    {
                                        "kind": "query",
                                        "name": "end_date",
                                        "orig": "end_date",
                                        "type": "`$STRING`"
                                    },
                                    {
                                        "kind": "query",
                                        "name": "start_date",
                                        "orig": "start_date",
                                        "type": "`$STRING`"
                                    }
                                ]
                            },
                            "kind": "http",
                            "method": "GET",
                            "orig": "/interactions",
                            "segments": [
                                {
                                    "lit": "interactions"
                                }
                            ],
                            "select": {
                                "exist": [
                                    "cat_id",
                                    "end_date",
                                    "start_date"
                                ]
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "parts": [
                                "interactions"
                            ]
                        }
                    ]
                }
            },
            "relations": {
                "ancestors": []
            }
        },
        "training": {
            "fields": [
                {
                    "name": "catId",
                    "op": {
                        "list": {
                            "type": "`$STRING`"
                        }
                    },
                    "req": true,
                    "short": "ID of the cat",
                    "type": "`$STRING`"
                },
                {
                    "name": "duration",
                    "op": {
                        "list": {
                            "type": "`$INTEGER`"
                        }
                    },
                    "req": true,
                    "short": "Duration of the session in minutes",
                    "type": "`$INTEGER`"
                },
                {
                    "name": "id",
                    "short": "Unique identifier for the training session",
                    "type": "`$STRING`"
                },
                {
                    "name": "notes",
                    "short": "Additional notes about the training session",
                    "type": "`$STRING`"
                },
                {
                    "name": "success",
                    "short": "Whether the training was successful",
                    "type": "`$BOOLEAN`"
                },
                {
                    "format": "date-time",
                    "name": "timestamp",
                    "short": "When the training session occurred",
                    "type": "`$STRING`"
                },
                {
                    "name": "type",
                    "op": {
                        "list": {
                            "type": "`$STRING`"
                        }
                    },
                    "req": true,
                    "short": "Type of training session",
                    "type": "`$STRING`"
                }
            ],
            "id": {
                "field": "id",
                "name": "id"
            },
            "name": "training",
            "op": {
                "create": {
                    "input": "data",
                    "name": "create",
                    "points": [
                        {
                            "args": {},
                            "kind": "http",
                            "method": "POST",
                            "orig": "/training",
                            "segments": [
                                {
                                    "lit": "training"
                                }
                            ],
                            "select": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "parts": [
                                "training"
                            ]
                        }
                    ]
                },
                "list": {
                    "input": "data",
                    "name": "list",
                    "points": [
                        {
                            "args": {
                                "query": [
                                    {
                                        "kind": "query",
                                        "name": "cat_id",
                                        "orig": "cat_id",
                                        "type": "`$STRING`"
                                    },
                                    {
                                        "example": 10,
                                        "kind": "query",
                                        "name": "limit",
                                        "orig": "limit",
                                        "type": "`$INTEGER`"
                                    }
                                ]
                            },
                            "kind": "http",
                            "method": "GET",
                            "orig": "/training",
                            "segments": [
                                {
                                    "lit": "training"
                                }
                            ],
                            "select": {
                                "exist": [
                                    "cat_id",
                                    "limit"
                                ]
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "parts": [
                                "training"
                            ]
                        }
                    ]
                }
            },
            "relations": {
                "ancestors": []
            }
        }
    };
}
const config = new Config();
exports.config = config;
//# sourceMappingURL=Config.js.map