import { Server } from './presentation/server'

(() => {
  main()
})()

async function main () {
  new Server({
    port: 3030
  }).start()
}
