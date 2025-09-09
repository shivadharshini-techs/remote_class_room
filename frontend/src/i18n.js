import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Language resources
const resources = {
  en: {
    translation: {
      welcome: "Welcome",
      login: "Login",
      username: "Username",
      userType: "User Type",
      student: "Student",
      teacher: "Teacher",
      admin: "Administrator",
      logout: "Logout",
      // Add more keys as needed
    },
  },
  hi: {
    translation: {
      welcome: "स्वागत है",
      login: "लॉगिन",
      username: "उपयोगकर्ता नाम",
      userType: "उपयोगकर्ता प्रकार",
      student: "छात्र",
      teacher: "शिक्षक",
      admin: "व्यवस्थापक",
      logout: "लॉगआउट",
      // Add more Hindi translations here
    },
  },
  // Add other local languages similarly
};

i18n.use(initReactI18next).init({
  resources,
  lng: 'en', // default language
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;

import { useTranslation } from 'react-i18next';

const Login = ({ onLogin }) => {
  const { t } = useTranslation();

  return (
    <div>
      <h2>{t('login')}</h2>
      <label>{t('userType')}:</label>
      <select>
        <option value="student">{t('student')}</option>
        <option value="teacher">{t('teacher')}</option>
        <option value="admin">{t('admin')}</option>
      </select>
      {/* Other UI */}
    </div>
  );
};
