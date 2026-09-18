import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import {
  compositionFragmentShader,
  discFragmentShader,
  discVertexShader,
  distortionFragmentShader,
  distortionMaskFragmentShader,
  distortionVertexShader,
  orbitFragmentShader,
  orbitVertexShader,
  screenVertexShader,
  starFragmentShader,
  starVertexShader,
} from './blackHoleShaders'

function createNoiseTexture(size = 128) {
  const data = new Uint8Array(size * size * 4)

  for (let y = 0; y < size; y += 1) {
    for (let x = 0; x < size; x += 1) {
      const offset = (y * size + x) * 4
      const wave =
        Math.sin(x * 0.18) * 0.25 +
        Math.sin((x + y) * 0.095) * 0.2 +
        Math.cos(y * 0.16) * 0.2 +
        Math.sin((x * 2 - y) * 0.045) * 0.16
      const grain = Math.random() * 0.19
      const value = THREE.MathUtils.clamp((wave + 0.82 + grain) * 142, 0, 255)
      data[offset] = value
      data[offset + 1] = value
      data[offset + 2] = value
      data[offset + 3] = 255
    }
  }

  const texture = new THREE.DataTexture(data, size, size, THREE.RGBAFormat)
  texture.wrapS = THREE.RepeatWrapping
  texture.wrapT = THREE.RepeatWrapping
  texture.minFilter = THREE.LinearFilter
  texture.magFilter = THREE.LinearFilter
  texture.needsUpdate = true
  return texture
}

export default function BlackHoleCanvas() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    const hero = container?.closest('.hero')
    if (!container || !(hero instanceof HTMLElement)) return

    const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)')
    let reducedMotion = motionPreference.matches
    let renderer: THREE.WebGLRenderer

    try {
      renderer = new THREE.WebGLRenderer({ alpha: false, antialias: true, powerPreference: 'high-performance' })
    } catch {
      container.dataset.webgl = 'unavailable'
      return
    }

    renderer.setClearColor(0x030201, 1)
    renderer.outputColorSpace = THREE.SRGBColorSpace
    renderer.domElement.setAttribute('aria-hidden', 'true')
    container.appendChild(renderer.domElement)

    const spaceScene = new THREE.Scene()
    const distortionScene = new THREE.Scene()
    const finalScene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 1000)
    const finalCamera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 10)
    finalCamera.position.z = 1

    const spaceTarget = new THREE.WebGLRenderTarget(1, 1, {
      minFilter: THREE.LinearFilter,
      magFilter: THREE.LinearFilter,
      depthBuffer: true,
    })
    spaceTarget.texture.colorSpace = THREE.SRGBColorSpace
    const distortionTarget = new THREE.WebGLRenderTarget(1, 1, {
      minFilter: THREE.LinearFilter,
      magFilter: THREE.LinearFilter,
      depthBuffer: true,
      type: THREE.HalfFloatType,
    })

    const finalMaterial = new THREE.ShaderMaterial({
      uniforms: {
        uSpaceTexture: { value: spaceTarget.texture },
        uDistortionTexture: { value: distortionTarget.texture },
        uBlackHolePosition: { value: new THREE.Vector2(0.5, 0.5) },
        uRGBShiftRadius: { value: 0.00018 },
      },
      vertexShader: screenVertexShader,
      fragmentShader: compositionFragmentShader,
      depthWrite: false,
      depthTest: false,
    })
    const finalPlaneGeometry = new THREE.PlaneGeometry(2, 2)
    const finalPlane = new THREE.Mesh(finalPlaneGeometry, finalMaterial)
    finalPlane.frustumCulled = false
    finalScene.add(finalPlane)

    const noiseTexture = createNoiseTexture()
    const innerColor = new THREE.Color('#ffb17c')
    const outerColor = new THREE.Color('#7d1f2d')

    const discGeometry = new THREE.CylinderGeometry(5, 1, 0, 64, 10, true)
    const discMaterial = new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uNoiseTexture: { value: noiseTexture },
        uInnerColor: { value: innerColor },
        uOuterColor: { value: outerColor },
      },
      vertexShader: discVertexShader,
      fragmentShader: discFragmentShader,
      side: THREE.DoubleSide,
      transparent: true,
      depthWrite: false,
      depthTest: false,
      blending: THREE.AdditiveBlending,
    })
    const disc = new THREE.Mesh(discGeometry, discMaterial)
    spaceScene.add(disc)

    const orbitCount = window.innerWidth < 820 ? 24000 : 50000
    const orbitGeometry = new THREE.BufferGeometry()
    const orbitPositions = new Float32Array(orbitCount * 3)
    const orbitProgress = new Float32Array(orbitCount)
    const orbitSizes = new Float32Array(orbitCount)
    const orbitRandom = new Float32Array(orbitCount)

    for (let index = 0; index < orbitCount; index += 1) {
      orbitProgress[index] = Math.random()
      orbitSizes[index] = Math.random()
      orbitRandom[index] = Math.random()
    }

    orbitGeometry.setAttribute('position', new THREE.BufferAttribute(orbitPositions, 3))
    orbitGeometry.setAttribute('aProgress', new THREE.BufferAttribute(orbitProgress, 1))
    orbitGeometry.setAttribute('aSize', new THREE.BufferAttribute(orbitSizes, 1))
    orbitGeometry.setAttribute('aRandom', new THREE.BufferAttribute(orbitRandom, 1))
    const orbitMaterial = new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 9999 },
        uInnerColor: { value: innerColor },
        uOuterColor: { value: outerColor },
        uViewHeight: { value: 1024 },
        uSize: { value: 0.015 },
      },
      vertexShader: orbitVertexShader,
      fragmentShader: orbitFragmentShader,
      transparent: true,
      depthWrite: false,
      depthTest: false,
      blending: THREE.AdditiveBlending,
    })
    const orbitPoints = new THREE.Points(orbitGeometry, orbitMaterial)
    orbitPoints.frustumCulled = false
    spaceScene.add(orbitPoints)

    const starCount = window.innerWidth < 820 ? 9000 : 22000
    const starGeometry = new THREE.BufferGeometry()
    const starPositions = new Float32Array(starCount * 3)
    const starSizes = new Float32Array(starCount)
    const starColors = new Float32Array(starCount * 3)
    const starPalette = ['#fff5e8', '#ffb17c', '#d8e4ff'].map((color) => new THREE.Color(color).multiplyScalar(2.1))

    for (let index = 0; index < starCount; index += 1) {
      const offset = index * 3
      const azimuth = Math.PI * 2 * Math.random()
      const polar = Math.acos(2 * Math.random() - 1)
      const radius = 400
      starPositions[offset] = Math.cos(azimuth) * Math.sin(polar) * radius
      starPositions[offset + 1] = Math.sin(azimuth) * Math.sin(polar) * radius
      starPositions[offset + 2] = Math.cos(polar) * radius
      starSizes[index] = 1.1 + Math.pow(Math.random(), 4) * 2.2
      const color = starPalette[Math.floor(Math.random() * starPalette.length)]
      starColors[offset] = color.r
      starColors[offset + 1] = color.g
      starColors[offset + 2] = color.b
    }

    starGeometry.setAttribute('position', new THREE.BufferAttribute(starPositions, 3))
    starGeometry.setAttribute('aSize', new THREE.BufferAttribute(starSizes, 1))
    starGeometry.setAttribute('aColor', new THREE.BufferAttribute(starColors, 3))
    const starMaterial = new THREE.ShaderMaterial({
      uniforms: {
        uPixelRatio: { value: 1 },
      },
      vertexShader: starVertexShader,
      fragmentShader: starFragmentShader,
      transparent: true,
      depthWrite: false,
      depthTest: false,
    })
    const stars = new THREE.Points(starGeometry, starMaterial)
    stars.frustumCulled = false
    spaceScene.add(stars)

    const distortionGeometry = new THREE.PlaneGeometry(1, 1)
    const distortionMaterial = new THREE.ShaderMaterial({
      vertexShader: distortionVertexShader,
      fragmentShader: distortionFragmentShader,
      transparent: true,
      side: THREE.DoubleSide,
      depthWrite: true,
      depthTest: true,
    })
    const distortionPlane = new THREE.Mesh(distortionGeometry, distortionMaterial)
    distortionPlane.scale.set(10, 10, 10)
    distortionScene.add(distortionPlane)

    const distortionMaskMaterial = new THREE.ShaderMaterial({
      vertexShader: distortionVertexShader,
      fragmentShader: distortionMaskFragmentShader,
      transparent: true,
      side: THREE.DoubleSide,
      // Only the foreground half may mask the camera-facing lens. Disabling
      // depth here splits its upper arc away from the accretion disc.
      depthWrite: true,
      depthTest: true,
    })
    const distortionMask = new THREE.Mesh(distortionGeometry, distortionMaskMaterial)
    distortionMask.scale.set(10, 10, 10)
    distortionMask.rotation.x = Math.PI * 0.5
    distortionScene.add(distortionMask)

    const blackHolePosition = new THREE.Vector3(0, 0, 0)
    const cameraTarget = new THREE.Vector3()
    const projectedPosition = new THREE.Vector3()
    const baseCameraPosition = new THREE.Vector3(5, 2, 5)
    const cameraOrbitAxis = new THREE.Vector3(0, 1, 0)
    let animationFrame = 0
    let isVisible = true
    let scrollTarget = 0
    let scrollCurrent = 0
    let scrollDirty = true
    let sceneTime = 0
    let previousFrameTime = performance.now()

    const resize = () => {
      scrollDirty = true
      const bounds = container.getBoundingClientRect()
      const width = Math.max(1, Math.floor(bounds.width))
      const height = Math.max(1, Math.floor(bounds.height))
      const isNarrow = width < 820
      const pixelRatio = Math.min(window.devicePixelRatio, isNarrow ? 1 : 1.35)

      renderer.setPixelRatio(pixelRatio)
      renderer.setSize(width, height, false)
      spaceTarget.setSize(Math.floor(width * pixelRatio * 1.3), Math.floor(height * pixelRatio * 1.3))
      distortionTarget.setSize(Math.max(1, Math.floor(width * pixelRatio * 0.5)), Math.max(1, Math.floor(height * pixelRatio * 0.5)))
      camera.aspect = width / height
      camera.updateProjectionMatrix()
      baseCameraPosition.set(isNarrow ? 6.4 : 5, isNarrow ? 3.1 : 2, isNarrow ? 7.2 : 5)
      orbitMaterial.uniforms.uViewHeight.value = height * pixelRatio * 1.3
      starMaterial.uniforms.uPixelRatio.value = pixelRatio * 1.3
    }

    const handleScroll = () => {
      // Observe native scrolling without consuming wheel or touch input.
      scrollDirty = true
    }

    const render = () => {
      const now = performance.now()
      const delta = Math.min((now - previousFrameTime) / 1000, 0.05)
      previousFrameTime = now
      if (!reducedMotion) sceneTime += delta
      const elapsed = sceneTime
      if (scrollDirty) {
        const bounds = hero.getBoundingClientRect()
        scrollTarget = reducedMotion ? 0 : THREE.MathUtils.clamp(-bounds.top / Math.max(1, bounds.height * 0.85), 0, 1)
        scrollDirty = false
      }
      scrollCurrent = reducedMotion ? 0 : THREE.MathUtils.lerp(scrollCurrent, scrollTarget, 1 - Math.exp(-4 * delta))
      const travel = THREE.MathUtils.smoothstep(scrollCurrent, 0, 1)
      // A reversible scroll-driven dolly, rising orbit and restrained camera roll.
      // The scene and lens pass share the camera to keep the distortion aligned.
      camera.position.copy(baseCameraPosition)
      camera.position.y += travel * 0.9
      camera.position.applyAxisAngle(cameraOrbitAxis, travel * 0.18)
      camera.position.multiplyScalar(1 - travel * 0.22)
      cameraTarget.set(0, travel * 0.1, 0)
      camera.lookAt(cameraTarget)
      camera.rotation.z -= travel * 0.025
      camera.updateMatrixWorld()
      distortionPlane.lookAt(camera.position)

      projectedPosition.copy(blackHolePosition).project(camera)
      finalMaterial.uniforms.uBlackHolePosition.value.set(
        projectedPosition.x * 0.5 + 0.5,
        projectedPosition.y * 0.5 + 0.5,
      )
      const orbitTime = elapsed * 0.12
      discMaterial.uniforms.uTime.value = orbitTime
      orbitMaterial.uniforms.uTime.value = orbitTime + 9999
      stars.rotation.y = elapsed * 0.003
      stars.rotation.x = elapsed * 0.0006

      renderer.setRenderTarget(spaceTarget)
      renderer.clear()
      renderer.render(spaceScene, camera)
      renderer.setRenderTarget(distortionTarget)
      renderer.clear()
      renderer.render(distortionScene, camera)
      renderer.setRenderTarget(null)
      renderer.render(finalScene, finalCamera)

      if (!reducedMotion && isVisible) animationFrame = window.requestAnimationFrame(render)
    }

    const resizeObserver = new ResizeObserver(() => {
      resize()
      if (reducedMotion) render()
    })
    resizeObserver.observe(container)
    const visibilityObserver = new IntersectionObserver(([entry]) => {
      const wasVisible = isVisible
      isVisible = entry.isIntersecting
      if (!wasVisible && isVisible && !reducedMotion) animationFrame = window.requestAnimationFrame(render)
      if (!isVisible) window.cancelAnimationFrame(animationFrame)
    }, { threshold: 0.01 })
    visibilityObserver.observe(hero)
    window.addEventListener('scroll', handleScroll, { passive: true })
    const handleMotionPreference = () => {
      reducedMotion = motionPreference.matches
      scrollDirty = true
      scrollCurrent = 0
      window.cancelAnimationFrame(animationFrame)
      render()
    }
    motionPreference.addEventListener('change', handleMotionPreference)
    resize()
    render()

    return () => {
      window.cancelAnimationFrame(animationFrame)
      resizeObserver.disconnect()
      visibilityObserver.disconnect()
      window.removeEventListener('scroll', handleScroll)
      motionPreference.removeEventListener('change', handleMotionPreference)
      discGeometry.dispose()
      discMaterial.dispose()
      orbitGeometry.dispose()
      orbitMaterial.dispose()
      starGeometry.dispose()
      starMaterial.dispose()
      distortionGeometry.dispose()
      distortionMaterial.dispose()
      distortionMaskMaterial.dispose()
      finalPlaneGeometry.dispose()
      finalMaterial.dispose()
      noiseTexture.dispose()
      spaceTarget.dispose()
      distortionTarget.dispose()
      renderer.dispose()
      renderer.domElement.remove()
    }
  }, [])

  return <div ref={containerRef} className="black-hole-webgl" aria-hidden="true" />
}
