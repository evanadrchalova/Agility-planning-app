import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function AddTrainingView() {
  const navigate = useNavigate();
  const [type, setType] = useState('Big training');
  const [isTypeOpen, setIsTypeOpen] = useState(false);
  const [difficulty, setDifficulty] = useState(3);
  const [positives, setPositives] = useState('');
  const [toImprove, setToImprove] = useState('');

  const trainingTypes = [
    'Rest',
    'Short walk',
    'Long walk',
    'Small training',
    'Big training',
    'Fitness',
    'Swimming',
    'Intensive',
    'Other'
  ];

  const handleSave = (e) => {
    e.preventDefault();
    // TODO: Save to database
    console.log({ type, difficulty, positives, toImprove });
    navigate('/records');
  };

  return (
    <div className="min-h-screen bg-[#fffcfa]">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-md mx-auto px-6 h-14 flex items-center justify-between">
          <button className="flex items-center gap-2 opacity-80" onClick={() => navigate('/')}>
            <svg className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            <span className="font-bold text-base">Cancel</span>
          </button>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-md mx-auto px-4 py-8 space-y-4">
        <div className="bg-white rounded-2xl shadow-md p-6">
          <h1 className="text-xl font-bold text-gray-900 mb-6">Add Training Session</h1>

          <form onSubmit={handleSave} className="space-y-6">
            {/* Training Type */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Training type
              </label>

              {/* Selected item - always visible */}
              <button
                type="button"
                onClick={() => setIsTypeOpen(!isTypeOpen)}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-[#06B6D4]/10 border-2 border-[#06B6D4] transition-all"
              >
                {/* Icon with ring */}
                <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 bg-[#06B6D4] ring-4 ring-[#06B6D4]/30">
                  <span className="text-lg text-white">
                    {type === 'Rest' && '😴'}
                    {type === 'Short walk' && '🚶'}
                    {type === 'Long walk' && '🚶‍♂️'}
                    {type === 'Small training' && '🎯'}
                    {type === 'Big training' && '🏋️'}
                    {type === 'Fitness' && '💪'}
                    {type === 'Swimming' && '🏊'}
                    {type === 'Intensive' && '🔥'}
                    {type === 'Other' && '📝'}
                  </span>
                </div>

                {/* Label */}
                <span className="flex-1 text-left font-medium text-gray-900">
                  {type}
                </span>

                {/* Chevron - rotates when open */}
                <svg
                  className={`w-5 h-5 text-[#06B6D4] transition-transform ${isTypeOpen ? 'rotate-180' : ''}`}
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>

              {/* Dropdown options - shown when open */}
              {isTypeOpen && (
                <div className="mt-2 space-y-2 bg-white border-2 border-gray-200 rounded-xl p-2">
                  {trainingTypes.filter(t => t !== type).map((t) => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => {
                        setType(t);
                        setIsTypeOpen(false);
                      }}
                      className="w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-white hover:bg-gray-50 transition-all"
                    >
                      {/* Icon */}
                      <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 bg-gray-200">
                        <span className="text-lg text-gray-600">
                          {t === 'Rest' && '😴'}
                          {t === 'Short walk' && '🚶'}
                          {t === 'Long walk' && '🚶‍♂️'}
                          {t === 'Small training' && '🎯'}
                          {t === 'Big training' && '🏋️'}
                          {t === 'Fitness' && '💪'}
                          {t === 'Swimming' && '🏊'}
                          {t === 'Intensive' && '🔥'}
                          {t === 'Other' && '📝'}
                        </span>
                      </div>

                      {/* Label */}
                      <span className="flex-1 text-left font-medium text-gray-700">
                        {t}
                      </span>

                      {/* Chevron */}
                      <svg className="w-5 h-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                      </svg>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Difficulty */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Difficulty level
              </label>
              <div className="flex items-center gap-3">
                {[1, 2, 3, 4, 5].map((level) => (
                  <button
                    key={level}
                    type="button"
                    onClick={() => setDifficulty(level)}
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all ${
                      difficulty >= level
                        ? 'bg-[#06B6D4] text-white ring-4 ring-[#06B6D4]/30'
                        : 'bg-gray-200 text-gray-600'
                    }`}
                  >
                    {level}
                  </button>
                ))}
              </div>
            </div>

            {/* What went well */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                What went well
              </label>
              <textarea
                value={positives}
                onChange={(e) => setPositives(e.target.value)}
                rows={4}
                placeholder="Describe what worked well during this training..."
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-[#06B6D4] focus:ring-2 focus:ring-[#06B6D4]/20 outline-none resize-none"
              />
            </div>

            {/* To improve */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                To improve
              </label>
              <textarea
                value={toImprove}
                onChange={(e) => setToImprove(e.target.value)}
                rows={4}
                placeholder="What needs more work..."
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-[#06B6D4] focus:ring-2 focus:ring-[#06B6D4]/20 outline-none resize-none"
              />
            </div>

            {/* Save Button */}
            <button
              type="submit"
              className="w-full bg-[#06B6D4] text-white rounded-2xl shadow-md p-4 font-bold text-base"
            >
              Save Training Session
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}
