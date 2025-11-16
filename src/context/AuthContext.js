import React, { createContext, useState, useContext, useEffect } from 'react';
import { supabase } from '../supabase/client';
import { ActivityIndicator, View, StyleSheet, Alert } from 'react-native';
import { COLORS } from '../constants/theme';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);
  const [favorites, setFavorites] = useState([]);
  
  const fetchSessionAndFavorites = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      setSession(session);
      
      if (session) {
        const { data, error } = await supabase
          .from('user_favorites')
          .select('team_id, team_data')
          .eq('user_id', session.user.id);
          
        if (error) throw error;
        setFavorites(data || []);
      }
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSessionAndFavorites();

    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session);
        if (event === 'SIGNED_IN') {
          fetchSessionAndFavorites();
        }
        if (event === 'SIGNED_OUT') {
          setFavorites([]);
        }
      }
    );

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  const authSignUp = async (email, password) => {
    return await supabase.auth.signUp({ email: email, password: password });
  };

  const authLogin = async (email, password) => {
    return await supabase.auth.signInWithPassword({ email: email, password: password });
  };

  const authLogout = async () => {
    return await supabase.auth.signOut();
  };

  const addFavorite = async (team) => {
    if (!session) return;

    const newFavorite = {
      user_id: session.user.id,
      team_id: team.id,
      team_data: team 
    };

    const { error } = await supabase
      .from('user_favorites')
      .insert(newFavorite);
      
    if (error) {
      Alert.alert("Error", "Gagal menambah favorit.");
      console.error("Error adding favorite:", error);
    } else {
      setFavorites((prev) => [...prev, newFavorite]);
    }
  };

  const removeFavorite = async (teamId) => {
    if (!session) return;

    const { error } = await supabase
      .from('user_favorites')
      .delete()
      .match({ user_id: session.user.id, team_id: teamId });

    if (error) {
      Alert.alert("Error", "Gagal menghapus favorit.");
      console.error("Error removing favorite:", error);
    } else {
      setFavorites((prev) => prev.filter(item => item.team_id !== teamId));
    }
  };

  const isFavorite = (teamId) => {
    return favorites.some(item => item.team_id === teamId);
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color={COLORS.primary} />
      </View>
    );
  }

  return (
    <AuthContext.Provider 
      value={{ 
        session,
        isLoggedIn: !!session,
        login: authLogin,
        logout: authLogout,
        register: authSignUp,
        favorites,
        addFavorite,
        removeFavorite,
        isFavorite,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.card,
  }
});

export const useAuth = () => {
  return useContext(AuthContext);
};