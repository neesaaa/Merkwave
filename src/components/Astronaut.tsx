import React, { useEffect, useRef } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";
import { useMotionValue, useSpring } from "framer-motion";
import { useFrame } from "@react-three/fiber";

import { Group, SkinnedMesh, Mesh, Material, Bone, AnimationClip } from "three";
import { GLTF } from "three-stdlib";

interface AstronautProps {
  isArabic: boolean;
  scale?: number;
  position?: [number, number, number];
  rotation?: [number, number, number];
}

type GLTFResult = GLTF & {
  nodes: {
    metarig_rootJoint: Bone;
    Cube001_0: SkinnedMesh;
    Cube005_0: SkinnedMesh;
    Cube002_0: SkinnedMesh;
    Plane_0: SkinnedMesh;
    Cube008_0: SkinnedMesh;
    Cube004_0: SkinnedMesh;
    Cube003_0: SkinnedMesh;
    Cube_0: SkinnedMesh;
    Cube009_0: SkinnedMesh;
    Cube011_0: SkinnedMesh;
    Cube001?: Mesh;
    Cube005?: Mesh;
    Cube002?: Mesh;
    Plane?: Mesh;
    Cube008?: Mesh;
    Cube004?: Mesh;
    Cube003?: Mesh;
    Cube?: Mesh;
    Cube009?: Mesh;
    Cube011?: Mesh;
  };
  materials: {
    "AstronautFallingTexture.png": Material;
  };
  animations: AnimationClip[];
};

export default function Astronaut({ 
  isArabic, 
  scale = 0.3, 
  position = isArabic ? [-4.5, 1, 0] : [-2.5, 1, 0],
  rotation = [-Math.PI / 2, -0.2, 2.2],
  ...props 
}: AstronautProps ) {
  const group = useRef<Group>(null);
  const { nodes, materials, animations } =
  useGLTF("/Untitled.glb") as unknown as GLTFResult;

  const { actions } = useAnimations(animations, group);

  useEffect(() => {
    if (animations.length > 0) {
      const animationName = animations[0].name;
      if (animationName && actions[animationName]) {
        actions[animationName].play();
      }
    }
  }, [actions, animations]);

  const yPosition = useMotionValue(5);
  const ySpring = useSpring(yPosition, { damping: 30 });
  
  useEffect(() => {
    ySpring.set(-1);
  }, [ySpring]);

  useFrame(() => {
    if (group.current) {
      group.current.position.y = ySpring.get();
    }
  });

  return (
    <group
      ref={group}
      {...props}
      dispose={null}
      rotation={rotation}
      scale={scale}
      position={position}
    >
      <group name="Sketchfab_Scene">
        <group name="Sketchfab_model">
          <group name="Root">
            <group name="metarig">
              <primitive object={nodes.metarig_rootJoint} />
              <skinnedMesh
                name="Cube001_0"
                geometry={nodes.Cube001_0.geometry}
                material={materials["AstronautFallingTexture.png"]}
                skeleton={nodes.Cube001_0.skeleton}
              />
              <skinnedMesh
                name="Cube005_0"
                geometry={nodes.Cube005_0.geometry}
                material={materials["AstronautFallingTexture.png"]}
                skeleton={nodes.Cube005_0.skeleton}
              />
              <skinnedMesh
                name="Cube002_0"
                geometry={nodes.Cube002_0.geometry}
                material={materials["AstronautFallingTexture.png"]}
                skeleton={nodes.Cube002_0.skeleton}
              />
              <skinnedMesh
                name="Plane_0"
                geometry={nodes.Plane_0.geometry}
                material={materials["AstronautFallingTexture.png"]}
                skeleton={nodes.Plane_0.skeleton}
              />
              <skinnedMesh
                name="Cube008_0"
                geometry={nodes.Cube008_0.geometry}
                material={materials["AstronautFallingTexture.png"]}
                skeleton={nodes.Cube008_0.skeleton}
              />
              <skinnedMesh
                name="Cube004_0"
                geometry={nodes.Cube004_0.geometry}
                material={materials["AstronautFallingTexture.png"]}
                skeleton={nodes.Cube004_0.skeleton}
              />
              <skinnedMesh
                name="Cube003_0"
                geometry={nodes.Cube003_0.geometry}
                material={materials["AstronautFallingTexture.png"]}
                skeleton={nodes.Cube003_0.skeleton}
              />
              <skinnedMesh
                name="Cube_0"
                geometry={nodes.Cube_0.geometry}
                material={materials["AstronautFallingTexture.png"]}
                skeleton={nodes.Cube_0.skeleton}
              />
              <skinnedMesh
                name="Cube009_0"
                geometry={nodes.Cube009_0.geometry}
                material={materials["AstronautFallingTexture.png"]}
                skeleton={nodes.Cube009_0.skeleton}
              />
              <skinnedMesh
                name="Cube011_0"
                geometry={nodes.Cube011_0.geometry}
                material={materials["AstronautFallingTexture.png"]}
                skeleton={nodes.Cube011_0.skeleton}
              />
              <group name="Cube001" />
              <group name="Cube005" />
              <group name="Cube002" />
              <group name="Plane" />
              <group name="Cube008" />
              <group name="Cube004" />
              <group name="Cube003" />
              <group name="Cube" />
              <group
                name="Cube009"
                rotation={[-2.708, 0.013, -1.447]}
                scale={1.307}
              />
              <group name="Cube011" />
            </group>
          </group>
        </group>
      </group>
    </group>
  );
}

useGLTF.preload("/Untitled.glb");