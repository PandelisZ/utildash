import Koa from 'koa'
import keepalive from 'koa-glitch-keepalive'
import DarkSky from 'dark-sky'
import moment from 'moment'
import _ from 'koa-route'
import serve from 'koa-static'
import water from './backend/water'
import trains from './backend/trains'

const ds = new DarkSky(process.env.DARKSKY_KEY)

const app = new Koa()
const PORT = process.env.PORT || 8080

app.use(keepalive())
app.use(serve('public'))

// call with /api?time=YYYY-MM-DD&lat=0.00000&lng=0.00000
app.use(_.get('/api', async ctx => {
  const time = moment(ctx.request.query.time)
  const weather = [(await ds.coordinates({ lat: ctx.request.query.lat, lng: ctx.request.query.lng }).time(time).get()).daily.data[0]]
  ctx.body = {
    weather,
    water: water(weather),
    trains: trains(weather)
  }
}))

app.listen(PORT)
