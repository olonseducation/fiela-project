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

const BASE_URL = 'https://cdn.jsdelivr.net/gh/olonsgallery/fiela-repository@main/images/unit1/minigame/';

const EXPEDITION_1_DISTRACTORS: VocabularyWord[] = [
  { word: 'book', definition: 'pages to read', pronunciation: 'bʊk', example: 'I read a book.', image: `${BASE_URL}book.webp` },
  { word: 'pencil', definition: 'a tool for writing', pronunciation: 'ˈpensl', example: 'I write with a pencil.', image: `${BASE_URL}pencil.webp` },
  { word: 'bag', definition: 'a container to carry things', pronunciation: 'bæɡ', example: 'I put my books in the bag.', image: `${BASE_URL}bag.webp` }, 
  { word: 'hat', definition: 'clothing for your head', pronunciation: 'hæt', example: 'I wear a hat.', image: `${BASE_URL}hat.webp` },
  { word: 'jacket', definition: 'a short coat', pronunciation: 'ˈdʒækɪt', example: 'Wear a jacket.', image: `${BASE_URL}jacket.webp` },
  { word: 'shoes', definition: 'coverings for your feet', pronunciation: 'ʃuːz', example: 'Put on your shoes.', image: `${BASE_URL}shoes.webp` }, 
  { word: 'apple', definition: 'a round red or green fruit', pronunciation: 'ˈæpl', example: 'I eat an apple.', image: `${BASE_URL}apple.webp` },
  { word: 'bread', definition: 'food made of baked flour', pronunciation: 'bred', example: 'I eat bread.', image: `${BASE_URL}bread.webp` },
  { word: 'milk', definition: 'a white liquid from cows', pronunciation: 'mɪlk', example: 'I drink milk.', image: `${BASE_URL}milk.webp` }, 
  { word: 'sleep', definition: 'to rest with your eyes closed', pronunciation: 'sliːp', example: 'I sleep at night.', image: `${BASE_URL}sleep.webp` },
  { word: 'drink', definition: 'to swallow a liquid', pronunciation: 'drɪŋk', example: 'I drink water.', image: `${BASE_URL}drink.webp` },
  { word: 'run', definition: 'to move fast on your legs', pronunciation: 'rʌn', example: 'I run in the park.', image: `${BASE_URL}run.webp` } 
];

const FALLBACK_DICTIONARY: Record<VocabularyCategory, VocabularyWord[]> = {
  'place-location': [
    { word: 'bedroom', definition: 'a room where you sleep', pronunciation: 'ˈbedruːm', example: 'My bed is in the bedroom.' },
    { word: 'hospital', definition: 'a place where sick people get help', pronunciation: 'ˈhɒspɪtl', example: 'The doctor is at the hospital.' },
    { word: 'library', definition: 'a place with many books', pronunciation: 'ˈlaɪbrəri', example: 'I read at the library.' },
    { word: 'park', definition: 'a large area with grass and trees', pronunciation: 'pɑːk', example: 'We play in the park.' },
    { word: 'kitchen', definition: 'a room where food is cooked', pronunciation: 'ˈkɪtʃɪn', example: 'Mom cooks in the kitchen.' }
  ],
  'action-verb': [
    { word: 'sleep', definition: 'to rest with your eyes closed', pronunciation: 'sliːp', example: 'I sleep at night.' },
    { word: 'clean', definition: 'to remove dirt', pronunciation: 'kliːn', example: 'I clean my room.' },
    { word: 'read', definition: 'to look at and understand words', pronunciation: 'riːd', example: 'I read a story.' },
    { word: 'write', definition: 'to make marks on paper', pronunciation: 'raɪt', example: 'I write with a pen.' },
    { word: 'listen', definition: 'to pay attention to sound', pronunciation: 'ˈlɪsn', example: 'I listen to music.' },
    { word: 'wash', definition: 'to clean with water', pronunciation: 'wɒʃ', example: 'I wash my hands.' }
  ],
  'action-movement': [
    { word: 'run', definition: 'to move fast on your legs', pronunciation: 'rʌn', example: 'I run in the park.' },
    { word: 'fly', definition: 'to move through the air', pronunciation: 'flaɪ', example: 'Birds fly high.' },
    { word: 'jump', definition: 'to push yourself into the air', pronunciation: 'dʒʌmp', example: 'I jump over the log.' },
    { word: 'swim', definition: 'to move in water', pronunciation: 'swɪm', example: 'I swim in the pool.' },
    { word: 'climb', definition: 'to go up towards the top', pronunciation: 'klaɪm', example: 'I climb the tree.' }
  ],
  'object-item': [
    { word: 'table', definition: 'furniture with a flat top and legs', pronunciation: 'ˈteɪbl', example: 'Put the book on the table.' },
    { word: 'box', definition: 'a container with a flat base and sides', pronunciation: 'bɒks', example: 'The toy is in the box.' },
    { word: 'bag', definition: 'a container used to carry things', pronunciation: 'bæɡ', example: 'My books are in the bag.' },
    { word: 'chair', definition: 'a seat for one person', pronunciation: 'tʃeə', example: 'I sit on the chair.' },
    { word: 'phone', definition: 'a device used to talk to people', pronunciation: 'fəʊn', example: 'I call my mom on the phone.' },
    { word: 'pencil', definition: 'a tool used for writing or drawing', pronunciation: 'ˈpensl', example: 'I write with my pencil.' }
  ],
  'food-meal': [
    { word: 'apple', definition: 'a round fruit with red or green skin', pronunciation: 'ˈæpl', example: 'I eat an apple.' },
    { word: 'pizza', definition: 'a round flat bread with cheese and tomato', pronunciation: 'ˈpiːtsə', example: 'I love eating pizza.' },
    { word: 'rice', definition: 'small white grains cooked and eaten', pronunciation: 'raɪs', example: 'I eat rice every day.' },
    { word: 'chicken', definition: 'meat from a bird kept on a farm', pronunciation: 'ˈtʃɪkɪn', example: 'We have chicken for dinner.' },
    { word: 'soup', definition: 'a hot liquid food', pronunciation: 'suːp', example: 'The soup is very hot.' },
    { word: 'bread', definition: 'food made from flour and water', pronunciation: 'bred', example: 'I eat bread in the morning.' }
  ],
  'clothing-apparel': [
    { word: 'hat', definition: 'clothing for your head', pronunciation: 'hæt', example: 'I wear a hat in the sun.' },
    { word: 'shoes', definition: 'coverings for your feet', pronunciation: 'ʃuːz', example: 'I wear my shoes to run.' },
    { word: 'shirt', definition: 'clothing for your upper body', pronunciation: 'ʃɜːt', example: 'I wear a blue shirt.' },
    { word: 'pants', definition: 'clothing that covers your legs', pronunciation: 'pænts', example: 'My pants are black.' },
    { word: 'jacket', definition: 'a short coat', pronunciation: 'ˈdʒækɪt', example: 'I wear a jacket when it is cold.' }
  ],
  'person-family': [
    { word: 'uncle', definition: 'the brother of your mother or father', pronunciation: 'ˈʌŋkl', example: 'My uncle is tall.' },
    { word: 'doctor', definition: 'a person who helps sick people', pronunciation: 'ˈdɒktə', example: 'The doctor helps me.' },
    { word: 'teacher', definition: 'a person who helps you learn', pronunciation: 'ˈtiːtʃə', example: 'My teacher is kind.' },
    { word: 'friend', definition: 'a person you like and play with', pronunciation: 'frend', example: 'I play with my friend.' },
    { word: 'sister', definition: 'a girl with the same parents as you', pronunciation: 'ˈsɪstə', example: 'My sister is smart.' }
  ],
  'time-schedule': [
    { word: 'tomorrow', definition: 'the day after today', pronunciation: 'təˈmɒrəʊ', example: 'We will play tomorrow.' },
    { word: 'yesterday', definition: 'the day before today', pronunciation: 'ˈjestədeɪ', example: 'I went to school yesterday.' },
    { word: 'morning', definition: 'the early part of the day', pronunciation: 'ˈmɔːnɪŋ', example: 'I wake up in the morning.' },
    { word: 'night', definition: 'the dark part of the day', pronunciation: 'naɪt', example: 'I sleep at night.' },
    { word: 'afternoon', definition: 'the time after 12 o\'clock', pronunciation: 'ˌɑːftəˈnuːn', example: 'I play in the afternoon.' }
  ],
  'body-part': [
    { word: 'head', definition: 'the top part of your body', pronunciation: 'hed', example: 'I wear a hat on my head.' },
    { word: 'hand', definition: 'the part of the arm you use to hold things', pronunciation: 'hænd', example: 'I hold the pencil in my hand.' },
    { word: 'eye', definition: 'the part of your face you see with', pronunciation: 'aɪ', example: 'I open my eye.' },
    { word: 'leg', definition: 'the part of your body used for walking', pronunciation: 'leɡ', example: 'My leg is tired.' },
    { word: 'mouth', definition: 'the part of your face you eat and speak with', pronunciation: 'maʊθ', example: 'I open my mouth to eat.' }
  ],
  'transportation': [
    { word: 'train', definition: 'a long vehicle that moves on tracks', pronunciation: 'treɪn', example: 'The train is fast.' },
    { word: 'boat', definition: 'a vehicle used for traveling on water', pronunciation: 'bəʊt', example: 'The boat is on the sea.' },
    { word: 'car', definition: 'a vehicle with four wheels', pronunciation: 'kɑː', example: 'My dad drives a car.' },
    { word: 'bus', definition: 'a large vehicle that carries many people', pronunciation: 'bʌs', example: 'I go to school by bus.' },
    { word: 'airplane', definition: 'a flying vehicle with wings', pronunciation: 'ˈeəpleɪn', example: 'The airplane flies high.' }
  ],
  'school-activity': [
    { word: 'homework', definition: 'school work done at home', pronunciation: 'ˈhəʊmwɜːk', example: 'I do my homework.' },
    { word: 'exam', definition: 'an important test', pronunciation: 'ɪɡˈzæm', example: 'I have a math exam.' },
    { word: 'test', definition: 'a short exam to show what you know', pronunciation: 'test', example: 'I passed the spelling test.' },
    { word: 'recess', definition: 'a break time at school to play', pronunciation: 'rɪˈses', example: 'We play games during recess.' }
  ],
  'descriptive-adjective': [
    { word: 'hot', definition: 'having a high temperature', pronunciation: 'hɒt', example: 'The sun is hot.' },
    { word: 'small', definition: 'little in size', pronunciation: 'smɔːl', example: 'The ant is small.' },
    { word: 'big', definition: 'large in size', pronunciation: 'bɪɡ', example: 'The elephant is big.' },
    { word: 'cold', definition: 'having a low temperature', pronunciation: 'kəʊld', example: 'The ice is cold.' },
    { word: 'fast', definition: 'moving quickly', pronunciation: 'fɑːst', example: 'The cheetah is very fast.' },
    { word: 'slow', definition: 'moving without much speed', pronunciation: 'sləʊ', example: 'The turtle is slow.' }
  ],
  'nature-weather': [
    { word: 'tree', definition: 'a tall plant with branches and leaves', pronunciation: 'triː', example: 'The bird is in the tree.' },
    { word: 'mountain', definition: 'a very high hill', pronunciation: 'ˈmaʊntɪn', example: 'We climb the mountain.' },
    { word: 'rain', definition: 'water that falls from clouds', pronunciation: 'reɪn', example: 'I use an umbrella in the rain.' },
    { word: 'sun', definition: 'the star that gives light and heat', pronunciation: 'sʌn', example: 'The sun is bright.' },
    { word: 'river', definition: 'a large natural stream of water', pronunciation: 'ˈrɪvə', example: 'Fish swim in the river.' }
  ],
  'general': [
    { word: 'thing', definition: 'an object', pronunciation: 'θɪŋ', example: 'What is that thing?' },
    { word: 'color', definition: 'red, blue, green, yellow, etc.', pronunciation: 'ˈkʌlə', example: 'Red is my favorite color.' },
    { word: 'number', definition: 'a word or symbol showing quantity', pronunciation: 'ˈnʌmbə', example: 'One is a number.' },
    { word: 'shape', definition: 'the form of an object', pronunciation: 'ʃeɪp', example: 'A circle is a shape.' }
  ]
};

export function getSmartDistractors(
  targetWord: VocabularyWord,
  allVocabulary: VocabularyWord[],
  count: number = 2
): VocabularyWord[] {
  const targetCategory = categorizeWord(targetWord);
  
  const requiresImage = !!targetWord.image; 

  const sameCategoryUnit = allVocabulary.filter(w =>
    w.word !== targetWord.word &&
    categorizeWord(w) === targetCategory
  );

  const result: VocabularyWord[] = [...sameCategoryUnit]
    .sort(() => Math.random() - 0.5)
    .slice(0, count);

  if (result.length >= count) return result;

  if (requiresImage) {
    const fallbackOptions = EXPEDITION_1_DISTRACTORS.filter(fw => categorizeWord(fw) === targetCategory);
    
    const safeFallbacks = fallbackOptions
      .filter(fw => fw.word.toLowerCase() !== targetWord.word.toLowerCase() && !result.some(r => r.word === fw.word))
      .sort(() => Math.random() - 0.5);

    for (const fw of safeFallbacks) {
      if (result.length >= count) break;
      result.push(fw);
    }
  } else {
    const fallbackOptions = FALLBACK_DICTIONARY[targetCategory] || FALLBACK_DICTIONARY['general'];
    
    const safeFallbacks = fallbackOptions
      .filter(fw => fw.word.toLowerCase() !== targetWord.word.toLowerCase() && !result.some(r => r.word === fw.word))
      .sort(() => Math.random() - 0.5);

    for (const fw of safeFallbacks) {
      if (result.length >= count) break;
      result.push(fw);
    }
  }

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