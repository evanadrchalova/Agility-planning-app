import tlapkaSvg from './assets/tlapka.svg';
import poharSvg from './assets/pohar.svg';
import kalendarPng from './assets/kalendar.png';
import profileSvg from './assets/profile.svg';

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
            <img src={kalendarPng} alt="Calendar" className="w-6 h-6" />
            <span className="font-bold text-base opacity-80">Agility planning</span>
          </div>
          <div className="flex items-center gap-3">
            <button className="w-6 h-6">
              <img src={profileSvg} alt="Profile" className="w-full h-full" />
            </button>
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

        {/* Dog Profile Card */}
        <div className="bg-white rounded-2xl shadow-md p-6">
          <div className="flex flex-col items-center">
            {/* Dog Avatar with pulses */}
            <div className="relative w-28 h-28 mb-6">
              <img src={tlapkaSvg} alt="Dog paw" className="w-full h-full" />
            </div>

            {/* Dog Info */}
            <h2 className="text-lg font-bold text-gray-900 mb-1">Kaii</h2>
            <p className="text-sm text-gray-600">Border collie</p>
            <p className="text-sm text-gray-600 mb-4">Category A2</p>

            {/* Rest Day Badge */}
            <div className="bg-[#FF8C69]/10 px-3 py-1 rounded-md">
              <span className="text-xs font-bold text-[#FF6B45] tracking-wider uppercase">rest day 1/2</span>
            </div>
          </div>
        </div>

        {/* Weekly Progress Card */}
        <div className="bg-white rounded-2xl shadow-md p-6">
          <div className="flex items-center gap-6">
            {/* Progress Circle */}
            <div className="relative w-16 h-16 flex-shrink-0">
              <svg className="w-16 h-16 transform -rotate-90">
                <circle
                  cx="32"
                  cy="32"
                  r="26"
                  stroke="#e5e7eb"
                  strokeWidth="8"
                  fill="none"
                />
                <circle
                  cx="32"
                  cy="32"
                  r="26"
                  stroke="#FF8C69"
                  strokeWidth="8"
                  fill="none"
                  strokeDasharray={`${26 * 2 * Math.PI * 0.8} ${26 * 2 * Math.PI}`}
                  strokeLinecap="round"
                  className="animate-progress"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-sm font-black text-gray-800">80%</span>
              </div>
            </div>

            {/* Progress Text */}
            <div>
              <h3 className="text-base font-bold text-gray-900 mb-0.5">Plan for this week</h3>
              <p className="text-sm text-gray-600">5/7 days plan</p>
            </div>
          </div>
        </div>

        {/* Today's Goals Card */}
        <div className="bg-white rounded-2xl shadow-md p-6">
          <div className="flex items-center gap-6">
            {/* Trophy Icon */}
            <div className="w-16 h-16 flex-shrink-0">
              <img src={poharSvg} alt="Trophy" className="w-full h-full" />
            </div>

            {/* Goals Text */}
            <div>
              <h3 className="text-base font-bold text-gray-900 mb-0.5">Today's goals</h3>
              <p className="text-sm text-gray-600">1/2 day plan</p>
            </div>
          </div>
        </div>

        {/* This Week Plan Table */}
        <div className="bg-white rounded-2xl shadow-md p-6">
          <h3 className="text-base font-bold text-center text-gray-900 mb-6">This week plan</h3>

          <div className="space-y-3">
            {/* Week Days Header */}
            <div className="flex items-center gap-2">
              <div className="w-24"></div>
              <div className="flex-1 flex justify-between px-1">
                {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(day => (
                  <div key={day} className="text-xs text-gray-600 w-6 text-center">
                    {day}
                  </div>
                ))}
              </div>
            </div>

            {/* Activity Rows */}
            {activities.map((activity, idx) => (
              <div key={idx} className="flex items-center gap-2">
                <div className="w-24 text-xs text-gray-600 text-left pl-0 overflow-hidden text-ellipsis whitespace-nowrap">
                  {activity.name}
                </div>
                <div className="flex-1 flex justify-between px-1">
                  {activity.days.map((completed, dayIdx) => (
                    <div key={dayIdx} className="w-6 flex justify-center items-center relative">
                      {dayIdx === 0 && completed ? (
                        <div className="w-4 h-4 bg-[#06B6D4] rounded-full flex items-center justify-center">
                          <svg className="w-3 h-3 text-white" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="3">
                            <path d="M3 8l3 3 7-7" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </div>
                      ) : (
                        <div className={`w-3 h-3 rounded-full ${
                          completed ? 'bg-[#FF8C69]' : 'bg-gray-200'
                        }`}></div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* In Progress Card */}
        <div className="bg-white rounded-2xl shadow-md p-6">
          <h3 className="text-base font-bold text-gray-900 mb-1">In progress</h3>
          <p className="text-sm text-gray-600 mb-4">Dogwalk 4/6</p>

          {/* Progress Bar */}
          <div className="flex gap-1.5">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className={`h-6 flex-1 rounded ${
                  i < 4 ? 'bg-[#FF8C69]' : 'bg-gray-200'
                }`}
              ></div>
            ))}
          </div>
        </div>

      </main>
    </div>
  );
}
