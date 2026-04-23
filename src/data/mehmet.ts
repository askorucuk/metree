import type { FamilyTreeData } from '../types';

export const mehmetData: FamilyTreeData = {
  persons: [
    // ===== Derece 5 (En eski - ~1867-1882) =====
    {
      id: 'asker-sakar',
      firstName: 'Asker',
      lastName: 'Şakar',
      gender: 'male',
      birthDate: '01.07.1869',
      deathDate: '28.10.1934',
      role: 'Baba tarafı',
      tag: 'Derece 5',
      description: 'Yakınlık: Babasının annesinin babası\nDoğum Yeri: Hasankale / Ağaçminare\nBabası: Sefer\nAnnesi: Mahbup',
    },
    {
      id: 'hani-sakar',
      firstName: 'Hani',
      lastName: 'Şakar',
      gender: 'female',
      birthDate: '01.07.1867',
      deathDate: '15.12.1943',
      role: 'Baba tarafı',
      tag: 'Derece 5',
      description: 'Yakınlık: Babasının annesinin annesi\nDoğum Yeri: Hasankale / Ağaçminare\nBabası: Mahmut\nAnnesi: Fatma',
    },
    {
      id: 'memet-korucuk',
      firstName: 'Memet',
      lastName: 'Korucuk',
      gender: 'male',
      birthDate: '01.07.1879',
      deathDate: '16.01.1955',
      role: 'Baba tarafı',
      tag: 'Derece 5',
      description: 'Yakınlık: Babasının babasının babası\nDoğum Yeri: Hasankale / Camiikebir\nBabası: Hasan\nAnnesi: Ayişe',
    },
    {
      id: 'izzet-korucuk',
      firstName: 'İzzet',
      lastName: 'Korucuk',
      gender: 'female',
      birthDate: '01.07.1880',
      deathDate: '10.08.1955',
      role: 'Baba tarafı',
      tag: 'Derece 5',
      description: 'Yakınlık: Babasının babasının annesi\nDoğum Yeri: Hasankale / Camiikebir\nBabası: Musa\nAnnesi: Peruze',
    },
    {
      id: 'abdussemet-erturan',
      firstName: 'Abdussemet',
      lastName: 'Erturan',
      gender: 'male',
      birthDate: '01.07.1877',
      deathDate: '01.08.1972',
      role: 'Anne tarafı',
      tag: 'Derece 5',
      description: 'Yakınlık: Annesinin babasının babası\nDoğum Yeri: Pasinler / Akçataş\nBabası: Memet\nAnnesi: Zekiye',
    },
    {
      id: 'bedirye-erturan',
      firstName: 'Bedirye',
      lastName: 'Erturan',
      gender: 'female',
      birthDate: '01.07.1882',
      deathDate: '10.03.1966',
      role: 'Anne tarafı',
      tag: 'Derece 5',
      description: 'Yakınlık: Annesinin babasının annesi\nDoğum Yeri: Pasinler / Akçataş\nBabası: Şeyih\nAnnesi: Kıymet',
    },

    // ===== Derece 4 (Büyükanne-babalar) =====
    {
      id: 'mustafa-korucuk',
      firstName: 'Mustafa',
      lastName: 'Korucuk',
      gender: 'male',
      birthDate: '01.07.1911',
      deathDate: '02.12.1976',
      role: 'Baba babası',
      tag: 'Derece 4',
      description: 'Yakınlık: Babasının babası\nDoğum Yeri: Hasankale / Camiikebir\nBabası: Memet\nAnnesi: İzzet',
    },
    {
      id: 'fatma-korucuk',
      firstName: 'Fatma',
      lastName: 'Korucuk',
      gender: 'female',
      birthDate: '01.07.1910',
      deathDate: '18.11.1980',
      role: 'Baba annesi',
      tag: 'Derece 4',
      description: 'Yakınlık: Babasının annesi\nDoğum Yeri: Hasankale / Camiikebir\nBabası: Asker\nAnnesi: Hati',
    },
    {
      id: 'memet-erturan',
      firstName: 'Memet',
      lastName: 'Erturan',
      gender: 'male',
      birthDate: '01.07.1921',
      deathDate: '24.03.1949',
      role: 'Anne babası',
      tag: 'Derece 4',
      description: 'Yakınlık: Annesinin babası\nDoğum Yeri: Pasinler / Akçataş\nBabası: Abdussemet\nAnnesi: Bedirye',
    },
    {
      id: 'siddika-peker',
      firstName: 'Sıddıka',
      lastName: 'Peker',
      gender: 'female',
      birthDate: '01.07.1924',
      deathDate: '29.12.1953',
      role: 'Anne annesi',
      tag: 'Derece 4',
      description: 'Yakınlık: Annesinin annesi\nDoğum Yeri: Erzurum / Hınıs\nBabası: Necip\nAnnesi: Hadire',
    },

    // ===== Derece 3 (Anne-baba) =====
    {
      id: 'mukim-korucuk',
      firstName: 'Mukim',
      lastName: 'Korucuk',
      gender: 'male',
      birthDate: '10.09.1938',
      deathDate: '23.06.2021',
      role: 'Baba',
      tag: 'Derece 3',
      description: 'Yakınlık: Babası\nDoğum Yeri: Hasankale / Camiikebir\nBabası: Mustafa\nAnnesi: Fatma',
    },
    {
      id: 'gulsen-korucuk',
      firstName: 'Gülsen',
      lastName: 'Korucuk',
      gender: 'female',
      birthDate: '25.08.1944',
      deathDate: '10.10.2017',
      role: 'Anne',
      tag: 'Derece 3',
      description: 'Yakınlık: Annesi\nDoğum Yeri: Hasankale / Camiikebir\nBabası: Mehmet\nAnnesi: Sıddıka\nKızlık soyadı: Erturan',
    },

    // ===== Derece 2 (Kendisi + Eş) =====
    {
      id: 'nur-mehmet-fevzi',
      firstName: 'Nur Mehmet Fevzi',
      lastName: 'Korucuk',
      gender: 'male',
      birthDate: '21.07.1966',
      role: 'Kendisi',
      tag: 'Derece 2',
      description: 'Yakınlık: Kendisi\nDoğum Yeri: Hasankale / Camiikebir\nBabası: Mukim\nAnnesi: Gülsen',
    },
    {
      id: 'serap-korucuk',
      firstName: 'Serap',
      lastName: 'Korucuk',
      gender: 'female',
      birthDate: '14.05.1976',
      role: 'Eş',
      tag: 'Derece 2',
      description: 'Yakınlık: Eşi\nDoğum Yeri: Pasinler\nBabası: Burhanettin\nAnnesi: Süriyya\nKızlık soyadı: İşcan',
    },

    // ===== Derece 1 (Oğulları + Gelinleri) =====
    {
      id: 'ebubekir-korucuk',
      firstName: 'Ebubekir',
      lastName: 'Korucuk',
      gender: 'male',
      birthDate: '12.08.1995',
      role: 'Oğlu',
      tag: 'Derece 1',
      description: 'Yakınlık: Oğlu\nDoğum Yeri: Pasinler\nBabası: Nur Mehmet Fevzi\nAnnesi: Serap',
    },
    {
      id: 'gizem-nur-korucuk',
      firstName: 'Gizem Nur',
      lastName: 'Korucuk',
      gender: 'female',
      birthDate: '1994',
      role: 'Gelin',
      tag: 'Derece 1',
      description: 'Yakınlık: Gelini\nEşi: Ebubekir Korucuk',
    },
    {
      id: 'ahmet-said-korucuk',
      firstName: 'Ahmet Said',
      lastName: 'Korucuk',
      gender: 'male',
      birthDate: '09.07.1999',
      role: 'Oğlu',
      tag: 'Derece 1',
      description: 'Yakınlık: Oğlu\nDoğum Yeri: Pasinler\nBabası: Nur Mehmet Fevzi\nAnnesi: Serap',
    },
    {
      id: 'elif-nur-korucuk',
      firstName: 'Elif Nur',
      lastName: 'Korucuk',
      gender: 'female',
      birthDate: '20.06.1999',
      role: 'Gelin',
      tag: 'Derece 1',
      description: 'Yakınlık: Gelini\nEşi: Ahmet Said Korucuk',
    },
    {
      id: 'ebubekir-child',
      firstName: '👑',
      lastName: 'Korucuk',
      gender: 'male',
      role: 'Torun',
      isPlaceholder: true,
    },
  ],
  relationships: [
    // Derece 5 eşleri
    { from: 'asker-sakar', to: 'hani-sakar', type: 'spouse' },
    { from: 'memet-korucuk', to: 'izzet-korucuk', type: 'spouse' },
    { from: 'abdussemet-erturan', to: 'bedirye-erturan', type: 'spouse' },

    // Derece 5 → Derece 4
    { from: 'asker-sakar', to: 'fatma-korucuk', type: 'parent' },
    { from: 'hani-sakar', to: 'fatma-korucuk', type: 'parent' },
    { from: 'memet-korucuk', to: 'mustafa-korucuk', type: 'parent' },
    { from: 'izzet-korucuk', to: 'mustafa-korucuk', type: 'parent' },
    { from: 'abdussemet-erturan', to: 'memet-erturan', type: 'parent' },
    { from: 'bedirye-erturan', to: 'memet-erturan', type: 'parent' },

    // Derece 4 eşleri
    { from: 'mustafa-korucuk', to: 'fatma-korucuk', type: 'spouse' },
    { from: 'memet-erturan', to: 'siddika-peker', type: 'spouse' },

    // Derece 4 → Derece 3
    { from: 'mustafa-korucuk', to: 'mukim-korucuk', type: 'parent' },
    { from: 'fatma-korucuk', to: 'mukim-korucuk', type: 'parent' },
    { from: 'memet-erturan', to: 'gulsen-korucuk', type: 'parent' },
    { from: 'siddika-peker', to: 'gulsen-korucuk', type: 'parent' },

    // Derece 3 eşleri
    { from: 'mukim-korucuk', to: 'gulsen-korucuk', type: 'spouse' },

    // Derece 3 → Derece 2
    { from: 'mukim-korucuk', to: 'nur-mehmet-fevzi', type: 'parent' },
    { from: 'gulsen-korucuk', to: 'nur-mehmet-fevzi', type: 'parent' },

    // Derece 2 eşleri
    { from: 'nur-mehmet-fevzi', to: 'serap-korucuk', type: 'spouse' },

    // Derece 2 → Derece 1 (oğulları)
    { from: 'nur-mehmet-fevzi', to: 'ebubekir-korucuk', type: 'parent' },
    { from: 'nur-mehmet-fevzi', to: 'ahmet-said-korucuk', type: 'parent' },
    { from: 'serap-korucuk', to: 'ebubekir-korucuk', type: 'parent' },
    { from: 'serap-korucuk', to: 'ahmet-said-korucuk', type: 'parent' },

    // Gelinler (eşler)
    { from: 'ebubekir-korucuk', to: 'gizem-nur-korucuk', type: 'spouse' },
    { from: 'ahmet-said-korucuk', to: 'elif-nur-korucuk', type: 'spouse' },

    // Ebubekir + Gizem → placeholder torun
    { from: 'ebubekir-korucuk', to: 'ebubekir-child', type: 'parent' },
    { from: 'gizem-nur-korucuk', to: 'ebubekir-child', type: 'parent' },
  ],
};
