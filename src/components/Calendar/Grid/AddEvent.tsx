import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';




interface AddEventModalProps {
  data: {eventDetails:{
    startDate: Date;
    endDate: Date;
    title: string;
    subtitle: string;
    description: string;
    color: string;
}, setEventDetails:
React.Dispatch<React.SetStateAction<{
    startDate: Date;
    endDate: Date;
    title: string;
    subtitle: string;
    description: string;
    color: string;
}>>};
  isModalOpen: boolean;
  handleClose: () => void;
  handleSave: (eventDetails: {
    startDate: Date;
    endDate: Date;
    title: string;
    subtitle: string;
    description: string;
    color: string;
  }) => void;
}

const AddEventModal: React.FC<AddEventModalProps> = ({data, isModalOpen, handleClose, handleSave }) => {

const {eventDetails, setEventDetails} = data
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEventDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <Modal show={isModalOpen} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Add Event</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Start Date</Form.Label>
            <Form.Control
              type="date"
              name="startDate"
              value={eventDetails.startDate.toISOString().split('T')[0]}
              onChange={(e) => {
                setEventDetails((prev) => ({
                  ...prev,
                  startDate: new Date(e.target.value),
                }));
              }}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>End Date</Form.Label>
            <Form.Control
              type="date"
              name="endDate"
              value={eventDetails.endDate.toISOString().split('T')[0]}
              onChange={(e) => {
                setEventDetails((prev) => ({
                  ...prev,
                  endDate: new Date(e.target.value),
                }));
              }}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              name="title"
              value={eventDetails.title}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Subtitle</Form.Label>
            <Form.Control
              type="text"
              name="subtitle"
              value={eventDetails.subtitle}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="description"
              value={eventDetails.description}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Tile Color</Form.Label>
            <Form.Control
              type="color"
              name="color"
              value={eventDetails.color}
              onChange={handleChange}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button
          variant="primary"
          onClick={() => handleSave(eventDetails)}
        >
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddEventModal;