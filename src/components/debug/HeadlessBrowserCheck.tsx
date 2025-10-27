import React, { useEffect, useState } from 'react';

interface DomSnapshot {
  teamGridPresent: boolean;
  teamCardsCount: number;
  teamCardStyles: Record<string, string>[];
  imagesLoaded: number;
  imagesTotal: number;
  cssVariables: Record<string, string>;
  timestamp: string;
}

const HeadlessBrowserCheck: React.FC = () => {
  const [snapshot, setSnapshot] = useState<DomSnapshot | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate a headless browser loading the page with cache disabled
    const takeSnapshot = () => {
      try {
        // Get CSS variables
        const computedStyle = getComputedStyle(document.documentElement);
        const cssVars = {
          brandGold: computedStyle.getPropertyValue('--brand-gold').trim(),
          brandBackground: computedStyle.getPropertyValue('--brand-background').trim(),
          brandWhite: computedStyle.getPropertyValue('--brand-white').trim(),
        };

        // Check TeamGrid presence
        const teamGridElement = document.querySelector('.team-section');
        const teamCards = document.querySelectorAll('.team-card');

        // Collect styles from team cards
        const cardStyles: Record<string, string>[] = [];
        teamCards.forEach((card, index) => {
          if (card instanceof HTMLElement) {
            const computedCardStyle = getComputedStyle(card);
            cardStyles.push({
              borderRadius: computedCardStyle.borderRadius,
              backgroundColor: computedCardStyle.backgroundColor,
              boxShadow: computedCardStyle.boxShadow,
              aspectRatio: computedCardStyle.aspectRatio,
              position: computedCardStyle.position,
            });
          }
        });

        // Count loaded images
        const images = document.querySelectorAll('.team-card-image');
        let loadedImages = 0;

        images.forEach((img) => {
          if (img instanceof HTMLImageElement && img.complete && img.naturalWidth > 0) {
            loadedImages++;
          }
        });

        // Create snapshot
        const domSnapshot: DomSnapshot = {
          teamGridPresent: Boolean(teamGridElement),
          teamCardsCount: teamCards.length,
          teamCardStyles: cardStyles,
          imagesLoaded: loadedImages,
          imagesTotal: images.length,
          cssVariables: cssVars,
          timestamp: new Date().toISOString(),
        };

        setSnapshot(domSnapshot);

        // Log to console for verification
        console.group('HeadlessBrowserCheck Snapshot');
        console.log('TeamGrid present:', domSnapshot.teamGridPresent);
        console.log('Team cards found:', domSnapshot.teamCardsCount);
        console.log('Images loaded:', `${domSnapshot.imagesLoaded}/${domSnapshot.imagesTotal}`);
        console.log('CSS Variables loaded:', domSnapshot.cssVariables);
        console.log('First card styles:', cardStyles[0] || 'No card found');
        console.groupEnd();

        // Create DOM marker
        const marker = document.createElement('div');
        marker.id = 'headless-check-marker';
        marker.style.position = 'fixed';
        marker.style.top = '70px';
        marker.style.right = '10px';
        marker.style.padding = '10px';
        marker.style.background = 'rgba(0,0,0,0.7)';
        marker.style.color = domSnapshot.teamGridPresent ? 'lightgreen' : 'red';
        marker.style.borderRadius = '4px';
        marker.style.fontSize = '12px';
        marker.style.zIndex = '9999';
        marker.textContent = `HeadlessCheck: TeamGrid ${domSnapshot.teamGridPresent ? '✓' : '✗'}, Cards: ${domSnapshot.teamCardsCount}, Images: ${domSnapshot.imagesLoaded}/${domSnapshot.imagesTotal}`;
        document.body.appendChild(marker);
      } catch (error) {
        console.error('HeadlessBrowserCheck error:', error);
      }

      setLoading(false);
    };

    // Simulate loading with cache disabled
    const simulateCacheDisabled = () => {
      // Add a random query parameter to force cache refresh
      const cacheBuster = `?cache=${Date.now()}`;
      const currentUrl = window.location.href;
      const urlWithoutHash = currentUrl.split('#')[0];
      const urlWithoutQuery = urlWithoutHash.split('?')[0];
      const newUrl = `${urlWithoutQuery}${cacheBuster}`;

      // We don't actually navigate, but we log what would happen in a headless browser
      console.log(`Simulating cache-disabled reload: ${newUrl}`);

      // Now take the snapshot
      setTimeout(takeSnapshot, 100);
    };

    simulateCacheDisabled();

    return () => {
      const marker = document.getElementById('headless-check-marker');
      if (marker) {
        marker.remove();
      }
    };
  }, []);

  if (loading) {
    return null;
  }

  return (
    <div
      style={{
        position: 'fixed',
        top: '100px',
        right: '10px',
        width: '300px',
        maxHeight: '300px',
        overflowY: 'auto',
        background: 'rgba(0,0,0,0.85)',
        color: 'white',
        padding: '10px',
        borderRadius: '4px',
        zIndex: 9998,
        fontSize: '11px',
      }}
    >
      <h3>Headless Browser Check</h3>

      {snapshot ? (
        <>
          <div>
            <strong>Component Status:</strong>
            <ul>
              <li>TeamGrid: {snapshot.teamGridPresent ? '✅' : '❌'}</li>
              <li>Team Cards: {snapshot.teamCardsCount}</li>
              <li>
                Images: {snapshot.imagesLoaded}/{snapshot.imagesTotal} loaded
              </li>
            </ul>
          </div>

          <div>
            <strong>CSS Variables:</strong>
            <ul>
              <li>--brand-gold: {snapshot.cssVariables.brandGold}</li>
              <li>--brand-background: {snapshot.cssVariables.brandBackground}</li>
              <li>--brand-white: {snapshot.cssVariables.brandWhite}</li>
            </ul>
          </div>

          {snapshot.teamCardStyles.length > 0 && (
            <div>
              <strong>First Card Style:</strong>
              <ul>
                {Object.entries(snapshot.teamCardStyles[0]).map(([prop, value]) => (
                  <li key={prop}>
                    {prop}: {value}
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div>
            <small>Snapshot taken: {new Date(snapshot.timestamp).toLocaleTimeString()}</small>
          </div>
        </>
      ) : (
        <div>No snapshot data available</div>
      )}
    </div>
  );
};

export default HeadlessBrowserCheck;
