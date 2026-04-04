import LegalLayout from "@/components/layout/LegalLayout";

const Privacy = () => (
  <LegalLayout title="Privacy Policy" lastUpdated="April 4, 2026">
    <h2>1. Introduction</h2>
    <p>
      <strong>DocSift</strong> (operated by <strong>Elyazid Salhi</strong>, "DocSift," "we," "our," or "us") 
      is committed to protecting the privacy and security of our users' personal information. 
      This Privacy Policy describes how we collect, use, and safeguard your account information 
      when you use our contract analysis platform.
    </p>

    <h2>2. Information We Collect</h2>
    <h3>2.1 Information You Provide Directly</h3>
    <ul>
      <li><strong>Account Data:</strong> Name, email address, and billing information for subscription management.</li>
      <li><strong>Support Communications:</strong> Information provided when contacting our support team.</li>
      <li><strong>Payment Information:</strong> Processed through our PCI-compliant payment processor (Paddle/Stripe). We do not store your raw credit card details.</li>
    </ul>

    <h3>2.2 Local-First Document Processing</h3>
    <p>
      <strong>Critical Commitment:</strong> DocSift utilizes a <strong>Local-First architecture</strong>. 
      The analysis of your contract documents is performed locally on your device or infrastructure. 
      <strong>We do not upload, store, or process your document content on our servers.</strong> 
      Because the AI engine runs locally, your sensitive document data remains entirely under your control.
    </p>

    <h2>3. How We Use Your Information</h2>
    <ul>
      <li>Managing your account and verifying your software license</li>
      <li>Processing payments and managing your subscription via Paddle/Stripe</li>
      <li>Providing technical support and responding to inquiries</li>
      <li>Sending essential service alerts (billing notices, security updates)</li>
    </ul>

    <h2>4. Data Sharing and Disclosure</h2>
    <p>We do not sell or rent your personal information. Data is shared only with essential service providers:</p>
    <ul>
      <li><strong>Payment Processors:</strong> Paddle or Stripe for secure transaction handling.</li>
      <li><strong>Infrastructure:</strong> Vercel for hosting the application dashboard and metadata API.</li>
    </ul>

    <h2>5. Data Security</h2>
    <p>We implement professional-grade security measures including:</p>
    <ul>
      <li><strong>AES-256 Encryption</strong> for metadata at rest.</li>
      <li><strong>TLS 1.3 Encryption</strong> for data in transit.</li>
      <li><strong>Zero-Access to Documents:</strong> Since processing is local, DocSift personnel have no technical means to access your uploaded documents.</li>
    </ul>

    <h2>6. Data Retention</h2>
    <p>
      We retain your account metadata for as long as your account is active. 
      Upon account closure, personal metadata is deleted within 90 days, 
      subject to legal financial record-keeping requirements.
    </p>

    <h2>7. Your Rights</h2>
    <p>You have the right to access, correct, or delete your personal account information. For requests, contact: <strong>docsift.official@gmail.com</strong>.</p>

    <h2>8. International Data Transfers</h2>
    <p>
      Account metadata is processed in compliance with GDPR. As document analysis is local, 
      no international transfer of sensitive document data occurs through our Services.
    </p>

    <h2>9. Contact Us</h2>
    <p>If you have questions about this Privacy Policy, please contact:</p>
    <ul>
      <li>Email: <strong>docsift.official@gmail.com</strong></li>
      <li>Operator: <strong>Elyazid Salhi</strong></li>
    </ul>

    <h2>10. Refund Policy</h2>
    <p>
      At DocSift, we are confident in our neural engine's accuracy. However, we offer a 
      <strong> 14-day full refund policy</strong>. If you are not satisfied with our 
      Services within the first 14 days of your initial purchase, you may request a 
      full refund by emailing <strong>docsift.official@gmail.com</strong>. After 14 days, 
      all payments are non-refundable.
    </p>
  </LegalLayout>
);

export default Privacy;