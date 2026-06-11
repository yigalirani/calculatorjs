export interface Line{
  amt:number
  name:string
  comment:string
  url:string
}
function make_link(url:string){
  return `<a target="_blank" rel="noopener noreferrer" href="${url}">${url} </a> `
}
  
export function calc(title:string,currency:string,lines:Line[]){
  let total=0
  const rows=[]
  for (const {name,amt,comment,url} of lines){
    total+=amt
    rows.push(`<tr>
      <td>${name}</td>
      <td>${comment}</td>
      <td>${make_link(url)}</td>
      <td>${currency}${amt}</td>
    </tr>`)
  }
    rows.push(`<tr>
      <td>total</td>
      <td></td>
      <td></td>
      <td>${currency}${total}</td>
    </tr>`)  
    return `
    <h3>${title}</h3><table>
    <tr>
      <th>item</th>
      <th>comment</th>
      <th>link</th>
      <th>amt</td>
    </tr>
    ${rows.join('\n')}
    </table>
    `
}
