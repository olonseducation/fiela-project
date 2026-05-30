import type { VocabularyWord } from '../types';

export type VocabularyCategory =
  | 'action-verb'
  | 'action-movement'
  | 'object-item'
  | 'food-meal'
  | 'clothing-apparel'
  | 'place-location'
  | 'person-family'
  | 'time-schedule'
  | 'body-part'
  | 'transportation'
  | 'school-activity'
  | 'descriptive-adjective'
  | 'nature-weather'
  | 'general';

export function categorizeWord(word: VocabularyWord): VocabularyCategory {
  const w = word.word.toLowerCase();
  const def = word.definition.toLowerCase();

  if (
    w.includes('room') || w.includes('kitchen') || w.includes('classroom') ||
    w.includes('playground') || w.includes('library') || w.includes('cafeteria') ||
    w.includes('yard') || w.includes('park') || w.includes('garden') || 
    w.includes('school') || w.includes('house') || w.includes('hospital')
  ) return 'place-location';

  if (
    w.includes('mother') || w.includes('father') || w.includes('sister') ||
    w.includes('brother') || w.includes('grandmother') || w.includes('grandfather') ||
    w.includes('friend') || w.includes('teacher') || w.includes('classmate') || 
    w.includes('student') || w.includes('boy') || w.includes('girl') || w.includes('uncle') || w.includes('aunt')
  ) return 'person-family';

  if (
    w.includes('uniform') || w.includes('shirt') || w.includes('clothes') ||
    w.includes('dress') || w.includes('shoe') || w.includes('sock') || 
    w.includes('pants') || w.includes('hat') || w.includes('jacket')
  ) return 'clothing-apparel';

  if (
    w.includes('breakfast') || w.includes('lunch') || w.includes('dinner') ||
    w.includes('snack') || w.includes('meal') || w.includes('food') ||
    w.includes('rice') || w.includes('chicken') || w.includes('vegetable') ||
    w.includes('egg') || w.includes('soup') || w.includes('fruit') ||
    w.includes('bread') || w.includes('meat') || w.includes('fish') || 
    w.includes('water') || w.includes('milk') || w.includes('apple') || w.includes('pizza')
  ) return 'food-meal';

  if (
    w === 'head' || w === 'hand' || w === 'leg' || w === 'eye' || 
    w === 'nose' || w === 'mouth' || w === 'ear' || w === 'arm' || 
    w === 'foot' || w === 'hair'
  ) return 'body-part';

  if (
    w.includes('morning') || w.includes('afternoon') || w.includes('evening') ||
    w.includes('night') || w.includes('time') || w.includes('hour') || 
    w.includes('day') || w.includes('today') || w.includes('tomorrow') || w.includes('yesterday') || w.includes('weekend')
  ) return 'time-schedule';

  if (
    w.includes('wind') || w.includes('rain') || w.includes('sun') ||
    w.includes('snow') || w.includes('cloud') || w.includes('weather') || 
    w.includes('tree') || w.includes('flower') || w.includes('sky') || w.includes('star') || w.includes('moon') || w.includes('mountain') || w.includes('river')
  ) return 'nature-weather';

  if (
    w.includes('bus') || w.includes('car') || w.includes('bike') || 
    w.includes('train') || w.includes('airplane') || w.includes('boat') || 
    w.includes('motorcycle') || w.includes('taxi')
  ) return 'transportation';

  if (
    w.includes('pencil') || w.includes('book') || w.includes('eraser') ||
    w.includes('desk') || w.includes('chair') || w.includes('board') ||
    w.includes('marker') || w.includes('paper') || w.includes('ruler') ||
    w.includes('bag') || w.includes('backpack') || w.includes('photo') ||
    w.includes('picture') || w.includes('ball') || w.includes('toy') ||
    w.includes('slide') || w.includes('swing') || w.includes('table') || 
    w.includes('box') || w.includes('television') || w.includes('door') || 
    w.includes('window') || w.includes('bed') || w.includes('lamp') || w.includes('phone')
  ) return 'object-item';

  if (
    w.includes('delicious') || w.includes('spicy') || w.includes('sweet') ||
    w.includes('tasty') || w.includes('yummy') || w.includes('fresh') ||
    w === 'hot' || w === 'cold' || w === 'big' || w === 'small' || 
    w === 'tall' || w === 'short' || w === 'fast' || w === 'slow' || 
    w === 'good' || w === 'bad' || w === 'happy' || w === 'sad'
  ) return 'descriptive-adjective';

  if (
    w === 'run' || w === 'jump' || w === 'throw' || w === 'catch' ||
    w === 'climb' || w === 'kick' || w === 'hop' || w === 'skip' || 
    w === 'swim' || w === 'fly' || w === 'walk'
  ) return 'action-movement';

  if (
    w === 'help' || w === 'play' || w === 'cook' || w === 'wash' || w === 'brush' ||
    w === 'write' || w === 'read' || w === 'listen' || w === 'understand' ||
    w.includes('wake up') || w.includes('get dressed') || w.includes('pack') ||
    w === 'stretch' || w === 'yawn' || w === 'sleep' || w === 'drink' || 
    w === 'talk' || w === 'clean' || w === 'eat' || w === 'draw' || 
    w === 'make' || w === 'do' || w === 'prepare' || w === 'homework' || w === 'test' || w === 'recess' || w === 'exam'
  ) {
    if (w === 'homework' || w === 'test' || w === 'recess' || w === 'exam') return 'school-activity';
    return 'action-verb';
  }

  // FALLBACK DEFINITION CHECKS
  if (def.includes('person') || def.includes('family') || def.includes('someone')) return 'person-family';
  if (def.includes('place') || def.includes('room') || def.includes('area')) return 'place-location';
  if (def.includes('clothes') || def.includes('wear')) return 'clothing-apparel';
  if (def.includes('food') || def.includes('meal') || def.includes('eat')) return 'food-meal';
  if (def.includes('time') || def.includes('period') || def.includes('day')) return 'time-schedule';
  if (def.includes('vehicle') || def.includes('transportation')) return 'transportation';
  if (def.includes('tool') || def.includes('object') || def.includes('surface') || def.includes('furniture')) return 'object-item';
  if (def.includes('taste') || def.includes('having a') || def.includes('temperature') || def.includes('size')) return 'descriptive-adjective';
  if (def.includes('to move') || def.includes('to push') || def.includes('to travel')) return 'action-movement';
  if (def.includes('to ')) return 'action-verb';

  return 'general';
}

const BASE_URL = 'https://raw.githubusercontent.com/olonsgallery/fiela-repository/main/images/unit1/minigame/';

/**
 * Pengecoh Khusus Ekspedisi 1 (Wajib bergambar & terbagi per kategori logis)
 */
const EXPEDITION_1_DISTRACTORS: VocabularyWord[] = [
  // 1. Kategori: object-item (Untuk mengecoh kata benda seperti 'backpack')
  { word: 'book', definition: 'pages to read', pronunciation: 'bʊk', example: 'I read a book.', image: `${BASE_URL}book.jpeg` },
  { word: 'pencil', definition: 'a tool for writing', pronunciation: 'ˈpensl', example: 'I write with a pencil.', image: `${BASE_URL}pencil.jpeg` },
  
  // 2. Kategori: clothing-apparel (Untuk mengecoh baju/pakaian)
  { word: 'hat', definition: 'clothing for your head', pronunciation: 'hæt', example: 'I wear a hat.', image: `${BASE_URL}hat.jpeg` },
  { word: 'jacket', definition: 'a short coat', pronunciation: 'ˈdʒækɪt', example: 'Wear a jacket.', image: `${BASE_URL}jacket.jpeg` },
  
  // 3. Kategori: food-meal (Untuk mengecoh sarapan/makanan)
  { word: 'apple', definition: 'a round red or green fruit', pronunciation: 'ˈæpl', example: 'I eat an apple.', image: `${BASE_URL}apple.jpeg` },
  { word: 'bread', definition: 'food made of baked flour', pronunciation: 'bred', example: 'I eat bread.', image: `${BASE_URL}bread.jpeg` },
  
  // 4. Kategori: action-verb (Untuk mengecoh kata kerja tambahan jika kurang)
  { word: 'sleep', definition: 'to rest with your eyes closed', pronunciation: 'sliːp', example: 'I sleep.', image: `${BASE_URL}sleep.jpeg` },
  { word: 'drink', definition: 'to swallow a liquid', pronunciation: 'drɪŋk', example: 'I drink water.', image: `${BASE_URL}drink.jpeg` }
];

/**
 * Kamus Cadangan Original untuk Ekspedisi 2-5 (Tanpa Gambar)
 */
const FALLBACK_DICTIONARY: Record<VocabularyCategory, VocabularyWord[]> = {
  'place-location': [
    { word: 'bedroom', definition: 'a room where you sleep', pronunciation: 'ˈbedruːm', example: 'My bed is in the bedroom.' },
    { word: 'hospital', definition: 'a place where sick people get help', pronunciation: 'ˈhɒspɪtl', example: 'The doctor is at the hospital.' }
  ],
  'action-verb': [
    { word: 'sleep', definition: 'to rest with your eyes closed', pronunciation: 'sliːp', example: 'I sleep at night.' },
    { word: 'clean', definition: 'to remove dirt', pronunciation: 'kliːn', example: 'I clean my room.' }
  ],
  'action-movement': [
    { word: 'run', definition: 'to move fast on your legs', pronunciation: 'rʌn', example: 'I run in the park.' },
    { word: 'fly', definition: 'to move through the air', pronunciation: 'flaɪ', example: 'Birds fly high.' }
  ],
  'object-item': [
    { word: 'table', definition: 'furniture with a flat top and legs', pronunciation: 'ˈteɪbl', example: 'Put the book on the table.' },
    { word: 'box', definition: 'a container with a flat base and sides', pronunciation: 'bɒks', example: 'The toy is in the box.' }
  ],
  'food-meal': [
    { word: 'apple', definition: 'a round fruit with red or green skin', pronunciation: 'ˈæpl', example: 'I eat an apple.' },
    { word: 'pizza', definition: 'a round flat bread with cheese and tomato', pronunciation: 'ˈpiːtsə', example: 'I love eating pizza.' }
  ],
  'clothing-apparel': [
    { word: 'hat', definition: 'clothing for your head', pronunciation: 'hæt', example: 'I wear a hat in the sun.' },
    { word: 'shoes', definition: 'coverings for your feet', pronunciation: 'ʃuːz', example: 'I wear my shoes to run.' }
  ],
  'person-family': [
    { word: 'uncle', definition: 'the brother of your mother or father', pronunciation: 'ˈʌŋkl', example: 'My uncle is tall.' },
    { word: 'doctor', definition: 'a person who helps sick people', pronunciation: 'ˈdɒktə', example: 'The doctor helps me.' }
  ],
  'time-schedule': [
    { word: 'tomorrow', definition: 'the day after today', pronunciation: 'təˈmɒrəʊ', example: 'We will play tomorrow.' },
    { word: 'yesterday', definition: 'the day before today', pronunciation: 'ˈjestədeɪ', example: 'I went to school yesterday.' }
  ],
  'body-part': [
    { word: 'head', definition: 'the top part of your body', pronunciation: 'hed', example: 'I wear a hat on my head.' },
    { word: 'hand', definition: 'the part of the arm you use to hold things', pronunciation: 'hænd', example: 'I hold the pencil in my hand.' }
  ],
  'transportation': [
    { word: 'train', definition: 'a long vehicle that moves on tracks', pronunciation: 'treɪn', example: 'The train is fast.' },
    { word: 'boat', definition: 'a vehicle used for traveling on water', pronunciation: 'bəʊt', example: 'The boat is on the sea.' }
  ],
  'school-activity': [
    { word: 'homework', definition: 'school work done at home', pronunciation: 'ˈhəʊmwɜːk', example: 'I do my homework.' },
    { word: 'exam', definition: 'an important test', pronunciation: 'ɪɡˈzæm', example: 'I have a math exam.' }
  ],
  'descriptive-adjective': [
    { word: 'hot', definition: 'having a high temperature', pronunciation: 'hɒt', example: 'The sun is hot.' },
    { word: 'small', definition: 'little in size', pronunciation: 'smɔːl', example: 'The ant is small.' }
  ],
  'nature-weather': [
    { word: 'tree', definition: 'a tall plant with branches and leaves', pronunciation: 'triː', example: 'The bird is in the tree.' },
    { word: 'mountain', definition: 'a very high hill', pronunciation: 'ˈmaʊntɪn', example: 'We climb the mountain.' }
  ],
  'general': [
    { word: 'thing', definition: 'an object', pronunciation: 'θɪŋ', example: 'What is that thing?' },
    { word: 'color', definition: 'red, blue, green, yellow, etc.', pronunciation: 'ˈkʌlə', example: 'Red is my favorite color.' }
  ]
};

export function getSmartDistractors(
  targetWord: VocabularyWord,
  allVocabulary: VocabularyWord[],
  count: number = 2
): VocabularyWord[] {
  const targetCategory = categorizeWord(targetWord);
  
  // Cek apakah ini game yang butuh gambar (Ekspedisi 1)
  const requiresImage = !!targetWord.image; 

  // 1. CARI DI DALAM EKSPEDISI INI (Syarat: Kategorinya wajib sama)
  const sameCategoryUnit = allVocabulary.filter(w =>
    w.word !== targetWord.word &&
    categorizeWord(w) === targetCategory
  );

  const result: VocabularyWord[] = [...sameCategoryUnit]
    .sort(() => Math.random() - 0.5)
    .slice(0, count);

  // Jika sudah cukup dari dalam Ekspedisi saja, langsung keluarkan
  if (result.length >= count) return result;

  // 2. JIKA KURANG, CARI DI KAMUS CADANGAN (Syarat: Kategorinya wajib sama)
  if (requiresImage) {
    // Ambil dari kamus bergambar (Ekspedisi 1)
    const fallbackOptions = EXPEDITION_1_DISTRACTORS.filter(fw => categorizeWord(fw) === targetCategory);
    
    const safeFallbacks = fallbackOptions
      .filter(fw => fw.word.toLowerCase() !== targetWord.word.toLowerCase() && !result.some(r => r.word === fw.word))
      .sort(() => Math.random() - 0.5);

    for (const fw of safeFallbacks) {
      if (result.length >= count) break;
      result.push(fw);
    }
  } else {
    // Ambil dari kamus raksasa teks (Ekspedisi 2-5)
    const fallbackOptions = FALLBACK_DICTIONARY[targetCategory] || FALLBACK_DICTIONARY['general'];
    
    const safeFallbacks = fallbackOptions
      .filter(fw => fw.word.toLowerCase() !== targetWord.word.toLowerCase() && !result.some(r => r.word === fw.word))
      .sort(() => Math.random() - 0.5);

    for (const fw of safeFallbacks) {
      if (result.length >= count) break;
      result.push(fw);
    }
  }

  // 3. JALUR DARURAT: Jika masih kurang (hanya terjadi jika gambar belum diupload), comot kata acak apa saja agar tidak error
  if (result.length < count) {
    const remaining = allVocabulary.filter(w => 
      w.word !== targetWord.word && 
      !result.some(r => r.word === w.word)
    ).sort(() => Math.random() - 0.5);

    for (const rw of remaining) {
      if (result.length >= count) break;
      result.push(rw);
    }
  }

  return result.slice(0, count);
}