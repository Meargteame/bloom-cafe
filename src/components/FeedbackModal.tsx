import React, { useState } from 'react';
import { X, Star, Check, Gift, Sparkles } from 'lucide-react';

interface FeedbackModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const FeedbackModal: React.FC<FeedbackModalProps> = ({ isOpen, onClose }) => {
  const [rating, setRating] = useState<number>(5);
  const [hoverRating, setHoverRating] = useState<number>(0);
  const [tableNumber, setTableNumber] = useState<string>('Table 14');
  const [foodExperience, setFoodExperience] = useState<string>('Exceptional');
  const [favoriteDish, setFavoriteDish] = useState<string>('Shawarma & Macchiato');
  const [feedbackNote, setFeedbackNote] = useState<string>('');
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [submitted, setSubmitted] = useState<boolean>(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-xl bg-[#0B281B] border border-[#1C4E37] rounded-3xl shadow-2xl flex flex-col overflow-hidden text-white"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 sm:p-8 border-b border-[#16422E] flex items-center justify-between bg-[#7E5229]">
          <div>
            <span className="text-xs font-bold tracking-[0.22em] text-[#FFDF9B] uppercase block mb-1">
              TABLE FEEDBACK
            </span>
            <h2 className="font-editorial text-3xl sm:text-4xl text-white">
              Tell us how <span className="italic text-[#F4B838]">we did</span>.
            </h2>
          </div>
          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-black/30 hover:bg-black/50 flex items-center justify-center text-white transition-colors cursor-pointer"
          >
            <X size={20} />
          </button>
        </div>

        {submitted ? (
          <div className="p-10 sm:p-12 text-center space-y-5">
            <div className="w-16 h-16 rounded-full bg-[#F4B838] text-[#0B281B] flex items-center justify-center mx-auto shadow-lg">
              <Gift size={32} strokeWidth={2.5} />
            </div>
            <h3 className="font-editorial text-4xl text-[#FAF8F5]">
              You're in the Draw!
            </h3>
            <p className="text-[#CAD7CF] text-base max-w-md mx-auto leading-relaxed">
              Thank you for sharing your thoughts. One table every week gets dessert on the house, and we'll text you at <strong className="text-[#F4B838]">{phoneNumber || 'your number'}</strong> if you're selected!
            </p>
            <div className="p-4 bg-[#082015] rounded-2xl border border-[#164430] text-xs text-[#9EBEAF]">
              ★ Every table · every week · one dessert on the house
            </div>
            <button
              onClick={() => {
                setSubmitted(false);
                onClose();
              }}
              className="px-8 py-3.5 bg-[#F4B838] text-[#0B281B] font-bold text-sm tracking-wider uppercase rounded-full hover:bg-[#e6a92b] transition-all cursor-pointer"
            >
              Done
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-6 overflow-y-auto max-h-[75vh]">
            <div className="p-3.5 bg-[#082015] rounded-2xl border border-[#174530] text-xs text-[#CAD6CD] flex items-center gap-2.5">
              <Sparkles size={18} className="text-[#F4B838] flex-shrink-0" />
              <span>Thirty seconds, four questions, no sign-in required.</span>
            </div>

            {/* Question 1: Star Rating */}
            <div>
              <label className="text-xs font-bold tracking-wider text-[#F4B838] uppercase block mb-2">
                1. Overall Dining Experience
              </label>
              <div className="flex items-center gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    onMouseEnter={() => setHoverRating(star)}
                    onMouseLeave={() => setHoverRating(0)}
                    className="p-1 focus:outline-none transition-transform hover:scale-110 cursor-pointer"
                  >
                    <Star
                      size={28}
                      className={`${
                        (hoverRating || rating) >= star
                          ? 'text-[#F4B838] fill-[#F4B838]'
                          : 'text-gray-600'
                      } transition-colors`}
                    />
                  </button>
                ))}
                <span className="text-sm text-gray-300 ml-2 font-medium">
                  {rating === 5 ? 'Exceptional' : rating === 4 ? 'Great' : rating === 3 ? 'Good' : 'Needs attention'}
                </span>
              </div>
            </div>

            {/* Question 2: Table & Food Quality */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold tracking-wider text-[#F4B838] uppercase block mb-1.5">
                  2. Your Table Number
                </label>
                <input
                  type="text"
                  value={tableNumber}
                  onChange={(e) => setTableNumber(e.target.value)}
                  placeholder="e.g. Table 7 or Coffee Bar"
                  className="w-full bg-[#082015] border border-[#184531] rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#F4B838]"
                />
              </div>

              <div>
                <label className="text-xs font-bold tracking-wider text-[#F4B838] uppercase block mb-1.5">
                  3. Food & Coffee Quality
                </label>
                <select
                  value={foodExperience}
                  onChange={(e) => setFoodExperience(e.target.value)}
                  className="w-full bg-[#082015] border border-[#184531] rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#F4B838]"
                >
                  <option value="Exceptional">Delicious & Fresh</option>
                  <option value="Good">Satisfying</option>
                  <option value="Average">Average</option>
                </select>
              </div>
            </div>

            {/* Question 4: Favorite Dish or Notes */}
            <div>
              <label className="text-xs font-bold tracking-wider text-[#F4B838] uppercase block mb-1.5">
                4. What did you enjoy the most today?
              </label>
              <textarea
                value={feedbackNote}
                onChange={(e) => setFeedbackNote(e.target.value)}
                placeholder="The macchiato aroma, shawarma wrap, jazz vibes, friendly staff..."
                rows={3}
                className="w-full bg-[#082015] border border-[#184531] rounded-xl px-4 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#F4B838]"
              />
            </div>

            {/* Phone for Free Dessert Giveaway */}
            <div>
              <label className="text-xs font-bold tracking-wider text-[#F4B838] uppercase block mb-1.5">
                Phone Number (For Weekly Free Dessert Draw)
              </label>
              <input
                type="tel"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                placeholder="+251 91 234 5678"
                className="w-full bg-[#082015] border border-[#184531] rounded-xl px-4 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#F4B838]"
                required
              />
              <span className="text-[11px] text-[#A6BCB0] mt-1 block">
                We only use this to contact weekly winners. No marketing spam.
              </span>
            </div>

            {/* Submit CTA */}
            <div className="pt-2">
              <button
                type="submit"
                className="w-full py-4 bg-[#F4B838] hover:bg-[#e2a82d] text-[#0B281B] font-bold text-sm tracking-wider uppercase rounded-full transition-all cursor-pointer shadow-lg"
              >
                SUBMIT FEEDBACK
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
