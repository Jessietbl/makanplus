export interface DemoUser {
    email: string;
    password: string;
    name: string;
    role: 'customer' | 'business_partner';
    address: string;
  }
  
  // Predefined demo users for mock authentication.
  const demoUsers: DemoUser[] = [
    {
      email: "user.demo@example.com",
      password: "password123",
      name: "User Demo",
      role: "customer",
      address: "123 Example Street",
    },
    {
      email: "partner@example.com",
      password: "partnerpass",
      name: "Business Partner",
      role: "business_partner",
      address: "456 Example Office",
    },
  ];
  
  interface SignupResult {
    success: boolean;
    user?: DemoUser;
    message?: string;
  }
  
  /**
   * Simulates a sign-up by checking if the email is already registered.
   * If not, it adds the new user to the demoUsers array.
   */
  export function mockSignUp(newUser: DemoUser): SignupResult {
    const exists = demoUsers.some(user => user.email === newUser.email);
    if (exists) {
      return { success: false, message: "User already exists" };
    }
    demoUsers.push(newUser);
    return { success: true, user: newUser };
  }
  
  // Also export the mock login function if needed.
  export function mockLogin(email: string, password: string): { success: boolean; user?: DemoUser; message?: string } {
    const user = demoUsers.find(u => u.email === email && u.password === password);
    if (user) {
      return { success: true, user };
    }
    return { success: false, message: "Invalid demo credentials" };
  }
  