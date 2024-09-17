import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import dayjs from 'dayjs';
import './TileDetailsModal.css';

interface TileDetailsModalProps {
  options: {
    updateData: (id: string, updatedDatum: {id:string; startDate?: dayjs.Dayjs; endDate?: dayjs.Dayjs; title?: string; subtitle?: string; description?: string; color?: string; }) => void;
    deleteData: (id: string) => void;
    createData: (datum: { startDate: dayjs.Dayjs; endDate: dayjs.Dayjs; title: string; subtitle: string; description: string; color: string; }) => void;
    updateLabel: (updatedLabel: { icon?: string; title?: string; subtitle?: string; }) => void;
    deleteLabel: (id: string) => void;
    createLabel: (label: { icon: string; title: string; subtitle: string }) => void;
  }
  show: boolean;
  handleClose: () => void;
  tileData: {
    id: string;
    title: string;
    subtitle: string;
    description: string;
    startDate: string | Date;
    endDate: string | Date;
    occupancy: number;
    bgColor: string;
  } | null;
  selectedTileDataId: string | undefined;
}

const TileDetailsModal: React.FC<TileDetailsModalProps> = ({ selectedTileDataId,options, show, handleClose, tileData }) => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    subtitle: '',
    description: '',
    startDate: '',
    endDate: '',
    occupancy: 0,
    bgColor: ''
  });

  useEffect(() => {
    if (tileData) {
      setFormData({
        title: tileData.title,
        subtitle: tileData.subtitle,
        description: tileData.description,
        startDate: tileData.startDate,
        endDate: tileData.endDate,
        occupancy: tileData.occupancy,
        bgColor: tileData.bgColor
      });
    }
  }, [tileData]);

  if (!tileData) return null;

  const handleEdit = () => setIsEditMode(true);
  const handleSave = () => {
    if (formData.title && formData.subtitle && formData.description && formData.startDate && formData.endDate && formData.bgColor) {
      options.updateData(selectedTileDataId, {
        id: tileData.id,
        title: formData.title,
        subtitle: formData.subtitle,
        description: formData.description,
        startDate: dayjs(formData.startDate),
        endDate: dayjs(formData.endDate),
        color: formData.bgColor
      });
      setIsEditMode(false);
      handleClose();
    } else {
      alert('All fields are required.');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <Modal show={show} onHide={handleClose} centered className="tile-details-modal">
      <Modal.Header closeButton>
        <Modal.Title>Tile Details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="tile-details">
          {isEditMode ? (
            <>
              <Form.Group className="mb-3">
                <Form.Label>Title</Form.Label>
                <Form.Control type="text" name="title" value={formData.title} onChange={handleChange} />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Subtitle</Form.Label>
                <Form.Control type="text" name="subtitle" value={formData.subtitle} onChange={handleChange} />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Description</Form.Label>
                <Form.Control as="textarea" name="description" value={formData.description} onChange={handleChange} />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Start Date</Form.Label>
                <Form.Control type="datetime-local" name="startDate" value={dayjs(formData.startDate).format('YYYY-MM-DDTHH:mm')} onChange={handleChange} />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>End Date</Form.Label>
                <Form.Control type="datetime-local" name="endDate" value={dayjs(formData.endDate).format('YYYY-MM-DDTHH:mm')} onChange={handleChange} />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Occupancy</Form.Label>
                <Form.Control type="number" name="occupancy" value={formData.occupancy} onChange={handleChange} />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Tile Color (Might Cause Error) </Form.Label>
                <Form.Control type="color" name="bgColor" value={formData.bgColor} onChange={handleChange} />
              </Form.Group>
            </>
          ) : (
            <>
              <div className="tile-detail">
                <strong>Title:</strong> {tileData.title}
              </div>
              <div className="tile-detail">
                <strong>Subtitle:</strong> {tileData.subtitle}
              </div>
              <div className="tile-detail">
                <strong>Description:</strong> {tileData.description}
              </div>
              <div className="tile-detail">
                <strong>Start Date:</strong> {new Date(tileData.startDate).toLocaleString()}
              </div>
              <div className="tile-detail">
                <strong>End Date:</strong> {new Date(tileData.endDate).toLocaleString()}
              </div>
              <div className="tile-detail">
                <strong>Occupancy:</strong> {tileData.occupancy}
              </div>
              <div className="tile-detail">
                <strong>Tile Color: (Might Cause Error) </strong> <span className="tile-color" style={{ backgroundColor: tileData.bgColor }}></span>
              </div>
            </>
          )}
        </div>
      </Modal.Body>
      <Modal.Footer>
        {isEditMode ? (
          <>
            <Button variant="primary" onClick={handleSave}>
              Save
            </Button>
            <Button variant="secondary" onClick={() => setIsEditMode(false)}>
              Cancel
            </Button>
          </>
        ) : (
          <Button variant="primary" onClick={handleEdit}>
            Edit
          </Button>
        )}
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default TileDetailsModal;