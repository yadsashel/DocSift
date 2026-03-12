import LegalLayout from "@/components/layout/LegalLayout";

const DPA = () => (
  <LegalLayout title="Data Processing Agreement" lastUpdated="February 1, 2026">
    <h2>1. Scope and Purpose</h2>
    <p>This Data Processing Agreement ("DPA") forms part of the Agreement between DocSift, Inc. ("Processor") and the entity subscribing to DocSift's Services ("Controller") and governs the processing of personal data by Processor on behalf of Controller in connection with the provision of the Services. This DPA is entered into pursuant to Article 28 of the General Data Protection Regulation (EU) 2016/679 ("GDPR") and applicable data protection legislation worldwide.</p>

    <h2>2. Definitions</h2>
    <ul>
      <li><strong>"Personal Data"</strong> means any information relating to an identified or identifiable natural person that is processed by DocSift in the course of providing the Services.</li>
      <li><strong>"Processing"</strong> means any operation performed on Personal Data, including collection, recording, organization, structuring, storage, adaptation, retrieval, consultation, use, disclosure, combination, restriction, erasure, or destruction.</li>
      <li><strong>"Data Subject"</strong> means the identified or identifiable natural person to whom the Personal Data relates.</li>
      <li><strong>"Sub-processor"</strong> means any third party engaged by DocSift to process Personal Data on behalf of the Controller.</li>
    </ul>

    <h2>3. Data Processing Details</h2>
    <table>
      <thead><tr><th>Category</th><th>Details</th></tr></thead>
      <tbody>
        <tr><td>Subject matter</td><td>Provision of AI-powered contract analysis and compliance auditing services</td></tr>
        <tr><td>Duration</td><td>For the term of the Agreement plus data retention period</td></tr>
        <tr><td>Nature and purpose</td><td>Document analysis, risk detection, compliance monitoring, and reporting</td></tr>
        <tr><td>Types of Personal Data</td><td>Names, contact information, signatures, and any personal data contained within uploaded contracts</td></tr>
        <tr><td>Categories of Data Subjects</td><td>Controller's employees, contractors, clients, vendors, and other parties referenced in uploaded contracts</td></tr>
      </tbody>
    </table>

    <h2>4. Processor Obligations</h2>
    <p>DocSift shall:</p>
    <ul>
      <li>Process Personal Data only on documented instructions from the Controller, unless required by applicable law</li>
      <li>Ensure that all personnel authorized to process Personal Data are bound by confidentiality obligations</li>
      <li>Implement and maintain appropriate technical and organizational measures to ensure a level of security appropriate to the risk, including AES-256 encryption, access controls, and regular security assessments</li>
      <li>Not engage any Sub-processor without prior written authorization from the Controller (see Section 6)</li>
      <li>Assist the Controller in fulfilling its obligations to respond to Data Subject requests</li>
      <li>Make available all information necessary to demonstrate compliance and allow for audits</li>
      <li>Notify the Controller without undue delay (and in any case within 72 hours) upon becoming aware of a Personal Data breach</li>
      <li>At the Controller's choice, delete or return all Personal Data upon termination of the Services</li>
    </ul>

    <h2>5. Controller Obligations</h2>
    <p>The Controller shall:</p>
    <ul>
      <li>Ensure it has a lawful basis for the processing of Personal Data under applicable data protection laws</li>
      <li>Provide documented processing instructions to DocSift</li>
      <li>Ensure that individuals whose Personal Data is contained in uploaded documents have been appropriately notified</li>
      <li>Conduct Data Protection Impact Assessments where required under applicable law</li>
    </ul>

    <h2>6. Sub-processors</h2>
    <p>DocSift currently uses the following Sub-processors:</p>
    <table>
      <thead><tr><th>Sub-processor</th><th>Purpose</th><th>Location</th></tr></thead>
      <tbody>
        <tr><td>Amazon Web Services (AWS)</td><td>Cloud infrastructure and data storage</td><td>US, EU (Frankfurt), APAC (Singapore)</td></tr>
        <tr><td>Google Cloud Platform</td><td>AI/ML processing pipeline</td><td>US, EU (Netherlands)</td></tr>
        <tr><td>Stripe, Inc.</td><td>Payment processing</td><td>United States</td></tr>
        <tr><td>Datadog, Inc.</td><td>Infrastructure monitoring</td><td>United States</td></tr>
        <tr><td>SendGrid (Twilio)</td><td>Transactional email delivery</td><td>United States</td></tr>
      </tbody>
    </table>
    <p>DocSift shall notify the Controller of any intended changes to the list of Sub-processors at least 30 days in advance, providing the Controller with an opportunity to object. If the Controller objects on reasonable grounds, DocSift shall work in good faith to find an alternative solution.</p>

    <h2>7. International Transfers</h2>
    <p>Where Personal Data is transferred outside the European Economic Area (EEA), United Kingdom, or Switzerland, DocSift ensures appropriate safeguards are in place, including:</p>
    <ul>
      <li>Standard Contractual Clauses (SCCs) as approved by the European Commission (Module 2: Controller to Processor)</li>
      <li>Supplementary measures including encryption, pseudonymization, and access controls</li>
      <li>Data residency options for Enterprise customers (EU-only processing available upon request)</li>
    </ul>

    <h2>8. Security Measures</h2>
    <p>DocSift implements comprehensive security measures including:</p>
    <ul>
      <li>AES-256 encryption at rest for all stored data</li>
      <li>TLS 1.3 encryption for all data in transit</li>
      <li>Multi-factor authentication for all employee access</li>
      <li>Role-based access control (RBAC) with least-privilege principles</li>
      <li>Regular penetration testing by independent third parties (quarterly)</li>
      <li>SOC 2 Type II certification (annual audit)</li>
      <li>24/7 Security Operations Center (SOC) monitoring</li>
      <li>Incident response plan with designated response team</li>
      <li>Business continuity and disaster recovery procedures (RPO: 1 hour, RTO: 4 hours)</li>
    </ul>

    <h2>9. Data Breach Notification</h2>
    <p>In the event of a Personal Data breach, DocSift shall:</p>
    <ul>
      <li>Notify the Controller within 72 hours of becoming aware of the breach</li>
      <li>Provide details including the nature of the breach, categories and approximate number of Data Subjects affected, likely consequences, and measures taken or proposed to address the breach</li>
      <li>Cooperate with the Controller in investigating and mitigating the breach</li>
      <li>Document all breaches in accordance with Article 33(5) GDPR</li>
    </ul>

    <h2>10. Audits</h2>
    <p>Upon reasonable request and subject to appropriate confidentiality obligations, DocSift shall make available information necessary to demonstrate compliance with this DPA and allow for audits, including inspections, conducted by the Controller or an independent auditor mandated by the Controller. Audits may be conducted no more than once annually unless required by a supervisory authority or in response to a data breach.</p>

    <h2>11. Term and Termination</h2>
    <p>This DPA shall remain in effect for the duration of the Agreement. Upon termination, DocSift shall, at the Controller's election, securely delete or return all Personal Data within 90 days, and certify such deletion in writing. DocSift may retain copies of Personal Data to the extent required by applicable law, provided such data remains subject to the protections of this DPA.</p>

    <h2>12. Contact</h2>
    <p>For questions regarding this DPA or to exercise rights under this agreement: docsift.official@gmail.com</p>
  </LegalLayout>
);

export default DPA;
