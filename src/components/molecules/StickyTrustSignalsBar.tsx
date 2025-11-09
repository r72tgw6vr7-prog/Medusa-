import React from 'react';
import { Shield, Award, Clock, Star } from 'lucide-react';
import styles from './StickyTrustSignalsBar.module.css';

interface TrustSignalBadge {
  icon: React.ElementType;
  number: string;
  label: string;
}

export function StickyTrustSignalsBar() {
  const trustSignals: TrustSignalBadge[] = [
    {
      icon: Shield,
      number: '100%',
      label: 'EU-zertifiziert',
    },
    {
      icon: Clock,
      number: '5+',
      label: 'Min. Beratung',
    },
    {
      icon: Award,
      number: '100%',
      label: 'Hygiene',
    },
    {
      icon: Star,
      number: '27',
      label: 'Jahre Erfahrung',
    },
  ];

  return (
    <div className={styles.stickyTrustSignalsBar}>
      <div className={styles.trustSignalsContainer}>
        {trustSignals.map((signal, index) => {
          const IconComponent = signal.icon;
          return (
            <div key={index} className={styles.trustSignalBadge}>
              <IconComponent className={styles.trustSignalIcon} />
              <div>
                <span className={styles.trustSignalNumber}>{signal.number}</span>
                <span className={styles.trustSignalLabel}>{signal.label}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default StickyTrustSignalsBar;
