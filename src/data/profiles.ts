import type { FamilyTreeData } from '../types';
import { ahmetData } from './ahmet';
import { ebubekirData } from './ebubekir';
import { serapData } from './serap';
import { mehmetData } from './mehmet';

export interface TreeProfile {
  id: string;
  label: string;
  emoji: string;
  data: FamilyTreeData;
}

export const treeProfiles: TreeProfile[] = [
  { id: 'ahmet',    label: 'Ahmet',    emoji: '👨', data: ahmetData    },
  { id: 'ebubekir', label: 'Ebubekir', emoji: '👨', data: ebubekirData },
  { id: 'serap',    label: 'Serap',    emoji: '👩', data: serapData    },
  { id: 'mehmet',   label: 'Mehmet',   emoji: '👨', data: mehmetData   },
];
