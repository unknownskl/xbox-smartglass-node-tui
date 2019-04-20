var blessed = require('blessed');
var ConsolesView = require('./view/consoles');
var StatusView = require('./view/status');
var LogsView = require('./view/logs');
const Smartglass = require('xbox-smartglass-core-node');

module.exports = function()
{
    var sgClient = Smartglass()

    return {
        _screen: false,
        _boxes: {},

        _sgClient: sgClient,
        _ip: false,

        start: function(){
            // Create a screen object.
            this._screen = blessed.screen({
              smartCSR: true
            });

            this._screen.title = 'xbox-smartglass-node-tui';

            this.renderLayout()


            this.setupKeyCommands()
            this.render()
        },

        connect: function(ip){
            this._boxes['content']._box.setContent('Connecting to xbox...')
            this._screen.render();

            this._sgClient.connect({
                ip: ip
            }, function(result){
                if(result === true){
                    this._boxes['content']._box.setContent('Xbox succesfully connected!');
                } else {
                    this._boxes['content']._box.setContent('Failed to connect to xbox:', result);
                }

                this._screen.render();
            }.bind(this));

            sgClient._on_console_status.push(function(response, device, smartglass){

                // Device connected
                // Active app: response.packet_decoded.protected_payload.apps[0].aum_id
                var apps = ''
                for(var appId in response.packet_decoded.protected_payload.apps){
                    apps += '- '+ response.packet_decoded.protected_payload.apps[appId].aum_id+"\n"
                }
                this._boxes['status']._box.setContent('Status: Connected'+"\n"+apps);
                this._screen.render();
            }.bind(this));
        },

        setupKeyCommands: function(){
            this._screen.key(['escape', 'q', 'C-c'], function(ch, key) {
              return process.exit(0);
            });

            this._screen.key(['d'], function(ch, key) {
                this._boxes['consoles'].discovery()
            }.bind(this));

            this._screen.key(['c'], function(ch, key) {
                this.connect('192.168.2.5')
            }.bind(this));
        },

        renderLayout: function(){

            this._boxes['status'] = StatusView(this);
            this._screen.append(this._boxes['status'].render());

            this._boxes['consoles'] = ConsolesView(this)
            this._screen.append(this._boxes['consoles'].render());

            this._boxes['content'] = LogsView(this)
            this._screen.append(this._boxes['content'].render());
        },

        render: function(){
            this._screen.render();
        }
    }
}
