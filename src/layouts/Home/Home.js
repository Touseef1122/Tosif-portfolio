import royalFleetTexture from 'assets/royal-fleet.webp';
import oncentricTexture from 'assets/oncentric.webp';
import ehrReviewsTexture from 'assets/ehr-reviews.webp';
import { Footer } from 'components/Footer';
import { Meta } from 'components/Meta';
import { Intro } from 'layouts/Home/Intro';
import { Profile } from 'layouts/Home/Profile';
import { ProjectSummary } from 'layouts/Home/ProjectSummary';
import { useEffect, useRef, useState } from 'react';
import styles from './Home.module.css';

const disciplines = ['Developer', 'React.js', 'Next.js', 'Angular', 'Full Stack'];

export const Home = () => {
  const [visibleSections, setVisibleSections] = useState([]);
  const [scrollIndicatorHidden, setScrollIndicatorHidden] = useState(false);
  const intro = useRef();
  const projectOne = useRef();
  const projectTwo = useRef();
  const projectThree = useRef();
  const details = useRef();

  useEffect(() => {
    const sections = [intro, projectOne, projectTwo, projectThree, details];

    const sectionObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const section = entry.target;
            observer.unobserve(section);
            if (visibleSections.includes(section)) return;
            setVisibleSections(prevSections => [...prevSections, section]);
          }
        });
      },
      { rootMargin: '0px 0px -10% 0px', threshold: 0.1 }
    );

    const indicatorObserver = new IntersectionObserver(
      ([entry]) => {
        setScrollIndicatorHidden(!entry.isIntersecting);
      },
      { rootMargin: '-100% 0px 0px 0px' }
    );

    sections.forEach(section => {
      sectionObserver.observe(section.current);
    });

    indicatorObserver.observe(intro.current);

    return () => {
      sectionObserver.disconnect();
      indicatorObserver.disconnect();
    };
  }, [visibleSections]);

  return (
    <div className={styles.home}>
      <Meta
        title="Full Stack Developer"
        description="Portfolio of Touseef Shahbaz — a skilled Full Stack Developer with over 3 years of experience, enhancing healthcare applications using Angular, ASP, React.js, and WordPress."
      />
      <Intro
        id="intro"
        sectionRef={intro}
        disciplines={disciplines}
        scrollIndicatorHidden={scrollIndicatorHidden}
      />
      <ProjectSummary
        id="project-1"
        sectionRef={projectOne}
        visible={visibleSections.includes(projectOne.current)}
        index={1}
        title="Royal Fleet"
        description="A responsive web application built with Next.js. I developed a user-friendly, cleanly coded interface with responsive design principles to ensure seamless navigation across all devices."
        buttonText="View project"
        buttonLink="https://royal-fleet.vercel.app/auth/login-cover/"
        model={{
          type: 'laptop',
          alt: 'Royal Fleet fleet management app',
          textures: [
            {
              srcSet: [royalFleetTexture],
              placeholder: royalFleetTexture,
            },
          ],
        }}
      />
      <ProjectSummary
        id="project-2"
        alternate
        sectionRef={projectTwo}
        visible={visibleSections.includes(projectTwo.current)}
        index={2}
        title="Oncentric"
        description="Built with PHP and Bootstrap, this responsive web application features a clean, user-friendly interface. I implemented responsive design principles to deliver seamless navigation"
        buttonText="View project"
        buttonLink="https://oncentric.com/"
        model={{
          type: 'laptop',
          alt: 'AutoBid-Up Oncentric',
          textures: [
            {
              srcSet: [oncentricTexture],
              placeholder: oncentricTexture,
            },
          ],
        }}
      />
      <ProjectSummary
        id="project-3"
        sectionRef={projectThree}
        visible={visibleSections.includes(projectThree.current)}
        index={3}
        title="Ehr Reviews"
        description="A legacy project that I modernized. I refactored and cleaned the existing codebase, updated the user interface, and created new APIs to improve functionality and performance."
        buttonText="View project"
        buttonLink="import volkiharEnderalLogo from './assets/volkihar-enderal-logo.png';
https://www.ehrreviews.com/"
        model={{
          type: 'laptop',
          alt: 'LawMinder legal management platform',
          textures: [
            {
              srcSet: [ehrReviewsTexture],
              placeholder: ehrReviewsTexture,
            },
          ],
        }}
      />
      <Profile
        sectionRef={details}
        visible={visibleSections.includes(details.current)}
        id="details"
      />
      <Footer />
    </div>
  );
};