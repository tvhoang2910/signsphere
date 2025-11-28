// FIX: Import `ComponentType` from `react` to resolve the type error.
import type { ComponentType } from 'react';

export interface Category {
  id: string;
  name: string;
  icon: ComponentType<{ className?: string }>;
}

export interface Signer {
  id: string;
  name: string;
  bio: string;
  verified: boolean;
  avatar?: string;
}

export interface Example {
  text_vi: string;
  sign_sequence: string[];
}

export interface Video {
  id: string;
  gloss: string; // Standard term (e.g., "BÁC SĨ")
  variants?: string[]; // Alternative names (e.g., ["DOCTOR", "PHYSICIAN"])
  description_vi: string; // Detailed explanation in Vietnamese
  categoryId: string; // For UI organization
  videoUrl: string;
  thumbnail?: string;
  duration_sec?: number;

  // Sign Dictionary metadata
  signer: Signer;
  domain_tags: string[]; // ["y tế", "cơ bản", "giáo dục"]
  level?: 'basic' | 'intermediate' | 'advanced'; // Difficulty level
  examples?: Example[]; // Example sentences with sign sequences
  region?: string; // "VN" or region code
  created_at?: string;
  verified_by?: string; // Verified by organization
  license?: string; // "cc-by-sa", "cc-by-nc", etc.
  notes?: string; // Regional variants, pronunciation notes
}