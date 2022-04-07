var vlSpec = {
    "$schema": "https://vega.github.io/schema/vega-lite/v5.json",

    //load the data
    "data": {"url":"COVID-data.csv"},

    "vconcat": [
      {
        //set width and height
        "width": 600,
        "height": 500,

        //encode x
        "encoding": {
          //connecting chart 2 to chart 1
          "x": {"field":"Date", "type":"temporal", "scale":{"domain":{"param":"brush"}}}
        },

        //create a layer to create three line graph using different y
        "layer": [
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
          },

          //the vertical target date line
        {
          "data": {
               "values": [
                 {"Date": "2020-12-20"}
               ]
             },
          "mark": { "type": "rule", "color": "red", "size": {"value": 6}}
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

vegaEmbed('#vis', vlSpec);
