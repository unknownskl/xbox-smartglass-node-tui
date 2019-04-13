var blessed = require('blessed');

module.exports = function()
{
    return {
        _screen: false,
        _boxes: {},

        start: function(ip){
            // Create a screen object.
            this._screen = blessed.screen({
              smartCSR: true
            });

            this._screen.title = 'xbox-smartglass-node-tui';

            this.renderLayout()


            this.setupKeyCommands()
            this.render()
        },

        setupKeyCommands: function(){
            this._screen.key(['escape', 'q', 'C-c'], function(ch, key) {
              return process.exit(0);
            });
        },

        renderLayout: function(){

            this._boxes['console'] = blessed.box({
                top: 0,
                left: 0,
                width: 50,
                bottom: 4,
                content: 'Console list',
                tags: true,
                border: {
                type: 'line',
                fg: 'white'
            },
                style: {
                    fg: 'white',
                    bg: 'black',
                    border: {
                        fg: '#f0f0f0'
                    }
                }
            });

            // Append our box to the screen.
            this._screen.append(this._boxes['console']);

            this._boxes['status'] = blessed.box({
                left: 0,
                right: 0,
                height: 5,
                bottom: 0,
                content: 'Status',
                tags: true,
                border: {
                type: 'line',
                fg: 'white'
            },
                style: {
                    fg: 'white',
                    bg: 'black',
                    border: {
                        fg: '#f0f0f0'
                    }
                }
            });

            // Append our box to the screen.
            this._screen.append(this._boxes['status']);

            this._boxes['content'] = blessed.box({
                top: 0,
                left: 50,
                right: 0,
                bottom: 4,
                content: 'Content',
                tags: true,
                border: {
                type: 'line',
                fg: 'white'
            },
                style: {
                    fg: 'white',
                    bg: 'black',
                    border: {
                        fg: '#f0f0f0'
                    }
                }
            });

            // Append our box to the screen.
            this._screen.append(this._boxes['content']);
        },

        render: function(){
            this._screen.render();
        }
    }
}
