/**
 * LightningChartJS example that showcases the 'packing resolution' property of StockSeries.
 */
// Import LightningChartJS
const lcjs = require('@arction/lcjs')

// Extract required parts from LightningChartJS.
const {
    lightningChart,
    AxisTickStrategies,
    OHLCSeriesTypes,
    emptyLine
} = lcjs

// Import data-generator from 'xydata'-library.
const {
    createProgressiveTraceGenerator
} = require('@arction/xydata')

const div1 = document.createElement('div')
div1.id = 'div1'
document.body.appendChild(div1)
const div2 = document.createElement('div')
div2.id = 'div2'
document.body.appendChild(div2)

const dataSpan = 60 * 60 * 1000
const dataFrequency = 1 * 1000

// Decide on an origin for DateTime axis.
const dateOrigin = new Date(2018, 0, 1)
const dateTimeTickStrategy = AxisTickStrategies.DateTime(dateOrigin)

// Create charts and series for two different packing resolutions.
const lc = lightningChart()
const chartHeight = window.innerHeight * .5
const chartDefault = lc.ChartXY({
    containerId: 'div1',
    height: chartHeight,
    defaultAxisXTickStrategy: dateTimeTickStrategy
})
    .setTitle('Default packing resolution')
    .setAutoCursor(cursor => {
        cursor.disposeTickMarkerY()
        cursor.setGridStrokeYStyle(emptyLine)
    })
    // Preventing ResultTable from getting cut at the edge
    .setPadding({
        right: 42
    })

// show title 'USD on Y axis
chartDefault.getDefaultAxisY()
    .setTitle('USD')

const chartLow = lc.ChartXY({
    containerId: 'div2',
    height: chartHeight,
    defaultAxisXTickStrategy: dateTimeTickStrategy
})
    .setTitle('Very small packing resolution')
    .setAutoCursor(cursor => {
        cursor.disposeTickMarkerY()
        cursor.setGridStrokeYStyle(emptyLine)
    })
    // Preventing ResultTable from getting cut at the edge
    .setPadding({
        right: 42
    })

// show title 'USD on Y axis
chartLow.getDefaultAxisY()
    .setTitle('USD')

const seriesDefault = chartDefault.addOHLCSeries(
    // Specify type of OHLC-series for adding points
    { seriesConstructor: OHLCSeriesTypes.AutomaticPacking }
)
    .setName('Default packing resolution')

const seriesLow = chartLow.addOHLCSeries({ seriesConstructor: OHLCSeriesTypes.AutomaticPacking })
    .setName('Very small packing resolution')
    // Set packing resolution that is equal to the minimum resolution between two points.
    // (essentially allows users to zoom to full resolution)
    .setPackingResolution(dataFrequency)

// Push points to both series.
createProgressiveTraceGenerator()
    .setNumberOfPoints(dataSpan / dataFrequency)
    .generate()
    .toPromise()
    .then((data) => data.map((p) => ({
        x: p.x * dataFrequency, y: p.y
    })))
    .then((data) => {
        seriesDefault.add(data)
        seriesLow.add(data)
        // Fit axes to fully show difference between packing resolutions. (without fitting
        // the initial pixel size of axes would drastically affect automatic packing resolution)
        chartDefault.getDefaultAxisX().fit()
        chartLow.getDefaultAxisX().fit()
    })
