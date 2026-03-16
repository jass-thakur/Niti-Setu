import React, { createContext, useContext, useState, useEffect } from "react";

interface User {
  id: string;
  name: string;
  phone: string;
  age?: string;
  gender?: string;
  state?: string;
  district?: string;
  category?: string;
  landSize?: string;
  appliedSchemes?: { id: string; name: string; date: string; status: string }[];
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (phone: string, profile?: Partial<User>) => void;
  updateProfile: (profile: Partial<User>) => void;
  applyToScheme: (scheme: { id: string; name: string }) => void;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate checking local storage for existing session
    const savedUser = localStorage.getItem("niti_setu_user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setIsLoading(false);
  }, []);

  const login = (phone: string, profile: Partial<User> = {}) => {
    const newUser = { id: "1", phone, name: profile.name || "Farmer", ...profile };
    setUser(newUser);
    localStorage.setItem("niti_setu_user", JSON.stringify(newUser));
  };

  const updateProfile = (profile: Partial<User>) => {
    if (!user) return;
    const updatedUser = { ...user, ...profile };
    setUser(updatedUser);
    localStorage.setItem("niti_setu_user", JSON.stringify(updatedUser));
  };

  const applyToScheme = (scheme: { id: string; name: string }) => {
    if (!user) return;
    const application = { 
      ...scheme, 
      date: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }), 
      status: "Pending Review" 
    };
    const updatedApplied = [...(user.appliedSchemes || []), application];
    updateProfile({ appliedSchemes: updatedApplied });
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("niti_setu_user");
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, updateProfile, applyToScheme, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
