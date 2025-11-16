import axios from 'axios';
import { API_KEY } from '../config';

export const LEAGUE_CODES = {
  LIGA_INGGRIS: 'PL',
  LA_LIGA: 'PD',
  SERIE_A: 'SA',
  BUNDESLIGA: 'BL1',
  LIGUE_1: 'FL1',
};

const api = axios.create({
  baseURL: 'https://api.football-data.org/v4/',
  headers: {
    'X-Auth-Token': API_KEY, 
  },
});

export const getMatches = (leagueCode) => {
  return api.get(`competitions/${leagueCode}/matches?status=SCHEDULED`);
};

export const getStandings = (leagueCode) => {
  return api.get(`competitions/${leagueCode}/standings`);
};

export const getTopScorers = (leagueCode) => {
  return api.get(`competitions/${leagueCode}/scorers`);
};

export const getLeagueInfo = (leagueCode) => {
  return api.get(`competitions/${leagueCode}`);
};

export const getTeams = (leagueCode) => {
  return api.get(`competitions/${leagueCode}/teams`);
};

export const getTeamDetails = (teamId) => {
  return api.get(`teams/${teamId}`);
};

export const getFinishedMatches = (leagueCode) => {
  return api.get(`competitions/${leagueCode}/matches?status=FINISHED&limit=10`);
};

export const getTeamMatches = (teamId) => {
  return api.get(`teams/${teamId}/matches`);
};