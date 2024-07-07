"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const [minutes, setMinutes] = useState('');
  const [seconds, setSeconds] = useState('');
  const [reduceCooldown, setReduceCooldown] = useState(false);
  const [reduceCC, setReduceCC] = useState(false);
  const [result, setResult] = useState('');
  const [selectedIcon, setSelectedIcon] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const calculateResult = () => {
      const inputMinutes = parseFloat(minutes);
      const inputSeconds = parseFloat(seconds);

      if (!isNaN(inputMinutes) && !isNaN(inputSeconds)) {
        let totalSeconds = (inputMinutes * 60) + inputSeconds;

        if (selectedIcon) {
          // Apply the time based on the selected icon
          const iconTimeMap = {
            1: 120,
            2: 120,
            3: 120,
            4: 90,
            5: 90,
            6: 90,
            7: 60,
            8: 60,
            9: 30,
          };
          totalSeconds += iconTimeMap[selectedIcon];
        }

        if (reduceCooldown) {
          totalSeconds -= (totalSeconds * 0.15);
        }

        if (reduceCC) {
          totalSeconds -= (totalSeconds * 0.15);
        }

        // Calculate minutes and seconds
        const resultMinutes = Math.floor(totalSeconds / 60);
        const resultSeconds = Math.round(totalSeconds % 60);

        setResult(`${resultMinutes} นาทีและ ${resultSeconds} วินาที`);
      } else {
        setResult('คำตอบไม่ถูก');
      }
    };

    calculateResult();
  }, [minutes, seconds, reduceCooldown, reduceCC, selectedIcon]);

  const handleIconClick = (icon) => {
    setSelectedIcon(icon);
  };

  return (
    <main>
      <h1>คำนวณคูลดาวน์สกิลชาเลนเจอร์</h1>
      <form>
        <label htmlFor="minutes">โปรดใส่นาที</label>
        <input
          id="minutes"
          type="number"
          value={minutes}
          onChange={(e) => setMinutes(e.target.value)}
        />
        <br />
        <label htmlFor="seconds">โปรดใส่วินาที</label>
        <input
          id="seconds"
          type="number"
          value={seconds}
          onChange={(e) => setSeconds(e.target.value)}
        />
        <br />
        <label htmlFor="reduceCooldown">
          <input
            id="reduceCooldown"
            type="checkbox"
            checked={reduceCooldown}
            onChange={(e) => setReduceCooldown(e.target.checked)}
          />
          หากมีพลังแฝงลดคูลดาวน์สกิลชาเลนเจอร์
        </label>
        <br />
        <label htmlFor="reduceCC">
          <input
            id="reduceCC"
            type="checkbox"
            checked={reduceCC}
            onChange={(e) => setReduceCC(e.target.checked)}
          />
          หากศัตรูมีรองเท้าลดคูลดาวน์ (BETA/สำหรับแพทช์หน้า)
        </label>
        <br />
        <label>
        <p>ตอนนี้รูป Disturb ก็คือ Weak</p>
        </label>
        <div className="icon-container">
          {[...Array(9).keys()].map((index) => (
            <img
              key={index}
              src={`/images/icon${index + 1}.png`}
              alt={`Icon ${index + 1}`}
              className={`icon ${selectedIcon === index + 1 ? 'selected' : ''}`}
              onClick={() => handleIconClick(index + 1)}
            />
          ))}
        </div>
      </form>
      {result && (
        <div>
          <h2>ศัตรูจะมีสกิลชาเลนเจอร์ในนาทีที่</h2>
          <p>{result}</p>
        </div>
      )}
      <button onClick={() => router.push('/character')}>ไปยังหน้าข้อมูลตัวละคร</button>
    </main>
  );
}
