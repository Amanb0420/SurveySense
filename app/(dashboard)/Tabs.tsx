"use client"
import React, { useState } from 'react';
import '../styles.css';

interface Tab {
  title: string;
  content: React.ReactNode;
}

const Tabs: React.FC<{ tabs: Tab[] }> = ({ tabs }: { tabs: Tab[] }) => {
  const [activeTab, setActiveTab] = useState(tabs[0].title);

  const handleClick = (title: string) => {
    setActiveTab(title);
  };

  return (
    <div className="tabs">
      <ul className="flex justify-evenly">
        {tabs.map((tab) => (
          <li key={tab.title} className={`tabs__nav-item border-4 rounded-2 w-300 pr-10 pl-10  ${activeTab === tab.title ? 'active' : ''}`}>
            <button onClick={() => handleClick(tab.title)}>{tab.title}</button>
          </li>
        ))}
      </ul>
      <div className="tabs-content">
        {tabs.map((tab) => (
          <div key={tab.title} className={`tabs__content-item w-full pr-20 pl-20 ${activeTab === tab.title ? 'active' : 'hidden'}`}>
            {tab.content}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Tabs;
