
export function randomMachine(a) {
    // https://stackoverflow.com/questions/521295/seeding-the-random-number-generator-in-javascript
    return () => {
      var t = a += 0x6D2B79F5;
      t = Math.imul(t ^ t >>> 15, t | 1);
      t ^= t + Math.imul(t ^ t >>> 7, t | 61);
      return ((t ^ t >>> 14) >>> 0) / 4294967296;
    }
}

export let randomSeed = Math.floor(Math.random() * 100000);
export const currentRandomMachine = { get: randomMachine(randomSeed) }