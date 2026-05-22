"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

interface CollapsibleContextType {
  isCollasableOpen: boolean;
  toggleCollasable: (isOpen: boolean) => void;
}

const CollapsibleContext = createContext<CollapsibleContextType | undefined>(
  undefined
);

interface CollapsibleProps {
  children: ReactNode;
  defaultValue? : boolean
}

export const Collapsible: React.FC<CollapsibleProps> = ({ children, defaultValue = false }) => {
  const [isCollasableOpen, setCollasableOpen] = useState(defaultValue);

  const toggleCollasable = (isOpen : boolean) => {
    setCollasableOpen(isOpen)
  };

  return (
    <CollapsibleContext.Provider value={{ isCollasableOpen, toggleCollasable }}>
      {children}
    </CollapsibleContext.Provider>
  );
};

export const useCollapsible = () => {
  const context = useContext(CollapsibleContext);
  if (!context) {
    throw new Error(
      "useCollapsible must be used within a Collapsible component"
    );
  }
  return context;
};
