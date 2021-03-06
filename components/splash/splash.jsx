import React from 'react';
import Container from '../container/container';
import Cube from '../cube/cube';
import Link from '../link/link';
import './splash-style';

export default props => {
  let { page } = props;

  return (
    <div className="splash">
      <section className="splash__section splash__sponsor">
        <Container className="splash__content splash_sponsorheadline">
          <h1 id="opencollective-banner" className="splash__sponsorheadline">Help support webpack!</h1>
          <p>By your contributions, donations, and sponsorship, you allow webpack to thrive.</p>
          <p>Your donations go directly towards supporting office hours, continued enhancements, and most importantly, great documentation and learning material!</p>
          
          <object type="image/svg+xml" data="https://opencollective.com/webpack/sponsors.svg"></object>
          <object type="image/svg+xml" data="https://opencollective.com/webpack/backers.svg"></object>
        </Container>
      </section>
      <section className="splash__viz">
        <div className="splash__modules">

        </div>

        <div className="splash__icon">
          <Cube className="splash__cube" depth={ 150 } />
        </div>

        <div className="splash__output">

        </div>

        <span className="splash__headline">
          webpack transforms your&nbsp;
          <Link to="/concepts/modules">modules</Link>
          &nbsp;into production-ready&nbsp;
          <Link to="/concepts/output">bundles</Link>
          &nbsp;and assets
        </span>
      </section>

      <section className="splash__section">
        <Container className="splash__content">
          <h1>{ page.title }</h1>
          <div dangerouslySetInnerHTML={{ 
            __html: page.content 
          }} />
        </Container>
      </section>        


    </div>
  );
};
