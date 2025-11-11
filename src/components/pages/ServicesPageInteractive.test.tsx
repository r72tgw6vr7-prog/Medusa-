import React from 'react';
import Section from '../ui/Section';
import PageHeader from '../ui/PageHeader';

const ServicesPageInteractiveTest: React.FC = () => {
  return (
    <Section bg='none' className='relative z-10'>
      <div className='mx-auto w-full max-w-[1104px] flex flex-col gap-16'>
        <PageHeader
          eyebrow='Test'
          title='Test'
          subtitle='Test'
          alignment='center'
          maxWidth='md'
        />
        <div>Content</div>
      </div>
    </Section>
  );
};

export default ServicesPageInteractiveTest;