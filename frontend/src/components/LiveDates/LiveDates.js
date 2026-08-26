import './LiveDates.scss';
import React from 'react';
import liveDates from '../../assets/liveDates.json';

const pad = (n) => String(n).padStart(2, '0');

function LiveDates({ lang }) {
  const byYear = {};
  liveDates.forEach((show) => {
    if (!byYear[show.year]) byYear[show.year] = [];
    byYear[show.year].push(show);
  });

  const years = Object.keys(byYear).sort((a, b) => b - a);

  return (
    <section className="liveDates">
      <h3 className="liveDates_heading">
        {lang === 'fr' ? 'concerts' : lang === 'en' ? 'shows' : 'ライブ日程'}
      </h3>

      {years.map((year) => (
        <div className="liveDates_year" key={year}>
          <h4 className="liveDates_year_title">{year}</h4>
          <ul className="liveDates_year_list">
            {byYear[year]
              .slice()
              .sort((a, b) => b.month - a.month || b.day - a.day)
              .map((show, index) => (
                <li className="liveDates_year_list_item" key={index}>
                  <span className="liveDates_year_list_item_date">
                    {pad(show.day)}.{pad(show.month)}
                  </span>
                  <span className="liveDates_year_list_item_venue">{show.venue}</span>
                  <span className="liveDates_year_list_item_place">
                    {[show.city, show.country].filter(Boolean).join(', ')}
                  </span>
                </li>
              ))}
          </ul>
        </div>
      ))}
    </section>
  );
}

export default LiveDates;
