import {ShieldCheck} from 'lucide-react';

export default function PatientDataProtection() {
  return (
    <section id="data-protection" className="data-section" aria-labelledby="data-protection-title">
      <div className="data-section-heading">
        <p className="data-kicker"><ShieldCheck size={18} aria-hidden="true"/> Recover &amp; review</p>
        <h2 id="data-protection-title">Cybersecurity &amp; Patient Data Protection</h2>
        <p>Before approving Meera’s follow-up pilot, check who can use her information, how the care team verifies it and how follow-up continues during an outage.</p>
        <p><a href="/resources/lecture-guide.pdf#page=33">Open the three teaching slides</a></p>
      </div>

      <article className="data-case-card">
        <h3>AIIMS Delhi and the two weeks of recovery</h3>
        <p>After the November 2022 cyberattack, AIIMS Delhi used manual processes for operations and recordkeeping. It recovered e-Hospital data from an unaffected backup and restored most e-Hospital functions after two weeks.</p>
        <dl className="data-case-exceptions">
          <div><dt>Confidentiality</dt><dd>Who can see Meera’s plan or hear her call recording? What can staff say if someone else answers?</dd></div>
          <div><dt>Integrity</dt><dd>How does the nurse confirm that the date and time match the latest signed plan?</dd></div>
          <div><dt>Availability</dt><dd>How will nurses reach urgent patients while the follow-up dashboard is down?</dd></div>
        </dl>
        <p><a href="https://www.sansad.in/getFile/loksabhaquestions/annex/1710/AU1837.pdf?source=pqals">Lok Sabha response on the AIIMS incident</a></p>
      </article>

      <article className="data-case-card">
        <h3>DPDP and Meera’s call recording</h3>
        <p>Identify the purpose and lawful basis for each use of the data. Ask which fields a nurse needs, whether the pilot needs to keep the audio, who can access it and how long it must be kept. Assess a vendor’s proposed use for model training separately. A hospital acting as Data Fiduciary remains accountable for processing done on its behalf.</p>
        <p>The Digital Personal Data Protection Act dates to 2023 and the final Rules to 2025. Consent Manager registration took effect on 13 November 2026. The core duties on notices, safeguards, individual rights and breach reporting are scheduled for May 2027.</p>
        <dl className="data-case-exceptions data-draft-comparison">
          <div><dt>CERT-In directions in force</dt><dd>Covered organisations report listed cyber incidents within six hours of noticing them or being informed of them.</dd></div>
          <div><dt>DPDP Rule 7 from May 2027</dt><dd>For a personal data breach, notify affected individuals and the Data Protection Board without delay. Send details to the Board within 72 hours of becoming aware, unless it allows longer.</dd></div>
        </dl>
        <ul className="data-links">
          <li><a href="https://www.indiacode.nic.in/bitstream/123456789/22037/1/a2023-22.pdf">DPDP Act</a></li>
          <li><a href="https://www.meity.gov.in/static/uploads/2025/11/c56ceae6c383460ca69577428d36828b.pdf">Commencement notification</a></li>
          <li><a href="https://www.meity.gov.in/static/uploads/2025/11/53450e6e5dc0bfa85ebd78686cadad39.pdf">DPDP Rules 6 and 7</a></li>
          <li><a href="https://www.pib.gov.in/PressReleasePage.aspx?PRID=2336151">Consent Manager registration</a></li>
          <li><a href="https://www.cert-in.org.in/Directions70B.jsp">CERT-In directions</a></li>
        </ul>
      </article>

      <article id="data-protection-tabletop" className="data-case-card">
        <h3>Tabletop exercise</h3>
        <p>The vendor dashboard goes down during Meera’s first three days at home. Several follow-ups are due and it is unclear whether patient data was affected. In pairs, pick one decision. Name who owns it and how you would check it was carried out.</p>
        <dl className="data-case-exceptions">
          <div><dt>Keep calls going</dt><dd>Who takes over the queue and decides which callbacks cannot wait?</dd></div>
          <div><dt>Verify the plan</dt><dd>Where can staff find the latest signed plan and how will they reconcile notes after recovery?</dd></div>
          <div><dt>Assess and report</dt><dd>Who gets facts and logs from the vendor and checks which reporting duties are triggered?</dd></div>
        </dl>
        <details>
          <summary>Compare your response with a worked example</summary>
          <p>The nurse lead uses the approved fallback list for urgent callbacks. Clinical operations verifies signed plans and reconciles downtime records. The incident lead gathers evidence with the vendor and coordinates escalation and reporting with the privacy lead. During the drill, measure the time to the first urgent callback and count missed callbacks at handover.</p>
        </details>
        <p><strong>Vote again.</strong> Would you approve the pilot if the vendor cannot explain its use of call recordings or nursing staff have never rehearsed the fallback?</p>
      </article>
    </section>
  );
}
