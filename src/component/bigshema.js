export const bigSchema = {
  "status": {
    "type": "object",
    "format": "form",
    "collapsable": true,
    "collapsed": true,
    "label": "Informations",
    "schema": {
      "enabled": {
        "visibleOnCollapse": true,
        "type": "bool",
        "label": "Enabled"
      },
      "debug": {
        "type": "bool",
        "label": "Debug"
      },
      "include": {
        "label": "Include",
        "format": "singleLineCode",
        "type": "string",
        "array": true,
        "createOption": true
      },
      "exclude": {
        "label": "Exclude",
        "format": "singleLineCode",
        "type": "string",
        "array": true,
        "createOption": true
      }
    }
  },
  "plugin": {
    "type": "object",
    "format": "form",
    "label": null,
    "schema": {
      "target_refs": {
        "label": "Target refs ",
        "type": "string",
        "array": true,
        "format": null
      },
      "root": {
        "label": "Root ",
        "type": "string",
      },
      "client": {
        "label": "Client ",
        "type": "object",
        "format": "form",
        "collapsable": true,
        "collapsed": true,
        "schema": {
          "custom_timeouts": {
            "label": "Custom timeouts ",
            "type": "object",
            "array": true,
            "format": "form",
            "schema": {
              "connection_timeout": {
                "label": "Connection timeout ",
                "type": "number",
              },
              "call_and_stream_timeout": {
                "label": "Call and stream timeout ",
                "type": "number",
              },
              "path": {
                "label": "Path ",
                "type": "string",
              },
              "call_timeout": {
                "label": "Call timeout ",
                "type": "number",
              },
              "idle_timeout": {
                "label": "Idle timeout ",
                "type": "number",
              },
              "global_timeout": {
                "label": "Global timeout ",
                "type": "number",
              }
            },
            "flow": [
              "connection_timeout",
              "call_and_stream_timeout",
              "path",
              "call_timeout",
              "idle_timeout",
              "global_timeout"
            ]
          },
          "global_timeout": {
            "label": "Global timeout ",
            "type": "number",

          },
          "max_errors": {
            "label": "Max errors ",
            "type": "number",

          },
          "retry_initial_delay": {
            "label": "Retry initial delay ",
            "type": "number",

          },
          "backoff_factor": {
            "label": "Backoff factor ",
            "type": "number",

          },
          "cache_connection_settings": {
            "label": "Cache connection settings ",
            "type": "object",
            "format": "form",
            "collapsable": true,
            "collapsed": true,
            "schema": {
              "queue_size": {
                "label": "Queue size ",
                "type": "number",

              },
              "enabled": {
                "label": "Enabled ",
                "type": "bool",

              }
            },
            "flow": [
              "queue_size",
              "enabled"
            ]
          },
          "sample_interval": {
            "label": "Sample interval ",
            "type": "number",

          },
          "call_and_stream_timeout": {
            "label": "Call and stream timeout ",
            "type": "number",

          },
          "retries": {
            "label": "Retries ",
            "type": "number",

          },
          // "proxy": {
          //   "label": "Proxy ",
          //   "type": "object",
          //   "format": "form",
          //   "collapsable": true,
          //   "collapsed": true,
          //   defaultValue: {},
          //   "schema": {},
          //   "flow": []
          // },
          "call_timeout": {
            "label": "Call timeout ",
            "type": "number",

          },
          "idle_timeout": {
            "label": "Idle timeout ",
            "type": "number",

          },
          "connection_timeout": {
            "label": "Connection timeout ",
            "type": "number",

          }
        },
        "flow": [
          "custom_timeouts",
          "global_timeout",
          "max_errors",
          "retry_initial_delay",
          "backoff_factor",
          "cache_connection_settings",
          "sample_interval",
          "call_and_stream_timeout",
          "retries",
          // "proxy",
          "call_timeout",
          "idle_timeout",
          "connection_timeout"
        ]
      },
      "health_check": {
        "label": "Health check ",
        "type": "object",
        "format": "form",
        "collapsable": true,
        "collapsed": true,
        "schema": {
          "enabled": {
            "label": "Enabled ",
            "type": "bool",

          },
          "url": {
            "label": "Url ",
            "type": "string",

          }
        },
        "flow": [
          "enabled",
          "url"
        ]
      },
      "targets": {
        "label": "Targets ",
        "type": "object",
        "array": true,
        "format": "form",
        "schema": {
          "custom_target": {
            "label": "Target ",
            "type": "string",

          },
          "expert_mode": {
            "type": "bool",
            "label": null,
            "defaultValue": null
          },
          "predicate": {
            "label": "Predicate ",
            "type": "object",
            "format": "form",
            "collapsable": true,
            "collapsed": true,
            "schema": {
              "rack": {
                "label": "Rack ",
                "type": "string",

              },
              "provider": {
                "label": "Provider ",
                "type": "string",

              },
              "data_center": {
                "label": "Data center",
                "type": "string",

              },
              "zone": {
                "label": "Zone ",
                "type": "string",

              },
              "positions": {
                "label": "Positions ",
                "type": "object",
                "array": true,
                "format": "form",
                "schema": {
                  "latitude": {
                    "label": "Latitude ",
                    "type": "number",
                  },
                  "longitude": {
                    "label": "Longitude ",
                    "type": "number",
                  },
                  "radius": {
                    "label": "Radius ",
                    "type": "number",
                  }
                },
                "flow": [
                  "latitude",
                  "longitude",
                  "radius"
                ]
              },
              "type": {
                "label": "Type ",
                "type": "string",
                "format": "select",
                "options": [
                  "AlwaysMatch",
                  "NetworkLocationMatch",
                  "GeolocationMatch"
                ]
              },
              "region": {
                "label": "Region ",
                "type": "string",

              },
              "dc": {
                "label": "Dc ",
                "type": "string",

              }
            },
            "flow": [
              "rack",
              "provider",
              "data_center",
              "zone",
              "positions",
              "type",
              "region",
              "dc"
            ],
            "visible": {
              "ref": "plugin"
            }
          },
          "protocol": {
            "label": "Protocol ",
            "type": "string",
            "visible": {
              "ref": "plugin"
            }
          },
          "hostname": {
            "label": "Hostname ",
            "type": "string",
            "constraints": [
              {
                "type": "blacklist",
                "arrayOfValues": [
                  "http:",
                  "https:",
                  "tcp:",
                  "udp:",
                  "/"
                ],
                "message": "You cannot use protocol scheme or / in the Host name"
              }
            ],
            "visible": {
              "ref": "plugin"
            }
          },
          "port": {
            "label": "Port ",
            "type": "number",
            "visible": {
              "ref": "plugin"
            }
          },
          "weight": {
            "label": "Weight ",
            "type": "number",
            "visible": {
              "ref": "plugin"
            }
          },
          "tls": {
            "label": "Tls ",
            "type": "bool",
            "visible": {
              "ref": "plugin"
            }
          },
          "tls_config": {
            "label": "Tls config ",
            "type": "object",
            "format": "form",
            "collapsable": true,
            "collapsed": true,
            "schema": {
              "enabled": {
                "label": "Enabled ",
                "type": "bool",

              },
              "certs": {
                "label": "Certs ",
                "type": "string",
                "array": true,
                "format": null
              },
              "loose": {
                "label": "Loose ",
                "type": "bool",

              },
              "trust_all": {
                "label": "Trust all ",
                "type": "bool",

              },
              "trusted_certs": {
                "label": "Trusted certs ",
                "type": "string",
                "array": true,
                "format": null
              }
            },
            "flow": [
              "enabled",
              "certs",
              "loose",
              "trust_all",
              "trusted_certs"
            ],
            "visible": {
              "ref": "plugin"
            }
          },
          "id": {
            "label": "Id ",
            "type": "string",
            "visible": {
              "ref": "plugin"
            }
          },
          "ip_address": {
            "label": "Ip address ",
            "type": "string",
            "visible": {
              "ref": "plugin"
            }
          }
        },
        "flow": [
          "custom_target",
          "expert_mode",
          "protocol",
          "hostname",
          "port",
          "weight",
          "tls",
          "id",
          "ip_address",
          "predicate",
          "tls_config"
        ]
      },
      "rewrite": {
        "label": "Rewrite ",
        "type": "bool",
      },
      "load_balancing": {
        "label": "Load balancing ",
        "type": "object",
        "format": "form",
        "collapsable": true,
        "collapsed": true,
        "schema": {
          "type": {
            "label": "Type ",
            "type": "string",
            "format": "select",
            "options": [
              "BestResponseTime",
              "IpAddressHash",
              "Random",
              "RoundRobin",
              "Sticky",
              "WeightedBestResponseTime"
            ]
          },
          "ratio": {
            "label": "Ratio ",
            "type": "number",

          }
        },
        "flow": [
          "type",
          "ratio"
        ]
      }
    },
    "flow": [
      "root",
      "targets",
      "health_check",
      "target_refs",
      "client",
      "rewrite",
      "load_balancing"
    ]
  }
}

export const bigValue = {
  "plugin": {
    "targets": [
      {
        "id": "target_1",
        "hostname": "mirror.otoroshi.io",
        "port": 443,
        "tls": true,
        "weight": 1,
        "predicate": {
          "type": "AlwaysMatch"
        },
        "protocol": "HTTP/1.1",
        "ip_address": null,
        "tls_config": {
          "certs": [],
          "trusted_certs": [],
          "enabled": false,
          "loose": false,
          "trust_all": false
        }
      }
    ],
    "target_refs": [],
    "root": "/",
    "rewrite": false,
    "load_balancing": {
      "type": "RoundRobin"
    },
    "client": {
      "retries": 1,
      "max_errors": 20,
      "retry_initial_delay": 50,
      "backoff_factor": 2,
      "call_timeout": 30000,
      "call_and_stream_timeout": 120000,
      "connection_timeout": 10000,
      "idle_timeout": 60000,
      "global_timeout": 30000,
      "sample_interval": 2000,
      "proxy": {},
      "custom_timeouts": [],
      "cache_connection_settings": {
        "enabled": false,
        "queue_size": 2048
      }
    }
  }
}