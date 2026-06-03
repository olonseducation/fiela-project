/**
 * Homophones mapping for speech recognition
 * Maps words to their homophones (words that sound the same but are spelled differently)
 */
// Daftar toleransi tebakan mesin ASR (Fuzzy Matching)
// Disesuaikan untuk aksen ESL (English as a Second Language) anak-anak Indonesia

export const homophoneMap: Record<string, string[]> = {
  // === EXPEDITION 1: MORNING ROUTINE ===
  "wake up": ["makeup", "way cup", "wait up", "weigh cup", "we cup", "week up", "backup"],
  "stretch": ["straight", "stress", "threads", "threats", "stray", "scratch", "shreds", "street"],
  "yawn": ["young", "yon", "yond", "yuan", "john", "yarn", "you on", "yol", "yo", "down"],
  "brush": ["brass", "bras", "blush", "bra", "bros", "brash", "bus", "blast"],
  "wash": ["was", "wass", "watch", "ways", "worse", "wall"],
  "get": ["gate", "cat", "gut", "that", "gab", "gap"],
  "dressed": ["dress", "rest", "press", "tress", "trace", "dash"],
  "get dressed": ["get dress", "cat dress", "gate rest", "get rest"], // Tambahan jaga-jaga
  "pack": ["back", "peck", "peg", "bag", "pact", "pet", "park"],
  "breakfast": ["break fast", "break first", "big fast", "black fast", "bed fast"],
  "uniform": ["unicorn", "uni form", "you need form", "in a form"],
  "walk": ["work", "wok", "woke", "wall", "wolf", "war"],

  // === EXPEDITION 2: FAMILY & HOME ===
  "mother": ["murder", "madder", "matter", "motor", "moder", "model", "water"],
  "father": ["further", "fader", "feather", "vater", "powder", "fat her", "water"],
  "sister": ["cister", "siter", "sea star", "see star", "she star", "easter"],
  "grandmother": ["grand mother", "grandma", "grant mother", "ground mother"],
  "grandfather": ["grand father", "grandpa", "grant father", "ground father"],
  "living": ["leaving", "leafing", "lifting", "lipping"],
  "room": ["rum", "run", "roam", "boom", "broom", "zoom"],
  "living room": ["leaving room", "leafing rum", "living run"], // Tambahan jaga-jaga
  "kitchen": ["chicken", "catch in", "catching", "kitten", "teach in"],
  "help": ["held", "hell", "half", "hope", "health", "how", "have", "alp", "hoop", "halp", "elf"],
  "play": ["clay", "pray", "place", "plane", "pay", "fly"],
  "photo": ["poto", "potato", "auto", "moto", "vote", "foto"],

  // === EXPEDITION 3: CLASSROOM ===
  "book": ["bug", "buck", "bog", "pook", "box", "boat", "boo"],
  "pencil": ["cancel", "pan seal", "pen seal", "basal", "pen still"],
  "eraser": ["razor", "a razor", "iriser", "laser", "race her", "erase her"],
  "desk": ["disc", "disk", "dash", "test", "text", "days", "dance", "this"],
  "chair": ["share", "cheer", "care", "tear", "there", "cherry"],
  "board": ["bored", "boat", "bird", "bot", "bold", "bought", "boy"],
  "marker": ["maker", "market", "mark her", "macaw", "macaque"],
  "write": ["right", "ride", "light", "white", "rat", "rate"],
  "listen": ["lesson", "lessen", "listing", "lisa", "recent"],
  "understand": ["under stand", "under star", "understand", "on the stand", "and the stand"],

  // === EXPEDITION 4: FOOD ===
  "rice": ["rise", "price", "race", "right", "lies", "slice", "ice", "eyes"],
  "chicken": ["kitchen", "checking", "thick in", "ticket"],
  "vegetables": ["vegetable", "tables", "festival", "page table", "fake table"],
  "egg": ["a", "eight", "ed", "edge", "act", "ache", "ig", "ech", "at", "x", "age"],
  "soup": ["shop", "soap", "sub", "shoe", "show", "sup"],
  "fruit": ["fluid", "food", "flute", "flood", "root", "foot"],
  "delicious": ["deletions", "the licious", "delish", "the dishes"],
  "cook": ["cock", "coke", "clock", "look", "good", "cup", "book"],
  "spicy": ["spacey", "species", "pie sea", "spy see", "icy"],
  "sweet": ["sweat", "suite", "swish", "swede", "weed", "swim"],

  // === EXPEDITION 5: OUTDOORS ===
  "yard": ["yet", "yart", "yacht", "hard", "yarn", "art", "guard"],
  "playground": ["play ground", "play crown", "background", "play around"],
  "slide": ["light", "slight", "slice", "fly", "sleigh", "flight"],
  "swing": ["swim", "sweet", "swink", "wing", "sing", "string"],
  "ball": ["bowl", "bold", "bull", "bow", "boy", "fall", "wall", "call"],
  "run": ["ram", "ran", "rum", "wrong", "rang", "round"],
  "jump": ["jam", "dump", "champ", "trump", "chum", "job", "dumb"],
  "throw": ["through", "draw", "true", "grow", "row", "slow", "trough"],
  "catch": ["cat", "cash", "cut", "cats", "ketch", "sketch", "kept"],
  "wind": ["win", "weed", "wing", "went", "when", "wimp", "wait"]

};

  // ... (Biarkan fungsi matchesWord tetap sama seperti yang kita buat sebelumnya)
  
export function matchesWord(spokenText: string, targetWord: string): boolean {
  // 1. Bersihkan teks (huruf kecil semua, hilangkan spasi berlebih dan tanda baca)
  const spoken = spokenText.toLowerCase().replace(/[.,?!]/g, '').trim();
  const target = targetWord.toLowerCase().trim();

  // 2. Jika tebakan mesin 100% sempurna
  if (spoken === target) return true;

  // 3. Jika anak mengucapkan dalam kalimat (misal mesin menangkap "a egg" atau "help me")
  if (spoken.includes(target)) return true;

  // 4. JARING PENYELAMAT (FUZZY MATCHING)
  // Ambil daftar kata yang dimaafkan untuk kata target ini
  const allowedVariations = homophoneMap[target] || [];
  
  // Cek apakah tebakan mesin (atau salah satu kata yang diucapkan) ada di daftar maaf
  const spokenWords = spoken.split(' ');
  for (const word of spokenWords) {
    if (allowedVariations.includes(word)) {
      return true; // Lulus!
    }
  }

  // Jika tetap tidak ada yang cocok, berarti pelafalannya memang masih terlalu jauh
  return false;
}
