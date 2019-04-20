var blessed = require('blessed');

module.exports = function(app)
{
    return {
        _box: false,
        _app: app,

        render: function(){
            this._box =  blessed.box({
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

            return this._box
        }
    }
}
