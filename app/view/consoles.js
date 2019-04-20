var blessed = require('blessed');
const Smartglass = require('xbox-smartglass-core-node');

module.exports = function(app)
{
    var sgClient = Smartglass()

    return {
        _box: false,
        _sgClient: sgClient,
        _app: app,

        init: function(){
            this._sgClient.discovery({
                ip: '192.168.2.5'
            }, function(device, address){
                this._box.setContent(device.name+' ('+address.address+':'+address.port+')')
                this._app._screen.render();
            }.bind(this));
        },

        discovery: function(){
            this._box.setContent('Searching for Xbox console on network...')
            this._app._screen.render();

            this._sgClient.discovery({
                ip: '192.168.2.5'
            }, function(device, address){
                this._box.setContent(device.name+' ('+address.address+':'+address.port+')')
                this._app._screen.render();
            }.bind(this));
        },

        render: function(){
            this._box =  blessed.box({
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

            this.init()

            return this._box
        }
    }
}
