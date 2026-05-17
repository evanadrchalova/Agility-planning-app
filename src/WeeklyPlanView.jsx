import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import agiAppLogo from './assets/agi-app-logo.svg';

// Icon components (same as AddTrainingView)
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

// Day Card Component
const DayCard = ({ dayName, dayNumber, selectedType, notes, completed, onTypeChange, onNotesChange, onCompletedChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [isNotesExpanded, setIsNotesExpanded] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const handleCompletedToggle = (newCompleted) => {
    onCompletedChange(newCompleted);
    if (newCompleted) {
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 1000);
      // Collapse card when completed
      setIsExpanded(false);
    } else {
      // Expand card when uncompleted
      setIsExpanded(true);
    }
  };

  const activityTypes = [
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

  return (
    <div className={`rounded-2xl shadow-md transition-colors relative overflow-hidden ${
      completed
        ? 'bg-green-500/10 border-2 border-green-600/40 p-4'
        : 'bg-white p-5'
    }`}>
      {/* Confetti Animation - Full Card */}
      {showConfetti && (
        <div className="absolute inset-0 pointer-events-none z-10">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-3 h-3 rounded-full animate-confetti"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                backgroundColor: ['#10b981', '#06B6D4', '#f59e0b', '#ef4444', '#8b5cf6'][i % 5],
                animationDelay: `${i * 0.03}s`,
              }}
            />
          ))}
        </div>
      )}

      {/* Collapsed View for Completed */}
      {completed && !isExpanded ? (
        <div>
          {/* Monday + Checkbox on one line */}
          <div className="flex items-start justify-between mb-4">
            <div>
              <h3 className="text-base font-bold text-gray-900">{dayName}</h3>
              <p className="text-xs text-gray-500">{dayNumber}</p>
            </div>
            <button
              type="button"
              onClick={() => handleCompletedToggle(!completed)}
              className="w-6 h-6 rounded flex items-center justify-center flex-shrink-0 transition-all bg-green-600"
            >
              <svg className="w-3.5 h-3.5 text-white" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="3">
                <path d="M3 8l3 3 7-7" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>

          {/* Show more - secondary button with chevron */}
          <button
            type="button"
            onClick={() => setIsExpanded(true)}
            className="w-full flex items-center justify-center gap-1 px-3 py-2 text-sm text-gray-500 bg-transparent border border-gray-200 rounded-lg hover:border-[#06B6D4]/20 hover:bg-[#06B6D4]/5 transition-colors"
          >
            Show more
            <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
      ) : (
        // Full Expanded View
        <div>
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-base font-bold text-gray-900">{dayName}</h3>
              <p className="text-xs text-gray-500">{dayNumber}</p>
            </div>
          </div>

          {/* Activity Selector with Checkbox */}
          <div className="mb-4">
        <div className="flex items-start gap-3">
          {/* Activity Selector */}
          <div className="flex-1">
            {/* Selected item - always visible */}
            <button
              type="button"
              onClick={() => setIsOpen(!isOpen)}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-[#06B6D4]/10 border-2 border-[#06B6D4]/20 transition-all"
            >
              {/* Icon with ring */}
              <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 bg-[#06B6D4] ring-4 ring-[#06B6D4]/30">
                <TrainingIcon type={selectedType} className="w-5 h-5 text-white" />
              </div>

              {/* Label */}
              <span className="flex-1 text-left font-medium text-gray-900">
                {selectedType}
              </span>

              {/* Chevron - rotates when open */}
              <svg
                className={`w-5 h-5 text-[#06B6D4] transition-transform ${isOpen ? 'rotate-180' : ''}`}
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>

            {/* Dropdown options - shown when open */}
            {isOpen && (
              <div className="mt-2 space-y-2 bg-[#06B6D4]/10 border-2 border-[#06B6D4]/20 rounded-xl p-2">
                {activityTypes.filter(t => t !== selectedType).map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => {
                      onTypeChange(t);
                      setIsOpen(false);
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

          {/* Custom Checkbox - on the right */}
          <div className="flex flex-col items-center mt-0 relative">
            <label className="block text-xs font-medium text-gray-600 mb-2 uppercase tracking-wider">
              Done
            </label>
            <button
              type="button"
              onClick={() => handleCompletedToggle(!completed)}
              className={`w-7 h-7 rounded flex items-center justify-center flex-shrink-0 transition-all ${
                completed
                  ? 'bg-green-600 ring-4 ring-green-600/30'
                  : 'bg-white border-2 border-gray-300'
              }`}
            >
              {completed && (
                <svg className="w-4 h-4 text-white" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="3">
                  <path d="M3 8l3 3 7-7" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Notes - Collapsed/Expanded */}
      {!isNotesExpanded ? (
        <div className="mb-3">
          <button
            type="button"
            onClick={() => setIsNotesExpanded(true)}
            className="w-full text-left px-3 py-2 text-sm text-gray-500 bg-transparent border border-gray-200 rounded-lg hover:border-[#06B6D4]/20 hover:bg-[#06B6D4]/5 transition-colors"
          >
            {notes ? notes : 'Add notes...'}
          </button>
        </div>
      ) : (
        <div className="mb-3">
          <textarea
            value={notes}
            onChange={(e) => onNotesChange(e.target.value)}
            onBlur={() => setIsNotesExpanded(false)}
            rows={3}
            placeholder="Add notes for this day..."
            className="w-full px-3 py-2 text-sm rounded-lg bg-[#06B6D4]/5 border border-[#06B6D4]/20 focus:border-[#06B6D4] focus:ring-2 focus:ring-[#06B6D4]/20 outline-none resize-none placeholder:text-gray-500"
            autoFocus
          />
        </div>
      )}

      {/* Add Other Activity */}
      <button
        type="button"
        className="w-full flex items-center justify-center gap-2 px-3 py-2 text-sm text-gray-500 bg-transparent border border-gray-200 rounded-lg hover:border-[#06B6D4]/20 hover:bg-[#06B6D4]/5 transition-colors"
      >
        <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
        </svg>
        Add other activity
      </button>
        </div>
      )}
    </div>
  );
};

export default function WeeklyPlanView() {
  const navigate = useNavigate();

  // State for each day's activity
  const [weekPlan, setWeekPlan] = useState({
    monday: 'Big training',
    tuesday: 'Rest',
    wednesday: 'Fitness',
    thursday: 'Long walk',
    friday: 'Big training',
    saturday: 'Swimming',
    sunday: 'Rest'
  });

  // State for notes
  const [notes, setNotes] = useState({
    monday: '',
    tuesday: '',
    wednesday: '',
    thursday: '',
    friday: '',
    saturday: '',
    sunday: ''
  });

  // State for completed days
  const [completed, setCompleted] = useState({
    monday: true,
    tuesday: false,
    wednesday: false,
    thursday: false,
    friday: true,
    saturday: true,
    sunday: false
  });

  const days = [
    { key: 'monday', name: 'Monday', date: 'Dec 16' },
    { key: 'tuesday', name: 'Tuesday', date: 'Dec 17' },
    { key: 'wednesday', name: 'Wednesday', date: 'Dec 18' },
    { key: 'thursday', name: 'Thursday', date: 'Dec 19' },
    { key: 'friday', name: 'Friday', date: 'Dec 20' },
    { key: 'saturday', name: 'Saturday', date: 'Dec 21' },
    { key: 'sunday', name: 'Sunday', date: 'Dec 22' }
  ];

  const handleTypeChange = (dayKey, newType) => {
    setWeekPlan(prev => ({
      ...prev,
      [dayKey]: newType
    }));
  };

  const handleNotesChange = (dayKey, newNotes) => {
    setNotes(prev => ({
      ...prev,
      [dayKey]: newNotes
    }));
  };

  const handleCompletedChange = (dayKey, isCompleted) => {
    setCompleted(prev => ({
      ...prev,
      [dayKey]: isCompleted
    }));
  };

  const handleSave = () => {
    // TODO: Save to database
    console.log('Saving weekly plan:', weekPlan, notes, completed);
    navigate('/');
  };

  // Calculate completed days for progress
  const completedDays = Object.values(completed).filter(Boolean).length;
  const totalDays = 7;
  const progressPercentage = Math.round((completedDays / totalDays) * 100);

  // Generate activities for week plan table
  const uniqueActivities = [...new Set(Object.values(weekPlan))];
  const activities = uniqueActivities.map(activityName => ({
    name: activityName,
    days: [
      weekPlan.monday === activityName && completed.monday,
      weekPlan.tuesday === activityName && completed.tuesday,
      weekPlan.wednesday === activityName && completed.wednesday,
      weekPlan.thursday === activityName && completed.thursday,
      weekPlan.friday === activityName && completed.friday,
      weekPlan.saturday === activityName && completed.saturday,
      weekPlan.sunday === activityName && completed.sunday
    ]
  }));

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
                  stroke="#06B6D4"
                  strokeWidth="8"
                  fill="none"
                  strokeDasharray={`${26 * 2 * Math.PI * (progressPercentage / 100)} ${26 * 2 * Math.PI}`}
                  strokeLinecap="round"
                  className="animate-progress"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-sm font-black text-gray-800 opacity-80">{progressPercentage}%</span>
              </div>
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">Kaii</h1>
              <p className="text-sm text-gray-600">{completedDays} of {totalDays} days completed</p>
            </div>
          </div>
        </div>

        {/* Day Cards */}
        {days.map((day) => (
          <DayCard
            key={day.key}
            dayName={day.name}
            dayNumber={day.date}
            selectedType={weekPlan[day.key]}
            notes={notes[day.key]}
            completed={completed[day.key]}
            onTypeChange={(newType) => handleTypeChange(day.key, newType)}
            onNotesChange={(newNotes) => handleNotesChange(day.key, newNotes)}
            onCompletedChange={(isCompleted) => handleCompletedChange(day.key, isCompleted)}
          />
        ))}

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

                  {activity.days.map((isCompleted, dayIdx) => (
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
                        {dayIdx === 0 && isCompleted ? (
                          <div className="w-[18px] h-[18px] bg-[#06B6D4] rounded-full flex items-center justify-center ring-4 ring-[#06B6D4]/30 relative">
                            <svg className="w-3 h-3 text-white" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="3">
                              <path d="M3 8l3 3 7-7" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                          </div>
                        ) : (
                          <div className={`w-3 h-3 rounded-full relative ${
                            isCompleted ? 'bg-[#06B6D4]' : (dayIdx === 1 ? 'bg-gray-400' : 'bg-gray-200')
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

        {/* Weekly Summary */}
        <div className="bg-white rounded-2xl shadow-md p-6">
          <h3 className="text-base font-bold text-gray-900 mb-4">Weekly Summary</h3>

          <div className="space-y-3">
            <div className="flex items-center justify-between py-2 border-b border-gray-100">
              <span className="text-sm text-gray-600">Total activities</span>
              <span className="text-sm font-bold text-gray-900">12</span>
            </div>
            <div className="flex items-center justify-between py-2 border-b border-gray-100">
              <span className="text-sm text-gray-600">Rest days</span>
              <span className="text-sm font-bold text-gray-900">2</span>
            </div>
            <div className="flex items-center justify-between py-2 border-b border-gray-100">
              <span className="text-sm text-gray-600">Training sessions</span>
              <span className="text-sm font-bold text-gray-900">6</span>
            </div>
            <div className="flex items-center justify-between py-2">
              <span className="text-sm text-gray-600">Conditioning</span>
              <span className="text-sm font-bold text-gray-900">4</span>
            </div>
          </div>
        </div>

        {/* Weekly Tips */}
        <div className="bg-[#06B6D4]/10 rounded-xl p-4 border-2 border-[#06B6D4]/20">
          <h3 className="text-sm font-bold text-gray-900 mb-2">💡 Weekly Tips</h3>
          <p className="text-sm text-gray-700">
            Remember to include 2 rest days for optimal recovery. Balance intense training with conditioning work.
          </p>
        </div>

        {/* Save Button */}
        <button
          onClick={handleSave}
          className="w-full bg-[#06B6D4] text-white rounded-2xl shadow-md p-4 font-bold text-base"
        >
          Save Weekly Plan
        </button>
      </main>
    </div>
  );
}
