import { PrismaClient, UserRole, TaskType, BookingMode, InviteStatus } from "@prisma/client";

const prisma = new PrismaClient();

const SKILLS = ["Mixing", "Mastering", "Production", "Vocal Editing", "Sound Design"];
const GENRES = ["Hip-Hop", "R&B", "Pop", "Rock", "Electronic", "Jazz", "Country", "Indie"];

const ENGINEERS = [
  {
    name: "Marcus Rivera",
    email: "marcus@flexsession.demo",
    headline: "Grammy-nominated mixing engineer specializing in Hip-Hop & R&B",
    bio: "With over 15 years in the industry, I've worked with major labels and independent artists alike. My goal is to bring clarity and emotion to every mix, ensuring your vision comes through.",
    skills: ["Mixing", "Mastering", "Production"],
    genres: ["Hip-Hop", "R&B", "Pop"],
    hourlyRate: 15000, // $150/hr
    rushRate: 22500, // $225/hr
    city: "Los Angeles",
    country: "USA",
    credits: [
      { title: "Album: Midnight Dreams", role: "Mixing Engineer", year: 2023 },
      { title: "EP: Summer Nights", role: "Mix & Master", year: 2022 },
      { title: "Single: Echoes", role: "Producer", year: 2024 },
    ],
    samples: [
      { title: "Hip-Hop Mix Sample", url: "https://example.com/sample1.mp3" },
      { title: "R&B Master Sample", url: "https://example.com/sample2.mp3" },
    ],
  },
  {
    name: "Sarah Chen",
    email: "sarah@flexsession.demo",
    headline: "Mastering specialist with expertise in electronic & pop music",
    bio: "Precision mastering with a focus on loudness, clarity, and streaming optimization. I use state-of-the-art analog and digital tools to make your tracks shine.",
    skills: ["Mastering", "Sound Design"],
    genres: ["Electronic", "Pop", "Indie"],
    hourlyRate: 12000, // $120/hr
    rushRate: 18000, // $180/hr
    city: "New York",
    country: "USA",
    credits: [
      { title: "Album: Neon Pulse", role: "Mastering Engineer", year: 2024 },
      { title: "EP: Digital Dreams", role: "Mastering Engineer", year: 2023 },
    ],
    samples: [
      { title: "Electronic Master Sample", url: "https://example.com/sample3.mp3" },
      { title: "Pop Master Sample", url: "https://example.com/sample4.mp3" },
    ],
  },
  {
    name: "James Thompson",
    email: "james@flexsession.demo",
    headline: "Award-winning producer & mix engineer for rock and indie artists",
    bio: "Bringing raw energy and polished production to rock and indie records. I love working with bands to capture their authentic sound while elevating the mix to professional standards.",
    skills: ["Production", "Mixing", "Vocal Editing"],
    genres: ["Rock", "Indie", "Country"],
    hourlyRate: 18000, // $180/hr
    rushRate: 27000, // $270/hr
    city: "Nashville",
    country: "USA",
    credits: [
      { title: "Album: Thunder Road", role: "Producer & Mix", year: 2023 },
      { title: "Single: Wild Hearts", role: "Mixing Engineer", year: 2024 },
      { title: "EP: Broken Strings", role: "Producer", year: 2022 },
    ],
    samples: [
      { title: "Rock Mix Sample", url: "https://example.com/sample5.mp3" },
      { title: "Indie Production Sample", url: "https://example.com/sample6.mp3" },
    ],
  },
  {
    name: "Priya Sharma",
    email: "priya@flexsession.demo",
    headline: "Vocal editing specialist and pop music producer",
    bio: "Expert in vocal tuning, comping, and editing. I've worked on hundreds of pop, R&B, and electronic tracks, helping artists achieve that polished, radio-ready vocal sound.",
    skills: ["Vocal Editing", "Production", "Mixing"],
    genres: ["Pop", "R&B", "Electronic"],
    hourlyRate: 10000, // $100/hr
    rushRate: 15000, // $150/hr
    city: "Toronto",
    country: "Canada",
    credits: [
      { title: "Single: Perfect Harmony", role: "Vocal Producer", year: 2024 },
      { title: "Album: Starlight", role: "Vocal Editing", year: 2023 },
    ],
    samples: [
      { title: "Vocal Edit Sample", url: "https://example.com/sample7.mp3" },
      { title: "Pop Production Sample", url: "https://example.com/sample8.mp3" },
    ],
  },
  {
    name: "David Kim",
    email: "david@flexsession.demo",
    headline: "Multi-genre producer specializing in arrangement and feedback",
    bio: "I help artists refine their arrangements and bring fresh production ideas to their tracks. Whether you need a critical ear or creative input, I'm here to help move your music forward.",
    skills: ["Production", "Sound Design", "Mixing"],
    genres: ["Hip-Hop", "Electronic", "Jazz", "Indie"],
    hourlyRate: 14000, // $140/hr
    rushRate: 21000, // $210/hr
    city: "Austin",
    country: "USA",
    credits: [
      { title: "EP: Future Sounds", role: "Producer", year: 2024 },
      { title: "Album: Urban Jazz", role: "Co-Producer", year: 2023 },
      { title: "Single: Synthesis", role: "Sound Design", year: 2024 },
    ],
    samples: [
      { title: "Electronic Production Sample", url: "https://example.com/sample9.mp3" },
      { title: "Hip-Hop Mix Sample", url: "https://example.com/sample10.mp3" },
    ],
  },
];

const ARTISTS = [
  { name: "Alex Martinez", email: "alex@artist.demo" },
  { name: "Jordan Lee", email: "jordan@artist.demo" },
  { name: "Taylor Swift Fan", email: "taylor@artist.demo" },
  { name: "Chris Johnson", email: "chris@artist.demo" },
  { name: "Sam Williams", email: "sam@artist.demo" },
];

async function main() {
  console.log("🌱 Starting seed...");

  // Clear existing data
  console.log("🧹 Clearing existing data...");
  await prisma.message.deleteMany();
  await prisma.messageThread.deleteMany();
  await prisma.fileAsset.deleteMany();
  await prisma.session.deleteMany();
  await prisma.availabilitySlot.deleteMany();
  await prisma.sample.deleteMany();
  await prisma.credit.deleteMany();
  await prisma.calendarConfig.deleteMany();
  await prisma.payoutAccount.deleteMany();
  await prisma.profile.deleteMany();
  await prisma.account.deleteMany();
  await prisma.user.deleteMany();

  // Create engineers
  console.log("👨‍🎤 Creating engineers...");
  for (const engineerData of ENGINEERS) {
    const user = await prisma.user.create({
      data: {
        name: engineerData.name,
        email: engineerData.email,
        role: UserRole.ENGINEER,
        emailVerified: new Date(),
      },
    });

    const profile = await prisma.profile.create({
      data: {
        userId: user.id,
        headline: engineerData.headline,
        bio: engineerData.bio,
        skills: engineerData.skills,
        genres: engineerData.genres,
        hourlyRate: engineerData.hourlyRate,
        rushRate: engineerData.rushRate,
        minBlockHours: 1,
        instantBook: true,
        city: engineerData.city,
        country: engineerData.country,
        inviteStatus: InviteStatus.APPROVED,
      },
    });

    // Create credits
    for (const credit of engineerData.credits) {
      await prisma.credit.create({
        data: {
          profileId: profile.id,
          ...credit,
        },
      });
    }

    // Create samples
    for (const sample of engineerData.samples) {
      await prisma.sample.create({
        data: {
          profileId: profile.id,
          ...sample,
        },
      });
    }

    // Create availability slots (next 7 days)
    console.log(`  📅 Creating slots for ${user.name}...`);
    const taskTypes = [TaskType.MIX_TWEAK, TaskType.MASTER_QC, TaskType.VOCAL_EDIT, TaskType.PROD_ASSIST, TaskType.ARRANGE_FEEDBACK];
    const today = new Date();
    
    for (let dayOffset = 0; dayOffset < 7; dayOffset++) {
      const date = new Date(today);
      date.setDate(date.getDate() + dayOffset);
      
      // Create 2-4 slots per day
      const slotsCount = Math.floor(Math.random() * 3) + 2;
      for (let i = 0; i < slotsCount; i++) {
        const startHour = 9 + (i * 3); // 9am, 12pm, 3pm, 6pm
        const duration = [1, 2, 3, 4][Math.floor(Math.random() * 4)];
        
        const start = new Date(date);
        start.setHours(startHour, 0, 0, 0);
        
        const end = new Date(start);
        end.setHours(start.getHours() + duration);
        
        const taskType = taskTypes[Math.floor(Math.random() * taskTypes.length)];
        const mode = Math.random() > 0.3 ? BookingMode.INSTANT : BookingMode.REQUEST;
        
        await prisma.availabilitySlot.create({
          data: {
            engineerId: user.id,
            start,
            end,
            taskType,
            mode,
            isPublished: true,
          },
        });
      }
    }
  }

  // Create artists
  console.log("🎨 Creating artists...");
  for (const artistData of ARTISTS) {
    await prisma.user.create({
      data: {
        name: artistData.name,
        email: artistData.email,
        role: UserRole.ARTIST,
        emailVerified: new Date(),
      },
    });
  }

  console.log("✅ Seed completed successfully!");
  console.log(`   Created ${ENGINEERS.length} engineers with profiles, credits, samples, and availability`);
  console.log(`   Created ${ARTISTS.length} artists`);
}

main()
  .catch((e) => {
    console.error("❌ Seed failed:");
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
