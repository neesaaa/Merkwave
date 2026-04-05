"use client";

import {
  Suspense,
  useRef,
  useLayoutEffect,
  useMemo,
  useState,
  useCallback,
  useEffect,
  Component,
  ReactNode,
} from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF, Html, useProgress } from "@react-three/drei";
import { Box3, Vector3, Group } from "three";

useGLTF.setDecoderPath("/draco/gltf/");

class ModelErrorBoundary extends Component<
  { children: ReactNode; fallback: ReactNode },
  { hasError: boolean }
> {
  constructor(props: { children: ReactNode; fallback: ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  render() {
    if (this.state.hasError) return this.props.fallback;
    return this.props.children;
  }
}

function Loader({ isArabic }: { isArabic: boolean }) {
  const { progress } = useProgress();
  return (
    <Html center>
      <div className="text-center">
        <div className="w-48">
          <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
            <div
              className="h-1.5 bg-cyan-400 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-white/70 text-xs mt-2 tracking-widest">
            {isArabic
              ? `جاري التحميل ${Math.round(progress)}%`
              : `Loading ${Math.round(progress)}%`}
          </p>
        </div>
      </div>
    </Html>
  );
}

function Model({ url, onEmpty }: { url: string; onEmpty: () => void }) {
  const group = useRef<Group>(null);
  const { scene: rawScene } = useGLTF(url);
  const scene = useMemo(() => rawScene.clone(true), [rawScene]);

  const onEmptyRef = useRef(onEmpty);
  useEffect(() => {
    onEmptyRef.current = onEmpty;
  });

  // Scale model to fit a 3-unit cube and center at origin
  useLayoutEffect(() => {
    if (!group.current) return;
    // Reset transforms before measuring
    group.current.scale.setScalar(1);
    group.current.position.set(0, 0, 0);

    const box = new Box3().setFromObject(group.current);
    if (box.isEmpty()) {
      setTimeout(() => onEmptyRef.current(), 0);
      return;
    }
    const size = new Vector3();
    box.getSize(size);
    const maxDim = Math.max(size.x, size.y, size.z);
    if (maxDim <= 0) {
      setTimeout(() => onEmptyRef.current(), 0);
      return;
    }

    // Scale so the largest dimension becomes 3 units
    const s = 3 / maxDim;
    group.current.scale.setScalar(s);

    // Center: offset by the scaled center position
    const center = new Vector3();
    box.getCenter(center);
    group.current.position.set(-center.x * s, -center.y * s, -center.z * s);
  }, [scene]);

  return (
    <group ref={group}>
      <primitive object={scene} />
    </group>
  );
}

function NoModelPlaceholder({ label }: { label: string }) {
  return (
    <div className="flex flex-col items-center justify-center w-full h-full text-gray-500 gap-3">
      <svg
        className="w-12 h-12 opacity-20"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.5}
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M21 7.5l-9-5.25L3 7.5m18 0l-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9"
        />
      </svg>
      <span className="text-sm">{label}</span>
    </div>
  );
}

interface FleetModelViewerProps {
  url: string;
  isArabic: boolean;
}

export function FleetModelViewer({ url, isArabic }: FleetModelViewerProps) {
  const [isEmpty, setIsEmpty] = useState(false);
  const handleEmpty = useCallback(() => setIsEmpty(true), []);

  if (isEmpty) {
    return (
      <NoModelPlaceholder
        label={
          isArabic ? "لا يوجد نموذج ثلاثي الأبعاد" : "No 3D model available"
        }
      />
    );
  }

  return (
    <ModelErrorBoundary
      fallback={
        <NoModelPlaceholder
          label={isArabic ? "تعذ تحميل النموذج" : "Failed to load model"}
        />
      }
    >
      <Canvas
        dpr={1}
        frameloop="always"
        camera={{ position: [0, 0, 5], fov: 45 }}
        gl={{
          antialias: false,
          alpha: true,
          powerPreference: "default",
          preserveDrawingBuffer: false,
        }}
        style={{ width: "100%", height: "100%", background: "transparent" }}
      >
        <ambientLight intensity={0.7} />
        <directionalLight position={[5, 8, 5]} intensity={1.5} />

        <Suspense fallback={<Loader isArabic={isArabic} />}>
          <Model url={url} onEmpty={handleEmpty} />
        </Suspense>

        <OrbitControls
          enableZoom
          enablePan={false}
          minDistance={2}
          maxDistance={12}
          enableDamping
          dampingFactor={0.06}
          autoRotate
          autoRotateSpeed={1.5}
          makeDefault
        />
      </Canvas>
    </ModelErrorBoundary>
  );
}
