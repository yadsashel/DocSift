import LegalLayout from "@/components/layout/LegalLayout";

const SOC2 = () => (
  <LegalLayout title="SOC 2 Type II Compliance Report" lastUpdated="January 15, 2026">
    <h2>Executive Summary</h2>
    <p>DocSift, Inc. has successfully completed its SOC 2 Type II examination for the period of January 1, 2025 through December 31, 2025. The examination was conducted by Schellman & Company, LLC, an independent CPA firm specializing in security and compliance assessments. The audit covered all five Trust Services Criteria: Security, Availability, Processing Integrity, Confidentiality, and Privacy.</p>
    <p>The examination resulted in an <strong>unqualified opinion</strong>, confirming that DocSift's controls were suitably designed and operating effectively throughout the audit period. No material exceptions were noted.</p>

    <h2>Scope of Examination</h2>
    <h3>Systems Covered</h3>
    <ul>
      <li>DocSift Contract Analysis Platform (SaaS application)</li>
      <li>AI/ML Processing Pipeline</li>
      <li>Document Storage and Management System (Document Vault)</li>
      <li>API Gateway and Developer Services</li>
      <li>Authentication and Identity Management System</li>
      <li>Internal corporate IT infrastructure supporting service delivery</li>
    </ul>
    <h3>Infrastructure</h3>
    <ul>
      <li>Primary: AWS US-East-1 (N. Virginia) with multi-AZ deployment</li>
      <li>Secondary: AWS EU-West-1 (Ireland) for EU data residency</li>
      <li>Disaster Recovery: AWS US-West-2 (Oregon)</li>
      <li>AI Processing: Google Cloud US-Central1</li>
    </ul>

    <h2>Trust Services Criteria Results</h2>

    <h3>1. Security (Common Criteria)</h3>
    <p><strong>Result: No Exceptions Noted</strong></p>
    <p>DocSift maintains comprehensive security controls to protect against unauthorized access, both physical and logical. Key controls include:</p>
    <ul>
      <li><strong>Access Control:</strong> Role-based access control (RBAC) enforced across all systems. Multi-factor authentication (MFA) required for all employee and privileged access. Quarterly access reviews conducted with documented remediation.</li>
      <li><strong>Network Security:</strong> Web Application Firewall (WAF) deployed on all public-facing endpoints. Network segmentation with private subnets for data processing. DDoS protection via AWS Shield Advanced. Intrusion Detection System (IDS) with real-time alerting.</li>
      <li><strong>Encryption:</strong> AES-256 encryption for all data at rest (including backups). TLS 1.3 for all data in transit. Hardware Security Modules (HSMs) for key management via AWS KMS.</li>
      <li><strong>Vulnerability Management:</strong> Quarterly penetration testing by NCC Group (independent third party). Automated vulnerability scanning (daily). Mean time to remediate critical vulnerabilities: 4.2 hours (target: 24 hours).</li>
      <li><strong>Security Monitoring:</strong> 24/7 Security Operations Center (SOC) with Datadog and custom SIEM. Anomaly detection with automated incident escalation. Mean time to detect (MTTD): 8 minutes. Mean time to respond (MTTR): 23 minutes.</li>
    </ul>

    <h3>2. Availability</h3>
    <p><strong>Result: No Exceptions Noted</strong></p>
    <ul>
      <li>Achieved 99.97% uptime during the audit period (target: 99.9%)</li>
      <li>Total downtime: 2 hours 37 minutes across 3 incidents</li>
      <li>Multi-region active-active architecture with automated failover</li>
      <li>Recovery Point Objective (RPO): 1 hour (achieved: 12 minutes avg.)</li>
      <li>Recovery Time Objective (RTO): 4 hours (achieved: 47 minutes avg.)</li>
      <li>Annual disaster recovery exercises conducted and documented (April 2025, October 2025)</li>
      <li>Auto-scaling infrastructure handles 10x normal traffic without degradation</li>
    </ul>

    <h3>3. Processing Integrity</h3>
    <p><strong>Result: No Exceptions Noted</strong></p>
    <ul>
      <li>Input validation enforced on all API endpoints and user interfaces</li>
      <li>AI model outputs undergo automated quality assurance checks</li>
      <li>Document processing pipeline includes integrity verification at each stage (upload → extraction → analysis → reporting)</li>
      <li>Error handling with automated retry logic and manual escalation procedures</li>
      <li>Audit logs maintained for all data processing activities with 12-month retention</li>
      <li>AI model accuracy benchmarked quarterly against labeled datasets (current accuracy: 99.7%)</li>
    </ul>

    <h3>4. Confidentiality</h3>
    <p><strong>Result: No Exceptions Noted</strong></p>
    <ul>
      <li>Confidential data classified and labeled according to DocSift's Data Classification Policy (Public, Internal, Confidential, Restricted)</li>
      <li>Customer document data classified as "Restricted" — highest protection level</li>
      <li>Logical data isolation between tenants enforced at the application and database layers</li>
      <li>All employees complete annual security awareness training (100% completion rate in 2025)</li>
      <li>Background checks conducted on all employees with access to customer data</li>
      <li>Non-disclosure agreements executed with all employees, contractors, and sub-processors</li>
      <li>Customer data is never used for model training or any purpose beyond service delivery</li>
    </ul>

    <h3>5. Privacy</h3>
    <p><strong>Result: No Exceptions Noted</strong></p>
    <ul>
      <li>Privacy policy publicly available and updated regularly (last update: February 1, 2026)</li>
      <li>Data Processing Agreement (DPA) offered to all customers, incorporating Standard Contractual Clauses for international transfers</li>
      <li>Data Subject Access Requests (DSARs) processed within 15 business days (regulatory requirement: 30 days)</li>
      <li>Data retention and deletion procedures documented and automated</li>
      <li>Privacy Impact Assessments conducted for all new features involving personal data processing</li>
      <li>Designated Data Protection Officer (DPO) appointed</li>
      <li>Cookie consent mechanism implemented with granular opt-in/opt-out controls</li>
    </ul>

    <h2>Organizational Controls</h2>
    <h3>Governance</h3>
    <ul>
      <li>Information Security Committee meets monthly to review security posture, incidents, and policy updates</li>
      <li>Board of Directors receives quarterly security briefings</li>
      <li>Risk assessment conducted annually with quarterly reviews</li>
      <li>Security policies reviewed and approved annually by CISO and CEO</li>
    </ul>
    <h3>Human Resources</h3>
    <ul>
      <li>Security-focused onboarding for all new employees</li>
      <li>Annual security awareness training with phishing simulations (click rate: 1.2%, industry avg: 4.7%)</li>
      <li>Defined termination procedures including immediate access revocation</li>
    </ul>

    <h2>Incident Summary (Audit Period)</h2>
    <table>
      <thead><tr><th>Date</th><th>Description</th><th>Duration</th><th>Impact</th><th>Root Cause</th></tr></thead>
      <tbody>
        <tr><td>Mar 15, 2025</td><td>Elevated API latency</td><td>47 min</td><td>Minor (API p95 latency &gt;500ms)</td><td>Database connection pool exhaustion during traffic spike</td></tr>
        <tr><td>Jul 22, 2025</td><td>Document processing delay</td><td>1h 12min</td><td>Moderate (processing queue backlog)</td><td>ML model deployment rollback required</td></tr>
        <tr><td>Nov 8, 2025</td><td>Authentication service disruption</td><td>38 min</td><td>Minor (login delays)</td><td>Third-party identity provider outage</td></tr>
      </tbody>
    </table>
    <p>No security breaches or unauthorized data access incidents occurred during the audit period.</p>

    <h2>Auditor Information</h2>
    <ul>
      <li><strong>Auditing Firm:</strong> Schellman & Company, LLC</li>
      <li><strong>Lead Auditor:</strong> James Richardson, CISA, CISSP</li>
      <li><strong>Audit Period:</strong> January 1, 2025 — December 31, 2025</li>
      <li><strong>Report Date:</strong> January 15, 2026</li>
      <li><strong>Opinion:</strong> Unqualified (clean opinion)</li>
    </ul>

    <h2>Requesting the Full Report</h2>
    <p>The complete SOC 2 Type II report is available under NDA to current and prospective customers. To request a copy, please contact docsift.official@gmail.com or reach out to your account manager. We typically respond to report requests within 2 business days.</p>
  </LegalLayout>
);

export default SOC2;
