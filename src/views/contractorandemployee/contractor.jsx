
import React, { useState } from 'react';
import { Row, Col, Card, Button, Table, Badge, Tabs, Tab, Form, Modal } from 'react-bootstrap';
import EmployeeProfile from './employeeprofile';

// Main Contractor Management Dashboard
const ContractorManagement = () => {
  const [activeTab, setActiveTab] = useState('contractors');
  const [showContractorModal, setShowContractorModal] = useState(false);
  const [showEmployeeModal, setShowEmployeeModal] = useState(false);
  const [showEmployeeProfile, setShowEmployeeProfile] = useState(false);
  const [selectedContractor, setSelectedContractor] = useState(null);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  // Sample Data
  const contractors = [
    {
      id: 'CTR-001',
      name: 'ABC Mechanicals Ltd.',
      contact: 'Ramesh Patel',
      email: 'ramesh@abcmech.com',
      phone: '+91 98765 43210',
      status: 'Active',
      employees: 15,
      documents: { gst: 'Valid', pan: 'Valid', insurance: 'Expired', safety: 'Valid' }
    },
    {
      id: 'CTR-002',
      name: 'XYZ Electricals',
      contact: 'Suresh Kumar',
      email: 'suresh@xyzelec.com',
      phone: '+91 98765 43211',
      status: 'Pending',
      employees: 8,
      documents: { gst: 'Valid', pan: 'Valid', insurance: 'Valid', safety: 'Pending' }
    }
  ];

  const employees = [
    {
      id: 'EMP-ABC-789',
      name: 'Rajesh Kumar',
      contractor: 'ABC Mechanicals Ltd.',
      role: 'Welder',
      status: 'Active',
      medical: 'Valid',
      induction: 'Completed',
      aadhaar: 'XXXX-XXXX-1234',
      doi: '2023-08-01',
      ppeRenewal: '2024-09-08'
    },
    {
      id: 'EMP-ABC-790',
      name: 'Mohan Singh',
      contractor: 'ABC Mechanicals Ltd.',
      role: 'Fitter',
      status: 'Active',
      medical: 'Expired',
      induction: 'Completed',
      aadhaar: 'XXXX-XXXX-5678',
      doi: '2023-07-15',
      ppeRenewal: '2024-10-15'
    }
  ];

  // Contractor Onboarding Form
  const ContractorOnboardingForm = () => (
    <Modal show={showContractorModal} onHide={() => setShowContractorModal(false)} size="lg">
      <Modal.Header closeButton>
        <Modal.Title
        style={{color:'#0A3A6E'}}
        >Onboard New Contractor</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Company Name *</Form.Label>
                <Form.Control type="text" placeholder="Enter company name" />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Contact Person *</Form.Label>
                <Form.Control type="text" placeholder="Enter contact person name" />
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Email *</Form.Label>
                <Form.Control type="email" placeholder="Enter email" />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Phone *</Form.Label>
                <Form.Control type="tel" placeholder="Enter phone number" />
              </Form.Group>
            </Col>
          </Row>

          <h6 className="mb-3">Document Upload</h6>
          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>GST Certificate *</Form.Label>
                <Form.Control type="file" />
                <Form.Text>Expiry Date:</Form.Text>
                <Form.Control type="date" className="mt-1" />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>PAN Card *</Form.Label>
                <Form.Control type="file" />
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Insurance Policy *</Form.Label>
                <Form.Control type="file" />
                <Form.Text>Expiry Date:</Form.Text>
                <Form.Control type="date" className="mt-1" />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Safety Policy *</Form.Label>
                <Form.Control type="file" />
                <Form.Text>Expiry Date:</Form.Text>
                <Form.Control type="date" className="mt-1" />
              </Form.Group>
            </Col>
          </Row>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => setShowContractorModal(false)}>
          Cancel
        </Button>
        <Button 
        style={{ backgroundColor: '#023c10ff', borderColor: '#023c10ff' }}
        onClick={() => setShowContractorModal(false)}>
          Submit for Approval
        </Button>
      </Modal.Footer>
    </Modal>
  );

  // Employee Onboarding Form
  const EmployeeOnboardingForm = () => (
    <Modal show={showEmployeeModal} onHide={() => setShowEmployeeModal(false)} size="lg">
      <Modal.Header closeButton>
        <Modal.Title
        style={{color:'#0A3A6E'}}
        >Onboard New Employee - {selectedContractor?.name}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Full Name *</Form.Label>
                <Form.Control type="text" placeholder="Enter employee name" />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Aadhaar Number *</Form.Label>
                <Form.Control type="text" placeholder="Enter Aadhaar number" />
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Role/Designation *</Form.Label>
                <Form.Select>
                  <option>Select Role</option>
                  <option>Welder</option>
                  <option>Fitter</option>
                  <option>Electrician</option>
                  <option>Helper</option>
                  <option>Supervisor</option>
                </Form.Select>
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Date of Joining *</Form.Label>
                <Form.Control type="date" />
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Contact Number</Form.Label>
                <Form.Control type="tel" placeholder="Enter contact number" />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Email Address</Form.Label>
                <Form.Control type="email" placeholder="Enter email address" />
              </Form.Group>
            </Col>
          </Row>

          <h6 className="mb-3">Required Documents</h6>
          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Photograph</Form.Label>
                <Form.Control type="file" accept="image/*" />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Aadhaar Copy</Form.Label>
                <Form.Control type="file" />
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Medical Certificate</Form.Label>
                <Form.Control type="file" />
                <Form.Text>Expiry Date:</Form.Text>
                <Form.Control type="date" className="mt-1" />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Emergency Contact</Form.Label>
                <Form.Control type="text" placeholder="Emergency contact number" />
              </Form.Group>
            </Col>
          </Row>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => setShowEmployeeModal(false)}>
          Cancel
        </Button>
        <Button  onClick={() => setShowEmployeeModal(false)}
        style={{ backgroundColor: '#023c10ff', borderColor: '#023c10ff' }}
            >
          Create Employee Profile
        </Button>
      </Modal.Footer>
    </Modal>
  );

  return (
    <div className="container-fluid">
      {/* Header */}
      <Row className="mb-0">
  <Col>
    <div className="d-flex justify-content-between align-items-center py-1">
      
      <div>
        {activeTab === 'contractors' && (
          <Button size="sm" onClick={() => setShowContractorModal(true)}
          style={{ backgroundColor: '#0E4C92', borderColor: '#0E4C92' }}
          >
            <i className="feather icon-plus me-1"></i>Onboard Contractor
          </Button>
        )}
      </div>
    </div>
  </Col>
</Row>


      {/* Main Content */}
      <Card >
        <Card.Header className="p-2">
  <Tabs
    activeKey={activeTab}
    onSelect={setActiveTab}
    className="card-header-tabs small-tabs"
  >
    <Tab
      eventKey="contractors"
      title={
        <span className="d-flex align-items-center">
          <i className="feather icon-briefcase me-1"></i>Contractors
        </span>
      }
    />
    <Tab
      eventKey="employees"
      title={
        <span className="d-flex align-items-center">
          <i className="feather icon-users me-1"></i>Employees
        </span>
      }
    />
  </Tabs>
</Card.Header>

        <Card.Body>
          {/* Contractors Tab */}
          {activeTab === 'contractors' && (
            <div>
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h5 className="mb-0">Registered Contractors</h5>
                <div>
                  <Button variant="outline-primary" size="sm" className="me-2">
                    <i className="feather icon-download me-1"></i>Export
                  </Button>
                </div>
              </div>

              <Table responsive>
                <thead>
                  <tr>
                    <th>Contractor ID</th>
                    <th>Company Name</th>
                    <th>Contact Person</th>
                    <th>Employees</th>
                    <th>Document Status</th>
                    <th>Overall Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {contractors.map((contractor) => (
                    <tr key={contractor.id}>
                      <td>{contractor.id}</td>
                      <td>
                        <strong>{contractor.name}</strong>
                        <br />
                        <small className="text-muted">{contractor.email}</small>
                      </td>
                      <td>
                        {contractor.contact}
                        <br />
                        <small className="text-muted">{contractor.phone}</small>
                      </td>
                      <td>
                        <Badge bg="primary">{contractor.employees} Employees</Badge>
                        <br />
                        <Button 
                          variant="link" 
                          size="sm" 
                          onClick={() => {
                            setSelectedContractor(contractor);
                            setActiveTab('employees');
                          }}
                        >
                          View Employees
                        </Button>
                      </td>
                      <td>
                        <div className="d-flex flex-wrap gap-1">
                          <Badge bg={contractor.documents.gst === 'Valid' ? 'success' : 'danger'}>GST</Badge>
                          <Badge bg={contractor.documents.pan === 'Valid' ? 'success' : 'warning'}>PAN</Badge>
                          <Badge bg={contractor.documents.insurance === 'Valid' ? 'success' : 'danger'}>Insurance</Badge>
                          <Badge bg={contractor.documents.safety === 'Valid' ? 'success' : 'warning'}>Safety</Badge>
                        </div>
                      </td>
                      <td>
                        <Badge bg={contractor.status === 'Active' ? 'success' : 'warning'}>
                          {contractor.status}
                        </Badge>
                      </td>
                      <td>
                        <div className="d-flex gap-1">
                          <Button 
                            variant="outline-primary" 
                            size="sm"
                            onClick={() => {
                              setSelectedContractor(contractor);
                              setShowEmployeeModal(true);
                            }}
                          >
                            <i className="feather icon-user-plus"></i>
                          </Button>
                          <Button variant="outline-secondary" size="sm">
                            <i className="feather icon-edit"></i>
                          </Button>
                          <Button variant="outline-info" size="sm">
                            <i className="feather icon-eye"></i>
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          )}

          {/* Employees Tab */}
          {activeTab === 'employees' && (
            <div>
              <div className="d-flex justify-content-between align-items-center mb-3">
                <div>
                  <h5 className="mb-0">
                    Employees {selectedContractor && `- ${selectedContractor.name}`}
                  </h5>
                  {selectedContractor && (
                    <Button 
                      variant="link" 
                      size="sm" 
                      onClick={() => setSelectedContractor(null)}
                    >
                      Show all employees
                    </Button>
                  )}
                </div>
                <div>
                  <Button 
                    style={{ backgroundColor: '#0E4C92', borderColor: '#0E4C92' }}
                    size="sm"
                    onClick={() => setShowEmployeeModal(true)}
                  >
                    <i className="feather icon-user-plus me-1"></i>Add Employee
                  </Button>
                </div>
              </div>

              <Table responsive>
                <thead>
                  <tr>
                    <th>Employee ID</th>
                    <th>Name</th>
                    <th>Contractor</th>
                    <th>Role</th>
                    <th>Medical Status</th>
                    <th>Induction</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {employees
                    .filter(emp => !selectedContractor || emp.contractor === selectedContractor.name)
                    .map((employee) => (
                    <tr key={employee.id}>
                      <td>{employee.id}</td>
                      <td>
                        <strong>{employee.name}</strong>
                      </td>
                      <td>{employee.contractor}</td>
                      <td>
                        <Badge bg="secondary">{employee.role}</Badge>
                      </td>
                      <td>
                        <Badge bg={employee.medical === 'Valid' ? 'success' : 'danger'}>
                          {employee.medical}
                        </Badge>
                      </td>
                      <td>
                        <Badge bg={employee.induction === 'Completed' ? 'success' : 'warning'}>
                          {employee.induction}
                        </Badge>
                      </td>
                      <td>
                        <Badge bg={employee.status === 'Active' ? 'success' : 'secondary'}>
                          {employee.status}
                        </Badge>
                      </td>
                      <td>
                        <div className="d-flex gap-1">
                          <Button 
                            variant="outline-info" 
                            size="sm"
                            onClick={() => {
                              setSelectedEmployee(employee);
                              setShowEmployeeProfile(true);
                            }}
                          >
                            <i className="feather icon-eye"></i>
                          </Button>
                          <Button variant="outline-secondary" size="sm">
                            <i className="feather icon-edit"></i>
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          )}
        </Card.Body>
      </Card>

      {/* Modals */}
      <ContractorOnboardingForm />
      <EmployeeOnboardingForm />
      <EmployeeProfile 
        show={showEmployeeProfile} 
        onHide={() => setShowEmployeeProfile(false)}
        employee={selectedEmployee}
      />
    </div>
  );
};

export default ContractorManagement;