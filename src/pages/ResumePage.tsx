import { PageHeader } from '../components/layout/PageHeader';
import { HireCta } from '../components/sections/HireCta';
import { ButtonAnchor } from '../components/ui/Links';
import { PERSON, RESUME } from '../content/profile';
import { trackEvent } from '../lib/analytics';

const GLANCE = [
  { key: 'Current', value: 'AI Technical Business Analyst (PM), AT&T' },
  { key: 'Experience', value: '9+ years across engineering, product and AI' },
  { key: 'Focus', value: 'Enterprise AI · Conversational AI · Product strategy' },
  { key: 'Innovation', value: 'Innovation Jam Best in Show 2026 · invention disclosure 2026' },
  { key: 'Education', value: 'B.E. Mechanical Engineering, distinction' },
  { key: 'Certified', value: 'SAFe 6 LPM · SAFe PO/PM · CSPO · Azure AI Fundamentals' },
  { key: 'Based', value: `${PERSON.location} · open to Bengaluru, Hyderabad, Dubai, remote` },
];

export function ResumePage() {
  return (
    <>
      <PageHeader
        title="Résumé"
        lede={`Two pages: experience, results, innovation work and certifications. Updated ${RESUME.updated}.`}
      >
        <div className="flex flex-wrap gap-3">
          <ButtonAnchor
            href={RESUME.pdf}
            download="Ashfaque_Rifaye_Resume.pdf"
            variant="primary"
            onClick={() => trackEvent('resume_download', { file_extension: 'pdf', location: 'resume_page' })}
          >
            Download résumé (PDF)
          </ButtonAnchor>
          <ButtonAnchor
            href={RESUME.docx}
            download="Ashfaque_Rifaye_Resume.docx"
            onClick={() => trackEvent('resume_download', { file_extension: 'docx', location: 'resume_page' })}
          >
            Word version
          </ButtonAnchor>
        </div>
      </PageHeader>

      <section aria-labelledby="glance-title" className="wrap">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <a
              href={RESUME.pdf}
              target="_blank"
              rel="noreferrer"
              className="figure-frame block p-3 transition-colors hover:border-line-2 sm:p-6"
              aria-label="Open the résumé PDF in a new tab"
            >
              <img
                src={RESUME.preview}
                alt="Page one of Ashfaque Rifaye's résumé"
                width={1275}
                height={1650}
                loading="lazy"
                decoding="async"
                className="h-auto w-full rounded-sm bg-white shadow-2xl"
              />
            </a>
            <p className="mt-3 text-[0.875rem] text-ink-3">Preview of page one. The PDF is text-based, so applicant tracking systems can read it.</p>
          </div>
          <div className="lg:col-span-5">
            <h2 id="glance-title" className="t-h3">
              At a glance
            </h2>
            <dl className="titleblock mt-6">
              {GLANCE.map((g) => (
                <div key={g.key}>
                  <dt className="t-label">{g.key}</dt>
                  <dd>{g.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      <HireCta location="resume" />
    </>
  );
}
