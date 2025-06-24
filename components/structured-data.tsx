import Script from 'next/script';

interface StructuredDataProps {
  title: string;
  description: string;
  url: string;
  logoUrl: string;
  address: {
    street: string;
    city: string;
    postalCode: string;
    region: string;
    country: string;
  };
  contact: {
    phone: string;
    email: string;
  };
  coordinates: {
    latitude: string;
    longitude: string;
  };
  openingHours: string[];
}

export function StructuredData({
  title,
  description,
  url,
  logoUrl,
  address,
  contact,
  coordinates,
  openingHours,
}: StructuredDataProps) {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: title,
    description: description,
    url: url,
    logo: logoUrl,
    image: `${url}/images/og-image.jpg`,
    telephone: contact.phone,
    email: contact.email,
    address: {
      '@type': 'PostalAddress',
      streetAddress: address.street,
      addressLocality: address.city,
      postalCode: address.postalCode,
      addressRegion: address.region,
      addressCountry: address.country,
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: coordinates.latitude,
      longitude: coordinates.longitude,
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: [
          'Monday',
          'Tuesday',
          'Wednesday',
          'Thursday',
          'Friday',
        ],
        opens: '07:00',
        closes: '15:30',
      },
    ],
    sameAs: [
      'https://www.facebook.com/zodborovany',
      // Add other social media profiles here
    ],
  };

  return (
    <Script 
      id="structured-data" 
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(structuredData, null, 2)
      }}
    />
  );
}
