import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import tlapkaSvg from './assets/tlapka.svg';

export default function InProgressView() {
  const navigate = useNavigate();

  const [steps, setSteps] = useState([
    { id: 1, text: 'Target on ground', completed: true },
    { id: 2, text: 'Target on board on ground', completed: true },
    { id: 3, text: 'Target on lower board', completed: true },
    { id: 4, text: 'Turn on dogwalk', completed: true },
    { id: 5, text: 'Full dogwalk with target', completed: false },
    { id: 6, text: 'Full dogwalk at speed', completed: false }
  ]);

  const [isAddingStep, setIsAddingStep] = useState(false);
  const [newStepText, setNewStepText] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState('');

  const completedCount = steps.filter(s => s.completed).length;
  const totalCount = steps.length;
  const progressPercentage = Math.round((completedCount / totalCount) * 100);

  const handleToggleComplete = (id) => {
    setSteps(steps.map(step =>
      step.id === id ? { ...step, completed: !step.completed } : step
    ));
  };

  const handleAddStep = () => {
    if (newStepText.trim()) {
      const newStep = {
        id: Math.max(...steps.map(s => s.id), 0) + 1,
        text: newStepText.trim(),
        completed: false
      };
      setSteps([...steps, newStep]);
      setNewStepText('');
      setIsAddingStep(false);
    }
  };

  const handleStartEdit = (step) => {
    setEditingId(step.id);
    setEditText(step.text);
  };

  const handleSaveEdit = () => {
    if (editText.trim()) {
      setSteps(steps.map(step =>
        step.id === editingId ? { ...step, text: editText.trim() } : step
      ));
      setEditingId(null);
      setEditText('');
    }
  };

  const handleDeleteStep = (id) => {
    setSteps(steps.filter(step => step.id !== id));
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
        {/* Dog Header with Progress */}
        <div className="bg-white rounded-2xl shadow-md p-6">
          <div className="flex items-center gap-4 mb-4">
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
              <h1 className="text-xl font-bold text-gray-900">Dogwalk</h1>
              <p className="text-sm text-gray-600">{completedCount} of {totalCount} steps completed</p>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="flex gap-1.5">
            {steps.map((step, i) => (
              <div
                key={step.id}
                className={`h-6 flex-1 rounded ${
                  step.completed ? 'bg-[#06B6D4]' : 'bg-gray-200'
                }`}
              ></div>
            ))}
          </div>
        </div>

        {/* Training Steps */}
        <div className="space-y-3">
          {steps.map((step) => (
            <div
              key={step.id}
              className={`rounded-2xl shadow-md p-5 transition-colors ${
                step.completed
                  ? 'bg-green-500/10 border-2 border-green-600/40'
                  : 'bg-white'
              }`}
            >
              {editingId === step.id ? (
                // Edit Mode
                <div className="space-y-3">
                  <textarea
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                    rows={2}
                    className="w-full px-3 py-2 text-sm rounded-lg bg-[#06B6D4]/5 border border-[#06B6D4]/20 focus:border-[#06B6D4] focus:ring-2 focus:ring-[#06B6D4]/20 outline-none resize-none"
                    autoFocus
                  />
                  <div className="flex gap-2">
                    <button
                      onClick={handleSaveEdit}
                      className="flex-1 bg-[#06B6D4] text-white rounded-lg px-4 py-2 text-sm font-medium"
                    >
                      Save
                    </button>
                    <button
                      onClick={() => setEditingId(null)}
                      className="flex-1 bg-gray-200 text-gray-700 rounded-lg px-4 py-2 text-sm font-medium"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                // View Mode
                <div className="flex items-center gap-3">
                  {/* Checkbox */}
                  <button
                    type="button"
                    onClick={() => handleToggleComplete(step.id)}
                    className={`w-7 h-7 rounded flex items-center justify-center flex-shrink-0 transition-all ${
                      step.completed
                        ? 'bg-green-600 ring-4 ring-green-600/30'
                        : 'bg-white border-2 border-gray-300'
                    }`}
                  >
                    {step.completed && (
                      <svg className="w-4 h-4 text-white" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="3">
                        <path d="M3 8l3 3 7-7" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    )}
                  </button>

                  {/* Step Text */}
                  <span className={`flex-1 text-base ${
                    step.completed ? 'text-gray-600 line-through' : 'text-gray-900 font-medium'
                  }`}>
                    {step.text}
                  </span>

                  {/* Action Buttons */}
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleStartEdit(step)}
                      className="text-[#06B6D4] hover:text-[#0891B2] transition-colors"
                    >
                      <svg className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                      </svg>
                    </button>
                    <button
                      onClick={() => handleDeleteStep(step.id)}
                      className="text-gray-400 hover:text-gray-600 transition-colors"
                    >
                      <svg className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}

          {/* Add New Step */}
          {isAddingStep ? (
            <div className="bg-white rounded-2xl shadow-md p-5 space-y-3">
              <textarea
                value={newStepText}
                onChange={(e) => setNewStepText(e.target.value)}
                rows={2}
                placeholder="Describe the next training step..."
                className="w-full px-3 py-2 text-sm rounded-lg bg-[#06B6D4]/5 border border-[#06B6D4]/20 focus:border-[#06B6D4] focus:ring-2 focus:ring-[#06B6D4]/20 outline-none resize-none placeholder:text-gray-500"
                autoFocus
              />
              <div className="flex gap-2">
                <button
                  onClick={handleAddStep}
                  className="flex-1 bg-[#06B6D4] text-white rounded-lg px-4 py-2 text-sm font-medium"
                >
                  Add Step
                </button>
                <button
                  onClick={() => {
                    setIsAddingStep(false);
                    setNewStepText('');
                  }}
                  className="flex-1 bg-gray-200 text-gray-700 rounded-lg px-4 py-2 text-sm font-medium"
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-2xl shadow-md p-4 border-2 border-dashed border-[#06B6D4]/30">
              <button
                onClick={() => setIsAddingStep(true)}
                className="w-full flex items-center justify-center gap-2 text-sm font-medium text-[#06B6D4] hover:text-[#0891B2] transition-colors"
              >
                <svg className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                </svg>
                Add new step
              </button>
            </div>
          )}
        </div>

        {/* Tips */}
        <div className="bg-[#06B6D4]/10 rounded-xl p-4 border-2 border-[#06B6D4]/20">
          <h3 className="text-sm font-bold text-gray-900 mb-2">💡 Training Tips</h3>
          <p className="text-sm text-gray-700">
            Break down complex behaviors into small, achievable steps. Celebrate each milestone!
          </p>
        </div>
      </main>
    </div>
  );
}
