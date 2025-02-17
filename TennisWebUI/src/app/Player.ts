export interface Player {
    userId: number;
    firstName: string;
    lastName: string;
    email: string;
    passwordHash: string;
    role: string;
    createdAt: string;
    dateOfBirth: string; // Optional field
    level: string; // Player's skill level
    profileImage: string; // URL or path to the profile image
  }