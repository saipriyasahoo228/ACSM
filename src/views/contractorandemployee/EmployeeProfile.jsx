import React from 'react';
import { Modal, Row, Col, Card, Button, Badge, Table } from 'react-bootstrap';

const EmployeeProfile = ({ show, onHide, employee }) => {
  if (!employee) return null;

  const calculateDaysLeft = (date) => {
    const targetDate = new Date(date);
    const today = new Date();
    const diffTime = targetDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const daysLeft = calculateDaysLeft(employee.ppeRenewal);

  return (
    <Modal show={show} onHide={onHide} size="xl" centered>
      <Modal.Header closeButton>
        <Modal.Title>
          Employee Profile - {employee.name} ({employee.id})
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {/* Profile Header */}
        <Card className="mb-4">
          <Card.Body>
            <Row>
              <Col md={3}>
                <div className="text-center">
                  <div 
                    className="bg-light rounded d-flex align-items-center justify-content-center mx-auto mb-3"
                    style={{ width: '120px', height: '120px' }}
                  >
                    <i className="feather icon-user text-muted" style={{ fontSize: '3rem' }}></i>
                  </div>
                  <h5 className="mb-1">{employee.name}</h5>
                  <p className="text-muted mb-0">{employee.id}</p>
                  <p className="text-muted">{employee.contractor}</p>
                </div>
              </Col>
              
              <Col md={9}>
                <Row>
                  <Col md={4}>
                    <Card className="h-100 text-center">
                      <Card.Body>
                        <h6 className="text-muted">Status</h6>
                        <Badge bg="success" className="mb-2">{employee.status}</Badge>
                        <div className="small">
                          <Badge bg={employee.medical === 'Valid' ? 'success' : 'danger'} className="me-1">
                            Medical {employee.medical}
                          </Badge>
                          <Badge bg={employee.induction === 'Completed' ? 'success' : 'warning'}>
                            Induction {employee.induction}
                          </Badge>
                        </div>
                      </Card.Body>
                    </Card>
                  </Col>
                  
                  <Col md={4}>
                    <Card className="h-100 text-center">
                      <Card.Body>
                        <h6 className="text-muted">Next Action</h6>
                        <h5 className="text-warning">PPE Renewal</h5>
                        <p className="mb-0">
                          <Badge bg={daysLeft <= 7 ? "danger" : daysLeft <= 30 ? "warning" : "success"}>
                            in {daysLeft} days
                          </Badge>
                        </p>
                      </Card.Body>
                    </Card>
                  </Col>
                  
                  <Col md={4}>
                    <Card className="h-100">
                      <Card.Body>
                        <h6 className="text-muted">Details</h6>
                        <p className="mb-1">
                          <strong>Role:</strong> {employee.role}
                        </p>
                        <p className="mb-1">
                          <strong>Aadhaar:</strong> {employee.aadhaar}
                        </p>
                        <p className="mb-0">
                          <strong>DOI:</strong> {employee.doi}
                        </p>
                      </Card.Body>
                    </Card>
                  </Col>
                </Row>
                
                {/* Quick Links */}
                <Row className="mt-3">
                  <Col>
                    <div className="d-flex gap-2 flex-wrap">
                      <Button variant="outline-primary" size="sm">
                        <i className="feather icon-book me-1"></i>View Training History
                      </Button>
                      <Button variant="outline-primary" size="sm">
                        <i className="feather icon-shield me-1"></i>View PPE History
                      </Button>
                      <Button variant="outline-primary" size="sm">
                        <i className="feather icon-clock me-1"></i>View Timesheets
                      </Button>
                      <Button variant="outline-primary" size="sm">
                        <i className="feather icon-file-text me-1"></i>View Documents
                      </Button>
                    </div>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Card.Body>
        </Card>

        {/* Additional Profile Sections */}
        <Row>
          <Col md={6}>
            <Card>
              <Card.Header>
                <h6 className="mb-0">Medical Information</h6>
              </Card.Header>
              <Card.Body>
                <Table size="sm" className="mb-0">
                  <tbody>
                    <tr>
                      <td><strong>Medical Status:</strong></td>
                      <td>
                        <Badge bg={employee.medical === 'Valid' ? 'success' : 'danger'}>
                          {employee.medical}
                        </Badge>
                      </td>
                    </tr>
                    <tr>
                      <td><strong>Last Medical Check:</strong></td>
                      <td>2024-01-15</td>
                    </tr>
                    <tr>
                      <td><strong>Next Check Due:</strong></td>
                      <td>2025-01-15</td>
                    </tr>
                    <tr>
                      <td><strong>Blood Group:</strong></td>
                      <td>B+</td>
                    </tr>
                  </tbody>
                </Table>
              </Card.Body>
            </Card>
          </Col>
          
          <Col md={6}>
            <Card>
              <Card.Header>
                <h6 className="mb-0">Safety Equipment</h6>
              </Card.Header>
              <Card.Body>
                <Table size="sm" className="mb-0">
                  <tbody>
                    <tr>
                      <td><strong>PPE Status:</strong></td>
                      <td>
                        <Badge bg={daysLeft > 30 ? 'success' : daysLeft > 7 ? 'warning' : 'danger'}>
                          {daysLeft > 0 ? `Expires in ${daysLeft} days` : 'Expired'}
                        </Badge>
                      </td>
                    </tr>
                    <tr>
                      <td><strong>Last Issued:</strong></td>
                      <td>2024-03-01</td>
                    </tr>
                    <tr>
                      <td><strong>Next Renewal:</strong></td>
                      <td>{employee.ppeRenewal}</td>
                    </tr>
                    <tr>
                      <td><strong>PPE Kit Type:</strong></td>
                      <td>Standard Welding Kit</td>
                    </tr>
                  </tbody>
                </Table>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Contact Information */}
        <Row className="mt-4">
          <Col md={6}>
            <Card>
              <Card.Header>
                <h6 className="mb-0">Contact Information</h6>
              </Card.Header>
              <Card.Body>
                <Table size="sm" className="mb-0">
                  <tbody>
                    <tr>
                      <td><strong>Phone:</strong></td>
                      <td>+91 98765 43210</td>
                    </tr>
                    <tr>
                      <td><strong>Emergency Contact:</strong></td>
                      <td>+91 98765 43211 (Spouse)</td>
                    </tr>
                    <tr>
                      <td><strong>Address:</strong></td>
                      <td>123 Worker Colony, Industrial Area, Mumbai</td>
                    </tr>
                  </tbody>
                </Table>
              </Card.Body>
            </Card>
          </Col>
          
          <Col md={6}>
            <Card>
              <Card.Header>
                <h6 className="mb-0">Employment Details</h6>
              </Card.Header>
              <Card.Body>
                <Table size="sm" className="mb-0">
                  <tbody>
                    <tr>
                      <td><strong>Employee ID:</strong></td>
                      <td>{employee.id}</td>
                    </tr>
                    <tr>
                      <td><strong>Date of Joining:</strong></td>
                      <td>{employee.doi}</td>
                    </tr>
                    <tr>
                      <td><strong>Contractor:</strong></td>
                      <td>{employee.contractor}</td>
                    </tr>
                    <tr>
                      <td><strong>Work Location:</strong></td>
                      <td>Main Plant - Section A</td>
                    </tr>
                  </tbody>
                </Table>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Close
        </Button>
        <Button 
          style={{ backgroundColor: '#0E4C92', borderColor: '#0E4C92' }}
          onClick={() => {
            // Add edit functionality here
            console.log('Edit employee:', employee);
          }}
        >
          <i className="feather icon-edit me-1"></i>Edit Profile
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EmployeeProfile;