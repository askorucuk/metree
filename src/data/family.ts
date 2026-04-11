import type { FamilyTreeData } from '../types';

const METREE_SECRET_DATA = import.meta.env.VITE_METREE_SECRET_DATA;

if (!METREE_SECRET_DATA) {
  throw new Error('METREE_SECRET_DATA environment variable is not set');
}

export const familyData: FamilyTreeData = JSON.parse(METREE_SECRET_DATA);
