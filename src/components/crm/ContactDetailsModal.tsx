import React, { useState } from 'react';
import { X, Mail, Phone, Building, Calendar, Clock, MapPin, MessageSquare } from 'lucide-react';
import { CommunicationLog } from './CommunicationLog';
import { LogCommunicationModal } from './LogCommunicationModal';
import type { Contact } from '../../types/crm';

interface ContactDetailsModalProps {
  contact: Contact;
  onClose: () => void;
}

export function ContactDetailsModal({ contact, onClose }: ContactDetailsModalProps) {
  const [showLogModal, setShowLogModal] = useState(false);

  const handleLogCommunication = async (data: {
    type: 'email' | 'phone' | 'sms';
    subject?: string;
    content: string;
    direction: 'inbound' | 'outbound';
  }) => {
    // TODO: Implement communication logging
    console.log('Logging communication:', data);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col">
        <div className="flex justify-between items-center p-6 border-b border-gray-200">
          <div>
            <h2 className="text-xl font-semibold">{contact.owner.name}</h2>
            <p className="text-gray-600">{contact.address}</p>
          </div>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Contact Information */}
          <div>
            <h3 className="text-sm font-medium text-gray-900 mb-4">Contact Information</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-gray-400" />
                <span>{contact.owner.email}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-gray-400" />
                <span>{contact.owner.phone}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-gray-400" />
                <span>{contact.address}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-gray-400" />
                <span>Last Contact: {contact.lastContact}</span>
              </div>
            </div>
          </div>

          {/* Property Details */}
          <div>
            <h3 className="text-sm font-medium text-gray-900 mb-4">Property Details</h3>
            <div className="bg-gray-50 p-4 rounded-lg space-y-4">
              <div className="flex justify-between">
                <span className="text-gray-600">Annual Revenue</span>
                <span className="font-medium text-gray-900">${contact.annualRevenue.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Property Type</span>
                <span className="font-medium text-gray-900 capitalize">
                  {contact.propertyType.replace('_', ' ')}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Bedrooms</span>
                <span className="font-medium text-gray-900">{contact.bedrooms}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Bathrooms</span>
                <span className="font-medium text-gray-900">{contact.bathrooms}</span>
              </div>
            </div>
          </div>

          {/* Communication Log */}
          <CommunicationLog 
            communications={contact.communications || []}
            onAddCommunication={() => setShowLogModal(true)}
          />
        </div>

        <div className="flex justify-end gap-3 p-6 border-t border-gray-200 bg-gray-50">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            Close
          </button>
          <button
            onClick={() => setShowLogModal(true)}
            className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 flex items-center gap-2"
          >
            <MessageSquare className="h-4 w-4" />
            <span>Log Communication</span>
          </button>
        </div>
      </div>

      {showLogModal && (
        <LogCommunicationModal
          dealId={contact.id}
          onClose={() => setShowLogModal(false)}
          onSubmit={handleLogCommunication}
        />
      )}
    </div>
  );
}