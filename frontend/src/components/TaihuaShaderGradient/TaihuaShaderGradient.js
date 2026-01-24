import { ShaderGradientCanvas, ShaderGradient } from '@shadergradient/react'

function TaihuaShaderGradient() {
  return (
    <ShaderGradientCanvas
      style={{ 
        position: "fixed",
        inset: 0,
        zIndex: -10,
        pointerEvents: "none",
      }}
      pixelDensity={1.5}
      fov={45}
    >
      <ShaderGradient 
      animate="on"
      axesHelper="off"
      brightness={0.4}
      cAzimuthAngle={180}
      cDistance={3.1}
      cPolarAngle={90}
      cameraZoom={1}
      color1="#efffd9"
      color2="#3f535c"
      color3="#979185"
      destination="onCanvas"
      embedMode="off"
      envPreset="city"
      format="gif"
      fov={45}
      frameRate={10}
      gizmoHelper="hide"
      grain="off"
      lightType="3d"
      pixelDensity={1.1}
      positionX={-1.4}
      positionY={0}
      positionZ={0}
      range="enabled"
      rangeEnd={40}
      rangeStart={0}
      reflection={0.1}
      rotationX={0}
      rotationY={10}
      rotationZ={50}
      shader="defaults"
      type="waterPlane"
      uAmplitude={1}
      uDensity={0.1}
      uFrequency={5.5}
      uSpeed={0.1}
      uStrength={9.3}
      uTime={0}
      wireframe={false}/>
    </ShaderGradientCanvas>
  )
}

export default TaihuaShaderGradient



