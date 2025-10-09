

import React from 'react';
import { Row, Col, Card, Table} from 'react-bootstrap';
//import { Link } from 'react-router-dom';

const DashDefault = () => {
  // Color theme based on #0E4C92
  const colors = {
    primary: '#0E4C92',
    primaryLight: '#3A7BD5',
    primaryDark: '#0A3A6E',
    secondary: '#FF6B35',
    success: '#28A745',
    warning: '#FFC107',
    danger: '#DC3545',
    info: '#17A2B8',
    gray: '#6C757D',
    lightGray: '#F8F9FA',
    darkGray: '#343A40',
    cardBg: '#FFFDE7'
  };

  // Safety Metrics with icons
  const safetyMetrics = [
    { 
      title: 'Total Contractors', 
      value: '15',
      icon: 'feather icon-users',
      color: colors.primary,
      progress: 100
    },
    { 
      title: 'Open CAP Items', 
      value: '12',
      icon: 'feather icon-alert-triangle',
      color: colors.danger,
      progress: 80
    },
    { 
      title: 'Avg Safety Score', 
      value: '82%',
      icon: 'feather icon-award',
      color: colors.success,
      progress: 82
    },
    { 
      title: 'Training Compliance', 
      value: '91%',
      icon: 'feather icon-check-circle',
      color: colors.info,
      progress: 91
    }
  ];

  // Audit Data
  const auditData = [
    { contractor: 'Shakti Engg.', lastAudit: '20 Aug', score: 75, trend: 'up' },
    { contractor: 'XYZ Contractors', lastAudit: '18 Aug', score: 90, trend: 'up' },
    { contractor: 'Alpha Services', lastAudit: '12 Aug', score: 68, trend: 'down' }
  ];

  // CAP Tracker Data
  const capData = [
    { action: 'Replace helmets', status: 'open', icon: 'feather icon-hard-drive' },
    { action: 'Retrain workers', status: 'progress', icon: 'feather icon-users' },
    { action: 'Fire extinguisher', status: 'overdue', icon: 'feather icon-alert-octagon' }
  ];

  // Alerts Data
  const alertsData = [
    { 
      contractor: 'Shakti Engg', 
      message: '2 CAP Items overdue (due 28 Aug)', 
      type: 'danger',
      icon: 'feather icon-alert-circle',
      time: '2 hours ago'
    },
    { 
      contractor: 'XYZ Contractors', 
      message: 'Training compliance dropped to 62%', 
      type: 'warning',
      icon: 'feather icon-trending-down',
      time: '5 hours ago'
    },
    { 
      contractor: 'Alpha Services', 
      message: 'No incidents in 90 days', 
      type: 'success',
      icon: 'feather icon-check-circle',
      time: '1 day ago'
    }
  ];

  // PPE Renewal Data
  const ppeRenewalData = [
    { 
      item: 'Safety Helmets', 
      contractor: 'Shakti Engg.', 
      workers: 24, 
      dueDate: '15 Oct 2024',
      daysLeft: 22,
      status: 'warning',
      icon: 'feather icon-shield'
    },
    { 
      item: 'Safety Shoes', 
      contractor: 'XYZ Contractors', 
      workers: 18, 
      dueDate: '28 Sep 2024',
      daysLeft: 5,
      status: 'danger',
      icon: 'feather icon-shoe'
    },
    { 
      item: 'High-Vis Vests', 
      contractor: 'Alpha Services', 
      workers: 12, 
      dueDate: '10 Nov 2024',
      daysLeft: 48,
      status: 'info',
      icon: 'feather icon-feather'
    },
    { 
      item: 'Safety Gloves', 
      contractor: 'Beta Solutions', 
      workers: 8, 
      dueDate: '05 Oct 2024',
      daysLeft: 12,
      status: 'warning',
      icon: 'feather icon-hand'
    }
  ];

  // KPI Chart Data
  const kpiData = [
    { month: 'Jan', value: 100, color: colors.primary },
    { month: 'Feb', value: 80, color: colors.primaryLight },
    { month: 'Mar', value: 60, color: colors.info },
    { month: 'Apr', value: 30, color: colors.warning },
    { month: 'May', value: 0, color: colors.lightGray },
    { month: 'Jun', value: 75, color: colors.success },
    { month: 'Jul', value: 90, color: colors.primary }
  ];

  return (
    <React.Fragment>
      <Row>
        {/* Safety Metrics Cards */}
        {safetyMetrics.map((metric, index) => (
          <Col key={index} xl={3} md={6} className="mb-4">
            <Card className="border-0 shadow-sm" style={{ background: colors.cardBg }}>
              <Card.Body>
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <h6 className="text-muted mb-2" style={{ fontSize: '14px' }}>{metric.title}</h6>
                    <h3 className="mb-0" style={{ color: metric.color, fontWeight: '600' }}>{metric.value}</h3>
                  </div>
                  <div 
                    className="rounded-circle d-flex align-items-center justify-content-center"
                    style={{ 
                      width: '50px', 
                      height: '50px', 
                      background: `${metric.color}15`
                    }}
                  >
                    <i className={`${metric.icon}`} style={{ color: metric.color, fontSize: '20px' }} />
                  </div>
                </div>
                <div className="progress mt-3" style={{ height: '4px' }}>
                  <div 
                    className="progress-bar" 
                    style={{ 
                      width: `${metric.progress}%`, 
                      background: metric.color
                    }} 
                  />
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}

        {/* Internal Audit Status */}
        <Col md={6} className="mb-4">
          <Card className="border-0 shadow-sm" >
            <Card.Header 
              className="border-0 text-white" 
              style={{ background: colors.primary, fontSize: '16px', fontWeight: '600' }}
            >
              <div className="d-flex align-items-center">
                <i className="feather icon-clipboard me-2" />
                Internal Audit Status
              </div>
            </Card.Header>
            <Card.Body className="p-0" >
              <Table responsive className="mb-0" >
                <thead style={{ background: colors.lightGray }}>
                  <tr>
                    <th style={{ padding: '15px', color: colors.darkGray, fontWeight: '600' }}>Contractor</th>
                    <th style={{ padding: '15px', color: colors.darkGray, fontWeight: '600' }}>Last Audit</th>
                    <th style={{ padding: '15px', color: colors.darkGray, fontWeight: '600' }}>Score</th>
                  </tr>
                </thead>
                <tbody>
                  {auditData.map((audit, index) => (
                    <tr key={index}>
                      <td style={{ padding: '15px', fontWeight: '500' }}>
                        <div className="d-flex align-items-center">
                          <i className="feather icon-briefcase me-2" style={{ color: colors.primary }} />
                          {audit.contractor}
                        </div>
                      </td>
                      <td style={{ padding: '15px', color: colors.gray }}>{audit.lastAudit}</td>
                      <td style={{ padding: '15px' }}>
                        <div className="d-flex align-items-center">
                          <span 
                            className="badge me-2"
                            style={{ 
                              background: audit.score >= 80 ? colors.success : audit.score >= 70 ? colors.warning : colors.danger,
                              color: 'white',
                              padding: '5px 10px'
                            }}
                          >
                            {audit.score}%
                          </span>
                          <i 
                            className={`feather icon-trending-${audit.trend}`} 
                            style={{ 
                              color: audit.trend === 'up' ? colors.success : colors.danger 
                            }} 
                          />
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>

        {/* Monitoring Dashboard */}
        <Col md={6} className="mb-4">
          <Card className="border-0 shadow-sm" >
            <Card.Header 
              className="border-0 text-white" 
              style={{ background: colors.primary, fontSize: '16px', fontWeight: '600' }}
            >
              <div className="d-flex align-items-center">
                <i className="feather icon-bar-chart-2 me-2" />
                Monitoring Dashboard
              </div>
            </Card.Header>
            <Card.Body>
              <div style={{ height: '200px', position: 'relative' }}>
                {/* Y-axis labels */}
                <div style={{ position: 'absolute', left: '0', top: '0', height: '100%', width: '30px' }}>
                  {[100, 80, 60, 30, 0].map((value, index) => (
                    <div 
                      key={index}
                      style={{ 
                        position: 'absolute', 
                        top: `${100 - value}%`, 
                        right: '5px', 
                        color: colors.gray, 
                        fontSize: '12px',
                        transform: 'translateY(-50%)'
                      }}
                    >
                      {value}
                    </div>
                  ))}
                </div>
                
                {/* Chart bars */}
                <div style={{ marginLeft: '40px', height: '100%', display: 'flex', alignItems: 'end', gap: '12px' }}>
                  {kpiData.map((kpi, index) => (
                    <div key={index} style={{ flex: 1, textAlign: 'center' }}>
                      <div
                        style={{
                          height: `${kpi.value}%`,
                          background: kpi.color,
                          borderRadius: '4px 4px 0 0',
                          minHeight: '5px',
                          transition: 'all 0.3s ease',
                          position: 'relative'
                        }}
                        className="chart-bar"
                      >
                        <div 
                          style={{
                            position: 'absolute',
                            top: '-25px',
                            left: '50%',
                            transform: 'translateX(-50%)',
                            background: colors.darkGray,
                            color: 'white',
                            padding: '2px 6px',
                            borderRadius: '3px',
                            fontSize: '11px',
                            opacity: 0,
                            transition: 'opacity 0.3s ease'
                          }}
                          className="chart-value"
                        >
                          {kpi.value}
                        </div>
                      </div>
                      <div style={{ color: colors.gray, fontSize: '12px', marginTop: '8px', fontWeight: '500' }}>
                        {kpi.month}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>

        {/* CAP Tracker */}
        <Col md={6} className="mb-4">
          <Card className="border-0 shadow-sm">
            <Card.Header 
              className="border-0 text-white" 
              style={{ background: colors.primary, fontSize: '16px', fontWeight: '600' }}
            >
              <div className="d-flex align-items-center">
                <i className="feather icon-check-square me-2" />
                CAP Tracker
              </div>
            </Card.Header>
            <Card.Body className="p-0">
              <Table responsive className="mb-0">
                <thead style={{ background: colors.lightGray }}>
                  <tr>
                    <th style={{ padding: '15px', color: colors.darkGray, fontWeight: '600' }}>Action</th>
                    <th style={{ padding: '15px', color: colors.darkGray, fontWeight: '600', textAlign: 'center' }}>Open</th>
                    <th style={{ padding: '15px', color: colors.darkGray, fontWeight: '600', textAlign: 'center' }}>In Progress</th>
                    <th style={{ padding: '15px', color: colors.darkGray, fontWeight: '600', textAlign: 'center' }}>Overdue</th>
                    <th style={{ padding: '15px', color: colors.darkGray, fontWeight: '600', textAlign: 'center' }}>Closed</th>
                  </tr>
                </thead>
                <tbody>
                  {capData.map((cap, index) => (
                    <tr key={index}>
                      <td style={{ padding: '15px', fontWeight: '500' }}>
                        <div className="d-flex align-items-center">
                          <i className={`${cap.icon} me-2`} style={{ color: colors.primary }} />
                          {cap.action}
                        </div>
                      </td>
                      <td style={{ padding: '15px', textAlign: 'center' }}>
                        {cap.status === 'open' && <i className="feather icon-circle" style={{ color: colors.primary, fontSize: '16px' }} />}
                      </td>
                      <td style={{ padding: '15px', textAlign: 'center' }}>
                        {cap.status === 'progress' && <i className="feather icon-clock" style={{ color: colors.warning, fontSize: '16px' }} />}
                      </td>
                      <td style={{ padding: '15px', textAlign: 'center' }}>
                        {cap.status === 'overdue' && <i className="feather icon-alert-octagon" style={{ color: colors.danger, fontSize: '16px' }} />}
                      </td>
                      <td style={{ padding: '15px', textAlign: 'center' }}>
                        {cap.status === 'closed' && <i className="feather icon-check" style={{ color: colors.success, fontSize: '16px' }} />}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>

        {/* Alerts & Notifications */}
        <Col md={6} className="mb-4">
          <Card className="border-0 shadow-sm">
            <Card.Header 
              className="border-0 text-white" 
              style={{ background: colors.primary, fontSize: '16px', fontWeight: '600' }}
            >
              <div className="d-flex align-items-center">
                <i className="feather icon-bell me-2" />
                Alerts & Notifications
              </div>
            </Card.Header>
            <Card.Body>
              {alertsData.map((alert, index) => (
                <div 
                  key={index}
                  className="d-flex align-items-start p-3 mb-3 rounded"
                  style={{ 
                    background: `${alert.type === 'danger' ? colors.danger : alert.type === 'warning' ? colors.warning : colors.success}15`,
                    borderLeft: `4px solid ${alert.type === 'danger' ? colors.danger : alert.type === 'warning' ? colors.warning : colors.success}`
                  }}
                >
                  <i className={`${alert.icon} me-3 mt-1`} style={{ 
                    color: alert.type === 'danger' ? colors.danger : alert.type === 'warning' ? colors.warning : colors.success 
                  }} />
                  <div className="flex-grow-1">
                    <div className="d-flex justify-content-between align-items-start">
                      <strong style={{ color: colors.darkGray }}>{alert.contractor}</strong>
                      <small style={{ color: colors.gray }}>{alert.time}</small>
                    </div>
                    <p className="mb-0" style={{ color: colors.gray, fontSize: '14px' }}>
                      {alert.message}
                    </p>
                  </div>
                </div>
              ))}
            </Card.Body>
          </Card>
        </Col>

        {/* Upcoming PPE Renewal Notification */}
        <Col md={6} className="mb-4">
          <Card className="border-0 shadow-sm">
            <Card.Header 
              className="border-0 text-white" 
              style={{ background: colors.warning, fontSize: '16px', fontWeight: '600' }}
            >
              <div className="d-flex align-items-center">
                <i className="feather icon-alert-octagon me-2" />
                Upcoming PPE Renewal Notification
              </div>
            </Card.Header>
            <Card.Body className="p-0">
              <Table responsive className="mb-0">
                <thead style={{ background: '#FFF3CD' }}>
                  <tr>
                    <th style={{ padding: '12px 15px', color: colors.darkGray, fontWeight: '600' }}>PPE Item</th>
                    <th style={{ padding: '12px 15px', color: colors.darkGray, fontWeight: '600' }}>Contractor</th>
                    <th style={{ padding: '12px 15px', color: colors.darkGray, fontWeight: '600' }}>Workers</th>
                    <th style={{ padding: '12px 15px', color: colors.darkGray, fontWeight: '600' }}>Due Date</th>
                    <th style={{ padding: '12px 15px', color: colors.darkGray, fontWeight: '600' }}>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {ppeRenewalData.map((ppe, index) => (
                    <tr key={index}>
                      <td style={{ padding: '12px 15px', fontWeight: '500' }}>
                        <div className="d-flex align-items-center">
                          <i className={`${ppe.icon} me-2`} style={{ color: colors.warning }} />
                          {ppe.item}
                        </div>
                      </td>
                      <td style={{ padding: '12px 15px', color: colors.gray }}>{ppe.contractor}</td>
                      <td style={{ padding: '12px 15px', fontWeight: '500' }}>{ppe.workers}</td>
                      <td style={{ padding: '12px 15px', color: colors.gray }}>{ppe.dueDate}</td>
                      <td style={{ padding: '12px 15px' }}>
                        <span 
                          className="badge"
                          style={{ 
                            background: ppe.status === 'danger' ? colors.danger : 
                                      ppe.status === 'warning' ? colors.warning : colors.info,
                            color: 'white',
                            padding: '4px 8px',
                            fontSize: '11px'
                          }}
                        >
                          {ppe.daysLeft} days left
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>

        {/* Recent Safety Activities */}
        <Col md={6} className="mb-4">
          <Card className="border-0 shadow-sm">
            <Card.Header 
              className="border-0 text-white" 
              style={{ background: colors.info, fontSize: '16px', fontWeight: '600' }}
            >
              <div className="d-flex align-items-center">
                <i className="feather icon-activity me-2" />
                Recent Safety Activities
              </div>
            </Card.Header>
            <Card.Body>
              <div className="timeline">
                <div className="timeline-item mb-3">
                  <div className="d-flex">
                    <div className="timeline-badge" style={{ background: colors.success }}></div>
                    <div className="flex-grow-1 ms-3">
                      <div className="d-flex justify-content-between">
                        <strong style={{ color: colors.darkGray }}>PTW Approved</strong>
                        <small style={{ color: colors.gray }}>2 hours ago</small>
                      </div>
                      <p className="mb-0" style={{ color: colors.gray, fontSize: '14px' }}>
                        Electrical work - Shakti Engg.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="timeline-item mb-3">
                  <div className="d-flex">
                    <div className="timeline-badge" style={{ background: colors.warning }}></div>
                    <div className="flex-grow-1 ms-3">
                      <div className="d-flex justify-content-between">
                        <strong style={{ color: colors.darkGray }}>Near Miss Reported</strong>
                        <small style={{ color: colors.gray }}>5 hours ago</small>
                      </div>
                      <p className="mb-0" style={{ color: colors.gray, fontSize: '14px' }}>
                        Site A - XYZ Contractors
                      </p>
                    </div>
                  </div>
                </div>
                <div className="timeline-item">
                  <div className="d-flex">
                    <div className="timeline-badge" style={{ background: colors.info }}></div>
                    <div className="flex-grow-1 ms-3">
                      <div className="d-flex justify-content-between">
                        <strong style={{ color: colors.darkGray }}>Safety Audit Completed</strong>
                        <small style={{ color: colors.gray }}>1 day ago</small>
                      </div>
                      <p className="mb-0" style={{ color: colors.gray, fontSize: '14px' }}>
                        Alpha Services - Final report
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Custom Styles */}
      <style jsx>{`
        .chart-bar:hover {
          transform: scaleY(1.05);
        }
        .chart-bar:hover .chart-value {
          opacity: 1;
        }
        .card {
          transition: transform 0.2s ease;
        }
        .card:hover {
          transform: translateY(-2px);
        }
        .timeline-badge {
          width: 12px;
          height: 12px;
          border-radius: 50%;
          flex-shrink: 0;
          margin-top: 5px;
        }
        .timeline-item {
          position: relative;
        }
        .timeline-item:not(:last-child):after {
          content: '';
          position: absolute;
          left: 5px;
          top: 20px;
          bottom: -20px;
          width: 2px;
          background: #e9ecef;
        }
      `}</style>
    </React.Fragment>
  );
};

export default DashDefault;