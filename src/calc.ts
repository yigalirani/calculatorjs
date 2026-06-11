import {calc} from './common.js'
export function calc_trip(){
  return calc('tel aviv to paris with two days in athens','$',[
    {
      name:"Tel Aviv - Athens",
      comment:"june 15 3:10 pm – 5:20 pm",
      url:"https://kay.ac/eY7dea",
      amt:111
    },
    {
      name:"two nights in athens hostel",
      comment:"june 15 - june 17",
      url:"https://kay.ac/jxqhiq",
      amt:64
    },
    
   {
      name:"Athens - Paris",
      comment:"june 17 12:10 pm – 2:40 pm",
      url:"https://kay.ac/imrhw6",
      amt:78
    }
  ])
}