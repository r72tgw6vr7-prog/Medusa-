export const artistsEN = {
  // TATTOO ARTISTS SECTION (3 members)
  tattooArtists: [
    {
      id: "eli-luquez",
      name: "Eli Luquez",
      fullName: "Wilfrank Jose Garcia Luquez",
      role: "TATTOO ARTIST",
      specialties: ["Realism", "Black & Gray", "Fineline", "Blackwork"],
      experience: 8,
      bio: "Eli Luquez specializes in photorealistic tattoos and fine line work. His expertise in realism and blackwork makes him a sought-after artist for detailed designs with exceptional precision.",
      image: "/images/artists/headshots/luz.jpg",
      featured: true,
      rating: 4.9,
      reviewCount: 142,
      priceRange: {
        min: 120,
        max: 280,
        currency: "€"
      },
      certifications: ["EU-Hygiene certified", "Realism Specialist"],
      languages: ["Spanish", "English", "German"],
      availability: "Available",
      section: "tattoo"
    },
    {
      id: "debi",
      name: "Debi",
      fullName: "Gabor Debreczeni",
      role: "TATTOO ARTIST",
      specialties: ["Old School", "Geometry", "Blackwork", "Maori"],
      experience: 12,
      bio: "Debi combines traditional Old School techniques with modern geometric designs. Her blackwork and Maori tattoos are characterized by powerful lines and cultural depth with perfect technical execution.",
      image: "/images/artists/headshots/debi.jpg",
      featured: true,
      rating: 4.8,
      reviewCount: 156,
      priceRange: {
        min: 110,
        max: 260,
        currency: "€"
      },
      certifications: ["EU-Hygiene certified", "Traditional Master"],
      languages: ["Hungarian", "German", "English"],
      availability: "Available",
      section: "tattoo"
    },
    {
      id: "loui",
      name: "Loui",
      fullName: "Gegő Lajos",
      role: "TATTOO ARTIST",
      specialties: ["Black & Gray", "Realism", "Watercolor", "Portrait"],
      experience: 10,
      bio: "Loui is a master of black & gray technique and portrait tattoos. His watercolor work is distinguished by vibrant color gradients and realistic representations, combined with years of experience.",
      image: "/images/artists/headshots/loui.jpg",
      featured: false,
      rating: 4.7,
      reviewCount: 134,
      priceRange: {
        min: 100,
        max: 240,
        currency: "€"
      },
      certifications: ["EU-Hygiene certified", "Portrait Specialist"],
      languages: ["Hungarian", "German"],
      availability: "Available",
      section: "tattoo"
    }
  ],


  // PIERCING SPECIALISTS SECTION (3 members)
  piercingSpecialists: [
    {
      id: "vive",
      name: "Vive",
      role: "RESIDENT PIERCER",
      specialties: ["Consultation", "Piercing Collection Curator", "Snake Eye"],
      experience: 9,
      bio: "Vive is our experienced Resident Piercer specializing in extraordinary piercings like Snake Eye. She curates our exclusive jewelry collection and provides comprehensive consultation.",
      image: "/images/artists/headshots/vivi.jpg",
      featured: true,
      rating: 4.9,
      reviewCount: 167,
      priceRange: {
        min: 60,
        max: 200,
        currency: "€"
      },
      certifications: ["EU-Hygiene certified", "APP Member", "Snake Eye Specialist"],
      languages: ["German", "English", "Spanish"],
      availability: "Available",
      section: "piercing"
    },
    {
      id: "angie",
      name: "Angie",
      role: "RESIDENT PIERCER",
      specialties: ["Consultation", "Social Media", "Septum"],
      experience: 7,
      bio: "Angie combines her piercing expertise with social media management. She specializes in septum piercings and ensures professional presentation of our work online.",
      image: "/images/artists/headshots/angie.jpg",
      featured: false,
      rating: 4.8,
      reviewCount: 143,
      priceRange: {
        min: 50,
        max: 180,
        currency: "€"
      },
      certifications: ["EU-Hygiene certified", "Social Media Specialist"],
      languages: ["German", "English", "French"],
      availability: "Available",
      section: "piercing"
    },
    {
      id: "aaron",
      name: "Aaron",
      role: "EAR MAGICIAN & PIERCER",
      specialties: ["Kids Specialist", "Dermalanker", "Zurface"],
      experience: 11,
      bio: "Aaron is our 'Ear Magician' and specialist for children's piercings. With Dermalanker and Zurface techniques, he ensures safe and gentle piercings for the little ones.",
      image: "/images/artists/headshots/aaron.jpg",
      featured: false,
      rating: 4.7,
      reviewCount: 98,
      priceRange: {
        min: 40,
        max: 150,
        currency: "€"
      },
      certifications: ["EU-Hygiene certified", "Kids Specialist", "Dermalanker Certified"],
      languages: ["German", "English"],
      availability: "Available",
      section: "piercing"
    }
  ],


  // LEADERSHIP/SERVICE SECTION (2 members)
  leadership: [
    {
      id: "oliver",
      name: "Oliver",
      role: "MR. MAGIC & PIERCER / STUDIO OWNER",
      specialties: ["Magician", "Implant", "Intimate Piercing"],
      experience: 18,
      bio: "Oliver is the founder and owner of Medusa Tattoo Studio. As 'Mr. Magic' he combines extraordinary piercing techniques with the art of entertainment and specializes in implants.",
      image: "/images/artists/headshots/oli.jpg",
      featured: true,
      rating: 5,
      reviewCount: 284,
      priceRange: {
        min: 100,
        max: 350,
        currency: "€"
      },
      certifications: ["EU-Hygiene certified", "Studio Owner", "Implant Specialist"],
      languages: ["German", "English"],
      availability: "By Appointment",
      section: "leadership"
    },
    {
      id: "sasha",
      name: "Sasha",
      role: "CUSTOMER EXPERIENCE SPECIALIST",
      specialties: ["Consultation & Sales", "Jewelry Exchange", "Aftercare Advisor"],
      experience: 6,
      bio: "Sasha is our Customer Experience Specialist ensuring perfect customer care. She advises on jewelry selection, coordinates exchange services and accompanies aftercare.",
      image: "/images/artists/headshots/sascha.jpg",
      featured: false,
      rating: 4.9,
      reviewCount: 156,
      priceRange: {
        min: 0,
        max: 50,
        currency: "€"
      },
      certifications: ["Customer Service Expert", "Jewelry Specialist"],
      languages: ["German", "English", "Russian"],
      availability: "Available",
      section: "service"
    }
  ],


  // Legacy artists array for backward compatibility
  artists: [
    // All 8 team members combined for backward compatibility
    {
      id: "eli-luquez",
      name: "Eli Luquez",
      role: "TATTOO ARTIST",
      specialties: ["Realism", "Black & Gray", "Fineline", "Blackwork"],
      experience: 8,
      bio: "Eli Luquez specializes in photorealistic tattoos and fine line work. His expertise in realism and blackwork makes him a sought-after artist for detailed designs.",
      image: "/images/artists/headshots/luz.jpg",
      featured: true,
      section: "tattoo"
    },
    {
      id: "debi",
      name: "Debi",
      role: "TATTOO ARTIST",
      specialties: ["Old School", "Geometry", "Blackwork", "Maori"],
      experience: 12,
      bio: "Debi combines traditional Old School techniques with modern geometric designs. Her blackwork and Maori tattoos are characterized by powerful lines and cultural depth.",
      image: "/images/artists/headshots/debi.jpg",
      featured: true,
      section: "tattoo"
    },
    {
      id: "loui",
      name: "Loui",
      role: "TATTOO ARTIST",
      specialties: ["Black & Gray", "Realism", "Watercolor", "Portrait"],
      experience: 10,
      bio: "Loui is a master of black & gray technique and portrait tattoos. His watercolor work is distinguished by vibrant color gradients and realistic representations.",
      image: "/images/artists/headshots/loui.jpg",
      featured: false,
      section: "tattoo"
    },
    {
      id: "vive",
      name: "Vive",
      role: "RESIDENT PIERCER",
      specialties: ["Consultation", "Piercing Collection Curator", "Snake Eye"],
      experience: 9,
      bio: "Vive is our experienced Resident Piercer specializing in extraordinary piercings like Snake Eye. She curates our exclusive jewelry collection and provides comprehensive consultation.",
      image: "/images/artists/headshots/vivi.jpg",
      featured: true,
      section: "piercing"
    },
    {
      id: "angie",
      name: "Angie",
      role: "RESIDENT PIERCER",
      specialties: ["Consultation", "Social Media", "Septum"],
      experience: 7,
      bio: "Angie combines her piercing expertise with social media management. She specializes in septum piercings and ensures professional presentation of our work online.",
      image: "/images/artists/headshots/angie.jpg",
      featured: false,
      section: "piercing"
    },
    {
      id: "aaron",
      name: "Aaron",
      role: "EAR MAGICIAN & PIERCER",
      specialties: ["Kids Specialist", "Dermalanker", "Zurface"],
      experience: 11,
      bio: "Aaron is our 'Ear Magician' and specialist for children's piercings. With Dermalanker and Zurface techniques, he ensures safe and gentle piercings for the little ones.",
      image: "/images/artists/headshots/aaron.jpg",
      featured: false,
      section: "piercing"
    },
    {
      id: "oliver",
      name: "Oliver",
      role: "MR. MAGIC & PIERCER / STUDIO OWNER",
      specialties: ["Magician", "Implant", "Intimate Piercing"],
      experience: 18,
      bio: "Oliver is the founder and owner of Medusa Tattoo Studio. As 'Mr. Magic' he combines extraordinary piercing techniques with the art of entertainment and specializes in implants.",
      image: "/images/artists/headshots/oli.jpg",
      featured: true,
      section: "leadership"
    },
    {
      id: "sasha",
      name: "Sasha",
      role: "CUSTOMER EXPERIENCE SPECIALIST",
      specialties: ["Consultation & Sales", "Jewelry Exchange", "Aftercare Advisor"],
      experience: 6,
      bio: "Sasha is our Customer Experience Specialist ensuring perfect customer care. She advises on jewelry selection, coordinates exchange services and accompanies aftercare.",
      image: "/images/artists/headshots/sascha.jpg",
      featured: false,
      section: "service"
    }
  ]
};


export default artistsEN;