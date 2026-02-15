import React from 'react';

export interface BenefitItem {
  title: string;
  description: string;
  icon: string;
  gridClass: string;
}

export interface Step {
  id: number;
  title: string;
  description: string;
  icon: React.ReactNode;
}