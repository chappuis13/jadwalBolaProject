// __tests__/MatchCard.test.js
import React from 'react';
import { render } from '@testing-library/react-native';
import MatchCard from '../src/components/MatchCard';

// Data palsu untuk tes
const dummyMatch = {
  homeTeam: { name: 'Arsenal', crest: 'https://via.placeholder.com/150' },
  awayTeam: { name: 'Chelsea', crest: 'https://via.placeholder.com/150' },
  competition: { name: 'Premier League' },
  utcDate: '2025-11-22T20:00:00Z', // Format tanggal ISO
  score: { fullTime: { home: 2, away: 1 } } // Format skor untuk MatchResultCard (jika dipakai)
};

describe('MatchCard Component', () => {
  it('merender nama tim dengan benar', () => {
    // Render komponen di "memori"
    const { getByText } = render(
      <MatchCard matchData={dummyMatch} onPress={() => {}} />
    );

    // Cek apakah teks muncul
    expect(getByText('Arsenal')).toBeTruthy();
    expect(getByText('Chelsea')).toBeTruthy();
  });

  it('merender nama liga dengan benar', () => {
    const { getByText } = render(
      <MatchCard matchData={dummyMatch} onPress={() => {}} />
    );
    
    expect(getByText('Premier League')).toBeTruthy();
  });
});