import React, { useState, useEffect } from 'react';

export const StatusTicker: React.FC = () => {
  const [timeString, setTimeString] = useState<string>('22:43');
  const [dateString, setDateString] = useState<string>('Sunday, 6 September 2026');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      // Format 24hr time
      const hours = String(now.getHours()).padStart(2, '0');
      const minutes = String(now.getMinutes()).padStart(2, '0');
      setTimeString(`${hours}:${minutes}`);

      // Format date
      const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
      const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
      setDateString(`${days[now.getDay()]}, ${now.getDate()} ${months[now.getMonth()]} ${now.getFullYear()}`);
    };

    updateTime();
    const interval = setInterval(updateTime, 10000);
    return () => clearInterval(interval);
  }, []);

  const tickerItems = [
    { text: timeString, isTime: true },
    { text: 'Buffet returns Monday' },
    { text: 'Shawarma station firing', hasDot: true },
    { text: 'Jazz Night Thursdays, 5pm' },
    { text: 'Open now · 24 hours', hasDot: true },
    { text: `${dateString} · ${timeString}` },
    { text: 'Buffet returns Monday' },
    { text: 'Shawarma station firing', hasDot: true },
    { text: 'Jazz Night Thursdays, 5pm' },
    { text: 'Open now · 24 hours', hasDot: true },
  ];

  return (
    <div className="w-full bg-[#071E13] border-y border-[#123624] py-3 overflow-hidden text-xs sm:text-sm select-none">
      <div className="relative flex overflow-x-hidden">
        {/* Continuous ticker track */}
        <div className="flex animate-marquee whitespace-nowrap gap-8 items-center text-[#CFDCD4]">
          {tickerItems.concat(tickerItems).map((item, idx) => (
            <div key={idx} className="flex items-center gap-2.5">
              {item.hasDot && (
                <span className="w-2 h-2 rounded-full bg-[#22C55E] animate-pulse inline-block" />
              )}
              {item.isTime ? (
                <span className="font-mono font-medium text-white">{item.text}</span>
              ) : (
                <span className="font-normal">{item.text}</span>
              )}
              <span className="text-[#1D4A34] text-base leading-none">●</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
