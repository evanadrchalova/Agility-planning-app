import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function VoiceNoteView() {
  const navigate = useNavigate();
  const [isListening, setIsListening] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [transcript, setTranscript] = useState('');

  const questions = [
    "Let's log your training. What type of training was it?",
    "How would you rate the difficulty from 1 to 5?",
    "What went well during this session?",
    "What needs more work?",
    "Should I add this to your todo list?"
  ];

  const handleStartListening = () => {
    setIsListening(true);
    // TODO: Implement actual voice recognition
    // For now, simulate listening
  };

  const handleStopListening = () => {
    setIsListening(false);
    // Move to next question
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // Save and navigate back
      navigate('/records');
    }
  };

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
      <main className="max-w-md mx-auto px-4 py-8">
        <div className="bg-white rounded-2xl shadow-md p-8 min-h-[500px] flex flex-col items-center justify-center">
          <h1 className="text-xl font-bold text-gray-900 mb-8 text-center">Voice Training Note</h1>

          {/* Question */}
          <div className="mb-12 text-center">
            <p className="text-lg text-gray-700 mb-2">
              {questions[currentQuestion]}
            </p>
            <p className="text-sm text-gray-500">
              Question {currentQuestion + 1} of {questions.length}
            </p>
          </div>

          {/* Microphone Button */}
          <button
            onClick={isListening ? handleStopListening : handleStartListening}
            className={`w-32 h-32 rounded-full flex items-center justify-center transition-all ${
              isListening
                ? 'bg-[#06B6D4] ring-8 ring-[#06B6D4]/30 animate-pulse'
                : 'bg-white border-4 border-[#06B6D4] hover:bg-[#06B6D4]/5'
            }`}
          >
            <svg className={`w-16 h-16 ${isListening ? 'text-white' : 'text-[#06B6D4]'}`} viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M7 4a3 3 0 016 0v4a3 3 0 11-6 0V4zm4 10.93A7.001 7.001 0 0017 8a1 1 0 10-2 0A5 5 0 015 8a1 1 0 00-2 0 7.001 7.001 0 006 6.93V17H6a1 1 0 100 2h8a1 1 0 100-2h-3v-2.07z" clipRule="evenodd" />
            </svg>
          </button>

          {/* Status */}
          <div className="mt-8 text-center">
            {isListening ? (
              <p className="text-base font-medium text-[#06B6D4]">
                Listening... Tap to stop
              </p>
            ) : (
              <p className="text-base text-gray-600">
                Tap microphone to answer
              </p>
            )}
          </div>

          {/* Transcript preview */}
          {transcript && (
            <div className="mt-8 w-full p-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-700 italic">"{transcript}"</p>
            </div>
          )}
        </div>

        {/* Tips */}
        <div className="mt-6 p-4 bg-[#06B6D4]/10 rounded-xl">
          <p className="text-sm text-gray-700 text-center">
            💡 <span className="font-medium">Tip:</span> Speak clearly and pause between answers
          </p>
        </div>
      </main>
    </div>
  );
}
