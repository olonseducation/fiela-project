/**
 * Homophones mapping for speech recognition
 * Maps words to their homophones (words that sound the same but are spelled differently)
 */

export const homophones: { [key: string]: string[] } = {
  // Classroom & School vocabulary
  'board': ['bored'],
  'bored': ['board'],
  'write': ['right', 'rite', 'wright'],
  'right': ['write', 'rite', 'wright'],
  'read': ['red', 'reed'],
  'red': ['read'],
  
  // Common words
  'hear': ['here'],
  'here': ['hear'],
  'see': ['sea'],
  'sea': ['see'],
  'meet': ['meat'],
  'meat': ['meet'],
  'week': ['weak'],
  'weak': ['week'],
  'break': ['brake'],
  'brake': ['break'],
  'buy': ['by', 'bye'],
  'by': ['buy', 'bye'],
  'bye': ['buy', 'by'],
  'for': ['four', 'fore'],
  'four': ['for', 'fore'],
  'hour': ['our'],
  'our': ['hour'],
  'know': ['no'],
  'no': ['know'],
  'new': ['knew'],
  'knew': ['new'],
  'one': ['won'],
  'won': ['one'],
  'son': ['sun'],
  'sun': ['son'],
  'their': ['there', "they're"],
  'there': ['their', "they're"],
  "they're": ['their', 'there'],
  'to': ['too', 'two'],
  'too': ['to', 'two'],
  'two': ['to', 'too'],
  'wear': ['where', 'ware'],
  'where': ['wear', 'ware'],
  'weather': ['whether'],
  'whether': ['weather'],
  'which': ['witch'],
  'witch': ['which'],
  'wood': ['would'],
  'would': ['wood'],
  'your': ["you're"],
  "you're": ['your'],
  
  // Food & eating
  'ate': ['eight'],
  'eight': ['ate'],
  'flour': ['flower'],
  'flower': ['flour'],
  'pair': ['pear', 'pare'],
  'pear': ['pair', 'pare'],
  'peace': ['piece'],
  'piece': ['peace'],
  
  // Nature & animals
  'deer': ['dear'],
  'dear': ['deer'],
  'bear': ['bare'],
  'bare': ['bear'],
  'tail': ['tale'],
  'tale': ['tail'],
  
  // Time & measurement
  'wait': ['weight'],
  'weight': ['wait'],
  'whole': ['hole'],
  'hole': ['whole'],
  'knight': ['night'],
  'night': ['knight'],
  'sail': ['sale'],
  'sale': ['sail'],
  
  // Actions
  'heal': ['heel'],
  'heel': ['heal'],
  'loan': ['lone'],
  'lone': ['loan'],
  'made': ['maid'],
  'maid': ['made'],
  'pale': ['pail'],
  'pail': ['pale'],
  'plain': ['plane'],
  'plane': ['plain'],
  'rain': ['reign', 'rein'],
  'reign': ['rain', 'rein'],
  'rein': ['rain', 'reign'],
  'role': ['roll'],
  'roll': ['role'],
  'seem': ['seam'],
  'seam': ['seem'],
  'soar': ['sore'],
  'sore': ['soar'],
  'stair': ['stare'],
  'stare': ['stair'],
  'steal': ['steel'],
  'steel': ['steal'],
  'threw': ['through'],
  'through': ['threw'],
  'throne': ['thrown'],
  'thrown': ['throne'],
  'tied': ['tide'],
  'tide': ['tied'],
  'vain': ['vane', 'vein'],
  'vane': ['vain', 'vein'],
  'vein': ['vain', 'vane'],
  'waste': ['waist'],
  'waist': ['waste']
};

/**
 * Gets all acceptable variations of a word including homophones
 */
export function getAcceptableVariations(word: string): string[] {
  const normalized = word.toLowerCase().trim();
  const variations = [normalized];
  
  // Add homophones if they exist
  if (homophones[normalized]) {
    variations.push(...homophones[normalized]);
  }
  
  return variations;
}

/**
 * Checks if spoken text matches the target word, including homophones
 */
export function matchesWord(spokenText: string, targetWord: string): boolean {
  const normalizedSpoken = spokenText.toLowerCase().trim();
  const acceptableVariations = getAcceptableVariations(targetWord);
  
  // Check if any variation is found in the spoken text
  return acceptableVariations.some(variation => {
    // Check for exact match or if the word is contained (for phrases)
    return normalizedSpoken === variation || 
           normalizedSpoken.includes(variation) ||
           normalizedSpoken.includes(` ${variation} `) ||
           normalizedSpoken.startsWith(`${variation} `) ||
           normalizedSpoken.endsWith(` ${variation}`);
  });
}
