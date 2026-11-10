/**
 * Speak Up: Listening and Speaking Exercises (CEFR A1)
 * Complete 12 Units Dataset — Synchronized 100% with the Official 29-Page Curriculum Document
 * Version: 1.6.0
 */

window.SPEAKUP_UNITS = [
  // =========================================================================
  // UNIT 1: Ben's Daily Routine
  // =========================================================================
  {
    id: 1,
    title: "Unit 1: Ben's Daily Routine",
    titleTh: "บทที่ 1: กิจวัตรประจำวันของ Ben",
    themeIcon: "☀️",
    learningGoals: [
      "Understand a short story about daily routines.",
      "Identify details about times and daily activities.",
      "Talk about their own daily routines using simple sentences."
    ],
    vocabulary: [
      { word: "get up", meaning: "ลุกจากเตียง", example: "I get up at seven." },
      { word: "brush", meaning: "แปรง", example: "I brush my teeth." },
      { word: "teeth", meaning: "ฟัน", example: "I brush my teeth." },
      { word: "get dressed", meaning: "แต่งตัว", example: "I get dressed quickly." },
      { word: "have breakfast", meaning: "รับประทานอาหารเช้า", example: "I have breakfast at seven." },
      { word: "family", meaning: "ครอบครัว", example: "I eat with my family." },
      { word: "go to school", meaning: "ไปโรงเรียน", example: "I go to school at eight." },
      { word: "after school", meaning: "หลังเลิกเรียน", example: "I play after school." },
      { word: "homework", meaning: "การบ้าน", example: "I do my homework." },
      { word: "go to bed", meaning: "เข้านอน", example: "I go to bed at nine." }
    ],
    activity1: {
      type: "story",
      heading: "Listen to the Story",
      headingTh: "ฟังเรื่องของ Ben โดยยังไม่เห็นบทอ่าน (ฟังจบแล้วกดปุ่มเพื่อแสดงเนื้อหา)",
      title: "Ben's Daily Routine",
      passage: "My name is Ben. I get up at seven o'clock every morning. I brush my teeth and get dressed. Then I have breakfast with my family. I go to school at eight o'clock. After school, I do my homework and watch TV. I go to bed at nine thirty.",
      phrases: [
        "My name is Ben.",
        "I get up at seven o'clock every morning.",
        "I brush my teeth and get dressed.",
        "Then I have breakfast with my family.",
        "I go to school at eight o'clock.",
        "After school, I do my homework and watch TV.",
        "I go to bed at nine thirty."
      ]
    },
    activity2: [
      {
        question: "What is the story mainly about?",
        options: ["a) Ben's school", "b) Ben's daily routine", "c) Ben's family"],
        answerIndex: 1
      },
      {
        question: "What does Ben do before breakfast?",
        options: ["a) He watches TV.", "b) He does his homework.", "c) He brushes his teeth and gets dressed."],
        answerIndex: 2
      },
      {
        question: "What does Ben do after school?",
        options: ["a) He does his homework and watches TV.", "b) He has breakfast.", "c) He goes to bed."],
        answerIndex: 0
      }
    ],
    activity3: [
      {
        sentence: "1. Ben gets up at ___ o'clock.",
        options: ["a) six", "b) seven", "c) eight"],
        answerIndex: 1
      },
      {
        sentence: "2. He brushes his ___.",
        options: ["a) hair", "b) hands", "c) teeth"],
        answerIndex: 2
      },
      {
        sentence: "3. He has breakfast with his ___.",
        options: ["a) family", "b) friends", "c) teachers"],
        answerIndex: 0
      },
      {
        sentence: "4. He goes to school at ___ o'clock.",
        options: ["a) seven", "b) eight", "c) nine"],
        answerIndex: 1
      },
      {
        sentence: "5. He goes to bed at ___.",
        options: ["a) nine thirty", "b) eight thirty", "c) ten thirty"],
        answerIndex: 0
      }
    ],
    activity4: {
      partATitle: "Part A: Listen and Repeat",
      partAInstruction: "Listen and repeat the sentences.",
      partA: [
        "I get up at seven o'clock.",
        "I brush my teeth.",
        "I have breakfast with my family.",
        "I go to school at eight o'clock.",
        "I go to bed at nine thirty."
      ],
      partB: {
        title: "Part B: Talk About Yourself",
        instruction: "Listen to the questions and sample answers then give your own answers.",
        items: [
          {
            question: "What time do you get up?",
            sample: "I get up at 6 o'clock.",
            keywords: ["get up", "wake up", "at", "o'clock", "six", "seven", "five", "eight", "morning"]
          },
          {
            question: "What time do you get to school?",
            sample: "I get to school at 7.30.",
            keywords: ["get", "go", "school", "work", "at", "seven", "eight", "thirty"]
          },
          {
            question: "What do you do after school?",
            sample: "I do my homework after school.",
            keywords: ["after school", "homework", "play", "watch", "read", "games", "sport"]
          },
          {
            question: "What do you do before going to bed?",
            sample: "I take a shower.",
            keywords: ["take", "shower", "brush", "teeth", "read", "watch", "pray", "sleep", "bed"]
          }
        ]
      }
    }
  },

  // =========================================================================
  // UNIT 2: Meeting a New Friend
  // =========================================================================
  {
    id: 2,
    title: "Unit 2: Meeting a New Friend",
    titleTh: "บทที่ 2: การพบเพื่อนใหม่",
    themeIcon: "🤝",
    learningGoals: [
      "Understand a simple conversation between two new friends.",
      "Identify details about names, ages, and classes.",
      "Introduce themselves and ask simple questions about others."
    ],
    vocabulary: [
      { word: "friend", meaning: "เพื่อน", example: "She is my new friend." },
      { word: "meet", meaning: "พบ / รู้จัก", example: "Nice to meet you." },
      { word: "name", meaning: "ชื่อ", example: "My name is Emma." },
      { word: "old", meaning: "อายุ (ใช้ถามอายุ)", example: "How old are you?" },
      { word: "class", meaning: "ชั้นเรียน / ห้องเรียน", example: "I'm in Class 1." },
      { word: "What's your name?", meaning: "คุณชื่ออะไร", example: "What's your name?" },
      { word: "Nice to meet you.", meaning: "ยินดีที่ได้รู้จัก", example: "Nice to meet you, Jack." },
      { word: "How about you?", meaning: "แล้วคุณล่ะ", example: "I'm twelve. How about you?" },
      { word: "How old are you?", meaning: "คุณอายุเท่าไร", example: "How old are you?" },
      { word: "Let's be friends.", meaning: "มาเป็นเพื่อนกันเถอะ", example: "Let's be friends!" }
    ],
    activity1: {
      type: "conversation",
      heading: "Listen to the Conversation",
      headingTh: "ฟังบทสนทนาระหว่าง Jack (เสียงชาย) และ Emma (เสียงหญิง)",
      title: "Meeting a New Friend",
      passage: "Emma: Hi! My name is Emma. What's your name?\nJack: Hello, Emma. I'm Jack. Nice to meet you.\nEmma: Nice to meet you, too. How old are you?\nJack: I'm thirteen. How about you?\nEmma: I'm twelve. Are you in class 1?\nJack: Yes, I am. What about you?\nEmma: Me, too! Let's be friends.\nJack: Great!",
      phrases: [
        "Emma: Hi! My name is Emma. What's your name?",
        "Jack: Hello, Emma. I'm Jack. Nice to meet you.",
        "Emma: Nice to meet you, too. How old are you?",
        "Jack: I'm thirteen. How about you?",
        "Emma: I'm twelve. Are you in class 1?",
        "Jack: Yes, I am. What about you?",
        "Emma: Me, too! Let's be friends.",
        "Jack: Great!"
      ]
    },
    activity2: [
      {
        question: "What are Emma and Jack doing?",
        options: ["a) Meeting for the first time.", "b) Playing a sport.", "c) Doing homework."],
        answerIndex: 0
      },
      {
        question: "Where are they most likely talking?",
        options: ["a) At a restaurant.", "b) At school.", "c) At a hospital."],
        answerIndex: 1
      },
      {
        question: "What do Emma and Jack have in common?",
        options: ["a) They are both thirteen.", "b) They are in the same class.", "c) They are brother and sister."],
        answerIndex: 1
      }
    ],
    activity3: [
      {
        sentence: "1. My name is ___.",
        options: ["a) Emma", "b) Jack", "c) Anna"],
        answerIndex: 0
      },
      {
        sentence: "2. Jack is ___ years old.",
        options: ["a) twelve", "b) thirteen", "c) fourteen"],
        answerIndex: 1
      },
      {
        sentence: "3. Emma is ___ years old.",
        options: ["a) eleven", "b) twelve", "c) thirteen"],
        answerIndex: 1
      },
      {
        sentence: "4. Jack says, \"Nice to ___ you.\"",
        options: ["a) meet", "b) see", "c) know"],
        answerIndex: 0
      },
      {
        sentence: "5. Emma says, \"Let's be ___.\"",
        options: ["a) classmates", "b) teachers", "c) friends"],
        answerIndex: 2
      }
    ],
    activity4: {
      partATitle: "Part A: Listen and Repeat",
      partAInstruction: "Listen and repeat each phrase.",
      partA: [
        "Hi! My name is Emma.",
        "What's your name?",
        "Nice to meet you.",
        "How old are you?",
        "Let's be friends!"
      ],
      partB: {
        title: "Part B: Talk About Yourself",
        instruction: "Listen to the questions and sample answers then give your own answers.",
        items: [
          {
            question: "What is your name?",
            sample: "My name is May.",
            keywords: ["my", "name", "is", "I'm", "am"]
          },
          {
            question: "How old are you?",
            sample: "I am 12 years old.",
            keywords: ["am", "I'm", "years", "old", "twelve", "thirteen", "eleven"]
          },
          {
            question: "What is the best friend's name?",
            sample: "My best friend's name is Mary.",
            keywords: ["friend", "name", "is", "my", "best", "his", "her"]
          },
          {
            question: "What do you usually do with your friend at school?",
            sample: "I usually study with my friend at school.",
            keywords: ["study", "play", "eat", "talk", "read", "walk", "friend", "school", "usually"]
          }
        ]
      }
    }
  },

  // =========================================================================
  // UNIT 3: Animals with Superpowers
  // =========================================================================
  {
    id: 3,
    title: "Unit 3: Animals with Superpowers",
    titleTh: "บทที่ 3: สัตว์โลกกับความสามารถพิเศษ",
    themeIcon: "🐙",
    learningGoals: [
      "Understand simple facts about animals and their abilities.",
      "Identify details about how animals use their special abilities.",
      "Describe what animals can do using simple sentences."
    ],
    vocabulary: [
      { word: "ability", meaning: "ความสามารถ", example: "Animals have special abilities." },
      { word: "change", meaning: "เปลี่ยน", example: "An octopus can change its color." },
      { word: "hide", meaning: "ซ่อนตัว", example: "Some animals hide from danger." },
      { word: "danger", meaning: "อันตราย", example: "A snake can be a danger to people." },
      { word: "sound", meaning: "เสียง", example: "Bats use sound to find things." },
      { word: "find", meaning: "หา / ค้นหา", example: "Bats can find food at night." },
      { word: "surface", meaning: "พื้นผิว", example: "This wall has a smooth surface." },
      { word: "stick", meaning: "เกาะติด", example: "Geckos can stick to walls." },
      { word: "survive", meaning: "ดำรงอยู่", example: "People cannot survive without water." }
    ],
    activity1: {
      type: "facts",
      heading: "Listen to the Fun Facts",
      headingTh: "ฟังเกร็ดความรู้เรื่องสัตว์ที่มีความสามารถพิเศษ",
      title: "Animals with Superpowers",
      passage: "Some animals have amazing abilities. An octopus can change its color to hide from danger. Bats can find their way in the dark. They use sounds to help them find things around them. Geckos can climb walls because their feet can stick to many surfaces. These animals use their special abilities to live and survive in nature.",
      phrases: [
        "Some animals have amazing abilities.",
        "An octopus can change its color to hide from danger.",
        "Bats can find their way in the dark.",
        "They use sounds to help them find things around them.",
        "Geckos can climb walls because their feet can stick to many surfaces.",
        "These animals use their special abilities to live and survive in nature."
      ]
    },
    activity2: [
      {
        question: "What is the passage mainly about?",
        options: ["a) Animals with special abilities.", "b) Animals that live in water.", "c) Animals that sleep all day."],
        answerIndex: 0
      },
      {
        question: "Why do animals use their special abilities?",
        options: ["a) To play games.", "b) To live and survive.", "c) To make friends with people."],
        answerIndex: 1
      },
      {
        question: "Which animal can climb walls?",
        options: ["a) A bat.", "b) An octopus.", "c) A gecko."],
        answerIndex: 2
      }
    ],
    activity3: [
      {
        sentence: "1. An octopus can change its ___.",
        options: ["a) shape", "b) color", "c) sound"],
        answerIndex: 1
      },
      {
        sentence: "2. An octopus changes color to ___ from danger.",
        options: ["a) hide", "b) run", "c) eat"],
        answerIndex: 0
      },
      {
        sentence: "3. Bats use ___ to find their way.",
        options: ["a) colors", "b) sounds", "c) leaves"],
        answerIndex: 1
      },
      {
        sentence: "4. Bats use ___ to find things around them.",
        options: ["a) colors", "b) sounds", "c) leaves"],
        answerIndex: 1
      },
      {
        sentence: "5. Geckos' feet can ___ to many surfaces.",
        options: ["a) stick", "b) change", "c) hide"],
        answerIndex: 0
      }
    ],
    activity4: {
      partATitle: "Part A: Listen and Repeat",
      partAInstruction: "Listen and repeat each phrase.",
      partA: [
        "An octopus can change its color.",
        "Bats can find their way in the dark.",
        "Bats use sounds.",
        "Geckos can climb walls.",
        "Their feet can stick to surfaces."
      ],
      partB: {
        title: "Part B: Answer the Questions",
        instruction: "Listen to the question and answer aloud.",
        items: [
          {
            question: "What animal do you think is interesting?",
            sample: "An octopus.",
            keywords: ["octopus", "bat", "gecko", "dog", "cat", "bird", "lion", "tiger", "elephant", "dolphin", "monkey", "animal"]
          },
          {
            question: "Why do you think that?",
            sample: "Because they can hide.",
            keywords: ["because", "can", "hide", "change", "fly", "climb", "swim", "run", "fast", "smart", "cute", "strong"]
          },
          {
            question: "What special ability would you like to have?",
            sample: "I would like to fly.",
            keywords: ["would", "like", "want", "to", "fly", "swim", "run", "invisible", "hide", "climb", "jump", "telepath"]
          },
          {
            question: "Why would you like to have that ability?",
            sample: "I would not need a car to go to school.",
            keywords: ["because", "would", "can", "go", "travel", "help", "fast", "school", "fun", "save", "need", "car"]
          }
        ]
      }
    }
  },

  // =========================================================================
  // UNIT 4: My Family and Our Weekends
  // =========================================================================
  {
    id: 4,
    title: "Unit 4: My Family and Our Weekends",
    titleTh: "บทที่ 4: ครอบครัวของฉันและวันหยุดสุดสัปดาห์",
    themeIcon: "👨‍👩‍👧‍👦",
    learningGoals: [
      "Understand a short story about family life.",
      "Identify details about family members and activities.",
      "Talk about their family and activities they enjoy together."
    ],
    vocabulary: [
      { word: "family", meaning: "ครอบครัว", example: "My family is important to me." },
      { word: "parents", meaning: "พ่อแม่", example: "My parents work in the city." },
      { word: "younger", meaning: "อายุน้อยกว่า", example: "I have a younger sister." },
      { word: "older", meaning: "อายุมากกว่า", example: "My older brother is fifteen." },
      { word: "spend time", meaning: "ใช้เวลา", example: "We spend time together." },
      { word: "together", meaning: "ด้วยกัน", example: "We eat dinner together." },
      { word: "usually", meaning: "โดยปกติ", example: "We usually eat at home." },
      { word: "weekend", meaning: "วันหยุดสุดสัปดาห์", example: "We go out on weekends." },
      { word: "relax", meaning: "ผ่อนคลาย", example: "I relax by listening to music." },
      { word: "enjoy", meaning: "สนุกกับ / ชอบ", example: "We enjoy watching movies." }
    ],
    activity1: {
      type: "story",
      heading: "Listen to the Story",
      headingTh: "ฟังเรื่องครอบครัวของ Troy และกิจกรรมวันสุดสัปดาห์",
      title: "My Family and Our Weekends",
      passage: "My name is Troy, and I live with my parents and my older sister, Maya. My parents are busy on weekdays, so we usually spend more time together on weekends. On Saturday mornings, my sister and I ride our bikes in the park. In the afternoon, we sometimes watch a movie at home. On Sundays, we often have dinner together and talk about our week. I enjoy these moments because we can relax and have fun as a family.",
      phrases: [
        "My name is Troy, and I live with my parents and my older sister, Maya.",
        "My parents are busy on weekdays, so we usually spend more time together on weekends.",
        "On Saturday mornings, my sister and I ride our bikes in the park.",
        "In the afternoon, we sometimes watch a movie at home.",
        "On Sundays, we often have dinner together and talk about our week.",
        "I enjoy these moments because we can relax and have fun as a family."
      ]
    },
    activity2: [
      {
        question: "What is the story mainly about?",
        options: ["a) Troy's school life", "b) Troy's family time", "c) Troy's favorite movies"],
        answerIndex: 1
      },
      {
        question: "Why does Troy enjoy spending time with his family?",
        options: ["a) They help him with his homework.", "b) They buy him new things.", "c) They can relax and have fun together."],
        answerIndex: 2
      },
      {
        question: "What is the best description of Troy's family weekends?",
        options: ["a) They do activities together and relax.", "b) They spend most of their time studying.", "c) They usually visit different cities."],
        answerIndex: 0
      }
    ],
    activity3: [
      {
        sentence: "1. Troy lives with his parents and his older sister, ___.",
        options: ["a) Maya", "b) Mia", "c) Emma"],
        answerIndex: 0
      },
      {
        sentence: "2. Troy's parents are busy on ___.",
        options: ["a) weekends", "b) weekdays", "c) holidays"],
        answerIndex: 1
      },
      {
        sentence: "3. The family usually spends more time together on ___.",
        options: ["a) Mondays", "b) school days", "c) weekends"],
        answerIndex: 2
      },
      {
        sentence: "4. Troy and Maya ride their bikes in the ___ on Saturday mornings.",
        options: ["a) park", "b) garden", "c) playground"],
        answerIndex: 0
      },
      {
        sentence: "5. On Sundays, the family often has ___ together and talks about their week.",
        options: ["a) breakfast", "b) lunch", "c) dinner"],
        answerIndex: 2
      }
    ],
    activity4: {
      partATitle: "A. Listen and Repeat",
      partAInstruction: "Listen to each sentence and repeat it aloud.",
      partA: [
        "I live with my parents.",
        "We spend time together on weekends.",
        "My sister and I ride our bikes.",
        "We sometimes watch a movie at home.",
        "We enjoy having dinner together."
      ],
      partB: {
        title: "B. Answer the Questions",
        instruction: "Listen to each question. Pause the audio and answer aloud using your own information.",
        items: [
          {
            question: "Who do you live with?",
            sample: "I live with my parents and my brother.",
            keywords: ["live", "with", "parents", "mother", "father", "sister", "brother", "family"]
          },
          {
            question: "What do you usually do with your family on weekends?",
            sample: "We usually watch movies together.",
            keywords: ["we", "usually", "together", "watch", "eat", "go", "play", "park", "movies", "dinner"]
          },
          {
            question: "What is your favorite family activity?",
            sample: "My favorite family activity is eating at the restaurant.",
            keywords: ["favorite", "activity", "eating", "restaurant", "watching", "playing", "cooking", "dinner", "traveling"]
          },
          {
            question: "What place do you like to go with your family?",
            sample: "I like to go to the beach with my family.",
            keywords: ["like", "go", "to", "beach", "park", "mall", "restaurant", "mountain", "cinema", "family"]
          }
        ]
      }
    }
  },

  // =========================================================================
  // UNIT 5: At a Café
  // =========================================================================
  {
    id: 5,
    title: "Unit 5: At a Café",
    titleTh: "บทที่ 5: ที่ร้านคาเฟ่",
    themeIcon: "☕",
    learningGoals: [
      "Understand a simple conversation about ordering food and drinks.",
      "Identify details about orders and prices.",
      "Order food and drinks and ask simple questions at a café."
    ],
    vocabulary: [
      { word: "café", meaning: "ร้านกาแฟ / คาเฟ่", example: "We meet at a café after school." },
      { word: "menu", meaning: "รายการอาหารและเครื่องดื่ม", example: "Can I see the menu, please?" },
      { word: "drink", meaning: "เครื่องดื่ม", example: "My favorite drink is iced tea." },
      { word: "lemonade", meaning: "น้ำมะนาว", example: "Can I have a lemonade?" },
      { word: "sandwich", meaning: "แซนด์วิช", example: "I'd like a cheese sandwich." },
      { word: "anything else?", meaning: "รับอะไรเพิ่มอีกไหม", example: "Do you want anything else?" },
      { word: "that's all", meaning: "แค่นี้ค่ะ/ครับ", example: "That's all, thank you." },
      { word: "how much", meaning: "ราคาเท่าไร", example: "How much is the sandwich?" }
    ],
    activity1: {
      type: "conversation",
      heading: "Listen to the Conversation",
      headingTh: "ฟังบทสนทนาที่ร้านคาเฟ่ (เสียงชาย Dan / เสียงหญิง Server & Sara)",
      title: "At a Café",
      passage: "Server: Hi! Welcome to Sunny Café. Here's the menu.\nDan: Thanks. Can I have a cheese sandwich and a lemonade, please?\nServer: Sure. Anything else?\nDan: No, that's all for me. Sara, what would you like?\nSara: I'd like a chocolate cake and an iced tea, please.\nServer: All right. That's one sandwich, one lemonade, one cake, and one iced tea.\nSara: How much is it?\nServer: It's 150 baht altogether.\nDan: Here you are.\nServer: Thank you! Your order will be ready soon.",
      phrases: [
        "Server: Hi! Welcome to Sunny Café. Here's the menu.",
        "Dan: Thanks. Can I have a cheese sandwich and a lemonade, please?",
        "Server: Sure. Anything else?",
        "Dan: No, that's all for me. Sara, what would you like?",
        "Sara: I'd like a chocolate cake and an iced tea, please.",
        "Server: All right. That's one sandwich, one lemonade, one cake, and one iced tea.",
        "Sara: How much is it?",
        "Server: It's 150 baht altogether.",
        "Dan: Here you are.",
        "Server: Thank you! Your order will be ready soon."
      ]
    },
    activity2: [
      {
        question: "What are Dan and Sara doing?",
        options: ["a) Buying clothes", "b) Ordering food and drinks", "c) Looking for a classroom"],
        answerIndex: 1
      },
      {
        question: "Where does the conversation take place?",
        options: ["a) At a café", "b) At a supermarket", "c) At a school library"],
        answerIndex: 0
      },
      {
        question: "What does the server do in this conversation?",
        options: ["a) Teaches the friends how to cook", "b) Asks the friends about their school", "c) Takes the friends' order"],
        answerIndex: 2
      }
    ],
    activity3: [
      {
        sentence: "1. Dan orders a cheese ___.",
        options: ["a) cake", "b) sandwich", "c) burger"],
        answerIndex: 1
      },
      {
        sentence: "2. Dan would like a ___, too.",
        options: ["a) lemonade", "b) milkshake", "c) hot chocolate"],
        answerIndex: 0
      },
      {
        sentence: "3. Sara orders chocolate cake and ___.",
        options: ["a) orange juice", "b) water", "c) iced tea"],
        answerIndex: 2
      },
      {
        sentence: "4. The server asks, \"Anything ___?\"",
        options: ["a) else", "b) more", "c) again"],
        answerIndex: 0
      },
      {
        sentence: "5. The total price is ___ baht.",
        options: ["a) 120", "b) 150", "c) 180"],
        answerIndex: 1
      }
    ],
    activity4: {
      partATitle: "A. Listen and Repeat",
      partAInstruction: "Listen to each phrase and repeat it aloud.",
      partA: [
        "Can I have a lemonade, please?",
        "I'd like a sandwich, please.",
        "Anything else?",
        "That's all, thank you.",
        "How much is it?"
      ],
      partB: {
        title: "B. Answer the Questions",
        instruction: "Listen to each question. Pause the audio and answer aloud using your own ideas.",
        items: [
          {
            question: "What would you like to drink?",
            sample: "I would like an iced tea, please.",
            keywords: ["would", "like", "have", "iced tea", "lemonade", "water", "milk", "juice", "coffee", "please"]
          },
          {
            question: "What snack would you like to order?",
            sample: "I would like a chocolate cake, please.",
            keywords: ["would", "like", "order", "cake", "sandwich", "bread", "cookie", "ice cream", "please"]
          },
          {
            question: "How much money do you have for a snack and a drink?",
            sample: "I have 100 baht.",
            keywords: ["have", "baht", "hundred", "fifty", "twenty", "two hundred", "money"]
          },
          {
            question: "Where do you usually go for snacks?",
            sample: "I usually go to KFC.",
            keywords: ["go", "to", "usually", "cafe", "kfc", "seven", "eleven", "mall", "market", "shop", "canteen"]
          }
        ]
      }
    }
  },

  // =========================================================================
  // UNIT 6: Weather Around the World
  // =========================================================================
  {
    id: 6,
    title: "Unit 6: Weather Around the World",
    titleTh: "บทที่ 6: สภาพอากาศรอบโลก",
    themeIcon: "🌦️",
    learningGoals: [
      "Understand simple information about weather in different places.",
      "Identify details about temperatures and weather conditions.",
      "Describe the weather and talk about their favorite seasons."
    ],
    vocabulary: [
      { word: "weather", meaning: "สภาพอากาศ", example: "The weather is nice today." },
      { word: "temperature", meaning: "อุณหภูมิ", example: "The temperature is 30 degrees." },
      { word: "hot", meaning: "ร้อน", example: "It is hot in Thailand." },
      { word: "extremely", meaning: "อย่างมาก", example: "The weather is extremely hot in the summer." },
      { word: "dry", meaning: "แห้ง", example: "The weather is hot and dry." },
      { word: "common", meaning: "พบได้บ่อย", example: "Snow is common in winter in some countries." },
      { word: "rain", meaning: "ฝน / ฝนตก", example: "It often rains in July." },
      { word: "affect", meaning: "มีผลกับ / ส่งผลกระทบ", example: "Heavy rain affects our daily lives." },
      { word: "degrees", meaning: "องศา", example: "It is 25 degrees today." }
    ],
    activity1: {
      type: "facts",
      heading: "Listen to the Fun Facts",
      headingTh: "ฟังเกร็ดความรู้เรื่องสภาพอากาศรอบโลก",
      title: "Weather Around the World",
      passage: "The weather is different around the world. In Bangkok, Thailand, it is often hot, and the temperature can reach 40 degrees Celsius. In Oymyakon, Russia, winter is extremely cold, and temperatures can fall below minus 40 degrees. In Cairo, Egypt, the weather is usually hot and dry, with very little rain. However, in London, England, rainy days are common. These different weather conditions affect what people wear and what they do every day.",
      phrases: [
        "The weather is different around the world.",
        "In Bangkok, Thailand, it is often hot, and the temperature can reach 40 degrees Celsius.",
        "In Oymyakon, Russia, winter is extremely cold, and temperatures can fall below minus 40 degrees.",
        "In Cairo, Egypt, the weather is usually hot and dry, with very little rain.",
        "However, in London, England, rainy days are common.",
        "These different weather conditions affect what people wear and what they do every day."
      ]
    },
    activity2: [
      {
        question: "What is the passage mainly about?",
        options: ["a) Famous cities around the world", "b) Different weather conditions in different places", "c) People's favorite activities"],
        answerIndex: 1
      },
      {
        question: "Why is weather important in daily life?",
        options: ["a) It affects what people wear and do.", "b) It makes every country look the same.", "c) It tells people where to live."],
        answerIndex: 0
      },
      {
        question: "Which statement is true according to the passage?",
        options: ["a) Every country has the same weather.", "b) It always snows in London.", "c) Different places have different weather conditions."],
        answerIndex: 2
      }
    ],
    activity3: [
      {
        sentence: "1. In Bangkok, the temperature can reach 40 degrees ___.",
        options: ["a) Celsius", "b) Fahrenheit", "c) below zero"],
        answerIndex: 0
      },
      {
        sentence: "2. Oymyakon is in ___.",
        options: ["a) Egypt", "b) Russia", "c) England"],
        answerIndex: 1
      },
      {
        sentence: "3. Winter in Oymyakon is extremely ___.",
        options: ["a) warm", "b) wet", "c) cold"],
        answerIndex: 2
      },
      {
        sentence: "4. Cairo usually has hot and ___ weather.",
        options: ["a) dry", "b) snowy", "c) freezing"],
        answerIndex: 0
      },
      {
        sentence: "5. Rainy days are common in ___.",
        options: ["a) Bangkok", "b) London", "c) Cairo"],
        answerIndex: 1
      }
    ],
    activity4: {
      partATitle: "A. Listen and Repeat",
      partAInstruction: "Listen to each sentence and repeat it aloud.",
      partA: [
        "The weather is hot and sunny.",
        "It is freezing outside.",
        "It often rains in my city.",
        "The temperature is 30 degrees.",
        "My favorite season is winter."
      ],
      partB: {
        title: "B. Answer the Questions",
        instruction: "Listen to each question. Pause the audio and answer aloud using your own ideas.",
        items: [
          {
            question: "What's the weather in your area like today?",
            sample: "It's hot and sunny today.",
            keywords: ["it's", "it", "is", "hot", "sunny", "rainy", "cold", "warm", "cloudy", "today"]
          },
          {
            question: "What's your favorite season?",
            sample: "My favorite season is winter.",
            keywords: ["favorite", "season", "is", "winter", "summer", "rainy", "spring"]
          },
          {
            question: "What do you usually wear in your favorite season?",
            sample: "I usually wear a jacket.",
            keywords: ["wear", "jacket", "sweater", "shirt", "t-shirt", "shorts", "coat", "dress", "usually"]
          },
          {
            question: "What do you do on a hot day?",
            sample: "I stay inside.",
            keywords: ["stay", "inside", "home", "swim", "drink", "water", "ice cream", "mall", "air conditioner"]
          }
        ]
      }
    }
  },

  // =========================================================================
  // UNIT 7: My Favorite Sport
  // =========================================================================
  {
    id: 7,
    title: "Unit 7: My Favorite Sport",
    titleTh: "บทที่ 7: กีฬาโปรดของฉัน",
    themeIcon: "🏀",
    learningGoals: [
      "Understand a short story about someone's favorite sport.",
      "Identify details about sports, activities, and playing with friends.",
      "Talk about their favorite sports and sports they play."
    ],
    vocabulary: [
      { word: "sport", meaning: "กีฬา", example: "My favorite sport is basketball." },
      { word: "team", meaning: "ทีม", example: "I play on a school team." },
      { word: "favorite", meaning: "ที่ชื่นชอบ", example: "His favorite sport is soccer." },
      { word: "play", meaning: "เล่น", example: "I play football after school." },
      { word: "throw", meaning: "โยน", example: "You throw a ball into the basket." },
      { word: "win", meaning: "ชนะ", example: "Our team wants to win." },
      { word: "lose", meaning: "แพ้", example: "We sometimes lose a game." },
      { word: "healthy", meaning: "สุขภาพดี", example: "Sports help me stay healthy." },
      { word: "score", meaning: "คะแนน / ทำคะแนน", example: "The team with higher score wins." }
    ],
    activity1: {
      type: "story",
      heading: "Listen to the Story",
      headingTh: "ฟังเรื่องกีฬาโปรด (My Favorite Sport)",
      title: "My Favorite Sport",
      passage: "My favorite sport is basketball. I started playing it two years ago with my friends at school. We play every Tuesday and Thursday after class. I like throwing the ball and trying to score points. Sometimes our team wins, but sometimes we lose. That's OK! I can try again and get better. Basketball helps me stay healthy, and I have fun playing with my team.",
      phrases: [
        "My favorite sport is basketball.",
        "I started playing it two years ago with my friends at school.",
        "We play every Tuesday and Thursday after class.",
        "I like throwing the ball and trying to score points.",
        "Sometimes our team wins, but sometimes we lose.",
        "That's OK! I can try again and get better.",
        "Basketball helps me stay healthy, and I have fun playing with my team."
      ]
    },
    activity2: [
      {
        question: "What is the story mainly about?",
        options: ["a) The speaker's favorite sport", "b) The speaker's favorite school subject", "c) The speaker's weekend trip"],
        answerIndex: 0
      },
      {
        question: "How does the speaker feel when the team loses?",
        options: ["a) The speaker stops playing sports.", "b) The speaker tries again.", "c) The speaker gets a new team."],
        answerIndex: 1
      },
      {
        question: "Why does the speaker like basketball?",
        options: ["a) It helps the speaker finish homework.", "b) It helps the speaker get more money.", "c) It keeps the speaker healthy and happy."],
        answerIndex: 2
      }
    ],
    activity3: [
      {
        sentence: "1. The speaker's favorite sport is ___.",
        options: ["a) football", "b) basketball", "c) tennis"],
        answerIndex: 1
      },
      {
        sentence: "2. The speaker started playing basketball ___ ago.",
        options: ["a) two years", "b) two weeks", "c) two months"],
        answerIndex: 0
      },
      {
        sentence: "3. The friends play every Tuesday and ___.",
        options: ["a) Monday", "b) Friday", "c) Thursday"],
        answerIndex: 2
      },
      {
        sentence: "4. The speaker likes throwing the ___.",
        options: ["a) ball", "b) bag", "c) hat"],
        answerIndex: 0
      },
      {
        sentence: "5. Sometimes the team wins, but sometimes they ___.",
        options: ["a) run", "b) lose", "c) swim"],
        answerIndex: 1
      }
    ],
    activity4: {
      partATitle: "A. Listen and Repeat",
      partAInstruction: "Listen to each sentence and repeat it aloud.",
      partA: [
        "My favorite sport is basketball.",
        "I play with my friends.",
        "Sometimes we win, and sometimes we lose.",
        "I can try again.",
        "Sports help me stay healthy."
      ],
      partB: {
        title: "B. Answer the Questions",
        instruction: "Listen to each question. Pause the audio and answer aloud using your own ideas.",
        items: [
          {
            question: "What's your favorite sport?",
            sample: "My favorite sport is football.",
            keywords: ["favorite", "sport", "is", "football", "basketball", "swimming", "tennis", "badminton", "volleyball"]
          },
          {
            question: "Who do you play sports with?",
            sample: "I play sports with my friends.",
            keywords: ["play", "with", "friends", "family", "brother", "sister", "classmates"]
          },
          {
            question: "When do you play this sport?",
            sample: "I usually play it on Saturday.",
            keywords: ["play", "on", "after school", "weekend", "saturday", "sunday", "every", "evening"]
          },
          {
            question: "What other sports do you like to play?",
            sample: "I like to play tennis.",
            keywords: ["like", "play", "tennis", "badminton", "football", "basketball", "swimming", "running", "volleyball"]
          }
        ]
      }
    }
  },

  // =========================================================================
  // UNIT 8: Asking for Directions
  // =========================================================================
  {
    id: 8,
    title: "Unit 8: Asking for Directions",
    titleTh: "บทที่ 8: การถามและบอกเส้นทาง",
    themeIcon: "🗺️",
    learningGoals: [
      "Understand a simple conversation about finding a place.",
      "Identify details about directions and nearby locations.",
      "Ask for and give simple directions."
    ],
    vocabulary: [
      { word: "direction", meaning: "เส้นทาง / ทิศทาง", example: "Can you give me directions?" },
      { word: "straight", meaning: "ตรงไป", example: "Go straight ahead." },
      { word: "turn", meaning: "เลี้ยว", example: "Turn left at the corner." },
      { word: "left", meaning: "ซ้าย", example: "Turn left here." },
      { word: "corner", meaning: "หัวมุม", example: "The café is on the corner." },
      { word: "across from", meaning: "ตรงข้ามกับ", example: "The park is across from the school." },
      { word: "near", meaning: "ใกล้", example: "The station is near the mall." },
      { word: "far", meaning: "ไกล", example: "Is the museum far from here?" }
    ],
    activity1: {
      type: "conversation",
      heading: "Listen to the Conversation",
      headingTh: "ฟังบทสนทนาการถามทาง (เสียงชาย Tom / เสียงหญิง Mia)",
      title: "Asking for Direction",
      passage: "Mia: Excuse me. Can you help me?\nTom: Sure. What are you looking for?\nMia: I'm looking for the bookshop. Is it near here?\nTom: Yes. Go straight and turn left at the corner.\nMia: Turn left at the corner. OK.\nTom: The bookshop is next to the café, across from the park.\nMia: Great! Is it far from here?\nTom: No, it's only a five-minute walk.\nMia: Thank you for your help!\nTom: You're welcome!",
      phrases: [
        "Mia: Excuse me. Can you help me?",
        "Tom: Sure. What are you looking for?",
        "Mia: I'm looking for the bookshop. Is it near here?",
        "Tom: Yes. Go straight and turn left at the corner.",
        "Mia: Turn left at the corner. OK.",
        "Tom: The bookshop is next to the café, across from the park.",
        "Mia: Great! Is it far from here?",
        "Tom: No, it's only a five-minute walk.",
        "Mia: Thank you for your help!",
        "Tom: You're welcome!"
      ]
    },
    activity2: [
      {
        question: "What is Mia trying to do?",
        options: ["a) Find a bookshop", "b) Buy a drink", "c) Visit her friend"],
        answerIndex: 0
      },
      {
        question: "What does Tom do to help Mia?",
        options: ["a) He takes her home.", "b) He gives her directions.", "c) He buys her a book."],
        answerIndex: 1
      },
      {
        question: "How does Mia feel about Tom's help?",
        options: ["a) She is angry.", "b) She is confused and upset.", "c) She is thankful."],
        answerIndex: 2
      }
    ],
    activity3: [
      {
        sentence: "1. Mia is looking for the ___.",
        options: ["a) café", "b) bookshop", "c) park"],
        answerIndex: 1
      },
      {
        sentence: "2. Tom tells Mia to go ___.",
        options: ["a) straight", "b) right", "c) back"],
        answerIndex: 0
      },
      {
        sentence: "3. Mia should turn ___ at the corner.",
        options: ["a) right", "b) around", "c) left"],
        answerIndex: 2
      },
      {
        sentence: "4. The bookshop is next to the ___.",
        options: ["a) school", "b) café", "c) bank"],
        answerIndex: 1
      },
      {
        sentence: "5. It takes about ___ to walk there.",
        options: ["a) ten minutes", "b) fifteen minutes", "c) five minutes"],
        answerIndex: 2
      }
    ],
    activity4: {
      partATitle: "A. Listen and Repeat",
      partAInstruction: "Listen to each phrase and repeat it aloud.",
      partA: [
        "Excuse me. Can you help me?",
        "I'm looking for the bookshop.",
        "Go straight ahead.",
        "Turn left at the corner.",
        "Thank you for your help!"
      ],
      partB: {
        title: "B. Answer the Questions",
        instruction: "Listen to each question. Pause the audio and answer aloud using your own ideas.",
        items: [
          {
            question: "How do you usually go to school?",
            sample: "I go to school by bus.",
            keywords: ["go", "school", "by", "bus", "car", "walk", "train", "bike", "motorcycle"]
          },
          {
            question: "What places are near your home?",
            sample: "A supermarket and a bank.",
            keywords: ["supermarket", "bank", "park", "seven", "eleven", "market", "mall", "school", "hospital", "cafe", "shop"]
          },
          {
            question: "How do you get to a supermarket from your home?",
            sample: "I walk for 5 minutes and turn left at the bank.",
            keywords: ["walk", "go", "straight", "turn", "left", "right", "by", "car", "bus", "minutes", "near"]
          },
          {
            question: "What places are next to your school?",
            sample: "A coffeeshop and a post office.",
            keywords: ["coffee", "coffeeshop", "cafe", "post", "office", "park", "bank", "supermarket", "shop", "market", "hospital", "temple"]
          }
        ]
      }
    }
  },

  // =========================================================================
  // UNIT 9: Healthy Food for Healthy Body
  // =========================================================================
  {
    id: 9,
    title: "Unit 9: Healthy Food for Healthy Body",
    titleTh: "บทที่ 9: อาหารเพื่อสุขภาพสำหรับร่างกายที่แข็งแรง",
    themeIcon: "🥗",
    learningGoals: [
      "Understand simple information about healthy food and the body.",
      "Identify details about different foods and their benefits.",
      "Talk about food and drink choices using simple sentences."
    ],
    vocabulary: [
      { word: "healthy", meaning: "ดีต่อสุขภาพ", example: "Fruit is healthy food." },
      { word: "vegetable", meaning: "ผัก", example: "I eat vegetables every day." },
      { word: "fruit", meaning: "ผลไม้", example: "Apples are my favorite fruit." },
      { word: "important", meaning: "สำคัญ", example: "Breakfast is an important meal." },
      { word: "muscle", meaning: "กล้ามเนื้อ", example: "My muscles feel tired after exercise." },
      { word: "water", meaning: "น้ำ", example: "Drink water every day." },
      { word: "especially", meaning: "โดยเฉพาะอย่างยิ่ง", example: "I like Thai food, especially pad Thai." },
      { word: "different", meaning: "แตกต่าง", example: "Vegetables have many different vitamins." }
    ],
    activity1: {
      type: "facts",
      heading: "Listen to the Fun Facts",
      headingTh: "ฟังเกร็ดความรู้เรื่องอาหารเพื่อสุขภาพ",
      title: "Healthy Food for Healthy Body",
      passage: "Our bodies need different kinds of food to stay healthy. Fruit and vegetables give us important vitamins. Foods like rice, bread, and potatoes give us energy to study, play, and exercise. Eggs, fish, and beans help our bodies grow and build strong muscles. We also need to drink enough water every day, especially when the weather is hot. Eating different foods and drinking water help us feel good and stay active.",
      phrases: [
        "Our bodies need different kinds of food to stay healthy.",
        "Fruit and vegetables give us important vitamins.",
        "Foods like rice, bread, and potatoes give us energy to study, play, and exercise.",
        "Eggs, fish, and beans help our bodies grow and build strong muscles.",
        "We also need to drink enough water every day, especially when the weather is hot.",
        "Eating different foods and drinking water help us feel good and stay active."
      ]
    },
    activity2: [
      {
        question: "What is the passage mainly about?",
        options: ["a) How to cook different meals", "b) Why our bodies need different kinds of food", "c) Where to buy fresh vegetables"],
        answerIndex: 1
      },
      {
        question: "Why should we eat different kinds of food?",
        options: ["a) They help our bodies stay healthy.", "b) They make every meal sweet.", "c) They help us sleep all day."],
        answerIndex: 0
      },
      {
        question: "What should we do to stay healthy?",
        options: ["a) Eating only fruit", "b) Drinking water only when thirsty", "c) Eating different foods and drinking enough water"],
        answerIndex: 2
      }
    ],
    activity3: [
      {
        sentence: "1. Fruit and vegetables give us important ___.",
        options: ["a) vitamins", "b) drinks", "c) snacks"],
        answerIndex: 0
      },
      {
        sentence: "2. Rice, bread, and potatoes give us ___.",
        options: ["a) sugar", "b) energy", "c) water"],
        answerIndex: 1
      },
      {
        sentence: "3. Eggs, fish, and beans help our bodies ___.",
        options: ["a) sleep", "b) run", "c) grow"],
        answerIndex: 2
      },
      {
        sentence: "4. We need to drink enough ___ every day.",
        options: ["a) water", "b) milk", "c) juice"],
        answerIndex: 0
      },
      {
        sentence: "5. We need to drink enough water, especially when the weather is ___.",
        options: ["a) cold", "b) hot", "c) cloudy"],
        answerIndex: 1
      }
    ],
    activity4: {
      partATitle: "A. Listen and Repeat",
      partAInstruction: "Listen to each sentence and repeat it aloud.",
      partA: [
        "Fruit and vegetables are healthy.",
        "Food gives us energy.",
        "I drink milk every day.",
        "I like fresh fruit.",
        "A healthy meal helps me stay active."
      ],
      partB: {
        title: "B. Answer the Questions",
        instruction: "Listen to each question. Pause the audio and answer aloud using your own ideas.",
        items: [
          {
            question: "What's your favorite fruit?",
            sample: "My favorite fruit is mango.",
            keywords: ["favorite", "fruit", "is", "mango", "apple", "banana", "orange", "watermelon", "strawberry", "grape"]
          },
          {
            question: "What do you usually eat for breakfast?",
            sample: "I usually eat eggs and bread.",
            keywords: ["eat", "have", "eggs", "bread", "rice", "milk", "cereal", "porridge", "sandwich", "breakfast"]
          },
          {
            question: "What kind of healthy food would you like to make?",
            sample: "I would like to make a salad.",
            keywords: ["would", "like", "make", "cook", "salad", "soup", "vegetable", "fish", "chicken", "egg", "healthy"]
          },
          {
            question: "What do you drink when you're thirsty?",
            sample: "I drink water.",
            keywords: ["drink", "water", "juice", "milk", "coconut"]
          }
        ]
      }
    }
  },

  // =========================================================================
  // UNIT 10: My Free Time
  // =========================================================================
  {
    id: 10,
    title: "Unit 10: My Free Time",
    titleTh: "บทที่ 10: เวลาว่างของฉัน",
    themeIcon: "🎨",
    learningGoals: [
      "Understand a short story about free-time activities.",
      "Identify details about hobbies and favorite activities.",
      "Talk about their hobbies and what they enjoy doing in their free time."
    ],
    vocabulary: [
      { word: "free time", meaning: "เวลาว่าง", example: "I read books in my free time." },
      { word: "hobby", meaning: "งานอดิเรก", example: "My hobby is drawing." },
      { word: "draw", meaning: "วาดรูป", example: "I like to draw animals." },
      { word: "comics", meaning: "หนังสือการ์ตูน", example: "I read comics after school." },
      { word: "play games", meaning: "เล่นเกม", example: "I play games with my friends." },
      { word: "prefer", meaning: "ชอบ..มากกว่า", example: "I prefer drawing to playing games." },
      { word: "take photos", meaning: "ถ่ายรูป", example: "I like to take photos of nature." },
      { word: "fun", meaning: "สนุก", example: "Playing badminton is fun." }
    ],
    activity1: {
      type: "story",
      heading: "Listen to a Story",
      headingTh: "ฟังเรื่องเวลาว่างและงานอดิเรกของ Lily",
      title: "My Free Time",
      passage: "My name is Lily. After school, I like doing different hobbies in my free time. I often listen to music while I do my homework. When I finish, I sometimes draw pictures or read comics. At weekends, I like taking photos with my phone, especially when I visit the park with my family. My brother enjoys playing games, but I prefer drawing. I think free time is important because it helps us relax and have fun.",
      phrases: [
        "My name is Lily. After school, I like doing different hobbies in my free time.",
        "I often listen to music while I do my homework.",
        "When I finish, I sometimes draw pictures or read comics.",
        "At weekends, I like taking photos with my phone, especially when I visit the park with my family.",
        "My brother enjoys playing games, but I prefer drawing.",
        "I think free time is important because it helps us relax and have fun."
      ]
    },
    activity2: [
      {
        question: "What is the story mainly about?",
        options: ["a) Lily's school subjects", "b) Lily's free-time activities", "c) Lily's family meals"],
        answerIndex: 1
      },
      {
        question: "Why does Lily think free time is important?",
        options: ["a) It helps people relax and have fun.", "b) It helps people finish school early.", "c) It makes people feel tired."],
        answerIndex: 0
      },
      {
        question: "Which sentence best describes Lily?",
        options: ["a) She only likes playing games.", "b) She doesn't have any hobbies.", "c) She enjoys doing different activities."],
        answerIndex: 2
      }
    ],
    activity3: [
      {
        sentence: "1. Lily often listens to ___ after school.",
        options: ["a) music", "b) the radio news", "c) stories"],
        answerIndex: 0
      },
      {
        sentence: "2. Lily sometimes draws pictures or reads ___.",
        options: ["a) newspapers", "b) comics", "c) textbooks"],
        answerIndex: 1
      },
      {
        sentence: "3. Lily likes taking photos at ___.",
        options: ["a) the library", "b) the supermarket", "c) the park"],
        answerIndex: 2
      },
      {
        sentence: "4. Lily takes photos with her ___.",
        options: ["a) phone", "b) camera bag", "c) computer"],
        answerIndex: 0
      },
      {
        sentence: "5. Lily's brother enjoys ___.",
        options: ["a) drawing pictures", "b) playing games", "c) taking photos"],
        answerIndex: 1
      }
    ],
    activity4: {
      partATitle: "A. Listen and Repeat",
      partAInstruction: "Listen to each sentence and repeat it aloud.",
      partA: [
        "I like listening to music.",
        "I read comics after school.",
        "Drawing pictures is fun.",
        "I enjoy taking photos.",
        "Free time helps me relax."
      ],
      partB: {
        title: "B. Answer the Questions",
        instruction: "Listen to each question. Pause the audio and answer aloud using your own ideas.",
        items: [
          {
            question: "What do you like doing in your free time?",
            sample: "I like playing games.",
            keywords: ["like", "playing", "games", "drawing", "reading", "listening", "music", "photos", "movies", "sports"]
          },
          {
            question: "When do you usually do your favorite activity?",
            sample: "I usually play games after school. I like playing games.",
            keywords: ["usually", "after school", "weekend", "evening", "free time", "saturday", "sunday"]
          },
          {
            question: "Who do you spend your free time with?",
            sample: "I spend my free time with my friends.",
            keywords: ["spend", "with", "friends", "family", "brother", "sister", "parents", "alone"]
          },
          {
            question: "What other hobbies would you like to try?",
            sample: "I would like to try painting.",
            keywords: ["would", "like", "try", "painting", "drawing", "cooking", "swimming", "photography", "dancing", "singing", "music"]
          }
        ]
      }
    }
  },

  // =========================================================================
  // UNIT 11: A Day at the Shopping Mall
  // =========================================================================
  {
    id: 11,
    title: "Unit 11: A Day at the Shopping Mall",
    titleTh: "บทที่ 11: วันหนึ่งในห้างสรรพสินค้า",
    themeIcon: "🛍️",
    learningGoals: [
      "Understand a simple conversation about shopping for clothes.",
      "Identify details about clothes, prices, and buying decisions.",
      "Ask simple questions and talk about shopping for clothes."
    ],
    vocabulary: [
      { word: "T-shirt", meaning: "เสื้อยืด", example: "I like this T-shirt." },
      { word: "look nice", meaning: "ดูสวย / ดูดี", example: "The blue one looks nice." },
      { word: "How much is it?", meaning: "ราคาเท่าไร", example: "How much is this T-shirt?" },
      { word: "price", meaning: "ราคา", example: "That's a good price." },
      { word: "try on", meaning: "ลองสวมใส่", example: "Can I try it on?" },
      { word: "fitting room", meaning: "ห้องลองเสื้อ", example: "The fitting room is over there." },
      { word: "fit well", meaning: "ใส่ได้พอดี", example: "This T-shirt fits well." },
      { word: "pay", meaning: "จ่ายเงิน", example: "Let's pay for this first." }
    ],
    activity1: {
      type: "conversation",
      heading: "Listen to a Conversation",
      headingTh: "ฟังบทสนทนาการเลือกซื้อเสื้อผ้า (เสียงผู้หญิงสองคน: Joy และ Tara)",
      title: "A Day at the Shopping Mall",
      passage: "Joy: Look at this T-shirt, Tara. I like the color!\nTara: The blue one? It looks nice.\nJoy: Yes. How much is it?\nTara: It says 250 baht.\nJoy: That's a good price. Can I try it on?\nTara: The fitting room is over there.\nJoy: It fits well! I'll buy it.\nTara: Great! Do you want to look at the shoes, too?\nJoy: Maybe later. Let's pay for this first.",
      phrases: [
        "Joy: Look at this T-shirt, Tara. I like the color!",
        "Tara: The blue one? It looks nice.",
        "Joy: Yes. How much is it?",
        "Tara: It says 250 baht.",
        "Joy: That's a good price. Can I try it on?",
        "Tara: The fitting room is over there.",
        "Joy: It fits well! I'll buy it.",
        "Tara: Great! Do you want to look at the shoes, too?",
        "Joy: Maybe later. Let's pay for this first."
      ]
    },
    activity2: [
      {
        question: "What are Joy and Tara doing?",
        options: ["a) Buying food", "b) Shopping for clothes", "c) Looking for a restaurant"],
        answerIndex: 1
      },
      {
        question: "What does Joy think about the T-shirt's price?",
        options: ["a) It is a good price.", "b) It is too expensive.", "c) It is very cheap."],
        answerIndex: 0
      },
      {
        question: "What does Joy decide to do?",
        options: ["a) Buy some shoes", "b) Go home", "c) Buy the T-shirt"],
        answerIndex: 2
      }
    ],
    activity3: [
      {
        sentence: "1. Joy likes the ___ of the T-shirt.",
        options: ["a) color", "b) size", "c) price"],
        answerIndex: 0
      },
      {
        sentence: "2. The T-shirt costs ___ baht.",
        options: ["a) 150", "b) 250", "c) 350"],
        answerIndex: 1
      },
      {
        sentence: "3. Joy wants to ___ the T-shirt on.",
        options: ["a) return", "b) try", "c) take"],
        answerIndex: 1
      },
      {
        sentence: "4. Joy says the T-shirt ___ well.",
        options: ["a) looks", "b) feels", "c) fits"],
        answerIndex: 2
      },
      {
        sentence: "5. Tara asks Joy if she wants to look at the ___.",
        options: ["a) shoes", "b) bags", "c) hats"],
        answerIndex: 0
      }
    ],
    activity4: {
      partATitle: "A. Listen and Repeat",
      partAInstruction: "Listen to each sentence and repeat it aloud.",
      partA: [
        "How much is this T-shirt?",
        "I like the color.",
        "Can I try it on?",
        "It fits well.",
        "I'll buy it."
      ],
      partB: {
        title: "B. Answer the Questions",
        instruction: "Listen to each question. Pause the audio and answer aloud using your own ideas.",
        items: [
          {
            question: "What clothes do you like to wear?",
            sample: "I like to wear T-shirts and jeans.",
            keywords: ["like", "wear", "T-shirt", "T-shirts", "jeans", "shorts", "dress", "shirt", "skirt", "pants"]
          },
          {
            question: "What is your favorite color for clothes?",
            sample: "My favorite color is pink.",
            keywords: ["favorite", "color", "is", "pink", "blue", "black", "white", "red", "green", "yellow"]
          },
          {
            question: "Where do you usually buy clothes?",
            sample: "I usually buy clothes at the shopping mall.",
            keywords: ["buy", "clothes", "shopping", "mall", "market", "online", "store", "shop"]
          },
          {
            question: "How much money do you usually spend on your clothes?",
            sample: "I usually spend 200 baht on my clothes.",
            keywords: ["spend", "baht", "hundred", "two", "three", "five", "clothes", "money", "usually"]
          }
        ]
      }
    }
  },

  // =========================================================================
  // UNIT 12: Going to the Concert Hall
  // =========================================================================
  {
    id: 12,
    title: "Unit 12: Going to the Concert Hall",
    titleTh: "บทที่ 12: การเดินทางไปฮอลล์คอนเสิร์ต",
    themeIcon: "🚌",
    learningGoals: [
      "Understand a simple conversation about traveling to a place.",
      "Identify details about transportation, destinations, and travel time.",
      "Talk about transportation and how to get to different places."
    ],
    vocabulary: [
      { word: "bus", meaning: "รถโดยสารประจำทาง", example: "I go to school by bus." },
      { word: "next to", meaning: "อยู่ถัดจาก", example: "The library is next to the school." },
      { word: "supermarket", meaning: "ซุปเปอร์มาร์เก็ต", example: "I go to the supermarket with my mom." },
      { word: "ticket", meaning: "ตั๋ว", example: "I need a train ticket." },
      { word: "stop", meaning: "ป้ายจอดรถ", example: "Get off at the next bus stop." },
      { word: "arrive", meaning: "มาถึง", example: "We arrive at school at eight." },
      { word: "on time", meaning: "ตรงเวลา", example: "The bus arrives on time." }
    ],
    activity1: {
      type: "conversation",
      heading: "Listen to a Conversation",
      headingTh: "ฟังบทสนทนาการเดินทางไป Concert Hall (เสียงชาย Max / เสียงหญิง Nina)",
      title: "Going to the Concert Hall",
      passage: "Max: How are we going to the concert hall, Nina?\nNina: Let's take the bus. It's easy.\nMax: Where is the bus stop?\nNina: It's next to the supermarket.\nMax: How long does it take to get there?\nNina: About twenty minutes.\nMax: Great! Do we need tickets?\nNina: Yes. We can buy them on the bus.\nMax: OK. Let's go! I hope we arrive on time.\nNina: Wait! I need to get my bag first.",
      phrases: [
        "Max: How are we going to the concert hall, Nina?",
        "Nina: Let's take the bus. It's easy.",
        "Max: Where is the bus stop?",
        "Nina: It's next to the supermarket.",
        "Max: How long does it take to get there?",
        "Nina: About twenty minutes.",
        "Max: Great! Do we need tickets?",
        "Nina: Yes. We can buy them on the bus.",
        "Max: OK. Let's go! I hope we arrive on time.",
        "Nina: Wait! I need to get my bag first."
      ]
    },
    activity2: [
      {
        question: "What are Max and Nina planning to do?",
        options: ["a) Go to the concert hall", "b) Buy food at the supermarket", "c) Visit a friend at home"],
        answerIndex: 0
      },
      {
        question: "Why do they choose the bus?",
        options: ["a) It is very expensive.", "b) It is easy to get there by bus.", "c) It is slower than walking."],
        answerIndex: 1
      },
      {
        question: "What does Nina need to do before leaving?",
        options: ["a) Buy a ticket", "b) Find the bus stop", "c) Get her bag"],
        answerIndex: 2
      }
    ],
    activity3: [
      {
        sentence: "1. Max and Nina are going to the ___.",
        options: ["a) city center", "b) airport", "c) concert hall"],
        answerIndex: 2
      },
      {
        sentence: "2. They decide to take the ___.",
        options: ["a) train", "b) bus", "c) taxi"],
        answerIndex: 1
      },
      {
        sentence: "3. The bus stop is next to the ___.",
        options: ["a) school", "b) park", "c) supermarket"],
        answerIndex: 2
      },
      {
        sentence: "4. The trip takes about ___ minutes.",
        options: ["a) twenty", "b) thirty", "c) forty"],
        answerIndex: 0
      },
      {
        sentence: "5. They can buy their tickets ___.",
        options: ["a) at home", "b) on the bus", "c) at the supermarket"],
        answerIndex: 1
      }
    ],
    activity4: {
      partATitle: "A. Listen and Repeat",
      partAInstruction: "Listen to each sentence and repeat it aloud.",
      partA: [
        "How are we going to the concert hall?",
        "Let's take the bus.",
        "Where is the bus stop?",
        "How long does it take to get there?",
        "We can buy the tickets on the bus."
      ],
      partB: {
        title: "B. Answer the Questions",
        instruction: "Listen to each question. Pause the audio and answer aloud using your own ideas.",
        items: [
          {
            question: "How would you get from your home to school?",
            sample: "I would take a bus.",
            keywords: ["would", "take", "go", "walk", "bus", "car", "train", "bike", "motorcycle"]
          },
          {
            question: "What place would you like to go in your town?",
            sample: "I would like to go to the bookstore.",
            keywords: ["would", "like", "go", "to", "bookstore", "bookshop", "park", "mall", "cafe", "cinema", "market"]
          },
          {
            question: "How would you get there?",
            sample: "I would walk.",
            keywords: ["would", "walk", "take", "by", "bus", "car", "train", "taxi", "bike", "motorcycle"]
          },
          {
            question: "When would you go there?",
            sample: "I would go this Friday.",
            keywords: ["would", "go", "on", "this", "friday", "saturday", "sunday", "weekend", "tomorrow", "after school", "morning", "afternoon"]
          }
        ]
      }
    }
  }
];
