import type { Unit } from '../types';

export const units: Unit[] = [
  {
    id: 1,
    title: "My Morning Routine",
    theme: "Starting Your Day",
    description: "Follow Fiela's morning routine from waking up to going to school!",
    vocabulary: [
      {
        word: "wake up",
        pronunciation: "weɪk ʌp",
        definition: "To stop sleeping and open your eyes",
        example: "Fiela wakes up when the alarm clock rings.",
        image: "https://raw.githubusercontent.com/olonsgallery/fiela-repository/main/images/unit1/minigame/wake-up.jpeg"
      },
      {
        word: "stretch",
        pronunciation: "stretʃ",
        definition: "To extend your arms or body",
        example: "She stretches her arms in the morning.",
        image: "https://raw.githubusercontent.com/olonsgallery/fiela-repository/main/images/unit1/minigame/stretch.jpeg"
      },
      {
        word: "yawn",
        pronunciation: "jɔːn",
        definition: "To open your mouth wide when you are tired",
        example: "Fiela lets out a big yawn.",
        image: "https://raw.githubusercontent.com/olonsgallery/fiela-repository/main/images/unit1/minigame/yawn.jpeg"
      },
      {
        word: "brush",
        pronunciation: "brʌʃ",
        definition: "To clean your teeth with a toothbrush",
        example: "She brushes her teeth carefully.",
        image: "https://raw.githubusercontent.com/olonsgallery/fiela-repository/main/images/unit1/minigame/brush.jpeg"
      },
      {
        word: "wash",
        pronunciation: "wɑːʃ",
        definition: "To clean something with water",
        example: "Fiela washes her face with cool water.",
        image: "https://raw.githubusercontent.com/olonsgallery/fiela-repository/main/images/unit1/minigame/wash.jpeg"
      },
      {
        word: "get dressed",
        pronunciation: "ɡet drest",
        definition: "To put on your clothes",
        example: "She gets dressed in her school uniform.",
        image: "https://raw.githubusercontent.com/olonsgallery/fiela-repository/main/images/unit1/minigame/get-dressed.jpeg"
      },
      {
        word: "pack",
        pronunciation: "pæk",
        definition: "To put things into a bag",
        example: "Fiela packs her school bag with books.",
        image: "https://raw.githubusercontent.com/olonsgallery/fiela-repository/main/images/unit1/minigame/pack.jpeg"
      },
      {
        word: "breakfast",
        pronunciation: "ˈbrekfəst",
        definition: "The first meal of the day",
        example: "Her breakfast includes rice, egg, and milk.",
        image: "https://raw.githubusercontent.com/olonsgallery/fiela-repository/main/images/unit1/minigame/breakfast.jpeg"
      },
      {
        word: "uniform",
        pronunciation: "ˈjuːnɪfɔːrm",
        definition: "Special clothes for school",
        example: "Fiela wears her school uniform.",
        image: "https://raw.githubusercontent.com/olonsgallery/fiela-repository/main/images/unit1/minigame/uniform.jpeg"
      },
      {
        word: "walk",
        pronunciation: "wɔːk",
        definition: "To move by putting one foot in front of the other",
        example: "Fiela walks to school with her friend.",
        image: "https://raw.githubusercontent.com/olonsgallery/fiela-repository/main/images/unit1/minigame/walk.jpeg"
      }
    ],
    story: [
      {
        id: 1,
        text: "The alarm clock rings loudly. Ring! Ring! Ring! Fiela slowly opens her eyes. She stretches her arms and lets out a big yawn. Her room is bright and warm. The sun is shining through the window. She whispers softly, \"Good morning…\" Mom calls: \"Fiela, wake up! It's time for school!\" Fiela replies: \"Okay, Mom… I'm waking up.\"",
        image: "figma:asset/3c7025d3f2afa5d3da6e8a1df4d1fc22ef0ba6a5.png",
        highlightWords: ["wake up", "stretch", "yawn"],
        theme: '',
        description: ''
      },
      {
        id: 2,
        text: "Fiela walks to the bathroom. She picks up her blue toothbrush. She brushes her teeth carefully. Brush, brush, brush! Then she washes her face with cool water. It feels fresh. She dries her face with a soft towel. Fiela says: \"The water is cold!\" Mom calls from outside: \"Don't forget your ears!\"",
        image: "https://images.unsplash.com/photo-1693692282136-2eeb24c11856?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGlsZCUyMGJydXNoaW5nJTIwdGVldGglMjBiYXRocm9vbXxlbnwxfHx8fDE3NzI0NjgzODd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        highlightWords: ["brush", "wash"],
        theme: '',
        description: ''
      },
      {
        id: 3,
        text: "After dawn prayers, Fiela steps into the shower. Warm water falls gently. She rubs soap on her arms and legs. Bubbles float in the air. She feels clean and ready for the day. Fiela smiles: \"I love bubbles!\"",
        image: "https://images.unsplash.com/photo-1567102109796-90071d28cb38?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGlsZCUyMHNob3dlciUyMGJhdGhyb29tJTIwYnViYmxlc3xlbnwxfHx8fDE3NzI0NjgzODd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        highlightWords: ["wash"],
        theme: '',
        description: ''
      },
      {
        id: 4,
        text: "Fiela opens her wardrobe. She sees her school uniform neatly folded. She puts on her shirt, her skirt, and her white socks. Then she wears her red tie. Fiela announces: \"I'm almost ready!\" Mom responds: \"Good job! Don't forget your shoes.\"",
        image: "https://images.unsplash.com/photo-1576673196028-cd681592bd61?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGlsZCUyMHNjaG9vbCUyMHVuaWZvcm0lMjBkcmVzc2luZ3xlbnwxfHx8fDE3NzI0NjgzODd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        highlightWords: ["uniform", "get dressed"],
        theme: '',
        description: ''
      },
      {
        id: 5,
        text: "Fiela sits at the dining table. Her mom has prepared rice, an egg, and a glass of milk. The food smells nice and warm. Fiela takes a moment before eating. Then, Fiela eats her breakfast happily. Mom says: \"Eat slowly.\" Fiela replies: \"Okay, Mom. This egg is yummy!\"",
        image: "https://images.unsplash.com/photo-1758874961005-9da9077cd44d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGlsZCUyMGJyZWFrZmFzdCUyMHRhYmxlJTIwZWF0aW5nfGVufDF8fHx8MTc3MjQ2ODM4N3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        highlightWords: ["breakfast"],
        theme: '',
        description: ''
      },
      {
        id: 6,
        text: "After breakfast, Fiela packs her school bag. She puts in her book, her pencil case, and her water bottle. Her bag is a little heavy, but she can carry it. Fiela announces: \"Mom, I'm ready!\" Mom responds: \"Great! Let's go.\"",
        image: "https://images.unsplash.com/photo-1622560482357-789dc8a50923?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGlsZCUyMHBhY2tpbmclMjBzY2hvb2wlMjBiYWNrcGFja3xlbnwxfHx8fDE3NzI0NjgzODh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        highlightWords: ["pack"],
        theme: '',
        description: ''
      },
      {
        id: 7,
        text: "Fiela walks outside. The air is fresh. Birds are singing in the trees. She sees her friend, Dira, waving from across the street. They walk together toward school. Dira greets: \"Good morning, Fiela!\" Fiela responds: \"Good morning! Let's walk together.\"",
        image: "https://images.unsplash.com/photo-1701302550962-d807b97100fa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGlsZHJlbiUyMHdhbGtpbmclMjBzY2hvb2wlMjB0b2dldGhlcnxlbnwxfHx8fDE3NzI0NjgzODh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        highlightWords: ["walk"],
        theme: '',
        description: ''
      },
      {
        id: 8,
        text: "Fiela reaches the school gate. She feels happy and ready to learn. She waves goodbye to her mom and walks into her classroom. Mom says: \"Have a great day!\" Fiela replies: \"Thank you, Mom!\"",
        image: "https://images.unsplash.com/photo-1770996870183-97b943ab7e8d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzY2hvb2wlMjBnYXRlJTIwZW50cmFuY2UlMjBjaGlsZHJlbnxlbnwxfHx8fDE3NzI0NjgzODh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        highlightWords: ["walk"],
        theme: '',
        description: ''
      }
    ],
    miniGame: 'matching'
  },
  {
    id: 2,
    title: "My Family",
    theme: "Family Members",
    description: "Meet Fiela's family members and learn about family relationships!",
    vocabulary: [
      {
        word: "mother",
        pronunciation: "ˈmʌðər",
        definition: "A female parent",
        example: "Fiela's mother cooks in the kitchen."
      },
      {
        word: "father",
        pronunciation: "ˈfɑːðər",
        definition: "A male parent",
        example: "Her father reads the newspaper."
      },
      {
        word: "sister",
        pronunciation: "ˈsɪstər",
        definition: "A girl who has the same parents as you",
        example: "Fiela plays with her little sister, Mila."
      },
      {
        word: "grandmother",
        pronunciation: "ˈɡrænmʌðər",
        definition: "Your mother's or father's mother",
        example: "Grandmother brings fresh fruit for the family."
      },
      {
        word: "grandfather",
        pronunciation: "ˈɡrænfɑːðər",
        definition: "Your mother's or father's father",
        example: "Grandfather tells interesting stories."
      },
      {
        word: "living room",
        pronunciation: "ˈlɪvɪŋ ruːm",
        definition: "A room in a house where the family relaxes",
        example: "The family sits together in the living room."
      },
      {
        word: "kitchen",
        pronunciation: "ˈkɪtʃən",
        definition: "A room where food is prepared",
        example: "Mother cooks vegetables in the kitchen."
      },
      {
        word: "help",
        pronunciation: "help",
        definition: "To make something easier for someone",
        example: "Fiela helps her mother wash the carrots."
      },
      {
        word: "play",
        pronunciation: "pleɪ",
        definition: "To do something for fun",
        example: "Fiela and Mila play with colorful blocks."
      },
      {
        word: "photo",
        pronunciation: "ˈfoʊtoʊ",
        definition: "A picture taken with a camera",
        example: "The family takes a photo together."
      }
    ],
    story: [
      {
        id: 1,
        text: "It is Sunday morning. Fiela wakes up feeling happy. Today, her whole family is at home. She walks to the living room and sees her mother, father, and little sister sitting together. Fiela greets: \"Good morning, everyone!\" Mother responds: \"Good morning, Fiela!\"",
        image: "https://images.unsplash.com/photo-1692188071339-2825a8a997f1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYW1pbHklMjBsaXZpbmclMjByb29tJTIwdG9nZXRoZXJ8ZW58MXx8fHwxNzcyNDY4Mzg4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        highlightWords: ["mother", "father", "sister", "living room"],
        theme: '',
        description: ''
      },
      {
        id: 2,
        text: "Fiela goes to the kitchen. Her mother is cutting vegetables. The kitchen smells delicious. Fiela puts on a small apron. She wants to help. Fiela offers: \"Mom, let me help!\" Mother accepts: \"Of course! Please wash the carrots.\"",
        image: "https://images.unsplash.com/photo-1758874961000-d8b11690ce22?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb3RoZXIlMjBjaGlsZCUyMGNvb2tpbmclMjBraXRjaGVufGVufDF8fHx8MTc3MjQ2ODM4OXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        highlightWords: ["kitchen", "mother", "help"],
        theme: '',
        description: ''
      },
      {
        id: 3,
        text: "Fiela walks to the corner of the living room. Her father is reading the newspaper in his favorite chair. He smiles softly when he sees Fiela. Father greets: \"Good morning, sweetheart.\" Fiela asks: \"What are you reading, Dad?\" Father replies: \"Just the morning news.\"",
        image: "https://images.unsplash.com/photo-1540198648122-e6daa2cf6b5e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYXRoZXIlMjByZWFkaW5nJTIwbmV3c3BhcGVyJTIwY2hhaXJ8ZW58MXx8fHwxNzcyNDY4Mzg5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        highlightWords: ["father"],
        theme: '',
        description: ''
      },
      {
        id: 4,
        text: "In the play area, Fiela's little sister, Mila, is building a tower with colorful blocks. The tower is tall and wobbly. Fiela sits beside her and helps her add another block on top. Mila says: \"Play with me!\" Fiela agrees: \"Okay! Let's share the blocks.\"",
        image: "https://images.unsplash.com/photo-1545558014-8692077e9b5c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGlsZHJlbiUyMHBsYXlpbmclMjBibG9ja3MlMjB0b3lzfGVufDF8fHx8MTc3MjQ2ODM5MHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        highlightWords: ["sister", "play"],
        theme: '',
        description: ''
      },
      {
        id: 5,
        text: "Ding dong! The doorbell rings. Fiela runs to the door. It is her grandmother! She gives Fiela a warm hug. Grandma announces: \"I brought some fresh fruit for you!\" Fiela responds: \"Thank you, Grandma!\"",
        image: "https://images.unsplash.com/photo-1593100126453-19b562a800c1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxncmFuZG1vdGhlciUyMGdyYW5kY2hpbGQlMjBodWdnaW5nJTIwZnJ1aXR8ZW58MXx8fHwxNzcyNDY4MzkwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        highlightWords: ["grandmother"],
        theme: '',
        description: ''
      },
      {
        id: 6,
        text: "Grandpa sits on the porch with his wooden cane. He loves telling stories from his childhood. Fiela sits close to him and listens carefully. Grandfather asks: \"Did I ever tell you about the mango tree?\" Fiela replies excitedly: \"No, Grandpa! Tell me!\"",
        image: "https://images.unsplash.com/photo-1577864071854-65cbecf58c99?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxncmFuZGZhdGhlciUyMHN0b3J5dGVsbGluZyUyMGNoaWxkJTIwcG9yY2h8ZW58MXx8fHwxNzcyNDY4MzkwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        highlightWords: ["grandfather"],
        theme: '',
        description: ''
      },
      {
        id: 7,
        text: "Mother takes out her phone. \"Let's take a family photo!\" she says. Everyone gathers in the living room. They smile brightly—click!—a beautiful picture is taken. Father says: \"One more! Say cheese!\" Everyone shouts: \"Cheese!\"",
        image: "https://images.unsplash.com/photo-1582140110185-b920b4d175f4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYW1pbHklMjBwaG90byUyMHBpY3R1cmUlMjB0b2dldGhlcnxlbnwxfHx8fDE3NzI0NjgzOTF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        highlightWords: ["photo"],
        theme: '',
        description: ''
      },
      {
        id: 8,
        text: "In the evening, the family sits together once again. They laugh, talk, and enjoy the quiet night. Fiela looks at everyone and feels warm inside. \"This is my family,\" she thinks. \"I love them so much.\" Mother asks: \"Did you have a good day?\" Fiela responds: \"Yes, Mom. The best day!\"",
        image: "https://images.unsplash.com/photo-1758687125679-d000e186e09b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYW1pbHklMjBldmVuaW5nJTIwcmVsYXhpbmclMjBob21lfGVufDF8fHx8MTc3MjQ2ODM5MXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        highlightWords: ["mother", "father", "sister"],
        theme: '',
        description: ''
      }
    ],
    miniGame: 'fillBlank'
  },
  {
    id: 3,
    title: "In the Classroom",
    theme: "School Objects & Actions",
    description: "Learn about classroom objects and activities with Fiela and her classmates!",
    vocabulary: [
      {
        word: "book",
        pronunciation: "bʊk",
        definition: "Printed pages bound together for reading",
        example: "Fiela reads from her book."
      },
      {
        word: "pencil",
        pronunciation: "ˈpensəl",
        definition: "A tool for writing or drawing",
        example: "She writes with a pencil."
      },
      {
        word: "eraser",
        pronunciation: "ɪˈreɪsər",
        definition: "A tool to remove pencil marks",
        example: "The eraser removes mistakes."
      },
      {
        word: "desk",
        pronunciation: "desk",
        definition: "A table where students work",
        example: "Fiela sits at her desk."
      },
      {
        word: "chair",
        pronunciation: "tʃer",
        definition: "A seat with a back",
        example: "She sits on her favorite chair."
      },
      {
        word: "board",
        pronunciation: "bɔːrd",
        definition: "A surface for writing in front of the class",
        example: "The teacher writes on the board."
      },
      {
        word: "marker",
        pronunciation: "ˈmɑːrkər",
        definition: "A pen with a thick tip",
        example: "She uses a blue marker."
      },
      {
        word: "write",
        pronunciation: "raɪt",
        definition: "To form letters or words",
        example: "Students write in their notebooks."
      },
      {
        word: "listen",
        pronunciation: "ˈlɪsən",
        definition: "To pay attention to sounds",
        example: "The students listen quietly."
      },
      {
        word: "understand",
        pronunciation: "ˌʌndərˈstænd",
        definition: "To know the meaning of something",
        example: "Fiela understands the new words."
      }
    ],
    story: [
      {
        id: 1,
        text: "The bell rings. Ding-dong! Fiela walks into her classroom. She puts her bag beside her desk and sits on her favorite chair. The room is bright and full of colorful posters. Her friends are taking out their books. Teacher Ms. Rani greets: \"Good morning, class!\" Students respond: \"Good morning, Teacher!\"",
        image: "https://images.unsplash.com/photo-1761208662734-fb46f1398551?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjbGFzc3Jvb20lMjBjaGlsZHJlbiUyMGRlc2slMjBzY2hvb2x8ZW58MXx8fHwxNzcyNDY4MzkxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        highlightWords: ["desk", "chair", "book"],
        theme: '',
        description: ''
      },
      {
        id: 2,
        text: "Ms. Rani walks to the board. She picks up a blue marker. She writes the topic of the day: \"My Favorite Things\". The students listen quietly. Teacher explains: \"Today, we learn new words. Please listen carefully.\" Fiela whispers to Dira: \"I like the blue marker!\"",
        image: "https://images.unsplash.com/photo-1758685845902-acd5db1b532b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWFjaGVyJTIwd3JpdGluZyUyMHdoaXRlYm9hcmQlMjBjbGFzc3Jvb218ZW58MXx8fHwxNzcyNDY4MzkxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        highlightWords: ["board", "marker", "write", "listen"],
        theme: '',
        description: ''
      },
      {
        id: 3,
        text: "Ms. Rani shows four picture cards: a book, a pencil, an eraser, and a ruler. She holds each card high so everyone can see. Teacher instructs: \"Repeat after me: book.\" Students repeat: \"Book!\" Teacher continues: \"Pencil.\" Students respond: \"Pencil!\"",
        image: "https://images.unsplash.com/photo-1755456919655-85d87c2470a7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWFjaGVyJTIwZmxhc2hjYXJkcyUyMHBpY3R1cmUlMjBjYXJkc3xlbnwxfHx8fDE3NzI0NjgzOTJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        highlightWords: ["book", "pencil", "eraser"],
        theme: '',
        description: ''
      },
      {
        id: 4,
        text: "The students work in pairs. Fiela and Dira sit together and practice asking and answering questions. They smile and help each other pronounce the words correctly. Dira asks: \"What is this?\" Fiela answers: \"It's an eraser!\" Fiela says: \"Your turn!\" Dira agrees: \"Okay!\"",
        image: "https://images.unsplash.com/photo-1580117287456-e8e476093446?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHVkZW50cyUyMHdvcmtpbmclMjBwYWlycyUyMGNsYXNzcm9vbXxlbnwxfHx8fDE3NzI0NjgzOTJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        highlightWords: ["eraser"],
        theme: '',
        description: ''
      },
      {
        id: 5,
        text: "Suddenly, Fiela's book falls to the floor with a soft thud. She bends down to pick it up. But she doesn't understand one word on the page. Fiela asks: \"Teacher, I don't understand this word.\" Teacher responds: \"Let me help you, Fiela.\"",
        image: "https://images.unsplash.com/photo-1530303388419-840456159b0d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGlsZCUyMHJlYWRpbmclMjBib29rJTIwY29uZnVzZWR8ZW58MXx8fHwxNzcyNDY4Mzk1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        highlightWords: ["book", "understand"],
        theme: '',
        description: ''
      },
      {
        id: 6,
        text: "Ms. Rani comes to Fiela's desk. She points at the word and shows a picture card that matches it. Her explanation is clear and simple. Teacher explains: \"This word means 'clean'. Repeat after me.\" Fiela repeats: \"Clean.\" Teacher praises: \"Very good!\"",
        image: "https://images.unsplash.com/photo-1758685733926-00cba008215b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWFjaGVyJTIwaGVscGluZyUyMHN0dWRlbnQlMjBkZXNrfGVufDF8fHx8MTc3MjM4MDMxN3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        highlightWords: ["desk"],
        theme: '',
        description: ''
      },
      {
        id: 7,
        text: "It's activity time! Ms. Rani announces: \"Find three things in the classroom!\" The students walk around excitedly. Fiela exclaims: \"I found the clock!\" Dira responds: \"I found a window!\"",
        image: "https://images.unsplash.com/photo-1761604478724-13fe879468cf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGlsZHJlbiUyMGNsYXNzcm9vbSUyMGFjdGl2aXR5JTIwbGVhcm5pbmd8ZW58MXx8fHwxNzcyNDY4Mzk2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        highlightWords: ["desk", "chair"],
        theme: '',
        description: ''
      },
      {
        id: 8,
        text: "The class is almost over. Students put away their pencils and close their books. The room becomes quiet again. Teacher says: \"Good job today, class. See you tomorrow!\" Students respond: \"See you, Teacher!\"",
        image: "https://images.unsplash.com/photo-1771765812031-22653b4c70a6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGlsZHJlbiUyMGNsYXNzcm9vbSUyMG9yZ2FuaXppbmclMjBib29rc3xlbnwxfHx8fDE3NzI0NjgzOTZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        highlightWords: ["pencil", "book"],
        theme: '',
        description: ''
      }
    ],
    miniGame: 'quiz'
  },
  {
    id: 4,
    title: "My Favorite Food",
    theme: "Food & Cooking",
    description: "Discover delicious foods and learn about cooking with Fiela!",
    vocabulary: [
      {
        word: "rice",
        pronunciation: "raɪs",
        definition: "Small white or brown grains used as food",
        example: "Fiela eats rice for lunch."
      },
      {
        word: "chicken",
        pronunciation: "ˈtʃɪkɪn",
        definition: "A bird that people eat as food",
        example: "Fried chicken is Fiela's favorite."
      },
      {
        word: "vegetables",
        pronunciation: "ˈvedʒtəbəlz",
        definition: "Plants that we eat",
        example: "Mother cuts fresh vegetables."
      },
      {
        word: "egg",
        pronunciation: "eɡ",
        definition: "An oval object from a chicken",
        example: "There are two eggs on the table."
      },
      {
        word: "soup",
        pronunciation: "suːp",
        definition: "Hot liquid food",
        example: "The soup is warm and delicious."
      },
      {
        word: "fruit",
        pronunciation: "fruːt",
        definition: "Sweet food that grows on trees",
        example: "Fiela eats fresh fruit."
      },
      {
        word: "delicious",
        pronunciation: "dɪˈlɪʃəs",
        definition: "Very tasty and enjoyable to eat",
        example: "The food smells delicious."
      },
      {
        word: "cook",
        pronunciation: "kʊk",
        definition: "To prepare food by heating it",
        example: "Mother cooks lunch in the kitchen."
      },
      {
        word: "spicy",
        pronunciation: "ˈspaɪsi",
        definition: "Having a strong hot taste",
        example: "The chili sauce is very spicy."
      },
      {
        word: "sweet",
        pronunciation: "swiːt",
        definition: "Having a taste like sugar",
        example: "The mango is sweet and fresh."
      }
    ],
    story: [
      {
        id: 1,
        text: "It is almost lunchtime. Fiela walks into the kitchen and smells something delicious. Her stomach growls softly. She wonders what her mother is cooking today. Fiela asks: \"Mom, what's for lunch?\" Mother responds: \"Come and see!\"",
        image: "https://images.unsplash.com/photo-1661715483461-a4cba9697e58?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxraXRjaGVuJTIwZm9vZCUyMGNvb2tpbmclMjBkZWxpY2lvdXN8ZW58MXx8fHwxNzcyNDY4Mzk3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        highlightWords: ["delicious", "cook"],
        theme: '',
        description: ''
      },
      {
        id: 2,
        text: "On the table, there are fresh vegetables, pieces of chicken, and two eggs. Mother washes the vegetables under running water. She cuts the carrots and mixes them with other ingredients. Fiela offers: \"Can I help?\" Mother accepts: \"Yes, please wash the tomatoes.\"",
        image: "https://images.unsplash.com/photo-1627424496969-8d2489ef1e5a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2ZWdldGFibGVzJTIwY2hpY2tlbiUyMGVnZ3MlMjBpbmdyZWRpZW50c3xlbnwxfHx8fDE3NzI0NjgzOTd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        highlightWords: ["vegetables", "chicken", "egg"],
        theme: '',
        description: ''
      },
      {
        id: 3,
        text: "A pot of warm soup is boiling gently. Mother dips a wooden spoon and tastes it. She smiles happily. Mother asks: \"The soup is ready. Do you want to try?\" Fiela responds: \"Yes, please!\"",
        image: "https://images.unsplash.com/photo-1565882916152-4e9c2cba84e9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzb3VwJTIwcG90JTIwY29va2luZyUyMHN0ZWFtaW5nfGVufDF8fHx8MTc3MjQ2ODM5N3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        highlightWords: ["soup"],
        theme: '',
        description: ''
      },
      {
        id: 4,
        text: "Lunch is ready! On the dining table, there is rice, chicken, soup, and a bowl of fresh fruit. Fiela looks at everything carefully. She wants to choose her favorite food. Fiela decides: \"Hmm… I like chicken. It's my favorite!\" Mother replies: \"Good choice!\"",
        image: "https://images.unsplash.com/photo-1677921755291-c39158477b8e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdW5jaCUyMHBsYXRlJTIwcmljZSUyMGNoaWNrZW58ZW58MXx8fHwxNzcyNDY4Mzk4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        highlightWords: ["rice", "chicken", "soup", "fruit"],
        theme: '',
        description: ''
      },
      {
        id: 5,
        text: "Fiela sits with her family. They take a short moment together before eating. Then they begin their meal. Fiela eats her rice and chicken happily and drinks a glass of cool water. Father asks: \"How is the food?\" Fiela responds: \"It's yummy!\"",
        image: "https://images.unsplash.com/photo-1576089073624-b5751a8f4de9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYW1pbHklMjBlYXRpbmclMjBkaW5uZXIlMjB0b2dldGhlcnxlbnwxfHx8fDE3NzI0MjAzMTZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        highlightWords: ["rice", "chicken"],
        theme: '',
        description: ''
      },
      {
        id: 6,
        text: "Next to the rice, there is a small spoon of chili sauce. Fiela looks at it curiously. Fiela asks: \"Can I try this?\" Mother warns: \"Just a little. It's spicy!\" Fiela touches a tiny bit with her finger. Her eyes widen. \"It's spicy!\" she laughs.",
        image: "https://images.unsplash.com/photo-1764312194474-5996b4c1a4ff?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzcGljeSUyMGNoaWxpJTIwc2F1Y2UlMjByZWR8ZW58MXx8fHwxNzcyNDY4Mzk5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        highlightWords: ["spicy"],
        theme: '',
        description: ''
      },
      {
        id: 7,
        text: "After lunch, it's fruit time. Fiela picks a slice of mango. It is sweet and fresh. Dira calls via voice note: \"What are you eating?\" Fiela responds: \"A sweet mango!\"",
        image: "https://images.unsplash.com/photo-1647830168692-f85690b072bf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGlsZCUyMGVhdGluZyUyMG1hbmdvJTIwZnJ1aXR8ZW58MXx8fHwxNzcyNDY4Mzk5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        highlightWords: ["fruit", "sweet"],
        theme: '',
        description: ''
      },
      {
        id: 8,
        text: "In the afternoon, Fiela writes about her favorite food for tomorrow's class presentation. She draws a plate of chicken and rice. At the top of the card, she writes: \"My favorite food is chicken.\" Fiela thinks: \"I love chicken. It always makes me happy.\"",
        image: "https://images.unsplash.com/photo-1610500796951-dea9be78d987?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGlsZCUyMGRyYXdpbmclMjB3cml0aW5nJTIwZmF2b3JpdGV8ZW58MXx8fHwxNzcyNDY4Mzk5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        highlightWords: ["chicken", "rice"],
        theme: '',
        description: ''
      }
    ],
    miniGame: 'matching'
  },
  {
    id: 5,
    title: "Let's Play Outside",
    theme: "Outdoor Activities",
    description: "Join Fiela and her friends for fun outdoor activities!",
    vocabulary: [
      {
        word: "yard",
        pronunciation: "jɑːrd",
        definition: "An outdoor area next to a house",
        example: "Fiela plays in the yard."
      },
      {
        word: "playground",
        pronunciation: "ˈpleɪɡraʊnd",
        definition: "An outdoor area where children play",
        example: "They move to the playground."
      },
      {
        word: "slide",
        pronunciation: "slaɪd",
        definition: "A smooth surface for sliding down",
        example: "Fiela slides down fast."
      },
      {
        word: "swing",
        pronunciation: "swɪŋ",
        definition: "A seat hanging from ropes or chains",
        example: "Her friends take turns on the swing."
      },
      {
        word: "ball",
        pronunciation: "bɔːl",
        definition: "A round object used in games",
        example: "Fiela throws the ball to Dira."
      },
      {
        word: "run",
        pronunciation: "rʌn",
        definition: "To move very fast on foot",
        example: "Everyone laughs and runs across the field."
      },
      {
        word: "jump",
        pronunciation: "dʒʌmp",
        definition: "To push yourself off the ground",
        example: "They jump over small rocks."
      },
      {
        word: "throw",
        pronunciation: "θroʊ",
        definition: "To make something fly through the air",
        example: "Fiela throws the ball to her friend."
      },
      {
        word: "catch",
        pronunciation: "kætʃ",
        definition: "To grab something that is flying",
        example: "Dira catches the ball."
      },
      {
        word: "wind",
        pronunciation: "wɪnd",
        definition: "Moving air outside",
        example: "The wind blows strongly."
      }
    ],
    story: [
      {
        id: 1,
        text: "It is a sunny afternoon. Fiela looks out the window and sees the bright yard. The grass is green, and the wind is gentle. She quickly puts on her shoes. Fiela asks: \"Mom, can I play outside?\" Mother responds: \"Yes, but be careful!\"",
        image: "https://images.unsplash.com/photo-1625398739300-54e56f4ddcd8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGlsZCUyMGxvb2tpbmclMjB3aW5kb3clMjBzdW5ueXxlbnwxfHx8fDE3NzI0Njg0MDB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        highlightWords: ["yard", "wind"],
        theme: '',
        description: ''
      },
      {
        id: 2,
        text: "When Fiela steps outside, she sees Dira and two other friends standing near a tree. They wave excitedly when they see her. Friends call: \"Fiela! Let's play!\" Fiela asks: \"Sure! Can I join?\" Friends respond: \"Of course!\"",
        image: "https://images.unsplash.com/photo-1624623327915-f15709381438?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGlsZHJlbiUyMG1lZXRpbmclMjBmcmllbmRzJTIwb3V0c2lkZXxlbnwxfHx8fDE3NzI0Njg0MDB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        highlightWords: ["playground"],
        theme: '',
        description: ''
      },
      {
        id: 3,
        text: "The children start with a simple ball game. Fiela throws the ball to Dira. Dira catches it and kicks it gently to another friend. Everyone laughs and runs across the field. Fiela shouts: \"Catch this!\" Dira responds: \"I got it!\"",
        image: "https://images.unsplash.com/photo-1608803238528-16ca3cf5c0c2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGlsZHJlbiUyMHBsYXlpbmclMjBiYWxsJTIwdGhyb3dpbmd8ZW58MXx8fHwxNzcyNDY4NDAwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        highlightWords: ["ball", "throw", "catch", "run"],
        theme: '',
        description: ''
      },
      {
        id: 4,
        text: "They move to the playground. Fiela climbs up the slide ladder. She slides down fast—whoosh! Her friends take turns on the swing. Fiela exclaims: \"It's fun!\" Friend says: \"My turn next!\"",
        image: "https://images.unsplash.com/photo-1746010531890-9b4efb2475a1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGlsZHJlbiUyMHBsYXlncm91bmQlMjBzbGlkZSUyMHN3aW5nfGVufDF8fHx8MTc3MjQ2ODQwMHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        highlightWords: ["playground", "slide", "swing"],
        theme: '',
        description: ''
      },
      {
        id: 5,
        text: "The children decide to create a small obstacle course using sticks and stones. They jump over small rocks and step carefully between the sticks. Everyone tries to finish without touching the lines. Dira warns: \"Be careful!\" Fiela responds: \"I can do it!\"",
        image: "https://images.unsplash.com/photo-1763639700458-38a0fd25335d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGlsZHJlbiUyMGp1bXBpbmclMjBvYnN0YWNsZSUyMGNvdXJzZXxlbnwxfHx8fDE3NzI0Njg0MDF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        highlightWords: ["jump"],
        theme: '',
        description: ''
      },
      {
        id: 6,
        text: "Suddenly, the wind blows stronger. Leaves fly around the yard like little butterflies. The children look up at the dancing branches. Fiela exclaims: \"Wow! The wind is cool!\" Friend adds: \"Look at the leaves!\"",
        image: "https://images.unsplash.com/photo-1711479567494-ba14bbaedd85?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3aW5kJTIwbGVhdmVzJTIwZmx5aW5nJTIwb3V0ZG9vcnxlbnwxfHx8fDE3NzI0Njg0MDF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        highlightWords: ["wind"],
        theme: '',
        description: ''
      },
      {
        id: 7,
        text: "After running and playing, the children sit under a big tree. The shade feels cool. Fiela drinks water from her bottle. Everyone takes a slow, long breath. Fiela says: \"I'm thirsty.\" Dira offers: \"Here, have some water.\"",
        image: "https://images.unsplash.com/photo-1766942361035-4f3e2348bac4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGlsZHJlbiUyMHJlc3RpbmclMjB0cmVlJTIwc2hhZGV8ZW58MXx8fHwxNzcyNDY4NDAyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        highlightWords: ["run"],
        theme: '',
        description: ''
      },
      {
        id: 8,
        text: "The sun begins to set. The children stand up and wave goodbye to each other. Fiela feels tired but very happy. Friends say: \"See you tomorrow!\" Fiela responds: \"See you!\"",
        image: "https://images.unsplash.com/photo-1676082605471-ff0a7de25da5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdW5zZXQlMjBjaGlsZHJlbiUyMGdvb2RieWUlMjB3YXZpbmd8ZW58MXx8fHwxNzcyNDY4NDAyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        highlightWords: ["playground"],
        theme: '',
        description: ''
      }
    ],
    miniGame: 'fillBlank'
  }
];