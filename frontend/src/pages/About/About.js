import './About.scss'
import NavBar from '../../components/NavBar/NavBar'
import { useApp } from "../../utils/AppContext"
import aboutBio from '../../assets/aboutBio/aboutBio'

function About() {
  const { lang } = useApp()
  const currentLang = ['fr', 'en', 'jp'].includes(lang) ? lang : 'fr'
  const bio = aboutBio[currentLang]
  console.log(bio)

  return (
    <main className='about'>
      <NavBar />
      <article
        className="about__bio"
        dangerouslySetInnerHTML={{ __html: bio }}
      >
      </article>
    </main>
  )
}

export default About