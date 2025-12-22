export interface UserProfile {
  name: string;
  phone: string;
  email?: string;
  dob?: string;
  agreed?: boolean;
}

export const mockUsers: UserProfile[] = [
  {
    name: 'John Wick',
    phone: '0000000001',
    email: 'nguyenvanan@email.com',
    dob: '1990-05-15',
    agreed: true,
  },
  {
    name: 'Alan Walker',
    phone: '0000000002',
    email: 'tranthibinh@email.com',
    // Missing dob and agreed
  }
];

export const findUserByPhone = (phone: string): UserProfile | undefined => {
  // Normalize phone number (remove spaces, dashes, parentheses)
  const normalizedPhone = phone.replace(/[\s\-()]/g, '');
  return mockUsers.find((user) => user.phone.replace(/[\s\-()]/g, '') === normalizedPhone);
};

export const getMissingFields = (user: UserProfile): string[] => {
  const missing: string[] = [];
  if (!user.email) missing.push('email');
  if (!user.dob) missing.push('dob');
  if (!user.agreed) missing.push('agreed');
  return missing;
};
