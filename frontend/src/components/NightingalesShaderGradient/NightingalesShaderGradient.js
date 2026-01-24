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
      brightness={0.1}
      cAzimuthAngle={270}
      cDistance={0.5}
      cPolarAngle={180}
      cameraZoom={15.1}
      color1="#00002d"
      color2="#0000a1"
      color3="#e62568"
      destination="onCanvas"
      embedMode="off"
      envPreset="city"
      format="gif"
      fov={45}
      frameRate={10}
      gizmoHelper="hide"
      grain="off"
      lightType="env"
      pixelDensity={1}
      positionX={-0.1}
      positionY={0}
      positionZ={0}
      range="disabled"
      rangeEnd={40}
      rangeStart={0}
      reflection={0.1}
      rotationX={0}
      rotationY={130}
      rotationZ={70}
      shader="defaults"
      type="sphere"
      uAmplitude={3.2}
      uDensity={0.8}
      uFrequency={5.5}
      uSpeed={0.2}
      uStrength={0.3}
      uTime={0}
      wireframe={false}
      />
    </ShaderGradientCanvas>
  )
}

export default TaihuaShaderGradient