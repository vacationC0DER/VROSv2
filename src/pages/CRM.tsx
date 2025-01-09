import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable, DropResult } from '@hello-pangea/dnd';
import { Phone, Mail, Building, MoreVertical, Plus, MapPin, DollarSign } from 'lucide-react';
import { ContactDetailsModal } from '../components/crm/ContactDetailsModal';
import { NewContactModal } from '../components/crm/NewContactModal';
import { PipelineFilters } from '../components/crm/PipelineFilters';
import type { Contact, Stage } from '../types/crm';

export function CRM() {
  const [stages, setStages] = useState<Stage[]>([
    {
      id: 'lead',
      title: 'New Leads',
      color: 'bg-blue-100 text-blue-800',
      contacts: [
        {
          id: '1',
          address: '123 Mountain View Dr, Aspen, CO',
          owner: {
            name: 'John Smith',
            email: 'john@example.com',
            phone: '(555) 123-4567'
          },
          annualRevenue: 175000,
          propertyType: 'vacation_home',
          bedrooms: 3,
          bathrooms: 2,
          lastContact: '2 days ago'
        },
        {
          id: '2',
          address: '456 Lake Shore Rd, Lake Tahoe, CA',
          owner: {
            name: 'Sarah Johnson',
            email: 'sarah@example.com',
            phone: '(555) 234-5678'
          },
          annualRevenue: 225000,
          propertyType: 'villa',
          bedrooms: 4,
          bathrooms: 3,
          lastContact: '1 day ago'
        }
      ]
    },
    {
      id: 'contacted',
      title: 'Contacted',
      color: 'bg-purple-100 text-purple-800',
      contacts: [
        {
          id: '3',
          address: '789 Luxury Ave, Vail, CO',
          owner: {
            name: 'Michael Brown',
            email: 'michael@example.com',
            phone: '(555) 345-6789'
          },
          annualRevenue: 195000,
          propertyType: 'condo',
          bedrooms: 2,
          bathrooms: 2,
          lastContact: '3 days ago'
        }
      ]
    },
    {
      id: 'meeting',
      title: 'Meeting Scheduled',
      color: 'bg-yellow-100 text-yellow-800',
      contacts: []
    },
    {
      id: 'proposal',
      title: 'Proposal Sent',
      color: 'bg-orange-100 text-orange-800',
      contacts: [
        {
          id: '4',
          address: '321 Coastal Hwy, Malibu, CA',
          owner: {
            name: 'Emily Davis',
            email: 'emily@example.com',
            phone: '(555) 456-7890'
          },
          annualRevenue: 350000,
          propertyType: 'vacation_home',
          bedrooms: 5,
          bathrooms: 4,
          lastContact: '1 day ago'
        }
      ]
    },
    {
      id: 'negotiation',
      title: 'Negotiation',
      color: 'bg-pink-100 text-pink-800',
      contacts: []
    },
    {
      id: 'closed',
      title: 'Closed Won',
      color: 'bg-green-100 text-green-800',
      contacts: [
        {
          id: '5',
          address: '987 Resort Way, Park City, UT',
          owner: {
            name: 'David Wilson',
            email: 'david@example.com',
            phone: '(555) 567-8901'
          },
          annualRevenue: 425000,
          propertyType: 'villa',
          bedrooms: 6,
          bathrooms: 5,
          lastContact: '5 days ago'
        }
      ]
    }
  ]);

  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [showNewContactModal, setShowNewContactModal] = useState(false);
  const [search, setSearch] = useState('');
  const [propertyType, setPropertyType] = useState('');
  const [valueRange, setValueRange] = useState('');

  const handleAddContact = (contact: Contact) => {
    setStages(prevStages => 
      prevStages.map(stage => 
        stage.id === 'lead'
          ? { ...stage, contacts: [...stage.contacts, contact] }
          : stage
      )
    );
  };

  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result;

    // Dropped outside a valid droppable
    if (!destination) return;

    // No movement
    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) return;

    // Find source and destination stages
    const sourceStage = stages.find(s => s.id === source.droppableId);
    const destStage = stages.find(s => s.id === destination.droppableId);

    if (!sourceStage || !destStage) return;

    // Create new stages array
    const newStages = stages.map(stage => {
      // Remove from source stage
      if (stage.id === source.droppableId) {
        const newContacts = [...stage.contacts];
        const [removed] = newContacts.splice(source.index, 1);
        return { ...stage, contacts: newContacts };
      }
      // Add to destination stage
      if (stage.id === destination.droppableId) {
        const newContacts = [...stage.contacts];
        const [removed] = sourceStage.contacts.splice(source.index, 1);
        newContacts.splice(destination.index, 0, removed);
        return { ...stage, contacts: newContacts };
      }
      return stage;
    });

    setStages(newStages);
  };

  // Filter stages based on search and filters
  const filteredStages = stages.map(stage => ({
    ...stage,
    contacts: stage.contacts.filter(contact => {
      const matchesSearch = search
        ? contact.address.toLowerCase().includes(search.toLowerCase()) ||
          contact.owner.name.toLowerCase().includes(search.toLowerCase()) ||
          contact.owner.email.toLowerCase().includes(search.toLowerCase())
        : true;

      const matchesPropertyType = propertyType
        ? contact.propertyType === propertyType
        : true;

      const matchesValueRange = valueRange
        ? (() => {
            const [min, max] = valueRange.split('-').map(Number);
            if (!max) return contact.annualRevenue >= min;
            return contact.annualRevenue >= min && contact.annualRevenue < max;
          })()
        : true;

      return matchesSearch && matchesPropertyType && matchesValueRange;
    })
  }));

  return (
    <div className="h-[calc(100vh-theme(spacing.16))] flex flex-col">
      <div className="p-6 border-b border-gray-200 bg-white">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold">Pipeline</h1>
            <p className="text-gray-600">Manage your property leads and deals</p>
          </div>
          <button
            onClick={() => setShowNewContactModal(true)}
            className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
          >
            <Plus className="h-4 w-4" />
            <span>Add Property</span>
          </button>
        </div>

        <PipelineFilters
          search={search}
          onSearchChange={setSearch}
          propertyType={propertyType}
          onPropertyTypeChange={setPropertyType}
          valueRange={valueRange}
          onValueRangeChange={setValueRange}
        />
      </div>
      
      <div className="flex-1 overflow-x-auto">
        <DragDropContext onDragEnd={onDragEnd}>
          <div className="flex gap-4 p-4 min-w-max">
            {filteredStages.map(stage => (
              <div key={stage.id} className="w-80 flex-shrink-0">
                <div className="mb-3 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <h3 className={`px-3 py-1 rounded-full text-sm font-medium ${stage.color}`}>
                      {stage.title}
                    </h3>
                    <span className="text-sm text-gray-600">
                      {stage.contacts.length}
                    </span>
                  </div>
                  <button className="p-1 hover:bg-gray-100 rounded">
                    <MoreVertical className="h-4 w-4 text-gray-500" />
                  </button>
                </div>

                <Droppable droppableId={stage.id}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                      className="space-y-3 min-h-[calc(100vh-12rem)]"
                    >
                      {stage.contacts.map((contact, index) => (
                        <Draggable 
                          key={contact.id} 
                          draggableId={contact.id} 
                          index={index}
                        >
                          {(provided) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              onClick={() => setSelectedContact(contact)}
                              className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
                            >
                              <div className="flex justify-between items-start mb-3">
                                <div>
                                  <h4 className="font-medium text-gray-900">{contact.address}</h4>
                                  <div className="flex items-center gap-1 text-sm text-gray-600">
                                    <Building className="h-4 w-4" />
                                    <span>{contact.owner.name}</span>
                                  </div>
                                </div>
                                <span className="text-sm font-medium text-green-600">
                                  ${contact.annualRevenue.toLocaleString()}/yr
                                </span>
                              </div>
                              
                              <div className="space-y-2 text-sm text-gray-600">
                                <div className="flex items-center gap-2">
                                  <Mail className="h-4 w-4" />
                                  <span>{contact.owner.email}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <Phone className="h-4 w-4" />
                                  <span>{contact.owner.phone}</span>
                                </div>
                              </div>
                              
                              <div className="mt-3 pt-3 border-t border-gray-100 text-xs text-gray-500">
                                Last contacted {contact.lastContact}
                              </div>
                            </div>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </div>
            ))}
          </div>
        </DragDropContext>
      </div>

      {selectedContact && (
        <ContactDetailsModal
          contact={selectedContact}
          onClose={() => setSelectedContact(null)}
        />
      )}

      {showNewContactModal && (
        <NewContactModal
          onClose={() => setShowNewContactModal(false)}
          onSubmit={handleAddContact}
        />
      )}
    </div>
  );
}