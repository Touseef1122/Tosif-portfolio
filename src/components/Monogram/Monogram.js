import { forwardRef, useId } from 'react';
import { classes } from 'utils/style';
import styles from './Monogram.module.css';

export const Monogram = forwardRef(({ highlight, className, ...props }, ref) => {
  const id = useId();
  const clipId = `${id}monogram-clip`;

  return (
    <svg
      aria-hidden
      className={classes(styles.monogram, className)}
      width="46"
      height="29"
      viewBox="0 0 46 29"
      ref={ref}
      {...props}
    >
      <defs>
        <clipPath id={clipId}>
          <path d="M0.5 0.5 h13.5 a0.84 0.84 0 0 1 0.84 0.84 v3.3 a0.84 0.84 0 0 1-0.84 0.84 H9.7 V28.16 a0.84 0.84 0 0 1-1.524 0.092 L7.7 27.5 V5.48 H2.5 a0.84 0.84 0 0 1-0.84-0.84 V1.34 A0.84 0.84 0 0 1 2.5 0.5 Z M19.2 1.8 A6.5 6.5 0 0 1 24.8 0 h2.6 a0.84 0.84 0 0 1 0.74 1.23 l-1.7 3.2 a0.84 0.84 0 0 1-0.74 0.44 H24.4 a2 2 0 0 0-2 2 v1.8 a2 2 0 0 0 1.2 1.83 l4.6 2.05 A6.5 6.5 0 0 1 32 18.4 v2.1 A6.5 6.5 0 0 1 25.5 27 h-2.6 a0.84 0.84 0 0 1-0.74-1.23 l1.7-3.2 a0.84 0.84 0 0 1 0.74-0.44 h1.1 a2 2 0 0 0 2-2 v-1.8 a2 2 0 0 0-1.2-1.83 l-4.6-2.05 A6.5 6.5 0 0 1 18.5 8.4 V6.3 A6.5 6.5 0 0 1 19.2 1.8 Z" />
        </clipPath>
      </defs>
      <rect clipPath={`url(#${clipId})`} width="100%" height="100%" />
      {highlight && (
        <g clipPath={`url(#${clipId})`}>
          <rect className={styles.highlight} width="100%" height="100%" />
        </g>
      )}
    </svg>
  );
});
