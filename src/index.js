/*
 * LightningChartJS example that showcases the 'packing resolution' property of StockSeries.
 */
// Import LightningChartJS
const lcjs = require('@arction/lcjs')

// Import xydata
const xydata = require('@arction/xydata')

// Extract required parts from LightningChartJS.
const { lightningChart, AxisTickStrategies, OHLCSeriesTypes, emptyLine, Themes } = lcjs

// Import data-generator from 'xydata'-library.
const { createProgressiveTraceGenerator } = xydata

// Decide on an origin for DateTime axis.
const dateOrigin = new Date(2018, 0, 1)
const dateOriginTime = dateOrigin.getTime()

// Create charts and series for two different packing resolutions.
// NOTE: Using `Dashboard` is no longer recommended for new applications. Find latest recommendations here: https://lightningchart.com/js-charts/docs/basic-topics/grouping-charts/
const dashboard = lightningChart().Dashboard({ numberOfColumns: 1, numberOfRows: 2 })
const chartDefault = dashboard.createChartXY({
    columnIndex: 0,
    rowIndex: 0,
    theme: Themes[new URLSearchParams(window.location.search).get('theme') || 'darkGold'] || undefined,
})
// Use DateTime TickStrategy with custom origin date.
chartDefault.getDefaultAxisX().setTickStrategy(AxisTickStrategies.DateTime, (tickStrategy) => tickStrategy.setDateOrigin(dateOrigin))

chartDefault.setTitle('Default packing resolution').setAutoCursor((cursor) => {
    cursor.setTickMarkerYVisible(false)
    cursor.setGridStrokeYStyle(emptyLine)
})
// Preventing ResultTable from getting cut at the edge
chartDefault.setPadding({
    right: 42,
})

// show title 'USD on Y axis
chartDefault.getDefaultAxisY().setTitle('USD')

const chartLow = dashboard.createChartXY({
    columnIndex: 0,
    rowIndex: 1,
    // theme: Themes.darkGold
})
// Use DateTime TickStrategy with custom origin date.
chartLow.getDefaultAxisX().setTickStrategy(AxisTickStrategies.DateTime, (tickStrategy) => tickStrategy.setDateOrigin(dateOrigin))

chartLow.setTitle('Very small packing resolution').setAutoCursor((cursor) => {
    cursor.setTickMarkerYVisible(false)
    cursor.setGridStrokeYStyle(emptyLine)
})
// Preventing ResultTable from getting cut at the edge
chartLow.setPadding({
    right: 42,
})

// show title 'USD on Y axis
chartLow.getDefaultAxisY().setTitle('USD')

const seriesDefault = chartDefault
    .addOHLCSeries(
        // Specify type of OHLC-series for adding points
        { seriesConstructor: OHLCSeriesTypes.AutomaticPacking },
    )
    .setName('Default packing resolution')

const dataSpan = 60 * 60 * 1000
const dataFrequency = 1 * 1000

const seriesLow = chartLow
    .addOHLCSeries({ seriesConstructor: OHLCSeriesTypes.AutomaticPacking })
    .setName('Very small packing resolution')
    // Set packing resolution that is equal to the minimum resolution between two points.
    // (essentially allows users to zoom to full resolution)
    .setPackingResolution(dataFrequency)

createProgressiveTraceGenerator() // Generating random progressive xy data
    .setNumberOfPoints(dataSpan / dataFrequency)
    .generate()
    .toPromise()
    // Map random generated data to start from a particular date with the frequency of dataFrequency
    .then((data) =>
        data.map((p) => ({
            x: dateOriginTime + p.x * dataFrequency,
            y: p.y,
        })),
    )
    // When data origin is used (required for DateTime axis range smaller than 1 day), time coordinate has to be shifted by date origin.
    .then((data) =>
        data.map((p) => ({
            x: p.x - dateOriginTime,
            y: p.y,
        })),
    )
    .then((data) => {
        seriesDefault.add(data)
        seriesLow.add(data)
        // Fit axes to fully show difference between packing resolutions. (without fitting
        // the initial pixel size of axes would drastically affect automatic packing resolution)
        chartDefault.getDefaultAxisX().fit()
        chartLow.getDefaultAxisX().fit()
    })
