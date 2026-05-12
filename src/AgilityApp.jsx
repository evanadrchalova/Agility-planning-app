// Střední verze - lepší layout, ale bez custom ikon
export default function AgilityApp() {
  const activities = [
    { name: 'Fitness', days: [true, false, false, false, true, true, false] },
    { name: 'Long walk', days: [false, false, false, true, true, true, true] },
    { name: 'Short walk', days: [false, true, false, false, true, false, true] },
    { name: 'Big training', days: [false, false, false, false, true, true, true] },
    { name: 'Small training', days: [true, false, false, false, false, true, true] },
  ];

  return (
    <div className="min-h-screen bg-[#fffcfa]">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-md mx-auto px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-orange-500 rounded"></div>
            <span className="font-bold text-sm">Agility planning</span>
          </div>
          <div className="flex items-center gap-3">
            <button className="w-6 h-6 rounded-full border-2 border-gray-400"></button>
            <button className="w-6 h-6">
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
      <main className="max-w-md mx-auto px-4 py-8 space-y-6">

        {/* Dog Profile Card */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-8">
          <div className="flex flex-col items-center">
            {/* Generic Dog Avatar */}
            <div className="relative w-32 h-32 mb-6">
              <div className="absolute inset-0 rounded-full bg-blue-100 opacity-30"></div>
              <div className="absolute inset-3 rounded-full bg-blue-100 opacity-40"></div>
              <div className="absolute inset-6 rounded-full bg-gray-400 flex items-center justify-center">
                <svg className="w-10 h-10 text-white" viewBox="0 0 64 64" fill="currentColor">
                  <ellipse cx="22" cy="20" rx="6" ry="8"/>
                  <ellipse cx="42" cy="20" rx="6" ry="8"/>
                  <ellipse cx="15" cy="32" rx="5" ry="7"/>
                  <ellipse cx="49" cy="32" rx="5" ry="7"/>
                  <ellipse cx="32" cy="40" rx="12" ry="14"/>
                </svg>
              </div>
            </div>

            <h2 className="text-base font-bold text-gray-900 mb-1">Kaii</h2>
            <p className="text-sm text-gray-600">Border collie</p>
            <p className="text-sm text-gray-600 mb-4">Category A2</p>

            <div className="bg-gray-100 px-3 py-1 rounded-md">
              <span className="text-xs font-bold text-gray-900 tracking-wider uppercase">rest day 1/2</span>
            </div>
          </div>
        </div>

        {/* Weekly Progress Card */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
          <div className="flex items-center gap-6">
            <div className="relative w-16 h-16 flex-shrink-0">
              <svg className="w-16 h-16 transform -rotate-90">
                <circle cx="32" cy="32" r="26" stroke="#e5e7eb" strokeWidth="8" fill="none" />
                <circle cx="32" cy="32" r="26" stroke="#8b5cf6" strokeWidth="8" fill="none"
                  strokeDasharray={`${26 * 2 * Math.PI * 0.8} ${26 * 2 * Math.PI}`} strokeLinecap="round" />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-xs font-black text-gray-800">80%</span>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-bold text-gray-900 mb-0.5">Plan for this week</h3>
              <p className="text-sm text-gray-600">5/7 days plan</p>
            </div>
          </div>
        </div>

        {/* Today's Goals Card */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
          <div className="flex items-center gap-6">
            <div className="w-16 h-16 flex-shrink-0 rounded-full bg-gradient-to-br from-blue-200 to-purple-200 flex items-center justify-center">
              <svg className="w-9 h-9 text-purple-600" viewBox="0 0 24 24" fill="currentColor">
                <path d="M7 3h10c1.1 0 2 .9 2 2v3h2c.55 0 1 .45 1 1v3c0 2.21-1.79 4-4 4h-.42c-.5 1.91-2.03 3.39-3.95 3.87l-.63 3.13h2c.55 0 1 .45 1 1s-.45 1-1 1H9c-.55 0-1-.45-1-1s.45-1 1-1h2l-.63-3.13C8.45 18.39 6.92 16.91 6.42 15H6c-2.21 0-4-1.79-4-4V8c0-.55.45-1 1-1h2V5c0-1.1.9-2 2-2z"/>
              </svg>
            </div>

            <div>
              <h3 className="text-sm font-bold text-gray-900 mb-0.5">Today's goals</h3>
              <p className="text-sm text-gray-600">1/2 day plan</p>
            </div>
          </div>
        </div>

        {/* This Week Plan Table */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
          <h3 className="text-base font-bold text-center text-gray-900 mb-6">This week plan</h3>

          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-20"></div>
              <div className="flex-1 flex justify-between px-1">
                {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(day => (
                  <div key={day} className="text-xs text-gray-600 w-6 text-center">{day}</div>
                ))}
              </div>
            </div>

            {activities.map((activity, idx) => (
              <div key={idx} className="flex items-center gap-2">
                <div className="w-20 text-xs text-gray-600 text-right pr-3">{activity.name}</div>
                <div className="flex-1 flex justify-between px-1">
                  {activity.days.map((completed, dayIdx) => (
                    <div key={dayIdx} className="w-6 flex justify-center">
                      <div className={`w-3 h-3 rounded-full ${completed ? 'bg-purple-400' : 'bg-gray-200'}`}></div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* In Process Card */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
          <h3 className="text-sm font-bold text-gray-900 mb-1">In process</h3>
          <p className="text-sm text-gray-600 mb-4">Dogwalk 4/6</p>

          <div className="flex gap-1.5">
            {[...Array(6)].map((_, i) => (
              <div key={i} className={`h-6 flex-1 rounded ${i < 4 ? 'bg-purple-400' : 'bg-gray-200'}`}></div>
            ))}
          </div>
        </div>

      </main>
    </div>
  );
}
