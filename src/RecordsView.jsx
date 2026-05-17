import { useNavigate } from 'react-router-dom';
import tlapkaSvg from './assets/tlapka.svg';

export default function RecordsView() {
  const navigate = useNavigate();
  const records = [
    {
      id: 1,
      date: 'Today',
      type: 'Big training',
      difficulty: 5,
      positives: 'Great focus on jumps, improved timing',
      toImprove: 'Work on A-frame descent'
    },
    {
      id: 2,
      date: 'Yesterday',
      type: 'Fitness',
      difficulty: 3,
      positives: 'Good conditioning session',
      toImprove: 'Add more stretching'
    },
    {
      id: 3,
      date: '2 days ago',
      type: 'Short walk',
      difficulty: 2,
      positives: 'Nice relaxed walk',
      toImprove: '-'
    },
    {
      id: 4,
      date: '3 days ago',
      type: 'Long walk',
      difficulty: 3,
      positives: 'Good stamina building',
      toImprove: 'Watch for signs of fatigue'
    },
  ];

  return (
    <div className="min-h-screen bg-[#fffcfa]">
      {/* Header */}
      <header className="bg-gradient-to-b from-[#06B6D4]/5 to-white shadow-sm border-b border-[#06B6D4]/20">
        <div className="max-w-md mx-auto px-6 h-16 flex items-center justify-between">
          <button className="flex items-center gap-2 text-gray-700" onClick={() => navigate('/')}>
            <svg className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            <span className="font-semibold text-base">Back</span>
          </button>
          <div className="flex items-center gap-4">
            <button className="w-6 h-6">
              <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
                <circle cx="12" cy="8" r="4" stroke="#06B6D4" strokeWidth="1.5"/>
                <path d="M4 20c0-4 3.6-6 8-6s8 2 8 6" stroke="#06B6D4" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            </button>
            <button className="w-6 h-6">
              <div className="space-y-1.5">
                <div className="h-0.5 w-6 bg-[#06B6D4] rounded-full"></div>
                <div className="h-0.5 w-6 bg-[#06B6D4] rounded-full"></div>
                <div className="h-0.5 w-6 bg-[#06B6D4] rounded-full"></div>
              </div>
            </button>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-md mx-auto px-4 py-8 space-y-4">
        {/* Dog Header */}
        <div className="bg-white rounded-2xl shadow-md p-6">
          <div className="flex items-center gap-4">
            <div className="relative w-16 h-16 flex-shrink-0">
              <img src={tlapkaSvg} alt="Dog paw" className="w-full h-full" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">Kaii</h1>
              <p className="text-sm text-gray-600">Training Records</p>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-2xl shadow-md p-2 flex gap-2">
          <button className="flex-1 py-2 px-4 bg-[#06B6D4] text-white rounded-lg font-medium text-sm">
            Previous trainings
          </button>
          <button className="flex-1 py-2 px-4 text-gray-600 rounded-lg font-medium text-sm">
            Stats
          </button>
          <button className="flex-1 py-2 px-4 text-gray-600 rounded-lg font-medium text-sm">
            Calendar
          </button>
        </div>

        {/* Previous Trainings List */}
        {records.map((record) => (
          <div key={record.id} className="bg-white rounded-2xl shadow-md p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-base font-bold text-gray-900">{record.type}</h3>
                <p className="text-sm text-gray-600">{record.date}</p>
              </div>
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <div
                    key={i}
                    className={`w-2 h-2 rounded-full ${
                      i < record.difficulty ? 'bg-[#06B6D4]' : 'bg-gray-200'
                    }`}
                  ></div>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">What went well</p>
                <p className="text-sm text-gray-900">{record.positives}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">To improve</p>
                <p className="text-sm text-gray-900">{record.toImprove}</p>
              </div>
            </div>

            <button className="mt-4 text-sm text-[#06B6D4] font-medium">
              View details →
            </button>
          </div>
        ))}
      </main>
    </div>
  );
}
