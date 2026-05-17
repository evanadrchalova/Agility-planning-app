import { useNavigate } from 'react-router-dom';
import tlapkaSvg from './assets/tlapka.svg';
import poharSvg from './assets/pohar.svg';
import agiAppLogo from './assets/agi-app-logo.svg';
import profileSvg from './assets/profile.svg';
import mainWidgetIllustration from './assets/main-widget-illustration.svg';

export default function AgilityApp() {
  const navigate = useNavigate();
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
      <header className="bg-white border-b-2 border-[#06B6D4] shadow-lg">
        <div className="max-w-md mx-auto px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <img src={agiAppLogo} alt="Agility App" style={{ width: '49px', height: '46px' }} />
            <div className="h-8 w-px bg-gray-300"></div>
            <span className="font-bold text-base" style={{ opacity: 0.8 }}>Agility planning</span>
          </div>
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

        {/* Dog Profile Card */}
        <div className="bg-white rounded-2xl shadow-lg p-6 cursor-pointer hover:shadow-xl transition-shadow overflow-hidden" onClick={() => navigate('/records')}>
          <div className="flex items-start justify-between gap-4">
            {/* Left side - Text content */}
            <div className="flex-1 flex flex-col justify-center">
              {/* Rest Day Badge */}
              <div className="inline-block bg-[#06B6D4]/10 px-3 py-1 rounded-md mb-3">
                <span className="text-xs font-bold text-[#0891B2] tracking-wider uppercase">rest day 1/2</span>
              </div>

              {/* Dog Name */}
              <h2 className="text-2xl font-bold text-gray-900 mb-3">Kaii</h2>

              {/* Info */}
              <div className="space-y-1.5">
                <p className="text-sm text-gray-600">Last session: <span className="font-medium text-gray-900">Yesterday</span></p>
                <p className="text-sm text-gray-600">Focus area: <span className="font-medium text-gray-900">Jumps</span></p>
              </div>
            </div>

            {/* Right side - Illustration */}
            <div className="w-48 h-48 flex-shrink-0 -mr-6 -my-6">
              <img src={mainWidgetIllustration} alt="Dog jumping" className="w-full h-full object-cover rounded-2xl" />
            </div>
          </div>
        </div>

        {/* Add Training Session Button */}
        <button
          className="w-full bg-[#06B6D4] text-white rounded-2xl shadow-md p-4 font-bold text-base flex items-center justify-center gap-2 hover:bg-[#0891B2] transition-colors"
          onClick={() => navigate('/add-training')}
        >
          <svg className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
          </svg>
          Add Training Session
        </button>

        {/* Quick Voice Note Button */}
        <button
          className="w-full bg-white border-2 border-[#06B6D4]/20 text-[#06B6D4] rounded-2xl p-2.5 font-medium text-sm flex items-center justify-center gap-2 hover:bg-[#06B6D4]/5 transition-colors"
          onClick={() => navigate('/voice-note')}
        >
          <svg className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M7 4a3 3 0 016 0v4a3 3 0 11-6 0V4zm4 10.93A7.001 7.001 0 0017 8a1 1 0 10-2 0A5 5 0 015 8a1 1 0 00-2 0 7.001 7.001 0 006 6.93V17H6a1 1 0 100 2h8a1 1 0 100-2h-3v-2.07z" clipRule="evenodd" />
          </svg>
          Quick Voice Note
        </button>

        {/* This Week Plan Table */}
        <div className="bg-white rounded-2xl shadow-md p-6 cursor-pointer hover:shadow-lg transition-shadow" onClick={() => navigate('/weekly-plan')}>
          <div className="relative mb-6">
            <h3 className="text-base font-bold text-center text-gray-900">This week plan</h3>
            <svg className="w-5 h-5 text-gray-400 absolute right-0 top-0" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
            </svg>
          </div>

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
              <div key={idx} className="flex items-center gap-2 relative" style={{ marginTop: idx > 0 ? '0.75rem' : 0 }}>
                <div className="w-24 text-xs text-gray-600 text-left pl-0 overflow-hidden text-ellipsis whitespace-nowrap">
                  {activity.name}
                </div>
                <div className="flex-1 flex justify-between px-1 relative">
                  {/* Single connecting line across entire row */}
                  <div
                    className="absolute left-3 right-3 top-1/2 h-px z-0"
                    style={{
                      backgroundImage: 'repeating-linear-gradient(to right, #d1d5db 0, #d1d5db 3px, transparent 3px, transparent 6px)'
                    }}
                  ></div>

                  {activity.days.map((completed, dayIdx) => (
                    <div key={dayIdx} className="w-6 flex justify-center items-center relative">
                      {/* Background highlight for Tuesday - only in first activity row */}
                      {dayIdx === 1 && idx === 0 && (
                        <>
                          {/* Solid background bar with opacity */}
                          <div
                            className="absolute left-1/2 top-0 -translate-x-1/2 pointer-events-none"
                            style={{
                              width: '2rem',
                              height: `calc(${activities.length - 1} * (100% + 0.75rem) + 100%)`,
                              backgroundColor: 'rgba(6, 182, 212, 0.15)',
                              zIndex: 0
                            }}
                          ></div>
                          {/* Dashed line on top */}
                          <div
                            className="absolute left-1/2 top-0 w-px -translate-x-1/2 pointer-events-none"
                            style={{
                              height: `calc(${activities.length - 1} * (100% + 0.75rem) + 100%)`,
                              backgroundImage: 'repeating-linear-gradient(to bottom, #06B6D4 0, #06B6D4 3px, transparent 3px, transparent 6px)',
                              zIndex: 1
                            }}
                          ></div>
                        </>
                      )}

                      <div className="relative" style={{ zIndex: 2 }}>
                        {dayIdx === 0 && completed ? (
                          <div className="w-[18px] h-[18px] bg-[#06B6D4] rounded-full flex items-center justify-center ring-4 ring-[#06B6D4]/30 relative">
                            <svg className="w-3 h-3 text-white" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="3">
                              <path d="M3 8l3 3 7-7" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                          </div>
                        ) : (
                          <div className={`w-3 h-3 rounded-full relative ${
                            completed ? 'bg-[#06B6D4]' : (dayIdx === 1 ? 'bg-gray-400' : 'bg-gray-200')
                          }`}></div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
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
            <div className="flex-1">
              <h3 className="text-base font-bold text-gray-900 mb-0.5">Today's goals</h3>
              <p className="text-sm text-gray-600">1/2 day plan</p>
            </div>

            {/* Chevron */}
            <svg className="w-5 h-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
            </svg>
          </div>
        </div>


        {/* In Progress Card */}
        <div className="bg-white rounded-2xl shadow-md p-6 cursor-pointer hover:shadow-lg transition-shadow" onClick={() => navigate('/in-progress')}>
          <div className="flex items-center justify-between mb-1">
            <h3 className="text-base font-bold text-gray-900">In progress</h3>
            <svg className="w-5 h-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
            </svg>
          </div>
          <p className="text-sm text-gray-600 mb-4">Dogwalk 4/6</p>

          {/* Progress Bar */}
          <div className="flex gap-1.5">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className={`h-6 flex-1 rounded ${
                  i < 4 ? 'bg-[#06B6D4]' : 'bg-gray-200'
                }`}
              ></div>
            ))}
          </div>
        </div>

      </main>
    </div>
  );
}
