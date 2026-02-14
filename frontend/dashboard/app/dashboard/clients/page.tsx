"use client";

import React, { useState, useEffect } from "react";
import { CLIENTS_ENDPOINT } from "@/config/config";

interface Client {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  createdAt: string;
}

const ClientsPage: React.FC = () => {
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);

  useEffect(() => {
    fetchClients();
  }, []);

  const fetchClients = async () => {
    try {
      const response = await fetch(CLIENTS_ENDPOINT);
      if (!response.ok) {
        throw new Error("Failed to fetch clients");
      }
      const data = await response.json();
      setClients(data);
    } catch (error) {
      console.error("Error fetching clients:", error);
      setClients([]);
    } finally {
      setLoading(false);
    }
  };

  const handleView = (client: Client) => {
    setSelectedClient(client);
    setShowModal(true);
  };

  if (loading) {
    return <div className="text-center py-20">Loading...</div>;
  }

  return (
    <div>
      <div className="mb-6 sm:mb-8">
        <div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-green-600 to-teal-600 bg-clip-text text-transparent mb-2">
            Client Inquiries
          </h1>
          <p className="text-gray-600 flex items-center gap-2">
            <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs sm:text-sm font-semibold">
              {clients.length} {clients.length === 1 ? "Inquiry" : "Inquiries"}
            </span>
          </p>
        </div>
      </div>

      {clients.length === 0 ? (
        <div className="text-center py-20 bg-gradient-to-br from-green-50 to-teal-50 rounded-2xl shadow-lg border border-green-100">
          <div className="inline-block p-6 bg-white rounded-full shadow-md mb-4">
            <svg
              className="w-16 h-16 text-green-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
              />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-gray-700 mb-2">
            No Inquiries Yet
          </h3>
          <p className="text-gray-500">
            Client inquiries will appear here once they contact you.
          </p>
        </div>
      ) : (
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[640px]">
              <thead className="bg-gradient-to-r from-green-600 to-teal-600 text-white">
                <tr>
                  <th className="px-4 sm:px-6 py-3 sm:py-4 text-left font-semibold text-sm">
                    Name
                  </th>
                  <th className="px-4 sm:px-6 py-3 sm:py-4 text-left font-semibold text-sm">
                    Email
                  </th>
                  <th className="px-4 sm:px-6 py-3 sm:py-4 text-left font-semibold text-sm hidden md:table-cell">
                    Phone
                  </th>
                  <th className="px-4 sm:px-6 py-3 sm:py-4 text-left font-semibold text-sm">
                    Subject
                  </th>
                  <th className="px-4 sm:px-6 py-3 sm:py-4 text-left font-semibold text-sm hidden lg:table-cell">
                    Date
                  </th>
                  <th className="px-4 sm:px-6 py-3 sm:py-4 text-center font-semibold text-sm">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {clients.map((client, index) => (
                  <tr
                    key={index}
                    className="hover:bg-gradient-to-r hover:from-green-50 hover:to-teal-50 transition-all duration-200"
                  >
                    <td className="px-4 sm:px-6 py-3 sm:py-4 font-medium text-gray-900 text-sm">
                      {client.name}
                    </td>
                    <td className="px-4 sm:px-6 py-3 sm:py-4 text-gray-700 text-sm">
                      {client.email}
                    </td>
                    <td className="px-4 sm:px-6 py-3 sm:py-4 text-gray-700 text-sm hidden md:table-cell">
                      {client.phone}
                    </td>
                    <td className="px-4 sm:px-6 py-3 sm:py-4 text-sm">
                      <span className="line-clamp-1 text-gray-700">
                        {client.subject}
                      </span>
                    </td>
                    <td className="px-4 sm:px-6 py-3 sm:py-4 text-gray-600 text-xs sm:text-sm hidden lg:table-cell">
                      {new Date(client.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-4 sm:px-6 py-3 sm:py-4 text-center">
                      <button
                        onClick={() => handleView(client)}
                        className="inline-flex items-center gap-1 sm:gap-2 bg-gradient-to-r from-green-600 to-teal-600 text-white px-3 sm:px-4 py-2 rounded-xl hover:from-green-700 hover:to-teal-700 transition-all duration-300 font-medium shadow-md hover:shadow-lg text-xs sm:text-sm"
                        title="View Details"
                      >
                        <svg
                          className="w-4 h-4 sm:w-5 sm:h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                          />
                        </svg>
                        <span className="hidden sm:inline">View</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {showModal && selectedClient && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4 z-50 animate-fadeIn">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="sticky top-0 bg-gradient-to-r from-green-600 to-teal-600 text-white p-4 sm:p-6 rounded-t-2xl">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2 sm:gap-3">
                  <div className="p-1.5 sm:p-2 bg-white/20 rounded-xl">
                    <svg
                      className="w-5 h-5 sm:w-6 sm:h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                  <h2 className="text-lg sm:text-xl md:text-2xl font-bold">
                    Client Inquiry Details
                  </h2>
                </div>
                <button
                  onClick={() => {
                    setShowModal(false);
                    setSelectedClient(null);
                  }}
                  className="text-white hover:bg-white/20 rounded-full p-2 transition-colors"
                >
                  <svg
                    className="w-5 h-5 sm:w-6 sm:h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            </div>

            <div className="p-4 sm:p-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-600 mb-1">
                    Name
                  </label>
                  <p className="text-lg">{selectedClient.name}</p>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-600 mb-1">
                    Email
                  </label>
                  <p className="text-lg">
                    <a
                      href={`mailto:${selectedClient.email}`}
                      className="text-blue-500 hover:underline"
                    >
                      {selectedClient.email}
                    </a>
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-600 mb-1">
                    Phone
                  </label>
                  <p className="text-lg">
                    <a
                      href={`tel:${selectedClient.phone}`}
                      className="text-blue-500 hover:underline"
                    >
                      {selectedClient.phone}
                    </a>
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-600 mb-1">
                    Subject
                  </label>
                  <p className="text-lg">{selectedClient.subject}</p>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-600 mb-1">
                    Message
                  </label>
                  <p className="text-lg whitespace-pre-wrap bg-gradient-to-br from-green-50 to-teal-50 p-5 rounded-xl border border-green-100">
                    {selectedClient.message}
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-600 mb-1">
                    Received At
                  </label>
                  <p className="text-lg">
                    {new Date(selectedClient.createdAt).toLocaleString()}
                  </p>
                </div>
              </div>

              <div className="mt-8 flex gap-3">
                <button
                  onClick={() => {
                    setShowModal(false);
                    setSelectedClient(null);
                  }}
                  className="flex-1 bg-gray-200 text-gray-700 px-6 py-3 rounded-xl hover:bg-gray-300 transition-all duration-300 font-medium"
                >
                  Close
                </button>
                <a
                  href={`mailto:${selectedClient.email}?subject=Re: ${selectedClient.subject}`}
                  className="flex-1 bg-gradient-to-r from-green-600 to-teal-600 text-white px-6 py-3 rounded-xl hover:from-green-700 hover:to-teal-700 text-center font-medium shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                  Reply via Email
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ClientsPage;
