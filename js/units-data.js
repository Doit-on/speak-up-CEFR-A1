/**
 * Speak Up: Listening and Speaking Exercises (CEFR A1)
 * Complete 12 Units Dataset — Extracted from "Speak Up A1.pdf"
 * Version: 1.0.0
 */

window.SPEAKUP_UNITS = [
  // =========================================================================
  // UNIT 1: My Daily Routine
  // =========================================================================
  {
    id: 1,
    title: "Unit 1: My Daily Routine",
    titleTh: "บทที่ 1: กิจวัตรประจำวันของฉัน",
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
      headingTh: "ฟังเรื่องราวของ Ben (ฟังให้จบก่อนจึงจะเห็นบทอ่านสีแดง)",
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
      partA: [
        "I get up at seven o'clock.",
        "I brush my teeth.",
        "I have breakfast with my family.",
        "I go to school at eight o'clock.",
        "I go to bed at nine thirty."
      ],
      partB: {
        instruction: "Listen to the questions and sample answers then give your own answers.",
        items: [
          {
            question: "What time do you get up?",
            sample: "I get up at six o'clock.",
            keywords: ["get up", "at", "o'clock", "six", "seven", "five", "eight", "morning"]
          },
          {
            question: "What do you do after school?",
            sample: "I do my homework after school.",
            keywords: ["I", "after school", "homework", "play", "watch", "read", "games"]
          },
          {
            question: "What time do you go to bed?",
            sample: "I go to bed at ten.",
            keywords: ["go to bed", "at", "nine", "ten", "eight", "eleven", "thirty", "o'clock"]
          }
        ]
      },
      partC: {
        title: "My Daily Routine",
        instruction: "Talk about your daily routine in 3–4 sentences.",
        prompts: [
          "I get up at ...",
          "I have breakfast at ...",
          "I go to school at ...",
          "I go to bed at ..."
        ],
        items: [
          {
            situation: "Talk about your daily routine in 3–4 sentences.",
            sample: "I get up at six thirty. I have breakfast at seven. I go to school at eight. I go to bed at ten.",
            keywords: ["get up", "breakfast", "school", "bed", "at"]
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
      headingTh: "ฟังบทสนทนาระหว่าง Emma และ Jack (ฟังจบจึงแสดงตัวอักษรสีแดง)",
      title: "A New Friend",
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
      partA: [
        "Hi! My name is Emma.",
        "What's your name?",
        "Nice to meet you.",
        "How old are you?",
        "Let's be friends!"
      ],
      partB: {
        instruction: "Listen to the questions and sample answers then give your own answers.",
        items: [
          {
            question: "What's your name?",
            sample: "My name is May.",
            keywords: ["my", "name", "is", "I'm", "am"]
          },
          {
            question: "How old are you?",
            sample: "I'm twelve years old.",
            keywords: ["I'm", "am", "years", "old", "twelve", "thirteen", "eleven", "ten"]
          },
          {
            question: "What class are you in?",
            sample: "I'm in grade 1.",
            keywords: ["in", "class", "grade", "one", "two", "three"]
          }
        ]
      },
      partC: {
        title: "Mini Conversation — Speak by Yourself",
        instruction: "Imagine you are meeting a new friend. Listen to the questions and answer aloud. Use your own information.",
        prompts: [
          "Q1: Hi! What's your name?",
          "Q2: Nice to meet you! How old are you?",
          "Q3: What class are you in?",
          "Q4: Nice! Let's be friends!"
        ],
        items: [
          {
            situation: "Question 1: Hi! What's your name?",
            sample: "Hi! My name is Alex. Nice to meet you.",
            keywords: ["name", "hi", "hello", "my", "is"]
          },
          {
            situation: "Question 2: Nice to meet you! How old are you?",
            sample: "Nice to meet you too! I am twelve years old.",
            keywords: ["old", "years", "am", "twelve", "thirteen", "nice"]
          },
          {
            situation: "Question 3: What class are you in?",
            sample: "I am in class 1.",
            keywords: ["class", "grade", "in", "am"]
          },
          {
            situation: "Question 4: Nice! Let's be friends!",
            sample: "Great! Let's be friends!",
            keywords: ["great", "sure", "friends", "yes", "ok"]
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
      headingTh: "ฟังเกร็ดความรู้เรื่องสัตว์ (ฟังจบจึงแสดงตัวอักษรสีแดง)",
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
        sentence: "3. Bats can find their way in the ___.",
        options: ["a) water", "b) forest", "c) dark"],
        answerIndex: 2
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
      partA: [
        "An octopus can change its color.",
        "Bats can find their way in the dark.",
        "Bats use sounds.",
        "Geckos can climb walls.",
        "Their feet can stick to surfaces."
      ],
      partB: {
        instruction: "Listen to the question and answer aloud.",
        items: [
          {
            question: "What can an octopus do?",
            sample: "An octopus can change its color to hide from danger.",
            keywords: ["octopus", "can", "change", "color", "hide"]
          },
          {
            question: "How do bats find their way in the dark?",
            sample: "Bats use sounds to find their way in the dark.",
            keywords: ["bats", "use", "sounds", "sound", "dark", "find"]
          },
          {
            question: "What can geckos do?",
            sample: "Geckos can climb walls and stick to surfaces.",
            keywords: ["geckos", "can", "climb", "walls", "stick", "surfaces"]
          }
        ]
      },
      partC: {
        title: "Mini Challenge: My Animal Superpower",
        instruction: "Choose an animal and speak three sentences about its special ability.",
        prompts: [
          "My animal is a/an ___.",
          "It can ___.",
          "It uses this ability to ___."
        ],
        items: [
          {
            situation: "Choose an animal and speak three sentences about its special ability.",
            sample: "My animal is an octopus. It can change its color. It uses this ability to hide from danger.",
            keywords: ["animal", "can", "ability", "octopus", "bat", "gecko", "hide", "climb"]
          }
        ]
      }
    }
  },

  // =========================================================================
  // UNIT 4: My Family
  // =========================================================================
  {
    id: 4,
    title: "Unit 4: My Family",
    titleTh: "บทที่ 4: ครอบครัวของฉัน",
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
      headingTh: "ฟังเรื่องครอบครัวของ Troy (ฟังจบจึงแสดงตัวอักษรสีแดง)",
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
      partA: [
        "I live with my parents.",
        "We spend time together on weekends.",
        "My sister and I ride our bikes.",
        "We sometimes watch a movie at home.",
        "We enjoy having dinner together."
      ],
      partB: {
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
            keywords: ["we", "usually", "together", "watch", "eat", "go", "play", "park", "movies"]
          },
          {
            question: "What is your favorite family activity?",
            sample: "My favorite family activity is eating out.",
            keywords: ["favorite", "activity", "eating", "watching", "playing", "cooking", "dinner"]
          }
        ]
      },
      partC: {
        title: "Mini Challenge: My Family Time",
        instruction: "Speak for 3–4 sentences about your family. Use the sentence starters to help you.",
        prompts: [
          "I live with ...",
          "On weekends, we usually ...",
          "We enjoy ...",
          "I like spending time with my family because ..."
        ],
        items: [
          {
            situation: "Speak for 3–4 sentences about your family.",
            sample: "I live with my parents and my younger brother. On weekends, we usually eat out. We enjoy watching movies together. I like spending time with my family because we have fun.",
            keywords: ["live", "with", "weekends", "enjoy", "family", "because", "fun"]
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
      headingTh: "ฟังบทสนทนาระหว่าง Sara และ Dan ที่ร้าน Sunny Café (ฟังจบแล้วกดปุ่มเพื่อแสดงเนื้อหา)",
      title: "After-School Café",
      passage: "Sara: Hi, Dan! Welcome to Sunny Café. Here's the menu.\nDan: Thanks, Sara. Can I have a cheese sandwich and a lemonade, please?\nSara: Sure. Anything else?\nDan: No, that's all for me. What would you like, Sara?\nSara: I'd like a chocolate cake and an iced tea, please.\nDan: All right. That's one sandwich, one lemonade, one cake, and one iced tea. How much is it?\nSara: It's 150 baht altogether.\nDan: Here you are.\nSara: Thank you! Our order will be ready soon.",
      phrases: [
        "Sara: Hi, Dan! Welcome to Sunny Café. Here's the menu.",
        "Dan: Thanks, Sara. Can I have a cheese sandwich and a lemonade, please?",
        "Sara: Sure. Anything else?",
        "Dan: No, that's all for me. What would you like, Sara?",
        "Sara: I'd like a chocolate cake and an iced tea, please.",
        "Dan: All right. That's one sandwich, one lemonade, one cake, and one iced tea. How much is it?",
        "Sara: It's 150 baht altogether.",
        "Dan: Here you are.",
        "Sara: Thank you! Our order will be ready soon."
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
        question: "What do Dan and Sara order altogether?",
        options: ["a) Only two cups of coffee", "b) Burgers and french fries", "c) A sandwich, a lemonade, a cake, and an iced tea"],
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
        sentence: "4. Sara asks, \"Anything ___?\"",
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
      partA: [
        "Can I have a lemonade, please?",
        "I'd like a sandwich, please.",
        "Anything else?",
        "That's all, thank you.",
        "How much is it?"
      ],
      partB: {
        instruction: "Listen to each question. Pause the audio and answer aloud using your own ideas.",
        items: [
          {
            question: "What would you like to drink?",
            sample: "I'd like an iced tea, please.",
            keywords: ["like", "have", "iced tea", "lemonade", "water", "milk", "juice", "please"]
          },
          {
            question: "What snack would you like to order?",
            sample: "I'd like a chocolate cake, please.",
            keywords: ["like", "cake", "sandwich", "bread", "cookie", "please"]
          },
          {
            question: "How much money do you have for a snack and a drink?",
            sample: "I have 100 baht.",
            keywords: ["have", "baht", "hundred", "fifty", "twenty"]
          }
        ]
      },
      partC: {
        title: "Mini Challenge: Ask Questions at a Café",
        instruction: "Imagine you are at a café. Listen to each situation, then make a question and say it aloud.",
        prompts: [
          "1. Ask the price of a sandwich -> How much is the sandwich?",
          "2. Ask what drinks are available -> What drinks do you have?",
          "3. Ask to see the menu -> Can I see the menu, please?"
        ],
        items: [
          {
            situation: "1. You want to know the price of a sandwich. (Server: The sandwich is 100 baht.)",
            sample: "How much is the sandwich?",
            keywords: ["how", "much", "is", "sandwich"]
          },
          {
            situation: "2. You want to know what drinks are available. (Server: We have orange juice and lemonade.)",
            sample: "What drinks do you have?",
            keywords: ["what", "drinks", "do", "you", "have"]
          },
          {
            situation: "3. You want to know if you can see the menu. (Server: Here is the menu.)",
            sample: "Can I see the menu, please?",
            keywords: ["can", "see", "menu", "please"]
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
      headingTh: "ฟังเกร็ดความรู้เรื่องสภาพอากาศรอบโลก (ฟังจบจึงแสดงตัวอักษรสีแดง)",
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
      partA: [
        "The weather is hot and sunny.",
        "It is freezing outside.",
        "It often rains in my city.",
        "The temperature is 30 degrees.",
        "My favorite season is winter."
      ],
      partB: {
        instruction: "Listen to each question. Pause the audio and answer aloud using your own ideas.",
        items: [
          {
            question: "What's the weather like today?",
            sample: "It's hot and sunny today.",
            keywords: ["it's", "it", "is", "hot", "sunny", "rainy", "cold", "warm", "cloudy", "today"]
          },
          {
            question: "What's your favorite season?",
            sample: "My favorite season is winter.",
            keywords: ["favorite", "season", "is", "winter", "summer", "rainy", "spring"]
          },
          {
            question: "What do you usually do on rainy days?",
            sample: "I usually stay home and watch movies.",
            keywords: ["stay", "home", "watch", "read", "sleep", "play", "usually"]
          }
        ]
      },
      partC: {
        title: "Mini Challenge: Talk About the Weather",
        instruction: "Speak for 3–4 sentences about the weather in your city.",
        prompts: [
          "The weather in my city is ...",
          "I have to wear ...",
          "I like to ..."
        ],
        items: [
          {
            situation: "Speak for 3–4 sentences about the weather in your city.",
            sample: "The weather in my city is very hot in the summer. I have to wear a T-shirt and shorts. I like to stay inside until the evening.",
            keywords: ["weather", "city", "hot", "cold", "wear", "like"]
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
      headingTh: "ฟังเรื่องกีฬาบาสเกตบอลหลังเลิกเรียน (ฟังจบจึงแสดงตัวอักษรสีแดง)",
      title: "Basketball After School",
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
      partA: [
        "My favorite sport is basketball.",
        "I play with my friends.",
        "Sometimes we win, and sometimes we lose.",
        "I can try again.",
        "Sports help me stay healthy."
      ],
      partB: {
        instruction: "Listen to each question. Pause the audio and answer aloud using your own ideas.",
        items: [
          {
            question: "What's your favorite sport?",
            sample: "My favorite sport is football.",
            keywords: ["favorite", "sport", "is", "football", "basketball", "swimming", "tennis", "badminton"]
          },
          {
            question: "Who do you play sports with?",
            sample: "I play sports with my friends.",
            keywords: ["play", "with", "friends", "family", "brother", "classmates"]
          },
          {
            question: "When do you play this sport?",
            sample: "I usually play it on Saturday.",
            keywords: ["play", "on", "after school", "weekend", "saturday", "sunday", "every"]
          }
        ]
      },
      partC: {
        title: "Mini Challenge: Guess the Sport",
        instruction: "Listen to each clue and guess the sport. Pause the audio and say your answer aloud.",
        prompts: [
          "Clue 1: Kick a ball and score goals -> Football",
          "Clue 2: Use a racket to hit a small ball over a net -> Tennis",
          "Clue 3: Go in a pool and move through the water -> Swimming"
        ],
        items: [
          {
            situation: "1. You use your feet to kick a ball. You try to score goals.",
            sample: "Football! My answer is football.",
            keywords: ["football", "soccer"]
          },
          {
            situation: "2. You use a racket to hit a small ball over a net.",
            sample: "Tennis! My answer is tennis.",
            keywords: ["tennis", "badminton"]
          },
          {
            situation: "3. You go in a pool and move your arms and legs through the water.",
            sample: "Swimming! My answer is swimming.",
            keywords: ["swimming", "swim"]
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
      headingTh: "ฟังบทสนทนาการถามทางไปร้านหนังสือ (ฟังจบจึงแสดงตัวอักษรสีแดง)",
      title: "Giving Direction",
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
      partA: [
        "Excuse me. Can you help me?",
        "I'm looking for the bookshop.",
        "Go straight ahead.",
        "Turn left at the corner.",
        "Thank you for your help!"
      ],
      partB: {
        instruction: "Listen to each question. Pause the audio and answer aloud using your own ideas.",
        items: [
          {
            question: "Is there a café near your school?",
            sample: "Yes, there is.",
            keywords: ["yes", "no", "there", "is", "near", "school"]
          },
          {
            question: "How do you usually get to school?",
            sample: "I go to school by bus.",
            keywords: ["go", "school", "by", "bus", "car", "walk", "train"]
          },
          {
            question: "What place do you often go on weekends?",
            sample: "I often go to the shopping mall.",
            keywords: ["go", "to", "park", "mall", "shopping", "café", "library"]
          }
        ]
      },
      partC: {
        title: "Mini Challenge: Help a Visitor!",
        instruction: "Listen to each situation. Imagine you are a local person helping a visitor. Pause the audio and give directions aloud.",
        prompts: [
          "1. Library -> The library is next to the school.",
          "2. Park -> The park is across from the café.",
          "3. Train station -> The train station is about a ten-minute walk."
        ],
        items: [
          {
            situation: "1. A visitor wants to go to the library. It is next to the school. Tell the visitor where it is.",
            sample: "The library is next to the school.",
            keywords: ["library", "next", "to", "school"]
          },
          {
            situation: "2. A visitor is at the café and wants to go to the park. The park is across from the café. Explain where to go.",
            sample: "The park is across from the café.",
            keywords: ["park", "across", "from", "café"]
          },
          {
            situation: "3. A visitor asks if the train station is far away. It takes ten minutes to walk there.",
            sample: "The train station is about a ten-minute walk.",
            keywords: ["train", "station", "ten", "minute", "walk"]
          }
        ]
      }
    }
  },

  // =========================================================================
  // UNIT 9: Healthy Food
  // =========================================================================
  {
    id: 9,
    title: "Unit 9: Healthy Food",
    titleTh: "บทที่ 9: อาหารเพื่อสุขภาพ",
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
      headingTh: "ฟังเกร็ดความรู้เรื่องอาหารเพื่อสุขภาพ (ฟังจบจึงแสดงตัวอักษรสีแดง)",
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
      partA: [
        "Fruit and vegetables are healthy.",
        "Food gives us energy.",
        "I drink milk every day.",
        "I like fresh fruit.",
        "A healthy meal helps me stay active."
      ],
      partB: {
        instruction: "Listen to each question. Pause the audio and answer aloud using your own ideas.",
        items: [
          {
            question: "What's your favorite fruit?",
            sample: "My favorite fruit is mango.",
            keywords: ["favorite", "fruit", "is", "mango", "apple", "banana", "orange", "watermelon"]
          },
          {
            question: "What do you usually eat for breakfast?",
            sample: "I usually eat eggs and bread.",
            keywords: ["eat", "eggs", "bread", "rice", "milk", "breakfast", "usually"]
          },
          {
            question: "What do you drink when you're thirsty?",
            sample: "I drink water.",
            keywords: ["drink", "water", "juice", "milk"]
          }
        ]
      },
      partC: {
        title: "Mini Challenge: Plan a Healthy Lunch",
        instruction: "Talk about what you like to eat and why you like them in 3–4 sentences.",
        prompts: [
          "I like to eat ... for lunch.",
          "I like them because ...",
          "Sometimes I have ... after lunch."
        ],
        items: [
          {
            situation: "Talk about what you like to eat and why you like them in 3–4 sentences.",
            sample: "I like to eat rice and fried eggs for lunch. I like them because they are delicious and healthy. Sometimes I have some fruits after lunch.",
            keywords: ["like", "eat", "lunch", "because", "healthy", "delicious", "fruit", "rice"]
          }
        ]
      }
    }
  },

  // =========================================================================
  // UNIT 10: Free Time Activities
  // =========================================================================
  {
    id: 10,
    title: "Unit 10: Free Time Activities",
    titleTh: "บทที่ 10: กิจกรรมยามว่าง",
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
      headingTh: "ฟังเรื่องกิจกรรมยามว่างของ Lily (ฟังจบจึงแสดงตัวอักษรสีแดง)",
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
      partA: [
        "I like listening to music.",
        "I read comics after school.",
        "Drawing pictures is fun.",
        "I enjoy taking photos.",
        "Free time helps me relax."
      ],
      partB: {
        instruction: "Listen to each question. Pause the audio and answer aloud using your own ideas.",
        items: [
          {
            question: "What do you like doing in your free time?",
            sample: "I like playing games.",
            keywords: ["like", "playing", "games", "drawing", "reading", "listening", "music", "photos"]
          },
          {
            question: "When do you usually do your favorite activity?",
            sample: "I usually play games after school.",
            keywords: ["usually", "after school", "weekend", "evening", "free time"]
          },
          {
            question: "Who do you enjoy spending your free time with?",
            sample: "I enjoy spending time with my friends.",
            keywords: ["enjoy", "with", "friends", "family", "brother", "sister"]
          }
        ]
      },
      partC: {
        title: "Mini Challenge: Guess the Hobby",
        instruction: "Listen to each clue. Pause and say the name of the hobby aloud.",
        prompts: [
          "1. Pencil and paper to make pictures -> Drawing",
          "2. Use your phone to capture pictures -> Taking photos",
          "3. Use a controller or keyboard to play on a screen -> Playing games"
        ],
        items: [
          {
            situation: "1. You use a pencil and paper to make pictures.",
            sample: "Drawing! My hobby is drawing.",
            keywords: ["drawing", "draw"]
          },
          {
            situation: "2. You use your phone to capture pictures of people or places.",
            sample: "Taking photos!",
            keywords: ["taking", "photos", "photo", "pictures"]
          },
          {
            situation: "3. You use a controller or keyboard to play on a screen.",
            sample: "Playing games!",
            keywords: ["playing", "games", "game"]
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
      headingTh: "ฟังบทสนทนาการเลือกซื้อเสื้อยืด (ฟังจบจึงแสดงตัวอักษรสีแดง)",
      title: "Buying a T-shirt",
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
      partA: [
        "How much is this T-shirt?",
        "I like the color.",
        "Can I try it on?",
        "It fits well.",
        "I'll buy it."
      ],
      partB: {
        instruction: "Listen to each question. Pause the audio and answer aloud using your own ideas.",
        items: [
          {
            question: "What clothes do you like to wear?",
            sample: "I like to wear T-shirts and jeans.",
            keywords: ["like", "wear", "T-shirt", "T-shirts", "jeans", "shorts", "dress", "shirt"]
          },
          {
            question: "What is your favorite color for clothes?",
            sample: "My favorite color is pink.",
            keywords: ["favorite", "color", "is", "pink", "blue", "black", "white", "red", "green"]
          },
          {
            question: "Where do you usually buy clothes?",
            sample: "I usually buy clothes at the shopping mall.",
            keywords: ["buy", "clothes", "shopping", "mall", "market", "online"]
          }
        ]
      },
      partC: {
        title: "Mini Challenge: Ask Questions in a Clothes Shop",
        instruction: "Listen to each situation. Pause and make a question aloud.",
        prompts: [
          "1. Price of a jacket -> How much is this jacket?",
          "2. Smaller size -> Do you have a smaller size?",
          "3. Fitting room location -> Where is the fitting room?"
        ],
        items: [
          {
            situation: "1. You want to know the price of a jacket.",
            sample: "How much is this jacket?",
            keywords: ["how", "much", "is", "this", "jacket"]
          },
          {
            situation: "2. You want to know if the shop has a smaller size.",
            sample: "Do you have a smaller size?",
            keywords: ["do", "you", "have", "smaller", "size"]
          },
          {
            situation: "3. You want to know where the fitting room is.",
            sample: "Where is the fitting room?",
            keywords: ["where", "is", "fitting", "room"]
          }
        ]
      }
    }
  },

  // =========================================================================
  // UNIT 12: Getting Around Town
  // =========================================================================
  {
    id: 12,
    title: "Unit 12: Getting Around Town",
    titleTh: "บทที่ 12: การเดินทางในเมือง",
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
      headingTh: "ฟังบทสนทนาการเดินทางไป Concert Hall (ฟังจบจึงแสดงตัวอักษรสีแดง)",
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
      partA: [
        "How are we going to the concert hall?",
        "Let's take the bus.",
        "Where is the bus stop?",
        "How long does it take to get there?",
        "We can buy the tickets on the bus."
      ],
      partB: {
        instruction: "Listen to each question. Pause the audio and answer aloud using your own ideas.",
        items: [
          {
            question: "How do you usually go to school?",
            sample: "I usually walk to school.",
            keywords: ["walk", "bus", "car", "train", "bike", "school", "usually"]
          },
          {
            question: "What place would you like to visit by bus?",
            sample: "I'd like to go to the bookstore by bus.",
            keywords: ["like", "go", "to", "park", "bookstore", "mall", "by", "bus"]
          },
          {
            question: "Who do you usually travel with?",
            sample: "I usually travel with my family.",
            keywords: ["travel", "with", "family", "friends", "parents", "usually"]
          }
        ]
      },
      partC: {
        title: "Mini Challenge: Choose Your Transportation",
        instruction: "Listen to each situation. Pause and say which transportation you would choose.",
        prompts: [
          "1. Long distance between two cities -> I'd take a train.",
          "2. A shop near your home -> I'd walk.",
          "3. Travel around town without driving -> I'd take the bus."
        ],
        items: [
          {
            situation: "1. You need to travel a long distance between two cities.",
            sample: "I'd take a train.",
            keywords: ["take", "train", "airplane", "bus"]
          },
          {
            situation: "2. You want to go to a shop near your home.",
            sample: "I'd walk.",
            keywords: ["walk", "bike", "bicycle"]
          },
          {
            situation: "3. You want to travel around town without driving.",
            sample: "I'd take the bus.",
            keywords: ["take", "bus", "taxi", "train"]
          }
        ]
      }
    }
  }
];
