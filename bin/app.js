#!/usr/bin/env node
const TuiApp = require('../app/boot')

var app = TuiApp()
app.start('192.168.2.5')
