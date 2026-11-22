import HomePage from './pages/HomePage/HomePage.jsx';
import AboutPage from './pages/AboutPage/AboutPage.jsx';
import PartnersPage from './pages/PartnersPage/PartnersPage.jsx';
import LecturersPage from './pages/LecturersPage/LecturersPage.jsx';
import LecturerPage from './pages/LecturerPage/LecturerPage.jsx';

// В прототипе Figma пункты меню ведут на отдельные фреймы — здесь это отдельные страницы
export const routes = [
  { path: '/', component: HomePage },
  { path: '/about', component: AboutPage },
  { path: '/partners', component: PartnersPage },
  { path: '/lecturers', component: LecturersPage },
  { path: '/lecturers/:id', component: LecturerPage },
];
