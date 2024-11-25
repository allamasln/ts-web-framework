import 'dotenv/config'

import { Bootstraper } from 'lib'
import { Main } from './main'

const bootstraper = new Bootstraper()
bootstraper.bootstrap(Main)
