import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { gsap } from 'gsap';

/* ─────────────────────────────────────────────
   Particle canvas background
───────────────────────────────────────────── */
const ParticleBackground = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;
        let animId: number;

        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        resize();
        window.addEventListener('resize', resize);

        /* mouse glow */
        const mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
        const onMove = (e: MouseEvent) => { mouse.x = e.clientX; mouse.y = e.clientY; };
        window.addEventListener('mousemove', onMove);

        /* particles */
        const COUNT = 80;
        const pts = Array.from({ length: COUNT }, () => ({
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            vx: (Math.random() - 0.5) * 0.35,
            vy: (Math.random() - 0.5) * 0.35,
            r: Math.random() * 1.6 + 0.4,
        }));

        const draw = () => {
            const W = canvas.width, H = canvas.height;
            ctx.clearRect(0, 0, W, H);
            ctx.fillStyle = '#000';
            ctx.fillRect(0, 0, W, H);

            /* cursor glow */
            const grd = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, 220);
            grd.addColorStop(0, 'rgba(255,255,255,0.07)');
            grd.addColorStop(0.5, 'rgba(160,140,255,0.04)');
            grd.addColorStop(1, 'transparent');
            ctx.fillStyle = grd;
            ctx.fillRect(0, 0, W, H);

            /* move + wrap */
            pts.forEach((p) => {
                p.x += p.vx; p.y += p.vy;
                if (p.x < 0) p.x = W; if (p.x > W) p.x = 0;
                if (p.y < 0) p.y = H; if (p.y > H) p.y = 0;
            });

            /* connection lines */
            for (let i = 0; i < pts.length; i++) {
                for (let j = i + 1; j < pts.length; j++) {
                    const dx = pts[i].x - pts[j].x, dy = pts[i].y - pts[j].y;
                    const d = Math.sqrt(dx * dx + dy * dy);
                    if (d < 110) {
                        ctx.beginPath();
                        ctx.strokeStyle = `rgba(255,255,255,${0.18 * (1 - d / 110)})`;
                        ctx.lineWidth = 0.5;
                        ctx.moveTo(pts[i].x, pts[i].y);
                        ctx.lineTo(pts[j].x, pts[j].y);
                        ctx.stroke();
                    }
                }
            }

            /* dots */
            pts.forEach((p) => {
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
                ctx.fillStyle = 'rgba(255,255,255,0.75)';
                ctx.fill();
            });

            animId = requestAnimationFrame(draw);
        };
        draw();

        return () => {
            cancelAnimationFrame(animId);
            window.removeEventListener('resize', resize);
            window.removeEventListener('mousemove', onMove);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            style={{ position: 'fixed', inset: 0, zIndex: 0 }}
        />
    );
};

/* ─────────────────────────────────────────────
   Butterfly SVG paths (from your original)
───────────────────────────────────────────── */
const WingLeft = () => (
    <svg
        viewBox="0 0 18.528 35.424"
        height="100%"
        xmlns="http://www.w3.org/2000/svg"
        style={{ position: 'relative', left: '2%', transformOrigin: 'center right' }}
    >
        <path
            d="M3.358 35.05c.435-.175.646-.408.861-.95.374-.94.698-1.52 1.145-2.05.78-.92 1.757-1.638 2.666-1.957.603-.212.9-.204 1.505.041.843.343 1.597.25 2.062-.254.95-1.029 3.95-6.873 5.841-11.376.869-2.07.831-1.882.797-3.962-.034-2.106-.024-2.064-.927-3.887-1.639-3.31-4.426-6.582-7.147-8.392C8.71 1.298 6.715.504 5.296.328c-.718-.09-2.465-.001-3.183.16C.943.752.279 1.268.279 1.917c0 .119.437 1.136.97 2.26.533 1.126 1.044 2.291 1.135 2.591.334 1.106.776 3.567.945 5.27.065.652.357 1.286.751 1.633.419.367 1.351.786 1.964.883.286.044.534.096.553.115.018.018-.129.128-.327.244-.761.446-1.432 1.439-1.74 2.574-.216.802-.194 2.914.045 4.121.24 1.212.575 2.318 1.031 3.403.46 1.092.535 1.458.439 2.135-.223 1.575-1.958 4.03-3.489 4.937-.693.41-.885.587-1.066.98-.173.375-.185.535-.069.953.223.802 1.206 1.326 1.937 1.033z"
            fill="#ffffff"
        />
    </svg>
);

const Body = () => (
    <svg
        viewBox="0 0 2.4 14.4"
        height="50%"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path
            d="M2.2 13c0 .641-.447 1.16-1 1.16-.553 0-1-.519-1-1.16V1.4C.2.759.647.24 1.2.24c.553 0 1 .519 1 1.16z"
            fill="#ffffff"
        />
    </svg>
);

const WingRight = () => (
    <svg
        viewBox="0 0 18.528 35.424"
        height="100%"
        xmlns="http://www.w3.org/2000/svg"
        style={{ position: 'relative', left: '-2%', transformOrigin: 'center left' }}
    >
        <path
            d="M15.105 35.155c-.42-.196-.627-.482-.902-1.253-.544-1.517-2.145-3.126-3.636-3.652-.69-.243-.887-.242-1.486.01-.617.26-1.342.278-1.798.045-.555-.283-1.76-2.262-3.476-5.708C2.628 22.232.984 18.575.455 17.144c-.236-.637-.237-.655-.237-2.485 0-2.164.01-2.209.9-4.013 1.011-2.049 2.53-4.189 4.185-5.9C7.679 2.293 9.783.995 12.49.313c.782-.197 1.554-.236 2.695-.137 1.619.14 2.38.38 2.882.909.21.22.246.321.243.684-.002.373-.122.67-.959 2.395-1.277 2.63-1.59 3.806-2.035 7.63-.111.951-.316 1.426-.809 1.87-.52.47-1.306.807-2.165.928l-.391.054.35.224c.897.574 1.58 1.674 1.834 2.956.193.969.12 2.791-.164 4.15-.222 1.061-.696 2.518-1.12 3.443-.336.735-.411 1.584-.203 2.3.505 1.738 2.056 3.692 3.736 4.705.693.417.938.83.874 1.476-.104 1.071-1.193 1.706-2.153 1.256z"
            fill="#ffffff"
        />
    </svg>
);

interface ButterflyLoaderProps {
    onComplete?: () => void;
    duration?: number;
}

/* ─────────────────────────────────────────────
   Main Loader Component
───────────────────────────────────────────── */
export default function ButterflyLoader({ onComplete, duration = 3000 }: ButterflyLoaderProps) {
    const [visible, setVisible] = useState(true);
    const [progress, setProgress] = useState(0);
    const wingLeftRef = useRef<HTMLDivElement>(null);
    const wingRightRef = useRef<HTMLDivElement>(null);
    const butterflyRef = useRef<HTMLDivElement>(null);
    const loaderRef = useRef<HTMLDivElement>(null);
    const gsapCtx = useRef<gsap.Context | null>(null);

    useEffect(() => {
        /* progress bar ticker */
        const start = Date.now();
        const tick = setInterval(() => {
            const p = Math.min(100, ((Date.now() - start) / duration) * 100);
            setProgress(Math.floor(p));
            if (p >= 100) clearInterval(tick);
        }, 30);

        /* ── GSAP wing flap ── */
        gsapCtx.current = gsap.context(() => {
            /* wing flap: rotateY on each wing */
            gsap.to(wingLeftRef.current, {
                rotateY: 60,
                duration: 0.45,
                ease: 'power1.inOut',
                yoyo: true,
                repeat: -1,
            });
            gsap.to(wingRightRef.current, {
                rotateY: -60,
                duration: 0.45,
                ease: 'power1.inOut',
                yoyo: true,
                repeat: -1,
            });

            /* gentle hover bob */
            gsap.to(butterflyRef.current, {
                y: 10,
                duration: 1.1,
                ease: 'sine.inOut',
                yoyo: true,
                repeat: -1,
            });
        });

        /* ── exit after duration ── */
        const exitTimer = setTimeout(() => {
            gsapCtx.current?.revert();
            /* fly-off upward */
            gsap.to(butterflyRef.current, {
                y: -220,
                opacity: 0,
                duration: 0.75,
                ease: 'power2.in',
                onComplete: () => {
                    gsap.to(loaderRef.current, {
                        opacity: 0,
                        duration: 0.4,
                        onComplete: () => {
                            setVisible(false);
                            onComplete?.();
                        },
                    });
                },
            });
        }, duration);

        return () => {
            clearInterval(tick);
            clearTimeout(exitTimer);
            gsapCtx.current?.revert();
        };
    }, [duration, onComplete]);

    if (!visible) return null;

    return (
        <AnimatePresence>
            <motion.div
                ref={loaderRef}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                style={styles.overlay}
            >
                <ParticleBackground />

                {/* butterfly */}
                <div ref={butterflyRef} style={styles.butterflyWrap}>
                    <div style={styles.loader}>
                        <div ref={wingLeftRef} style={styles.wingWrap}>
                            <WingLeft />
                        </div>
                        <Body />
                        <div ref={wingRightRef} style={styles.wingWrap}>
                            <WingRight />
                        </div>
                    </div>

                    {/* loading label */}
                    <motion.p
                        style={styles.label}
                        animate={{ opacity: [0.4, 1, 0.4] }}
                        transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
                    >
                        {progress < 100 ? `Loading... ${progress}%` : 'Welcome'}
                    </motion.p>
                </div>

                {/* progress bar */}
                <div style={styles.progressTrack}>
                    <motion.div
                        style={styles.progressFill}
                        animate={{ width: `${progress}%` }}
                        transition={{ ease: 'linear' }}
                    />
                </div>
            </motion.div>
        </AnimatePresence>
    );
};

/* ─────────────────────────────────────────────
   Demo wrapper — shows loader then reveals site
───────────────────────────────────────────── */
export function DemoApp() {
    const [loaded, setLoaded] = useState(false);

    return (
        <>
            {!loaded && (
                <ButterflyLoader duration={3500} onComplete={() => setLoaded(true)} />
            )}

            <AnimatePresence>
                {loaded && (
                    <motion.main
                        initial={{ opacity: 0, y: 24 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.9, ease: 'easeOut' }}
                        style={styles.site}
                    >
                        <h1 style={styles.siteHeading}>Your Portfolio</h1>
                        <p style={styles.siteBody}>The loader has finished — drop your real content here.</p>
                    </motion.main>
                )}
            </AnimatePresence>
        </>
    );
}

/* ─────────────────────────────────────────────
   Inline styles
───────────────────────────────────────────── */
const styles: Record<string, React.CSSProperties> = {
    overlay: {
        position: 'fixed',
        inset: 0,
        background: '#000',
        zIndex: 9999,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    },
    butterflyWrap: {
        position: 'relative',
        zIndex: 2,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '28px',
        filter: 'drop-shadow(0 10px 30px rgba(255,255,255,0.12))',
    },
    loader: {
        width: '90px',
        height: '90px',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 0,
    },
    wingWrap: {
        height: '100%',
        display: 'flex',
        alignItems: 'center',
    },
    label: {
        color: 'rgba(255,255,255,0.55)',
        fontSize: '11px',
        letterSpacing: '0.2em',
        textTransform: 'uppercase',
        fontFamily: 'system-ui, sans-serif',
        margin: 0,
    },
    progressTrack: {
        position: 'absolute',
        bottom: '48px',
        left: '50%',
        transform: 'translateX(-50%)',
        width: '180px',
        height: '1px',
        background: 'rgba(255,255,255,0.12)',
        borderRadius: '1px',
        overflow: 'hidden',
        zIndex: 2,
    },
    progressFill: {
        height: '100%',
        background: 'rgba(255,255,255,0.7)',
        borderRadius: '1px',
        width: '0%',
    },
    site: {
        minHeight: '100vh',
        background: '#000',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#fff',
        fontFamily: 'system-ui, sans-serif',
    },
    siteHeading: {
        fontSize: '2.5rem',
        fontWeight: 500,
        margin: 0,
        color: '#fff',
    },
    siteBody: {
        color: 'rgba(255,255,255,0.45)',
        marginTop: '12px',
        fontSize: '1rem',
    },
};
