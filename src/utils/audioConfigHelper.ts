/**
 * Audio Configuration Helper
 * 
 * This file helps you configure your custom audio files hosted on GitHub.
 * Your audio files are organized in your GitHub repository as:
 * - audios/welcomepage/ (for welcome page audio)
 * - audios/unit{X}/words/ (for vocabulary)
 * - audios/unit{X}/stories/ (for story scenes)
 * - audios/unit{X}/examples/ (for example sentences in dictionary popups)
 */

export interface AudioFileConfig {
  // For vocabulary words
  word?: string;
  // For story scenes
  unitId?: number;
  sceneId?: number;
  // For example sentences (optional)
  example?: string;
  
  // The path to your word audio file (Audio Kosakata)
  audioPath: string; 
  
  // TAMBAHAN BARU: The path to example audio file (Audio Kalimat)
  exampleAudioPath?: string; 
}

export const homePageAudio = {
  audioPath: 'https://raw.githubusercontent.com/olonsgallery/fiela-repository/main/audios/sound-effects/homepage-bgmusic.mp3', 
};
/**
 * =============================================================================
 * GITHUB CONFIGURATION:
 * =============================================================================
 * 
 * GitHub Username: olonsgallery
 * Repository Name: fiela-repository
 * Branch: main
 * 
 * Base URL: https://raw.githubusercontent.com/olonsgallery/fiela-repository/main
 * 
 * =============================================================================
 * YOUR ACTUAL DIRECTORY STRUCTURE:
 * =============================================================================
 * 
 * Welcome Page: audios/welcomepage/welcomepage-2.mp3
 * Stories: audios/unit{X}/stories/unit{X}-scene{Y}.mp3
 * Words: audios/unit{X}/words/{word-name}.mp3
 * Examples: audios/unit{X}/examples/{word-name}-example.mp3
 * 
 * Example paths:
 * - audios/welcomepage/welcomepage-2.mp3
 * - audios/unit1/stories/unit1-scene1.mp3
 * - audios/unit1/words/yawn.mp3
 * - audios/unit1/examples/yawn-example.mp3
 * 
 * =============================================================================
 * CONFIGURATION INSTRUCTIONS:
 * =============================================================================
 * 
 * 1. Your MP3 files are in your GitHub repository at:
 *    - audios/welcomepage/ (for welcome page audio)
 *    - audios/unit1/words/ (for Unit 1 vocabulary)
 *    - audios/unit1/stories/ (for Unit 1 story scenes)
 *    - audios/unit1/examples/ (for Unit 1 example sentences)
 *    - audios/unit2/words/ (for Unit 2 vocabulary)
 *    - audios/unit2/stories/ (for Unit 2 story scenes)
 *    - audios/unit2/examples/ (for Unit 2 example sentences)
 *    - And so on...
 * 
 * 2. All configurations are now active and ready to use!
 * 
 * 3. Make sure the file names match exactly (case-sensitive!)
 * 
 * 4. The toGitHubUrl() function automatically converts paths to full URLs:
 *    "audios/unit1/stories/unit1-scene1.mp3" becomes:
 *    "https://raw.githubusercontent.com/olonsgallery/fiela-repository/main/audios/unit1/stories/unit1-scene1.mp3"
 * 
 * =============================================================================
 */

// GitHub Base URL for audio files
const GITHUB_BASE_URL = "https://raw.githubusercontent.com/olonsgallery/fiela-repository/main";

// Helper function to convert local path to GitHub URL
function toGitHubUrl(localPath: string): string {
  return `${GITHUB_BASE_URL}/${localPath}`;
}

// WELCOME PAGE AUDIO
export const welcomePageAudio = {
  audioPath: toGitHubUrl("audios/welcomepage/welcomepage-2.mp3")
};

// UNIT 1: MY MORNING ROUTINE
const unit1Config: AudioFileConfig[] = [
  // Vocabulary Words & Examples (SUDAH DIGABUNG)
  { 
    word: "wake up", 
    example: "Fiela wakes up when the alarm clock rings.", 
    audioPath: toGitHubUrl("audios/unit1/words/wake-up.mp3"),
    exampleAudioPath: toGitHubUrl("audios/unit1/examples/wake-up-example.mp3")
  },
  { 
    word: "stretch", 
    example: "She stretches her arms in the morning.", 
    audioPath: toGitHubUrl("audios/unit1/words/stretch.mp3"),
    exampleAudioPath: toGitHubUrl("audios/unit1/examples/stretch-example.mp3")
  },
  { 
    word: "yawn", 
    example: "Fiela lets out a big yawn.", 
    audioPath: toGitHubUrl("audios/unit1/words/yawn.mp3"),
    exampleAudioPath: toGitHubUrl("audios/unit1/examples/yawn-example.mp3")
  },
  { 
    word: "brush", 
    example: "She brushes her teeth carefully.", 
    audioPath: toGitHubUrl("audios/unit1/words/brush.mp3"),
    exampleAudioPath: toGitHubUrl("audios/unit1/examples/brush-example.mp3")
  },
  { 
    word: "wash", 
    example: "Fiela washes her face with cool water.", 
    audioPath: toGitHubUrl("audios/unit1/words/wash.mp3"),
    exampleAudioPath: toGitHubUrl("audios/unit1/examples/wash-example.mp3")
  },
  { 
    word: "get dressed", 
    example: "She gets dressed in her school uniform.", 
    audioPath: toGitHubUrl("audios/unit1/words/get-dressed.mp3"),
    exampleAudioPath: toGitHubUrl("audios/unit1/examples/get-dressed-example.mp3")
  },
  { 
    word: "pack", 
    example: "Fiela packs her school bag with books.", 
    audioPath: toGitHubUrl("audios/unit1/words/pack.mp3"),
    exampleAudioPath: toGitHubUrl("audios/unit1/examples/pack-example.mp3")
  },
  { 
    word: "breakfast", 
    example: "Her breakfast includes rice, egg, and milk.", 
    audioPath: toGitHubUrl("audios/unit1/words/breakfast.mp3"),
    exampleAudioPath: toGitHubUrl("audios/unit1/examples/breakfast-example.mp3")
  },
  { 
    word: "uniform", 
    example: "Fiela wears her school uniform.", 
    audioPath: toGitHubUrl("audios/unit1/words/uniform.mp3"),
    exampleAudioPath: toGitHubUrl("audios/unit1/examples/uniform-example.mp3")
  },
  { 
    word: "walk", 
    example: "Fiela walks to school with her friend.", 
    audioPath: toGitHubUrl("audios/unit1/words/walk.mp3"),
    exampleAudioPath: toGitHubUrl("audios/unit1/examples/walk-example.mp3")
  },
  
  // Story Scenes (Biarkan sama seperti aslinya)
  { unitId: 1, sceneId: 1, audioPath: toGitHubUrl("audios/unit1/stories/unit1-scene1.mp3") },
  { unitId: 1, sceneId: 2, audioPath: toGitHubUrl("audios/unit1/stories/unit1-scene2.mp3") },
  { unitId: 1, sceneId: 3, audioPath: toGitHubUrl("audios/unit1/stories/unit1-scene3.mp3") },
  { unitId: 1, sceneId: 4, audioPath: toGitHubUrl("audios/unit1/stories/unit1-scene4.mp3") },
  { unitId: 1, sceneId: 5, audioPath: toGitHubUrl("audios/unit1/stories/unit1-scene5.mp3") },
  { unitId: 1, sceneId: 6, audioPath: toGitHubUrl("audios/unit1/stories/unit1-scene6.mp3") },
  { unitId: 1, sceneId: 7, audioPath: toGitHubUrl("audios/unit1/stories/unit1-scene7.mp3") },
  { unitId: 1, sceneId: 8, audioPath: toGitHubUrl("audios/unit1/stories/unit1-scene8.mp3") },
];

// UNIT 2: MY FAMILY
const unit2Config: AudioFileConfig[] = [
  // Vocabulary Words & Examples
  { word: "mother", example: "Fiela's mother cooks in the kitchen.", audioPath: toGitHubUrl("audios/unit2/words/mother.mp3"), exampleAudioPath: toGitHubUrl("audios/unit2/examples/mother-example.mp3") },
  { word: "father", example: "Her father reads the newspaper.", audioPath: toGitHubUrl("audios/unit2/words/father.mp3"), exampleAudioPath: toGitHubUrl("audios/unit2/examples/father-example.mp3") },
  { word: "sister", example: "Fiela plays with her little sister, Mila.", audioPath: toGitHubUrl("audios/unit2/words/sister.mp3"), exampleAudioPath: toGitHubUrl("audios/unit2/examples/sister-example.mp3") },
  { word: "grandmother", example: "Grandmother brings fresh fruit for the family.", audioPath: toGitHubUrl("audios/unit2/words/grandmother.mp3"), exampleAudioPath: toGitHubUrl("audios/unit2/examples/grandmother-example.mp3") },
  { word: "grandfather", example: "Grandfather tells interesting stories.", audioPath: toGitHubUrl("audios/unit2/words/grandfather.mp3"), exampleAudioPath: toGitHubUrl("audios/unit2/examples/grandfather-example.mp3") },
  { word: "living room", example: "The family sits together in the living room.", audioPath: toGitHubUrl("audios/unit2/words/living-room.mp3"), exampleAudioPath: toGitHubUrl("audios/unit2/examples/living-room-example.mp3") },
  { word: "kitchen", example: "Mother cooks vegetables in the kitchen.", audioPath: toGitHubUrl("audios/unit2/words/kitchen.mp3"), exampleAudioPath: toGitHubUrl("audios/unit2/examples/kitchen-example.mp3") },
  { word: "help", example: "Fiela helps her mother wash the carrots.", audioPath: toGitHubUrl("audios/unit2/words/help.mp3"), exampleAudioPath: toGitHubUrl("audios/unit2/examples/help-example.mp3") },
  { word: "play", example: "Fiela and Mila play with colorful blocks.", audioPath: toGitHubUrl("audios/unit2/words/play.mp3"), exampleAudioPath: toGitHubUrl("audios/unit2/examples/play-example.mp3") },
  { word: "photo", example: "The family takes a photo together.", audioPath: toGitHubUrl("audios/unit2/words/photo.mp3"), exampleAudioPath: toGitHubUrl("audios/unit2/examples/photo-example.mp3") },
  
  // Story Scenes
  { unitId: 2, sceneId: 1, audioPath: toGitHubUrl("audios/unit2/stories/unit2-scene1.mp3") },
  { unitId: 2, sceneId: 2, audioPath: toGitHubUrl("audios/unit2/stories/unit2-scene2.mp3") },
  { unitId: 2, sceneId: 3, audioPath: toGitHubUrl("audios/unit2/stories/unit2-scene3.mp3") },
  { unitId: 2, sceneId: 4, audioPath: toGitHubUrl("audios/unit2/stories/unit2-scene4.mp3") },
  { unitId: 2, sceneId: 5, audioPath: toGitHubUrl("audios/unit2/stories/unit2-scene5.mp3") },
  { unitId: 2, sceneId: 6, audioPath: toGitHubUrl("audios/unit2/stories/unit2-scene6.mp3") },
  { unitId: 2, sceneId: 7, audioPath: toGitHubUrl("audios/unit2/stories/unit2-scene7.mp3") },
  { unitId: 2, sceneId: 8, audioPath: toGitHubUrl("audios/unit2/stories/unit2-scene8.mp3") },
];

// UNIT 3: IN THE CLASSROOM
const unit3Config: AudioFileConfig[] = [
  // Vocabulary Words & Examples
  { word: "book", example: "Fiela reads from her book.", audioPath: toGitHubUrl("audios/unit3/words/book.mp3"), exampleAudioPath: toGitHubUrl("audios/unit3/examples/book-example.mp3") },
  { word: "pencil", example: "She writes with a pencil.", audioPath: toGitHubUrl("audios/unit3/words/pencil.mp3"), exampleAudioPath: toGitHubUrl("audios/unit3/examples/pencil-example.mp3") },
  { word: "eraser", example: "The eraser removes mistakes.", audioPath: toGitHubUrl("audios/unit3/words/eraser.mp3"), exampleAudioPath: toGitHubUrl("audios/unit3/examples/eraser-example.mp3") },
  { word: "desk", example: "Fiela sits at her desk.", audioPath: toGitHubUrl("audios/unit3/words/desk.mp3"), exampleAudioPath: toGitHubUrl("audios/unit3/examples/desk-example.mp3") },
  { word: "chair", example: "She sits on her favorite chair.", audioPath: toGitHubUrl("audios/unit3/words/chair.mp3"), exampleAudioPath: toGitHubUrl("audios/unit3/examples/chair-example.mp3") },
  { word: "board", example: "The teacher writes on the board.", audioPath: toGitHubUrl("audios/unit3/words/board.mp3"), exampleAudioPath: toGitHubUrl("audios/unit3/examples/board-example.mp3") },
  { word: "marker", example: "She uses a blue marker.", audioPath: toGitHubUrl("audios/unit3/words/marker.mp3"), exampleAudioPath: toGitHubUrl("audios/unit3/examples/marker-example.mp3") },
  { word: "write", example: "Students write in their notebooks.", audioPath: toGitHubUrl("audios/unit3/words/write.mp3"), exampleAudioPath: toGitHubUrl("audios/unit3/examples/write-example.mp3") },
  { word: "listen", example: "The students listen quietly.", audioPath: toGitHubUrl("audios/unit3/words/listen.mp3"), exampleAudioPath: toGitHubUrl("audios/unit3/examples/listen-example.mp3") },
  { word: "understand", example: "Fiela understands the new words.", audioPath: toGitHubUrl("audios/unit3/words/understand.mp3"), exampleAudioPath: toGitHubUrl("audios/unit3/examples/understand-example.mp3") },
  
  // Story Scenes
  { unitId: 3, sceneId: 1, audioPath: toGitHubUrl("audios/unit3/stories/unit3-scene1.mp3") },
  { unitId: 3, sceneId: 2, audioPath: toGitHubUrl("audios/unit3/stories/unit3-scene2.mp3") },
  { unitId: 3, sceneId: 3, audioPath: toGitHubUrl("audios/unit3/stories/unit3-scene3.mp3") },
  { unitId: 3, sceneId: 4, audioPath: toGitHubUrl("audios/unit3/stories/unit3-scene4.mp3") },
  { unitId: 3, sceneId: 5, audioPath: toGitHubUrl("audios/unit3/stories/unit3-scene5.mp3") },
  { unitId: 3, sceneId: 6, audioPath: toGitHubUrl("audios/unit3/stories/unit3-scene6.mp3") },
  { unitId: 3, sceneId: 7, audioPath: toGitHubUrl("audios/unit3/stories/unit3-scene7.mp3") },
  { unitId: 3, sceneId: 8, audioPath: toGitHubUrl("audios/unit3/stories/unit3-scene8.mp3") },
];

// UNIT 4: MY FAVORITE FOOD
const unit4Config: AudioFileConfig[] = [
  // Vocabulary Words & Examples
  { word: "rice", example: "Fiela eats rice for lunch.", audioPath: toGitHubUrl("audios/unit4/words/rice.mp3"), exampleAudioPath: toGitHubUrl("audios/unit4/examples/rice-example.mp3") },
  { word: "chicken", example: "Fried chicken is Fiela's favorite.", audioPath: toGitHubUrl("audios/unit4/words/chicken.mp3"), exampleAudioPath: toGitHubUrl("audios/unit4/examples/chicken-example.mp3") },
  { word: "vegetables", example: "Mother cuts fresh vegetables.", audioPath: toGitHubUrl("audios/unit4/words/vegetables.mp3"), exampleAudioPath: toGitHubUrl("audios/unit4/examples/vegetables-example.mp3") },
  { word: "egg", example: "There are two eggs on the table.", audioPath: toGitHubUrl("audios/unit4/words/egg.mp3"), exampleAudioPath: toGitHubUrl("audios/unit4/examples/egg-example.mp3") },
  { word: "soup", example: "The soup is warm and delicious.", audioPath: toGitHubUrl("audios/unit4/words/soup.mp3"), exampleAudioPath: toGitHubUrl("audios/unit4/examples/soup-example.mp3") },
  { word: "fruit", example: "Fiela eats fresh fruit.", audioPath: toGitHubUrl("audios/unit4/words/fruit.mp3"), exampleAudioPath: toGitHubUrl("audios/unit4/examples/fruit-example.mp3") },
  { word: "delicious", example: "The food smells delicious.", audioPath: toGitHubUrl("audios/unit4/words/delicious.mp3"), exampleAudioPath: toGitHubUrl("audios/unit4/examples/delicious-example.mp3") },
  { word: "cook", example: "Mother cooks lunch in the kitchen.", audioPath: toGitHubUrl("audios/unit4/words/cook.mp3"), exampleAudioPath: toGitHubUrl("audios/unit4/examples/cook-example.mp3") },
  { word: "spicy", example: "The chili sauce is very spicy.", audioPath: toGitHubUrl("audios/unit4/words/spicy.mp3"), exampleAudioPath: toGitHubUrl("audios/unit4/examples/spicy-example.mp3") },
  { word: "sweet", example: "The mango is sweet and fresh.", audioPath: toGitHubUrl("audios/unit4/words/sweet.mp3"), exampleAudioPath: toGitHubUrl("audios/unit4/examples/sweet-example.mp3") },
  
  // Story Scenes
  { unitId: 4, sceneId: 1, audioPath: toGitHubUrl("audios/unit4/stories/unit4-scene1.mp3") },
  { unitId: 4, sceneId: 2, audioPath: toGitHubUrl("audios/unit4/stories/unit4-scene2.mp3") },
  { unitId: 4, sceneId: 3, audioPath: toGitHubUrl("audios/unit4/stories/unit4-scene3.mp3") },
  { unitId: 4, sceneId: 4, audioPath: toGitHubUrl("audios/unit4/stories/unit4-scene4.mp3") },
  { unitId: 4, sceneId: 5, audioPath: toGitHubUrl("audios/unit4/stories/unit4-scene5.mp3") },
  { unitId: 4, sceneId: 6, audioPath: toGitHubUrl("audios/unit4/stories/unit4-scene6.mp3") },
  { unitId: 4, sceneId: 7, audioPath: toGitHubUrl("audios/unit4/stories/unit4-scene7.mp3") },
  { unitId: 4, sceneId: 8, audioPath: toGitHubUrl("audios/unit4/stories/unit4-scene8.mp3") },
];

// UNIT 5: LET'S PLAY OUTSIDE
const unit5Config: AudioFileConfig[] = [
  // Vocabulary Words & Examples
  { word: "yard", example: "Fiela plays in the yard.", audioPath: toGitHubUrl("audios/unit5/words/yard.mp3"), exampleAudioPath: toGitHubUrl("audios/unit5/examples/yard-example.mp3") },
  { word: "playground", example: "They move to the playground.", audioPath: toGitHubUrl("audios/unit5/words/playground.mp3"), exampleAudioPath: toGitHubUrl("audios/unit5/examples/playground-example.mp3") },
  { word: "slide", example: "Fiela slides down fast.", audioPath: toGitHubUrl("audios/unit5/words/slide.mp3"), exampleAudioPath: toGitHubUrl("audios/unit5/examples/slide-example.mp3") },
  { word: "swing", example: "Her friends take turns on the swing.", audioPath: toGitHubUrl("audios/unit5/words/swing.mp3"), exampleAudioPath: toGitHubUrl("audios/unit5/examples/swing-example.mp3") },
  { word: "ball", example: "Fiela throws the ball to Dira.", audioPath: toGitHubUrl("audios/unit5/words/ball.mp3"), exampleAudioPath: toGitHubUrl("audios/unit5/examples/ball-example.mp3") },
  { word: "run", example: "Everyone laughs and runs across the field.", audioPath: toGitHubUrl("audios/unit5/words/run.mp3"), exampleAudioPath: toGitHubUrl("audios/unit5/examples/run-example.mp3") },
  { word: "jump", example: "They jump over small rocks.", audioPath: toGitHubUrl("audios/unit5/words/jump.mp3"), exampleAudioPath: toGitHubUrl("audios/unit5/examples/jump-example.mp3") },
  { word: "throw", example: "Fiela throws the ball to her friend.", audioPath: toGitHubUrl("audios/unit5/words/throw.mp3"), exampleAudioPath: toGitHubUrl("audios/unit5/examples/throw-example.mp3") },
  { word: "catch", example: "Dira catches the ball.", audioPath: toGitHubUrl("audios/unit5/words/catch.mp3"), exampleAudioPath: toGitHubUrl("audios/unit5/examples/catch-example.mp3") },
  { word: "wind", example: "The wind blows strongly.", audioPath: toGitHubUrl("audios/unit5/words/wind.mp3"), exampleAudioPath: toGitHubUrl("audios/unit5/examples/wind-example.mp3") },
  
  // Story Scenes
  { unitId: 5, sceneId: 1, audioPath: toGitHubUrl("audios/unit5/stories/unit5-scene1.mp3") },
  { unitId: 5, sceneId: 2, audioPath: toGitHubUrl("audios/unit5/stories/unit5-scene2.mp3") },
  { unitId: 5, sceneId: 3, audioPath: toGitHubUrl("audios/unit5/stories/unit5-scene3.mp3") },
  { unitId: 5, sceneId: 4, audioPath: toGitHubUrl("audios/unit5/stories/unit5-scene4.mp3") },
  { unitId: 5, sceneId: 5, audioPath: toGitHubUrl("audios/unit5/stories/unit5-scene5.mp3") },
  { unitId: 5, sceneId: 6, audioPath: toGitHubUrl("audios/unit5/stories/unit5-scene6.mp3") },
  { unitId: 5, sceneId: 7, audioPath: toGitHubUrl("audios/unit5/stories/unit5-scene7.mp3") },
  { unitId: 5, sceneId: 8, audioPath: toGitHubUrl("audios/unit5/stories/unit5-scene8.mp3") },
];

/**
 * Export all configurations combined
 */
export const allAudioConfigs: AudioFileConfig[] = [
  ...unit1Config,
  ...unit2Config,
  ...unit3Config,
  ...unit4Config,
  ...unit5Config,
];

/**
 * Helper function to generate the configuration text
 * You can use this to quickly see what you need to configure
 */
export function generateConfigTemplate(unitId?: number) {
  const units = [
    {
      id: 1,
      name: "My Morning Routine",
      words: ["wake up", "stretch", "yawn", "brush", "wash", "get dressed", "pack", "breakfast", "uniform", "walk"]
    },
    {
      id: 2,
      name: "My Family",
      words: ["mother", "father", "sister", "grandmother", "grandfather", "living room", "kitchen", "help", "play", "photo"]
    },
    {
      id: 3,
      name: "In the Classroom",
      words: ["book", "pencil", "eraser", "desk", "chair", "board", "marker", "write", "listen", "understand"]
    },
    {
      id: 4,
      name: "My Favorite Food",
      words: ["rice", "chicken", "vegetables", "egg", "soup", "fruit", "delicious", "cook", "spicy", "sweet"]
    },
    {
      id: 5,
      name: "Let's Play Outside",
      words: ["yard", "playground", "slide", "swing", "ball", "run", "jump", "throw", "catch", "wind"]
    }
  ];

  const targetUnits = unitId ? units.filter(u => u.id === unitId) : units;
  
  let template = "";
  
  targetUnits.forEach(unit => {
    template += `\n// UNIT ${unit.id}: ${unit.name.toUpperCase()}\n`;
    template += "// Vocabulary:\n";
    unit.words.forEach(word => {
      const filename = word.toLowerCase().replace(/ /g, '-');
      template += `// { word: "${word}", audioPath: toGitHubUrl("audios/unit${unit.id}/words/${filename}.mp3") },\n`;
    });
    template += "\n// Story Scenes:\n";
    for (let i = 1; i <= 8; i++) {
      template += `// { unitId: ${unit.id}, sceneId: ${i}, audioPath: toGitHubUrl("audios/unit${unit.id}/stories/unit${unit.id}-scene${i}.mp3") },\n`;
    }
    template += "\n";
  });
  
  return template;
}

/**
 * Get statistics about configured audio
 */
export function getAudioStats() {
  const words = allAudioConfigs.filter(c => c.word).length;
  const scenes = allAudioConfigs.filter(c => c.unitId && c.sceneId).length;
  
  return {
    totalWords: words,
    totalScenes: scenes,
    totalFiles: words + scenes,
    wordPercentage: Math.round((words / 50) * 100),
    scenePercentage: Math.round((scenes / 40) * 100),
  };
}