import LegalLayout from "@/components/layout/LegalLayout";

const DPA = () => (
  <LegalLayout title="Data Processing Agreement" lastUpdated="April 4, 2026">
    <h2>1. Scope and Purpose</h2>
    <p>
      This Data Processing Agreement ("DPA") forms part of the Agreement between 
      <strong> Elyazid Salhi</strong> (operating as "DocSift", "Processor") and the entity 
      subscribing to DocSift's Services ("Controller") and governs the processing of personal data 
      solely for the provision of the Services. This DPA is entered into in compliance with GDPR 
      and applicable data protection legislation.
    </p>

    <h2>2. Local-First Processing Architecture</h2>
    <p>
      DocSift operates under a <strong>Local-First architecture</strong>. The primary processing 
      of sensitive document data (contracts and legal files) occurs locally on the Controller’s 
      infrastructure. DocSift does not transfer, store, or process the contents of analyzed 
      documents on its own servers or to third-party cloud AI providers.
    </p>

    <h2>3. Definitions</h2>
    <ul>
      <li><strong>"Personal Data"</strong> means any information relating to an identified or identifiable natural person processed for account management and billing.</li>
      <li><strong>"Processing"</strong> means operations performed on Personal Data for authentication and service delivery.</li>
      <li><strong>"Sub-processor"</strong> means essential third parties engaged to facilitate payments and hosting.</li>
    </ul>

    <h2>4. Data Processing Details</h2>
    <table className="min-w-full border-collapse border border-gray-200 my-4">
      <thead>
        <tr className="bg-gray-100">
          <th className="border p-2">Category</th>
          <th className="border p-2">Details</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td className="border p-2">Subject matter</td>
          <td>Technical support, account management, and license verification for the DocSift local NLP engine.</td>
        </tr>
        <tr>
          <td className="border p-2">Duration</td>
          <td>For the term of the Agreement.</td>
        </tr>
        <tr>
          <td className="border p-2">Nature and purpose</td>
          <td>Metadata processing for authentication and billing. <strong>Note: No document content is processed by the Processor.</strong></td>
        </tr>
        <tr>
          <td className="border p-2">Types of Personal Data</td>
          <td>Account name, email address, and billing metadata.</td>
        </tr>
      </tbody>
    </table>

    <h2>5. Processor Obligations</h2>
    <p>DocSift shall:</p>
    <ul>
      <li>Process Personal Data only on documented instructions from the Controller.</li>
      <li>Ensure confidentiality of any personnel involved in support.</li>
      <li>Implement appropriate technical measures (AES-256, TLS 1.3) to secure account metadata.</li>
      <li>Notify the Controller within 72 hours of becoming aware of any metadata breach.</li>
    </ul>

    <h2>6. Sub-processors</h2>
    <p>DocSift engages the following essential Sub-processors:</p>
    <table className="min-w-full border-collapse border border-gray-200 my-4">
      <thead>
        <tr className="bg-gray-100">
          <th className="border p-2">Sub-processor</th>
          <th className="border p-2">Purpose</th>
          <th className="border p-2">Location</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td className="border p-2">Paddle / Stripe</td>
          <td>Payment processing and recurring billing</td>
          <td>UK / US</td>
        </tr>
        <tr>
          <td className="border p-2">Vercel</td>
          <td>Hosting of the application dashboard and metadata API</td>
          <td>Global</td>
        </tr>
      </tbody>
    </table>

    <h2>7. Security Measures</h2>
    <p>DocSift implements the following security protocols:</p>
    <ul>
      <li><strong>Data Sovereignty:</strong> Document analysis is performed entirely within the Controller’s secure local environment.</li>
      <li><strong>Encryption:</strong> AES-256 encryption at rest and TLS 1.3 for data in transit.</li>
      <li><strong>Access Control:</strong> Role-based access for account management.</li>
    </ul>

    <h2>8. Term and Termination</h2>
    <p>
      Upon termination, DocSift shall securely delete account metadata within 90 days, 
      except where retention is required by law for financial auditing.
    </p>

    <h2>9. Contact</h2>
    <p>For questions regarding this DPA: <strong>docsift.official@gmail.com</strong></p>
  </LegalLayout>
);

export default DPA;