export interface Person {
  id: string;
  firstName: string;
  lastName: string;
  photo?: string;
  description?: string;
  birthDate?: string;
  deathDate?: string;
  gender: 'male' | 'female';
  tag?: string;
  role?: string;
  isPlaceholder?: boolean;
}

export interface Relationship {
  from: string;
  to: string;
  type: 'parent' | 'spouse';
}

export interface FamilyTreeData {
  persons: Person[];
  relationships: Relationship[];
}
