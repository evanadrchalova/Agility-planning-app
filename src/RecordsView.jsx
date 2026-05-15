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
      <header className="bg-white shadow-sm">
        <div className="max-w-md mx-auto px-6 h-14 flex items-center justify-between">
          <button className="flex items-center gap-2 opacity-80" onClick={() => navigate('/')}>
            <svg className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            <span className="font-bold text-base">Back</span>
          </button>
          <div className="flex items-center gap-3">
            <button className="w-6 h-6 opacity-80">
              <div className="space-y-1">
                <div className="h-0.5 w-6 bg-gray-700"></div>
                <div className="h-0.5 w-6 bg-gray-700"></div>
                <div className="h-0.5 w-6 bg-gray-700"></div>
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
            Records
          </button>
          <button className="flex-1 py-2 px-4 text-gray-600 rounded-lg font-medium text-sm">
            Stats
          </button>
          <button className="flex-1 py-2 px-4 text-gray-600 rounded-lg font-medium text-sm">
            Calendar
          </button>
        </div>

        {/* Records List */}
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

        {/* Add Button */}
        <button className="w-full bg-[#06B6D4] text-white rounded-2xl shadow-md p-4 font-bold text-base flex items-center justify-center gap-2">
          <svg className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
          </svg>
          Add Training Session
        </button>
      </main>
    </div>
  );
}
