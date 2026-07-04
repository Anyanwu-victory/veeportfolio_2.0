import React from "react";

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
}

// Container.tsx — remove padding-top, let pages handle their own offset
export default function Container({ children, className = "" }: ContainerProps) {
  return (
    <div className={`w-full px-4 md:px-8 lg:px-12 xxl:px-16 ${className}`}>
      {children}
    </div>
  );
}
