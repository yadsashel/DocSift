import LegalLayout from "@/components/layout/LegalLayout";

const Privacy = () => (
  <LegalLayout title="Privacy Policy" lastUpdated="February 1, 2026">
    <h2>1. Introduction</h2>
    <p>DocSift, Inc. ("DocSift," "we," "our," or "us") is committed to protecting the privacy and security of our users' personal information. This Privacy Policy describes how we collect, use, disclose, and safeguard your information when you use our contract analysis platform, website, and related services (collectively, the "Services").</p>
    <p>By accessing or using our Services, you acknowledge that you have read, understood, and agree to be bound by this Privacy Policy. If you do not agree with the terms of this Privacy Policy, please do not access or use our Services.</p>

    <h2>2. Information We Collect</h2>
    <h3>2.1 Information You Provide Directly</h3>
    <ul>
      <li><strong>Account Registration Data:</strong> Name, email address, company name, job title, phone number, and billing information when you create an account.</li>
      <li><strong>Contract Documents:</strong> Documents you upload to our platform for analysis, including contracts, agreements, and related attachments.</li>
      <li><strong>Communications:</strong> Information you provide when contacting our support team, participating in surveys, or providing feedback.</li>
      <li><strong>Payment Information:</strong> Credit card numbers, billing addresses, and other payment details processed through our PCI-compliant payment processor.</li>
    </ul>

    <h3>2.2 Information Collected Automatically</h3>
    <ul>
      <li><strong>Usage Data:</strong> Pages visited, features used, search queries, analysis requests, and interaction patterns within the platform.</li>
      <li><strong>Device Information:</strong> Browser type, operating system, device identifiers, IP address, and screen resolution.</li>
      <li><strong>Log Data:</strong> Server logs including access times, pages viewed, referring URLs, and system activity.</li>
      <li><strong>Cookies and Tracking:</strong> We use essential cookies for authentication and session management. Analytics cookies are used only with your explicit consent.</li>
    </ul>

    <h2>3. How We Use Your Information</h2>
    <ul>
      <li>Providing, maintaining, and improving our contract analysis Services</li>
      <li>Processing and analyzing your uploaded documents using our AI engine</li>
      <li>Generating risk reports, compliance assessments, and actionable insights</li>
      <li>Processing payments and managing your subscription</li>
      <li>Sending essential service communications (security alerts, billing notices, product updates)</li>
      <li>Providing customer support and responding to inquiries</li>
      <li>Detecting, preventing, and addressing technical issues and security threats</li>
      <li>Complying with legal obligations and enforcing our terms of service</li>
    </ul>

    <h2>4. Document Data Processing</h2>
    <p><strong>Critical Commitment:</strong> We never use your uploaded contracts or document content to train our AI models. Your documents are processed solely to provide you with analysis results. Document content is encrypted at rest using AES-256 encryption and is automatically purged from our processing pipeline within 30 days of analysis completion, unless you choose to retain them in your Document Vault.</p>

    <h2>5. Data Sharing and Disclosure</h2>
    <p>We do not sell, rent, or trade your personal information. We may share information only in the following circumstances:</p>
    <ul>
      <li><strong>Service Providers:</strong> Trusted third-party vendors who assist in operating our Services (cloud hosting, payment processing, analytics), bound by contractual obligations to protect your data.</li>
      <li><strong>Legal Requirements:</strong> When required by law, court order, or governmental regulation, or to protect the rights, property, or safety of DocSift, our users, or the public.</li>
      <li><strong>Business Transfers:</strong> In connection with a merger, acquisition, or sale of assets, with prior notice provided to affected users.</li>
      <li><strong>With Your Consent:</strong> When you explicitly authorize the sharing of specific information.</li>
    </ul>

    <h2>6. Data Security</h2>
    <p>We implement industry-leading security measures including:</p>
    <ul>
      <li>AES-256 encryption for data at rest</li>
      <li>TLS 1.3 encryption for data in transit</li>
      <li>SOC 2 Type II certified infrastructure</li>
      <li>Regular penetration testing and vulnerability assessments</li>
      <li>Role-based access controls with multi-factor authentication</li>
      <li>24/7 security monitoring and incident response</li>
    </ul>

    <h2>7. Data Retention</h2>
    <p>We retain your account information for as long as your account is active or as needed to provide Services. Document analysis results are retained per your plan settings. You may request deletion of your data at any time by contacting docsift.official@gmail.com Upon account closure, personal data is deleted within 90 days, subject to legal retention requirements.</p>

    <h2>8. Your Rights</h2>
    <p>Depending on your jurisdiction, you may have the right to:</p>
    <ul>
      <li>Access, correct, or delete your personal information</li>
      <li>Port your data to another service</li>
      <li>Withdraw consent for optional data processing</li>
      <li>Object to processing based on legitimate interests</li>
      <li>Lodge a complaint with your local data protection authority</li>
    </ul>

    <h2>9. International Data Transfers</h2>
    <p>DocSift processes data in the United States, European Union, and Asia-Pacific regions. We offer data residency options for Enterprise customers. All international transfers are governed by Standard Contractual Clauses (SCCs) approved by the European Commission and supplemented by additional technical and organizational safeguards.</p>

    <h2>10. Children's Privacy</h2>
    <p>Our Services are not directed to individuals under the age of 18. We do not knowingly collect personal information from children. If we become aware that we have inadvertently collected data from a minor, we will promptly delete such information.</p>

    <h2>11. Changes to This Policy</h2>
    <p>We may update this Privacy Policy from time to time. Material changes will be communicated via email and/or a prominent notice on our website at least 30 days prior to the effective date. Your continued use of our Services after the effective date constitutes acceptance of the revised policy.</p>

    <h2>12. Contact Us</h2>
    <p>If you have questions about this Privacy Policy or our data practices, please contact us at:</p>
    <ul>
      <li>Email: docsift.official@gmail.com</li>
      <li>Data Protection Officer: docsift.official@gmail.com</li>
      <li>Address: DocSift, Distributed Globally Remote-First Team</li>
    </ul>
  </LegalLayout>
);

export default Privacy;
