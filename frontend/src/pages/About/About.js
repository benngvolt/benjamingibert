import './About.scss'
import NavBar from '../../components/NavBar/NavBar'
import { useApp } from "../../utils/AppContext"
import { Helmet } from "react-helmet-async";

import aboutBio from '../../assets/aboutBio/aboutBio'
import portraitEPK from '../../assets/portraitEPK.webp'

function About() {
  const { lang } = useApp()
  const currentLang = ['fr', 'en', 'jp'].includes(lang) ? lang : 'fr'
  const bio = aboutBio[currentLang]

  return (
    <main className='about'>
      <Helmet>
        <title>Benjamin Gibert — Bio</title>
        <link
          rel="canonical"
          href="https://benjamingibert.com/about"
        />
      </Helmet>
      <NavBar />
      <img className="about__portrait" src={portraitEPK} alt="Benjamin Gibert" />
      <article
        className="about__bio"
        dangerouslySetInnerHTML={{ __html: bio.text }}
      >
      </article>
    </main>
  )
}

export default About