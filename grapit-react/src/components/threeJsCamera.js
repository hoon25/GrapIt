import * as THREE from 'three';

const camera = new THREE.OrthographicCamera()

camera.zoom = (60 * window.innerWidth) / 1490
camera.position.x = 100
camera.position.y = 50
camera.position.z = 100
camera.lookAt(new THREE.Vector3(0, 0, 0))
camera.isOnMouseDown = false

export const logCamera = () => {
  console.log(camera);
}

export const incCamera = () => {
  camera.position.x += 1;
}

export const decCamera = () => {
  camera.position.x -= 1;
}

export const resetCamera = () => {
  camera.zoom = (60 * window.innerWidth) / 1490
  camera.position.x = 100
  camera.position.y = 50
  camera.position.z = 100
  camera.lookAt(new THREE.Vector3(0, 0, 0))
  camera.updateProjectionMatrix()
}

export const setCamera = (newCamera) => {
  camera.zoom = (newCamera.zoom * window.innerWidth) / 1490
  camera.position.x = newCamera.position[0]
  camera.position.y = newCamera.position[1]
  camera.position.z = newCamera.position[2]
  camera.rotation.set(newCamera.rotation)
  camera.lookAt(new THREE.Vector3(0, 0, 0))
  camera.updateProjectionMatrix()
}

// const threeJsCamera = camera

export { camera as threeJsCamera };