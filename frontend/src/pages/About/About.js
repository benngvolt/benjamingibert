import './About.scss'
import NavBar from '../../components/NavBar/NavBar'
import { useApp } from "../../utils/AppContext"
import { Helmet } from "react-helmet-async";

import aboutBio from '../../assets/aboutBio/aboutBio'

function About() {
  const { lang } = useApp()
  const currentLang = ['fr', 'en', 'jp'].includes(lang) ? lang : 'fr'
  const bio = aboutBio[currentLang]
  console.log(bio)

  return (
    <Helmet>
    <main className='about'>
      <NavBar />
      <article
        className="about__bio"
        dangerouslySetInnerHTML={{ __html: bio }}
      >
      </article>
    </main>
    </Helmet>
  )
}

export default About