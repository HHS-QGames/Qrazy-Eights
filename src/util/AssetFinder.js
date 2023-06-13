export default function getGateIconPath(gateType) {
  switch(gateType) {
    case "hadamard":
      return 'assets\\hadamard-gate.png'
    case "cnot":
      return 'assets\\cnot-gate.png'
    case "x":
      return 'assets\\x-gate.png'
    case "y":
      return 'assets\\y-gate.png'
    case "z":
      return 'assets\\z-gate.png'
    default:
      return ''
  }
}