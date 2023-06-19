export default class GameSettings {
  constructor(
    qubitCount = 4,
    startingHandSize = 11,
    hadamardCountPP = 4,
    xCountPP = 3,
    yCountPP = 3,
    zCountPP = 3,
    cnotCountPP = 3,
    measureCountPP = 2,
    destroyPerGateCount = 0.5,
    totalCardMultiplier = 5
  ) {
    this.qubitCount = qubitCount;
    this.startingHandSize = startingHandSize;
    this.hadamardCountPP = hadamardCountPP;
    this.xCountPP = xCountPP;
    this.yCountPP = yCountPP;
    this.zCountPP = zCountPP;
    this.cnotCountPP = cnotCountPP;
    this.measureCountPP = measureCountPP;
    this.destroyPerGateCount = destroyPerGateCount;
    this.totalCardMultiplier = totalCardMultiplier;
  }
}
