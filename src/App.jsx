import React, { useState, useEffect } from 'react';

function App() {
  const [profitPerJob, setProfitPerJob] = useState(900);
  const [unansweredCalls, setUnansweredCalls] = useState(1350);
  const [unansweredLeadsPercent, setUnansweredLeadsPercent] = useState(52);
  const [leadConversionRate, setLeadConversionRate] = useState(29);
  
  const [unansweredLeads, setUnansweredLeads] = useState(0);
  const [conversions, setConversions] = useState(0);
  const [unrealizedProfit, setUnrealizedProfit] = useState(0);

  useEffect(() => {
    // Calculate unanswered leads based on percentage
    const leads = Math.round(unansweredCalls * (unansweredLeadsPercent / 100));
    setUnansweredLeads(leads);
    
    // Calculate conversions based on lead conversion rate
    const convs = Math.round(leads * (leadConversionRate / 100));
    setConversions(convs);
    
    // Calculate unrealized profit
    const profit = convs * profitPerJob;
    setUnrealizedProfit(profit);
  }, [profitPerJob, unansweredCalls, unansweredLeadsPercent, leadConversionRate]);

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(value);
  };

  const formatNumber = (value) => {
    return new Intl.NumberFormat('en-US').format(value);
  };

  return (
    <div className="container">
      <h1>The <span>Revenue Cost</span> of Unanswered Calls</h1>
      <p className="subtitle">Example: Home Service Company</p>
      
      <div className="calculator">
        <div className="input-section">
          <div className="input-group">
            <label htmlFor="profit-per-job">Average profit per job</label>
            <div className="value-container">
              <div className="value primary">
                <div className="dot primary"></div>
                <div className="line primary"></div>
                ${profitPerJob}
              </div>
              <div className="connecting-line right"></div>
            </div>
            <input 
              type="range" 
              id="profit-per-job" 
              min="100" 
              max="2000" 
              step="50" 
              value={profitPerJob}
              onChange={(e) => setProfitPerJob(Number(e.target.value))}
            />
          </div>
          
          <div className="input-group">
            <label htmlFor="unanswered-calls">Unanswered calls</label>
            <div className="value-container">
              <div className="value light">
                <div className="dot light"></div>
                <div className="line light"></div>
                {formatNumber(unansweredCalls)}
              </div>
            </div>
            <input 
              type="range" 
              id="unanswered-calls" 
              min="100" 
              max="3000" 
              step="50" 
              value={unansweredCalls}
              onChange={(e) => setUnansweredCalls(Number(e.target.value))}
            />
          </div>
          
          <div className="input-group">
            <label htmlFor="unanswered-leads">Unanswered call leads ({unansweredLeadsPercent}%)</label>
            <div className="value-container">
              <div className="value light">
                <div className="dot light"></div>
                <div className="line light"></div>
                {formatNumber(unansweredLeads)}
              </div>
              <div className="connecting-line right"></div>
            </div>
            <input 
              type="range" 
              id="unanswered-leads" 
              min="10" 
              max="90" 
              step="1" 
              value={unansweredLeadsPercent}
              onChange={(e) => setUnansweredLeadsPercent(Number(e.target.value))}
            />
          </div>
          
          <div className="input-group">
            <label htmlFor="conversion-rate">Phone lead conversions ({leadConversionRate}%)</label>
            <div className="value-container">
              <div className="value primary">
                <div className="dot primary"></div>
                <div className="line primary"></div>
                {formatNumber(conversions)}
              </div>
              <div className="connecting-line right"></div>
            </div>
            <input 
              type="range" 
              id="conversion-rate" 
              min="5" 
              max="50" 
              step="1" 
              value={leadConversionRate}
              onChange={(e) => setLeadConversionRate(Number(e.target.value))}
            />
          </div>
        </div>
        
        <div className="result-section">
          <div className="result-title">
            {formatNumber(conversions)} x {formatCurrency(profitPerJob)} =
          </div>
          <div className="result-value">
            {formatCurrency(unrealizedProfit)}
          </div>
          <div className="result-label">/Month</div>
          <div className="result-description">Unrealized Profits</div>
        </div>
      </div>
    </div>
  );
}

export default App;
