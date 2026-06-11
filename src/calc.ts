import { calc } from './common.js'
const scenarios = [{
  title: 'tel aviv to paris with two days in athens', lines: [
    {
      name: "Tel Aviv - Athens",
      comment: "june 15 3:10 pm – 5:20 pm",
      url: "https://kay.ac/eY7dea",
      amt: 111
    },
    {
      name: "two nights in athens hostel",
      comment: "june 15 - june 17",
      url: "https://kay.ac/jxqhiq",
      amt: 64
    },

    {
      name: "Athens - Paris",
      comment: "june 17 12:10 pm – 2:40 pm",
      url: "https://kay.ac/imrhw6",
      amt: 78
    }
  ]
}, {
  title: 'tel aviv to paris with one days in athens',
  lines: [
    {
      name: "Tel Aviv - Athens",
      comment: "june 16 3:10 pm – 5:20 pm",
      url: "https://kay.ac/vMD6Lq",
      amt: 121
    },
    {
      name: "one night in athens hostel",
      comment: "june 16 - june 17",
      url: "https://kay.ac/jxqhiq",
      amt: 32
    },
    {
      name: "Athens - Paris",
      comment: "june 17 12:10 pm – 2:40 pm",
      url: "https://kay.ac/imrhw6",
      amt: 32 * 2
    }
  ]
}, {
  title: 'diret flight',
  lines: [{
    name: "direct flight with arkis",
    comment: "june 17 10:30 am – 2:30 pm",
    url: "https://kay.ac/F4bubc",
    amt: 463
  }]
}]
export function calc_trip() {
  return calc('$',scenarios)
}
