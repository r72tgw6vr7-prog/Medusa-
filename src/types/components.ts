export interface GalleryPageProps {
  onBookNow?: () => void;
  showFilter?: boolean;
}

export interface ArtistsPageProps {
  onBookArtist?: (artistId: string) => void;
}

export interface AfterCarePageProps {
  onBookTouchUp?: () => void;
}

export interface FooterProps {
  onNavigate?: (page: string) => void;
}
