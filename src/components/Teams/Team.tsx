// src/components/Teams/Team.tsx
import React, { useContext, useState } from 'react';
import { Table, Form, Button, Badge } from 'react-bootstrap';
import dayjs from 'dayjs';
import './UserTable.css';
import { DataContext } from '@/context/DataContext';

const UserTable = () => {
  const { labeldataset, createLabel, updateLabel } = useContext(DataContext);
  const [selectedRecords, setSelectedRecords] = useState<string[]>([]);
  const [selectAll, setSelectAll] = useState(false);
  const [isAddingUser, setIsAddingUser] = useState(false);
  const [isEditingUser, setIsEditingUser] = useState<string | null>(null);
  const [newUser, setNewUser] = useState({
    title: '',
    subtitle: '',
    department: '',
    permission: 'NA',
  });
  const [errors, setErrors] = useState({
    title: '',
    subtitle: '',
    department: '',
  });

  const handleAddUser = () => {
    setIsAddingUser(true);
  };

  const handleSaveUser = () => {
    const newErrors = {
      title: newUser.title ? '' : 'Name is required',
      subtitle: newUser.subtitle ? '' : 'Role is required',
      department: newUser.department ? '' : 'Department is required',
    };

    if (newErrors.title || newErrors.subtitle || newErrors.department) {
      setErrors(newErrors);
      return;
    }

    createLabel({
      icon: '',
      title: newUser.title,
      subtitle: newUser.subtitle,
      department: newUser.department,
      permission: newUser.permission,
    });

    setIsAddingUser(false);
    setNewUser({
      title: '',
      subtitle: '',
      department: '',
      permission: 'NA',
    });
    setErrors({
      title: '',
      subtitle: '',
      department: '',
    });
  };

  const handleEditUser = (id: string) => {
    const user = labeldataset.find((label) => label.id === id);
    if (user) {
      setIsEditingUser(id);
      setNewUser({
        title: user.title,
        subtitle: user.subtitle,
        department: user.department,
        permission: user.permission,
      });
    }
  };

console.log(isEditingUser);


  const handleUpdateUser = (id:string) => {
    if (!isEditingUser) return;
console.log("update");

    const newErrors = {
      title: newUser.title ? '' : 'Name is required',
      subtitle: newUser.subtitle ? '' : 'Role is required',
      department: newUser.department ? '' : 'Department is required',
    };
    console.log("update2");

    if (newErrors.title || newErrors.subtitle || newErrors.department) {
      setErrors(newErrors);
      return;
    }
    console.log("update 3");

    updateLabel(id, {
      title: newUser.title,
      subtitle: newUser.subtitle,
      department: newUser.department,
      permission: newUser.permission,
    });
    console.log("update4");

    setIsEditingUser(null);
    setNewUser({
      title: '',
      subtitle: '',
      department: '',
      permission: 'NA',
    });
    setErrors({
      title: '',
      subtitle: '',
      department: '',
    });
  };

  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedRecords([]);
    } else {
      setSelectedRecords(labeldataset.map((label) => label.id));
    }
    setSelectAll(!selectAll);
  };

  const handleSelectRecord = (id: string) => {
    if (selectedRecords.includes(id)) {
      setSelectedRecords(selectedRecords.filter((recordId) => recordId !== id));
    } else {
      setSelectedRecords([...selectedRecords, id]);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewUser((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="user-table-wrapper">
      <div className="filter-section d-flex align-items-center mb-3">
        <Button variant="light" className="icon-button me-3" onClick={handleAddUser}>
          <i className="bi bi-person-plus"></i>
        </Button>

        <Badge className="filter-pill active-pill">4 Active</Badge>
        <Badge className="filter-pill archived-pill">0 Archived</Badge>
        <Button variant="link" className="filter-pill all-pill">All</Button>

        <Form.Check
          type="checkbox"
          label="Only show people with access rights"
          className="ms-auto checkbox-label"
        />
      </div>

      {/* Table */}
      <Table striped hover responsive className="user-table">
        <thead>
          <tr>
            <th>
              <Form.Check type="checkbox" checked={selectAll} onChange={handleSelectAll} />
            </th>
            <th>Name</th>
            <th>Role</th>
            <th>Department</th>
            <th>Access</th>
            <th>Manages</th>
            <th>Tags</th>
            <th>Type</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {isAddingUser && (
            <tr>
              <td></td>
              <td>
                <Form.Control
                  type="text"
                  name="title"
                  value={newUser.title}
                  onChange={handleChange}
                  isInvalid={!!errors.title}
                />
                <Form.Control.Feedback type="invalid">{errors.title}</Form.Control.Feedback>
              </td>
              <td>
                <Form.Control
                  type="text"
                  name="subtitle"
                  value={newUser.subtitle}
                  onChange={handleChange}
                  isInvalid={!!errors.subtitle}
                />
                <Form.Control.Feedback type="invalid">{errors.subtitle}</Form.Control.Feedback>
              </td>
              <td>
                <Form.Control
                  type="text"
                  name="department"
                  value={newUser.department}
                  onChange={handleChange}
                  isInvalid={!!errors.department}
                />
                <Form.Control.Feedback type="invalid">{errors.department}</Form.Control.Feedback>
              </td>
              <td>
                <Form.Control
                  type="text"
                  name="permission"
                  value={newUser.permission}
                  onChange={handleChange}
                />
              </td>
              <td>—</td>
              <td>—</td>
              <td>—</td>
              <td>
                <Button variant="success" onClick={handleSaveUser}>Save</Button>
                <Button variant="secondary" onClick={() => setIsAddingUser(false)}>Cancel</Button>
              </td>
            </tr>
          )}
          {labeldataset.map((data) => (
            <tr key={data.id}>
              <td>
                <Form.Check
                  type="checkbox"
                  checked={selectedRecords.includes(data.id)}
                  onChange={() => handleSelectRecord(data.id)}
                />
              </td>
              <td>
                {isEditingUser === data.id ? (
                  <Form.Control
                    type="text"
                    name="title"
                    value={newUser.title}
                    onChange={handleChange}
                    isInvalid={!!errors.title}
                  />
                ) : (
                  <div className="d-flex align-items-center">
                    <div className="avatar-circle">{data.title.charAt(0)}</div>
                    <span className="ms-2">{data.title}</span>
                  </div>
                )}
                {isEditingUser === data.id && <Form.Control.Feedback type="invalid">{errors.title}</Form.Control.Feedback>}
              </td>
              <td>
                {isEditingUser === data.id ? (
                  <Form.Control
                    type="text"
                    name="subtitle"
                    value={newUser.subtitle}
                    onChange={handleChange}
                    isInvalid={!!errors.subtitle}
                  />
                ) : (
                  data.subtitle
                )}
                {isEditingUser === data.id && <Form.Control.Feedback type="invalid">{errors.subtitle}</Form.Control.Feedback>}
              </td>
              <td>
                {isEditingUser === data.id ? (
                  <Form.Control
                    type="text"
                    name="department"
                    value={newUser.department}
                    onChange={handleChange}
                    isInvalid={!!errors.department}
                  />
                ) : (
                  data.department
                )}
                {isEditingUser === data.id && <Form.Control.Feedback type="invalid">{errors.department}</Form.Control.Feedback>}
              </td>
              <td>
                {isEditingUser === data.id ? (
                  <Form.Control
                    type="text"
                    name="permission"
                    value={newUser.permission}
                    onChange={handleChange}
                  />
                ) : (
                  data.permission
                )}
              </td>
              <td>—</td>
              <td>—</td>
              <td>—</td>
              <td>
                {isEditingUser === data.id ? (
                  <>
                    <Button variant="success" onClick={()=>handleUpdateUser(data.id)}>Save</Button>
                    <Button variant="secondary" onClick={() => setIsEditingUser(null)}>Cancel</Button>
                  </>
                ) : (
                  <Button variant="warning" onClick={() => handleEditUser(data.id)}>Edit</Button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default UserTable;