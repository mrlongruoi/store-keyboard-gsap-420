"use client";

import { Keyboard } from "@/components/Keyboard";
import { Stage, useTexture } from "@react-three/drei";
import { KEYCAP_TEXTURES } from ".";
import { useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

gsap.registerPlugin(useGSAP);

type SceneProps = {
  selectedTextureId: string;
  onAnimationComplete: () => void;
};

/**
 * Renders a 3D keyboard scene and updates the keycap material when the selected texture changes, animating the keyboard lift-and-drop unless the user prefers reduced motion.
 *
 * @param selectedTextureId - The id of the texture to apply to the keyboard keycaps.
 * @param onAnimationComplete - Callback invoked after the texture-change animation finishes or immediately if reduced motion is requested.
 * @returns The JSX element containing the staged 3D keyboard with the currently applied keycap material and knob color.
 */
export function Scene({ selectedTextureId, onAnimationComplete }: SceneProps) {
  const keyboardRef = useRef<THREE.Group>(null);
  const texturePaths = KEYCAP_TEXTURES.map((t) => t.path);
  const textures = useTexture(texturePaths);
  const [currentTextureId, setCurrentTextureId] = useState(selectedTextureId);

  useGSAP(() => {
    if (!keyboardRef.current || selectedTextureId === currentTextureId) return;

    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference", () => {
      const keyboard = keyboardRef.current;
      if (!keyboard) return;

      const tl = gsap.timeline({
        onComplete: () => {
          onAnimationComplete();
        },
      });

      tl.to(keyboard.position, {
        y: 0.3,
        duration: 0.4,
        ease: "power2.out",
        onComplete: () => {
          setCurrentTextureId(selectedTextureId);
        },
      });
      tl.to(keyboard.position, {
        y: 0,
        duration: 0.6,
        ease: "elastic.out(1,0.4)",
      });
    });

    mm.add("(prefers-reduced-motion: reduce", () => {
      setCurrentTextureId(selectedTextureId);
      onAnimationComplete();
    });
  }, [selectedTextureId, currentTextureId]);

  const materials = useMemo(() => {
    const materialMap: { [key: string]: THREE.MeshStandardMaterial } = {};

    KEYCAP_TEXTURES.forEach((textureConfig, index) => {
      const texture = Array.isArray(textures) ? textures[index] : textures;

      if (texture) {
        texture.flipY = false;
        texture.colorSpace = THREE.SRGBColorSpace;

        materialMap[textureConfig.id] = new THREE.MeshStandardMaterial({
          map: texture,
          roughness: 0.7,
        });
      }
    });

    return materialMap;
  }, [textures]);

  const currentKnobColor = KEYCAP_TEXTURES.find(
    (t) => t.id === selectedTextureId,
  )?.knobColor;

  return (
    <Stage environment={"city"} intensity={0.05} shadows="contact">
      <group ref={keyboardRef}>
        <Keyboard
          keycapMaterial={materials[currentTextureId]}
          knobColor={currentKnobColor}
        />
      </group>
    </Stage>
  );
}