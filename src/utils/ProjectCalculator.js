export function calculateBoardLayout(stockBoardLength, measurements) {
    if (measurements.some(cut => cut > stockBoardLength)) {
        console.log(`Stock board length ${stockBoardLength} is too small for project`)
        return {stockBoardLength}
    }

    // optionally square each board
        // any time they need to make a cut, should technically square each end and remove 1/8" for each cut made
    
    measurements.sort((a, b) => a - b)
    let layout = []
    createLayout([...measurements], stockBoardLength, [measurements[measurements.length - 1]], [measurements[measurements.length - 1]], layout)
    let cutPlan = {
        stockBoardLength,
        boards: layout
    }
    return cutPlan
}

function createLayout(measurements, maxLength, currentBoard, currentTotal, layout) {
    if (!measurements.length) {
        if (currentBoard.length) {
            layout.push(currentBoard)
        }
        return;
    }

    if (currentTotal + measurements[0] <= maxLength) {
        currentTotal += (measurements[0] + (1/8)) // adding extra 1/8" for saw blade width
        currentBoard.push(measurements.shift())
        createLayout(measurements, maxLength, currentBoard, currentTotal, layout)
    } else {
        layout.push(currentBoard)
        currentBoard = [measurements.pop()]
        createLayout(measurements, maxLength, currentBoard, currentBoard[0], layout)
    }
}

export function getMixedBoardLengthLayout(stockBoardLengths, singleBoardLengthLayouts) {
    stockBoardLengths.sort((a, b) => a - b)
    let mixedLayout = new Map();
    [...singleBoardLengthLayouts].sort((a, b) => b.stockBoardLength - a.stockBoardLength)[0]?.boards?.forEach(board => {
        let boardTotal = board.reduce((sum, measurement) => sum + measurement, 0) + ((board.length - 1) * (1/8)) // sum of measurements in board + total length lost to saw blade (need to adjust this if end up squaring boards)
        let smallestStockLength = Math.min(...stockBoardLengths.filter(length => length >= boardTotal))
        if (mixedLayout.get(smallestStockLength)) {
            mixedLayout.get(smallestStockLength).push(board)
        } else {
            mixedLayout.set(smallestStockLength, [board])
        }
    })
    return mixedLayout
}