var vlSpec = {
    "$schema": "https://vega.github.io/schema/vega-lite/v4.json",

    //load the data
    "data": {"url":"COVID-data.csv"},

    //create three checkbox
    "params": [
      {"name": "Lockdown", "bind": {"input": "checkbox"}},
      {"name": "Mandate", "bind": {"input": "checkbox"}},
      {"name": "Vaccines", "bind": {"input": "checkbox"}}
    ],

    "vconcat": [
      {
        //set width and height
        "width": 600,
        "height": 500,

        //encode x
        "encoding": {
          //connecting chart 2 to chart 1
          "x": {"field":"Date", "type":"temporal", "title":"Date", "scale":{"domain":{"param":"brush"}}}
        },

        //create a layer to create three line graph using different y
        "layer": [

          //Create vaccine line
          {
            "data": {"values": [{"Date": "2020-12-20"}]},
            "mark": {"type":"rule", "size": {"value": 10}},
            "encoding": {
              "color":{
                "condition":{"param" : "Vaccines", "value":"red"},
                "value":"transparent"
              }
            }
          },

          //create Mandate color block
          {
            "mark": {"type":"rect"},
            "data": {
              "values": [{"start": "2020-12-28" , "end": "2022-3-22"}]
            },
            "encoding": {
              "x": {"field": "start"},
              "x2": {"field": "end"},
              "color": {
                "condition":{"param" : "Mandate", "value":"#f9efc0"},
                "value":"transparent"
              }
            }
          },

          //create Lockdown color block (1)
          {
            "mark": {"type":"rect"},
            "data": {
              "values": [{"start": "2020-12-28" , "end": "2021-1-25"}]
            },
            "encoding": {
              "x": {"field": "start"},
              "x2": {"field": "end"},
              "color": {
                "condition":{"param" : "Lockdown", "value":"#fad0de"},
                "value":"transparent"
              }
            }
          },
          //create Lockdown color block (2)
          {
            "mark": {"type":"rect"},
            "data": {
              "values": [{"start": "2021-4-3" , "end": "2021-5-1"}]
            },
            "encoding": {
              "x": {"field": "start"},
              "x2": {"field": "end"},
              "color": {
                "condition":{"param" : "Lockdown", "value":"#fad0de"},
                "value":"transparent"
              }
            }
          },

          //Daily Cases by Reported Date
          {
            "mark": {"type":"line"},
            "encoding": {
              "y": {"field":"Daily Cases by Reported Date", "type":"quantitative", "title":"Cases"}
            }
          },
          //Cases Currently in Hospital
          {
            "mark": {"type":"line"},
            "encoding": {
              "y": {"field":"Cases Currently in Hospital", "type":"quantitative"},
              "color": {"value":"red"}
            }
          },
          //Cases Currently in ICU
          {
            "mark": {"type":"line"},
            "encoding": {
              "y": {"field":"Cases Currently in ICU", "type":"quantitative"},
              "color": {"value":"green"}
            }
          }
        ]
      },
      {
        //set width and height
        "width": 600,
        "height": 100,

        //create brush for user to select
        "params": [
          {"name":"brush", "select":{"type":"interval", "encodings":["x"]}}
        ],

        //encode x
        "encoding": {
          "x": {"field":"Date", "type":"temporal"}
        },

        //create a layer to create three line graph using different y
        "layer": [
          //Daily Cases by Reported Date
          {
            "mark": {"type":"bar"},
            "encoding": {
              "y": {"field":"Daily Cases by Reported Date", "type":"quantitative", "title":"Cases"}
            }
          }
        ]
      }
    ]
};

//reference: https://vega.github.io/vega-lite/examples/interactive_bin_extent.html
//reference: https://vega.github.io/vega-lite/docs/parameter.html
//reference: https://vega.github.io/vega-lite/examples/layer_falkensee.html


vegaEmbed('#vis', vlSpec);

