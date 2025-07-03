import React, { useState, useEffect } from 'react';

interface CaptchaProps {
  onGenerate: (captcha: string) => void;
  width?: number;
  height?: number;
}

const Captcha: React.FC<CaptchaProps> = ({ onGenerate, width = 200, height = 60 }) => {
  const [captchaText, setCaptchaText] = useState('');

  const generateCaptcha = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = '';
    for (let i = 0; i < 6; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setCaptchaText(result);
    onGenerate(result);
  };

  useEffect(() => {
    generateCaptcha();
  }, []);

  const canvasRef = React.useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !captchaText) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear canvas
    ctx.clearRect(0, 0, width, height);

    // Background
    ctx.fillStyle = '#f3f4f6';
    ctx.fillRect(0, 0, width, height);

    // Add noise
    for (let i = 0; i < 50; i++) {
      ctx.fillStyle = `rgba(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255}, 0.1)`;
      ctx.fillRect(Math.random() * width, Math.random() * height, 2, 2);
    }

    // Add lines
    for (let i = 0; i < 3; i++) {
      ctx.strokeStyle = `rgba(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255}, 0.3)`;
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(Math.random() * width, Math.random() * height);
      ctx.lineTo(Math.random() * width, Math.random() * height);
      ctx.stroke();
    }

    // Draw text
    ctx.font = 'bold 24px Arial';
    ctx.fillStyle = '#1f2937';
    
    for (let i = 0; i < captchaText.length; i++) {
      const x = 20 + i * 28;
      const y = 35 + Math.random() * 10 - 5;
      const rotation = (Math.random() - 0.5) * 0.4;
      
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(rotation);
      ctx.fillText(captchaText[i], 0, 0);
      ctx.restore();
    }
  }, [captchaText, width, height]);

  return (
    <div className="flex flex-col items-center space-y-2">
      <canvas
        ref={canvasRef}
        width={width}
        height={height}
        className="border border-gray-300 rounded-lg cursor-pointer"
        onClick={generateCaptcha}
        title="Click to regenerate CAPTCHA"
      />
      <button
        type="button"
        onClick={generateCaptcha}
        className="text-sm text-gray-600 hover:text-gray-800 underline"
      >
        Refresh CAPTCHA
      </button>
    </div>
  );
};

export default Captcha; 