import React, { useState, useRef, useEffect } from 'react';
import { Play, CheckCircle, XCircle, Terminal, Activity, ArrowLeft, Shield } from 'lucide-react';
import { TEST_SUITE, TestResult } from '../lib/testRunner';

interface PuppeteerSelfTestProps {
  onBack: () => void;
}

const PuppeteerSelfTest: React.FC<PuppeteerSelfTestProps> = ({ onBack }) => {
  const [results, setResults] = useState<TestResult[]>(
    TEST_SUITE.map(t => ({ name: t.name, status: 'pending', logs: [] }))
  );
  const [isRunning, setIsRunning] = useState(false);
  const [activeTestIndex, setActiveTestIndex] = useState<number | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const runTests = async () => {
    if (isRunning) return;
    setIsRunning(true);
    
    // Reset
    setResults(TEST_SUITE.map(t => ({ name: t.name, status: 'pending', logs: [] })));

    for (let i = 0; i < TEST_SUITE.length; i++) {
      setActiveTestIndex(i);
      const test = TEST_SUITE[i];
      const startTime = Date.now();
      
      // Update status to running
      setResults(prev => {
        const next = [...prev];
        next[i] = { ...next[i], status: 'running' };
        return next;
      });

      try {
        await test.action((msg) => {
          setResults(prev => {
            const next = [...prev];
            next[i].logs.push(`[${new Date().toLocaleTimeString()}] ${msg}`);
            return next;
          });
          // Auto scroll
          if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
          }
        });

        // Pass
        setResults(prev => {
          const next = [...prev];
          next[i] = { 
            ...next[i], 
            status: 'passed', 
            duration: Date.now() - startTime,
            logs: [...next[i].logs, `[SUCCESS] Test completed in ${Date.now() - startTime}ms`]
          };
          return next;
        });

      } catch (e: any) {
        // Fail
        setResults(prev => {
          const next = [...prev];
          next[i] = { 
            ...next[i], 
            status: 'failed', 
            error: e.message,
            duration: Date.now() - startTime,
            logs: [...next[i].logs, `[ERROR] ${e.message}`]
          };
          return next;
        });
      }
      
      // Brief pause between tests for visual clarity
      await new Promise(r => setTimeout(r, 800));
    }

    setIsRunning(false);
    setActiveTestIndex(null);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-200 font-mono p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <header className="flex justify-between items-center mb-8 border-b border-gray-700 pb-6">
          <div className="flex items-center space-x-4">
            <div className="bg-blue-600 p-2 rounded-lg">
              <Terminal size={24} className="text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white tracking-tight">Puppeteer Self-Test Suite</h1>
              <p className="text-gray-400 text-sm">Automated Browser Integration Testing Framework v1.0</p>
            </div>
          </div>
          <button 
            onClick={onBack}
            className="flex items-center px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded text-sm transition-colors"
          >
            <ArrowLeft size={16} className="mr-2" /> Exit Suite
          </button>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Sidebar / Control Panel */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 shadow-xl">
              <h2 className="text-lg font-semibold text-white mb-4 flex items-center">
                <Activity size={18} className="mr-2 text-green-400" />
                Control Panel
              </h2>
              <p className="text-gray-400 text-sm mb-6">
                Execute the critical user journey test suite. This process will interact with the live application DOM to verify functionality.
              </p>
              
              <button
                onClick={runTests}
                disabled={isRunning}
                className={`w-full py-3 px-4 rounded-lg font-bold flex items-center justify-center transition-all ${
                  isRunning 
                    ? 'bg-gray-700 text-gray-400 cursor-not-allowed' 
                    : 'bg-green-600 hover:bg-green-500 text-white shadow-lg hover:shadow-green-500/20'
                }`}
              >
                {isRunning ? (
                  <>
                    <Activity size={18} className="mr-2 animate-spin" /> Running Suite...
                  </>
                ) : (
                  <>
                    <Play size={18} className="mr-2" /> Run Diagnostics
                  </>
                )}
              </button>
            </div>

            {/* Test List Status */}
            <div className="bg-gray-800 rounded-xl overflow-hidden border border-gray-700">
              <div className="px-6 py-4 bg-gray-800/50 border-b border-gray-700">
                <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-400">Test Cases</h3>
              </div>
              <div className="divide-y divide-gray-700">
                {results.map((test, idx) => (
                  <div 
                    key={idx} 
                    className={`px-6 py-4 flex items-center justify-between transition-colors ${
                      activeTestIndex === idx ? 'bg-blue-900/20' : ''
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      {test.status === 'pending' && <div className="w-5 h-5 rounded-full border-2 border-gray-600" />}
                      {test.status === 'running' && <LoaderIcon />}
                      {test.status === 'passed' && <CheckCircle size={20} className="text-green-500" />}
                      {test.status === 'failed' && <XCircle size={20} className="text-red-500" />}
                      <span className={`text-sm font-medium ${
                        test.status === 'pending' ? 'text-gray-500' :
                        test.status === 'running' ? 'text-blue-400' :
                        'text-gray-200'
                      }`}>
                        {test.name}
                      </span>
                    </div>
                    {test.duration && (
                      <span className="text-xs text-gray-500 font-mono">{test.duration}ms</span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Terminal / Output */}
          <div className="lg:col-span-2">
            <div className="bg-black/80 rounded-xl border border-gray-700 shadow-2xl h-[600px] flex flex-col backdrop-blur-sm">
              <div className="px-4 py-2 bg-gray-800/80 rounded-t-xl border-b border-gray-700 flex space-x-2 items-center">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                <span className="ml-4 text-xs text-gray-400 font-mono">puppeteer-runner --verbose</span>
              </div>
              
              <div 
                ref={scrollRef}
                className="flex-1 p-6 overflow-y-auto font-mono text-sm space-y-2"
              >
                <div className="text-gray-500 mb-4">
                  $ initializing test environment...<br/>
                  $ loading test_suite_v1.0.js...<br/>
                  $ ready.
                </div>
                
                {results.flatMap((t, tIdx) => 
                  t.logs.map((log, lIdx) => (
                    <div key={`${tIdx}-${lIdx}`} className="flex">
                      <span className="text-blue-500 mr-2">➜</span>
                      <span className={`${
                        log.includes('[ERROR]') ? 'text-red-400' :
                        log.includes('[SUCCESS]') ? 'text-green-400' :
                        'text-gray-300'
                      }`}>
                        {log}
                      </span>
                    </div>
                  ))
                )}

                {activeTestIndex === null && isRunning === false && results.some(r => r.status !== 'pending') && (
                   <div className="mt-8 pt-4 border-t border-gray-800">
                     <div className="text-white font-bold">
                       SUMMARY: 
                       <span className="text-green-400 ml-2">{results.filter(r => r.status === 'passed').length} Passed</span>
                       <span className="text-red-400 ml-4">{results.filter(r => r.status === 'failed').length} Failed</span>
                     </div>
                     <div className="text-gray-500 mt-2">$ awaiting input...</div>
                   </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const LoaderIcon = () => (
  <svg className="animate-spin h-5 w-5 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
  </svg>
);

export default PuppeteerSelfTest;