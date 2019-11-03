export default class Hue {
    constructor(manager) {
        this.manager = manager
        this.selectedLight = '4'
    }
    setLampState(body) {
        fetch(`http://${this.ip}/api/${this.token}/lights/${this.selectedLight}/state`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body)
        })
    }
    createUsername() {
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
}