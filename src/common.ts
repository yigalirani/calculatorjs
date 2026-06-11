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
function td(a:string){
  return `<td>${a}</td>`
}
function tr(...a:string[]){
  return `<tr>${a.map(td).join('\n')}</tr>`
  //return `<td>${a}</td>`
}
function calc_scenario_html(currency:string,scenario:Scenario,cheapset:Scenario){
  let total=0
  const {lines,title}=scenario
  const cheapset_msg=scenario===cheapset?"-cheapset":''
  const rows=[`<tr class=title><td colspan=4>${title} ${cheapset_msg}</td></tr>`]
  for (const {name,amt,comment,url} of lines){
    total+=amt
    rows.push(tr(name,comment,make_link(url),`${currency}${amt}`))
  }
  rows.push(tr('total','','',`${currency}${total}`))
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
