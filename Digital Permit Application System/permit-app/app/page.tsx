'use client';

import { useState } from 'react';

const API_BASE_URL = 'http://localhost:3001/api/permits';

export default function Home() {
  // Submit Permit Form
  const [citizenId, setCitizenId] = useState('');
  const [businessName, setBusinessName] = useState('');
  const [permitType, setPermitType] = useState('');
  const [submitLoading, setSubmitLoading] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');
  const [permitId, setPermitId] = useState('');

  // Fetch Permit
  const [fetchId, setFetchId] = useState('');
  const [fetchLoading, setFetchLoading] = useState(false);
  const [permitDetails, setPermitDetails] = useState(null);

  // Update Status
  const [updateId, setUpdateId] = useState('');
  const [status, setStatus] = useState('UNDER_REVIEW');
  const [updateLoading, setUpdateLoading] = useState(false);
  const [updateMessage, setUpdateMessage] = useState('');

  const handleSubmitPermit = async (e) => {
    e.preventDefault();
    if (!citizenId || !businessName || !permitType) {
      setSubmitMessage('All fields are required');
      return;
    }
    setSubmitLoading(true);
    setSubmitMessage('');
    try {
      const response = await fetch(API_BASE_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ citizenId, businessName, permitType }),
      });
      if (!response.ok) throw new Error('Failed to submit permit');
      const data = await response.json();
      setPermitId(data.id);
      setSubmitMessage('Permit submitted successfully!');
      setCitizenId('');
      setBusinessName('');
      setPermitType('');
    } catch (error) {
      setSubmitMessage(error.message);
    } finally {
      setSubmitLoading(false);
    }
  };

  const handleFetchPermit = async () => {
    if (!fetchId) return;
    setFetchLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/${fetchId}`);
      if (!response.ok) throw new Error('Permit not found');
      const data = await response.json();
      setPermitDetails(data);
    } catch (error) {
      setPermitDetails(null);
      alert(error.message);
    } finally {
      setFetchLoading(false);
    }
  };

  const handleUpdateStatus = async () => {
    if (!updateId) return;
    setUpdateLoading(true);
    setUpdateMessage('');
    try {
      const response = await fetch(`${API_BASE_URL}/${updateId}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      });
      if (!response.ok) throw new Error('Failed to update status');
      setUpdateMessage('Status updated successfully!');
    } catch (error) {
      setUpdateMessage(error.message);
    } finally {
      setUpdateLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold mb-6 text-center text-black">Permit Application</h1>

        {/* Submit Permit Form */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4 text-black">Submit Permit</h2>
          <form onSubmit={handleSubmitPermit} className="space-y-4">
            <input
              type="text"
              placeholder="Citizen ID"
              value={citizenId}
              onChange={(e) => setCitizenId(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded text-black placeholder:text-gray-600"
              required
            />
            <input
              type="text"
              placeholder="Business Name"
              value={businessName}
              onChange={(e) => setBusinessName(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded text-black placeholder:text-gray-600"
              required
            />
            <input
              type="text"
              placeholder="Permit Type"
              value={permitType}
              onChange={(e) => setPermitType(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded text-black placeholder:text-gray-600"
              required
            />
            <button
              type="submit"
              disabled={submitLoading}
              className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 disabled:bg-gray-400"
            >
              {submitLoading ? 'Submitting...' : 'Submit'}
            </button>
          </form>
          {submitMessage && <p className="mt-2 text-red-500">{submitMessage}</p>}
          {permitId && <p className="mt-2 text-green-500">Permit ID: {permitId}</p>}
        </div>

        {/* Fetch Permit Details */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4 text-black">Fetch Permit Details</h2>
          <div className="flex space-x-2">
            <input
              type="text"
              placeholder="Permit ID"
              value={fetchId}
              onChange={(e) => setFetchId(e.target.value)}
              className="flex-1 p-2 border border-gray-300 rounded text-black placeholder:text-gray-600"
            />
            <button
              onClick={handleFetchPermit}
              disabled={fetchLoading}
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 disabled:bg-gray-400"
            >
              {fetchLoading ? 'Fetching...' : 'Fetch'}
            </button>
          </div>
          {permitDetails && (
            <div className="mt-4 p-4 bg-gray-50 rounded">
              <p className="text-black"><strong className="text-black">Business Name:</strong> {permitDetails.businessName}</p>
              <p className="text-black"><strong className="text-black">Permit Type:</strong> {permitDetails.permitType}</p>
              <p className="text-black"><strong className="text-black">Status:</strong> {permitDetails.status}</p>
              <p className="text-black"><strong className="text-black">Created Date:</strong> {new Date(permitDetails.createdAt).toLocaleDateString()}</p>
            </div>
          )}
        </div>

        {/* Update Permit Status */}
        <div>
          <h2 className="text-xl font-semibold mb-4 text-black">Update Permit Status</h2>
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Permit ID"
              value={updateId}
              onChange={(e) => setUpdateId(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded text-black placeholder:text-gray-600"
            />
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded text-black"
            >
              <option value="UNDER_REVIEW">UNDER_REVIEW</option>
              <option value="APPROVED">APPROVED</option>
              <option value="REJECTED">REJECTED</option>
            </select>
            <button
              onClick={handleUpdateStatus}
              disabled={updateLoading}
              className="w-full bg-purple-500 text-white p-2 rounded hover:bg-purple-600 disabled:bg-gray-400"
            >
              {updateLoading ? 'Updating...' : 'Update'}
            </button>
          </div>
          {updateMessage && <p className="mt-2 text-blue-500">{updateMessage}</p>}
        </div>
      </div>
    </div>
  );
}
