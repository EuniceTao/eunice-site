/** 接入已验收的沙发模型，卸载时释放独占几何、材质和织物贴图。 */
import React from 'react';
import { createSofa } from './createSofa';

export function Sofa() {
  const model = React.useMemo(() => createSofa(), []);
  React.useEffect(() => () => {
    const resources = new Set();
    model.traverse((node) => {
      if (!node.isMesh) return;
      resources.add(node.geometry);
      resources.add(node.material);
      if (node.material.map) resources.add(node.material.map);
      if (node.material.bumpMap) resources.add(node.material.bumpMap);
    });
    resources.forEach((resource) => resource.dispose());
  }, [model]);
  // 样品脚底为 0.01 米，抬高到客厅地板顶面 0.023 米。
  return <primitive object={model} position={[-3.06, 0.013, 0.3]} rotation={[0, Math.PI / 2, 0]} dispose={null} />;
}
