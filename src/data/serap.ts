import type { FamilyTreeData } from '../types';

export const serapData: FamilyTreeData = {
  persons: [
    // ===== Derece 5 (En eski - ~1857-1884) =====
    {
      id: 'pehlul-karsli',
      firstName: 'Pehlül',
      lastName: 'Karslı',
      gender: 'male',
      birthDate: '01.07.1857',
      deathDate: '01.07.1933',
      role: 'Anne tarafı',
      tag: 'Derece 5',
      description: 'Yakınlık: Annesinin babasının babası\nDoğum Yeri: Hasankale\nBabası: Hafis Halil\nAnnesi: Hafize',
    },
    {
      id: 'fehme-karsli',
      firstName: 'Fehme',
      lastName: 'Karslı',
      gender: 'female',
      birthDate: '01.07.1857',
      deathDate: '01.07.1932',
      role: 'Anne tarafı',
      tag: 'Derece 5',
      description: 'Yakınlık: Annesinin babasının annesi\nDoğum Yeri: Hasankale\nBabası: Şerif\nAnnesi: Peruze',
    },
    {
      id: 'aziz-olgar',
      firstName: 'Aziz',
      lastName: 'Olğar',
      gender: 'male',
      birthDate: '01.07.1865',
      deathDate: '12.07.1940',
      role: 'Anne tarafı',
      tag: 'Derece 5',
      description: 'Yakınlık: Annesinin annesinin babası\nDoğum Yeri: Hasankale\nBabası: Yunus\nAnnesi: İzzet',
    },
    {
      id: 'gulzade-olgar',
      firstName: 'Gülzade',
      lastName: 'Olğar',
      gender: 'female',
      birthDate: '01.07.1884',
      deathDate: '01.10.1970',
      role: 'Anne tarafı',
      tag: 'Derece 5',
      description: 'Yakınlık: Annesinin annesinin annesi\nDoğum Yeri: Hasankale\nBabası: Hurşit\nAnnesi: Gülşan',
    },
    {
      id: 'gulzade-iccan',
      firstName: 'Gülzade',
      lastName: 'İçcan',
      gender: 'female',
      birthDate: '01.07.1878',
      deathDate: '15.07.1975',
      role: 'Baba tarafı',
      tag: 'Derece 5',
      description: 'Yakınlık: Babasının babasının annesi\nDoğum Yeri: Pasinler\nBabası: Ali\nAnnesi: Güller',
    },

    // ===== Derece 4 (Serap'ın büyük anne-babaları - ~1916-1918) =====
    {
      id: 'memnune-karsli',
      firstName: 'Memnune',
      lastName: 'Karslı',
      gender: 'female',
      birthDate: '01.07.1916',
      deathDate: '25.04.2017',
      role: 'Anne annesi',
      tag: 'Derece 4',
      description: 'Yakınlık: Annesinin annesi\nDoğum Yeri: Hasankale\nBabası: Aziz\nAnnesi: Gülzade',
    },
    {
      id: 'mahmut-karsli',
      firstName: 'Mahmut',
      lastName: 'Karslı',
      gender: 'male',
      birthDate: '01.07.1918',
      deathDate: '20.05.1991',
      role: 'Anne babası',
      tag: 'Derece 4',
      description: 'Yakınlık: Annesinin babası\nDoğum Yeri: Hasankale\nBabası: Pehlül\nAnnesi: Fehime',
    },
    {
      id: 'makbule-iccan',
      firstName: 'Makbule',
      lastName: 'İçcan',
      gender: 'female',
      birthDate: '01.07.1916',
      deathDate: '22.01.1994',
      role: 'Baba annesi',
      tag: 'Derece 4',
      description: 'Yakınlık: Babasının annesi\nDoğum Yeri: Pasinler\nBabası: İbrahim\nAnnesi: Binnaz',
    },
    {
      id: 'abdullah-iccan',
      firstName: 'Abdullah',
      lastName: 'İçcan',
      gender: 'male',
      birthDate: '01.07.1918',
      deathDate: '25.10.1982',
      role: 'Baba babası',
      tag: 'Derece 4',
      description: 'Yakınlık: Babasının babası\nDoğum Yeri: Pasinler\nBabası: Hamdi\nAnnesi: Gülzade',
    },

    // ===== Derece 3 (Serap'ın anne-babası) =====
    {
      id: 'suriyya-iscan',
      firstName: 'Süriyya',
      lastName: 'İşcan',
      gender: 'female',
      birthDate: '30.11.1945',
      role: 'Anne',
      tag: 'Derece 3',
      description: 'Yakınlık: Annesi\nDoğum Yeri: Hasankale\nBabası: Mahmut\nAnnesi: Memnune',
    },
    {
      id: 'burhanettin-iscan',
      firstName: 'Burhanettin',
      lastName: 'İşcan',
      gender: 'male',
      birthDate: '01.01.1947',
      role: 'Baba',
      tag: 'Derece 3',
      description: 'Yakınlık: Babası\nDoğum Yeri: Pasinler\nBabası: Abdullah\nAnnesi: Makbule',
    },

    // ===== Derece 2 (Kendisi + Eş) =====
    {
      id: 'serap-korucuk',
      firstName: 'Serap',
      lastName: 'Korucuk',
      gender: 'female',
      birthDate: '14.05.1976',
      role: 'Kendisi',
      tag: 'Derece 2',
      description: 'Yakınlık: Kendisi\nDoğum Yeri: Pasinler\nBabası: Burhanettin\nAnnesi: Süriyya\nKızlık soyadı: İşcan',
    },
    {
      id: 'nur-mehmet-fevzi',
      firstName: 'Nur Mehmet Fevzi',
      lastName: 'Korucuk',
      gender: 'male',
      birthDate: '21.07.1966',
      role: 'Eş',
      tag: 'Derece 2',
      description: 'Yakınlık: Eşi\nDoğum Yeri: Hasankale\nBabası: Mukim\nAnnesi: Gülsen',
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
    { from: 'pehlul-karsli', to: 'fehme-karsli', type: 'spouse' },
    { from: 'aziz-olgar', to: 'gulzade-olgar', type: 'spouse' },

    // Derece 5 → Derece 4 (Anne tarafı)
    { from: 'pehlul-karsli', to: 'mahmut-karsli', type: 'parent' },
    { from: 'fehme-karsli', to: 'mahmut-karsli', type: 'parent' },
    { from: 'aziz-olgar', to: 'memnune-karsli', type: 'parent' },
    { from: 'gulzade-olgar', to: 'memnune-karsli', type: 'parent' },

    // Derece 5 → Derece 4 (Baba tarafı)
    { from: 'gulzade-iccan', to: 'abdullah-iccan', type: 'parent' },

    // Derece 4 eşleri
    { from: 'mahmut-karsli', to: 'memnune-karsli', type: 'spouse' },
    { from: 'abdullah-iccan', to: 'makbule-iccan', type: 'spouse' },

    // Derece 4 → Derece 3
    { from: 'mahmut-karsli', to: 'suriyya-iscan', type: 'parent' },
    { from: 'memnune-karsli', to: 'suriyya-iscan', type: 'parent' },
    { from: 'abdullah-iccan', to: 'burhanettin-iscan', type: 'parent' },
    { from: 'makbule-iccan', to: 'burhanettin-iscan', type: 'parent' },

    // Derece 3 eşleri
    { from: 'burhanettin-iscan', to: 'suriyya-iscan', type: 'spouse' },

    // Derece 3 → Derece 2 (Serap)
    { from: 'burhanettin-iscan', to: 'serap-korucuk', type: 'parent' },
    { from: 'suriyya-iscan', to: 'serap-korucuk', type: 'parent' },

    // Serap + Mehmet Fevzi (eş)
    { from: 'serap-korucuk', to: 'nur-mehmet-fevzi', type: 'spouse' },

    // Serap + Mehmet Fevzi → oğulları
    { from: 'serap-korucuk', to: 'ebubekir-korucuk', type: 'parent' },
    { from: 'serap-korucuk', to: 'ahmet-said-korucuk', type: 'parent' },
    { from: 'nur-mehmet-fevzi', to: 'ebubekir-korucuk', type: 'parent' },
    { from: 'nur-mehmet-fevzi', to: 'ahmet-said-korucuk', type: 'parent' },

    // Gelinler (eşler)
    { from: 'ebubekir-korucuk', to: 'gizem-nur-korucuk', type: 'spouse' },
    { from: 'ahmet-said-korucuk', to: 'elif-nur-korucuk', type: 'spouse' },

    // Ebubekir + Gizem → placeholder torun
    { from: 'ebubekir-korucuk', to: 'ebubekir-child', type: 'parent' },
    { from: 'gizem-nur-korucuk', to: 'ebubekir-child', type: 'parent' },
  ],
};
