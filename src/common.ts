export interface Line{
  amt:number
  name:string
  comment:string
  url:string
}
export interface Scenario{
  title:string,
  lines:Line[]
}
function make_link(url:string){
  return `<a target="_blank" rel="noopener noreferrer" href="${url}">${url} </a> `
}
function calc_one(scenario:Scenario){
  let ans=0
  for (const line of scenario.lines)
    ans+=line.amt
  return ans
}
type Atom=string|number|Price
interface Price{
  amt:number
  currency:string
}
function td(a:Atom){
  if (typeof (a)==='number')
    return `<td class=number>${a}</td>`
  if (typeof (a)==='string')
    return `<td >${a}</td>`  
  return `<td class=number>${a.currency}${a.amt}</td>`
}


function tr(...a:Atom[]){
  
  return `<tr>${a.map(td).join('\n')}</tr>`
  //return `<td>${a}</td>`
}  
function calc_scenario_html(currency:string,scenario:Scenario,cheapset:Scenario){

  let total=0
  const {lines,title}=scenario
const cheapset_msg=scenario===cheapset?"<span class=highlight>-cheapset</spsan>":''
  const rows=[`<tr class=title><td colspan=4>${title} ${cheapset_msg}</td></tr>`]
  for (const {name,amt,comment,url} of lines){
    total+=amt
    rows.push(tr(name,comment,make_link(url),{amt,currency}))
  }
  rows.push(tr('total','','',{amt:total,currency}))
  return rows.join('\n')
}

export function calc(currency:string,scenarios:Scenario[]){
  const cheapset=scenarios.reduce((a, b) =>calc_one(b) < calc_one(a) ? b : a)
  const html=[`<tr>
      <th>item</th>
      <th>comment</th>
      <th>link</th>
      <th>amt</td>
    </tr>`]
  for (const scenario of scenarios){
    const one_html=calc_scenario_html(currency,scenario,cheapset)
    html.push(one_html)
  }
  const ans= `<table>${html.join('\n')}</table>`
  return ans
}
