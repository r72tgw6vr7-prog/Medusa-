// src/components/TrustBadgesBar.tsx
'use client';

import { Shield, Award, Check, Heart, Users, Star } from 'lucide-react';
import styles from './TrustBadgesBar.module.css';

export function TrustBadgesBar() {
  const badges = [
    {
      icon: Shield,
      label: 'EU Zertifiziert',
      svg: '<path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"></path>',
    },
    {
      icon: Award,
      label: 'Preisgekrönt 2024',
      svg: '<path d="m15.477 12.89 1.515 8.526a.5.5 0 0 1-.81.47l-3.58-2.687a1 1 0 0 0-1.197 0l-3.586 2.686a.5.5 0 0 1-.81-.469l1.514-8.526"></path><circle cx="12" cy="8" r="6"></circle>',
    },
    {
      icon: Check,
      label: 'Sterile Ausrüstung',
      svg: '<path d="M21.801 10A10 10 0 1 1 17 3.335"></path><path d="m9 11 3 3L22 4"></path>',
    },
    {
      icon: Heart,
      label: '27 Jahre Erfahrung',
      svg: '<path d="M2 9.5a5.5 5.5 0 0 1 9.591-3.676.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5c0 2.29-1.5 4-3 5.5l-5.492 5.313a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5"></path>',
    },
    {
      icon: Users,
      label: '10,000+ Kunden',
      svg: '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path><path d="M16 3.128a4 4 0 0 1 0 7.744"></path><path d="M22 21v-2a4 4 0 0 0-3-3.87"></path><circle cx="9" cy="7" r="4"></circle>',
    },
    {
      icon: Star,
      label: 'Featured in Tattoo Mag',
      svg: '<path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z"></path>',
    },
  ];

  return (
    <div className={styles.badgesContainer}>
      <div className={styles.badgesRow}>
        {badges.map((badge, idx) => {
          const IconComponent = badge.icon;
          return (
            <div key={idx} className={styles.badge}>
              <IconComponent className={styles.badgeIcon} />
              <div className={styles.badgeContent}>
                <span className={styles.badgeNumber}>
                  {badge.label.includes('+') ? badge.label.split('+')[0] + '+' : ''}
                </span>
                <span className={styles.badgeLabel}>
                  {badge.label.includes('+') ? badge.label.split('+')[1] : badge.label}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default TrustBadgesBar;
