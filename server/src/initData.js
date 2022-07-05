const data = {
  bod: [
    [4, 6],
    [6, 15],
    [15, 25],
    [25, 50],
    [50, 100]
  ],

  cod: [
    [10, 15],
    [15, 30],
    [30, 50],
    [50, 80],
    [80, 120]
  ],

  nh4: [
    [0.1, 0.2],
    [0.2, 0.5],
    [0.5, 1],
    [1, 5],
    [5, 10]
  ],

  po4: [
    [0.1, 0.2],
    [0.2, 0.3],
    [0.3, 0.6],
    [0.5, 6],
    [6, 10]
  ],

  turbidity: [
    [0, 20],
    [20, 30],
    [30, 70],
    [70, 100],
    [100, 5000]
  ],

  tss: [
    [20, 30],
    [30, 50],
    [50, 100],
    [100, 101],
    [101, 200]
  ],

  coliform: [
    [2500, 5000],
    [5000, 7500],
    [7500, 10000],
    [10000, 10001],
    [10001, 200000]
  ]
}

const isBetween = (value, min, max) => {
  return value >= Number(min) && value < Number(max)
}

const initDataCommon = (initData) => {
  const result = {}
  let suftData = []
  const val = [100, 75, 50, 25, 1]
  for (key in initData) {
    let q = []
    let bp = []

    suftData = data[key]

    const findedIndex = suftData.findIndex((range) => isBetween(initData[key], range[0], range[1]))
    bp[0] = data[key][findedIndex][0]
    bp[1] = data[key][findedIndex][1]
    q[0] = val[findedIndex]
    q[1] = val[findedIndex + 1] ?? val[findedIndex]

    console.log(initData)
    result[key] = ((q[0] - q[1]) * (bp[1] - initData[key])) / (bp[1] - bp[0]) + q[1]
    result[key] = result[key].toFixed(1)
  }

  return result
}

const initDO = (DO, t) => {
  const bpRanges = [
    [20, 50],
    [50, 75],
    [75, 88],
    [112, 125],
    [125, 150],
    [150, 200]
  ]

  const qRanges = [
    [25, 50],
    [50, 75],
    [75, 100],
    [100, 75],
    [75, 50],
    [50, 25]
  ]

  const dobh = 14.652 - 0.41022 * t + 0.007991 * t * t - 0.000077774 * t * t * t

  const percentDo = (DO / dobh) * 100

  if (percentDo < 20 || percentDo >= 200) {
    return 1
  }

  if (percentDo <= 112 && percentDo >= 88) {
    return 100
  }

  let q = []
  let bp = []

  bpRanges.forEach((item, index) => {
    if (isBetween(percentDo, item[0], item[1])) {
      bp = item
      q = qRanges[index]
    }
  })

  return (((q[1] - q[0]) * (percentDo - bp[0])) / (bp[1] - bp[0]) + q[0]).toFixed(1)
}

/**
 * Init PH WQI
 * @param {} phData
 * @returns
 */
function initPH(phData) {
  let bp = []
  let q = []
  const ph = Number(phData)

  if (ph <= 5.5 || ph >= 9) {
    return 10
  }

  if (ph > 5.5 && ph < 6) {
    bp = [5.5, 6]
    q = [50, 100]
    return (((q[1] - q[0]) * (ph - bp[0])) / (bp[1] - bp[0]) + q[0]).toFixed(1)
  }

  if (ph >= 6 && ph <= 8.5) {
    return 100
  }

  if (ph > 8.5 && ph < 9) {
    bp = [8.5, 9]
    q = [100, 50]
    return ((q[0] - q[1]) * (bp[1] - initData[key])) / (bp[1] - bp[0]) + q[1]
  }
}

const getRandom = (min, max) => {
  return Number(Math.random() * (max - min) + min)
}

const initDataTest = () => {
  return {
    bod: getRandom(10, 30),
    cod: getRandom(20, 110),
    nh4: getRandom(4, 7),
    po4: getRandom(4, 10),
    tss: getRandom(20, 100),
    coliform: getRandom(2500, 10000)
  }
}

const caculateWqi = (turbidityInit, t) => {
  const dataTest = initDataTest()
  const ph = getRandom(5.6, 10)
  const doData = getRandom(2, 8)
  const res = initDataCommon({ ...dataTest, turbidity: turbidityInit })
  const { bod, cod, nh4, po4, turbidity, tss, coliform } = res

  const wqiPh = initPH(ph)

  const DO = initDO(doData, t)

  const midData =
    ((Number(DO) + Number(bod) + Number(nh4) + Number(po4) + Number(cod)) *
      (Number(tss) + Number(turbidity)) *
      Number(coliform)) /
    10

  const result = (wqiPh / 100) * Math.pow(midData, 1 / 3)
  console.log(result)
}

caculateWqi(0.5, 27.5)
