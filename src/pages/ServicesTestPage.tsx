import React from 'react';
import { ServicesPageInteractive } from '../components/pages/ServicesPageInteractive';
import { AppProvider } from '../../core/state/AppContext';

export const ServicesTestPage: React.FC = () => {
  return (
    <AppProvider initialLanguage='DE'>
      <div className='min-h-screen'>
        <div className='p-8 bg-[#D4AF37] text-center'>
          <h1 className='text-2xl font-bold text-black'>🎯 ServicesPageInteractive Test</h1>
          <p className='text-black'>Testing the new interactive service component</p>
        </div>
        <ServicesPageInteractive />
      </div>
    </AppProvider>
  );
};

export default ServicesTestPage;
