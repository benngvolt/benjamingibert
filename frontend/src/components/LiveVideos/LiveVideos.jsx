import './LiveVideos.scss'
import React, { useEffect, useState } from 'react'

import thumb1 from '../../assets/liveVideos/yt_6mGrBdChe2w.webp'
import thumb2 from '../../assets/liveVideos/yt_lf-_3V4W-kE.webp'
import thumb3 from '../../assets/liveVideos/yt_tzYqaKQO6ck.webp'

const VIDEOS = [
  { id: '6mGrBdChe2w', start: 12, thumb: thumb1, title: 'Intro + Franz Josef Glacier (live session in Paris)' },
  { id: 'lf-_3V4W-kE', start: 0, thumb: thumb2, title: 'Gemme IV + Tuis Garden - ‘hurricane’ version - (live session in Paris)' },
  { id: 'tzYqaKQO6ck', start: 0, thumb: thumb3, title: 'Native Forests (live session in Paris)' },
]

const PLAY_LABEL = { fr: 'Lire la vidéo', en: 'Play video', jp: '動画を再生' }

// Trois vidéos YouTube en « façade » : tant qu'on n'a pas cliqué, seule une miniature locale et une
// icône play sont affichées (aucune requête vers YouTube, aucune interface YouTube). Un clic charge le
// lecteur et lance la lecture ; en lancer une autre remplace la précédente par sa miniature, donc une
// seule vidéo joue à la fois.
function LiveVideos({ lang }) {
  const [activeId, setActiveId] = useState(null)

  // Même règle que les vidéos de LiveBox : si l'une d'elles passe en mode « avec le son », on arrête
  // les vidéos YouTube pour ne pas superposer deux sons.
  useEffect(() => {
    const onVolumeChange = (e) => {
      const el = e.target
      if (el instanceof HTMLMediaElement && !el.muted && el.volume > 0) setActiveId(null)
    }
    document.addEventListener('volumechange', onVolumeChange, true)
    return () => document.removeEventListener('volumechange', onVolumeChange, true)
  }, [])

  const play = (id) => {
    document.querySelectorAll('video').forEach((v) => { v.muted = true })
    setActiveId(id)
  }

  const playLabel = PLAY_LABEL[lang] || PLAY_LABEL.fr

  return (
    <section className="liveVideos">
      {VIDEOS.map((video) => (
        <div className="liveVideos_item" key={video.id}>
          {activeId === video.id ? (
            <iframe
              className="liveVideos_item_player"
              src={`https://www.youtube-nocookie.com/embed/${video.id}?autoplay=1&rel=0&playsinline=1&start=${video.start}`}
              title={video.title}
              allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
              allowFullScreen
            />
          ) : (
            <button
              type="button"
              className="liveVideos_item_facade"
              onClick={() => play(video.id)}
              aria-label={`${playLabel} : ${video.title}`}
            >
              <img className="liveVideos_item_thumb" src={video.thumb} alt="" loading="lazy" />
              <svg className="liveVideos_item_icon" viewBox="0 0 64 64" aria-hidden="true">
                <circle cx="32" cy="32" r="31" fill="rgba(0,0,0,0.55)" stroke="white" strokeWidth="2" />
                <path d="M26 19l20 13-20 13z" fill="white" />
              </svg>
            </button>
          )}
        </div>
      ))}
    </section>
  )
}

export default LiveVideos
