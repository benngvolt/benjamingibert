import { ShaderGradientCanvas, ShaderGradient } from '@shadergradient/react'

function TaihuaShaderGradient() {
  return (
    <ShaderGradientCanvas
      style={{ 
        position: "fixed",
        inset: 0,
        zIndex: 0,
        pointerEvents: "none",
      }}
      pixelDensity={1.5}
      fov={45}
    >
      <ShaderGradient 
      animate="on"
      axesHelper="off"
      brightness={1}
      cAzimuthAngle={180}
      cDistance={3.6}
      cPolarAngle={90}
      cameraZoom={1}
      color1="#c9e5ff"
      color2="#96a7c5"
      color3="#adceff"
      destination="onCanvas"
      embedMode="off"
      envPreset="city"
      format="gif"
      fov={45}
      frameRate={10}
      gizmoHelper="hide"
      grain="on"
      lightType="3d"
      pixelDensity={1}
      positionX={-1.4}
      positionY={0}
      positionZ={0}
      range="disabled"
      rangeEnd={40}
      rangeStart={0}
      reflection={0.1}
      rotationX={0}
      rotationY={10}
      rotationZ={50}
      shader="defaults"
      type="waterPlane"
      uAmplitude={0}
      uDensity={0.4}
      uFrequency={5.5}
      uSpeed={0.1}
      uStrength={5.7}
      uTime={0}
      wireframe={false}
      />
    </ShaderGradientCanvas>
  )
}

export default TaihuaShaderGradient
