import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const refreshUser = () => {
    console.log('testing');
    fetch('/get-user', {
      credentials: "include",
      method: "GET",
    })
      .then((res) => res.ok ? res.json() : null)
      .then((json) => {
        if (!json?.username) {
          setUser(null);
          return;
        }

        if (json.theme) {
          //not sure about this
          document.documentElement.style.setProperty('--highlight-color', json.theme.highlight);
          document.documentElement.style.setProperty('--primary-color', json.theme.primary);
          document.documentElement.style.setProperty('--secondary-color', json.theme.secondary);
          document.documentElement.style.setProperty('--text-color', json.theme.text);
        }

        setUser({ username: json.username, email: json.email });
        console.log(json);
      })
      .catch(() => setUser(null))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    refreshUser();
  }, []);

  const logout = () => {
    return fetch('/logout', {
      method: "GET",
      credentials: "same-origin",
    }).then(() => setUser(null));
  };

  return (
    <AuthContext.Provider value={{ user, refreshUser, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}
