import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function AddTrainingView() {
  const navigate = useNavigate();
  const [type, setType] = useState('Big training');
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
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Training type
              </label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-[#06B6D4] focus:ring-2 focus:ring-[#06B6D4]/20 outline-none"
              >
                {trainingTypes.map((t) => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
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
