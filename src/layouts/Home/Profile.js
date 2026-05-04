import profileImgLarge from 'assets/profile.png';
import profileImgPlaceholder from 'assets/profile-placeholder.jpg';
import profileImg from 'assets/profile.png';
import { Button } from 'components/Button';
import { DecoderText } from 'components/DecoderText';
import { Divider } from 'components/Divider';
import { Heading } from 'components/Heading';
import { Image } from 'components/Image';
import { Link } from 'components/Link';
import { Section } from 'components/Section';
import { Text } from 'components/Text';
import { Transition } from 'components/Transition';
import dynamic from 'next/dynamic';
import { Fragment, useState } from 'react';
import { media } from 'utils/style';
import styles from './Profile.module.css';

const DecoderTextDynamic = dynamic(() =>
  import('components/DecoderText').then(mod => mod.DecoderText),
  { ssr: false }
);

const ProfileText = ({ visible, titleId }) => (
  <Fragment>
    <Heading className={styles.title} data-visible={visible} level={3} id={titleId}>
      <DecoderTextDynamic text="Hi there" start={visible} delay={500} />
    </Heading>
    <Text className={styles.description} data-visible={visible} size="l" as="p">
      <strong>SOFTWARE ENGINEER</strong><br />
      I am a Software Engineer at CureMD with 4 years of experience in building scalable, high-performance web applications.<br /> My work focuses on developing responsive, accessible interfaces and integrating efficient backend services to deliver reliable software solutions that enhance user experience, system efficiency, and long-term maintainability.
    </Text>
   
  </Fragment>
);

export const Profile = ({ id, visible, sectionRef }) => {
  const [focused, setFocused] = useState(false);
  const titleId = `${id}-title`;

  return (
    <Section
      className={styles.profile}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      as="section"
      id={id}
      ref={sectionRef}
      aria-labelledby={titleId}
      tabIndex={-1}
    >
      <Transition in={visible || focused} timeout={0}>
        {visible => (
          <div className={styles.content}>
            <div className={styles.column}>
              <ProfileText visible={visible} titleId={titleId} />

            </div>
            <div className={styles.column}>
              <div className={styles.tag} aria-hidden>
                <Divider
                  notchWidth="64px"
                  notchHeight="8px"
                  collapsed={!visible}
                  collapseDelay={1000}
                />
                <div className={styles.tagText} data-visible={visible}>
                  About Me
                </div>
              </div>
              <div className={styles.image}>
                <Image
                  reveal
                  delay={100}
                  placeholder={profileImgPlaceholder}
                  srcSet={[profileImg, profileImgLarge]}
                  sizes={`(max-width: ${media.mobile}px) 320px, (max-width: ${media.tablet}px) 400px, 480px`}
                  alt="Me standing in front of the Torii on Miyajima, an island off the coast of Hiroshima in Japan"
                />
                <svg
                  aria-hidden="true"
                  width="300"
                  height="400"
                  viewBox="0 160 168 569"
                  className={styles.svg}
                  data-visible={visible}
                >
                  <text fontFamily="'Noto Nastaliq Urdu', serif" fontSize="143" fontWeight="700" fill="currentColor" textAnchor="middle" dominantBaseline="middle" transform="translate(67.5, 382.5) rotate(90)">پروفائل</text>
                </svg>
              </div>
            </div>

            <div className={styles.details}>
              <Text className={styles.description} data-visible={visible} size="l" as="p">
                <strong>TECHNICAL EXPERTISE</strong><br />
                <strong>Frontend Development:</strong> HTML5, CSS3, JavaScript (ES6+), React, Responsive Web Design, Web Accessibility (a11y), SEO Best Practices<br />
                <strong>Backend Development:</strong> Node.js, Express.js, REST API Development & Integration<br />
                <strong>Software Engineering:</strong> SDLC, Clean Code Practices, Code Maintainability, Refactoring, Debugging, Performance Optimization<br />
                <strong>Design & Collaboration:</strong> Figma, PSD to Responsive Web Implementation, Cross-Functional Design Collaboration<br />
                <strong>Tools & Technologies:</strong> Git, GitHub, Version Control, Postman, Modern Development Workflows<br />
                <strong>AI & Productivity Tools:</strong> Experienced in leveraging modern AI tools to improve development efficiency, code quality, and problem-solving while continuously exploring new AI technologies.
              </Text>
              <Text className={styles.description} data-visible={visible} size="l" as="p">
                <strong>HOW I CAN CONTRIBUTE TO YOUR TEAM</strong><br />
                • Build scalable, maintainable, and high-performance web applications<br />
                • Write clean, self-documenting code with a strong focus on long-term maintainability and refactoring<br />
                • Develop responsive, accessible, and intuitive user interfaces that serve diverse users<br />
                • Implement SEO-friendly structures to improve search visibility and organic reach<br />
                • Translate design mockups (Figma, PSD) into pixel-perfect, production-ready web pages<br />
                • Design and integrate efficient backend APIs and services<br />
                • Optimize code performance and proactively clean up technical debt<br />
                • Collaborate effectively in agile and team-driven development environments<br />
                • Utilize modern development tools and AI-assisted workflows to improve productivity, code quality, and consistency
              </Text>
                <Button
                  secondary
                  className={styles.button}
                  data-visible={visible}
                  href="/contact"
                  icon="send"
                >
                  Send me a message
                </Button>
            </div>
          </div>
          
        )}
      </Transition>
    </Section>
  );
};
