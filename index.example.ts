import { Bootstraper } from './src'
import { AppMainModule } from './example/app.module'

const bootstraper = new Bootstraper()
bootstraper.bootstrap(AppMainModule)
