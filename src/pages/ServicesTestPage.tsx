import React from 'react';
import { ServicesPageInteractive } from '../components/pages/ServicesPageInteractive';
import { AppProvider } from '../../core/state/AppContext';

export const ServicesTestPage: React.FC = () => {
  return (
    <AppProvider initialLanguage='DE'>
      <div className='min-h-screen relative z-10'>
        <ServicesPageInteractive />
      </div>
    </AppProvider>
  );
};

export default ServicesTestPage;
