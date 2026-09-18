import './globals.css'

// DEMO CONFIGURATION:
// This deployment is a client preview/demo on Vercel.
// Robots are set to noindex/nofollow to prevent search engines from treating the demo URL as the official hospital site.
// When moving to the hospital's verified domain, set NEXT_PUBLIC_IS_PRODUCTION_SITE="true" or toggle robots to index: true, follow: true.
const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'https://satyahospitals.in');

export const metadata = {
  metadataBase: new URL(baseUrl),
  title: 'Satya Hospitals – Orthopaedic Doctor in Machilipatnam | Dr. Satya Phanindra Kurella',
  description: 'Satya Hospitals is Machilipatnam\'s trusted orthopaedic & pain clinic. Dr. Satya Phanindra Kurella (MBBS, D.Ortho, DNB Ortho, FIJR, FIRD) specialises in joint replacement, spine care & trauma. Book today.',
  keywords: 'orthopaedic doctor Machilipatnam, joint replacement Machilipatnam, spine care Andhra Pradesh, Dr Satya Phanindra Kurella, orthopaedic clinic Krishna district, knee replacement Machilipatnam',
  openGraph: {
    title: 'Satya Hospitals – Orthopaedic Doctor in Machilipatnam',
    description: 'Focused orthopaedic, joint replacement, spine & pain care. Serving Machilipatnam & Krishna District. Book a consultation today.',
    url: baseUrl,
    siteName: 'Satya Hospitals',
    images: [
      {
        url: '/doctor-hero.png',
        width: 1200,
        height: 630,
        alt: 'Dr. Satya Phanindra Kurella – Orthopaedic Specialist, Machilipatnam',
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Satya Hospitals – Orthopaedic Doctor in Machilipatnam',
    description: 'Joint replacement, spine care & pain management. Dr. Satya Phanindra Kurella. Book on WhatsApp.',
    images: ['/doctor-hero.png'],
  },
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: {
      index: false,
      follow: false,
      noimageindex: true,
    },
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'MedicalClinic',
      '@id': 'https://satyahospitals.in/#organization',
      name: 'Satya Hospitals',
      alternateName: 'Satya Orthopaedic & Pain Clinic',
      description: 'Specialised orthopaedic and pain clinic in Machilipatnam, Andhra Pradesh. Expertise in joint replacement, spine care, fracture treatment, and rehabilitation.',
      url: 'https://satyahospitals.in',
      telephone: '+91-7207806099',
      image: 'https://satyahospitals.in/facility-building.png',
      priceRange: '₹₹',
      medicalSpecialty: 'Orthopedic',
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Government Hospital Road, Ramanaidupeta',
        addressLocality: 'Machilipatnam',
        addressRegion: 'Andhra Pradesh',
        postalCode: '521001',
        addressCountry: 'IN',
      },
      geo: {
        '@type': 'GeoCoordinates',
        latitude: '16.1875',
        longitude: '81.1389',
      },
      openingHoursSpecification: [
        {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
          opens: '09:00',
          closes: '13:00',
        },
        {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
          opens: '17:00',
          closes: '20:00',
        },
        {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: 'Sunday',
          opens: '10:00',
          closes: '13:00',
        },
      ],
      sameAs: ['https://www.instagram.com/satyahospitalsmtm/', 'https://maps.app.goo.gl/sHKrkJkcrnajF3yq8'],
      hasMap: 'https://maps.app.goo.gl/sHKrkJkcrnajF3yq8',
    },
    {
      '@type': 'Physician',
      '@id': 'https://satyahospitals.in/#doctor',
      name: 'Dr. Satya Phanindra Kurella',
      jobTitle: 'Orthopaedic & Joint Replacement Specialist',
      description: 'Dr. Satya Phanindra Kurella holds MBBS, D.Ortho, DNB Ortho, FIJR, and FIRD qualifications. Specialises in joint replacement, arthroscopy, spine care, and orthopaedic trauma at Satya Hospitals, Machilipatnam.',
      medicalSpecialty: 'Orthopedic',
      image: 'https://satyahospitals.in/doctor-profile.png',
      worksFor: { '@id': 'https://satyahospitals.in/#organization' },
      hasCredential: [
        { '@type': 'EducationalOccupationalCredential', credentialCategory: 'degree', name: 'MBBS' },
        { '@type': 'EducationalOccupationalCredential', credentialCategory: 'degree', name: 'D.Ortho' },
        { '@type': 'EducationalOccupationalCredential', credentialCategory: 'degree', name: 'DNB Ortho' },
        { '@type': 'EducationalOccupationalCredential', credentialCategory: 'certification', name: 'FIJR – Fellow, Indian Joint Replacement' },
        { '@type': 'EducationalOccupationalCredential', credentialCategory: 'certification', name: 'FIRD – Fellow, Indian Reconstructive & Disability' },
      ],
    },
  ],
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>{children}</body>
    </html>
  )
}
