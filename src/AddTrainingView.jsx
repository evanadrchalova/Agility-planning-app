import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Icon components
const TrainingIcon = ({ type, className }) => {
  const icons = {
    'Rest': (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
      </svg>
    ),
    'Short walk': (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" opacity="0.5" />
      </svg>
    ),
    'Long walk': (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
      </svg>
    ),
    'Small training': (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <circle cx="12" cy="12" r="10" />
        <circle cx="12" cy="12" r="6" />
        <circle cx="12" cy="12" r="2" />
      </svg>
    ),
    'Big training': (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M6.5 6.5l11 11M6.5 17.5l11-11" />
        <circle cx="12" cy="12" r="10" />
      </svg>
    ),
    'Fitness': (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M6 7v10M10 5v14M14 5v14M18 7v10" />
      </svg>
    ),
    'Swimming': (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M2 15c.6.5 1.2 1 2.5 1 1.3 0 1.9-.5 2.5-1s1.2-1 2.5-1c1.3 0 1.9.5 2.5 1s1.2 1 2.5 1c1.3 0 1.9-.5 2.5-1s1.2-1 2.5-1c1.3 0 1.9.5 2.5 1M2 19c.6.5 1.2 1 2.5 1 1.3 0 1.9-.5 2.5-1s1.2-1 2.5-1c1.3 0 1.9.5 2.5 1s1.2 1 2.5 1c1.3 0 1.9-.5 2.5-1s1.2-1 2.5-1c1.3 0 1.9.5 2.5 1" />
        <path d="M12 5a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" opacity="0.5" />
      </svg>
    ),
    'Intensive': (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
      </svg>
    ),
    'Other': (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <circle cx="12" cy="12" r="1" />
        <circle cx="19" cy="12" r="1" />
        <circle cx="5" cy="12" r="1" />
      </svg>
    ),
  };

  return icons[type] || icons['Other'];
};

export default function AddTrainingView() {
  const navigate = useNavigate();
  const [type, setType] = useState('Big training');
  const [isTypeOpen, setIsTypeOpen] = useState(false);
  const [difficulty, setDifficulty] = useState(3);
  const [positives, setPositives] = useState('');
  const [toImprove, setToImprove] = useState('');
  const [addToTodo, setAddToTodo] = useState(false);
  const [todoText, setTodoText] = useState('');

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
      <header className="bg-white border-b-2 border-[#06B6D4]">
        <div className="max-w-md mx-auto px-6 h-14 flex items-center justify-between">
          <button className="flex items-center gap-2 opacity-80" onClick={() => navigate('/')}>
            <svg className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            <span className="font-bold text-base">Back</span>
          </button>
          <div className="flex items-center gap-3">
            <button className="w-6 h-6">
              <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
                <circle cx="12" cy="8" r="4" stroke="#12C7E5" strokeWidth="2"/>
                <path d="M4 20c0-4 3.6-6 8-6s8 2 8 6" stroke="#12C7E5" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </button>
            <button className="w-6 h-6">
              <div className="space-y-1">
                <div className="h-0.5 w-6 bg-[#12C7E5]"></div>
                <div className="h-0.5 w-6 bg-[#12C7E5]"></div>
                <div className="h-0.5 w-6 bg-[#12C7E5]"></div>
              </div>
            </button>
          </div>
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
                className="w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-[#06B6D4]/10 border-2 border-[#06B6D4]/20 transition-all"
              >
                {/* Icon with ring */}
                <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 bg-[#06B6D4] ring-4 ring-[#06B6D4]/30">
                  <TrainingIcon type={type} className="w-5 h-5 text-white" />
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
                <div className="mt-2 space-y-2 bg-[#06B6D4]/10 border-2 border-[#06B6D4]/20 rounded-xl p-2">
                  {trainingTypes.filter(t => t !== type).map((t) => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => {
                        setType(t);
                        setIsTypeOpen(false);
                      }}
                      className="w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-transparent hover:bg-[#06B6D4]/20 transition-all"
                    >
                      {/* Icon */}
                      <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 bg-gray-200">
                        <TrainingIcon type={t} className="w-5 h-5 text-gray-600" />
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

            {/* Add to Todo List */}
            <div className="bg-[#06B6D4]/5 rounded-xl p-4 border-2 border-[#06B6D4]/20">
              <label className="flex items-center gap-3 cursor-pointer">
                {/* Custom Checkbox */}
                <button
                  type="button"
                  onClick={() => setAddToTodo(!addToTodo)}
                  className={`w-5 h-5 rounded flex items-center justify-center flex-shrink-0 transition-all ${
                    addToTodo
                      ? 'bg-[#06B6D4] ring-4 ring-[#06B6D4]/30'
                      : 'bg-white border-2 border-gray-300'
                  }`}
                >
                  {addToTodo && (
                    <svg className="w-3 h-3 text-white" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="3">
                      <path d="M3 8l3 3 7-7" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  )}
                </button>
                <span className="text-sm font-medium text-gray-900">
                  Add to todo list
                </span>
              </label>

              {addToTodo && (
                <div className="mt-3">
                  <textarea
                    value={todoText}
                    onChange={(e) => setTodoText(e.target.value)}
                    rows={3}
                    placeholder="What do you need to work on in future training sessions?"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-[#06B6D4] focus:ring-2 focus:ring-[#06B6D4]/20 outline-none resize-none"
                  />
                  <p className="mt-2 text-xs text-gray-500">
                    💡 This will be added to your training plan todo list
                  </p>
                </div>
              )}
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
