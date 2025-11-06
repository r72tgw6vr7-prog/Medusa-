import React from 'react';
import { ServicesPageInteractive } from '../pages/ServicesPageInteractive';
import { MainNavigation } from '../molecules/MainNavigation';
import Footer from '../Footer';
import { RouteComponentProps } from '../../types/routes';

export interface ServicesPageProps extends RouteComponentProps {
  onBookService?: (serviceId: string) => void;
}

export const ServicesPage: React.FC<ServicesPageProps> = ({ onBookService: _onBookService }) => {
  return (
    <div className='min-h-screen relative z-10'>
      <MainNavigation />
      <div className='nav-offset-spacer h-24 md:h-32' aria-hidden='true' />
      <ServicesPageInteractive />
      <Footer />
    </div>
  );
};

export default ServicesPage;
