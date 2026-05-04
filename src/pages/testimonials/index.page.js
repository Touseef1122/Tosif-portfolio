import { Meta } from 'components/Meta';
import { Section } from 'components/Section';
import { Heading } from 'components/Heading';
import { Text } from 'components/Text';
import { Divider } from 'components/Divider';
import { motion } from 'framer-motion';
import { useEffect, useRef } from 'react';
import styles from './testimonials.module.css';

const testimonials = [
  {
    name: 'John Doe',
    role: 'Project Manager',
    comment: 'Amazing work! The portfolio is stunning and the projects are innovative.',
    avatar: 'https://via.placeholder.com/60x60?text=JD',
  },
  {
    name: 'Jane Smith',
    role: 'UX Designer',
    comment: 'Great attention to detail and excellent user experience design.',
    avatar: 'https://via.placeholder.com/60x60?text=JS',
  },
  {
    name: 'Alex Johnson',
    role: 'CTO',
    comment: 'Impressive skills in full-stack development. Highly recommend!',
    avatar: 'https://via.placeholder.com/60x60?text=AJ',
  },
  {
    name: 'Emily Davis',
    role: 'Frontend Developer',
    comment: 'The code quality is top-notch and the designs are beautiful.',
    avatar: 'https://via.placeholder.com/60x60?text=ED',
  },
  {
    name: 'Michael Brown',
    role: 'Client',
    comment: 'Delivered on time and exceeded expectations. Fantastic collaboration.',
    avatar: 'https://via.placeholder.com/60x60?text=MB',
  },
  {
    name: 'Sarah Wilson',
    role: 'Product Owner',
    comment: 'Transformed our ideas into reality with exceptional technical expertise.',
    avatar: 'https://via.placeholder.com/60x60?text=SW',
  },
  {
    name: 'David Lee',
    role: 'Software Engineer',
    comment: 'Outstanding problem-solving skills and clean, maintainable code.',
    avatar: 'https://via.placeholder.com/60x60?text=DL',
  },
  {
    name: 'Lisa Garcia',
    role: 'Marketing Director',
    comment: 'The website looks professional and performs flawlessly across devices.',
    avatar: 'https://via.placeholder.com/60x60?text=LG',
  },
];

export default function Testimonials() {
  const scrollRef = useRef();

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    let scrollAmount = 0;
    const scrollSpeed = 1; // Adjust speed

    const autoScroll = () => {
      if (scrollContainer) {
        scrollAmount += scrollSpeed;
        if (scrollAmount >= scrollContainer.scrollWidth / 2) {
          scrollAmount = 0;
        }
        scrollContainer.scrollLeft = scrollAmount;
      }
    };

    const interval = setInterval(autoScroll, 50); // Adjust interval for smoothness

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <Meta
        title="Testimonials"
        description="Read testimonials from clients and colleagues about my work as a Full Stack Developer."
      />
      <Section>
        <Heading level={1}>Testimonials</Heading>
        <Divider />
        <div className={styles.testimonialsContainer}>
          <div className={styles.testimonials} ref={scrollRef}>
            {testimonials.concat(testimonials).map((testimonial, index) => (
              <motion.div
                key={`${testimonial.name}-${index}`}
                className={styles.testimonial}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                whileHover={{ scale: 1.05 }}
              >
                <img src={testimonial.avatar} alt={testimonial.name} className={styles.avatar} />
                <Text as="blockquote" className={styles.comment}>
                  "{testimonial.comment}"
                </Text>
                <Text className={styles.name}>- {testimonial.name}</Text>
                <Text className={styles.role}>{testimonial.role}</Text>
              </motion.div>
            ))}
          </div>
        </div>
      </Section>
    </>
  );
}
