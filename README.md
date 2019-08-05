# OHLC series automatic packing resolution

This demo application belongs to the set of examples for LightningChart JS, data visualization library for JavaScript.

LightningChart JS is entirely GPU accelerated and performance optimized charting library for presenting massive amounts of data. It offers an easy way of creating sophisticated and interactive charts and adding them to your website or web application.

The demo can be used as an example or a seed project. Local execution requires the following steps:

- Make sure that relevant version of [Node.js](https://nodejs.org/en/download/) is installed
- Open the project folder in a terminal:

        npm install              # fetches dependencies
        npm start                # builds an application and starts the development server

- The application is available at *http://localhost:8080* in your browser, webpack-dev-server provides hot reload functionality.

### Description

The examples purpose is to shed some light on the packing logic of OHLCSeriesWithAutomaticPacking and how it can be fit to users needs by usage of method: 'setPackingResolution'.

This class is a variant of OHLCSeries, which adds the automatic packing of XY-points to XOHLC-points. In a nutshell, when pushing points, it simply packages these points into 'XOHLC'-objects at certain intervals (which is controlled by the packing resolution property). 

By default, or if packing resolution is explicitly set to 'undefined', the used value will be automatically computed based on current pixel-size. This effectively means that any newly pushed points will never be able to be zoomed closer than the view at the time of packing.

To ensure that the figures can be zoomed up to desired details, users can set an explicit value for the packing resolution, which will specify the minimum interval (in axis values) between two fully zoomed figures.

[//]: # "IMPORTANT: The assets will not show before README.md is built - relative path is different!"

![](./assets/ohlcPackingResolution.png)

### API links

* Axis tick strategies: [AxisTickStrategies][]
* XY cartesian chart: [ChartXY][]
* OHLC series types: [OHLCSeriesTypes][]
* OHLC-series with automatic packing: [OHLCSeriesWithAutomaticPacking][]
* Progressive trace generator: [ProgressiveTraceGenerator][]


### Support

If you notice an error in the example code, please open an issue on [GitHub][0] repository of the entire example.

Official [API documentation][1] can be found on [Arction][2] website.

If the docs and other materials do not solve your problem as well as implementation help is needed, ask on [StackOverflow][3] (tagged lightningchart).

If you think you found a bug in the LightningChart JavaScript library, please contact support@arction.com.

Direct developer email support can be purchased through a [Support Plan][4] or by contacting sales@arction.com.

© Arction Ltd 2009-2019. All rights reserved.

[0]: https://github.com/Arction/
[1]: https://www.arction.com/lightningchart-js-api-documentation/
[2]: https://www.arction.com
[3]: https://stackoverflow.com/questions/tagged/lightningchart
[4]: https://www.arction.com/support-services/

[AxisTickStrategies]: https://www.arction.com/lightningchart-js-api-documentation/v1.0.0/globals.html#axistickstrategies
[ChartXY]: https://www.arction.com/lightningchart-js-api-documentation/v1.0.0/classes/chartxy.html
[OHLCSeriesTypes]: https://www.arction.com/lightningchart-js-api-documentation/v1.0.0/globals.html#ohlcseriestypes
[OHLCSeriesWithAutomaticPacking]: https://www.arction.com/lightningchart-js-api-documentation/v1.0.0/classes/ohlcserieswithautomaticpacking.html
[ProgressiveTraceGenerator]: https://arction.github.io/xydata/classes/progressivetracegenerator.html