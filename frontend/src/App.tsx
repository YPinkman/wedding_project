import './App.css'
import RSVPForm from './components/RSVPForm'
import BlessingForm from './components/BlessingForm'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import CountdownSection from './components/CountdownSection'
import AIStylist from './components/AIStylist'
import LoveStory from './components/LoveStory'
import PhotoGallery from './components/PhotoGallery'
import ScheduleSection from './components/ScheduleSection'
import LocationSection from './components/LocationSection'
import FadeInSection from './components/FadeInSection'

function App() {
  return (
    <div>
      <header className="page-title">智能婚礼邀请函 Demo</header>
      <Navbar />
      <Hero />
      <CountdownSection />
      <LoveStory />
      <PhotoGallery />
      <ScheduleSection />
      <LocationSection />
      <FadeInSection>
        <AIStylist />
      </FadeInSection>
      <FadeInSection>
        <div className="container">
          <RSVPForm />
        </div>
      </FadeInSection>
      <FadeInSection>
        <div className="container">
          <BlessingForm />
        </div>
      </FadeInSection>
    </div>
  )
}

export default App
