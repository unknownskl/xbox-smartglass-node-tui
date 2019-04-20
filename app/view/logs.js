var blessed = require('blessed');

module.exports = function(app)
{
    return {
        _box: false,
        _app: app,

        render: function(){
            this._box = blessed.box({
                top: 0,
                left: 50,
                right: 0,
                bottom: 4,
                content: 'Logs',
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

            return this._box
        }
    }
}
