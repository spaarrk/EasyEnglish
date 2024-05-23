import { Admin } from './pages/Admin';
import Exercises from './pages/Exercises';
import Grammar from './pages/Grammar';
import GrammarPage from './pages/GrammarPage';
import Login from './pages/Login';
import Main from './pages/Main';
import Registration from './pages/Registration';
import Vocabulary from './pages/Vocabulary';
import VocabularyPage from './pages/VocabularyPage';
import {
  ADMIN_ROUTE,
  EXERCISES_ROUTE,
  GRAMMAR_ROUTE,
  REGISTR_ROUTE,
  VOCABULARY_ROUTE,
  MAIN_ROUTE,
  LOGIN_ROUTE,
  GRAMMAR_PAGE_ROUTE,
  CONGRATULATION_ROUTE,
  MAIN_ROUTE_OLD,
  PROFILE_ROUTE,
  CARDS_ROUTE,
  CARD_ROUTE,
  PROFILE_STATISCTICS_ROUTE,
} from './utils/consts';
import TestPage from './pages/TestPage';
import NewTestPage from './pages/NewTestPage';
import Congratulation from './pages/Congratulation';
import MainOld from './pages/MainOld';
import Profile from './pages/Profile';
import Cards from './pages/Cards';
import Card from './pages/Card';
import UserStatistics from './components/Profile/statistics/UserStatistics';

export const authRoutes = [
  {
    path: ADMIN_ROUTE,
    Component: Admin,
  },
  {
    path: VOCABULARY_ROUTE,
    Component: Vocabulary,
  },
  {
    path: GRAMMAR_ROUTE,
    Component: Grammar,
  },
  {
    path: EXERCISES_ROUTE,
    Component: Exercises,
  },
  {
    path: GRAMMAR_ROUTE + '/:id',
    Component: GrammarPage,
  },
  {
    path: VOCABULARY_ROUTE + '/:id',
    Component: VocabularyPage,
  },
  {
    path: EXERCISES_ROUTE + '/:id',
    // Component: TestPage,
    Component: NewTestPage,
  },
  {
    path: CONGRATULATION_ROUTE,
    Component: Congratulation,
  },
  {
    path: PROFILE_ROUTE,
    Component: Profile,
  },
  {
    path: PROFILE_STATISCTICS_ROUTE,
    Component: UserStatistics,
  },
  {
    path: CARDS_ROUTE,
    Component: Cards,
  },
  {
    path: CARD_ROUTE,
    Component: Card,
  },
];

export const publicRoutes = [
  {
    path: LOGIN_ROUTE,
    Component: Login,
  },
  {
    path: REGISTR_ROUTE,
    Component: Registration,
  },
  {
    path: MAIN_ROUTE_OLD,
    Component: MainOld,
  },
  {
    path: MAIN_ROUTE,
    Component: Main,
  },
];
