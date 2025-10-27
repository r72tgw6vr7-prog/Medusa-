import { useState, useCallback, useEffect } from 'react';
import {
  X,
  ChevronLeft,
  ChevronRight,
  Crown,
  Star,
  Shield,
  Award,
  Loader2,
  CheckCircle2,
  AlertCircle,
} from 'lucide-react';

// Interface for team.json data
interface TeamArtist {
  id: string;
  name: string;
  role: string;
  category: string;
  photo: string;
  specialties: string[];
  bookable: boolean;
  featured: boolean;
  bio: string;
  experience: string;
  instagram: string;
}
import { submitBooking, validateBookingData } from '../../services/bookingService';

type Service = {
  id: string;
  title: string;
  price: string;
  features: { icon: React.ElementType; text: string }[];
};

type Artist = {
  id: string;
  name: string;
  role: string;
  photo: string;
  specialty: string;
};

type BookingStep = 'service' | 'artist' | 'contact' | 'confirmation' | 'error';

const SERVICES: Service[] = [
  {
    id: 'tattoo',
    title: 'Tattoo Artistry',
    price: 'ab €150/Std',
    features: [
      { icon: Crown, text: 'Individuelle Designs' },
      { icon: Star, text: 'Erfahrene Künstler' },
      { icon: Shield, text: 'Höchste Hygienestandards' },
      { icon: Award, text: 'Persönliche Beratung' },
    ],
  },
  {
    id: 'piercing',
    title: 'Piercing',
    price: 'ab €30',
    features: [
      { icon: Crown, text: 'Professionelle Beratung' },
      { icon: Star, text: 'Hochwertiger Schmuck' },
      { icon: Shield, text: 'Steriles Arbeiten' },
      { icon: Award, text: 'Umfassende Nachsorge' },
    ],
  },
];

export const BookingModalMobile: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [artists, setArtists] = useState<Artist[]>([]);
  const [step, setStep] = useState<BookingStep>('service');

  useEffect(() => {
    // Fetch artists data
    fetch('/team.json')
      .then((res) => res.json())
      .then((data: { team: TeamArtist[] }) => {
        // Filter only bookable artists and transform data to match Artist type
        const bookableArtists = data.team
          .filter((artist) => artist.bookable)
          .map((artist) => ({
            id: artist.id,
            name: artist.name,
            role: artist.role,
            photo: artist.photo,
            specialty: artist.specialties.join(', '),
          }));
        setArtists(bookableArtists);
      })
      .catch((error) => {
        console.error('Error loading artists:', error);
      });
  }, []);
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [selectedArtist, setSelectedArtist] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    message: '',
    gdprConsent: false,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionError, setSubmissionError] = useState<string | null>(null);
  const [bookingResult, setBookingResult] = useState<{
    bookingNumber: string;
    artistName: string;
    serviceName: string;
    date: string;
  } | null>(null);

  const canProceedStep1 = selectedService !== null;
  const canProceedStep2 = selectedArtist !== null;
  const canProceedStep3 =
    formData.name.trim() !== '' &&
    formData.email.trim() !== '' &&
    formData.phone.trim() !== '' &&
    formData.date.trim() !== '' &&
    formData.gdprConsent;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;
    const checked = type === 'checkbox' ? (e.target as HTMLInputElement).checked : undefined;

    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();

      if (!selectedService || !selectedArtist) {
        setSubmissionError('Bitte vervollständigen Sie alle Schritte');
        return;
      }

      const bookingData = {
        serviceId: selectedService,
        artistId: selectedArtist,
        ...formData,
      };

      const validationError = validateBookingData(bookingData);
      if (validationError) {
        setSubmissionError(validationError);
        return;
      }

      try {
        setIsSubmitting(true);
        setSubmissionError(null);

        const service = SERVICES.find((s) => s.id === selectedService);
        const artist = artists.find((a) => a.id === selectedArtist);

        const response = await submitBooking(bookingData);

        setBookingResult({
          bookingNumber: response.bookingNumber,
          artistName: artist?.name || '',
          serviceName: service?.title || '',
          date: formData.date,
        });

        setStep('confirmation');
      } catch (error) {
        console.error('Booking failed:', error);
        setSubmissionError(
          'Buchung konnte nicht übermittelt werden. Bitte versuchen Sie es später erneut.',
        );
        setStep('error');
      } finally {
        setIsSubmitting(false);
      }
    },
    [selectedService, selectedArtist, formData, artists],
  );

  return (
    <div className='booking-modal-mobile'>
      <div className='modal-header'>
        <h2>Termin buchen</h2>
        <button className='close-button' onClick={onClose} aria-label='Schließen'>
          <X size={24} />
        </button>
      </div>

      <div className='modal-body'>
        {step === 'service' && (
          <div className='step-container'>
            <h3>Service auswählen</h3>
            <div className='service-grid'>
              {SERVICES.map((service) => (
                <button
                  key={service.id}
                  className={`service-card ${selectedService === service.id ? 'selected' : ''}`}
                  onClick={() => setSelectedService(service.id)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      setSelectedService(service.id);
                    }
                  }}
                  type='button'
                >
                  <div className='service-icon'>
                    {service.id === 'tattoo' ? (
                      <svg /* Tattoo icon */ />
                    ) : (
                      <svg /* Piercing icon */ />
                    )}
                  </div>
                  <h4>{service.title}</h4>
                  <p className='price'>{service.price}</p>
                  <ul className='features'>
                    {service.features.map((feature, idx) => {
                      const Icon = feature.icon;
                      return (
                        <li key={idx}>
                          <Icon size={20} />
                          <span>{feature.text}</span>
                        </li>
                      );
                    })}
                  </ul>
                </button>
              ))}
            </div>
            <button
              className='next-button'
              disabled={!canProceedStep1}
              onClick={() => setStep('artist')}
            >
              Weiter
              <ChevronRight size={20} />
            </button>
          </div>
        )}

        {step === 'artist' && (
          <div className='step-container'>
            <div className='step-header'>
              <button
                className='back-button'
                onClick={() => setStep('service')}
                aria-label='Zurück zu Service auswählen'
              >
                <ChevronLeft size={24} />
              </button>
              <h3>Künstler:in auswählen</h3>
            </div>
            <div className='artist-grid'>
              {artists.map((artist) => (
                <button
                  key={artist.id}
                  className={`artist-card ${selectedArtist === artist.id ? 'selected' : ''}`}
                  onClick={() => setSelectedArtist(artist.id)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      setSelectedArtist(artist.id);
                    }
                  }}
                  type='button'
                >
                  <div className='artist-photo'>
                    <img
                      src={artist.photo}
                      alt={`${artist.name} - ${artist.role}`}
                      loading='lazy'
                    />
                  </div>
                  <div className='artist-info'>
                    <h4>{artist.name}</h4>
                    <p>{artist.role}</p>
                    <p className='specialty'>{artist.specialty}</p>
                  </div>
                </button>
              ))}
            </div>
            <button
              className='next-button'
              disabled={!canProceedStep2}
              onClick={() => setStep('contact')}
            >
              Weiter
              <ChevronRight size={20} />
            </button>
          </div>
        )}

        {step === 'contact' && (
          <form className='step-container' onSubmit={handleSubmit}>
            <div className='step-header'>
              <button
                type='button'
                className='back-button'
                onClick={() => setStep('artist')}
                aria-label='Zurück zu Künstler:in auswählen'
              >
                <ChevronLeft size={24} />
              </button>
              <h3>Kontaktdaten</h3>
            </div>

            <div className='form-group'>
              <label htmlFor='name'>Name*</label>
              <input
                type='text'
                id='name'
                name='name'
                value={formData.name}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className='form-group'>
              <label htmlFor='email'>E-Mail*</label>
              <input
                type='email'
                id='email'
                name='email'
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className='form-group'>
              <label htmlFor='phone'>Telefon*</label>
              <input
                type='tel'
                id='phone'
                name='phone'
                value={formData.phone}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className='form-group'>
              <label htmlFor='date'>Gewünschter Termin*</label>
              <input
                type='date'
                id='date'
                name='date'
                value={formData.date}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className='form-group'>
              <label htmlFor='message'>Nachricht (optional)</label>
              <textarea
                id='message'
                name='message'
                rows={3}
                value={formData.message}
                onChange={handleInputChange}
              />
            </div>

            <div className='form-group checkbox-group'>
              <input
                type='checkbox'
                id='gdpr-consent'
                name='gdprConsent'
                checked={formData.gdprConsent}
                onChange={handleInputChange}
                required
              />
              <label htmlFor='gdpr-consent'>
                Ich stimme der Verarbeitung meiner Daten gemäß der Datenschutzerklärung zu.*
              </label>
            </div>

            <button type='submit' className='submit-button' disabled={!canProceedStep3}>
              Termin anfragen
            </button>
          </form>
        )}
      </div>

      {/* Loading Overlay */}
      {isSubmitting && (
        <div className='loading-overlay'>
          <div className='loading-spinner'>
            <Loader2 className='animate-spin' size={48} />
            <p>Ihre Buchung wird übermittelt...</p>
          </div>
        </div>
      )}

      {/* Error State */}
      {step === 'error' && submissionError && (
        <div className='error-state'>
          <AlertCircle size={48} className='error-icon' />
          <h3>Etwas ist schiefgelaufen</h3>
          <p>{submissionError}</p>
          <button
            className='retry-button'
            onClick={() => setStep('contact')}
            disabled={isSubmitting}
            aria-label={isSubmitting ? 'Versuche erneut zu senden...' : 'Erneut versuchen'}
          >
            {isSubmitting ? (
              <>
                <Loader2 className='animate-spin' size={20} />
                <span>Versuche erneut...</span>
              </>
            ) : (
              'Erneut versuchen'
            )}
          </button>
        </div>
      )}

      {/* Confirmation Screen */}
      {step === 'confirmation' && bookingResult && (
        <div className='confirmation-screen'>
          <CheckCircle2 size={64} className='success-icon' />
          <h3>Termin bestätigt!</h3>
          <p>Ihre Terminbuchung wurde erfolgreich übermittelt.</p>

          <div className='booking-details'>
            <div className='detail-row'>
              <span className='detail-label'>Buchungsnummer:</span>
              <span className='detail-value'>{bookingResult.bookingNumber}</span>
            </div>
            <div className='detail-row'>
              <span className='detail-label'>Service:</span>
              <span className='detail-value'>{bookingResult.serviceName}</span>
            </div>
            <div className='detail-row'>
              <span className='detail-label'>Künstler:in:</span>
              <span className='detail-value'>{bookingResult.artistName}</span>
            </div>
            <div className='detail-row'>
              <span className='detail-label'>Datum:</span>
              <span className='detail-value'>
                {new Date(bookingResult.date).toLocaleDateString('de-DE', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </span>
            </div>
          </div>

          <p className='confirmation-note'>
            Wir haben eine Bestätigungs-E-Mail mit allen Details gesendet. Bitte überprüfen Sie Ihr
            Postfach und den Spam-Ordner.
          </p>

          <button
            className='close-confirmation-button'
            onClick={onClose}
            aria-label='Modal schließen'
          >
            Schließen
          </button>
        </div>
      )}
    </div>
  );
};
