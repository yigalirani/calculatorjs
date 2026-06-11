import Fastify,{type RouteHandlerMethod , type FastifyInstance} from 'fastify'
import form_body from "@fastify/formbody";
import { resolve } from 'upath';
import fastify_static from '@fastify/static';
import type { TypeBoxTypeProvider } from '@fastify/type-provider-typebox';
import cookie from '@fastify/cookie';
import {calc_trip} from './calc.js'
const page_template=
`<!DOCTYPE html>
  <html>

  <head>
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" >
  <meta http-equiv=expires content=-1>
  <meta http-equiv=Cache-Control CONTENT=no-cache>
  <meta http-equiv=Pragma CONTENT=no-cache>

  <link rel="stylesheet" href="/client/style2.css" type="text/css" media="screen" >
    <script type="text/javascript" src="/client/script.js"></script>

  <title>Trip calculator</title>

  </head>
    <body>
      <div class="wrapper">
        <div class="header">
          <h2>Trip Calculator</h2>
        </div>
          <div class=content>
              <div class=content_body>
                ###       
              </div>
  
                  <div class=copyright>
                      Copyright &copy;  2003 - ${new Date().getFullYear()} by symbol click. <A href="http://symbolclick.com/about.htm">Contact info</A>
              </div>
          </div>
      </div>
    </body>
  </html>
`

function register_standard_plugins(app:FastifyInstance){
  const root=resolve('client')
  app.register(fastify_static, {
    root, // Root filesystem path
    prefix: '/client', // URL prefix (optional)
    wildcard: false,
    extensions: ['.js','.css'],
    maxAge: 31_536_000_000,
    immutable: true,
    decorateReply: false
  });  

  
  app.register(cookie, {
      parseOptions: {}, // cookie.parse options
  });     
  app.register(form_body);
}
class MyServer{
  app
  constructor(){
    this.app=Fastify({logger: true}).withTypeProvider<TypeBoxTypeProvider>();
    register_standard_plugins(this.app) 
    this.app.get('/*',this.send_page)
  }

  async start(){
    await this.app.listen({ port: 82 })
  }

  send_page:RouteHandlerMethod =  (request, reply)=> {
    reply.type('text/html').send(page_template.replace('###',calc_trip()))
  }
}
async function bootstap(){
  try{    const server= new MyServer()
    await server.start()
  }catch(ex){
    if (ex instanceof Error)
      console.warn('failed starting the server:',ex.message)
    process.exit(1)
  }
}
//await convert_it()
await bootstap()