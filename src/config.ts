export interface TimelineItem {
  id: string;
  date: string;
  title: string;
  location?: string;
  description: string;
  imageUrl: string;
  badge?: string;
}

export interface GalleryPhoto {
  id: string;
  imageUrl: string;
  isVideo?: boolean; // Set to true if imageUrl or videoUrl points to a video file or video link
  videoUrl?: string; // Optional separate video URL
  title: string;
  date: string;
  location: string;
  caption: string;
  rotation: number; // degrees for Polaroid aesthetic
}

export interface LoveReason {
  id: string;
  number: number;
  title: string;
  description: string;
  iconName: string;
}

export interface BucketListItem {
  id: string;
  text: string;
  category: string;
  completed: boolean;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  wrongResponse: string;
  correctResponse: string;
}

export const STORY_CONFIG = {
  // Secret Password
  password: "muddulu",
  passwordHint: "It's what I call you the most ❤️",
  
  // Names & Nicknames
  recipientName: "Sid",
  senderName: "Maha",
  nicknames: [
    "Muddulu",
    "Chittikuna",
    "Bangaru",
    "My Home",
    "My Safe Place",
    "My Forever"
  ],

  // Audio Configuration
  spotifyUrl: "https://open.spotify.com/track/1mEpeKvjH9T6acliz2GI3D?si=05aae00974d14737", // Customizable track/playlist
  audioTrackUrl: "https://upload.wikimedia.org/wikipedia/commons/2/21/Chopin_-_Nocturne_Op_9_No_2_E_flat_major.mp3", // Smooth Romantic Piano (Chopin)
  romanticTracks: [
    { title: "Chopin - Nocturne Op. 9 No. 2", url: "https://upload.wikimedia.org/wikipedia/commons/2/21/Chopin_-_Nocturne_Op_9_No_2_E_flat_major.mp3" },
    { title: "Debussy - Clair de Lune", url: "https://upload.wikimedia.org/wikipedia/commons/d/d4/Debussy_-_Clair_de_lune_%28performed_by_Laurens_Goedhart%29.mp3" },
    { title: "Pachelbel - Canon in D (Acoustic Guitar)", url: "https://upload.wikimedia.org/wikipedia/commons/b/b5/Canon_in_D_major_Pachelbel_Guitar.mp3" }
  ],
  
  // Chapter 4: Love Letter
  loveLetter: {
    title: "To My Dearest wifey,",
    paragraphs: [
      "My Muddulu, nuvvu na jeevitam loki ochintarvata ,prati moment ni i started loving, enjoying, and living it with you . Nuvvu na life lo ki ochaka its been totally upside roller-coaster.",
      "You were the best DECISION and the RISK i have taken in my life kanna. You were literally the Lucky charm in my life.",
      "You have this soft, effortless way of bringing peace and war into my world. In your laughter, In your Anger, you voice was my favorite song. In your warmth, I found my safest home.",
      "Thank you for being my constant, my sweetest distraction, my Chittikuna, always being by My side. On this Girlfriend's Day and every day that follows, I promise to choose you, cherish you, and hold you close.",
      "No matter where life takes us, my heart will always belong right beside and inside you."
    ],
    closing: "Forever and always,",
    signature: "Love, Maha ❤️"
  },

  // Chapter 5: Relationship Timeline
  timeline: [
    {
      id: "t1",
      date: "The First Spark ✨",
      title: "Where It All Began",
      location: "Mehdipatnam Traffic",
      description: "The moment our eyes and lips met and time seemed to pause. I knew right then that you were going to be with me and change my life forever.",
      imageUrl: "https://drive.google.com/file/d/1PEyB1yQ3IqTF-4Fu8p9nXtApKNJuHTvo/view?usp=sharing",
      badge: "Chapter I"
    },
    {
      id: "t2",
      date: "First Date",
      title: "How did we Love each other",
      location: "Punjagutta Galleria Mall",
      description: "I cam to you scared that you might SUE me but those moments escalated and made us close and love each other",
      imageUrl: "https://drive.google.com/file/d/1CpjvFgNWBiRa5uvXrTm6QsEx1pow0VJQ/view?usp=sharing",
      badge: "Chapter II"
    },
    {
      id: "t3",
      date: "Our First Adventure 🌅",
      title: "Chasing the sunset Together",
      location: "Chirala",
      description: "Holding your hand with the ocean breeze in our hair. You smiled, and the whole world turned into pure gold.",
      imageUrl: "https://drive.google.com/file/d/1WZTmc-f4dTYHLww6GYi75J4mGBH0s9vi/view?usp=sharing",
      badge: "Chapter III"
    },
    {
      id: "t4",
      date: "Today & Forever ❤️",
      title: "Happy Girlfriend's Day!",
      location: "In Each Other's Arms",
      description: "Celebrating you—my Muddulu, my Chittikuna, my Bangaru. This is just the beginning of our endless journey together.",
      imageUrl: "https://drive.google.com/file/d/1q7NF8dXjUm4igjcW0d0k1bWXkq9Smo8C/view?usp=sharing",
      badge: "Forever"
    }
  ] as TimelineItem[],

  // Chapter 6: Photo Gallery
  gallery: [
    {
      id: "g1",
      videoUrl: "/v1.mp4",
      imageUrl: "/mem2.jpg",
      isVideo: true,
      title: "Pure Joy",
      date: "Magic Happens with you",
      location: "On your birthday",
      caption: "Your smile lights up my darkest days.",
      rotation: -3
    },
    {
      id: "g2",
      videoUrl: "/v2.mp4",
      imageUrl: "/mem3.jpg",
      isVideo: true,
      title: "Golden Hour Glow",
      date: "I love to kiss you always",
      location: "us everytime when no one is seeing",
      caption: "Nothing compares to watching the sky turn pink with you.",
      rotation: 2
    },
    {
      id: "g3",
      videoUrl: "/v3.mp4",
      imageUrl: "/mem4.jpg",
      isVideo: true,
      title: "You being yourself",
      date: "Coffee & Giggles",
      location: "cooking time",
      caption: "How your one move can change any of my mode to happy and lovely",
      rotation: -2
    },
    {
      id: "g4",
      videoUrl: "/v4.mp4",
      imageUrl: "/mem5.jpg",
      isVideo: true,
      title: "Our First Ramp walk together",
      date: "College first Year",
      location: "SRK forever , just like how we say Jawan hehe",
      caption: "This was my best memory i couldnt forget .",
      rotation: 4
    },
    {
      id: "g5",
      videoUrl: "/v5.mp4",
      imageUrl: "/mem6.jpg",
      isVideo: true,
      title: "My Saheba",
      date: "Edits",
      location: "i love you my saheba",
      caption: "Our first 365 Days together , i wished life could be slow so that i can spend more time with you ",
      rotation: -1
    },
    {
      id: "g6",
      videoUrl: "/v6.mp4",
      imageUrl: "/mem7.jpg",
      isVideo: true,
      title: "GirlFriends Day",
      date: "POSTER",
      location: "for my muddulu",
      caption: "The fastest poster ever made with pure love.",
      rotation: 3
    }
  ] as GalleryPhoto[],

  // Memory Orb Photos (Collected during the 6-7 second loading sequence)
  memoryOrbPhotos: [
    { id: "m1", title: "Childhood Cutie", src: "/mem1.jpg" },
    { id: "m2", title: "Sweet Kiss", src: "/mem2.jpg" },
    { id: "m3", title: "Classroom Moments", src: "/mem3.jpg" },
    { id: "m4", title: "My Beautiful Saheba", src: "/mem4.jpg" },
    { id: "m5", title: "Heart Gesture", src: "/mem5.jpg" },
    { id: "m6", title: "Peaceful Sleep", src: "/mem6.jpg" },
    { id: "m7", title: "Goofy Smile", src: "/mem7.jpg" }
  ],

  // Chapter 7: Reasons I Love You
  reasons: [
    {
      id: "r1",
      number: 1,
      title: "Your my Lucky charm ",
      description: "i know i am selfish for this but i love the way how you are the lucky charm for me hehe.",
      iconName: "Heart"
    },
    {
      id: "r2",
      number: 2,
      title: "The Way You Call Me",
      description: "When you say my name 'Maha', it feels like the sweetest melody.",
      iconName: "Music"
    },
    {
      id: "r3",
      number: 3,
      title: "Your Adorable smile",
      description: "Your genuine smile instantly cures any stress or worry I ever carry, you are a literal sunshine my love.",
      iconName: "Sparkles"
    },
    {
      id: "r4",
      number: 4,
      title: "You Are My Safe Haven",
      description: "In your arms, I never have to hide who I am. You accept all of me.",
      iconName: "ShieldCheck"
    },
    {
      id: "r5",
      number: 5,
      title: "Your Little Quirks",
      description: "The cute way you act , keep cute faces suddenly acting with straight face ( i am not getting how to explain devudaaa).",
      iconName: "Smile"
    },
    {
      id: "r6",
      number: 6,
      title: "How You Care For Me",
      description: "Remembering tiny details about my day and always making sure I'm happy.",
      iconName: "Coffee"
    },
    {
      id: "r7",
      number: 7,
      title: "Our Shared Dreams",
      description: "Building our future together step by step, hand in hand.",
      iconName: "Compass"
    },
    {
      id: "r8",
      number: 8,
      title: "Simply Being You",
      description: "Because you are Bangaram, my Chittikuna, my Muddulu, and my absolute everything.",
      iconName: "Star"
    }
  ] as LoveReason[],

  // Chapter 8: Our Bucket List
  bucketList: [
    { id: "b1", text: "Travel all around the world just to sleep at hotel for some days (and roam if you have mood,hehe)", category: "Travel", completed: false },
    { id: "b2", text: "Cook a chaotic meal at midnight", category: "Fun", completed: true },
    { id: "b3", text: "Building a castle in a sunny beach day ", category: "Summer", completed: false },
    { id: "b4", text: "Adopt a little pet (first baby ) and give it a name", category: "Life", completed: true },
    { id: "b5", text: "Take a spontaneous road trip with no destination", category: "Adventure", completed: false },
    { id: "b6", text: "Dance slowly in the living room during heavy rain(must do it asap)", category: "Romance", completed: false },
    { id: "b7", text: "Travel to Paris & drink hot chocolate together", category: "Travel", completed: false },
    { id: "b8", text: "Grow old together and still hold hands like teenagers", category: "Forever", completed: false }
  ] as BucketListItem[],

  // Chapter 9: Relationship Quiz
  quiz: [
    {
      id: "q1",
      question: "What is Maha's absolute favorite thing about you?",
      options: ["Your cute smile", "Your warm heart", "Your funny jokes", "All of the above, endlessly!"],
      correctIndex: 3,
      correctResponse: "Bingo, Chittilu! I love EVERY single atom of you! ❤️",
      wrongResponse: "Close, but you know the answer is EVERYTHING about you! 😘"
    },
    {
      id: "q2",
      question: "What is the secret code word to my heart?",
      options: ["Muddulu", "Bangaru", "Chittikuna", "All of your nicknames!","Navaz","Gopal","Prabhas"],
      correctIndex: 3,
      correctResponse: "Yes! Every nickname opens my heart wider! ❤️",
      wrongResponse: "Aww, try again! Every nickname you hold unlocks my love! 💕"
    },
    {
      id: "q3",
      question: "Where is Maha's favorite place in the whole universe?",
      options: ["Paris, France", "By the Ocean", "Right beside Sid", "Under the stars"],
      correctIndex: 2,
      correctResponse: "Always beside you, my home! 🏡❤️",
      wrongResponse: "Nice try, but no destination compares to being right next to you!"
    },
    {
      id: "q4",
      question: "How long is Maha going to love you?",
      options: ["Until tomorrow", "100 years", "Forever and an eternity", "To infinity+1 "],
      correctIndex: 2,
      correctResponse: "Forever and an eternity, no doubts! ♾️❤️",
      wrongResponse: "Way longer than that! Infinite eternity! 🥰"
    }
  ] as QuizQuestion[],

  // Chapter 11: Hidden Secret Message
  secretMessage: {
    title: "You Found Our Hidden Secret Heart! 💖",
    subtitle: "A secret message just for my observant Muddulu...",
    content: "If you found this tiny heart, it proves how attentive and special you are. I want you to know that behind every line of code on this page, behind every floating petal and every song, is my deep, unwavering love for you. You make my world complete, Sid. Thank you for choosing me every day.(Sorry for delay, afternoon start chesa idhi cheyadam , anduke msg emi cheyle kanna.)",
    signature: "Yours eternally, Maha ❤️"
  },

  // Chapter 12: Digital Gift Box
  giftBox: {
    tagText: "Open Your Gift, Muddulu 🎁",
    headline: "Surprise My Love!",
    message: "Your real surprise is waiting right beside me ❤️",
    subtext: "Come give me a hug right now!(actual gift was those socks, mwwah)"
  },

  // Chapter 13: Ending Message
  ending: {
    headline: "Happy Girlfriend's Day",
    subheading: "Thank you for being my dream come true.",
    paragraphs: [
      "Thank you for every smile.",
      "Every hug.",
      "Every memory.",
      "For making my life more beautiful.",
      "I love you. Forever."
    ],
    signature: "— Maha ❤️"
  },

  // Color Constants for Reference
  colors: {
    bg: "#FFF8FC",
    primaryPink: "#FFD6E8",
    rose: "#FF8DB3",
    accent: "#E75480",
    goldAccent: "#F7D27A",
    white: "#FFFFFF",
    text: "#444444",
    darkBg: "#1A0B1A"
  }
};
