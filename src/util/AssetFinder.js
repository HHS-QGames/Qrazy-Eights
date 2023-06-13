export default function getGateIconPath(gateType) {
  switch(gateType) {
    case "hadamard":
      return 'assets\\hadamard-gate.png'
    case "cnot":
      return 'assets\\cnot-gate.png'
    case "pauli-x":
      return 'assets\\x-gate.png'
    case "pauli-y":
      return 'assets\\y-gate.png'
    case "pauli-z":
      return 'assets\\z-gate.png'
    default:
      return ''
  }
}