import { lazy, Suspense } from 'react'
import { Link, Route, Routes } from 'react-router-dom'
import { ScrollToTop } from './components/common/ScrollToTop'
import { MainLayout } from './components/layout/MainLayout'
import { PageLoader } from './components/layout/PageLoader'

const HomePage = lazy(() =>
  import('./pages/Home/HomePage').then((m) => ({ default: m.HomePage })),
)
const AboutPage = lazy(() =>
  import('./pages/About/AboutPage').then((m) => ({ default: m.AboutPage })),
)
const PortfolioPage = lazy(() =>
  import('./pages/Portfolio/PortfolioPage').then((m) => ({ default: m.PortfolioPage })),
)
const WeddingPage = lazy(() =>
  import('./pages/Wedding/WeddingPage').then((m) => ({ default: m.WeddingPage })),
)
const PreWeddingPage = lazy(() =>
  import('./pages/PreWedding/PreWeddingPage').then((m) => ({ default: m.PreWeddingPage })),
)
const PortraitPage = lazy(() =>
  import('./pages/Portrait/PortraitPage').then((m) => ({ default: m.PortraitPage })),
)
const EventsPage = lazy(() =>
  import('./pages/Events/EventsPage').then((m) => ({ default: m.EventsPage })),
)
const CouplePage = lazy(() =>
  import('./pages/Couple/CouplePage').then((m) => ({ default: m.CouplePage })),
)
const ServicesPage = lazy(() =>
  import('./pages/Services/ServicesPage').then((m) => ({ default: m.ServicesPage })),
)
const ContactPage = lazy(() =>
  import('./pages/Contact/ContactPage').then((m) => ({ default: m.ContactPage })),
)
const BookingPage = lazy(() =>
  import('./pages/Booking/BookingPage').then((m) => ({ default: m.BookingPage })),
)

function RouteFallback() {
  return (
    <div className="flex min-h-[50vh] items-center justify-center pt-28">
      <p className="text-[0.7rem] tracking-[0.24em] text-soft-gray uppercase">Loading</p>
    </div>
  )
}

function NotFoundPage() {
  return (
    <div className="section-pad container-wide py-40 text-center">
      <h1 className="font-serif text-4xl text-deep-brown">Page not found</h1>
      <p className="mt-4 text-soft-gray">The page you are looking for does not exist.</p>
      <Link
        to="/"
        className="mt-8 inline-block text-sm tracking-[0.16em] text-chocolate uppercase"
      >
        Return home
      </Link>
    </div>
  )
}

export default function App() {
  return (
    <>
      <PageLoader />
      <ScrollToTop />
      <Suspense fallback={<RouteFallback />}>
        <Routes>
          <Route element={<MainLayout />}>
            <Route index element={<HomePage />} />
            <Route path="about" element={<AboutPage />} />
            <Route path="portfolio" element={<PortfolioPage />} />
            <Route path="wedding" element={<WeddingPage />} />
            <Route path="pre-wedding" element={<PreWeddingPage />} />
            <Route path="portrait" element={<PortraitPage />} />
            <Route path="events" element={<EventsPage />} />
            <Route path="couple" element={<CouplePage />} />
            <Route path="services" element={<ServicesPage />} />
            <Route path="contact" element={<ContactPage />} />
            <Route path="booking" element={<BookingPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </Suspense>
    </>
  )
}
