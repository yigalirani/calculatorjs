export interface Line{
  amt:number
  name:string
  comment:string
  url:string
}
export function calc(title:string,lines:Line[]){
  let total=0
  const rows=[]
  for (const {name,amt,comment,url} of lines){
    total+=amt
    rows.push(`<tr>
      <td>${name}</td>
      <td>${comment}</td>
      <td><a href="${url}">${url}</a></td>
      <td>${amt}</td>
    </tr>`)
  }
    rows.push(`<tr>
      <td>total</td>
      <td></td>
      <td></td>
      <td>${total}</td>
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
