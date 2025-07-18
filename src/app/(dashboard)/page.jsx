'use client';

import React, { useEffect, useState } from 'react';

export default function Dashboard() {
  const [user, setUser] = useState(null);

  const summaryData = [
    {
      title: 'Social Media Assistant',
      company: 'Nomad',
      location: 'Paris, France',
      type: 'Full-Time',
      date: '24 July 2021',
      color: 'bg-green-100',
    },
    {
      title: 'Social Media Assistant',
      company: 'Udacity',
      location: 'New York, USA',
      type: 'Full-Time',
      date: '23 July 2021',
      color: 'bg-blue-100',
    },
    {
      title: 'Social Media Assistant',
      company: 'Packer',
      location: 'Madrid, Spain',
      type: 'Full-Time',
      date: '22 July 2021',
      color: 'bg-red-100',
    },
  ];

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch('/api/session');
        if (res.ok) {
          const data = await res.json();
          setUser(data.user);
        } else {
          setUser(null);
        }
      } catch (err) {
        console.error('Error fetching session:', err);
        setUser(null);
      }
    };

    fetchUser();
  }, []);

  return (
    <div className="p-8 space-y-8">
      <div>
        <h1 className="text-2xl font-bold">
          {user ? `Good morning, ${user.name}` : 'Loading...'}
        </h1>
        <p className="text-gray-500">Here’s what’s happening with your job applications</p>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-3 gap-4">
        <div className="p-4 border rounded-xl">
          <p className="text-gray-500">Total CV Analyzed</p>
          <h2 className="text-3xl font-bold">45</h2>
        </div>
        <div className="p-4 border rounded-xl">
          <p className="text-gray-500">Total CV Uploaded</p>
          <h2 className="text-3xl font-bold">18</h2>
        </div>
        <div className="p-4 border rounded-xl">
          <p className="text-gray-500 mb-2">Jobs Applied Status</p>
          <div className="w-24 h-24 rounded-full border-4 border-purple-500 relative">
            <div className="absolute inset-0 flex items-center justify-center text-sm">
              <div>
                <div><strong>60%</strong> ❌</div>
                <div><strong>40%</strong> ✅</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Upcoming Interview */}
      <div className="border rounded-xl p-4">
        <p className="text-gray-500">Upcoming Interviews</p>
        <div className="mt-4">
          <p><strong>Today, 26 November</strong></p>
          <div className="mt-2 space-y-2">
            <div className="bg-gray-100 p-2 rounded-lg">
              <p className="text-sm">10:30 AM</p>
              <p className="font-medium">Joe Bartmann – HR Manager at Divvy</p>
            </div>
          </div>
        </div>
      </div>

      {/* Recent CV History */}
      <div className="border rounded-xl p-4">
        <p className="font-semibold mb-4">Recent CV Analysis History</p>
        <div className="space-y-2">
          {summaryData.map((job, idx) => (
            <div
              key={idx}
              className="flex justify-between items-center p-4 border rounded-md hover:bg-gray-50"
            >
              <div className="flex gap-4 items-center">
                <div className={`w-10 h-10 rounded ${job.color}`}></div>
                <div>
                  <p className="font-medium">{job.title}</p>
                  <p className="text-sm text-gray-500">
                    {job.company} · {job.location} · {job.type}
                  </p>
                </div>
              </div>
              <div className="text-sm text-gray-500">{job.date}</div>
            </div>
          ))}
        </div>
        <div className="text-right mt-4">
          <a href="#" className="text-indigo-600 font-medium">View all analysis history →</a>
        </div>
      </div>
    </div>
  );
}
