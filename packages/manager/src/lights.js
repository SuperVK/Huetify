import noble from 'noble';

export default class Hue {
    constructor(manager) {
        this.manager = manager
        this.selectedLight = '1'
        this.isReady = false;
    }
    setLampState(body) {
        if(this.ip === undefined) return reject('No hue IP found while attempting to get all Lights')
        fetch(`http://${this.ip}/api/${this.token}/lights/${this.selectedLight}/state`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body)
        })
    }
    createUsername() {
        if(this.ip === undefined) return reject('No hue IP found while attempting to get all Lights')
        return new Promise((resolve, reject) => {
            fetch(`http://${this.ip}/api`, {
                method: 'POST',
                // headers: {
                //     'Content-Type': 'application/json',
                // },
                body: JSON.stringify({
                    devicetype: `huetify`
                })
            }).then(res => res.json()).then(body => {
                if(body[0].error !== undefined) reject(body[0].error)
                else resolve(body[0].success.username)
            })
        })
    }
    // Get hue token and bridges
    async getBridges() {
        return new Promise((resolve, reject) => {
            fetch(`https://discovery.meethue.com/`).then(data => data.json())
                .then(bridges => {
                    resolve(bridges)
                })
        })

    }
    async getAllLights() {
        return new Promise((resolve, reject) => {
            if(this.ip === undefined) return reject('No hue IP found while attempting to get all Lights')
            fetch(`http://${this.ip}/api/${this.token}/lights`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            }).then(body => body.json())
                .then(lights => {
                    let lightsArr = []
                    for(let light in lights) {
                        let newLight = lights[light]
                        newLight.id = light
                        lightsArr.push(newLight)
                    }


                    resolve(lightsArr)
                })
        })
    }
    turnOff() {
        this.manager.hue.setLampState({
            on: false,
            transitiontime: 0
        })
    }
    turnOn() {
        this.manager.hue.setLampState({
            on: true,
            transitiontime: 0
        })
    }
}

export class Zengge {
    constructor(manager) {
        this.manager = manager;
        this.selectedLight = '08:65:F0:21:2F:A9'; // Replace with the MAC address of your Bluetooth light
        this.isReady = false;

        // Initialize Bluetooth
        noble.on('stateChange', (state) => {
            if (state === 'poweredOn') {
                this.isReady = true;
            } else {
                this.isReady = false;
            }
        });

        noble.on('discover', (peripheral) => {
            if (peripheral.address === this.selectedLight) {
                this.selectedPeripheral = peripheral;
                noble.stopScanning();
            }
        });
    }

    setLampState(body) {
        if (!this.isReady) {
            console.error('Bluetooth not ready');
            return;
        }

        if (!this.selectedPeripheral) {
            console.error('Bluetooth light not found');
            return;
        }

        const { characteristics } = this.selectedPeripheral;

        // Modify this section based on the specific Bluetooth protocol of your light
        const writeCharacteristic = characteristics.find((characteristic) =>
            characteristic.properties.includes('write')
        );

        if (!writeCharacteristic) {
            console.error('Write characteristic not found');
            return;
        }

        const data = Buffer.from(JSON.stringify(body), 'utf-8');
        writeCharacteristic.write(data, true, (error) => {
            if (error) {
                console.error('Failed to write data to Bluetooth light', error);
            } else {
                console.log('Successfully wrote data to Bluetooth light');
            }
        });
    }

    // Additional methods for Bluetooth lights can be added as needed

    // Example method to turn off the Bluetooth light
    turnOff() {
        // Use the setLampState method to send the command to turn off the light
        this.setLampState({
            on: false,
            transitiontime: 0
        });
    }

    // Example method to turn on the Bluetooth light
    turnOn() {
        // Use the setLampState method to send the command to turn on the light
        this.setLampState({
            on: true,
            transitiontime: 0
        });
    }
}
