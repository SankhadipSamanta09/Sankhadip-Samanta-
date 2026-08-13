import React, { useEffect, useRef } from 'react';
import { TimeOfDay } from '../types';

interface HighwayCanvasProps {
  speed: number; // 0 - 110
  timeOfDay: TimeOfDay;
  isRaining: boolean;
  isWiperActive: boolean;
  isHornBlowing: boolean;
  onMilestonePass?: (name: string) => void;
}

export const HighwayCanvas: React.FC<HighwayCanvasProps> = ({
  speed,
  timeOfDay,
  isRaining,
  isWiperActive,
  isHornBlowing,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let offset = 0;
    let wiperAngle = -Math.PI / 4;
    let wiperDirection = 1;

    // Particles
    const smokeParticles: Array<{ x: number; y: number; vx: number; vy: number; alpha: number; radius: number }> = [];
    const rainDrops: Array<{ x: number; y: number; speed: number; length: number }> = [];

    // Initialize rain drops
    for (let i = 0; i < 120; i++) {
      rainDrops.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        speed: 15 + Math.random() * 20,
        length: 10 + Math.random() * 15,
      });
    }

    const resize = () => {
      canvas.width = canvas.parentElement?.clientWidth || window.innerWidth;
      canvas.height = canvas.parentElement?.clientHeight || window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    // Milestones track
    const milestones = ['BARASAT 15 KM', 'BANDEL 20 KM', 'MEMARI 35 KM', 'BARDHAMAN 5 KM'];
    let currentMilestoneIdx = 0;
    let milestoneZ = 1000;

    const render = () => {
      const width = canvas.width;
      const height = canvas.height;

      // Camera shake on horn
      ctx.save();
      if (isHornBlowing) {
        const shakeX = (Math.random() - 0.5) * 8;
        const shakeY = (Math.random() - 0.5) * 8;
        ctx.translate(shakeX, shakeY);
      }

      // 1. Draw Sky
      const horizonY = height * 0.42;
      let skyGradient: CanvasGradient;

      if (timeOfDay === 'day') {
        skyGradient = ctx.createLinearGradient(0, 0, 0, horizonY);
        skyGradient.addColorStop(0, '#38bdf8');
        skyGradient.addColorStop(0.7, '#bae6fd');
        skyGradient.addColorStop(1, '#f0f9ff');
      } else if (timeOfDay === 'golden') {
        skyGradient = ctx.createLinearGradient(0, 0, 0, horizonY);
        skyGradient.addColorStop(0, '#9a3412');
        skyGradient.addColorStop(0.4, '#ea580c');
        skyGradient.addColorStop(0.8, '#f97316');
        skyGradient.addColorStop(1, '#fde047');
      } else {
        // Night
        skyGradient = ctx.createLinearGradient(0, 0, 0, horizonY);
        skyGradient.addColorStop(0, '#020617');
        skyGradient.addColorStop(0.7, '#0f172a');
        skyGradient.addColorStop(1, '#1e1b4b');
      }

      ctx.fillStyle = skyGradient;
      ctx.fillRect(0, 0, width, horizonY);

      // Stars at night
      if (timeOfDay === 'night') {
        ctx.fillStyle = '#ffffff';
        for (let i = 0; i < 60; i++) {
          const sx = (i * 137.5) % width;
          const sy = (i * 89.3) % (horizonY * 0.8);
          ctx.globalAlpha = 0.3 + (Math.sin(Date.now() * 0.003 + i) + 1) * 0.3;
          ctx.fillRect(sx, sy, 1.8, 1.8);
        }
        ctx.globalAlpha = 1.0;
      }

      // Sun / Moon
      if (timeOfDay === 'golden') {
        ctx.fillStyle = '#ffedd5';
        ctx.shadowColor = '#f97316';
        ctx.shadowBlur = 40;
        ctx.beginPath();
        ctx.arc(width * 0.5, horizonY - 10, 32, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
      } else if (timeOfDay === 'night') {
        ctx.fillStyle = '#fef08a';
        ctx.shadowColor = '#fef08a';
        ctx.shadowBlur = 20;
        ctx.beginPath();
        ctx.arc(width * 0.8, horizonY - 60, 24, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      // Distant Hills / Trees silhouette on Horizon
      ctx.fillStyle = timeOfDay === 'night' ? '#020617' : timeOfDay === 'golden' ? '#7c2d12' : '#15803d';
      ctx.beginPath();
      ctx.moveTo(0, horizonY);
      for (let x = 0; x <= width; x += 40) {
        const hillH = Math.sin(x * 0.01) * 18 + Math.cos(x * 0.02) * 12;
        ctx.lineTo(x, horizonY - Math.abs(hillH));
      }
      ctx.lineTo(width, horizonY);
      ctx.lineTo(0, horizonY);
      ctx.fill();

      // 2. Draw Ground / Paddy Fields
      const groundGradient = ctx.createLinearGradient(0, horizonY, 0, height);
      if (timeOfDay === 'day') {
        groundGradient.addColorStop(0, '#16a34a');
        groundGradient.addColorStop(1, '#15803d');
      } else if (timeOfDay === 'golden') {
        groundGradient.addColorStop(0, '#b45309');
        groundGradient.addColorStop(1, '#78350f');
      } else {
        groundGradient.addColorStop(0, '#0f172a');
        groundGradient.addColorStop(1, '#020617');
      }
      ctx.fillStyle = groundGradient;
      ctx.fillRect(0, horizonY, width, height - horizonY);

      // 3. Draw Perspective Road
      const vanishingX = width * 0.5;
      const roadTopWidth = 30;
      const roadBottomWidth = width * 0.85;

      const roadLeftTop = vanishingX - roadTopWidth / 2;
      const roadRightTop = vanishingX + roadTopWidth / 2;
      const roadLeftBottom = vanishingX - roadBottomWidth / 2;
      const roadRightBottom = vanishingX + roadBottomWidth / 2;

      ctx.fillStyle = timeOfDay === 'night' ? '#1e293b' : '#334155';
      ctx.beginPath();
      ctx.moveTo(roadLeftTop, horizonY);
      ctx.lineTo(roadRightTop, horizonY);
      ctx.lineTo(roadRightBottom, height);
      ctx.lineTo(roadLeftBottom, height);
      ctx.closePath();
      ctx.fill();

      // Road shoulder lines (White)
      ctx.strokeStyle = '#f8fafc';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(roadLeftTop, horizonY);
      ctx.lineTo(roadLeftBottom, height);
      ctx.moveTo(roadRightTop, horizonY);
      ctx.lineTo(roadRightBottom, height);
      ctx.stroke();

      // Moving Center Dashed Yellow Line
      offset += (speed * 0.18);
      if (offset > 100) offset = 0;

      ctx.strokeStyle = '#eab308';
      ctx.lineWidth = 6;
      ctx.setLineDash([25, 25]);
      ctx.lineDashOffset = -offset;

      ctx.beginPath();
      ctx.moveTo(vanishingX, horizonY);
      ctx.lineTo(vanishingX, height);
      ctx.stroke();
      ctx.setLineDash([]); // Reset dash

      // Night Headlight Beams
      if (timeOfDay === 'night') {
        const beamGrad = ctx.createRadialGradient(
          vanishingX, height * 0.85, 10,
          vanishingX, height * 0.85, width * 0.6
        );
        beamGrad.addColorStop(0, 'rgba(254, 240, 138, 0.45)');
        beamGrad.addColorStop(0.5, 'rgba(254, 240, 138, 0.18)');
        beamGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');

        ctx.fillStyle = beamGrad;
        ctx.beginPath();
        ctx.moveTo(vanishingX - 40, horizonY + 20);
        ctx.lineTo(vanishingX + 40, horizonY + 20);
        ctx.lineTo(roadRightBottom + 100, height);
        ctx.lineTo(roadLeftBottom - 100, height);
        ctx.fill();
      }

      // 4. Moving Side Trees & Poles
      const numPoles = 6;
      for (let i = 0; i < numPoles; i++) {
        const z = ((i * 200 + offset * 8) % 1200) / 1200;
        if (z < 0.05) continue;

        const pY = horizonY + (height - horizonY) * Math.pow(z, 2);
        const pXLeft = vanishingX - (roadTopWidth + (roadBottomWidth - roadTopWidth) * Math.pow(z, 2)) * 0.7;
        const pScale = z * 2.2;

        // Tree Left
        ctx.fillStyle = timeOfDay === 'night' ? '#0f172a' : '#14532d';
        ctx.beginPath();
        ctx.arc(pXLeft, pY - 25 * pScale, 18 * pScale, 0, Math.PI * 2);
        ctx.fill();

        // Trunk
        ctx.fillStyle = '#451a03';
        ctx.fillRect(pXLeft - 2 * pScale, pY - 12 * pScale, 4 * pScale, 12 * pScale);
      }

      // Milestone passing
      milestoneZ -= speed * 0.15;
      if (milestoneZ < 50) {
        milestoneZ = 1200;
        currentMilestoneIdx = (currentMilestoneIdx + 1) % milestones.length;
      }

      const mZNorm = milestoneZ / 1200;
      if (mZNorm > 0.05 && mZNorm < 1) {
        const mY = horizonY + (height - horizonY) * Math.pow(mZNorm, 2);
        const mX = vanishingX + (roadTopWidth + (roadBottomWidth - roadTopWidth) * Math.pow(mZNorm, 2)) * 0.65;
        const mScale = mZNorm * 1.8;

        // Draw Yellow / White Indian Highway Milestone
        ctx.fillStyle = '#eab308'; // Top yellow
        ctx.fillRect(mX - 10 * mScale, mY - 22 * mScale, 20 * mScale, 10 * mScale);
        ctx.fillStyle = '#ffffff'; // Bottom white
        ctx.fillRect(mX - 10 * mScale, mY - 12 * mScale, 20 * mScale, 12 * mScale);
        ctx.strokeStyle = '#000';
        ctx.lineWidth = 1;
        ctx.strokeRect(mX - 10 * mScale, mY - 22 * mScale, 20 * mScale, 22 * mScale);

        if (mScale > 0.8) {
          ctx.fillStyle = '#000000';
          ctx.font = `${Math.max(8, Math.floor(10 * mScale))}px sans-serif`;
          ctx.textAlign = 'center';
          ctx.fillText('NH-34', mX, mY - 14 * mScale);
          ctx.fillText(milestones[currentMilestoneIdx], mX, mY - 4 * mScale);
        }
      }

      // 5. Rain Overlay
      if (isRaining) {
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.4)';
        ctx.lineWidth = 1.2;
        rainDrops.forEach((drop) => {
          ctx.beginPath();
          ctx.moveTo(drop.x, drop.y);
          ctx.lineTo(drop.x - 3, drop.y + drop.length);
          ctx.stroke();

          drop.y += drop.speed + speed * 0.1;
          drop.x -= 1;
          if (drop.y > height) {
            drop.y = -20;
            drop.x = Math.random() * width;
          }
        });

        // Wiper animation
        if (isWiperActive) {
          wiperAngle += 0.06 * wiperDirection;
          if (wiperAngle > Math.PI / 3) wiperDirection = -1;
          if (wiperAngle < -Math.PI / 3) wiperDirection = 1;

          ctx.strokeStyle = '#0f172a';
          ctx.lineWidth = 6;
          const pivotX = width * 0.5;
          const pivotY = height;
          const length = height * 0.65;

          ctx.beginPath();
          ctx.moveTo(pivotX, pivotY);
          ctx.lineTo(
            pivotX + Math.sin(wiperAngle) * length,
            pivotY - Math.cos(wiperAngle) * length
          );
          ctx.stroke();
        }
      }

      // 6. Agarbatti Incense Smoke Particles (from bottom right dashboard)
      if (Math.random() < 0.6) {
        smokeParticles.push({
          x: width * 0.88 + (Math.random() - 0.5) * 4,
          y: height * 0.82,
          vx: (Math.random() - 0.5) * 0.5,
          vy: -1.2 - Math.random() * 0.8,
          alpha: 0.6,
          radius: 2 + Math.random() * 3,
        });
      }

      ctx.fillStyle = 'rgba(226, 232, 240, 0.25)';
      for (let i = smokeParticles.length - 1; i >= 0; i--) {
        const p = smokeParticles[i];
        p.x += p.vx + Math.sin(Date.now() * 0.005 + p.y * 0.05) * 0.4;
        p.y += p.vy;
        p.alpha -= 0.006;
        p.radius += 0.12;

        if (p.alpha <= 0) {
          smokeParticles.splice(i, 1);
          continue;
        }

        ctx.beginPath();
        ctx.globalAlpha = p.alpha;
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1.0;

      ctx.restore();
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resize);
    };
  }, [speed, timeOfDay, isRaining, isWiperActive, isHornBlowing]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full object-cover pointer-events-none z-0"
    />
  );
};
