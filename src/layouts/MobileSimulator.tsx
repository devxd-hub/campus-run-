import React from 'react';

export interface MobileSimulatorProps {
  children: React.ReactNode;
}

export const MobileSimulator: React.FC<MobileSimulatorProps> = ({ children }) => {
  return (
    <div className="w-full h-[100dvh] min-h-[100dvh] bg-[#FBF6EE] flex flex-col overflow-hidden font-body relative">
      {children}
    </div>
  );
};

