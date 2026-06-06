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
        text: "The alarm clock rings loudly. Ring! Ring! Ring! Fiela slowly opens her eyes. She stretches her arms and lets out a big yawn. Her room is quiet and pretty cold. It is still very early in the morning.",
        translation: "Jam beker berdering nyaring. Kring! Kring! Kring! Fiela perlahan membuka matanya. Dia merentangkan tangannya dan menguap lebar. Kamarnya sunyi dan terasa cukup dingin. Hari masih sangat pagi.",
        dialogue: [
            { speaker: "Fiela", text: "“Good morning…”", translation: "“Selamat pagi…”" },
            { speaker: "Mom", text: "“Fiela, wake up! It's time for school!”", translation: "“Fiela, bangun! Waktunya berangkat sekolah!”" },
            { speaker: "Fiela", text: "“Okay, Mom… I'm waking up.”", translation: "“Oke, Ibu... Fiela bangun.”" }
        ],
        image: "figma:asset/3c7025d3f2afa5d3da6e8a1df4d1fc22ef0ba6a5.png",
        highlightWords: ["wake up", "stretch", "yawn"],
        theme: '',
        description: ''
      },
      {
        id: 2,
        text: "Fiela walks to the bathroom. She picks up her blue toothbrush. She brushes her teeth carefully. Brush, brush, brush! Then she washes her face with cool water. It feels fresh. She dries her face with a soft towel.",
        translation: "Fiela berjalan ke kamar mandi. Dia mengambil sikat gigi birunya. Dia menyikat giginya dengan hati-hati. Sikat, sikat, sikat! Lalu dia membasuh wajahnya dengan air dingin. Terasa sangat segar. Dia mengeringkan wajahnya dengan handuk lembut.",
        dialogue: [
            { speaker: "Fiela", text: "“The water is cold!”", translation: "“Airnya dingin!”" },
            { speaker: "Mom", text: "“Don't forget your ears!”", translation: "“Jangan lupa bersihkan telingamu!”" }
        ],
        image: "https://images.unsplash.com/photo-1693692282136-2eeb24c11856?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGlsZCUyMDJydXNoaW5nJTIwdGVldGglMjBiYXRocm9vbXxlbnwxfHx8fDE3NzI0NjgzODd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        highlightWords: ["brush", "wash"],
        theme: '',
        description: ''
      },
      {
        id: 3,
        text: "After dawn prayers, Fiela steps into the shower. Warm water falls gently. She rubs soap on her arms and legs. Bubbles float in the air. She feels clean and ready for the day.",
        translation: "Setelah salat subuh, Fiela mulai mandi. Air hangat mengalir lembut. Dia menggosokkan sabun ke tangan dan kakinya. Gelembung-gelembung sabun melayang di udara. Dia merasa bersih dan siap memulai hari.",
        dialogue: [
            { speaker: "Fiela", text: "“I love bubbles!”", translation: "“Aku suka gelembung!”" }
        ],
        image: "https://images.unsplash.com/photo-1567102109796-90071d28cb38?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGlsZCUyMHNob3dlciUyMGJhdGhyb29tJTIwYnViYmxlc3xlbnwxfHx8fDE3NzI0NjgzODd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        highlightWords: ["wash"],
        theme: '',
        description: ''
      },
      {
        id: 4,
        text: "Fiela opens her wardrobe. She sees her school uniform neatly folded. She puts on her shirt, her skirt, and her white socks. Then she wears her red tie.",
        translation: "Fiela membuka lemarinya. Dia melihat seragam sekolahnya terlipat rapi. Dia memakai kemejanya, roknya, dan kaus kaki putihnya. Kemudian dia memakai dasi merahnya.",
        dialogue: [
            { speaker: "Fiela", text: "“I'm almost ready!”", translation: "“Aku hampir siap!”" },
            { speaker: "Mom", text: "“Good job! Don't forget your shoes.”", translation: "“Bagus! Jangan lupakan sepatumu.”" }
        ],
        image: "https://images.unsplash.com/photo-1576673196028-cd681592bd61?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGlsZCUyMHNjaG9vbCUyMHVuaWZvcm0lMjBkcmVzc2luZ3xlbnwxfHx8fDE3NzI0NjgzODd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        highlightWords: ["uniform", "get dressed"],
        theme: '',
        description: ''
      },
      {
        id: 5,
        text: "Fiela sits at the dining table. Her mom has prepared rice, an egg, and a glass of milk. The food smells nice and warm. Fiela takes a moment before eating. Then, Fiela eats her breakfast happily.",
        translation: "Fiela duduk di meja makan. Ibunya sudah menyiapkan nasi, telur, dan segelas susu. Makanan itu beraroma enak dan hangat. Fiela berdoa sebentar sebelum makan. Lalu, Fiela menyantap sarapannya dengan gembira.",
        dialogue: [
            { speaker: "Mom", text: "“Eat slowly.”", translation: "“Makan pelan-pelan ya.”" },
            { speaker: "Fiela", text: "“Okay, Mom. This egg is yummy!”", translation: "“Oke, Ibu. Telur ini enak sekali!”" }
        ],
        image: "https://images.unsplash.com/photo-1758874961005-9da9077cd44d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGlsZCUyMGJyZWFrZmFzdCUyMHRhYmxlJTIwZWF0aW5nfGVufDF8fHx8MTc3MjQ2ODM4N3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        highlightWords: ["breakfast"],
        theme: '',
        description: ''
      },
      {
        id: 6,
        text: "After breakfast, Fiela packs her school bag. She puts in her book, her pencil case, and her water bottle. Her bag is a little heavy, but she can carry it.",
        translation: "Setelah sarapan, Fiela membereskan tas sekolahnya. Dia memasukkan bukunya, tempat pensilnya, dan botol minumnya. Tasnya sedikit berat, tapi dia masih bisa membawanya.",
        dialogue: [
            { speaker: "Fiela", text: "“Mom, I'm ready!”", translation: "“Ibu, aku sudah siap!”" },
            { speaker: "Mom", text: "“Great! Let's go.”", translation: "“Hebat! Ayo berangkat.”" }
        ],
        image: "https://images.unsplash.com/photo-1622560482357-789dc8a50923?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGlsZCUyMHBhY2tpbmclMjBzY2hvb2wlMjBiYWNrcGFja3xlbnwxfHx8fDE3NzI0NjgzODh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        highlightWords: ["pack"],
        theme: '',
        description: ''
      },
      {
        id: 7,
        text: "Fiela walks outside. The air is fresh. Birds are singing in the trees. She sees her friend, Dira, waving from across the street. They walk together toward school.",
        translation: "Fiela berjalan ke luar. Udaranya sangat segar. Burung-burung bernyanyi di pohon. Dia melihat temannya, Dira, melambaikan tangan dari seberang jalan. Mereka pun berjalan bersama menuju sekolah.",
        dialogue: [
            { speaker: "Dira", text: "“Good morning, Fiela!”", translation: "“Selamat pagi, Fiela!”" },
            { speaker: "Fiela", text: "“Good morning! Let's walk together.”", translation: "“Selamat pagi! Ayo jalan bersama.”" }
        ],
        image: "https://images.unsplash.com/photo-1701302550962-d807b97100fa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGlsZHJlbiUyMHdhbGtpbmclMjBzY2hvb2wlMjB0b2dldGhlcnxlbnwxfHx8fDE3NzI0NjgzODh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        highlightWords: ["walk"],
        theme: '',
        description: ''
      },
      {
        id: 8,
        text: "Fiela reaches the school gate. She feels happy and ready to learn. She waves goodbye to her mom and walks into her classroom.",
        translation: "Fiela sampai di gerbang sekolah. Dia merasa senang dan siap untuk belajar. Dia melambaikan tangan pamit kepada ibunya lalu berjalan masuk ke kelas.",
        dialogue: [
            { speaker: "Mom", text: "“Have a great day!”", translation: "“Semoga harimu menyenangkan!”" },
            { speaker: "Fiela", text: "“Thank you, Mom!”", translation: "“Terima kasih, Ibu!”" }
        ],
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
        text: "It is Sunday morning. Fiela wakes up feeling happy. Today, her whole family is at home. She walks to the living room and sees her mother, father, and little sister sitting together.",
        translation: "Ini hari Minggu pagi. Fiela bangun dengan hati gembira. Hari ini, seluruh keluarganya ada di rumah. Dia berjalan ke ruang tamu dan melihat ibu, ayah, dan adik perempuannya sedang duduk bersama.",
        dialogue: [
            { speaker: "Fiela", text: "“Good morning, everyone!”", translation: "“Selamat pagi, semuanya!”" },
            { speaker: "Mother", text: "“Good morning, Fiela!”", translation: "“Selamat pagi, Fiela!”" }
        ],
        image: "https://images.unsplash.com/photo-1692188071339-2825a8a997f1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYW1pbHklMjBsaXZpbmclMjByb29tJTIwdG9nZXRoZXJ8ZW58MXx8fHwxNzcyNDY4Mzg4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        highlightWords: ["mother", "father", "sister", "living room"],
        theme: '',
        description: ''
      },
      {
        id: 2,
        text: "Fiela goes to the kitchen. Her mother is cutting vegetables. The kitchen smells delicious. Fiela puts on a small apron. She wants to help.",
        translation: "Fiela pergi ke dapur. Ibunya sedang memotong sayuran. Aroma dapur itu sangat lezat. Fiela memakai celemek kecil. Dia ingin membantu.",
        dialogue: [
            { speaker: "Fiela", text: "“Mom, let me help!”", translation: "“Ibu, biarkan aku membantu!”" },
            { speaker: "Mother", text: "“Of course! Please wash the carrots.”", translation: "“Tentu saja! Tolong cucikan wortel-wortel ini ya.”" }
        ],
        image: "https://images.unsplash.com/photo-1758874961000-d8b11690ce22?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb3RoZXIlMjBjaGlsZCUyMGNvb2tpbmclMjBraXRjaGVufGVufDF8fHx8MTc3MjQ2ODM4OXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        highlightWords: ["kitchen", "mother", "help"],
        theme: '',
        description: ''
      },
      {
        id: 3,
        text: "Fiela walks to the corner of the living room. Her father is reading the newspaper in his favorite chair. He smiles softly when he sees Fiela.",
        translation: "Fiela berjalan ke sudut ruang tamu. Ayahnya sedang membaca koran di kursi kesukaannya. Ayah tersenyum lembut saat melihat Fiela.",
        dialogue: [
            { speaker: "Father", text: "“Good morning, sweetheart.”", translation: "“Selamat pagi, anak manis.”" },
            { speaker: "Fiela", text: "“What are you reading, Dad?”", translation: "“Ayah sedang baca apa?”" },
            { speaker: "Father", text: "“Just the morning news.”", translation: "“Hanya berita pagi saja.”" }
        ],
        image: "https://images.unsplash.com/photo-1540198648122-e6daa2cf6b5e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYXRoZXIlMjByZWFkaW5nJTIwbmV3c3BhcGVyJTIwY2hhaXJ8ZW58MXx8fHwxNzcyNDY4Mzg5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        highlightWords: ["father"],
        theme: '',
        description: ''
      },
      {
        id: 4,
        text: "In the play area, Fiela's little sister, Mila, is building a tower with colorful blocks. The tower is tall and wobbly. Fiela sits beside her and helps her add another block on top.",
        translation: "Di area bermain, adik kecil Fiela, Mila, sedang membangun menara dari balok warna-warni. Menaranya tinggi dan agak bergoyang. Fiela duduk di sampingnya dan membantunya menumpuk satu balok lagi di atasnya.",
        dialogue: [
            { speaker: "Mila", text: "“Play with me!”", translation: "“Bermainlah denganku!”" },
            { speaker: "Fiela", text: "“Okay! Let's share the blocks.”", translation: "“Oke! Ayo kita bagi balok-baloknya.”" }
        ],
        image: "https://images.unsplash.com/photo-1545558014-8692077e9b5c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGlsZHJlbiUyMHBsYXlpbmclMjBibG9ja3MlMjB0b3lzfGVufDF8fHx8MTc3MjQ2ODM5MHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        highlightWords: ["sister", "play"],
        theme: '',
        description: ''
      },
      {
        id: 5,
        text: "Ding dong! The doorbell rings. Fiela runs to the door. It is her grandmother! She gives Fiela a warm hug.",
        translation: "Ting-tong! Bel pintu berbunyi. Fiela berlari ke pintu. Ternyata Neneknya! Nenek langsung memeluk Fiela dengan hangat.",
        dialogue: [
            { speaker: "Grandma", text: "“I brought some fresh fruit for you!”", translation: "“Nenek membawakan buah-buahan segar untukmu!”" },
            { speaker: "Fiela", text: "“Thank you, Grandma!”", translation: "“Terima kasih, Nenek!”" }
        ],
        image: "https://images.unsplash.com/photo-1593100126453-19b562a800c1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxncmFuZG1vdGhlciUyMGdyYW5kY2hpbGQlMjBodWdnaW5nJTIwZnJ1aXR8ZW58MXx8fHwxNzcyNDY4MzkwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        highlightWords: ["grandmother"],
        theme: '',
        description: ''
      },
      {
        id: 6,
        text: "Grandpa sits on the porch with his wooden cane. He loves telling stories from his childhood. Fiela sits close to him and listens carefully. Grandfather asks:",
        translation: "Kakek duduk di teras bersama tongkat kayunya. Dia suka bercerita tentang masa kecilnya. Fiela duduk di dekat Kakek dan mendengarkannya dengan seksama. Kakek bertanya:",
        dialogue: [
            { speaker: "Grandfather", text: "“Did I ever tell you about the mango tree?”", translation: "“Apa Kakek pernah bercerita soal pohon mangga itu padamu?”" },
            { speaker: "Fiela", text: "“No, Grandpa! Tell me!”", translation: "“Belum, Kakek! Ceritakan padaku!”" }
        ],
        image: "https://images.unsplash.com/photo-1577864071854-65cbecf58c99?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxncmFuZGZhdGhlciUyMHN0b3J5dGVsbGluZyUyMGNoaWxkJTIwcG9yY2h8ZW58MXx8fHwxNzcyNDY4MzkwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        highlightWords: ["grandfather"],
        theme: '',
        description: ''
      },
      {
        id: 7,
        text: "Mother takes out her phone. \"Let's take a family photo!\" she says. Everyone gathers in the living room. They smile brightly—click!—a beautiful picture is taken.",
        translation: "Ibu mengeluarkan ponselnya. “Ayo kita foto keluarga!” ucapnya. Semua orang berkumpul di ruang tamu. Mereka tersenyum cerah (klik!) dan sebuah foto indah pun terabadikan.",
        dialogue: [
            { speaker: "Father", text: "“One more! Say cheese!”", translation: "“Satu kali lagi! Katakan cheese!”" },
            { speaker: "Everyone", text: "“Cheese!”", translation: "“Cheese!”" }
        ],
        image: "https://images.unsplash.com/photo-1582140110185-b920b4d175f4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYW1pbHklMjBwaG90byUyMHBpY3R1cmUlMjB0b2dldGhlcnxlbnwxfHx8fDE3NzI0NjgzOTF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        highlightWords: ["photo"],
        theme: '',
        description: ''
      },
      {
        id: 8,
        text: "In the evening, the family sits together once again. They laugh, talk, and enjoy the quiet night. Fiela looks at everyone and feels warm inside. \"This is my family,\" she thinks. \"I love them so much.",
        translation: "Pada malam harinya, keluarga itu duduk bersama lagi. Mereka tertawa, mengobrol, dan menikmati malam yang tenang. Fiela memandangi semua orang dan hatinya terasa hangat. “Ini keluargaku,” pikirnya. “Aku sangat menyayangi mereka.”",
        dialogue: [
            { speaker: "Mother", text: "“Did you have a good day?”", translation: "“Apakah harimu menyenangkan?”" },
            { speaker: "Fiela", text: "“Yes, Mom. The best day!”", translation: "“Iya, Ibu. Hari yang terbaik!”" }
        ],
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
        text: "The bell rings. Ding-dong! Fiela walks into her classroom. She puts her bag beside her desk and sits on her favorite chair. The room is bright and full of colorful posters. Her friends are taking out their books.",
        translation: "Bel masuk berbunyi. Ting-tong! Fiela berjalan masuk ke kelasnya. Dia meletakkan tas di samping mejanya lalu duduk di kursi kesukaannya. Ruangan itu terang dan penuh poster warna-warni. Teman-temannya mulai mengeluarkan buku mereka.",
        dialogue: [
            { speaker: "Ms. Rani", text: "“Good morning, class!”", translation: "“Selamat pagi, anak-anak!”" },
            { speaker: "Students", text: "“Good morning, Teacher!”", translation: "“Selamat pagi, Guru!”" }
        ],
        image: "https://images.unsplash.com/photo-1761208662734-fb46f1398551?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjbGFzc3Jvb20lMjBjaGlsZHJlbiUyMGRlc2slMjBzY2hvb2x8ZW58MXx8fHwxNzcyNDY4MzkxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        highlightWords: ["desk", "chair", "book"],
        theme: '',
        description: ''
      },
      {
        id: 2,
        text: "Ms. Rani walks to the board. She picks up a blue marker. She writes the topic of the day: \"My Favorite Things\". The students listen quietly.",
        translation: "Ibu Rani berjalan ke papan tulis. Dia mengambil spidol biru. Dia menuliskan topik hari ini: “Benda-benda Kesukaanku”. Murid-murid mendengarkan dengan tenang.",
        dialogue: [
            { speaker: "Ms. Rani", text: "“Today, we learn new words. Please listen carefully.”", translation: "“Hari ini, kita akan belajar kata-kata baru. Tolong dengarkan baik-baik.”" },
            { speaker: "Fiela", text: "“I like the blue marker!”", translation: "“Aku suka spidol biru itu!”" }
        ],
        image: "https://images.unsplash.com/photo-1758685845902-acd5db1b532b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWFjaGVyJTIwd3JpdGluZyUyMHdoaXRlYm9hcmQlMjBjbGFzc3Jvb218ZW58MXx8fHwxNzcyNDY4MzkxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        highlightWords: ["board", "marker", "write", "listen"],
        theme: '',
        description: ''
      },
      {
        id: 3,
        text: "Ms. Rani shows four picture cards: a book, a pencil, an eraser, and a ruler. She holds each card high so everyone can see.",
        translation: "Ibu Rani menunjukkan empat kartu bergambar: buku, pensil, penghapus, dan penggaris. Dia mengangkat tiap kartu tinggi-tinggi agar semua orang bisa melihatnya.",
        dialogue: [
            { speaker: "Ms. Rani", text: "“Repeat after me: book.”", translation: "“Ulangi setelah Ibu: book.”" },
            { speaker: "Students", text: "“Book!”", translation: "“Book!”" },
            { speaker: "Ms. Rani", text: "“Pencil.”", translation: "“Pencil.”" },
            { speaker: "Students", text: "“Pencil!”", translation: "“Pencil!”" }
        ],
        image: "https://images.unsplash.com/photo-1755456919655-85d87c2470a7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWFjaGVyJTIwZmxhc2hjYXJkcyUyMHBpY3R1cmUlMjBjYXJkc3xlbnwxfHx8fDE3NzI0NjgzOTJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        highlightWords: ["book", "pencil", "eraser"],
        theme: '',
        description: ''
      },
      {
        id: 4,
        text: "The students work in pairs. Fiela and Dira sit together and practice asking and answering questions. They smile and help each other pronounce the words correctly.",
        translation: "Murid-murid belajar berpasangan. Fiela dan Dira duduk bersama dan berlatih tanya jawab. Mereka tersenyum dan saling membantu mengeja kata-katanya dengan benar.",
        dialogue: [
            { speaker: "Dira", text: "“What is this?”", translation: "“Benda apakah ini?”" },
            { speaker: "Fiela", text: "“It's an eraser!”", translation: "“Ini adalah penghapus!”" },
            { speaker: "Fiela", text: "“Your turn!”", translation: "“Sekarang giliranmu!”" },
            { speaker: "Dira", text: "“Okay!”", translation: "“Oke!”" }
        ],
        image: "https://images.unsplash.com/photo-1580117287456-e8e476093446?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHVkZW50cyUyMHdvcmtpbmclMjBwYWlycyUyMGNsYXNzcm9vbXxlbnwxfHx8fDE3NzI0NjgzOTJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        highlightWords: ["eraser"],
        theme: '',
        description: ''
      },
      {
        id: 5,
        text: "Suddenly, Fiela's book falls to the floor with a soft thud. She bends down to pick it up. But she doesn't understand one word on the page.",
        translation: "Tiba-tiba, buku Fiela jatuh ke lantai dengan suara berdebuk pelan. Dia membungkuk untuk mengambilnya. Tapi ada satu kata di halaman itu yang tidak dia pahami.",
        dialogue: [
            { speaker: "Fiela", text: "“Teacher, I don't understand this word.”", translation: "“Ibu Guru, aku tidak mengerti kata yang ini.”" },
            { speaker: "Ms. Rani", text: "“Let me help you, Fiela.”", translation: "“Mari Ibu bantu, Fiela.”" }
        ],
        image: "https://images.unsplash.com/photo-1530303388419-840456159b0d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGlsZCUyMHJlYWRpbmclMjBib29rJTIwY29uZnVzZWR8ZW58MXx8fHwxNzcyNDY4Mzk1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        highlightWords: ["book", "understand"],
        theme: '',
        description: ''
      },
      {
        id: 6,
        text: "Ms. Rani comes to Fiela's desk. She points at the word and shows a picture card that matches it. Her explanation is clear and simple.",
        translation: "Ibu Rani datang ke meja Fiela. Dia menunjuk kata tersebut dan menunjukkan kartu gambar yang cocok. Penjelasannya sangat jelas dan sederhana.",
        dialogue: [
            { speaker: "Ms. Rani", text: "“This word means 'clean'. Repeat after me.”", translation: "“Kata ini artinya 'bersih'. Ulangi setelah Ibu.”" },
            { speaker: "Fiela", text: "“Clean.”", translation: "“Clean.”" },
            { speaker: "Ms. Rani", text: "“Very good!”", translation: "“Bagus sekali!”" }
        ],
        image: "https://images.unsplash.com/photo-1758685733926-00cba008215b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWFjaGVyJTIwaGVscGluZyUyMHN0dWRlbnQlMjBkZXNrfGVufDF8fHx8MTc3MjM4MDMxN3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        highlightWords: ["desk"],
        theme: '',
        description: ''
      },
      {
        id: 7,
        text: "It's activity time! Ms. Rani announces: \"Find three things in the classroom!\" The students walk around excitedly.",
        translation: "Waktunya permainan! Ibu Rani berkata: “Temukan tiga benda di dalam kelas!” Murid-murid berkeliling kelas dengan penuh semangat.",
        dialogue: [
            { speaker: "Fiela", text: "“I found the clock!”", translation: "“Aku menemukan jam dinding!”" },
            { speaker: "Dira", text: "“I found a window!”", translation: "“Aku menemukan jendela!”" }
        ],
        image: "https://images.unsplash.com/photo-1761604478724-13fe879468cf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGlsZHJlbiUyMGNsYXNzcm9vbSUyMGFjdGl2aXR5JTIwbGVhcm5pbmd8ZW58MXx8fHwxNzcyNDY4Mzk2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        highlightWords: ["desk", "chair"],
        theme: '',
        description: ''
      },
      {
        id: 8,
        text: "The class is almost over. Students put away their pencils and close their books. The room becomes quiet again.",
        translation: "Kelas hampir selesai. Murid-murid merapikan pensil mereka dan menutup buku. Ruang kelas kembali menjadi tenang.",
        dialogue: [
            { speaker: "Ms. Rani", text: "“Good job today, class. See you tomorrow!”", translation: "“Kerja bagus hari ini, anak-anak. Sampai jumpa besok!”" },
            { speaker: "Students", text: "“See you, Teacher!”", translation: "“Sampai jumpa, Guru!”" }
        ],
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
        text: "It is almost lunchtime. Fiela walks into the kitchen and smells something delicious. Her stomach growls softly. She wonders what her mother is cooking today.",
        translation: "Sebentar lagi waktu makan siang. Fiela masuk ke dapur dan mencium aroma lezat. Perutnya berbunyi pelan. Dia bertanya-tanya apa yang sedang dimasak ibunya hari ini.",
        dialogue: [
            { speaker: "Fiela", text: "“Mom, what's for lunch?”", translation: "“Ibu, masak apa untuk makan siang?”" },
            { speaker: "Mother", text: "“Come and see!”", translation: "“Kemarilah dan lihat sendiri!”" }
        ],
        image: "https://images.unsplash.com/photo-1661715483461-a4cba9697e58?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxraXRjaGVuJTIwZm9vZCUyMGNvb2tpbmclMjBkZWxpY2lvdXN8ZW58MXx8fHwxNzcyNDY4Mzk3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        highlightWords: ["delicious", "cook"],
        theme: '',
        description: ''
      },
      {
        id: 2,
        text: "On the table, there are fresh vegetables, pieces of chicken, and two eggs. Mother washes the vegetables under running water. She cuts the carrots and mixes them with other ingredients.",
        translation: "Di atas meja, ada sayuran segar, potongan ayam, dan dua butir telur. Ibu mencuci sayurannya di bawah air mengalir. Dia memotong wortel dan mencampurnya dengan bahan-bahan lain.",
        dialogue: [
            { speaker: "Fiela", text: "“Can I help?”", translation: "“Bolehkah aku bantu?”" },
            { speaker: "Mother", text: "“Yes, please wash the tomatoes.”", translation: "“Boleh, tolong cucikan tomat-tomat ini ya.”" }
        ],
        image: "https://images.unsplash.com/photo-1627424496969-8d2489ef1e5a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2ZWdldGFibGVzJTIwY2hpY2tlbiUyMGVnZ3MlMjBpbmdyZWRpZW50c3xlbnwxfHx8fDE3NzI0NjgzOTd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        highlightWords: ["vegetables", "chicken", "egg"],
        theme: '',
        description: ''
      },
      {
        id: 3,
        text: "A pot of warm soup is boiling gently. Mother dips a wooden spoon and tastes it. She smiles happily.",
        translation: "Sepanci sup hangat sedang mendidih pelan. Ibu mencelupkan sendok kayu dan mencicipinya. Dia tersenyum senang.",
        dialogue: [
            { speaker: "Mother", text: "“The soup is ready. Do you want to try?”", translation: "“Supnya sudah matang. Apakah kamu mau mencoba?”" },
            { speaker: "Fiela", text: "“Yes, please!”", translation: "“Iya, mau!”" }
        ],
        image: "https://images.unsplash.com/photo-1565882916152-4e9c2cba84e9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzb3VwJTIwcG90JTIwY29va2luZyUyMHN0ZWFtaW5nfGVufDF8fHx8MTc3MjQ2ODM5N3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        highlightWords: ["soup"],
        theme: '',
        description: ''
      },
      {
        id: 4,
        text: "Lunch is ready! On the dining table, there is rice, chicken, soup, and a bowl of fresh fruit. Fiela looks at everything carefully. She wants to choose her favorite food.",
        translation: "Makan siang sudah siap! Di atas meja makan, sudah ada nasi, ayam, sup, dan semangkuk buah segar. Fiela mengamati semuanya dengan teliti. Dia ingin memilih makanan favoritnya.",
        dialogue: [
            { speaker: "Fiela", text: "“Hmm… I like chicken. It's my favorite!”", translation: "“Hmm... Aku suka ayam. Itu kesukaanku!”" },
            { speaker: "Mother", text: "“Good choice!”", translation: "“Pilihan yang bagus!”" }
        ],
        image: "https://images.unsplash.com/photo-1677921755291-c39158477b8e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdW5jaCUyMHBsYXRlJTIwcmljZSUyMGNoaWNrZW58ZW58MXx8fHwxNzcyNDY4Mzk4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        highlightWords: ["rice", "chicken", "soup", "fruit"],
        theme: '',
        description: ''
      },
      {
        id: 5,
        text: "Fiela sits with her family. They take a short moment together before eating. Then they begin their meal. Fiela eats her rice and chicken happily and drinks a glass of cool water.",
        translation: "Fiela duduk bersama keluarganya. Mereka berdoa sebentar sebelum makan. Lalu mereka mulai menyantap makanannya. Fiela memakan nasi dan ayamnya dengan lahap dan meminum segelas air dingin.",
        dialogue: [
            { speaker: "Father", text: "“How is the food?”", translation: "“Bagaimana masakannya?”" },
            { speaker: "Fiela", text: "“It's yummy!”", translation: "“Sangat enak!”" }
        ],
        image: "https://images.unsplash.com/photo-1576089073624-b5751a8f4de9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYW1pbHklMjBlYXRpbmclMjBkaW5uZXIlMjB0b2dldGhlcnxlbnwxfHx8fDE3NzI0MjAzMTZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        highlightWords: ["rice", "chicken"],
        theme: '',
        description: ''
      },
      {
        id: 6,
        text: "Next to the rice, there is a small spoon of chili sauce. Fiela looks at it curiously. Fiela touches a tiny bit with her finger. Her eyes widen. \"It's spicy!\" she laughs.",
        translation: "Di sebelah nasi, ada sesendok kecil sambal. Fiela menatapnya dengan rasa ingin tahu. Fiela menyentuhnya sedikit dengan jarinya. Matanya terbelalak. “Pedas!” dia tertawa.",
        dialogue: [
            { speaker: "Fiela", text: "“Can I try this?”", translation: "“Bolehkah aku coba yang ini?”" },
            { speaker: "Mother", text: "“Just a little. It's spicy!”", translation: "“Sedikit saja ya. Itu pedas!”" }
        ],
        image: "https://images.unsplash.com/photo-1764312194474-5996b4c1a4ff?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzcGljeSUyMGNoaWxpJTIwc2F1Y2UlMjByZWR8ZW58MXx8fHwxNzcyNDY4Mzk5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        highlightWords: ["spicy"],
        theme: '',
        description: ''
      },
      {
        id: 7,
        text: "After lunch, it's fruit time. Fiela picks a slice of mango. It is sweet and fresh. Dira calls via voice note:",
        translation: "Setelah makan siang, saatnya makan buah. Fiela mengambil sepotong mangga. Rasanya manis dan segar. Dira menelepon lewat pesan suara:",
        dialogue: [
            { speaker: "Dira", text: "“What are you eating?”", translation: "“Kamu sedang makan apa?”" },
            { speaker: "Fiela", text: "“A sweet mango!”", translation: "“Buah mangga yang manis!”" }
        ],
        image: "https://images.unsplash.com/photo-1647830168692-f85690b072bf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGlsZCUyMGVhdGluZyUyMG1hbmdvJTIwZnJ1aXR8ZW58MXx8fHwxNzcyNDY4Mzk5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        highlightWords: ["fruit", "sweet"],
        theme: '',
        description: ''
      },
      {
        id: 8,
        text: "In the afternoon, Fiela writes about her favorite food for tomorrow's class presentation. She draws a plate of chicken and rice. At the top of the card, she writes: \"My favorite food is chicken.",
        translation: "Pada sore harinya, Fiela menulis tentang makanan favoritnya untuk presentasi kelas besok. Dia menggambar sepiring ayam dan nasi. Di bagian atas kertasnya, dia menulis: “Makanan favoritku adalah ayam.”",
        dialogue: [
            { speaker: "Fiela", text: "“I love chicken. It always makes me happy.”", translation: "“Aku suka ayam. Makanan ini selalu membuatku bahagia.”" }
        ],
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
        text: "It is a sunny afternoon. Fiela looks out the window and sees the bright yard. The grass is green, and the wind is gentle. She quickly puts on her shoes.",
        translation: "Ini adalah sore yang cerah. Fiela melihat ke luar jendela dan memandangi halaman yang terang. Rumputnya hijau, dan angin bertiup lembut. Dia segera memakai sepatunya.",
        dialogue: [
            { speaker: "Fiela", text: "“Mom, can I play outside?”", translation: "“Ibu, bolehkah aku main di luar?”" },
            { speaker: "Mother", text: "“Yes, but be careful!”", translation: "“Boleh, tapi hati-hati ya!”" }
        ],
        image: "https://images.unsplash.com/photo-1625398739300-54e56f4ddcd8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGlsZCUyMGxvb2tpbmclMjB3aW5kb3clMjBzdW5ueXxlbnwxfHx8fDE3NzI0Njg0MDB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        highlightWords: ["yard", "wind"],
        theme: '',
        description: ''
      },
      {
        id: 2,
        text: "When Fiela steps outside, she sees Dira and two other friends standing near a tree. They wave excitedly when they see her.",
        translation: "Begitu Fiela keluar rumah, dia melihat Dira dan dua teman lainnya berdiri di dekat pohon. Mereka melambaikan tangan dengan semangat saat melihatnya.",
        dialogue: [
            { speaker: "Friends", text: "“Fiela! Let's play!”", translation: "“Fiela! Ayo main!”" },
            { speaker: "Fiela", text: "“Sure! Can I join?”", translation: "“Tentu! Boleh aku ikut bergabung?”" },
            { speaker: "Friends", text: "“Of course!”", translation: "“Tentu saja!”" }
        ],
        image: "https://images.unsplash.com/photo-1624623327915-f15709381438?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGlsZHJlbiUyMG1lZXRpbmclMjBmcmllbmRzJTIwb3V0c2lkZXxlbnwxfHx8fDE3NzI0Njg0MDB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        highlightWords: ["playground"],
        theme: '',
        description: ''
      },
      {
        id: 3,
        text: "The children start with a simple ball game. Fiela throws the ball to Dira. Dira catches it and kicks it gently to another friend. Everyone laughs and runs across the field.",
        translation: "Anak-anak mulai bermain bola sederhana. Fiela melempar bolanya ke Dira. Dira menangkapnya lalu menendangnya pelan ke teman yang lain. Semua orang tertawa dan berlarian di lapangan.",
        dialogue: [
            { speaker: "Fiela", text: "“Catch this!”", translation: "“Tangkap ini!”" },
            { speaker: "Dira", text: "“I got it!”", translation: "“Aku dapat!”" }
        ],
        image: "https://images.unsplash.com/photo-1608803238528-16ca3cf5c0c2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGlsZHJlbiUyMHBsYXlpbmclMjBiYWxsJTIwdGhyb3dpbmd8ZW58MXx8fHwxNzcyNDY4NDAwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        highlightWords: ["ball", "throw", "catch", "run"],
        theme: '',
        description: ''
      },
      {
        id: 4,
        text: "They move to the playground. Fiela climbs up the slide ladder. She slides down fast—whoosh! Her friends take turns on the swing.",
        translation: "Mereka pindah ke taman bermain. Fiela menaiki tangga perosotan. Dia meluncur turun dengan cepat—wusss! Teman-temannya bermain ayunan bergantian.",
        dialogue: [
            { speaker: "Fiela", text: "“It's fun!”", translation: "“Menyenangkan sekali!”" },
            { speaker: "Friend", text: "“My turn next!”", translation: "“Giliran aku selanjutnya!”" }
        ],
        image: "https://images.unsplash.com/photo-1746010531890-9b4efb2475a1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGlsZHJlbiUyMHBsYXlncm91bmQlMjBzbGlkZSUyMHN3aW5nfGVufDF8fHx8MTc3MjQ2ODQwMHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        highlightWords: ["playground", "slide", "swing"],
        theme: '',
        description: ''
      },
      {
        id: 5,
        text: "The children decide to create a small obstacle course using sticks and stones. They jump over small rocks and step carefully between the sticks. Everyone tries to finish without touching the lines.",
        translation: "Anak-anak sepakat membuat rintangan kecil menggunakan ranting dan batu. Mereka melompati batu-batu kecil dan melangkah hati-hati di antara ranting. Semua orang mencoba mencapai garis akhir tanpa menyentuh pembatas.",
        dialogue: [
            { speaker: "Dira", text: "“Be careful!”", translation: "“Hati-hati!”" },
            { speaker: "Fiela", text: "“I can do it!”", translation: "“Aku pasti bisa!”" }
        ],
        image: "https://images.unsplash.com/photo-1763639700458-38a0fd25335d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGlsZHJlbiUyMGp1bXBpbmclMjBvYnN0YWNsZSUyMGNvdXJzZXxlbnwxfHx8fDE3NzI0Njg0MDF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        highlightWords: ["jump"],
        theme: '',
        description: ''
      },
      {
        id: 6,
        text: "Suddenly, the wind blows stronger. Leaves fly around the yard like little butterflies. The children look up at the dancing branches.",
        translation: "Tiba-tiba, angin bertiup lebih kencang. Dedaunan beterbangan di sekitar halaman seperti kupu-kupu kecil. Anak-anak menengadah melihat dahan pohon yang bergoyang.",
        dialogue: [
            { speaker: "Fiela", text: "“Wow! The wind is cool!”", translation: "“Wah! Anginnya sejuk!”" },
            { speaker: "Friend", text: "“Look at the leaves!”", translation: "“Lihatlah daun-daun itu!”" }
        ],
        image: "https://images.unsplash.com/photo-1711479567494-ba14bbaedd85?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3aW5kJTIwbGVhdmVzJTIwZmx5aW5nJTIwb3V0ZG9vcnxlbnwxfHx8fDE3NzI0Njg0MDF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        highlightWords: ["wind"],
        theme: '',
        description: ''
      },
      {
        id: 7,
        text: "After running and playing, the children sit under a big tree. The shade feels cool. Fiela drinks water from her bottle. Everyone takes a slow, long breath.",
        translation: "Setelah berlarian dan bermain, anak-anak duduk di bawah pohon besar. Teduhan pohon itu terasa sejuk. Fiela meminum air dari botolnya. Semua orang menarik napas panjang pelan-pelan.",
        dialogue: [
            { speaker: "Fiela", text: "“I'm thirsty.”", translation: "“Aku haus.”" },
            { speaker: "Dira", text: "“Here, have some water.”", translation: "“Ini, minumlah sedikit air.”" }
        ],
        image: "https://images.unsplash.com/photo-1766942361035-4f3e2348bac4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGlsZHJlbiUyMHJlc3RpbmclMjB0cmVlJTIwc2hhZGV8ZW58MXx8fHwxNzcyNDY4NDAyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        highlightWords: ["run"],
        theme: '',
        description: ''
      },
      {
        id: 8,
        text: "The sun begins to set. The children stand up and wave goodbye to each other. Fiela feels tired but very happy.",
        translation: "Matahari mulai terbenam. Anak-anak berdiri dan saling melambaikan tangan untuk berpamitan. Fiela merasa lelah tapi hatinya sangat bahagia.",
        dialogue: [
            { speaker: "Friends", text: "“See you tomorrow!”", translation: "“Sampai jumpa besok!”" },
            { speaker: "Fiela", text: "“See you!”", translation: "“Sampai jumpa!”" }
        ],
        image: "https://images.unsplash.com/photo-1676082605471-ff0a7de25da5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdW5zZXQlMjBjaGlsZHJlbiUyMGdvb2RieWUlMjB3YXZpbmd8ZW58MXx8fHwxNzcyNDY4NDAyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        highlightWords: ["playground"],
        theme: '',
        description: ''
      }
    ],
    miniGame: 'fillBlank'
  }
];