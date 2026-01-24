import React, { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

function useThrottledTime(targetFps = 10) {
  const step = 1 / targetFps;
  const acc = useRef(0);
  const t = useRef(0);

  useFrame((_, dt) => {
    acc.current += dt;
    while (acc.current >= step) {
      acc.current -= step;
      t.current += step;
    }
  });

  return t;
}

function FullscreenPlane() {
  const material = useRef();

  // Inspiré de tes params ShaderGradient
  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uColor1: { value: new THREE.Color("#efffd9") },
      uColor2: { value: new THREE.Color("#3f535c") },
      uColor3: { value: new THREE.Color("#979185") },
      uBrightness: { value: 0.4 },

      // équivalents “waterPlane”
      uAmplitude: { value: 1.0 },
      uDensity: { value: 0.1 },
      uFrequency: { value: 5.5 },
      uSpeed: { value: 0.1 },
      uStrength: { value: 9.3 },

      uRes: { value: new THREE.Vector2(1, 1) },
    }),
    []
  );

  const { size } = useThree();
  useEffect(() => {
    uniforms.uRes.value.set(size.width, size.height);
  }, [size.width, size.height, uniforms]);

  // frameRate = 10 (comme ton ShaderGradient)
  const throttledTime = useThrottledTime(10);

  useFrame(() => {
    if (!material.current) return;
    material.current.uniforms.uTime.value = throttledTime.current;
  });

  return (
    <mesh frustumCulled={false}>
      <planeGeometry args={[2, 2, 256, 256]} />
      <shaderMaterial
        ref={material}
        uniforms={uniforms}
        vertexShader={`
          varying vec2 vUv;
          void main() {
            vUv = uv;
            gl_Position = vec4(position.xy, 0.0, 1.0);
          }
        `}
        fragmentShader={`
          precision highp float;

          varying vec2 vUv;

          uniform float uTime;
          uniform vec2  uRes;

          uniform vec3  uColor1;
          uniform vec3  uColor2;
          uniform vec3  uColor3;
          uniform float uBrightness;

          uniform float uAmplitude;
          uniform float uDensity;
          uniform float uFrequency;
          uniform float uSpeed;
          uniform float uStrength;

          // --- fbm / noise (léger mais efficace)
          float hash(vec2 p){
            return fract(sin(dot(p, vec2(127.1,311.7))) * 43758.5453123);
          }

          float noise(vec2 p){
            vec2 i = floor(p);
            vec2 f = fract(p);

            float a = hash(i);
            float b = hash(i + vec2(1.0, 0.0));
            float c = hash(i + vec2(0.0, 1.0));
            float d = hash(i + vec2(1.0, 1.0));

            vec2 u = f*f*(3.0-2.0*f);
            return mix(a, b, u.x) + (c - a)*u.y*(1.0 - u.x) + (d - b)*u.x*u.y;
          }

          float fbm(vec2 p){
            float v = 0.0;
            float a = 0.5;
            mat2 m = mat2(1.6, 1.2, -1.2, 1.6);
            for(int i=0;i<5;i++){
              v += a * noise(p);
              p = m * p;
              a *= 0.5;
            }
            return v;
          }

          void main() {
            vec2 uv = vUv;

            // ratio-correct pour éviter l’étirement
            float aspect = uRes.x / max(uRes.y, 1.0);
            vec2 p = (uv - 0.5);
            p.x *= aspect;

            // “water plane” feel : deux champs + advection
            float t = uTime * uSpeed;

            vec2 flow = vec2(
              fbm(p * (uFrequency * 0.35) + vec2(0.0, t)),
              fbm(p * (uFrequency * 0.35) + vec2(10.0, -t))
            );

            // distortion principale
            vec2 warped = p
              + (flow - 0.5) * (uStrength * 0.015)
              + vec2(
                  sin((p.y + t) * (uFrequency * 1.0)),
                  cos((p.x - t) * (uFrequency * 0.9))
                ) * (uDensity * 0.25 * uAmplitude);

            float n1 = fbm(warped * (uFrequency * 0.60) + t);
            float n2 = fbm(warped * (uFrequency * 1.10) - t * 0.7);

            // mélange 3 couleurs (proche ShaderGradient)
            float a = smoothstep(0.20, 0.85, n1);
            float b = smoothstep(0.15, 0.90, n2);

            vec3 col = mix(uColor2, uColor3, a);
            col = mix(col, uColor1, b * 0.65);

            // vignette douce + “brightness” global
            float vign = smoothstep(1.2, 0.2, length(p));
            col *= mix(0.85, 1.05, vign);

            col *= (0.6 + uBrightness); // uBrightness=0.4 => ~1.0

            // dithering ultra léger (évite banding) — tu peux virer si tu veux
            float d = (hash(gl_FragCoord.xy) - 0.5) / 255.0;
            col += d;

            gl_FragColor = vec4(col, 1.0);
          }
        `}
      />
    </mesh>
  );
}

export default function TaihuaShaderBg() {
  // équivalent pixelDensity={1.1}~{1.5}
  const dpr = Math.min(1.5, Math.max(1.1, window.devicePixelRatio || 1));

  return (
    <Canvas
      dpr={dpr}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      camera={{ fov: 45, position: [0, 0, 1] }}
    >
      <FullscreenPlane />
    </Canvas>
  );
}
