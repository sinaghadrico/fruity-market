var port;

(function() {
    'use strict';
  
  
    let textEncoder = new TextEncoder();
  
    /*
    let t = new hterm.Terminal();
    t.onTerminalReady = () => {
      console.log('Terminal ready.');
      let io = t.io.push();
  
      io.onVTKeystroke = str => {
        if (port !== undefined) {
          port.send(textEncoder.encode(str)).catch(error => {
            console.log('Send error: ' + error);
          });
        }
      };
  
      io.sendString = str => {
        if (port !== undefined) {
          port.send(textEncoder.encode(str)).catch(error => {
            console.log('Send error: ' + error);
          });
        }
      };
    };
  */
    document.addEventListener('DOMContentLoaded', event => {
      let connectButton = document.querySelector('#connect');
  
      function connect() {
        console.log('Connecting to ' + port.device_.productName + '...');
        port.connect().then(() => {
          console.log(port);
          console.log('Connected.');
          connectButton.textContent = 'Disconnect';
          port.onReceive = data => {
            let textDecoder = new TextDecoder();
            t.io.print(textDecoder.decode(data));
          }
          port.onReceiveError = error => {
            console.log('Receive error: ' + error);
          };
        }, error => {
          console.log('Connection error: ' + error);
        });
      };
  
      connectButton.addEventListener('click', function() {
        if (port) {
          port.disconnect();
          connectButton.textContent = 'Connect';
          port = null;
        } else {
          serial.requestPort().then(selectedPort => {
            port = selectedPort;
            connect();
          }).catch(error => {
            console.log('Connection error: ' + error);
          });
        }
      });
  
      serial.getPorts().then(ports => {
        if (ports.length == 0) {
          console.log('No devices found.');
        } else {
          port = ports[0];
          connect();
        }
      });
    });
  })();
  
  function withdrawFruit(str) {
    if (port !== undefined) {
        port.send(textEncoder.encode(str)).catch(error => {
          console.log('Send error: ' + error);
        });
      }
  }