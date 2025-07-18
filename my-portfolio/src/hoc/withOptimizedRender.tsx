// src/hoc/withOptimizedRender.tsx
import React from 'react';
import useIntersectionObserver from '../hooks/useIntersectionObserver';

interface WithOptimizedRenderProps {
  className?: string;
}

export const withOptimizedRender = <P extends object>(
  WrappedComponent: React.ComponentType<P>,
  options = { threshold: 0.1, rootMargin: '100px' }
) => {
  return React.memo(function OptimizedComponent(props: P & WithOptimizedRenderProps) {
    const { elementRef, isVisible } = useIntersectionObserver(options);

    return (
      <div ref={elementRef as React.RefObject<HTMLDivElement>}>
        {isVisible ? (
          <WrappedComponent {...props} />
        ) : (
          <div className={`w-full h-[200px] ${props.className}`} />
        )}
      </div>
    );
  });
};

export default withOptimizedRender;