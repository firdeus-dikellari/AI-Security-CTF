import React, { useState } from 'react';
import { MessageSquare, Trophy, Lightbulb, CheckCircle } from 'lucide-react';

const CTFChallenge = ({ challenge, onChat, onHint, onSubmit, isCompleted, hintsUsed = 0 }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [solution, setSolution] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!solution.trim()) return;
    
    setSubmitting(true);
    try {
      await onSubmit(challenge.id, solution);
      setSolution('');
    } catch (error) {
      console.error('Error submitting solution:', error);
    } finally {
      setSubmitting(false);
    }
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty.toLowerCase()) {
      case 'easy': return 'text-green-600 bg-green-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'hard': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
      <div className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            {isCompleted ? (
              <CheckCircle className="h-5 w-5 text-green-500" />
            ) : (
              <Trophy className="h-5 w-5 text-gray-400" />
            )}
            <div>
              <h3 className="text-lg font-semibold text-gray-900">{challenge.title}</h3>
              <div className="flex items-center space-x-2 mt-1">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(challenge.difficulty)}`}>
                  {challenge.difficulty}
                </span>
                <span className="text-sm text-gray-500">{challenge.points} points</span>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-gray-500 hover:text-gray-700 transition-colors"
            >
              {isExpanded ? '−' : '+'}
            </button>
          </div>
        </div>

        {isExpanded && (
          <div className="mt-4 space-y-4">
            <div className="bg-gray-50 rounded-lg p-3">
              <p className="text-sm text-gray-700">{challenge.description}</p>
            </div>

            <div className="flex items-center space-x-2">
              <button
                onClick={() => onChat(challenge.id)}
                className="flex items-center space-x-2 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <MessageSquare className="h-4 w-4" />
                <span>Start Chat</span>
              </button>

              <button
                onClick={() => {
                  onHint(challenge.id);
                  setShowHint(true);
                }}
                className="flex items-center space-x-2 px-3 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors"
              >
                <Lightbulb className="h-4 w-4" />
                <span>Get Hint ({hintsUsed})</span>
              </button>
            </div>

            {showHint && (
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                <p className="text-sm text-yellow-800">{challenge.hint}</p>
              </div>
            )}

            {!isCompleted && (
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Submit Solution
                </label>
                <div className="flex space-x-2">
                  <input
                    type="text"
                    value={solution}
                    onChange={(e) => setSolution(e.target.value)}
                    placeholder="Enter your solution..."
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <button
                    onClick={handleSubmit}
                    disabled={!solution.trim() || submitting}
                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    {submitting ? 'Submitting...' : 'Submit'}
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default CTFChallenge; 