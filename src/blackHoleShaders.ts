export const screenVertexShader = `
  varying vec2 vUv;

  void main() {
    vUv = uv;
    gl_Position = vec4(position, 1.0);
  }
`

export const compositionFragmentShader = `
  #define PI 3.1415926538
  precision highp float;

  varying vec2 vUv;
  uniform sampler2D uSpaceTexture;
  uniform sampler2D uDistortionTexture;
  uniform vec2 uBlackHolePosition;
  uniform float uRGBShiftRadius;

  vec3 getRGBShiftedColor(sampler2D sourceTexture, vec2 sourceUv, float radius) {
    vec3 angle = vec3(PI * 2.0 / 3.0, PI * 4.0 / 3.0, 0.0);
    vec3 color = vec3(0.0);
    color.r = texture2D(sourceTexture, sourceUv + vec2(sin(angle.r) * radius, cos(angle.r) * radius)).r;
    color.g = texture2D(sourceTexture, sourceUv + vec2(sin(angle.g) * radius, cos(angle.g) * radius)).g;
    color.b = texture2D(sourceTexture, sourceUv + vec2(sin(angle.b) * radius, cos(angle.b) * radius)).b;
    return color;
  }

  void main() {
    float distortionIntensity = texture2D(uDistortionTexture, vUv).r;
    vec2 towardCenter = vUv - uBlackHolePosition;
    towardCenter *= -distortionIntensity * 2.0;
    vec2 distortedUv = vUv + towardCenter;
    vec3 outputColor = getRGBShiftedColor(uSpaceTexture, distortedUv, uRGBShiftRadius);
    gl_FragColor = vec4(outputColor, 1.0);
  }
`

export const discVertexShader = `
  varying vec2 vUv;

  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`

export const discFragmentShader = `
  precision highp float;

  uniform float uTime;
  uniform sampler2D uNoiseTexture;
  uniform vec3 uInnerColor;
  uniform vec3 uOuterColor;
  varying vec2 vUv;

  float inverseLerp(float value, float minValue, float maxValue) {
    return (value - minValue) / (maxValue - minValue);
  }

  vec3 blendAdd(vec3 base, vec3 blend) {
    return min(base + blend, vec3(1.0));
  }

  void main() {
    vec3 color = vec3(0.0);
    float iterations = 3.0;

    for (float i = 0.0; i < iterations; i++) {
      float progress = i / (iterations - 1.0);
      float intensity = 1.0 - ((vUv.y - progress) * iterations) * 0.5;
      intensity = smoothstep(0.0, 1.0, intensity);
      vec2 noiseUv = vUv;
      noiseUv.y *= 2.0;
      noiseUv.x += uTime / ((i * 10.0) + 1.0);
      vec3 ringColor = mix(uInnerColor, uOuterColor, progress);
      float noiseIntensity = texture2D(uNoiseTexture, noiseUv).r;
      ringColor = mix(vec3(0.0), ringColor, noiseIntensity * intensity);
      color = blendAdd(color, ringColor);
    }

    float edgeAttenuation = min(
      inverseLerp(vUv.y, 0.0, 0.02),
      inverseLerp(vUv.y, 1.0, 0.5)
    );
    color = mix(vec3(0.0), color, edgeAttenuation);
    gl_FragColor = vec4(color, 1.0);
  }
`

export const orbitVertexShader = `
  #define PI 3.1415926538

  uniform float uTime;
  uniform vec3 uInnerColor;
  uniform vec3 uOuterColor;
  uniform float uViewHeight;
  uniform float uSize;
  attribute float aProgress;
  attribute float aSize;
  attribute float aRandom;
  varying vec3 vColor;

  void main() {
    float concentration = 0.05;
    float outerProgress = smoothstep(0.0, 1.0, aProgress);
    outerProgress = mix(concentration, outerProgress, pow(aRandom, 1.7));
    float radius = 1.0 + outerProgress * 5.0;
    float angle = outerProgress - uTime * (1.0 - outerProgress) * 3.0;
    vec3 newPosition = vec3(sin(angle) * radius, 0.0, cos(angle) * radius);
    vec4 modelViewPosition = modelViewMatrix * vec4(newPosition, 1.0);
    gl_Position = projectionMatrix * modelViewPosition;
    gl_PointSize = aSize * uSize * uViewHeight;
    gl_PointSize *= 1.0 / max(0.2, -modelViewPosition.z);
    vColor = mix(uInnerColor, uOuterColor, outerProgress);
  }
`

export const orbitFragmentShader = `
  precision highp float;
  varying vec3 vColor;

  void main() {
    float distanceToCenter = length(gl_PointCoord - vec2(0.5));
    if (distanceToCenter > 0.5) discard;
    gl_FragColor = vec4(vColor, 0.5);
  }
`

export const distortionVertexShader = `
  varying vec2 vUv;

  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`

export const distortionFragmentShader = `
  precision highp float;
  varying vec2 vUv;

  float remap(float value, float inMin, float inMax, float outMin, float outMax) {
    float progress = (value - inMin) / (inMax - inMin);
    return mix(outMin, outMax, progress);
  }

  void main() {
    float distanceToCenter = length(vUv - 0.5);
    float radialStrength = remap(distanceToCenter, 0.0, 0.15, 1.0, 0.0);
    radialStrength = smoothstep(0.0, 1.0, radialStrength);
    gl_FragColor = vec4(radialStrength, 0.0, 0.0, 1.0);
  }
`

export const distortionMaskFragmentShader = `
  precision highp float;
  varying vec2 vUv;

  float remap(float value, float inMin, float inMax, float outMin, float outMax) {
    float progress = (value - inMin) / (inMax - inMin);
    return mix(outMin, outMax, progress);
  }

  void main() {
    float distanceToCenter = length(vUv - 0.5);
    float radialStrength = remap(distanceToCenter, 0.0, 0.15, 1.0, 0.0);
    radialStrength = smoothstep(0.0, 1.0, radialStrength);
    float alpha = smoothstep(0.0, 1.0, remap(distanceToCenter, 0.4, 0.5, 1.0, 0.0));
    gl_FragColor = vec4(radialStrength, 0.0, 0.0, alpha);
  }
`

export const starVertexShader = `
  uniform float uPixelRatio;
  attribute float aSize;
  attribute vec3 aColor;
  varying vec3 vColor;

  void main() {
    vec4 modelViewPosition = modelViewMatrix * vec4(position, 1.0);
    gl_Position = projectionMatrix * modelViewPosition;
    gl_PointSize = aSize * uPixelRatio;
    vColor = aColor;
  }
`

export const starFragmentShader = `
  precision highp float;
  varying vec3 vColor;

  void main() {
    float distanceToCenter = length(gl_PointCoord - vec2(0.5));
    if (distanceToCenter > 0.5) discard;
    float alpha = 1.0 - smoothstep(0.1, 0.5, distanceToCenter);
    gl_FragColor = vec4(vColor, pow(alpha, 0.65));
  }
`
