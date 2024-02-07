import { TextureLoader, SphereGeometry, MeshPhongMaterial, Mesh } from 'three';

export default class Planet {
    constructor(radius, width, height, texture, bump_texture = null) {
        this.radius = radius
        this.width = width
        this.height = height
        this.texture = texture
        this.bump_texture = bump_texture

        this.rotation = false
        this.currentXPosition = 0
        this.currentYPosition = 0

        this.object = null
    }

    plane() {
        const geometry = new SphereGeometry( this.radius, this.width, this.height ); 
        const material = new MeshPhongMaterial(); 

        material.map = new TextureLoader().load(this.texture)
        if (this.bump_texture) {
            material.bumpMap = new TextureLoader().load(this.bump_texture)
            material.bumpScale = 0.025
        }
        
        this.object = new Mesh( geometry, material ); 
        return this.object
    }

    allowRotate() {
        let vm = this
        return function (event) {
            event.preventDefault()

            if (event.type == 'mousedown' || event.type == 'touchstart') {
                vm.currentXPosition = event.clientX || event.touches[0].clientX
                vm.currentYPosition= event.clientY || event.touches[0].clientY
                vm.rotation = true
            } else if (event.type == 'mouseup' || event.type == 'touchend') {
                vm.rotation = false
            }
        }
    }

    rotate() {
        let vm = this
        return function (event) {

            let clientX = 0
            let clientY = 0

            if (event.type == 'mousemove') {
                clientX = event.clientX
                clientY = event.clientY
            } else if (event.type == 'touchmove') {
                clientX = event.touches[0].clientX
                clientY = event.touches[0].clientY
            }

            if (vm.rotation) {
                if (!vm.object) return
    
                let deltaX = (clientX - vm.currentXPosition) * 0.003
                let deltaY = (clientY - vm.currentYPosition) * 0.003
                vm.currentXPosition = clientX
                vm.currentYPosition = clientY

                vm.object.rotation.y += deltaX
                vm.object.rotation.x += deltaY
            }
        }
    }
}